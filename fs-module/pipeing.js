let fs = require('fs');


let readerStream = fs.createReadStream(__dirname+'/hello.txt');


let writerStream = fs.createWriteStream(__dirname+'/output.txt');


readerStream.pipe(writerStream);

console.log('Program Ends');