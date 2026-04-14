# GitHub Release 和插件提交指南

## 第一步：创建 GitHub Release

1. 打开 GitHub 仓库：https://github.com/Gao-Qian-Long/obsidian-markdown-cleaner
2. 点击 "Releases" → "Create a new release"
3. 填写信息：
   - **Tag version**: `1.1.0`
   - **Release title**: `v1.1.0`
   - **Description**: 
     ```
     ## v1.1.0 更新内容
     
     ✨ 新增：LaTeX 数学公式自动转换功能
     🔧 优化：复杂公式支持
     🐛 修复：正则表达式匹配问题
     📝 更新：完整中英双语文档
     ```
4. 点击 "Publish release"

## 第二步：提交到 Obsidian 社区插件列表

### 1. Fork 官方仓库
访问 https://github.com/obsidianmd/obsidian-releases 并点击 "Fork"

### 2. 编辑 community-plugins.json
在仓库中找到 `community-plugins.json` 文件，按字母顺序插入以下内容：

```json
{
    "id": "obsidian-markdown-cleaner",
    "name": "Markdown Cleaner",
    "description": "清理文本中多余的 Markdown 格式符号，自动转换 LaTeX 数学公式为 Obsidian 兼容格式",
    "author": "Gao-Qian-Long",
    "repo": "Gao-Qian-Long/obsidian-markdown-cleaner"
}
```

### 3. 提交 Pull Request
- 点击 "Commit changes"
- 创建 Pull Request 到 `obsidianmd/obsidian-releases`
- 等待 Obsidian 团队审核（通常需要几天到几周）

## 验证清单

在提交前请确认：
- [x] `manifest.json` 版本为 `1.1.0`
- [x] GitHub Release 已创建并包含编译后的 `main.js` 和 `manifest.json`
- [x] 插件在本地测试正常
- [x] README.md 文档完整

## 注意事项

1. **审核时间**：Obsidian 团队手动审核，可能需要几天到几周
2. **被拒原因**：
   - 插件功能过于简单
   - 包含恶意代码
   - manifest.json 格式错误
   - Release 未包含正确文件

3. **后续更新**：
   - 每次更新版本号后，需要创建新的 Release
   - 插件会自动从 GitHub 获取更新
