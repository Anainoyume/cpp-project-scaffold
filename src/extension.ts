import * as vscode from 'vscode';

import { registerStartCommand } from './commands/start';

// 当您的扩展被激活时会调用此方法
// 您的扩展将在第一次执行命令时激活
export function activate(context: vscode.ExtensionContext) : void {
	context.subscriptions.push(registerStartCommand());
}

// 当您的扩展被停用时，将调用此方法
export function deactivate() : void {
	
}
