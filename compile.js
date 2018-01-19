const path = require('path'); //OS agnostic lib helps build path from the compile.js to .sol file(s)
const fs = require('fs'); //lib to read filesystem source code
const solc = require('solc'); //requires the import of solidity compiler

const inboxPath = path.resolve(__dirname, 'contracts', 'inbox.sol'); //resolves path to solidity directory
const source = fs.readFileSync(inboxPath, 'utf8'); //reads the file encoding source code

//module.exports makes the compiled contract(s) available to other files
//compiles source code and specifies number of contracts to compile
//.contracts defines what to import, and limits import to bytecode
module.exports = solc.compile(source, 1).contracts[':Inbox'];