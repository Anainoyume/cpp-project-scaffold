# VS Code `vscode` 模块 API 速查

> 目标：先认识最常用、最重要的 API。这里不是完整参考手册，而是适合入门和日常开发的速查版。

## 1. `vscode` 模块里最常见的内容

`vscode` 这个模块里并不全是“类”，很多其实是：

- **命名空间**：例如 `vscode.window`、`vscode.workspace`、`vscode.commands`
- **接口**：例如 `TextDocument`、`ExtensionContext`、`WorkspaceFolder`
- **类**：例如 `Uri`、`Position`、`Range`、`Selection`、`EventEmitter`
- **工具类型**：例如 `Disposable`、`ThemeIcon`、`ThemeColor`

如果你刚开始学，优先记住下面这些。

---

## 2. 最重要的命名空间

### 2.1 `vscode.window`
负责“界面相关”的事情。

最常见函数：

- `showInformationMessage()`：提示信息
- `showWarningMessage()`：警告信息
- `showErrorMessage()`：错误信息
- `showInputBox()`：输入框
- `showQuickPick()`：快速选择
- `showOpenDialog()`：打开文件/文件夹选择框
- `showSaveDialog()`：保存文件选择框
- `showTextDocument()`：打开编辑器
- `createOutputChannel()`：创建输出面板
- `createTerminal()`：创建终端

例子：

```ts
vscode.window.showInformationMessage('Hello');
```

---

### 2.2 `vscode.workspace`
负责“工作区、文件、编辑器数据”的事情。

最常见函数：

- `workspaceFolders`：获取当前打开的工作区
- `openTextDocument()`：打开文本文件
- `fs.readFile()`：读取文件
- `fs.writeFile()`：写入文件
- `fs.createDirectory()`：创建目录
- `fs.stat()`：判断文件是否存在、获取文件信息
- `getConfiguration()`：读取设置
- `findFiles()`：搜索文件
- `applyEdit()`：应用编辑
- `onDidSaveTextDocument()`：保存文件时触发
- `onDidChangeTextDocument()`：文档变化时触发

例子：

```ts
const folders = vscode.workspace.workspaceFolders;
```

---

### 2.3 `vscode.commands`
负责“注册命令、执行命令”。

最常见函数：

- `registerCommand()`：注册命令
- `executeCommand()`：执行命令
- `registerTextEditorCommand()`：注册只对文本编辑器生效的命令

例子：

```ts
vscode.commands.registerCommand('my.command', () => {
  console.log('clicked');
});
```

---

### 2.4 `vscode.env`
负责运行环境相关功能。

常见函数/属性：

- `clipboard.writeText()` / `clipboard.readText()`：剪贴板
- `appName`：应用名
- `language`：界面语言
- `uiKind`：UI 类型
- `machineId`：机器标识

---

### 2.5 `vscode.languages`
负责语言功能扩展。

常见函数：

- `registerCompletionItemProvider()`：补全
- `registerHoverProvider()`：悬停提示
- `registerDefinitionProvider()`：跳转定义
- `registerRenameProvider()`：重命名
- `registerCodeActionsProvider()`：代码操作
- `registerDocumentFormattingEditProvider()`：格式化

---

### 2.6 `vscode.debug`
负责调试相关功能。

常见函数：

- `startDebugging()`：启动调试
- `activeDebugSession`：当前调试会话
- `onDidStartDebugSession()`：调试开始时触发
- `onDidTerminateDebugSession()`：调试结束时触发

---

### 2.7 `vscode.extensions`
负责读取和使用其他扩展。

常见函数：

- `getExtension()`：获取某个扩展
- `all`：所有扩展

---

## 3. 最重要的“类”或接口

### 3.1 `Uri`
表示文件或资源路径。

常见方法：

- `Uri.file()`：把磁盘路径转成 `Uri`
- `Uri.parse()`：解析 URI 字符串
- `Uri.joinPath()`：拼接路径
- `toString()`：转成字符串

例子：

```ts
const uri = vscode.Uri.joinPath(workspaceFolder.uri, '.vscode', 'tasks.json');
```

---

### 3.2 `Position`
表示文档中的位置，格式是“第几行第几列”。

常见用途：

- 光标位置
- 找到文本中的某个点

例子：

```ts
const pos = new vscode.Position(1, 5);
```

---

### 3.3 `Range`
表示文档中的一段范围。

常见用途：

- 选中文本
- 高亮一段内容

例子：

```ts
const range = new vscode.Range(0, 0, 0, 10);
```

---

### 3.4 `Selection`
表示用户选中的文本范围。

它本质上是 `Range` 的一种扩展，常用于编辑器选区。

---

### 3.5 `Location`
表示“某个位置在哪里”。

常用于：

- 定义跳转
- 引用跳转

---

### 3.6 `TextDocument`
表示一个打开的文本文件。

常见属性：

- `uri`
- `fileName`
- `languageId`
- `getText()`
- `lineAt()`

---

### 3.7 `TextEditor`
表示当前编辑器窗口。

常见属性/方法：

- `document`
- `selection`
- `edit()`
- `insertSnippet()`
- `revealRange()`

---

### 3.8 `WorkspaceEdit`
表示一组编辑操作。

常用于批量修改文件内容。

---

### 3.9 `EventEmitter`
用于自己发事件、订阅事件。

常见方法：

- `event`：订阅函数
- `fire()`：触发事件
- `dispose()`：销毁

---

### 3.10 `Disposable`
表示“可释放资源”。

在扩展里常见写法：

```ts
context.subscriptions.push(disposable);
```

意思是让 VS Code 在扩展停用时自动清理它。

---

### 3.11 `ExtensionContext`
扩展激活时传进来的上下文对象。

常见属性：

- `subscriptions`
- `extensionPath`
- `storagePath`
- `globalState`
- `workspaceState`

这是扩展开发里非常重要的对象。

---

## 4. 最常见的函数清单

### 4.1 弹窗类

```ts
vscode.window.showInformationMessage('提示');
vscode.window.showWarningMessage('警告');
vscode.window.showErrorMessage('错误');
```

使用频率非常高。

---

### 4.2 命令类

```ts
vscode.commands.registerCommand('id', () => {});
vscode.commands.executeCommand('id');
```

适合：按钮、菜单、快捷键、内部调用。

---

### 4.3 文件读写类

```ts
await vscode.workspace.fs.readFile(uri);
await vscode.workspace.fs.writeFile(uri, data);
await vscode.workspace.fs.createDirectory(uri);
await vscode.workspace.fs.stat(uri);
```

你现在这个 C++ 项目骨架功能就是在用这一套。

---

### 4.4 打开文档和编辑器

```ts
const doc = await vscode.workspace.openTextDocument(uri);
await vscode.window.showTextDocument(doc);
```

---

### 4.5 输入和选择

```ts
await vscode.window.showInputBox();
await vscode.window.showQuickPick(['a', 'b', 'c']);
```

---

### 4.6 终端

```ts
const terminal = vscode.window.createTerminal('My Terminal');
terminal.show();
terminal.sendText('echo hello');
```

---

### 4.7 配置读取

```ts
const config = vscode.workspace.getConfiguration('myExtension');
const value = config.get<string>('someKey');
```

---

## 5. 你现在这个扩展最应该先掌握的 API

你这个项目是“点击按钮生成 C++ 工程骨架”，所以最实用的就是这几个：

- `vscode.commands.registerCommand()`
- `vscode.window.showInformationMessage()`
- `vscode.window.showWarningMessage()`
- `vscode.workspace.workspaceFolders`
- `vscode.workspace.fs.createDirectory()`
- `vscode.workspace.fs.writeFile()`
- `vscode.workspace.fs.stat()`
- `vscode.Uri.joinPath()`
- `ExtensionContext.subscriptions`

---

## 6. 典型调用流程

你现在的扩展大概就是这个顺序：

1. 在 `package.json` 里声明命令
2. 扩展激活时执行 `activate()`
3. 用 `registerCommand()` 注册命令实现
4. 用户点击按钮
5. 读取当前工作区
6. 创建目录和文件
7. 弹出提示消息

---

## 7. 推荐学习顺序

如果你刚开始学，建议按这个顺序掌握：

1. `window`
2. `commands`
3. `workspace`
4. `Uri`
5. `ExtensionContext`
6. `TextDocument` / `TextEditor`
7. `languages`
8. `debug`

---

## 8. 备注

`vscode` 模块 API 很大，而且不同版本会不断更新。真正开发时，最常用的还是：

- 命令
- 窗口提示
- 工作区文件操作
- URI 路径处理
- 配置读取

这几个就够支撑很多扩展功能了。
