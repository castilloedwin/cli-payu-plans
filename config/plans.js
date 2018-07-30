const payu = require('./payu');
const argv = require('./yargs');
const planLog = require(`../plan-logs/${argv.plancode}.json`);

module.exports = {
	create: {
		accountId: payu.account_id,
		planCode: argv.plancode,
		description: argv.description,
		interval: argv.interval, // DAY | WEEK | MONTH | YEAR
		intervalCount: argv.intervalcount,
		maxPaymentsAllowed: argv.maxpaymentsallowed,
		paymentAttemptsDelay: argv.paymentattemptsdelay,
		additionalValues: [
			{
				name: 'PLAN_VALUE',
				value: argv.value,
				currency: argv.currency
			}
		]
	},
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