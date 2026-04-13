import * as esbuild from 'esbuild';

const isProduction = process.argv.includes('--production');
const isDevelopment = process.argv.includes('--development');

const pluginConfig = {
	banner: {
		js: '/* @preserve Markdown Cleaner - Obsidian Plugin */',
	},
	entryPoints: ['main.ts'],
	bundle: true,
	external: ['obsidian'],
	format: 'cjs',
	platform: 'browser',
	target: 'chrome100',
	sourcemap: isDevelopment,
	minify: isProduction,
	outfile: 'main.js',
	logLevel: 'info',
};

async function build() {
	try {
		const result = await esbuild.build(pluginConfig);

		// 如果是开发模式，启动文件监视
		if (isDevelopment) {
			console.log('\n🔄 监视文件变化中...\n');
			const ctx = await esbuild.context(pluginConfig);
			await ctx.watch();
		} else {
			console.log('\n✅ 构建完成！\n');
		}
	} catch (error) {
		console.error('❌ 构建失败:', error);
		process.exit(1);
	}
}

build();
