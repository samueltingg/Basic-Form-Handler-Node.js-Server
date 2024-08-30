### Description
A HTTP server that can retrieve user input from a HTML form.

### Features
**Basic Routing:** handled GET and POST requests.

**Reading POST Data:** used request.on('data') to collect incoming data chunks and request.on('end') to process the collected data.

**Parsing Form Data:** used the querystring module to parse the data from the form.