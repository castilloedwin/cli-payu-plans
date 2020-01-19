const fs = require('fs');
const argv = require('./config/yargs');
const { sandbox, production } = require('./config/payu');
const axios = require('axios');
const colors = require('colors');

let api = sandbox.url;
let authorization = Buffer.from(sandbox.api_login + ':' + sandbox.api_key).toString('base64');

let command = argv._[0];

let headers = { 'Authorization': 'Basic ' + authorization, 'Content-Type': 'application/json', 'Accept': 'application/json' };

function writeFilePlan(planCode, planMethod, message, response) {
	fs.writeFile(`./plan-logs/${planCode}.json`, JSON.stringify(planMethod), (err) => {
		if (err) throw err;
		console.log(colors.green(message));
		console.log('___________________________________________');
		console.log(response.data);
	});
}

switch (command) {

	case 'create':
		const createPlan = require('./config/actions')(null);
		axios.post(`${api}/rest/v4.9/plans`, JSON.stringify(createPlan.create), { headers })
			.then(response => {

				if (!fs.existsSync('./plan-logs')) {
					fs.mkdirSync('./plan-logs');
				}

				writeFilePlan(argv.plancode, createPlan.create, '¡Se ha creado el plan ' + argv.plancode + ' con éxito!', response);

			})
			.catch(err => console.log(colors.red(err.response.data)));
	break;

	case 'read':
		axios.get(`${api}/rest/v4.9/plans/${argv.plancode}`, { headers })
			.then(response => {
				console.log(response.data);
			})
			.catch(err => console.log(colors.red(err.response.data)));
	break;

	case 'update':
		
		if ( !fs.existsSync('./plan-logs') ) {
			fs.mkdirSync('./plan-logs');
		}

		(async () => {

			try {

				const data = await axios.get(`${api}/rest/v4.9/plans/${argv.plancode}`, { headers });
				fs.writeFileSync(`./plan-logs/${argv.plancode}.json`, JSON.stringify(data.data) );

				const planLog = require(`./plan-logs/${argv.plancode}.json`);
				const updatePlan = require('./config/actions')(planLog);

				const dataUpdate = await axios.put(`${api}/rest/v4.9/plans/${argv.plancode}`, JSON.stringify(updatePlan.update), { headers });

				writeFilePlan(argv.plancode, updatePlan.update, '¡Se ha actualizado el plan ' + argv.plancode + ' con éxito!', dataUpdate);

			} catch(err) {
				console.log(err);
			}

		})();
		
	break;

	case 'delete':
		axios.delete(`${api}/rest/v4.9/plans/${argv.plancode}`, { headers })
			.then(response => {
				console.log(colors.green('El plan ' + argv.plancode + ' se ha eliminado correctamente'));
			})
			.catch(err => console.log(colors.red(err.response.data)));
	break;

	default:
		console.log('Command not found');

}