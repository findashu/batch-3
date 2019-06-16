let fs = require('fs');


let readerStream = fs.createReadStream(__dirname+'/fs.js');

readerStream.setEncoding('UTF8');


let data = '';


readerStream.on('data', function (chunk) {
   data =  data + chunk;
})


readerStream.on('end', function() {
    console.log('Reading successfull');
    console.log(data);
})

readerStream.on('error', function(err) {
    console.log(err);
})