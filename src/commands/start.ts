import * as vscode from 'vscode';

import { createCppScaffold } from '../features/cppScaffold';

export const START_COMMAND_ID = 'kukka.start';

export function registerStartCommand(): vscode.Disposable {
	return vscode.commands.registerCommand(START_COMMAND_ID, async () => {
		const projectName = await vscode.window.showInputBox({
			title: '创建新项目',
			prompt: '项目名称',
			placeHolder: 'e.g. MyProject',
		});

		if (projectName === undefined) {
			return;
		}

		await createCppScaffold({ projectName });
	});
}