const http = require('http');
const fs = require('fs');

// http.createServer(function(req,res) {

//     fs.readFile(__dirname+'/bigfile.txt', function(err,data) {
//         if(err) {
//             console.log(err)
//         }else {
//             res.write(data);
//             res.end();
//         }
//     })

// }).listen(3005, () => console.log('Server started'))

http.createServer(function(req,res) {

  var readStream =  fs.createReadStream(__dirname+'/bigfile.txt');

    readStream.pipe(res);


}).listen(3005, () => console.log('Server started'))