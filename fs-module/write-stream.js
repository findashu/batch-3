let fs = require('fs');

let data = 'There is no guaranteed ordering when using asynchronous methods. So the following is prone to error because the fs.stat() operation may complete before the fs.rename() operation'

let writerStream = fs.createWriteStream(__dirname+'/hello.txt', {encoding:'utf-8'});


writerStream.write(data);


writerStream.on('finish', function() {
    console.log('Successfully written');
});

writerStream.on('error', function() {
    console.log(err)
})