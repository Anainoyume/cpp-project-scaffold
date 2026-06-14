import * as vscode from 'vscode';
import { commandManager, CommandProvider } from '../features/commands/command-manager';
import path from 'path';
import { readFile, writeFile } from 'fs/promises';
import { MacroParser } from '../core/utils/macro-parser';
import { mkdir } from 'fs/promises';

interface TemplateConfig {
	config: {
		language: string,
		templates: { path: string, template: string }[],
		macro: { name: string, prompt: string, placeHolder: string }[]
	}[]
	index?: { [key: string]: number }
}

class CreateCppProjectCommand implements CommandProvider {
	register(context: vscode.ExtensionContext): [string, (...args: any[]) => any] {
		return [
			'kukka.create-project',
			async () => {
				const workspaceFolders = vscode.workspace.workspaceFolders;
				if (!workspaceFolders || workspaceFolders.length === 0) {
					vscode.window.showErrorMessage('未打开任何工作区, 请先打开一个项目文件夹!');
					return;
				}
				const userRootPath = workspaceFolders[0].uri.fsPath;

				const rootPath = context.asAbsolutePath('');
				const templatePath = path.join(rootPath, 'resources', 'templates');

				const configJson = await readFile(path.join(templatePath, 'config.json'), 'utf-8');
				const templateConfig = JSON.parse(configJson) as TemplateConfig;

				let languageList: string[] = [];
				if (!templateConfig.index) {
					templateConfig.index = {};
				}
				for (let i = 0; i < templateConfig.config.length; i++) {
					let c = templateConfig.config[i];
					languageList.push(c.language);
					templateConfig.index[c.language] = i;
				}

				const selectLanguage = await vscode.window.showQuickPick(languageList, {
					title: '创建新项目',
					prompt: '项目类型',
					placeHolder: 'cpp',
					matchOnDescription: true,
					matchOnDetail: true,
					canPickMany: false
				});

				if (selectLanguage === undefined) {
					throw new Error('Select Language: The selected language is undefined!');
				}

				let selectConfig = templateConfig.config[templateConfig.index[selectLanguage]];
				let parser = new MacroParser();

				for (const mapping of selectConfig.macro) {
					let replaced = await vscode.window.showInputBox({
						title: '创建新项目',
						prompt: mapping.prompt,
						placeHolder: mapping.placeHolder
					});

					if (replaced === undefined) {
						vscode.window.showWarningMessage('操作已取消');
						return;
					}
					parser.setRule(mapping.name, replaced);
				}

				for (const template of selectConfig.templates) {
					const templateFilePath = path.join(templatePath, template.template);
					console.log(templateFilePath);
					let content = await readFile(templateFilePath, 'utf-8');
					const data = parser.parse(content);

					let fileName = path.basename(templateFilePath);
					fileName = fileName.replace(/\.template/g, '');

					const outPath = path.join(userRootPath, template.path, fileName);
					await mkdir(path.dirname(outPath), { recursive: true });

					await writeFile(outPath, data, 'utf-8');
				}

				vscode.window.showInformationMessage(`创建项目成功, 共生成 ${selectConfig.templates.length} 个文件!`);
			}
		];
	}
}
commandManager.register(new CreateCppProjectCommand());