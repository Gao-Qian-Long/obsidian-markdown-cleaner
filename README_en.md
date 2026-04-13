# Obsidian Markdown Cleaner

A powerful Obsidian plugin for cleaning Markdown formatting and intelligently converting mathematical formulas. Supports hotkey cleaning, paste auto-cleaning, and LaTeX math formula format conversion.

![Obsidian Plugin](https://img.shields.io/badge/Obsidian-Plugin-blue)
![Version](https://img.shields.io/badge/Version-1.1.0-green)
![License](https://img.shields.io/badge/License-MIT-yellow)

## ✨ Core Features

### 🧹 Markdown Format Cleaning
- **Smart Cleaning**: Automatically identifies and cleans excess `**`, `__` and other formatting symbols
- **Preserve Valid Formats**: Keeps normal bold `**bold**` and italic `*italic*` unchanged
- **Hotkey Operation**: Use `Ctrl+Shift+M` (or `Cmd+Shift+M`) to quickly clean selected text
- **Paste Auto-Cleaning**: Automatically cleans excess formatting in pasted content when enabled

### 🔢 Math Formula Conversion
- **LaTeX Format Conversion**: Automatically converts `\(...\)` to `$...$` (inline formula)
- **Display Formula Support**: Automatically converts `\[...\]` to `$$...$$` (block formula)
- **Complex Formula Handling**: Perfectly handles complex LaTeX expressions like `\frac`, `\sqrt`, `\sum`
- **Escape Handling**: Correctly handles escape sequences and nested brackets in LaTeX

### 🎯 Smart Recognition
- **Chinese-Friendly**: Intelligently identifies mixed Chinese and English text, avoiding accidental cleaning of Chinese content
- **Boundary Detection**: Only cleans when formatting symbols are at text boundaries
- **Flexible Configuration**: All features can be enabled/disabled through the settings panel

---

## 📦 Installation

### Method 1: For End Users - Direct Use (Recommended)
**For users who only want to use the plugin**

1. **Download Plugin**:
   - Download the latest version from [GitHub Releases](https://github.com/Gao-Qian-Long/obsidian-markdown-cleaner/releases)
   - **Note**: The downloaded version already contains the built `main.js` file and can be used directly

2. **Install to Obsidian**:
   ```
   Rename the plugin folder to: obsidian-markdown-cleaner
   Copy to your Obsidian vault's plugin directory:
   Windows: C:\Users\<Username>\<Your Vault>\.obsidian\plugins\
   macOS: ~/<Your Vault>/.obsidian/plugins/
   Linux: ~/<Your Vault>/.obsidian/plugins/
   ```

3. **Enable Plugin**:
   - Open Obsidian
   - Go to `Settings` → `Third-party plugins`
   - Turn off `Safe mode`
   - Click `Load installed plugins`
   - Find and enable `Markdown Cleaner` in the plugin list

### Method 2: For Developers - Build from Source
**For users who want to modify code or contribute**

```bash
# 1. Clone repository (does not include node_modules/ etc.)
git clone https://github.com/Gao-Qian-Long/obsidian-markdown-cleaner.git
cd obsidian-markdown-cleaner

# 2. Install dependencies (required for first time)
npm install

# 3. Build plugin
npm run build

# 4. Copy the built plugin to Obsidian plugin directory
# Windows (PowerShell):
Copy-Item -Recurse . "C:\Users\<Username>\<Your Vault>\.obsidian\plugins\obsidian-markdown-cleaner\"

# macOS/Linux:
cp -r . ~/<Your Vault>/.obsidian/plugins/obsidian-markdown-cleaner/
```

**Important Notes**:
- GitHub releases **do not include** `node_modules/`, `dist/`, `.claude/` and other development folders
- End users only need core files like `main.js`, `manifest.json`, `README.md`
- Developers need to run `npm install` to install dependencies, then `npm run build` to build the plugin

---

## 🚀 How to Use in Obsidian

### 1. Enable and Configure Plugin
1. Open Obsidian Settings
2. Go to `Third-party plugins` → `Markdown Cleaner`
3. Configure the following options as needed:

| Setting | Default | Description |
|---------|---------|-------------|
| Auto-clean on paste | Enabled | Auto-clean excess formatting when pasting |
| Show notification | Enabled | Show notification after cleaning |
| Enable hotkey | Enabled | Enable `Ctrl+Shift+M` hotkey |
| Convert math formulas | Enabled | Auto-convert LaTeX math formulas |

### 2. Use Hotkey Cleaning (Recommended)
1. **Select Text**: Select the text to clean in the editor
2. **Press Hotkey**:
   - Windows/Linux: `Ctrl + Shift + M`
   - macOS: `Cmd + Shift + M`
3. **View Result**: Excess formatting symbols will be automatically cleaned

### 3. Paste Auto-Cleaning
1. **Enable Feature**: Enable "Paste auto-cleaning" in plugin settings
2. **Paste Normally**: Use `Ctrl+V` (or `Cmd+V`) to paste content
3. **Auto Process**: Plugin will automatically clean excess formatting in pasted content

### 4. Math Formula Auto-Conversion
1. **Ensure Enabled**: Enable "Convert math formulas" in plugin settings
2. **Paste LaTeX**: Paste content containing `\(...\)` or `\[...\]`
3. **Auto Convert**: Plugin will automatically convert to Obsidian-compatible `$...$` and `$$...$$` formats

---

## 📝 Math Formula Conversion Details

### LaTeX Format Support

#### Inline Formula Conversion
```
Original: This is a formula \(E = mc^2\), another formula \(\sum_{i=1}^{n} i = \frac{n(n+1)}{2}\)
Converted: This is a formula $E = mc^2$, another formula $\sum_{i=1}^{n} i = \frac{n(n+1)}{2}$
```

#### Display Formula Conversion
```
Original: Integral formula:
\[
\int_{a}^{b} f(x) \, dx = F(b) - F(a)
\]
Converted: Integral formula:
$$
\int_{a}^{b} f(x) \, dx = F(b) - F(a)
$$
```

### Supported LaTeX Commands
- **Fraction**: `\frac{numerator}{denominator}`
- **Square root**: `\sqrt{content}`, `\sqrt[n]{content}`
- **Greek letters**: `\alpha`, `\beta`, `\gamma`, `\omega`, `\zeta` etc.
- **Operators**: `\sum`, `\prod`, `\int`, `\oint`
- **Brackets**: `\left(`, `\right)`, `\left[`, `\right]`
- **Matrix**: `\begin{matrix}`, `\begin{pmatrix}`, `\begin{bmatrix}`
- **Aligned environment**: `\begin{aligned}`, `\begin{align}`
- **Piecewise function**: `\begin{cases}`
- **Special symbols**: `\pm`, `\mp`, `\times`, `\div`, `\leq`, `\geq`, `\neq`, `\approx`

### Complex Formula Example
```latex
Original: \( M_r = \frac{1}{2\zeta\sqrt{1-\zeta^2}} \quad (\zeta \le 0.707) \)
Converted: $M_r = \frac{1}{2\zeta\sqrt{1-\zeta^2}} \quad (\zeta \le 0.707)$
```

### Whitespace Handling in Formulas
Plugin automatically handles whitespace before and after formulas:
- `\(  E = mc^2  \)` → `$E = mc^2$`
- `\[  \int f(x)dx  \]` → `$$\int f(x)dx$$`

---

## 🧹 Markdown Cleaning Rules

### Cleaning Excess Formatting
| Input | Output | Description |
|-------|--------|-------------|
| `**text` | `text` | Remove unpaired `**` at beginning |
| `text**` | `text` | Remove unpaired `**` at end |
| `***text***` | `**text**` | Reduce excess `*` |
| `__text` | `text` | Remove unpaired `__` at beginning |
| `  ** text  ` | `  text  ` | Clean excess formatting symbols at line start |

### Preserving Valid Formatting
| Input | Output | Description |
|-------|--------|-------------|
| `**bold text**` | `**bold text**` | Keep valid bold |
| `__bold text__` | `__bold text__` | Keep valid bold (underscore) |
| `*italic text*` | `*italic text*` | Keep valid italic |
| `_**bold italic**_` | `_**bold italic**_` | Keep combined formatting |

### Smart Boundary Detection
Plugin intelligently determines if formatting symbols are at text boundaries:
- **Will clean**: `text**`, `**text`, `  **text`
- **Will NOT clean**: `**text**`, `text**text`, `**text**text`

---

## ⚙️ Settings Details

### Paste Auto-Cleaning
- **Enabled**: Auto-cleans excess formatting when pasting
- **Disabled**: Only use hotkey for manual cleaning
- **Recommendation**: Enable, especially when copying from web or other editors

### Show Notification
- **Enabled**: Show notification after cleaning
- **Disabled**: Silent operation, no notifications
- **Recommendation**: Enable for better awareness of plugin work

### Enable Hotkey
- **Enabled**: Enable `Ctrl+Shift+M` hotkey
- **Disabled**: Disable hotkey (can only use paste auto-cleaning)
- **Note**: Need to restart Obsidian after changing this setting

### Convert Math Formulas
- **Enabled**: Auto-convert LaTeX math formula formats
- **Disabled**: Don't process math formulas, only clean Markdown formatting
- **Recommendation**: Enable, especially when copying from academic papers or technical documents

---

## ❓ FAQ

### Q1: Why isn't math formula conversion working?
**Possible causes and solutions:**
1. **Setting not enabled**: Check if "Convert math formulas" is enabled in plugin settings
2. **Format issue**: Ensure LaTeX formulas use `\(...\)` or `\[...\]` format
3. **Cache issue**: Restart Obsidian to let plugin reload
4. **Plugin conflict**: Check if other plugins modify paste behavior

### Q2: Hotkey not working?
**Troubleshooting steps:**
1. Check if "Enable hotkey" is enabled in plugin settings
2. Restart Obsidian (hotkey settings require restart after modification)
3. Check Obsidian Settings → Hotkeys, check for conflicts
4. Try other hotkey combinations

### Q3: Content is wrong after cleaning?
**Solutions:**
1. Use `Ctrl+Z` (or `Cmd+Z`) to undo
2. Check if you accidentally selected text that shouldn't be cleaned
3. Adjust cleaning rules (can modify in `main.ts`)

### Q4: How to adjust cleaning rules?
**Method:**
1. Find the `cleanMarkdown()` function in `main.ts`
2. Modify regex matching rules
3. Rebuild plugin: `npm run build`
4. Restart Obsidian

### Q5: Will the plugin affect performance?
**No**. Plugin only runs in these cases:
1. User presses hotkey
2. User pastes content (if auto-cleaning is enabled)
3. Processing is minimal and won't affect Obsidian performance

### Q6: Which Obsidian versions are supported?
- **Minimum version**: Obsidian 0.15.0+
- **Recommended version**: Obsidian 1.0.0+
- **Tested version**: Fully compatible with latest Obsidian version

---

## 🛠️ Development & Build

### Project Structure
```
obsidian-markdown-cleaner/
├── manifest.json      # Plugin metadata (name, version, author, etc.)
├── main.ts           # Main logic code (TypeScript)
├── main.js           # Built JavaScript file
├── package.json      # npm project configuration and dependencies
├── tsconfig.json     # TypeScript compiler configuration
├── esbuild.config.mjs # Build configuration file
└── README.md         # Documentation
```

### Development Environment Setup
```bash
# 1. Clone project
git clone https://github.com/Gao-Qian-Long/obsidian-markdown-cleaner.git
cd obsidian-markdown-cleaner

# 2. Install dependencies
npm install

# 3. Development mode (auto rebuild)
npm run dev

# 4. Production build
npm run build
```

### Code Structure Description
- **`convertMathFormulas()`**: Math formula conversion function
- **`cleanMarkdown()`**: Markdown format cleaning function
- **`handlePaste()`**: Paste event handler
- **`cleanSelection()`**: Hotkey cleaning function

### Adding New Features
1. Add new feature functions in `main.ts`
2. Add corresponding configuration options in the settings interface
3. Test if the feature works correctly
4. Submit Pull Request

---

## 📋 Changelog

### v1.1.0 (Latest)
- **New**: LaTeX math formula auto-conversion feature
- **Enhanced**: Complex formula support (fractions, roots, sums, etc.)
- **Optimized**: Formula whitespace auto-processing
- **Fixed**: Regex matching for complete formulas
- **Improved**: Chinese documentation and user guide

### v1.0.0
- **Basic**: Markdown format cleaning
- **Hotkey**: `Ctrl+Shift+M` quick cleaning
- **Auto-cleaning**: Paste content auto-cleaning
- **Settings panel**: Complete configuration options
- **Smart recognition**: Chinese and English mixed text processing

---

## 🤝 Contributing

Welcome to contribute code, report issues, or provide suggestions!

### Reporting Issues
1. Create a new issue in [GitHub Issues](https://github.com/Gao-Qian-Long/obsidian-markdown-cleaner/issues)
2. Describe the issue in detail
3. Provide reproduction steps and screenshots
4. Specify your Obsidian version and operating system

### Submitting Code
1. Fork this repository
2. Create feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -m 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit Pull Request

### Development Standards
- Write code using TypeScript
- Follow existing code style
- Add necessary comments
- Test all features work correctly

---

## 📄 License

This project is licensed under MIT License. See [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2023 Obsidian Markdown Cleaner

Permission is hereby granted...
```

## 🙏 Acknowledgments

- **Obsidian Team**: Thanks for providing excellent note-taking tools and plugin development framework
- **Open Source Community**: Thanks for all contributors' feedback and support
- **LaTeX Project**: Thanks for providing powerful mathematical typesetting system
- **Test Users**: Thanks to all users who helped test and provide feedback

---

## 📞 Contact

- **GitHub Repository**: [https://github.com/Gao-Qian-Long/obsidian-markdown-cleaner](https://github.com/Gao-Qian-Long/obsidian-markdown-cleaner)
- **Issue Feedback**: [GitHub Issues](https://github.com/Gao-Qian-Long/obsidian-markdown-cleaner/issues)
- **Obsidian Community**: Search for "Markdown Cleaner" in Obsidian official forum

---

**Hope this plugin enhances your editing experience in Obsidian! If you have any questions or suggestions, feel free to feedback.** 🚀