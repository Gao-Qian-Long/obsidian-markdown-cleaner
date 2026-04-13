# Obsidian Markdown Cleaner

一个功能强大的 Obsidian 插件，专门用于清理 Markdown 格式并智能转换数学公式。支持快捷键清理、粘贴自动清理和 LaTeX 数学公式格式转换。

![Obsidian 插件图标](https://img.shields.io/badge/Obsidian-插件-blue)
![版本](https://img.shields.io/badge/版本-1.0.0-green)
![许可证](https://img.shields.io/badge/许可证-MIT-yellow)

## ✨ 核心功能

### 🧹 Markdown 格式清理
- **智能清理**：自动识别并清理多余的 `**`、`__` 等格式符号
- **保留有效格式**：保持正常的加粗 `**bold**`、斜体 `*italic*` 不变
- **快捷键操作**：使用 `Ctrl+Shift+M`（或 `Cmd+Shift+M`）快速清理选中文本
- **粘贴自动清理**：开启后可自动清理粘贴内容中的多余格式

### 🔢 数学公式转换
- **LaTeX 格式转换**：自动将 `\(...\)` 转换为 `$...$`（行内公式）
- **显示公式支持**：自动将 `\[...\]` 转换为 `$$...$$`（块级公式）
- **复杂公式处理**：完美处理包含 `\frac`、`\sqrt`、`\sum` 等复杂 LaTeX 表达式
- **转义处理**：正确处理 LaTeX 中的转义序列和嵌套括号

### 🎯 智能识别
- **中文友好**：智能识别中英文混合文本，避免误清理中文内容
- **边界检测**：只在格式符号位于文本边界时才进行清理
- **配置灵活**：所有功能均可通过设置面板开启/关闭

---

## 📦 安装方法

### 方法一：普通用户 - 直接使用（推荐）
**适用于只想使用插件功能的用户**

1. **下载插件**：
   - 从 [GitHub Releases](https://github.com/your-username/obsidian-markdown-cleaner/releases) 下载最新版本的插件
   - **注意**：下载的版本已经包含构建好的 `main.js` 文件，可以直接使用

2. **安装到 Obsidian**：
   ```
   将插件文件夹重命名为：obsidian-markdown-cleaner
   复制到你的 Obsidian 库的插件目录：
   Windows: C:\Users\<用户名>\<你的库>\.obsidian\plugins\
   macOS: ~/<你的库>/.obsidian/plugins/
   Linux: ~/<你的库>/.obsidian/plugins/
   ```

3. **启用插件**：
   - 打开 Obsidian
   - 进入 `设置` → `第三方插件`
   - 关闭`安全模式`
   - 点击`加载已安装的插件`
   - 在插件列表中找到 `Markdown Cleaner` 并启用

### 方法二：开发者 - 从源码构建
**适用于想要修改代码或贡献开发的用户**

```bash
# 1. 克隆仓库（不包含 node_modules/ 等开发文件）
git clone https://github.com/your-username/obsidian-markdown-cleaner.git
cd obsidian-markdown-cleaner

# 2. 安装依赖（首次需要）
npm install

# 3. 构建插件
npm run build

# 4. 将构建好的插件复制到 Obsidian 插件目录
# Windows（PowerShell）：
Copy-Item -Recurse . "C:\Users\<用户名>\<你的库>\.obsidian\plugins\obsidian-markdown-cleaner\"

# macOS/Linux：
cp -r . ~/<你的库>/.obsidian/plugins/obsidian-markdown-cleaner/
```

**重要说明**：
- GitHub 发布的版本**不包含** `node_modules/`、`dist/`、`.claude/` 等开发文件夹
- 普通用户只需要 `main.js`、`manifest.json`、`README.md` 等核心文件
- 开发者需要运行 `npm install` 来安装依赖，然后 `npm run build` 来构建插件

---

## 🚀 在 Obsidian 中的使用方法

### 1. 启用并配置插件
1. 打开 Obsidian 设置
2. 进入 `第三方插件` → `Markdown Cleaner`
3. 根据需要配置以下选项：

| 设置选项 | 默认值 | 说明 |
|---------|--------|------|
| 粘贴时自动清理 | 开启 | 粘贴内容时自动清理多余格式 |
| 显示通知 | 开启 | 清理完成后显示提示通知 |
| 启用快捷键 | 开启 | 启用 `Ctrl+Shift+M` 快捷键 |
| 转换数学公式 | 开启 | 自动转换 LaTeX 数学公式格式 |

### 2. 使用快捷键清理（推荐）
1. **选中文本**：在编辑器中选中需要清理的文本
2. **按下快捷键**：
   - Windows/Linux：`Ctrl + Shift + M`
   - macOS：`Cmd + Shift + M`
3. **查看结果**：多余的格式符号将被自动清理

### 3. 粘贴自动清理
1. **开启功能**：在插件设置中开启"粘贴时自动清理"
2. **正常粘贴**：使用 `Ctrl+V`（或 `Cmd+V`）粘贴内容
3. **自动处理**：插件会自动清理粘贴内容中的多余格式

### 4. 数学公式自动转换
1. **确保开启**：在插件设置中开启"转换数学公式"
2. **粘贴 LaTeX**：粘贴包含 `\(...\)` 或 `\[...\]` 的内容
3. **自动转换**：插件会自动转换为 Obsidian 兼容的 `$...$` 和 `$$...$$` 格式

---

## 📝 数学公式转换功能详解

### LaTeX 格式支持

#### 行内公式转换
```
原始：这是一个公式 \(E = mc^2\)，另一个公式 \(\sum_{i=1}^{n} i = \frac{n(n+1)}{2}\)
转换：这是一个公式 $E = mc^2$，另一个公式 $\sum_{i=1}^{n} i = \frac{n(n+1)}{2}$
```

#### 显示公式转换
```
原始：积分公式：
\[
\int_{a}^{b} f(x) \, dx = F(b) - F(a)
\]
转换：积分公式：
$$
\int_{a}^{b} f(x) \, dx = F(b) - F(a)
$$
```

### 支持的 LaTeX 命令
- **分数**：`\frac{分子}{分母}`
- **根号**：`\sqrt{内容}`, `\sqrt[n]{内容}`
- **希腊字母**：`\alpha`, `\beta`, `\gamma`, `\omega`, `\zeta` 等
- **运算符**：`\sum`, `\prod`, `\int`, `\oint`
- **括号**：`\left(`, `\right)`, `\left[`, `\right]`
- **矩阵**：`\begin{matrix}`, `\begin{pmatrix}`, `\begin{bmatrix}`
- **对齐环境**：`\begin{aligned}`, `\begin{align}`
- **分段函数**：`\begin{cases}`
- **特殊符号**：`\pm`, `\mp`, `\times`, `\div`, `\leq`, `\geq`, `\neq`, `\approx`

### 复杂公式示例
```latex
原始：\( M_r = \frac{1}{2\zeta\sqrt{1-\zeta^2}} \quad (\zeta \le 0.707) \)
转换：$M_r = \frac{1}{2\zeta\sqrt{1-\zeta^2}} \quad (\zeta \le 0.707)$
```

### 公式中的空白处理
插件会自动处理公式前后的空白：
- `\(  E = mc^2  \)` → `$E = mc^2$`
- `\[  \int f(x)dx  \]` → `$$\int f(x)dx$$`

---

## 🧹 Markdown 清理规则

### 清理多余格式
| 输入示例 | 输出结果 | 说明 |
|---------|---------|------|
| `**text` | `text` | 去除开头不成对的 `**` |
| `text**` | `text` | 去除结尾不成对的 `**` |
| `***text***` | `**text**` | 减少多余的 `*` |
| `__text` | `text` | 去除开头不成对的 `__` |
| `  ** text  ` | `  text  ` | 清理行首多余的格式符号 |

### 保留有效格式
| 输入示例 | 输出结果 | 说明 |
|---------|---------|------|
| `**bold text**` | `**bold text**` | 保留有效的加粗 |
| `__bold text__` | `__bold text__` | 保留有效的加粗（下划线） |
| `*italic text*` | `*italic text*` | 保留有效的斜体 |
| `_**bold italic**_` | `_**bold italic**_` | 保留组合格式 |

### 智能边界检测
插件会智能判断格式符号是否位于文本边界：
- **会清理**：`文本**`、`**文本`、`  **文本`
- **不会清理**：`**文本**`、`文本**文本`、`**文本**文本`

---

## ⚙️ 设置选项详解

### 粘贴时自动清理
- **开启**：粘贴内容时自动清理多余格式
- **关闭**：只使用快捷键手动清理
- **推荐**：开启，特别是从网页或其他编辑器复制内容时

### 显示通知
- **开启**：清理完成后显示提示信息
- **关闭**：静默操作，不显示提示
- **推荐**：开启，方便了解插件工作情况

### 启用快捷键
- **开启**：启用 `Ctrl+Shift+M` 快捷键
- **关闭**：禁用快捷键（只能使用粘贴自动清理）
- **注意**：修改此设置后需要重启 Obsidian 生效

### 转换数学公式
- **开启**：自动转换 LaTeX 数学公式格式
- **关闭**：不处理数学公式，只清理 Markdown 格式
- **推荐**：开启，特别是从学术论文、技术文档复制内容时

---

## ❓ 常见问题解答

### Q1: 为什么数学公式转换不生效？
**可能原因及解决方法：**
1. **设置未开启**：检查插件设置中"转换数学公式"是否开启
2. **格式问题**：确保 LaTeX 公式使用 `\(...\)` 或 `\[...\]` 格式
3. **缓存问题**：重启 Obsidian 让插件重新加载
4. **冲突插件**：检查是否有其他插件修改了粘贴行为

### Q2: 快捷键不生效怎么办？
**排查步骤：**
1. 检查插件设置中"启用快捷键"是否开启
2. 重启 Obsidian（快捷键设置修改后需要重启）
3. 查看 Obsidian 设置 → 快捷键，检查是否有冲突
4. 尝试其他快捷键组合

### Q3: 清理后内容不对怎么办？
**解决方案：**
1. 使用 `Ctrl+Z`（或 `Cmd+Z`）撤销操作
2. 检查是否误选了不该清理的文本
3. 调整清理规则（可在 `main.ts` 中修改）

### Q4: 如何调整清理规则？
**方法：**
1. 找到 `main.ts` 文件中的 `cleanMarkdown()` 函数
2. 修改正则表达式匹配规则
3. 重新构建插件：`npm run build`
4. 重启 Obsidian

### Q5: 插件会影响性能吗？
**不会**。插件只在以下情况下运行：
1. 用户按下快捷键
2. 用户粘贴内容（如果开启自动清理）
3. 处理量很小，不会影响 Obsidian 性能

### Q6: 支持哪些 Obsidian 版本？
- **最低版本**：Obsidian 0.15.0+
- **推荐版本**：Obsidian 1.0.0+
- **测试版本**：在最新 Obsidian 版本上完全兼容

---

## 🛠️ 开发与构建

### 项目结构
```
obsidian-markdown-cleaner/
├── manifest.json      # 插件元数据（名称、版本、作者等）
├── main.ts           # 主逻辑代码（TypeScript）
├── main.js           # 构建后的 JavaScript 文件
├── package.json      # npm 项目配置和依赖
├── tsconfig.json     # TypeScript 编译器配置
├── esbuild.config.mjs # 构建配置文件
└── README.md         # 使用说明文档
```

### 开发环境搭建
```bash
# 1. 克隆项目
git clone https://github.com/your-username/obsidian-markdown-cleaner.git
cd obsidian-markdown-cleaner

# 2. 安装依赖
npm install

# 3. 开发模式（自动重新构建）
npm run dev

# 4. 生产构建
npm run build
```

### 代码结构说明
- **`convertMathFormulas()`**：数学公式转换函数
- **`cleanMarkdown()`**：Markdown 格式清理函数  
- **`handlePaste()`**：粘贴事件处理函数
- **`cleanSelection()`**：快捷键清理函数

### 添加新功能
1. 在 `main.ts` 中添加新功能函数
2. 在设置界面添加对应的配置选项
3. 测试功能是否正常工作
4. 提交 Pull Request

---

## 📋 更新日志

### v1.1.0（最新）
- **新增**：LaTeX 数学公式自动转换功能
- **增强**：复杂公式支持（分数、根号、求和等）
- **优化**：公式空白自动处理
- **修复**：正则表达式匹配完整公式的问题
- **改进**：中文文档和使用说明

### v1.0.0
- **基础功能**：Markdown 格式清理
- **快捷键**：`Ctrl+Shift+M` 快速清理
- **自动清理**：粘贴内容自动清理
- **设置面板**：完整的配置选项
- **智能识别**：中英文混合文本处理

---

## 🤝 贡献指南

欢迎贡献代码、报告问题或提出建议！

### 报告问题
1. 在 [GitHub Issues](https://github.com/your-username/obsidian-markdown-cleaner/issues) 中创建新 issue
2. 描述问题的详细情况
3. 提供复现步骤和截图
4. 说明你的 Obsidian 版本和操作系统

### 提交代码
1. Fork 本仓库
2. 创建功能分支：`git checkout -b feature/新功能`
3. 提交更改：`git commit -m '添加新功能'`
4. 推送到分支：`git push origin feature/新功能`
5. 提交 Pull Request

### 开发规范
- 使用 TypeScript 编写代码
- 遵循现有的代码风格
- 添加必要的注释
- 测试所有功能是否正常工作

---

## 📄 许可证

本项目采用 MIT 许可证。详情请见 [LICENSE](LICENSE) 文件。

```
MIT License

Copyright (c) 2023 Obsidian Markdown Cleaner

Permission is hereby granted...
```

## 🙏 致谢

- **Obsidian 团队**：感谢提供优秀的笔记工具和插件开发框架
- **开源社区**：感谢所有贡献者和用户的反馈与支持
- **LaTeX 项目**：感谢提供强大的数学排版系统
- **测试用户**：感谢所有帮助测试和反馈问题的用户

---

## 📞 联系方式

- **GitHub 仓库**：[https://github.com/your-username/obsidian-markdown-cleaner](https://github.com/your-username/obsidian-markdown-cleaner)
- **问题反馈**：[GitHub Issues](https://github.com/your-username/obsidian-markdown-cleaner/issues)
- **Obsidian 社区**：在 Obsidian 官方论坛搜索 "Markdown Cleaner"

---

**希望这个插件能提升你在 Obsidian 中的编辑体验！如果有任何问题或建议，欢迎随时反馈。** 🚀