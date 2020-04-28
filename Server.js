const http = require('http');
const url = require('url');
const wiktionaryAPI = require('./WiktionaryAPI');


const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer(async (req, res) => {
    var urlParts = url.parse(req.url, true);
    var query = urlParts.query;

    if (urlParts.pathname == "/test") {
        var t = await wiktionaryAPI.searchTitle(query.title, wiktionaryAPI.request.language.english);
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello, World!\n');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});