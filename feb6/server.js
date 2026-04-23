const http = require('http');
const fs = require('fs');
const { compileFunction } = require('vm');
const { cat } = require('@huggingface/transformers');

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        fs.readFile('index.html', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else if (req.url === '/style.css') {
        fs.readFile('style.css', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/css' });
                res.end(data);
            }
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

const port = 3000;
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

async function readWithPromisify() {
    try{
        const data = await fs.readFileSync('file.txt', 'utf-8');
        console.log(data);
    } catch (err) {
        console.error('Error reading file:', err);
    }
}

readWithPromisify();

async function writeFileExample() {
    try {
        const content = 'This is some sample text to write to the file.';
        await fs.promises.writeFile('output.txt', content, 'utf-8');
        console.log('File written successfully.');
    } catch (err) {
        console.error('Error writing file:', err);
    }
}

writeFileExample();