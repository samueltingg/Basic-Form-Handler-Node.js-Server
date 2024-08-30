const http = require('http');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring'); // Add this module to parse form data



function serveFile(filename, response) {
	fs.readFile(filename, function (err, content) {
		if (err) {
			response.writeHead(404, {'Content-Type':'text/plain'});
			response.end('404 Not Found');
		} else {
			response.writeHead(200, {'Content-Type':'text/html'});
			response.end(content);
		}
	})
}

const server = http.createServer(function(request, response) {

    console.log('method:' + request.method);
	
	if (request.method === 'GET' && request.url === '/') {
		serveFile('form.html', response);
	} else if (request.method === 'POST' && request.url === '/submit') {
		let body = '';
		request.on('data', (chunk) => {
			body += chunk;	
		});
		request.on('end', () => {
			const parsedBody = querystring.parse(body);
			const name = parsedBody.name;
			const date = parsedBody.month;

			response.writeHead(200, {'Content-Type':'text/html'});
			response.end(`Hello, [${name}]! Your form was submitted successfully in [${date}].`);
		});
		request.on('error', (err) => {
			console.error('Request error:', err);
            response.writeHead(500, {'Content-Type': 'text/plain'});
            response.end('Server error');
		});
	}
});

server.listen({ port: 3000, host: 'localhost' }, function() {
  console.log('Server is running at http://localhost:3000');
});