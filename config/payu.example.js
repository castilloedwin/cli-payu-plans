/*
	--------------------------------------------------------------------------------------------------------------
	All data setting up that you look at this, it's just testing (merchant_id, api_login, api_key, account_id)
	--------------------------------------------------------------------------------------------------------------
*/

module.exports = {
	sandbox: {
		name: 'Testing',
		url: 'https://sandbox.api.payulatam.com/payments-api',
		merchant_id: '508029',
		api_login: 'pRRXKOl8ikMmt9u',
		api_key: '4Vj8eK4rloUd272L48hsrarnUA',
		account_id: '512321' // Colombia
	},
	production: {
		name: '',
		url: 'https://api.payulatam.com/payments-api',
		merchant_id: '',
		api_login: '',
		api_key: '',
		account_id: ''
	}
}