/*
 * This will setup a simple server for the project
 * */

const http = require('http');
const express = require('express');

const app = express();

let httpServer = http.createServer(app);

app.use(express.static('public'));

httpServer.listen(8080, () => {
	console.log('Http Server Started, port 8080')
});

app.get('/', function(req, res) {
	console.log('Will redirect');
	res.redirect('/my-career-center');
});

const pathArray = [
	"/",
	"/spread-selection",
	"/card-selection",
	"/single-card-reading"
];


app.get(pathArray, function(req, res) {
	res.sendFile('/public/index.html', {root: __dirname})
});

// Setup for getting sample JSON files
let JSONFileOptions = {
	root: __dirname + '/public/json/',
	headers: {
		'x-timestamp': Date.now(),
		'x-sent': true
	}
};

app.post('/json/:name', function(req, res) {
	let fileName = req.params.name;
	console.log('Get', fileName);
	res.sendFile(fileName, JSONFileOptions)
});

// Setup to response success for requests
app.post('/jobseekers/ajax*', function(req, res) {
	res.end('{"message" : "OK", "status" : 200}');
});
