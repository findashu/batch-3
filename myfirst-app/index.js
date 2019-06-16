const express = require('express');
const app = express();

// 

// bodyParser
app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.use(express.static(__dirname+'/static'))


app.get('/', function(req,res) {
    res.send('Hello JS World!')
})


app.get('/about', function(req,res) {
    res.send('This is about page')
});

app.post('/about', function(req,res) {
    res.send('THis is post route')
});


app.put('/test-put', function (req,res) {
    res.send('This is put request')
});

app.get('/index', function (req,res) {
    res.sendFile(__dirname+'/index.html', (e) => {
        if(e) {
            console.log(e)
        }
    })
});

app.get('/json', function(req,res) {
    res.status(200).json({"name":"myfirst-app", "version":"1.0.1"})
})


app.get('/signup', function (req,res) {
    res.sendFile(__dirname+'/signup.html', (e) => {
        if(e) {
            console.log(e)
        }
    })
} );


app.post('/signup', function(req,res) {

    let data = req.body;

    console.log(data)

   res.sendFile(__dirname+'/thanks.html', (e) => {
       if(e) {
           console.log(e)
       }
   })
})



app.listen(3000, () => console.log('Server started on port 3000'));