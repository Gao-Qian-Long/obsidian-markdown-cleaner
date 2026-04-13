import { Plugin, PluginSettingTab, Setting, App, Editor, Notice } from 'obsidian';

interface CleanerSettings {
	autoCleanOnPaste: boolean;
	showNotification: boolean;
	enableHotkey: boolean;
	convertMathFormulas: boolean;
}

const DEFAULT_SETTINGS: CleanerSettings = {
	autoCleanOnPaste: true,
	showNotification: true,
	enableHotkey: true,
	convertMathFormulas: true
};

const CJK_RANGE = /[\u4e00-\u9fff\u3400-\u4dbf\uf900-\ufaff\u2e80-\u2eff\u31c0-\u31ef\u3000-\u303f\uff00-\uffef]/;

function hasCJK(s: string): boolean {
	return CJK_RANGE.test(s);
}

export default class MarkdownCleanerPlugin extends Plugin {
	settings!: CleanerSettings;

	async onload() {
		console.log('Markdown Cleaner: plugin loading');
		await this.loadSettings();
		console.log('Markdown Cleaner: settings loaded', this.settings);

		// 注册粘贴事件监听器
		this.registerEvent(
			this.app.workspace.on('editor-paste', (evt: ClipboardEvent, editor: Editor) => {
				console.log('Markdown Cleaner: editor-paste event captured');
				this.handlePaste(evt, editor);
			})
		);

		// 添加快捷键命令
		this.addCommand({
			id: 'clean-markdown-format',
			name: '清理 Markdown 格式',
			hotkeys: this.settings.enableHotkey
				? [{ modifiers: ['Mod', 'Shift'], key: 'M' }]
				: [],
			editorCheckCallback: (checking: boolean, editor: Editor) => {
				if (checking) return true;
				this.cleanSelection(editor);
			}
		});

		// 添加设置界面
		this.addSettingTab(new CleanerSettingTab(this.app, this));
		console.log('Markdown Cleaner: plugin loaded successfully');
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
		console.log('Markdown Cleaner: paste event triggered');
		
		// 首先检查是否需要处理
		if (!this.settings.autoCleanOnPaste) {
			console.log('Markdown Cleaner: autoCleanOnPaste is false');
			return;
		}
		
		const clipboardData = evt.clipboardData;
		if (!clipboardData) {
			console.log('Markdown Cleaner: no clipboardData');
			return;
		}
		
		console.log('Markdown Cleaner: clipboardData.types:', Array.from(clipboardData.types));
		
		if (clipboardData.files && clipboardData.files.length > 0) {
			console.log('Markdown Cleaner: clipboard contains files');
			return;
		}
		
		const pastedText = clipboardData.getData('text/plain');
		if (!pastedText) {
			console.log('Markdown Cleaner: no text/plain data');
			return;
		}
		
		console.log('Markdown Cleaner: pasted text length:', pastedText.length);
		console.log('Markdown Cleaner: pasted text (first 100 chars):', JSON.stringify(pastedText.substring(0, Math.min(100, pastedText.length))));
		
		// 转换数学公式
		let convertedText = pastedText;
		if (this.settings.convertMathFormulas) {
			convertedText = this.convertMathFormulas(pastedText);
			console.log('Markdown Cleaner: converted text length:', convertedText.length);
			console.log('Markdown Cleaner: converted text (first 100 chars):', JSON.stringify(convertedText.substring(0, Math.min(100, convertedText.length))));
		}
		
		// 清理格式
		const cleaned = this.cleanMarkdown(convertedText);
		console.log('Markdown Cleaner: cleaned text length:', cleaned.length);
		console.log('Markdown Cleaner: cleaned !== original?', cleaned !== pastedText);
		
		if (cleaned !== pastedText) {
			console.log('Markdown Cleaner: text changed, preventing default and inserting cleaned text');
			
			// 阻止默认粘贴行为
			evt.preventDefault();
			evt.stopPropagation();
			console.log('Markdown Cleaner: event default prevented');
			
			try {
				// 获取当前光标位置
				const cursor = editor.getCursor();
				const from = editor.getCursor('from');
				const to = editor.getCursor('to');
				const hasSelection = from.line !== to.line || from.ch !== to.ch;
				
				// 插入清理后的文本
				const replaceFrom = hasSelection ? from : cursor;
				const replaceTo = hasSelection ? to : cursor;
				
				console.log('Markdown Cleaner: replacing range from', replaceFrom, 'to', replaceTo);
				editor.replaceRange(cleaned, replaceFrom, replaceTo);
				
				// 设置光标位置
				const lines = cleaned.split('\n');
				const lastLineIndex = lines.length - 1;
				const newCursor = {
					line: replaceFrom.line + lastLineIndex,
					ch: lastLineIndex === 0 ? replaceFrom.ch + cleaned.length : lines[lastLineIndex].length
				};
				editor.setCursor(newCursor);
				
				console.log('Markdown Cleaner: cleaned and inserted at cursor position');
				
				if (this.settings.showNotification) {
					new Notice('已自动清理粘贴内容的格式');
				}
			} catch (error) {
				console.error('Markdown Cleaner: error replacing text:', error);
				console.log('Markdown Cleaner: insertion failed, default already prevented');
			}
		} else {
			console.log('Markdown Cleaner: no changes needed, allowing default paste behavior');
		}
	}

	// 转换数学公式
	private convertMathFormulas(text: string): string {
		console.log('Markdown Cleaner: converting math formulas');
		console.log('Markdown Cleaner: original text length:', text.length);
		console.log('Markdown Cleaner: original text (first 200 chars):', JSON.stringify(text.substring(0, Math.min(200, text.length))));
		
		let result = text;
		
		// 1. 转换显示公式 \[...\] -> $$...$$
		// 匹配模式：\\[内容\\]（跨行匹配）
		console.log('Markdown Cleaner: converting display math formulas \\[...\\]');
		result = result.replace(/\\\[([\s\S]*?)\\\]/g, (match, content) => {
			console.log('Markdown Cleaner: found display math formula, length:', match.length);
			// 使用函数返回正确的格式：$$内容$$
			return '$$' + content + '$$';
		});
		
		// 2. 转换行内公式 \(...\) -> $...$
		console.log('Markdown Cleaner: converting inline math formulas \\(...\\)');
		// 使用非贪婪匹配，正确处理转义，并去除公式前后的空白
		result = result.replace(/\\\(\s*((?:\\.|[^\\])*?)\s*\\\)/g, (match, content) => {
			console.log('Markdown Cleaner: found inline math formula:', match.substring(0, Math.min(50, match.length)));
			// 使用函数返回正确的格式：$内容$，并去除内容中的首尾空白
			return '$' + content.trim() + '$';
		});
		
		// 3. 确保已有的 $$...$$ 格式正确
		console.log('Markdown Cleaner: ensuring $$...$$ format');
		result = result.replace(/\$\$([\s\S]+?)\$\$/g, (match, content) => {
			return '$$' + content + '$$';
		});
		
		// 4. 确保已有的 $...$ 格式正确（避免重复转换）
		console.log('Markdown Cleaner: ensuring $...$ format');
		result = result.replace(/(?<!\$)\$([^$\n]+?)\$(?!\$)/g, (match, content) => {
			return '$' + content + '$';
		});
		
		console.log('Markdown Cleaner: converted text length:', result.length);
		console.log('Markdown Cleaner: converted text (first 200 chars):', JSON.stringify(result.substring(0, Math.min(200, result.length))));
		console.log('Markdown Cleaner: conversion complete');
		
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
		containerEl.createEl('h2', { text: 'Markdown Cleaner 设置' });

		new Setting(containerEl)
			.setName('粘贴时自动清理')
			.setDesc('开启后，粘贴内容时自动清理多余的格式符号')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.autoCleanOnPaste)
				.onChange(async (value) => {
					this.plugin.settings.autoCleanOnPaste = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('启用快捷键')
			.setDesc('开启后使用 Ctrl+Shift+M 快捷键清理选中文本（修改后需重启 Obsidian 生效）')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.enableHotkey)
				.onChange(async (value) => {
					this.plugin.settings.enableHotkey = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('显示通知')
			.setDesc('清理完成后显示通知提示')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.showNotification)
				.onChange(async (value) => {
					this.plugin.settings.showNotification = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('转换数学公式')
			.setDesc('开启后自动转换 LaTeX 数学公式（\\[...\\] 和 \\(...\\)）为 $...$ 和 $$...$$ 格式')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.convertMathFormulas)
				.onChange(async (value) => {
					this.plugin.settings.convertMathFormulas = value;
					await this.plugin.saveSettings();
				}));
	}
}