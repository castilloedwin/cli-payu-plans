const fs = require('fs');
const path = require('path');
const payu = require('./payu');
const argv = require('./yargs');

if (!fs.existsSync( path.join(__dirname, `../plan-logs/${argv.plancode}.json`))) {
	throw Error('Este plan no existe');
}

const planLog = require(`../plan-logs/${argv.plancode}.json`);

module.exports = {
	update: {
		planCode: argv.plancode,
		description: argv.description || planLog.description,
		paymentAttemptsDelay: argv.paymentattemptsdelay || planLog.paymentAttemptsDelay,
		additionalValues: [
			{
				name: 'PLAN_VALUE',
				value: argv.value || planLog.additionalValues[0].value,
				currency: argv.currency || planLog.additionalValues[0].currency
			}
		]
	}
}
