const fs = require('fs');


// Asynchornous
console.log('Program starts')

fs.readFile('./callback.js', 'utf-8', function (err, data) {
    
    if(err) {
        console.log('err', err)
    }else {
        console.log(data)
    }
});


// Synchronous
// var data = fs.readFileSync('./callback.js','utf-8')

// console.log(data);

// console.log('Program ends');


fs.writeFile('./hello.txt', 'Leaerning NOde', function (err, d) {
    if(err) {
        console.log(err)
    }else {
        console.log('Successfully written')
    }
})


fs.readdir(__dirname, function(err,data) {
    if(err) {
        console.log(err)
    }else {
        console.log(data)
    }
});

// appendFile()