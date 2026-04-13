# Obsidian Markdown Cleaner

一个功能强大的 Obsidian 插件，专门用于清理 Markdown 格式并智能转换数学公式。支持快捷键清理、粘贴自动清理和 LaTeX 数学公式格式转换。

[![版本](https://img.shields.io/badge/版本-1.1.0-green)](https://github.com/Gao-Qian-Long/obsidian-markdown-cleaner)
[![许可证](https://img.shields.io/badge/许可证-MIT-yellow)](LICENSE)

---

## 📑 目录 | Table of Contents

- [核心功能](#核心功能)
- [安装方法](#安装方法)
- [使用方法](#使用方法)
- [数学公式转换](#数学公式转换)
- [Markdown清理规则](#markdown清理规则)
- [设置选项](#设置选项)
- [常见问题](#常见问题)
- [开发指南](#开发指南)
- [更新日志](#更新日志)

---

## 🧹 核心功能 | Core Features

### Markdown 格式清理
- **智能清理**：自动识别并清理多余的 `**`、`__` 等格式符号
- **保留有效格式**：保持正常的加粗 `**bold**`、斜体 `*italic*` 不变
- **快捷键操作**：`Ctrl+Shift+M`（或 `Cmd+Shift+M`）快速清理选中文本
- **粘贴自动清理**：开启后可自动清理粘贴内容中的多余格式

### 数学公式转换
- **LaTeX 格式转换**：`\(...\)` → `$...$`（行内公式）
- **显示公式支持**：`\[...\]` → `$$...$$`（块级公式）
- **复杂公式处理**：完美处理 `\frac`、`\sqrt`、`\sum`、矩阵等复杂表达式

### 智能识别
- **中文友好**：智能识别中英文混合文本，避免误清理中文内容
- **边界检测**：只在格式符号位于文本边界时才进行清理

---

## 📦 安装方法 | Installation

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

---

## 🚀 使用方法 | Usage

### 启用插件
1. 打开 Obsidian 设置
2. 进入 `第三方插件` → `Markdown Cleaner`
3. 根据需要开启以下功能：
   - ✅ 粘贴时自动清理
   - ✅ 显示通知
   - ✅ 启用快捷键
   - ✅ 转换数学公式

### 快捷键清理
- **选中文本** → 按 `Ctrl+Shift+M`（或 `Cmd+Shift+M`）
- 多余的格式符号将被自动清理

### 粘贴自动清理
- 开启功能后，粘贴内容时会自动清理并转换

---

## 🔢 数学公式转换 | Math Formula Conversion

### 支持的格式
| 原始格式 | 转换结果 | 说明 |
|---------|---------|------|
| `\(E = mc^2\)` | `$E = mc^2$` | 行内公式 |
| `\[x = \frac{-b}{2a}\]` | `$$x = \frac{-b}{2a}$$` | 块级公式 |

### 支持的 LaTeX 命令
- **分数**：`\frac{分子}{分母}`
- **根号**：`\sqrt{}`, `\sqrt[n]{}`
- **希腊字母**：`\alpha`, `\beta`, `\gamma`, `\omega`, `\zeta`
- **运算符**：`\sum`, `\int`, `\prod`
- **矩阵**：`\begin{matrix}`, `\begin{pmatrix}`
- **特殊符号**：`\pm`, `\leq`, `\geq`, `\neq`, `\approx`

### 复杂公式示例
```latex
输入：\( M_r = \frac{1}{2\zeta\sqrt{1-\zeta^2}} \quad (\zeta \le 0.707) \)
输出：$M_r = \frac{1}{2\zeta\sqrt{1-\zeta^2}} \quad (\zeta \le 0.707)$
```

---

## 🧹 Markdown清理规则 | Cleaning Rules

### 清理多余格式
| 输入 | 输出 | 说明 |
|-----|------|------|
| `**text` | `text` | 去除不成对的 `**` |
| `***text***` | `**text**` | 减少多余的 `*` |

### 保留有效格式
| 输入 | 输出 | 说明 |
|-----|------|------|
| `**bold**` | `**bold**` | 保持加粗 |
| `*italic*` | `*italic*` | 保持斜体 |

---

## ⚙️ 设置选项 | Settings

| 选项 | 默认 | 说明 |
|-----|------|------|
| 粘贴时自动清理 | 开启 | 粘贴内容时自动清理 |
| 显示通知 | 开启 | 显示操作提示 |
| 启用快捷键 | 开启 | `Ctrl+Shift+M` |
| 转换数学公式 | 开启 | LaTeX 格式转换 |

---

## ❓ 常见问题 | FAQ

### Q: 公式转换不生效？
1. 检查设置中"转换数学公式"是否开启
2. 确保使用 `\(...\)` 或 `\[...\]` 格式
3. 重启 Obsidian

### Q: 快捷键不生效？
1. 检查设置中"启用快捷键"是否开启
2. 重启 Obsidian
3. 检查快捷键冲突

### Q: 清理后内容不对？
使用 `Ctrl+Z` 撤销，检查是否误选文本

---

## 🛠️ 开发指南 | Development

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

### 构建命令
```bash
npm install    # 安装依赖
npm run dev   # 开发模式
npm run build # 生产构建
```

### 代码结构
- `convertMathFormulas()` - 数学公式转换
- `cleanMarkdown()` - Markdown 清理
- `handlePaste()` - 粘贴事件处理
- `cleanSelection()` - 快捷键清理

---

## 📋 更新日志 | Changelog

### v1.1.0 (最新)
- ✨ 新增：LaTeX 数学公式自动转换
- 🔧 优化：复杂公式支持
- 🐛 修复：正则表达式问题
- 📝 更新：完整中文文档

### v1.0.0
- 基础功能：Markdown 格式清理
- 快捷键：`Ctrl+Shift+M`
- 粘贴自动清理
- 设置面板

---

## 🤝 贡献 | Contributing

欢迎提交 Issue 和 Pull Request！

## 📄 许可证 | License

MIT License

---

## 📞 联系方式 | Contact

- **GitHub**: https://github.com/Gao-Qian-Long/obsidian-markdown-cleaner
- **问题反馈**: https://github.com/Gao-Qian-Long/obsidian-markdown-cleaner/issues

---

**希望这个插件能提升你在 Obsidian 中的编辑体验！** 🚀