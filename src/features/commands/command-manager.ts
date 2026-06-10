import * as vscode from 'vscode';

export interface CommandProvider {
    register() : [string, (...args: any[]) => any]
}
 
class CommandManager {
    
    private _list: CommandProvider[] = [];
     
    register(provider: CommandProvider): void {
        this._list.push(provider);
    }

    init(context: vscode.ExtensionContext): void {
        for (const provider of this._list) {
            let dispose = vscode.commands.registerCommand(...provider.register());
            context.subscriptions.push(dispose);
        }
    }

}
 // 一个模块只会被执行一次, 直接导出类实例
export const commandManager = new CommandManager();