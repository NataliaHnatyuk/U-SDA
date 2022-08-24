const http = require('http');
const fs = require('fs');
const path = require('path');
const host = '192.168.88.15';
const port = 80;

http.createServer((req, res)=>{
    if (req.url === '/') {
        fs.readFile('./html/classes.html', (err, data) => {
            if (err) throw err;
            res.writeHead(200, 'Content-Type : text/html');
            res.write(data)
            return res.end()
        })
    } else if(req.url.match('\css$')) {
        var cssPath = path.join(__dirname, 'css', req.url);
        var fileStream = fs.createReadStream(cssPath, "UTF-8");
        res.writeHead(200, {"Content-Type": "text/css"});
        fileStream.pipe(res);
    }
}).listen(port, host, ()=>{console.log(`Apricot ${host}:${port}`);})