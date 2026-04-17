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
	
	// 预编译正则表达式，避免每次调用重新编译
	private readonly BOLD_REGEX = /\*\*/g;
	private readonly PUNCT_OR_SPACE_REGEX = /[\s\u3000-\u303f\uff00-\uffef\u2000-\u206f!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/;
	private readonly NUMBER_UNIT_PATTERN = /\*\*([-+]?\d*\.?\d+[°±≈≠ΩµμΑ-Ωα-ω]?[a-zA-Z]{0,2}[/]?[a-zA-Z]{0,3})\*\*/g;
	private readonly NON_TEXT_PATTERN = /\*\*([^a-zA-Z\u4e00-\u9fff*]+?)\*\*/g;
	private readonly MULTIPLE_STARS = /\*{3,}/g;
	private readonly MULTIPLE_UNDERSCORES = /_{3,}/g;

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

	// 插件卸载时清理资源
	onunload() {
		console.debug('Markdown Cleaner: plugin unloaded');
	}

	async loadSettings() {
		try {
			const data = await this.loadData();
			this.settings = Object.assign({}, DEFAULT_SETTINGS, data);
		} catch (error) {
			console.error('Markdown Cleaner: error loading settings:', error);
			this.settings = Object.assign({}, DEFAULT_SETTINGS);
		}
	}

	async saveSettings() {
		try {
			await this.saveData(this.settings);
		} catch (error) {
			console.error('Markdown Cleaner: error saving settings:', error);
			new Notice('Markdown Cleaner: 保存设置失败');
		}
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
					ch: lastLineIndex === 0 
						? replaceFrom.ch + lines[0].length 
						: lines[lastLineIndex].length
				};
				editor.setCursor(newCursor);
				
				if (this.settings.showNotification) {
					new Notice('已自动清理粘贴内容的格式');
				}
			} catch (error) {
				console.error('Markdown Cleaner: error replacing text:', error);
				new Notice('Markdown Cleaner: 清理失败，请重试');
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
		// 修复：添加内容检查，避免连续公式 $a$ $b$ 被错误匹配
		// 当 content 包含 $ 时说明可能是显示公式或未闭合公式，跳过处理
		result = result.replace(/(?<!\$)\$([^$\n]+?)\$(?!\$)/g, (match, content) => {
			if (content.includes('$')) {
				return match;
			}
			return '$' + content + '$';
		});
		
		return result;
	}

	// 清理 Markdown 格式
	cleanMarkdown(text: string, beforeContext: string = '', afterContext: string = ''): string {
		let result = text;
		
		// 使用预编译正则清理数字+单位格式 **3.14kg** -> 3.14kg
		result = result.replace(this.NUMBER_UNIT_PATTERN, '$1');
		
		// 清理非文本格式的后备正则
		result = result.replace(this.NON_TEXT_PATTERN, '$1');

		// 清理多余的星号和下划线
		result = result.replace(this.MULTIPLE_STARS, (match) => {
			return match.length % 2 === 0 ? '**' : '*';
		});
		result = result.replace(this.MULTIPLE_UNDERSCORES, (match) => {
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

	/**
	 * 查找无效的加粗标签位置
	 * @param text - 要检查的文本
	 * @param beforeContext - 文本前的上下文（用于边界判断）
	 * @param afterContext - 文本后的上下文（用于边界判断）
	 * @returns 需要删除的 ** 位置数组
	 */
	private findInvalidBoldPositions(text: string, beforeContext: string = '', afterContext: string = ''): number[] {
		const positions: number[] = [];
		const allPositions: number[] = [];
		// 重置 lastIndex 避免全局正则的匹配位置残留问题
		this.BOLD_REGEX.lastIndex = 0;
		let m;
		while ((m = this.BOLD_REGEX.exec(text)) !== null) {
			allPositions.push(m.index);
		}

		if (allPositions.length === 0) return positions;

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

			const isOpenAtBoundary = !beforeChar || this.PUNCT_OR_SPACE_REGEX.test(beforeChar);
			const isCloseAtBoundary = !afterChar || this.PUNCT_OR_SPACE_REGEX.test(afterChar);

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
			.setName('Formatting')
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