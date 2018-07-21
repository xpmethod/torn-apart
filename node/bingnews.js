'use strict';

let https = require('https');

// Replace the subscriptionKey string value with your valid subscription key.
let subscriptionKey = 'YOUR API KEY HERE';

let host = 'api.cognitive.microsoft.com';
let path = '/bing/v7.0/news/search';

let domain = 'nytimes.com';
let searchterm = 'site:' + domain;

let response_handler = function (response) {
	let body = '';
	response.on('data', function (d) {
		body += d;
	});
	response.on('end', function () {	
		body = JSON.parse(body);
		process.stdout.write("Source: " + domain + '\n');
		process.stdout.write("Total matches: " + String(body.totalEstimatedMatches) + '\n');
	});
	response.on('error', function (e) {
		process.stdout.write('Error: ' + e.message);
	});
};

let bing_news_search = function (search) {
	process.stdout.write('Searching news for: ' + domain + '\n');
	let request_params = {
		method : 'GET',
		hostname : host,
		path : path + '?q=' + encodeURIComponent(search),
		headers : {
			'Ocp-Apim-Subscription-Key' : subscriptionKey,
		}
	}; //end request_params

	let req = https.request(request_params, response_handler);
	req.end();
}

bing_news_search(searchterm);