function square(err,n) {

    if (err) {
        return err
    }
    return n*n
}



function add (num1, num2, cb) {

    if(typeof num1 != 'number') {

       return cb('Square not Possible',null)

    }else{
        let total = num1 + num2;

        let square = cb(null,total)

        return square
    }

}


console.log(add('s',2,square))

