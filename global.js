 console.log(global);


// __dirname

console.log(__dirname);

// 
console.log(__filename);

// process object

console.log(process.title)

process.title = 'My Process';

console.log(process.title);

console.log(process.env);

process.env.mySecret = 'secretValue';

console.log(process.env.mySecret)


// cwd()

console.log(process.cwd());

console.log(process.cpuUsage());

console.log(process.memoryUsage());

// events on process

process.on('exit', function() {
    console.log('Exiting')
})

process.on('uncaughtException', function(err) {
    console.log(err)
} )