export class MacroParser {

    private _rules : { [key: string] : string } = {};

    public setRule(match: string, replaced: string): void {
        this._rules[match] = replaced;
    }

    public parse(content: string): string {
        // 正则: ?<! 表示前置否定, \$ 是因为 $ 本身在正则里面也有含义
        // (?<!\\)\$ 就表示匹配前面不是 \ 的 $
        // 然后符号 /.../ 表示一个正则模式串, 等价于 new RegExp("...")
        // 后面加一个 g 则是 global, 表示匹配全局所有的内容，返回列表
        const unescaped = content.match(/(?<!\\)\$/g);
        if (unescaped && unescaped.length % 2 !== 0) {
            throw new Error('Format error: unmatched $');
        }

        let result = content.replace(/(?<!\\)\$(.*?)(?<!\\)\$/g, (_, key) => {
            let unescape_key = this.unescape(key);
            if (!(unescape_key in this._rules)) {
                throw new Error(`Undefined macro: ${unescape_key}`);
            }
            return this._rules[unescape_key];
        });

        return this.unescape(result);
    }

    private unescape(content: string): string {
        return content.replace(/\\\$/g, '$');
    }

}