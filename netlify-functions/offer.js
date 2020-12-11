const promos = {
	'NEWPROMO': {
		code: 'NEWPROMO',
		discountPercentage: 20
	}
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
			body: JSON.stringify(res)
		}
	} catch (e) {
		return {
			statusCode: e.code,
			body: e.message
		}
	}
};
