// 模块“vscode”包含 VS Code 扩展性 API
// 导入模块并在下面的代码中使用别名 vscode 引用它
import * as vscode from 'vscode';

const START_COMMAND_ID = 'kukka.start';

const scaffoldFiles = [
	{
		path: '.vscode/tasks.json',
		content: `{
	// 在这里补充你的任务配置
	"version": "2.0.0",
	"tasks": []
}
`
	},
	{
		path: '.vscode/launch.json',
		content: `{
	// 在这里补充你的调试配置
	"version": "0.2.0",
	"configurations": []
}
`
	},
	{
		path: '.vscode/settings.json',
		content: `{
	// 在这里补充你的工作区设置
}
`
	},
	{
		path: 'CMakeLists.txt',
		content: `cmake_minimum_required(VERSION 3.20)
project(MyProject LANGUAGES CXX)

# 在这里补充你的 CMake 配置
`
	},
	{
		path: '.clangd',
		content: `# 在这里补充你的 clangd 配置
`
	},
	{
		path: '.clang-format',
		content: `# 在这里补充你的 clang-format 配置
`
	},
];

async function writeFileIfMissing(fileUri: vscode.Uri, content: string): Promise<boolean> {
	try {
		await vscode.workspace.fs.stat(fileUri);
		return false;
	} catch {
		await vscode.workspace.fs.writeFile(fileUri, new TextEncoder().encode(content));
		return true;
	}
}

async function createCppScaffold(): Promise<void> {
	const workspaceFolder = vscode.workspace.workspaceFolders?.[0];

	if (!workspaceFolder) {
		void vscode.window.showWarningMessage('请先打开一个工作区，再使用 C++: Start。');
		return;
	}

	await vscode.workspace.fs.createDirectory(vscode.Uri.joinPath(workspaceFolder.uri, '.vscode'));
	
	let createdCount = 0;

	for (const file of scaffoldFiles) {
		const fileUri = vscode.Uri.joinPath(workspaceFolder.uri, ...file.path.split('/'));
		const created = await writeFileIfMissing(fileUri, file.content);

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

// 当您的扩展被激活时会调用此方法
// 您的扩展将在第一次执行命令时激活
export function activate(context: vscode.ExtensionContext) : void {

	// 该命令已在 package.json 文件中定义
	const disposable = vscode.commands.registerCommand(START_COMMAND_ID, async () => {
		let ret = await vscode.window.showInputBox({
			title: "创建新项目",
			prompt: "项目名称",
			placeHolder: "e.g. MyProject"
		});
	});
	
	

	context.subscriptions.push(disposable);
}

// 当您的扩展被停用时，将调用此方法
export function deactivate() : void {
	
}
