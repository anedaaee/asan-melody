const http = require('http');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const readFileAsync = promisify(fs.readFile);

const server = http.createServer( async (req, res) => {
  console.log('req to:'+req.url);
  if(req.url.substring(1,4) === 'src'){
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('not accessed');
  }else{
    try {
        const filePath = path.join(__dirname, req.url);
        const fileData = await readFileAsync(filePath);
        console.log('res to: '+filePath);
        res.writeHead(200, { 'Content-Type': 'image/jpeg' });
        res.end(fileData);
      } catch (error) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('File not found');
      }
  }
});

const port = 3002;
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});