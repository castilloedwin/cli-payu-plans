const fs = require('fs');
const argv = require('./config/yargs');
const payu = require('./config/payu');
const plans = require('./config/plans');
const axios = require('axios');

let api = payu.sandbox;
let authorization = Buffer.from(payu.api_login + ':' + payu.api_key).toString('base64');

let command = argv._[0];

switch (command) {

	case 'create':
		axios.post(`${api}/rest/v4.9/plans`, JSON.stringify(plans.create),
			{ headers:
				{
					'Authorization': 'Basic ' + authorization,
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				}
			})
			.then(response => {
				console.log(response.data);

				fs.writeFile(`./plan-logs/${argv.plancode}.json`, JSON.stringify(plans.create), (err) => {
					if (err) throw err;
					console.log('Se ha creado el plan ' + argv.plancode);
				});

			});
	break;

	case 'read':
		axios.get(`${api}/rest/v4.9/plans/${argv.plancode}`,
			{ headers:
				{
					'Authorization': 'Basic ' + authorization,
					'Content-Type': 'application/json',
					'Accept': 'application/json'	
				}
			})
			.then(response => {
				console.log(response.data);
			});
	break;

	case 'update':
		axios.put(`${api}/rest/v4.9/plans/${argv.plancode}`, JSON.stringify(plans.update),
			{ headers:
				{
					'Authorization': 'Basic ' + authorization,
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				}
			})
			.then(response => {
				console.log(response.data);
			});
	break;

	case 'delete':
		axios.delete(`${api}/rest/v4.9/plans/${argv.plancode}`,
			{ headers:
				{
					'Authorization': 'Basic ' + authorization,
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				}
			})
			.then(response => {
				console.log(response.data);
			});
	break;

	default:
		console.log('Command not found');

}