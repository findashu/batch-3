let events = require('events');


let emitter = new events.EventEmitter();


// default 10 listeners allowed 
emitter.setMaxListeners(12);


emitter.on('knock', function() {
    console.log('Whos there');
});

// emitter.on('knock', () => console.log(2))
// emitter.on('knock', () => console.log(3))
// emitter.on('knock', () => console.log(4))
// emitter.on('knock', () => console.log(5))
// emitter.on('knock', () => console.log(6))
// emitter.on('knock', () => console.log(7))
// emitter.on('knock', () => console.log(8))
// emitter.on('knock', () => console.log(9))
// emitter.on('knock', () => console.log(10))
// emitter.on('knock', () => console.log(11))

emitter.emit('knock');
emitter.emit('knock');

emitter.once('greet', function(name) {
    console.log('Hello '+name)
})

emitter.emit('greet','ashu');


emitter.emit('greet');


function exiting() {
    console.log('exit')
}

emitter.on('exit', exiting)

emitter.emit('exit');

emitter.removeListener('exit',exiting)

emitter.emit('exit');


emitter.removeAllListeners('knock');

emitter.emit('knock')