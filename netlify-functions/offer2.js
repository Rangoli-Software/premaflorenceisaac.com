const promos = {
	'15OVER15KHOLIDAY20': function(cart) {
		var lastDate = "January 15, 2021";
		var end = new Date(lastDate)
		var now = new Date();
		if ( end < now ) {
			return {
				errorMsg: "This promo code expired on " + lastDate,
			};
		}
		if ( 15000 < cart.totalINR ) {
			return {
				code: '15OVER15HOLIDAY',
				discountPercentage: 15
			};
		} else {
			return {
				errorMsg: "Purchase total has to be greater than 15000 INR",
			};
		}
	}
};

exports.handler = async (event, context, callback) => {
	console.log(promos);
	console.log(event);
	const payload = JSON.parse(event.body);
	const promoKey = payload.promoKey;
	const cart = payload.cart;
	try {
		const res = {};
		const promo = promos[promoKey];
		if (promo !== undefined && promo !== null) {
			res.promo = promo(cart);
		}
		console.log(JSON.stringify(res));
		return {
			statusCode: 200,
			body: JSON.stringify(res)
		}
	} catch (e) {
		console.log(JSON.stringify(e));
		return {
			statusCode: e.code,
			body: e.message
		}
	}
};
