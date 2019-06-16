const http = require('http');
let fs = require('fs');


http.createServer(function(req,res) {


    console.log(req.url);

    if(req.url == '/about' && req.method == 'post') {

        res.writeHead(200, {'content-type': 'text/plain'})

        fs.readFile('about.html', function (err ,data) {
            if(err) {
                res.statusCode = 500;
                res.end('Some')
            }else {
                res.statusCode = 200;

                res.write(data)

                res.end()
            }
        })


        res.end('About me')
    }else if (req.url == '/blog'){

        res.statusCode = 200;

        res.end('Blog Page')
    } else {

        res.statusCode = 404
        res.end('Page not found')
    }

}).listen(3075, () => console.log('Server up and running'))


// server.listen(3000, () => console.log('Server up and running'))