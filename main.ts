import { Plugin, PluginSettingTab, Setting, App, Editor, Notice } from 'obsidian';

interface CleanerSettings {
	autoCleanOnPaste: boolean;
	showNotification: boolean;
	convertMathFormulas: boolean;
}

const DEFAULT_SETTINGS: CleanerSettings = {
	autoCleanOnPaste: true,
	showNotification: true,
	convertMathFormulas: true
};

const CJK_RANGE = /[\u4e00-\u9fff\u3400-\u4dbf\uf900-\ufaff\u2e80-\u2eff\u31c0-\u31ef\u3000-\u303f\uff00-\uffef]/;

function hasCJK(s: string): boolean {
	return CJK_RANGE.test(s);
}

export default class MarkdownCleanerPlugin extends Plugin {
	settings!: CleanerSettings;

	async onload() {
		console.debug('Markdown Cleaner: plugin loading');
		await this.loadSettings();
		console.debug('Markdown Cleaner: settings loaded');

		// 注册粘贴事件监听器
		this.registerEvent(
			this.app.workspace.on('editor-paste', (evt: ClipboardEvent, editor: Editor) => {
				this.handlePaste(evt, editor);
			})
		);

		// 添加快捷键命令
		this.addCommand({
			id: 'clean-markdown-format',
			name: 'Clean Markdown format',
			editorCheckCallback: (checking: boolean, editor: Editor) => {
				if (checking) return true;
				this.cleanSelection(editor);
			}
		});

		// 添加设置界面
		this.addSettingTab(new CleanerSettingTab(this.app, this));
		console.debug('Markdown Cleaner: plugin loaded successfully');
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	// 清理选中文本
	cleanSelection(editor: Editor): void {
		const selection = editor.getSelection();
		if (!selection || selection.trim() === '') {
			new Notice('请先选中要清理的文本');
			return;
		}
		const cleaned = this.cleanMarkdown(selection);
		if (cleaned === selection) {
			new Notice('未发现需要清理的格式');
			return;
		}
		editor.replaceSelection(cleaned);
		if (this.settings.showNotification) {
			new Notice('已清理 Markdown 格式');
		}
	}

	// 处理粘贴事件
	handlePaste(evt: ClipboardEvent, editor: Editor): void {
		// 首先检查是否需要处理
		if (!this.settings.autoCleanOnPaste) {
			return;
		}
		
		const clipboardData = evt.clipboardData;
		if (!clipboardData) {
			return;
		}
		
		if (clipboardData.files && clipboardData.files.length > 0) {
			return;
		}
		
		const pastedText = clipboardData.getData('text/plain');
		if (!pastedText) {
			return;
		}
		
		// 转换数学公式
		let convertedText = pastedText;
		if (this.settings.convertMathFormulas) {
			convertedText = this.convertMathFormulas(pastedText);
		}
		
		// 清理格式
		const cleaned = this.cleanMarkdown(convertedText);
		
		if (cleaned !== pastedText) {
			// 阻止默认粘贴行为
			evt.preventDefault();
			evt.stopPropagation();
			
			try {
				// 获取当前光标位置
				const cursor = editor.getCursor();
				const from = editor.getCursor('from');
				const to = editor.getCursor('to');
				const hasSelection = from.line !== to.line || from.ch !== to.ch;
				
				// 插入清理后的文本
				const replaceFrom = hasSelection ? from : cursor;
				const replaceTo = hasSelection ? to : cursor;
				
				editor.replaceRange(cleaned, replaceFrom, replaceTo);
				
				// 设置光标位置
				const lines = cleaned.split('\n');
				const lastLineIndex = lines.length - 1;
				const newCursor = {
					line: replaceFrom.line + lastLineIndex,
					ch: lastLineIndex === 0 ? replaceFrom.ch + cleaned.length : lines[lastLineIndex].length
				};
				editor.setCursor(newCursor);
				
				if (this.settings.showNotification) {
					new Notice('已自动清理粘贴内容的格式');
				}
			} catch (error) {
				console.error('Markdown Cleaner: error replacing text:', error);
			}
		}
	}

	// 转换数学公式
	private convertMathFormulas(text: string): string {
		let result = text;
		
		// 1. 转换显示公式 \[...\] -> $$...$$
		result = result.replace(/\\\[([\s\S]*?)\\\]/g, (match, content) => {
			return '$$' + content + '$$';
		});
		
		// 2. 转换行内公式 \(...\) -> $...$
		result = result.replace(/\\\(\s*((?:\\.|[^\\])*?)\s*\\\)/g, (match, content) => {
			return '$' + content.trim() + '$';
		});
		
		// 3. 确保已有的 $$...$$ 格式正确
		result = result.replace(/\$\$([\s\S]+?)\$\$/g, (match, content) => {
			return '$$' + content + '$$';
		});
		
		// 4. 确保已有的 $...$ 格式正确（避免重复转换）
		result = result.replace(/(?<!\$)\$([^$\n]+?)\$(?!\$)/g, (match, content) => {
			return '$' + content + '$';
		});
		
		return result;
	}

	// 清理 Markdown 格式
	cleanMarkdown(text: string, beforeContext: string = '', afterContext: string = ''): string {
		let result = text;
		
		// 新的正则表达式：清理主要是数字、符号、单位的内容
		// 匹配：以数字、符号开头，可能包含少量字母（单位）
		// 不匹配：以字母或中文开头的真正文本
		result = result.replace(/\*\*([-+]?\d*\.?\d+[°±≈≠ΩµμΑ-Ωα-ω]?[a-zA-Z]{0,2}[\/]?[a-zA-Z]{0,3})\*\*/g, '$1');
		
		// 保留原来的正则表达式作为后备
		result = result.replace(/\*\*([^a-zA-Z\u4e00-\u9fff*]+?)\*\*/g, '$1');

		// 清理多余的星号和下划线
		result = result.replace(/\*{3,}/g, (match) => {
			return match.length % 2 === 0 ? '**' : '*';
		});
		result = result.replace(/_{3,}/g, (match) => {
			return match.length % 2 === 0 ? '__' : '_';
		});

		// 清理空的加粗标签
		result = result.replace(/\*\*\s+\*\*/g, '');
		result = result.replace(/__\s+__/g, '');

		// 清理重复的加粗标签
		result = result.replace(/(\*\*)\1+/g, '**');
		result = result.replace(/(__)\1+/g, '__');

		// 清理无效的加粗标签
		const removals = this.findInvalidBoldPositions(result, beforeContext, afterContext);
		removals.sort((a, b) => b - a);
		for (const pos of removals) {
			result = result.substring(0, pos) + result.substring(pos + 2);
		}

		return result;
	}

	// 查找无效的加粗标签位置
	private findInvalidBoldPositions(text: string, beforeContext: string = '', afterContext: string = ''): number[] {
		const positions: number[] = [];
		const regex = /\*\*/g;
		const allPositions: number[] = [];
		let m;
		while ((m = regex.exec(text)) !== null) {
			allPositions.push(m.index);
		}

		if (allPositions.length === 0) return positions;

		const punctOrSpace = /[\s\u3000-\u303f\uff00-\uffef\u2000-\u206f!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/;

		for (let i = 0; i < allPositions.length - 1; i += 2) {
			const openPos = allPositions[i];
			const closePos = allPositions[i + 1];
			const content = text.substring(openPos + 2, closePos);

			if (content.trim() === '') {
				positions.push(openPos, closePos);
				continue;
			}

			const contentHasCJK = hasCJK(content);

			let beforeChar: string;
			if (openPos > 0) {
				beforeChar = text[openPos - 1];
			} else {
				beforeChar = beforeContext;
			}

			let afterChar: string;
			if (closePos + 2 < text.length) {
				afterChar = text[closePos + 2];
			} else {
				afterChar = afterContext;
			}

			const isOpenAtBoundary = !beforeChar || punctOrSpace.test(beforeChar);
			const isCloseAtBoundary = !afterChar || punctOrSpace.test(afterChar);

			if (contentHasCJK) {
				if (!isOpenAtBoundary && !isCloseAtBoundary) {
					continue;
				}
				if (isOpenAtBoundary && isCloseAtBoundary) {
					continue;
				}
			}

			if (!isOpenAtBoundary || !isCloseAtBoundary) {
				positions.push(openPos, closePos);
			}
		}

		if (allPositions.length % 2 !== 0) {
			positions.push(allPositions[allPositions.length - 1]);
		}

		return positions;
	}
}

// 设置界面
class CleanerSettingTab extends PluginSettingTab {
	plugin: MarkdownCleanerPlugin;

	constructor(app: App, plugin: MarkdownCleanerPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();

		new Setting(containerEl)
			.setName('Markdown Cleaner')
			.setHeading();

		new Setting(containerEl)
			.setName('Auto clean on paste')
			.setDesc('Automatically clean excess formatting when pasting content')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.autoCleanOnPaste)
				.onChange(async (value) => {
					this.plugin.settings.autoCleanOnPaste = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Set hotkey')
			.setDesc('To set a hotkey, go to Settings → Hotkeys, then search for "Clean Markdown format" to bind a hotkey');

		new Setting(containerEl)
			.setName('Show notification')
			.setDesc('Display a notification when cleaning is complete')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.showNotification)
				.onChange(async (value) => {
					this.plugin.settings.showNotification = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Convert math formulas')
			.setDesc('Automatically convert LaTeX formulas (\\(...\\) and \\[...\\]) to $...$ and $$...$$ format')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.convertMathFormulas)
				.onChange(async (value) => {
					this.plugin.settings.convertMathFormulas = value;
					await this.plugin.saveSettings();
				}));
	}
}