import * as fs from "fs";

import { Tokenizer } from "./Tokenizer";
import { Parser } from "./Parser";

const source = fs.readFileSync("examples/test.src").toString();
const tokens = new Tokenizer(source).tokenize();
console.log(tokens);
const generated = new Parser(tokens).parse();
console.log(generated);