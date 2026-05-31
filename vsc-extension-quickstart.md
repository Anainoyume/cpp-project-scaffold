# 欢迎使用你的 VS Code 扩展

## 文件夹内容

* 此文件夹包含扩展所需的所有文件。
* `package.json` - 清单文件，用于声明扩展和命令。
  * 示例插件注册了一条命令，并定义了它的标题和命令名。VS Code 凭借这些信息就能在命令面板中显示该命令，而无需立即加载插件。
* `src/extension.ts` - 主文件，你将在此提供命令的具体实现。
  * 该文件导出了一个函数 `activate`，它会在扩展第一次被激活时调用（本例中是通过执行命令来激活）。在 `activate` 函数内部，我们调用了 `registerCommand`。
  * 我们将包含命令实现逻辑的函数作为第二个参数传给 `registerCommand`。

## 环境配置

* 安装推荐的扩展（amodio.tsl-problem-matcher、ms-vscode.extension-test-runner 和 dbaeumer.vscode-eslint）

## 快速上手

* 按 `F5` 打开一个新窗口，其中已加载你的扩展。
* 通过按 (`Ctrl+Shift+P` 或 Mac 上的 `Cmd+Shift+P`) 打开命令面板，输入 `Hello World` 来运行你的命令。
* 在 `src/extension.ts` 代码中设置断点，以调试你的扩展。
* 在“调试控制台”中查看扩展的输出。

## 修改代码

* 修改 `src/extension.ts` 中的代码后，可以通过调试工具栏重新启动扩展。
* 也可以按 (`Ctrl+R` 或 Mac 上的 `Cmd+R`) 重新加载 VS Code 窗口，使修改生效。

## 探索 API

* 打开文件 `node_modules/@types/vscode/index.d.ts` 即可查看完整的 API 定义。

## 运行测试

* 安装 [Extension Test Runner](https://marketplace.visualstudio.com/items?itemName=ms-vscode.extension-test-runner)
* 通过 **任务：运行任务** 命令运行 “watch” 任务。请确保它正在运行，否则测试可能无法被发现。
* 从活动栏打开“测试”视图，点击 “Run Test” 按钮，或使用快捷键 `Ctrl/Cmd + ; A`
* 在“测试结果”视图中查看测试输出。
* 修改 `src/test/extension.test.ts` 或在 `test` 文件夹内创建新的测试文件。
  * 提供的测试运行器只会匹配命名模式为 `**.test.ts` 的文件。
  * 你可以在 `test` 文件夹内创建子文件夹，以任意方式组织测试。

## 更进一步

* 通过 [打包扩展](https://code.visualstudio.com/api/working-with-extensions/bundling-extension) 来减小扩展体积并提升启动速度。
* 在 VS Code 扩展市场上 [发布你的扩展](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)。
* 通过设置 [持续集成](https://code.visualstudio.com/api/working-with-extensions/continuous-integration) 来自动化构建。