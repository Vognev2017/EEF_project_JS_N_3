const http = require('http')
const url = require('url')
const mime = require('mime-types')
const fs = require('fs')

http.createServer((req, res) => {
    let ob = [{
            name: "Petr",
            age: 24,
            phone: "1234567"
        },
        {
            name: "Vasiliy",
            age: 26,
            phone: "5671234"
        }
    ]

    const {
        pathname
    } = url.parse(req.url)

    if (pathname === "/") {

        res.statusCode = 200;
        res.end(`<h1>Hello ${req.url}</h1>`);

    } else if (pathname === "/blog") {

        res.statusCode = 200;
        res.end(`<h1>My blog</h1>`);

    } else if (pathname === "/json") {


        res.writeHead(200, {
            'Content-Type': 'text/json'
        })
        res.write(JSON.stringify(ob))
        res.end();

    } else if (pathname === "/file") {

        let fileTest = "test.txt"
        const typ = mime.lookup('folder/' + fileTest + '')

        if (typ === "text/plain") {
            res.writeHead(200, {
                'Content-Type': 'json/text',
                'Content-Disposition': 'atachment; filename="' + fileTest + '"'
            })
            res.write(JSON.stringify(ob))
            res.end();

        } else if (typ === "image/jpeg") {

            res.writeHead(200, {
                'Content-Type': 'image/jpeg',
            })
            res.end(`<img src="${fileTest}"/>`);

        } else {
            res.statusCode = 404;
            res.end(`<h1>Not found</h1>`);
        }
    } else if (pathname === "/test") {

        let fileTest = "test.txt"
        let fileContType = mime.lookup(fileTest);

        res.writeHead(200, {
            'Content-Type': fileContType,
            "Content-Disposition": "attachment; filename=" + fileTest
        });

        fs.createReadStream('./' + fileTest).pipe(res);

        const date = new Date().toDateString();

        res.end(`File saving: ${date}`);
    } else {
        res.statusCode = 404;
        res.end(`<h1>Not found</h1>`);
    }

}).listen(3500);