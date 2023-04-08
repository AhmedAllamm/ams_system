const PORT = process.env.PORT || '4000';
const HOST = process.env.HOST || 'localhost';

const http = require("http"); 
const server = http.createServer((req,res) => {
    res.end('hello');
});

server.listen(PORT,HOST, (res) => {
    console.log(`SERVER IS RUNNING ON http://${HOST}:${PORT}`)
})