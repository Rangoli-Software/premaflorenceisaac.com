const promos = {
	'NEWPROMO': {
		code: 'NEWPROMO',
		discountPercentage: 20
	}
};
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
};

exports.handler = async (event, context, callback) => {
	console.log(promos);
	console.log(event);
	const payload = JSON.parse(event.body);
	const promoKey = payload.promoKey;

	try {
		const res = {};
		const promo = promos[promoKey];
		if (promo !== undefined && promo !== null) {
			res.promo = promo;
		}
		return {
			statusCode: 200,
			headers,
			body: JSON.stringify(res)
		}
	} catch (e) {
		return {
			statusCode: e.code,
			body: e.message
		}
	}
};
