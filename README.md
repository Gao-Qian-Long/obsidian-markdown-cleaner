# Obsidian Markdown Cleaner

一个功能强大的 Obsidian 插件，专门用于清理 Markdown 格式并智能转换数学公式。

🔗 **语言切换 | Language Switch**
- [简体中文](README_zh.md)
- [English](README_en.md)

---

## ✨ 核心功能 | Core Features

### 🧹 Markdown 格式清理 & Markdown Format Cleaning
- **智能清理**：自动识别并清理多余的 `**`、`__` 等格式符号
- **保留有效格式**：保持正常的加粗 `**bold**`、斜体 `*italic*` 不变
- **快捷键操作**：`Ctrl+Shift+M`（或 `Cmd+Shift+M`）快速清理
- **粘贴自动清理**：开启后可自动清理粘贴内容中的多余格式

### 🔢 数学公式转换 & Math Formula Conversion
- **LaTeX 格式转换**：`\(...\)` → `$...$`，`\[...\]` → `$$...$$`
- **复杂公式处理**：完美支持 `\frac`、`\sqrt`、`\sum`、矩阵等
- **中文友好**：智能识别中英文混合文本

## 📦 安装 | Installation

### 普通用户 | End Users
1. 从 [GitHub Releases](https://github.com/Gao-Qian-Long/obsidian-markdown-cleaner/releases) 下载最新版本
2. 解压并重命名为 `obsidian-markdown-cleaner`
3. 复制到你的 Obsidian 库 `.obsidian/plugins/` 目录
4. 在 Obsidian 设置中启用插件

### 开发者 | Developers
```bash
git clone https://github.com/Gao-Qian-Long/obsidian-markdown-cleaner.git
cd obsidian-markdown-cleaner
npm install
npm run build
```

## 🚀 快速开始 | Quick Start

1. 打开 Obsidian 设置 → 第三方插件 → Markdown Cleaner
2. 根据需要开启功能：
   - ✅ 粘贴时自动清理
   - ✅ 启用快捷键
   - ✅ 转换数学公式

### 使用方法 | Usage
- **快捷键**：`Ctrl+Shift+M` 清理选中文本
- **粘贴**：自动清理并转换公式

## 📝 示例 | Examples

### Markdown 清理 | Markdown Cleaning
```
输入：这是一段 **多余的格式** 文本
输出：这是一段 多余的格式 文本
```

### 数学公式转换 | Math Formula Conversion
```
输入：\( E = mc^2 \)
输出：$E = mc^2$

输入：\[
\int_{a}^{b} f(x) dx
\]
输出：
$$
\int_{a}^{b} f(x) dx
$$
```

## 📄 文档 | Documentation

- [简体中文完整文档](README_zh.md)
- [English Documentation](README_en.md)

## 🛠️ 开发 | Development

```bash
npm install    # 安装依赖
npm run dev    # 开发模式
npm run build  # 构建插件
```

## 📋 版本 | Version

**v1.1.0** - 最新版本
- ✨ 新增：LaTeX 数学公式自动转换
- 🔧 优化：复杂公式支持
- 🐛 修复：正则表达式问题

## 🤝 贡献 | Contributing

欢迎提交 Issue 和 Pull Request！

## 📞 联系方式 | Contact

- **GitHub**: [Gao-Qian-Long/obsidian-markdown-cleaner](https://github.com/Gao-Qian-Long/obsidian-markdown-cleaner)
- **问题反馈**: [GitHub Issues](https://github.com/Gao-Qian-Long/obsidian-markdown-cleaner/issues)

## 📄 许可证 | License

MIT License

---

**其他语言版本 | Other Languages:**
- [English](README_en.md)