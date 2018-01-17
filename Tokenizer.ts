export const tokens: [[string, RegExp]] = [
    ["func", /^\bfunc\b/],
    ["ret", /^\bret\b/],
    ["oparen", /^\(/],
    ["cparen", /^\)/],
    ["ocurly", /^{/],
    ["ccurly", /^}/],
    ["identifier", /^[a-zA-Z]+/],
    ["integer", /^[0-9]+/],
    ["semicolon", /^;/],
    ["period", /^\./],
    ["comma", /^\,/],
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
