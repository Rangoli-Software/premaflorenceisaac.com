function createWovenCanvasJSON(style) {
	var sku = style.SKU;
	var factory = style.getFactory(sku);
	return createUIProductJSON(sku, factory.base, style.prodData, null);
}

function createWovenCanvasCardCreator() {
	return {
		colClasses: 'col-12',
		createCard: function (images, btnId, priceHTML, desc) {
			var res = '<div class="item sc-panel" style="background-color: ' +
				desc.getBGColor() + ';color: ' + desc.getFGColor() + ';"><div class="row">';
			res += '<div class="col-md-7"><div class="row"><div class="col-10 offset-1"><figure>' +
				'<img src="' + images.getImage(0).url + '" class="img-fluid center-block">' +
				'</figure>' +
				'<p style="color: ' + desc.getFGColor() + '; text-align: center">Woven Canvas ' + desc.getDescription() + '</p>' +
				'</div></div></div>';
			res += '<div class="col-md-5 align-self-center"><div class="row"><div class="col-10 offset-1 text-center">' +
				'<p style="font-size: 150%">' + priceHTML + '</p>';

			if (desc.isAvailable()) {
				res += '<p>' + createAddToCartButton(btnId) + '</p>';
			} else {
				res += '<div class="alert alert-primary text-center" role="alert">' + desc.getCollectedText() + '</div>';
			}

			res += '</div></div></div>';

			res += '</div></div>';
			return res;
		},
		updateCard: function (images, id) {},
	};
}

const wovencanvas = {};
wovencanvas.tshirt = {};
wovencanvas.tshirt.SKU = 'AWTSHT1604Je';
wovencanvas.tshirt.getFactory = getWovenCanvasFactory;
wovencanvas.tshirt.prodData = {
	imageFile: "sizing.jpg",
	dimensionNames: ["Shoulder", "Chest", "Length"],
	dimensionsCm: {
		S: [15.5, 38, 26],
		M: [16.5, 40, 27],
		L: [17.5, 42, 28],
		XL: [18.5, 44, 29],
		XXL: [19.5, 46, 30]
	},
	data: [
		{
			vid: "CW1",
			colourName: 'White',
			images: ["ManWhiteS", "GirlWhiteS", "InBagSq"]
        },
		{
			vid: "CW2",
			colourName: 'Black',
			images: ["GirlBlackS", "GirlWhiteS", "InBagSq"]
        },
	],
	sizes: ["S", "M", "L", "XL", "XXL"],
	description: '<p>A piece of wearable art! Our T-Shirt with a <strong>numbered</strong> Woven Canvas makes the perfect gift for that unique individual. I create each panel individually as a collage composed of textile strips.</p><p>The fabric strips come from my <a href="/journey/treasuretrove.html">treasure-trove</a> of vintage Tangail sari borders (hand-woven in the finest cotton, silk and metal-zari).</p><p>Each panel is a labour of love. You can read more about the process <a href="/tangailcollage.html">here</a></p><p>Along with your T-shirt, you will receive one of our gift bags: a delicate transparent cotton organza envelope with a mother-of-pearl button closure, making it a perfect gift item!</p>',
	garmentDetails: '',
};
wovencanvas.tshirt.washcareHTML = "<ul><li>Wash before first use</li><li>Do not soak</li><li>Hand Wash</li><li>Mild Detergent</li><li>Do Not Bleach</li><li>Dry In Shade</li></ul>";
wovencanvas.tshirt.shippingHTML = getShippingInfoUL(['If the item is in stock, it will be ready to ship within 1 business day of your order.']);
wovencanvas.tshirt.createCardCreator = createWovenCanvasCardCreator;
wovencanvas.tshirt.createJSON = createWovenCanvasJSON;
