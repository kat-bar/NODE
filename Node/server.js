class Stack {
    constructor() {
        this.stack = [];
    }
    push(item) {
        this.stack.push(item);
    }
    shift() {
        this.stack.shift();
    }
    size() {
        return this.stack.length;
    }
    print() {
        let message = "";
        for (let i = 0; i < this.stack.length; i++)
        message += this.stack[i] + "  ";
        return message;
    }
}
const http = require('http');
const stack = new Stack();
const host = 'localhost';
const port = 3000;


const server = http.createServer(async (req, res) => {
    const buffers = [];
    for await (const chunk of req) {
        buffers.push(chunk);
    }
    const data = Buffer.concat(buffers).toString();
    console.log(`Body: ${data}`)

    if (req.method === 'POST' && data != '') {
        if (stack.size() < 5) {
            stack.push(data);
        }
        else {
            stack.shift();
            stack.push(data);
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end("Данные успешно записаны");
    }
    if (req.method === 'GET') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end(stack.print());
    }

});

server.listen(port, host, () => {
    console.log(`Сервер запущен на http://${host}:${port}`);
});

