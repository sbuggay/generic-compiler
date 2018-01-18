import { TOKEN, Token } from "./Tokenizer";

export class Parser {
    public tokens: Token[];

    constructor(tokens: Token[]) {
        this.tokens = tokens;
    }

    parse() {
        return this.parseFunc();
    }

    /**
     * Parse function
     * 
     * @returns 
     * @memberof Parser
     */
    parseFunc() {
        this.consume(TOKEN.FUNC);
        const name = this.consume(TOKEN.IDENTIFIER).value;
        const args = this.parseArgNames();

        this.consume(TOKEN.OCURLY);
        const body = this.parseExpr();
        this.consume(TOKEN.CCURLY);

        return new FuncNode(name, args, body);
    }

    /**
     * Parse argument names
     * 
     * @returns 
     * @memberof Parser
     */
    parseArgNames() {
        const arg_names = [];

        this.consume(TOKEN.OPAREN);
        if (this.peek().type === TOKEN.IDENTIFIER) {
            arg_names.push(this.consume(TOKEN.IDENTIFIER).value)
            while (this.peek().type === TOKEN.COMMA) {
                this.consume(TOKEN.COMMA);
                arg_names.push(this.consume(TOKEN.IDENTIFIER).value)
            }
        }
        this.consume(TOKEN.CPAREN);

        return arg_names;
    }

    parseCall() {
        const name = this.consume(TOKEN.IDENTIFIER).value;
        const args = this.parseArgExprs();
    }

    parseExpr() {
        switch (this.peek().type) {
            case TOKEN.INTEGER:
                return new IntegerNode(this.consume(TOKEN.INTEGER).value);
            case TOKEN.IDENTIFIER:
                if (this.peek(1).type === TOKEN.OPAREN) {
                    const name = this.consume(TOKEN.IDENTIFIER).value;
                    const args = this.parseArgExprs();
                    return new CallNode(name, args);
                }
                else {
                    return new RefNode(this.consume(TOKEN.IDENTIFIER).value);
                }
        }
    }

    parseArgExprs() {
        const arg_exprs = [];

        this.consume(TOKEN.OPAREN);
        if (this.peek().type === TOKEN.IDENTIFIER) {
            arg_exprs.push(this.consume(TOKEN.IDENTIFIER).value)
            while (this.peek().type === TOKEN.COMMA) {
                this.consume(TOKEN.COMMA);
                arg_exprs.push(this.consume(TOKEN.IDENTIFIER).value)
            }
        }
        this.consume(TOKEN.CPAREN);

        return arg_exprs;
    }

    /**
     * Consumes an expected type off of the token queue
     * 
     * @param {any} type 
     * @returns 
     * @memberof Parser
     */
    consume(type: TOKEN) {
        const token = this.tokens.shift();
        if (token.type === type) {
            return token;
        }
        else {
            console.error(token);
            throw new Error(`${token}`);
        }
    }

    peek(offset: number = 0): Token {
        return this.tokens[offset];
    }
}

class FuncNode { constructor(public name: string, public arg_names, public body) { } }
class IntegerNode { constructor(public value: number) { } }
class CallNode { constructor(public name: string, public arg_exprs) { } }
class RefNode { constructor(public value: number) { } }