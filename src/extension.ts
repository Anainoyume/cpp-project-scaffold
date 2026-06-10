import * as vscode from 'vscode';
import { commandManager } from './features/commands/command-manager';

// 导入注册
import './commands/create-cpp-project';

// 当您的扩展被激活时会调用此方法
// 您的扩展将在第一次执行命令时激活
export function activate(context: vscode.ExtensionContext) : void {
	commandManager.init(context);
}

// 当您的扩展被停用时，将调用此方法
export function deactivate() : void {
	
}
