import { Token } from "./Tokenizer";

export class Parser {
    public tokens: Token[];

    constructor(tokens: Token[]) {
        this.tokens = tokens;
    }

    parse() {
        this.parse_func();
    }

    parse_func() {
        this.consume("func");
        const name = this.consume("identifier");
        const args = this.parse_arg_names();

        this.consume("ocurly");
        const body = this.parse_expr();
        this.consume("ccurly");
    }

    parse_arg_names() {
        const arg_names = [];

        this.consume("oparen");
        if (this.peek("identifier")) {
            arg_names.push(this.consume("identifier").value)
            while (this.peek("comma")) {
                this.consume("comma");
                arg_names.push(this.consume("identifier").value)
            }
        }
        this.consume("cparen");

        console.log(arg_names);

        return arg_names;
    }

    consume(type) {
        const token = this.tokens.shift();
        if (token.type === type) {
            return token;
        }
        else {
            throw new Error(`Expected token type ${type} but got ${token.type}`);
        }
    }

    peek(identifier, offset: number = 0) {
        return this.tokens[offset].type === identifier;
    }
}

class FuncNode {
    name: string;
    arg_names: string[];
    body: any;

    constructor(name, arg_names, body) {
        this.name = name;
        this.arg_names = arg_names;
        this.body = body;
    }
}