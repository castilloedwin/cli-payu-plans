const argv = require('yargs')
				.command('create', 'Create a new plan of subscription', {
					plancode: {
						demand: true,
						alias: 'p',
						description: 'Enter the identification code for the plan here (It can not have spaces)'
					},
					description: {
						demand: true,
						alias: 'd',
						description: 'Enter the description of the plan here'
					},
					interval: {
						demand: true,
						alias: 'i',
						default: 'MONTH',
						description: 'Enter the plan interval here (DAY||WEEK||MONTH||YEAR)'
					},
					intervalcount: {
						demand: true,
						alias: 'ic',
						default: 1,
						description: 'Enter the number of intervals here'
					},
					maxpaymentsallowed: {
						demand: true,
						alias: 'm',
						default: 12,
						description: 'Enter here the amount of charges that make up the plan'
					},
					paymentattemptsdelay: {
						demand: true,
						alias: 'pad',
						default: 2,
						description: 'Enter the retry interval here'
					},
					value: {
						demand: true,
						alias: 'v',
						description: 'Enter the value of the plan here'
					},
					currency: {
						demand: true,
						alias: 'c',
						description: 'Enter the currency for the plan here'
					}
				})
				.command('read', 'Show a plan of subscription', {
					plancode: {
						demand: true,
						alias: 'p',
						description: 'Enter the plan code'
					}
				})
				.command('update', 'Update a plan of subscription', {
					plancode: {
						demand: true,
						alias: 'p',
						description: 'Enter the identification code for the plan here (It can not have spaces)'
					},
					description: {
						alias: 'd',
						description: 'Enter the description of the plan here'
					},
					paymentattemptsdelay: {
						alias: 'pad',
						description: 'Enter the retry interval here'
					},
					value: {
						alias: 'v',
						description: 'Enter the value of the plan here'
					},
					currency: {
						alias: 'c',
						description: 'Enter the currency for the plan here'
					}
				})
				.command('delete', 'Delete a plan of subscription', {
					plancode: {
						demand: true,
						alias: 'p',
						description: 'Enter the identification code for the plan here (It can not have spaces)'
					}
				})
				.help()
				.argv;


module.exports = argv;