setTimeout(function () {
    console.log('Times up'); 
}, 1000);

var i = 0



setInterval(function () {
    console.log('Every second');

    if(i == 4) {
        clearInterval(this)
    }
    i++;
}, 1000);



setImmediate(function() {
    console.log('Hey Immediate')
});


setTimeout(function () {
    console.log('Set timeout')
}, 0)

// console.log(pid)
