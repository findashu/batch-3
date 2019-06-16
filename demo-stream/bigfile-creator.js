const fs = require('fs');


let file = fs.createWriteStream(__dirname+'/bigfile.txt',{encoding:'utf-8'});



for(var i = 0; i< 1e6; i++) {
    file.write('The filtered positional operator $[<identifier>] identifies the array elements that match the arrayFilters conditions for an update operation\n')
}

file.end();