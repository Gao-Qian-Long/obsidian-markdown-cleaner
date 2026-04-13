# Obsidian Markdown Cleaner

## 🌐 Language | 语言

[**English**](README.md#english) | [**中文**](README.md#chinese)

---

<a name="english"></a>

# English Version

A powerful Obsidian plugin for cleaning Markdown formatting and intelligently converting mathematical formulas. Supports hotkey cleaning, paste auto-cleaning, and LaTeX math formula format conversion.

## ✨ Core Features

### Markdown Format Cleaning
- **Smart Cleaning**: Automatically identifies and cleans excess `**`, `__` and other formatting symbols
- **Preserve Valid Formats**: Keeps normal bold `**bold**` and italic `*italic*` unchanged
- **Hotkey Operation**: Use `Ctrl+Shift+M` (or `Cmd+Shift+M`) to quickly clean selected text
- **Paste Auto-Cleaning**: Automatically cleans excess formatting in pasted content when enabled

### Math Formula Conversion
- **LaTeX Format Conversion**: Automatically converts `\(...\)` to `$...$` (inline) and `\[...\]` to `$$...$$` (block)
- **Complex Formula Support**: Perfectly handles `\frac`, `\sqrt`, `\sum`, matrices, etc.

## 📦 Installation

### For End Users
1. Download from [GitHub Releases](https://github.com/Gao-Qian-Long/obsidian-markdown-cleaner/releases)
2. Extract and rename to `obsidian-markdown-cleaner`
3. Copy to Obsidian vault's `.obsidian/plugins/` directory
4. Enable in Obsidian Settings → Third-party plugins

### For Developers
```bash
git clone https://github.com/Gao-Qian-Long/obsidian-markdown-cleaner.git
cd obsidian-markdown-cleaner
npm install
npm run build
```

## 🚀 Usage

### Enable Plugin
1. Open Obsidian Settings
2. Go to `Third-party plugins` → `Markdown Cleaner`
3. Enable features as needed:
   - ✅ Auto-clean on paste
   - ✅ Show notification
   - ✅ Enable hotkey
   - ✅ Convert math formulas

### Quick Start
- **Hotkey**: Select text → Press `Ctrl+Shift+M`
- **Paste**: Automatically cleans and converts formulas

## 🔢 Math Formula Conversion

| Original | Converted | Description |
|----------|-----------|-------------|
| `\(E = mc^2\)` | `$E = mc^2$` | Inline formula |
| `\[x = \frac{-b}{2a}\]` | `$$x = \frac{-b}{2a}$$` | Block formula |

### Supported LaTeX Commands
- **Fraction**: `\frac{num}{den}`
- **Square root**: `\sqrt{}`
- **Greek letters**: `\alpha`, `\beta`, `\gamma`, `\omega`, `\zeta`
- **Operators**: `\sum`, `\int`, `\prod`
- **Special symbols**: `\pm`, `\leq`, `\geq`, `\neq`, `\approx`

## ⚙️ Settings

| Setting | Default | Description |
|---------|---------|-------------|
| Auto-clean on paste | Enabled | Auto-clean when pasting |
| Enable hotkey | Enabled | `Ctrl+Shift+M` |
| Convert math formulas | Enabled | LaTeX conversion |

## ❓ FAQ

### Q: Formula conversion not working?
1. Check if "Convert math formulas" is enabled
2. Ensure using `\(...\)` or `\[...\]` format
3. Restart Obsidian

### Q: Hotkey not working?
1. Check if "Enable hotkey" is enabled
2. Restart Obsidian
3. Check for conflicts

## 🛠️ Development

### Build Commands
```bash
npm install    # Install dependencies
npm run dev    # Development mode
npm run build  # Production build
```

### Project Structure
```
obsidian-markdown-cleaner/
├── main.ts           # Source code
├── main.js           # Built plugin
├── manifest.json     # Plugin metadata
├── package.json      # npm config
├── tsconfig.json     # TypeScript config
├── esbuild.config.mjs # Build config
└── README.md         # Documentation
```

## 📋 Changelog

### v1.1.0 (Latest)
- ✨ New: LaTeX math formula auto-conversion
- 🔧 Enhanced: Complex formula support
- 🐛 Fixed: Regex matching issues
- 📝 Updated: Complete documentation

## 🤝 Contributing

Welcome! Submit Issues and Pull Requests.

## 📄 License

MIT License

## 📞 Contact

- **GitHub**: https://github.com/Gao-Qian-Long/obsidian-markdown-cleaner
- **Issues**: https://github.com/Gao-Qian-Long/obsidian-markdown-cleaner/issues

---

<a name="chinese"></a>

# 中文版本

一个功能强大的 Obsidian 插件，专门用于清理 Markdown 格式并智能转换数学公式。支持快捷键清理、粘贴自动清理和 LaTeX 数学公式格式转换。

## ✨ 核心功能

### Markdown 格式清理
- **智能清理**：自动识别并清理多余的 `**`、`__` 等格式符号
- **保留有效格式**：保持正常的加粗 `**bold**`、斜体 `*italic*` 不变
- **快捷键操作**：`Ctrl+Shift+M`（或 `Cmd+Shift+M`）快速清理选中文本
- **粘贴自动清理**：开启后可自动清理粘贴内容中的多余格式

### 数学公式转换
- **LaTeX 格式转换**：`\(...\)` → `$...$`（行内公式），`\[...\]` → `$$...$$`（块级公式）
- **复杂公式支持**：完美处理 `\frac`、`\sqrt`、`\sum`、矩阵等

## 📦 安装方法

### 普通用户（推荐）
1. 从 [GitHub Releases](https://github.com/Gao-Qian-Long/obsidian-markdown-cleaner/releases) 下载最新版本
2. 解压并重命名为 `obsidian-markdown-cleaner`
3. 复制到 Obsidian 库的 `.obsidian/plugins/` 目录
4. 在 Obsidian 设置 → 第三方插件中启用

### 开发者
```bash
git clone https://github.com/Gao-Qian-Long/obsidian-markdown-cleaner.git
cd obsidian-markdown-cleaner
npm install
npm run build
```

## 🚀 使用方法

### 启用插件
1. 打开 Obsidian 设置
2. 进入 `第三方插件` → `Markdown Cleaner`
3. 根据需要开启功能：
   - ✅ 粘贴时自动清理
   - ✅ 显示通知
   - ✅ 启用快捷键
   - ✅ 转换数学公式

### 快速开始
- **快捷键**：选中文本 → 按 `Ctrl+Shift+M`
- **粘贴**：自动清理并转换公式

## 🔢 数学公式转换

| 原始格式 | 转换结果 | 说明 |
|---------|---------|------|
| `\(E = mc^2\)` | `$E = mc^2$` | 行内公式 |
| `\[x = \frac{-b}{2a}\]` | `$$x = \frac{-b}{2a}$$` | 块级公式 |

### 支持的 LaTeX 命令
- **分数**：`\frac{分子}{分母}`
- **根号**：`\sqrt{}`
- **希腊字母**：`\alpha`、`\beta`、`\gamma`、`\omega`、`\zeta`
- **运算符**：`\sum`、`\int`、`\prod`
- **特殊符号**：`\pm`、`\leq`、`\geq`、`\neq`、`\approx`

## ⚙️ 设置选项

| 选项 | 默认 | 说明 |
|-----|------|------|
| 粘贴时自动清理 | 开启 | 粘贴内容时自动清理 |
| 启用快捷键 | 开启 | `Ctrl+Shift+M` |
| 转换数学公式 | 开启 | LaTeX 格式转换 |

## ❓ 常见问题

### Q: 公式转换不生效？
1. 检查设置中"转换数学公式"是否开启
2. 确保使用 `\(...\)` 或 `\[...\]` 格式
3. 重启 Obsidian

### Q: 快捷键不生效？
1. 检查设置中"启用快捷键"是否开启
2. 重启 Obsidian
3. 检查快捷键冲突

## 🛠️ 开发指南

### 构建命令
```bash
npm install    # 安装依赖
npm run dev   # 开发模式
npm run build # 生产构建
```

### 项目结构
```
obsidian-markdown-cleaner/
├── main.ts           # 源代码
├── main.js           # 构建后的插件
├── manifest.json     # 插件元数据
├── package.json      # npm配置
├── tsconfig.json     # TypeScript配置
├── esbuild.config.mjs # 构建配置
└── README.md         # 文档
```

## 📋 更新日志

### v1.1.0（最新）
- ✨ 新增：LaTeX 数学公式自动转换
- 🔧 优化：复杂公式支持
- 🐛 修复：正则表达式问题
- 📝 更新：完整中文文档

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

## 📞 联系方式

- **GitHub**: https://github.com/Gao-Qian-Long/obsidian-markdown-cleaner
- **问题反馈**: https://github.com/Gao-Qian-Long/obsidian-markdown-cleaner/issues

---

**希望这个插件能提升你在 Obsidian 中的编辑体验！** 🚀