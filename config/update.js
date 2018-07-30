const fs = require('fs');
const payu = require('./payu');
const argv = require('./yargs');
const planLog = require(`../plan-logs/${argv.plancode}.json`);

if ( !fs.existsSync(`../plan-logs/${argv.plancode}.json`) ) {
	return console.log('Este plan no existe');
}

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
