export enum TOKEN {
    FUNC,
    RET,
    OPAREN,
    CPAREN,
    OCURLY,
    CCURLY,
    IDENTIFIER,
    INTEGER,
    SEMICOLON,
    PERIOD,
    COMMA,
};


export const tokens: [[TOKEN, RegExp]] = [
    [TOKEN.FUNC, /^\bfunc\b/],
    [TOKEN.RET, /^\bret\b/],
    [TOKEN.OPAREN, /^\(/],
    [TOKEN.CPAREN, /^\)/],
    [TOKEN.OCURLY, /^{/],
    [TOKEN.CCURLY, /^}/],
    [TOKEN.IDENTIFIER, /^[a-zA-Z]+/],
    [TOKEN.INTEGER, /^[0-9]+/],
    [TOKEN.SEMICOLON, /^;/],
    [TOKEN.PERIOD, /^\./],
    [TOKEN.COMMA, /^\,/],
];

export class Tokenizer {

    code: string;

    constructor(code) {
        this.code = code;
    }

    tokenize() {
        const parsedTokens = [];

        while (this.code) {
            let foundMatch: boolean = false;

            tokens.forEach(([type, regex]) => {
                const match = this.code.match(regex);
                if (match) {
                    foundMatch = true;
                    parsedTokens.push(new Token(type, match[0]));
                    this.code = this.code.slice(match[0].length).trimLeft();
                }
            });

            if (!foundMatch) {
                throw new Error(`No matched token found ${this.code}`);
            }

        }

        return parsedTokens;
    }
}

export class Token {
    public type;
    public value;

    constructor(type, value) {
        this.type = type;
        this.value = value;
    }
}
