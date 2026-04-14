# GitHub Release 和插件提交指南（已修复）

## ✅ 已完成的修复

- [x] 插件 ID 修改为 `markdown-cleaner`（移除 obsidian）
- [x] 移除 manifest.json 中的 keywords 属性
- [x] 更新描述（移除 Obsidian 提及，添加句号结尾）
- [x] 添加 MIT LICENSE 文件
- [x] 代码已推送并构建

---

## 第一步：创建 GitHub Release（重要！）

1. 打开：https://github.com/Gao-Qian-Long/obsidian-markdown-cleaner/releases/new
2. 填写信息：
   - **Tag version**: `1.1.0`
   - **Release title**: `v1.1.0`
   - **Description**: 更新内容说明
3. **重要**：在下方 **"Attach binaries by dropping them here or selecting them"** 区域上传：
   - `main.js`（在项目根目录）
   - `manifest.json`（在项目根目录）
4. 点击 **"Publish release"**

---

## 第二步：更新 community-plugins.json

修改为以下内容（添加到**文件最末尾**）：
```json
{
    "id": "markdown-cleaner",
    "name": "Markdown Cleaner",
    "description": "清理文本中多余的 Markdown 格式符号，自动转换 LaTeX 数学公式为兼容格式.",
    "author": "Gao-Qian-Long",
    "repo": "Gao-Qian-Long/obsidian-markdown-cleaner"
}
```

**注意**：确保前一个插件后面有逗号。

---

## 第三步：提交 PR（按照官方模板格式）

### PR 标题：
```
Add plugin: Markdown Cleaner
```

### PR 描述（按照模板格式）：

```markdown
## Plugin name
Markdown Cleaner

## Plugin description
清理文本中多余的 Markdown 格式符号，自动转换 LaTeX 数学公式为兼容格式.

## Does your plugin meet our guidelines?
- [x] I am the author of this plugin
- [x] I will provide support for this plugin
- [x] I have tested this plugin locally
- [x] This plugin is open source
- [x] This plugin uses the 'community-plugins.json' file correctly
- [x] This plugin is not on our rejection list (if you don't know what this means, please ask before submitting)
```

---

## 第四步：操作步骤

1. Fork 仓库 → 编辑 community-plugins.json → Commit changes → Propose changes
2. 在 PR 页面：
   - 点击 **"Preview"** → 选择 **"Community Plugin"**
   - PR 标题填写：`Add plugin: Markdown Cleaner`
   - 描述填写上面的模板
3. 点击 **"Create pull request"**

---

## 验证清单

- [x] `manifest.json` 版本为 `1.1.0`
- [x] 插件 ID 为 `markdown-cleaner`
- [x] 描述以句号结尾（`.`）
- [x] GitHub Release 已创建，包含 main.js 和 manifest.json 附件
- [x] LICENSE 文件存在
- [ ] PR 遵循官方模板格式
- [ ] 添加到 community-plugins.json 最末尾
