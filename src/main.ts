import * as fs from "fs";

import { Tokenizer } from "./Tokenizer";
import { Parser } from "./Parser";

const source = fs.readFileSync("test.src").toString();
const tokens = new Tokenizer(source).tokenize();
const generated = new Parser(tokens).parse();

console.log(tokens);