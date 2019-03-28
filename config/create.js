const { sandbox, production } = require('./payu');
const argv = require('./yargs');

module.exports = {
	create: {
		accountId: sandbox.account_id,
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
	}
}