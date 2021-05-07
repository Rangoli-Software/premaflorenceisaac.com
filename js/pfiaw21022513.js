const artwear = {};

function createArtwearJSON(style) {
	var sku = style.SKU;
	var factory = style.getFactory(sku);
	return createUIProductJSON(sku, factory.base, style.prodData, style.sizing);
}
artwear.washcareHTML = "<ul><li>Wash before first use</li><li>Do not soak</li><li>Hand Wash</li><li>Mild Detergent</li><li>Do Not Bleach</li><li>Dry In Shade</li></ul>";
artwear.dressSizing = {
	sizeGeo: ["US", "UK", "EU", "IT", "GR", "JP", "RU"],
	capGeo: ["US", "UK / AU / NZ", "EU / FR", "IT", "DE", "JP", "RU"],
	chart: {
		Free: {US:[4,18],UK:[8,22],EU:[36,50],IT:[40,54],GR:[34,48],JP:[9,23],RU:[42,56]}
	}
};
artwear.topsizing = {
	sizeGeo: ["US", "UK", "EU", "IT", "GR", "JP", "RU"],
	capGeo: ["US", "UK / AU / NZ", "EU / FR", "IT", "DE", "JP", "RU"],
	chart: {
		S:{US:[8,10],UK:[12,14],EU:[40,42],IT:[44,46],GR:[38,40],JP:[13,15],RU:[44,48]},
		M:{US:[10],UK:[14],EU:[42],IT:[46],GR:[40],JP:[15],RU:[48]},
		L:{US:[10,12],UK:[14,16],EU:[42,44],IT:[46,48],GR:[40,42],JP:[15,17],RU:[48,50]},
		XL:{US:[12,14],UK:[16,18],EU:[44,46],IT:[48,50],GR:[42,44],JP:[17,19],RU:[50,52]}
	}
}

artwear.modelTxt = "The model is 5 ft 4.5 in (164 cm)"

artwear.facemask = {};
artwear.facemask.SKU = 'FACEMK2005Ta';
artwear.facemask.getFactory = getFaceMaskFactory;
artwear.facemask.prodData = {
	imageFile: "sizing.jpg",
	dimensionNames: ["A. Width", "B. Height"],
	dimensionsCm: {
		Free: [29, 15]
	},
	data: [{
		vid: "CW1",
		images: ["nfm01", "b-f", "b-b", "b-l", "many-1"]
    }],
	sizes: ['Free'],
	description: 'The fabric for these face masks come from my <a href="/journey/treasuretrove.html">Treasure Trove</a> of Tangail sari offcuts, hand-woven in the finest cotton and silk. Each mask features a lining and a pocket in 100% cotton in a contrasting colour. The elastic ear bands will help the mask fit firmly and provide full coverage from nose to chin. The 3 layers avoid heat-trapping while keeping you safe in style and comfort. You can fill the pocket / sleeve with your own surgical mask / filter, herbs or a pad with a few drops of essential oil. One size fits most.',
	garmentDetails: '<ul><li>each #artwear mask is <strong>unique - one-of-a-kind</strong></li><li>Outer layer of <a href="/journey/treasuretrove.html">vintage Tangail</a></li><li>2 inner layers of soft washed cotton</li><li>Universal Size</li><li>Ear-loops of fabric-covered elastic</li><li>Full coverage from nose to chin</li><li>Non-surgical - but has pocket / sleeve to insert surgical filter</li><li>Washable and re-usable</li><li>No returns or exchanges</li><li>Scroll down to shop individual masks</li></ul>',
};
artwear.facemask.washcareHTML = "<ul><li>Wash before first use</li><li>Do not soak</li><li>Hand Wash</li><li>Mild Detergent</li><li>Do Not Bleach</li><li>Dry In Shade</li></ul>";
artwear.facemask.shippingHTML = getShippingInfoUL(['If the item is in stock, it will be ready to ship within 1 business day of your order.']);
artwear.facemask.createJSON = createArtwearJSON;

artwear.tamarai = {};
artwear.tamarai.SKU = 'NKSHDR1501Ta';
artwear.tamarai.getFactory = getTamaraiFactory;
artwear.tamarai.sizing = artwear.dressSizing;
artwear.tamarai.prodData = {
	imageFile: "sizing.jpg",
	dimensionNames: ["A. Length", "B. Neck Width", "C. Bust"],
	dimensionsCm: {
		'Free': [119, 82, 120]
	},
	data: [{
		vid: "CW1",
		images: ["4pF", "4pB", "4pS", "4pD1", "4pD2", "4pD3", "4pD4"]
    }],
	sizes: ['Free'],
	description: 'Whole 5.5 meters of a Jamdani sari is used to form our much-admired Tamarai Dress. Tamarai means Lotus in Tamil, and as the name suggests, the hem of the dress blooms like a Tamarai. The pallu of the sari is used to adorn the V neck bodice without shoulders and armhole to let the dress follow your curves. A self-tie string in the front and an elastic in the back lets you adjust the fit of the dress. The flounce of the dress makes it wearable by most shapes and sizes. The lining is stitched in lightweight 100% cotton voile in a contrasting colour with ruffles that extend the hemline to continue the flow of the dress.',
	garmentDetails: '',
};
artwear.tamarai.shippingHTML = getShippingInfoUL(['Since our Tamarai Dresses are on sale in several physical locations in addition to the website, there is a chance that the dress that you have selected has already been sold. In this case, we will let you select another dress, or refund your purchase price, as you prefer.']);
artwear.tamarai.createCardCreator = function () {
	return createArtWearCardCreator(createSquareImageCarousel);
};
artwear.tamarai.createJSON = createArtwearJSON;

artwear.kaftan = {};
artwear.kaftan.SKU = 'LNKFTN1501Ja';
artwear.kaftan.getFactory = getKaftanFactory;
artwear.kaftan.sizing = artwear.dressSizing;
artwear.kaftan.prodData = {
	imageFile: "sizing.jpg",
	dimensionNames: ['A. Length', 'B. Shoulder', 'C. Bust', 'D. Sleeve Width', 'E. Sleeve Length'],
	dimensionsCm: {
		'Free': [125, 46, 118, 46, 46]
	},
	data: [{
		vid: "CW1",
		images: ["4pF.1", "4pB", "4pS.1", "4pD1", "4pD2"]
    }],
	sizes: ['Free'],
	description: 'This Moroccan inspired silhouette is an oversized Kaftan with full sleeves and wide round neck.  An exquisite handwoven Jamdani sari with minimal motifs and intricate contrasting borders is used to form 8 different panels. Whole 10 meters of the border are used to adorn the sleeves, hem, and front and back panels. The gathered sari at the side seam adds to the volume and makes it wearable by most shapes and sizes. The self-tie string at the waist helps you to adjust the fit of the Kaftan. The lining is stitched in a lightweight 100% cotton ovile in a matching colour.',
	garmentDetails: '',
};
artwear.kaftan.shippingHTML = getShippingInfoUL(['Since our Kaftans are on sale in several physical locations in addition to the website, there is a chance that the dress that you have selected has already been sold. In this case, we will let you select another dress, or refund your purchase price, as you prefer.']);
artwear.kaftan.createCardCreator = function () {
	return createArtWearCardCreator(createSquareImageCarousel);
};
artwear.kaftan.createJSON = createArtwearJSON;

artwear.kamalam = {};
artwear.kamalam.SKU = 'LOTSDR1501Ja';
artwear.kamalam.getFactory = getKamalamFactory;
artwear.kamalam.sizing = artwear.dressSizing;
artwear.kamalam.prodData = {
	imageFile: "sizing.jpg",
	dimensionNames: ['A. Length', 'B. Neck Width', 'C. Bust'],
	dimensionsCm: {
		'Free': [110, 82, 120]
	},
	data: [{
		vid: "CW1",
		images: ["4pF.1", "4pB", "4pS.1", "4pD1", "4pD2", "4pD3"]
    }],
	sizes: ['Free'],
	description: 'The Kamalam Dress is a freesize, A-line dress with voluminous flare. One Jamdani sari is used to drape the lotus-like blooming flounce that falls from your underbust. The pallu of the sari is constructed into a V-neck bodice without shoulders and armholes to let the dress follow your curves. The self-tie string in the front with an elastic in the back makes it easier to slip into and adjust the fit of the dress. The lining is stitched in lightweight 100% cotton voile in a colour that compliments the translucency of the Jamdani.',
	garmentDetails: '',
};
artwear.kamalam.shippingHTML = getShippingInfoUL(['Since our Kamalam Dresses are on sale in several physical locations in addition to the website, there is a chance that the dress that you have selected has already been sold. In this case, we will let you select another dress, or refund your purchase price, as you prefer.']);
artwear.kamalam.createCardCreator = function () {
	return createArtWearCardCreator(createSquareImageCarousel);
};
artwear.kamalam.createJSON = createArtwearJSON;

artwear.saritop = {};
artwear.saritop.SKU = 'SARITP1501Pa';
artwear.saritop.getFactory = getSariTopFactory;
artwear.saritop.sizing = artwear.topsizing;
artwear.saritop.prodData = {
	imageFile: "sizing.jpg",
	dimensionNames: ['A. Length', 'B. Shoulders', 'C. Bust', 'D. Armhole'],
	dimensionsCm: {
		'S. ': [56, 27, 94, 51],
		'M': [57, 29, 98, 53],
		'L': [58, 31, 102, 55],
		'XL': [59, 33, 106, 57]
	},
	data: [{
		vid: "CW1",
		images: ["5pF", "5pB", "5pS.1", "5pD1", "5pD2"]
    }],
	sizes: ['S', 'M', 'L', 'XL'],
	description: 'A careful curation of Tangail sari pallus are cut into this basic round neck, sleeveless top. The top is lined in a contrasting colour of 100% cotton voile which feels soft on the skin. The boxy cut of the top makes it easy to slip into and move around. Pair it with our Naksha Skirt or palazzos or jeans, the traditional textile in a western silhouette will uplift any outfit.',
	garmentDetails: '',
};
artwear.saritop.shippingHTML = getShippingInfoUL(['Since our Sari Tops are on sale in several physical locations in addition to the website, there is a chance that the dress that you have selected has already been sold. In this case, we will let you select another dress, or refund your purchase price, as you prefer.']);
artwear.saritop.createCardCreator = function () {
	return createArtWearCardCreator(createSquareImageCarousel);
};
artwear.saritop.createJSON = createArtwearJSON;
artwear.saritop.modelTxt = artwear.modelTxt + " and wearing size 'S'";

artwear.ravakai = {};
artwear.ravakai.SKU = 'JULITP1501Pa';
artwear.ravakai.getFactory = getRavakaiFactory;
artwear.ravakai.sizing = {
	sizeGeo: ["US", "UK", "EU", "IT", "GR", "JP", "RU"],
	capGeo: ["US", "UK / AU / NZ", "EU / FR", "IT", "DE", "JP", "RU"],
	chart: {
		S:{US:[10],UK:[14],EU:[42],IT:[46],GR:[40],JP:[15],RU:[48]},
		M:{US:[10,12],UK:[14,16],EU:[42,44],IT:[46,48],GR:[40,42],JP:[15,17],RU:[48,50]},
		L:{US:[12,14],UK:[16,18],EU:[44,46],IT:[48,50],GR:[42,44],JP:[17,19],RU:[50,52]},
		XL:{US:[14],UK:[18],EU:[46],IT:[50],GR:[44],JP:[19],RU:[52]}
	}
};
artwear.ravakai.prodData = {
	imageFile: "sizing.jpg",
	dimensionNames: ['A. Length', 'B. Shoulders', 'C. Bust', 'D. Armhole', 'E. Sleeve Length', 'F. Sleeve Width'],
	dimensionsCm: {
		'S': [57, 38, 98, 43, 22, 31],
		'M': [58, 40, 100, 45, 23, 32],
		'L': [59, 42, 106, 47, 24, 33],
		'XL': [60, 44, 110, 49, 25, 34]
	},
	data: [{
		vid: "CW1",
		images: ["1pF", "1pB", "1pS", "1pD1", "1pD2"]
    }],
	sizes: ['S', 'M', 'L', 'XL'],
	description: 'A careful curation of Tangail sari pallus are cut into this basic, half sleeves top with a curved V neck. The top is lined in a contrasting colour of 100% cotton voile which feels soft on the skin. The boxy cut of the top makes it easy to slip into and move around. Pair it with our Drawstring Pants or palazzos or jeans, the traditional textile in a western silhouette will uplift any outfit.',
	garmentDetails: '',
};
artwear.ravakai.shippingHTML = getShippingInfoUL(['Since our Ravakai Tops are on sale in several physical locations in addition to the website, there is a chance that the top that you have selected has already been sold. In this case, we will let you select another dress, or refund your purchase price, as you prefer.']);
artwear.ravakai.createCardCreator = function () {
	return createArtWearCardCreator(createSquareImageCarousel);
};
artwear.ravakai.createJSON = createArtwearJSON;
artwear.ravakai.modelTxt = artwear.modelTxt + " and wearing size 'S'";

artwear.madras = {};
artwear.madras.SKU = 'MDRSTP1606PP';
artwear.madras.getFactory = getMadrasFactory;
artwear.madras.sizing = {
	sizeGeo: ["US", "UK", "EU", "IT", "GR", "JP", "RU"],
	capGeo: ["US", "UK / AU / NZ", "EU / FR", "IT", "DE", "JP", "RU"],
	chart: {
		Free:{US:[4,16],UK:[8,20],EU:[36,48],IT:[40,52],GR:[34,46],JP:[9,21],RU:[42,54]}
	}
};
artwear.madras.prodData = {
	imageFile: "sizing.jpg",
	dimensionNames: ['A. Length', 'B. Shoulders', 'C. Bust', 'D. Armhole', 'E. Sleeve Width', 'F. Sleeve Length'],
	dimensionsCm: {
		'Free': [69, 33, 108, 36, 30, 12]
	},
	data: [{
		vid: "CW1",
		images: ["7pF.1", "7pB.1", "7pS.1", "7pD1", "7pD2"]
    }],
	sizes: ['Free'],
	description: 'Our Art Wear collection also includes fun tops in Tangail like the Madras Top - a breezy style which will  flatter many shapes and sizes. Its A line flare makes it playful to wear and easy to move around in. The top has cap sleeves and round neck. The top is versatile and can be paired with  boxy culottes or skinny jeans or yoga pants - the top can work with your taste and mood.',
	garmentDetails: '',
};
artwear.madras.shippingHTML = getShippingInfoUL(['Since our Madras Tops are on sale in several physical locations in addition to the website, there is a chance that the top that you have selected has already been sold. In this case, we will let you select another dress, or refund your purchase price, as you prefer.']);
artwear.madras.createCardCreator = function () {
	return createArtWearCardCreator(createSquareImageCarousel);
};
artwear.madras.createJSON = createArtwearJSON;

artwear.payara = {};
artwear.payara.SKU = 'TRPZTP1807Pa';
artwear.payara.getFactory = getPayaraFactory;
artwear.payara.sizing = {
	sizeGeo: ["US", "UK", "EU", "IT", "GR", "JP", "RU"],
	capGeo: ["US", "UK / AU / NZ", "EU / FR", "IT", "DE", "JP", "RU"],
	chart: {
		Free:{US:[4,14],UK:[8,18],EU:[36,46],IT:[40,50],GR:[34,44],JP:[9,19],RU:[42,52]}
	}
};
artwear.payara.prodData = {
	imageFile: "sizing.jpg",
	dimensionNames: ['A. Length', 'B. Shoulders', 'C. Bust', 'D. Armhole'],
	dimensionsCm: {
		'Free': [72, 34, 104, 52]
	},
	data: [{
		vid: "CW1",
		images: ["1pF.1", "1pB", "1pS", "1pD1", "1pD2"]
    }],
	sizes: ['Free'],
	description: 'Our Art Wear collection also includes fun tops in Tangail like the Payara Top - a breezy style which will can flatter many shapes and sizes. Its A line flare makes it playful to wear and easy to move around in. This sleeveless top is lined in 100% cotton voile which is soft on the skin. The top is versatile and can be paired with  boxy culottes or skinny jeans or yoga pants - the top can work with your taste and mood.',
	garmentDetails: '',
};
artwear.payara.shippingHTML = getShippingInfoUL(['Since our Payara Tops are on sale in several physical locations in addition to the website, there is a chance that the top that you have selected has already been sold. In this case, we will let you select another dress, or refund your purchase price, as you prefer.']);
artwear.payara.createCardCreator = function () {
	return createArtWearCardCreator(createSquareImageCarousel);
};
artwear.payara.createJSON = createArtwearJSON;

artwear.longovertop = {};
artwear.longovertop.SKU = 'OVTPLO1501Pa';
artwear.longovertop.getFactory = getLongOvertopFactory;
artwear.longovertop.sizing = artwear.topsizing;
artwear.longovertop.prodData = {
	imageFile: "sizing.jpg",
	dimensionNames: ['A. Length', 'B. Shoulders', 'C. Bust', 'D. Armhole', 'E. Sleeve Width', 'F. Sleeve Length'],
	dimensionsCm: {
		'S. ': [103, 39, 94, 48, 31, 46],
		'M': [104, 41, 98, 50, 32, 47],
		'L': [105, 43, 102, 52, 34.5, 48],
		'XL': [106, 45, 106, 54, 36.5, 49]
	},
	data: [{
		vid: "CW1",
		images: ["1MF.1", "1MB", "1MS", "1MD1.1", "1MD2.1"]
    }],
	sizes: ['S', 'M', 'L', 'XL'],
	description: 'We added easy-to-go silhouettes to our Art Wear collection for you to pair with your everyday basics. The Aanchal Overtop is particularly inspired by the warm climate of the coastal town that is Auroville. It\'s cut in 100% cotton Tangail or Jamdani Lace that acts as a coverup in chilly evenings. The string fastening in the front can be left open over a maxi dress or a top and jeans to add a tonal layer.',
	garmentDetails: '',
};
artwear.longovertop.shippingHTML = getShippingInfoUL(['Since our Long Overtops are on sale in several physical locations in addition to the website, there is a chance that the overtop that you have selected has already been sold. In this case, we will let you select another dress, or refund your purchase price, as you prefer.']);
artwear.longovertop.createCardCreator = function () {
	return createArtWearCardCreator(createSquareImageCarousel);
};
artwear.longovertop.createJSON = createArtwearJSON;
artwear.longovertop.modelTxt = artwear.modelTxt + " and wearing size 'S'";

artwear.shortovertop = {};
artwear.shortovertop.SKU = 'OVTPSH1501Pa';
artwear.shortovertop.getFactory = getShortOvertopFactory;
artwear.shortovertop.sizing = {
	sizeGeo: ["US", "UK", "EU", "IT", "GR", "JP", "RU"],
	capGeo: ["US", "UK / AU / NZ", "EU / FR", "IT", "DE", "JP", "RU"],
	chart: {
		S:{US:[10,12],UK:[14,16],EU:[42,44],IT:[46,48],GR:[40,42],JP:[15,17],RU:[48,50]},
		M:{US:[12,14],UK:[16,18],EU:[44,46],IT:[48,50],GR:[42,44],JP:[17,19],RU:[50,52]},
		X:{US:[14,16],UK:[18,20],EU:[46,48],IT:[50,52],GR:[44,46],JP:[19,21],RU:[52,54]},
		XL:{US:[16],UK:[20],EU:[48],IT:[52],GR:[46],JP:[21],RU:[54]}
	}
};
artwear.shortovertop.prodData = {
	imageFile: "sizing.jpg",
	dimensionNames: ['A. Front Length', 'B. Back Length', 'C. Shoulders', 'D. Bust', 'E. Armhole', 'F. Sleeve Width', 'G. Sleeve Length'],
	dimensionsCm: {
		'S. ': [64, 40, 41, 102, 48, 14, 47],
		'M': [65, 41, 43, 106, 50, 14.5, 48],
		'L': [66, 42, 46, 110, 52, 15, 49],
		'XL': [67, 43, 47, 114, 54, 15.5, 50]
	},
	data: [{
		vid: "CW1",
		images: ["1MF.1", "1MB.1", "1MS.1", "1MD1", "1MD2"]
    }],
	sizes: ['S', 'M', 'L', 'XL'],
	description: 'We added easy-to-go silhouettes to our Art Wear collection for you to pair with your everyday basics. The Pallu Overtop is particularly inspired by the warm climate of the coastal town that is Auroville. It\'s cut in 100% cotton Tangail that acts as a coverup in chilly evenings. Tie-up the flaps in the front over a maxi dress or leave it open to add an interesting boxy silhouette over your top and jeans.',
	garmentDetails: '',
};
artwear.shortovertop.shippingHTML = getShippingInfoUL(['Since our Short Overtops are on sale in several physical locations in addition to the website, there is a chance that the overtop that you have selected has already been sold. In this case, we will let you select another dress, or refund your purchase price, as you prefer.']);
artwear.shortovertop.createCardCreator = function () {
	return createArtWearCardCreator(createSquareImageCarousel);
};
artwear.shortovertop.createJSON = createArtwearJSON;
artwear.shortovertop.modelTxt = artwear.modelTxt + " and wearing size 'M'";

artwear.nakshaminuit = naksha.createStyle(naksha.minuitSKU);
artwear.nakshamidi = naksha.createStyle(naksha.midiSKU);
artwear.nakshamini = naksha.createStyle(naksha.miniSKU);
artwear.nakshamicro = naksha.createStyle(naksha.microSKU);

artwear.tote = {};
artwear.tote.SKU = 'TNTGBG1501';
artwear.tote.getFactory = getToteFactory;
artwear.tote.prodData = {
	imageFile: "sizing1.jpg",
	dimensionNames: ["A. Drop", "B. Height", "C. Width"],
	dimensionsCm: {
		Free: [30, [39,43], 32]
	},
	data: [{
		vid: "CW1",
		images: ["P11_D1", "P11_D2", "P11_D4"]
    }],
	sizes: ['Free'],
	description: 'We\'ve used these for ages as a one-of-a-kind gift bag, cut from Jamdani / Tangail handloom. It\'s a great carry around tote that can be used while running errands around town. We constructed this light tote from our treasure trove of Tangail offcuts, for our customers to carry our precious creations. Everyone loves them!',
	garmentDetails: '<ul><li>Art Wear - Each bag is one-of-a-kind</li><li>Single layer of Tangail / Jamdani</li><li>Tote bag</li><li>Two shoulder straps</li></ul>',
};
artwear.tote.washcareHTML = "<ul><li>Wash before first use</li><li>Do not soak</li><li>Hand Wash</li><li>Mild Detergent</li><li>Do Not Bleach</li><li>Dry In Shade</li></ul>";
artwear.tote.shippingHTML = getShippingInfoUL(['If the item is in stock, it will be ready to ship within 1 business day of your order.']);
artwear.tote.createCardCreator = function () {
	return createUICardCreator();
};
artwear.tote.createJSON = createArtwearJSON;

artwear.liljhola = {};
artwear.liljhola.SKU = 'LLBGSM1501TB';
artwear.liljhola.getFactory = getLilJholaFactory;
artwear.liljhola.prodData = {
	imageFile: "sizing1.jpg",
	dimensionNames: ["A. Drop", "B. Height", "C. Width"],
	dimensionsCm: {
		Free: [26, 22, 25]
	},
	data: [{
		vid: "CW1",
		images: ["P3_D1", "P3_D2", "P3_D3", "P3_D4"]
    }],
	sizes: ['Free'],
	description: 'This Li\'l Jhola is an ideal handbag size. Carry your essentials as you go about your day. It has multiple inner pockets to hold your knick-knacks and a robust cotton lining makes the bag sturdy. A one-of-a-kind bag with handloom Tangail / Jamdani border on the straps.',
	garmentDetails: '<ul><li>Art Wear - Each bag is one-of-a-kind</li><li>Outer layer of Tangail / Jamdani</li><li>100% cotton lining</li><li>Single shoulder strap</li><li>Two internal pockets</li></ul>',
};
artwear.liljhola.washcareHTML = "<ul><li>Art Wear - Each bag is one-of-a-kind</li><li>Wash before first use</li><li>Do not soak</li><li>Hand Wash</li><li>Mild Detergent</li><li>Do Not Bleach</li><li>Dry In Shade</li></ul>";
artwear.liljhola.shippingHTML = getShippingInfoUL(['If the item is in stock, it will be ready to ship within 1 business day of your order.']);
artwear.liljhola.createCardCreator = function () {
	return createArtWearCardCreator(createSquareImageCarousel);
};
artwear.liljhola.createJSON = createArtwearJSON;

artwear.tablet = {};
artwear.tablet.SKU = 'LLBGMD1501TB';
artwear.tablet.getFactory = getTabletJholaFactory;
artwear.tablet.prodData = {
	imageFile: "sizing.jpg",
	dimensionNames: ["A. Drop", "B. Height", "C. Width"],
	dimensionsCm: {
		Free: [47, 29, 31.5]
	},
	data: [{
		vid: "CW1",
		images: ["P4_D1", "P4_D2", "P4_D3", "P4_D4"]
    }],
	sizes: ['Free'],
	description: 'The outer layer of the Tablet Bag is cut in handloom Tangail / Jamdani, which makes it one-of-a-kind Art Wear masterpiece. The inner layer is a medium weight cotton in a contrasting colour and finished immaculately to make the usable bag inside-out.',
	garmentDetails: '<ul><li>Art Wear - Each bag is one-of-a-kind</li><li>Outer layer of Tangail / Jamdani</li><li>100% cotton lining</li><li>Single shoulder strap</li><li>Two internal pockets</li></ul>',
};
artwear.tablet.washcareHTML = "<ul><li>Wash before first use</li><li>Do not soak</li><li>Hand Wash</li><li>Mild Detergent</li><li>Do Not Bleach</li><li>Dry In Shade</li></ul>";
artwear.tablet.shippingHTML = getShippingInfoUL(['If the item is in stock, it will be ready to ship within 1 business day of your order.']);
artwear.tablet.createCardCreator = function () {
	return createArtWearCardCreator(createSquareImageCarousel);
};
artwear.tablet.createJSON = createArtwearJSON;

artwear.postman = {};
artwear.postman.SKU = 'LLBGMD1701TB';
artwear.postman.getFactory = getPostmanJholaFactory;
artwear.postman.prodData = {
	imageFile: "sizing.jpg",
	dimensionNames: ["A. Drop", "B. Height", "C. Width"],
	dimensionsCm: {
		Free: [47, 29, 31.5]
	},
	data: [{
		vid: "CW1",
		images: ["P4_D1", "P4_D2", "P4_D3", "P4_D4"]
    }],
	sizes: ['Free'],
	description: 'The Postman Jhola is our take on a small messenger bag, constructed from Tangail / Jamdani and a contrasting cotton fabric. The borders of the sari are carefully placed on the shoulder strap to elevate your outfit when worn as a crossbody bag. It is an ideal size to carry a tablet and a notebook to work or to a coffee shop.',
	garmentDetails: '<ul><li>Art Wear - Each bag is one-of-a-kind</li><li>Outer layer of Tangail / Jamdani</li><li>100% cotton lining</li><li>Single cross-body shoulder strap</li><li>Two internal pockets</li></ul>',
};
artwear.postman.washcareHTML = "<ul><li>Wash before first use</li><li>Do not soak</li><li>Hand Wash</li><li>Mild Detergent</li><li>Do Not Bleach</li><li>Dry In Shade</li></ul>";
artwear.postman.shippingHTML = getShippingInfoUL(['If the item is in stock, it will be ready to ship within 1 business day of your order.']);
artwear.postman.createCardCreator = function () {
	return createArtWearCardCreator(createSquareImageCarousel);
};
artwear.postman.createJSON = createArtwearJSON;

artwear.lilajhola = {};
artwear.lilajhola.SKU = 'LLBGBG1501TB';
artwear.lilajhola.getFactory = getLilaJholaFactory;
artwear.lilajhola.prodData = {
	imageFile: "sizing.jpg",
	dimensionNames: ["A. Drop", "B. Height", "C. Width"],
	dimensionsCm: {
		Free: [47, 42, 30]
	},
	data: [{
		vid: "CW1",
		images: ["P1_D1", "P1_D2", "P1_D3", "P1_D4"]
    }],
	sizes: ['Free'],
	description: 'The Lila Bag is versatile enough to carry to pilates and a meeting right after. It accommodates your needs through the day as you alternate between work and the daily hustle. There are inner pockets for your phone and keys and enough space to carry a laptop and other essentials. A one-of-a-kind bag with Tangail / Jamdani border on the straps and lined in cotton.',
	garmentDetails: '<ul><li>Art Wear - Each bag is one-of-a-kind</li><li>Outer layer of Tangail / Jamdani</li><li>100% cotton lining</li><li>Single cross-body shoulder strap</li><li>Two internal pockets</li><li>Self-tie string fastening on the top</li></ul>',
};
artwear.lilajhola.washcareHTML = "<ul><li>Wash before first use</li><li>Do not soak</li><li>Hand Wash</li><li>Mild Detergent</li><li>Do Not Bleach</li><li>Dry In Shade</li></ul>";
artwear.lilajhola.shippingHTML = getShippingInfoUL(['If the item is in stock, it will be ready to ship within 1 business day of your order.']);
artwear.lilajhola.createCardCreator = function () {
	return createArtWearCardCreator(createSquareImageCarousel);
};
artwear.lilajhola.createJSON = createArtwearJSON;

artwear.corsetbelt = {};
artwear.corsetbelt.SKU = 'OPRBLT1501TB';
artwear.corsetbelt.getFactory = getCorsetBeltFactory;
artwear.corsetbelt.prodData = {
	imageFile: "sizing.jpg",
	dimensionNames: ["A. Width", "B. Length"],
	dimensionsCm: {
		Free: [[12, 15.5], [64, 71]]
	},
	data: [{
		vid: "CW1",
		images: ["P1_D1", "P1_D2", "P1_D3", "P1_D4"]
    }],
	sizes: ['Free'],
	description: '',
	garmentDetails: '',
};
artwear.corsetbelt.washcareHTML = "";
artwear.corsetbelt.shippingHTML = getShippingInfoUL(['If the item is in stock, it will be ready to ship within 1 business day of your order.']);
artwear.corsetbelt.createCardCreator = function () {
	return createArtWearCardCreator(createSquareImageCarousel);
};
artwear.corsetbelt.createJSON = createArtwearJSON;

artwear.catalog = {
	title: "Art Wear",
	shopURL: "/products/artwear/shop.html",
	skus: null,
	styles: [artwear.tamarai, artwear.kamalam, artwear.kaftan, artwear.saritop, artwear.ravakai, artwear.madras, artwear.payara, artwear.longovertop, artwear.shortovertop, artwear.nakshaminuit, artwear.nakshamidi, artwear.nakshamini, artwear.nakshamicro],
	dresses: [artwear.tamarai.SKU, artwear.kamalam.SKU, artwear.kaftan.SKU],
	skirts: [artwear.nakshaminuit.SKU, artwear.nakshamidi.SKU, artwear.nakshamini.SKU, artwear.nakshamicro.SKU],
	separates: [artwear.saritop.SKU, artwear.ravakai.SKU, artwear.madras.SKU, artwear.payara.SKU, artwear.longovertop.SKU, artwear.shortovertop.SKU],
	productDB: null,
	getProduct: function (sku) {
		return this.productDB[sku];
	},
	createProductDB: function () {
		var map = {};
		for (var i = 0; i < this.styles.length; i++) {
			var style = this.styles[i];
			var entry = style.createJSON(style);
			map[entry.skuInfo.SKU] = entry;
		}
		return map;
	}
}

pfiavG.getLineInitializer(artwear).initialize();

artwear.categorizer = createFieldCategorizer(
	artwear.catalog,
    ["Dresses", "Skirts", "Separates"],
    ["dresses", "skirts", "separates"],
    ["d", "k", "s"],
	"t",
	"d");
