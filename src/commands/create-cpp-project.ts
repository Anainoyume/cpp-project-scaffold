import * as vscode from 'vscode';
import { commandManager, CommandProvider } from '../features/commands/command-manager';

type ScaffoldFile = {
	path: string;
	content: string;
};

export type CreateCppScaffoldOptions = {
	projectName?: string;
};

const scaffoldFiles = [
	{
		path: '.vscode/tasks.json',
		content: `{
	// 在这里补充你的任务配置
	"version": "2.0.0",
	"tasks": []
}
`,
	},
	{
		path: '.vscode/launch.json',
		content: `{
	// 在这里补充你的调试配置
	"version": "0.2.0",
	"configurations": []
}
`,
	},
	{
		path: '.vscode/settings.json',
		content: `{
	// 在这里补充你的工作区设置
}
`,
	},
	{
		path: 'CMakeLists.txt',
		content: `cmake_minimum_required(VERSION 3.20)
project(MyProject LANGUAGES CXX)

# 在这里补充你的 CMake 配置
`,
	},
	{
		path: '.clangd',
		content: `# 在这里补充你的 clangd 配置
`,
	},
	{
		path: '.clang-format',
		content: `# 在这里补充你的 clang-format 配置
`,
	},
] satisfies ScaffoldFile[];

async function writeFileIfMissing(fileUri: vscode.Uri, content: string): Promise<boolean> {
	try {
		await vscode.workspace.fs.stat(fileUri);
		return false;
	} catch {
		await vscode.workspace.fs.writeFile(fileUri, new TextEncoder().encode(content));
		return true;
	}
}

function renderTemplate(content: string, options: CreateCppScaffoldOptions): string {
	if (options.projectName === undefined) {
		return content;
	}

	return content.replaceAll('MyProject', options.projectName);
}

export async function createCppScaffold(options: CreateCppScaffoldOptions = {}): Promise<void> {
	const workspaceFolder = vscode.workspace.workspaceFolders?.[0];

	if (!workspaceFolder) {
		void vscode.window.showWarningMessage('请先打开一个工作区，再使用 C++: Start。');
		return;
	}

	await vscode.workspace.fs.createDirectory(vscode.Uri.joinPath(workspaceFolder.uri, '.vscode'));

	let createdCount = 0;

	for (const file of scaffoldFiles) {
		const fileUri = vscode.Uri.joinPath(workspaceFolder.uri, ...file.path.split('/'));
		const created = await writeFileIfMissing(fileUri, renderTemplate(file.content, options));

		if (created) {
			createdCount += 1;
		}
	}

	if (createdCount === 0) {
		void vscode.window.showInformationMessage('已存在相关配置文件，没有需要新建的内容。');
		return;
	}

	void vscode.window.showInformationMessage(`已生成 ${createdCount} 个文件，请自行补充内容。`);
}

class CreateCppProjectCommand implements CommandProvider {
	register(): [string, (...args: any[]) => any] {
		return [
			'kukka.create-cpp-project',
			async () => {
				const projectName = await vscode.window.showInputBox({
					title: '创建新项目',
					prompt: '项目名称',
					placeHolder: 'e.g. MyProject',
				});

				if (projectName === undefined) {
					return;
				}

				await createCppScaffold({ projectName });
			}
		];
	}
}
commandManager.register(new CreateCppProjectCommand());