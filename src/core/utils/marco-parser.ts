export class MarcoParser {

    private _rules : { [key: string] : string } = {};

    public parser(content: string): string {
        const unescaped = content.match(/(?<!\\)\$/g);
        if (unescaped && unescaped.length % 2 !== 0) {
            throw new Error('Format error: unmatched $');
        }

        let result = content.replace(/(?<!\\)\$([^$]*)(?<!\\)\$/g, (_, key) => {
            if (!(key in this._rules)) {
                throw new Error(`Undefined macro: ${key}`);
            }
            return this._rules[key];
        });

        result = result.replace(/\\\$/g, '$');

        return result;
    }

}