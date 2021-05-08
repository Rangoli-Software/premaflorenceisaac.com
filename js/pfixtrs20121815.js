const extras = {};

extras.createComponentFactory = function (prodInfo, dimensioner, sizer, categorizer) {
	var navHelper = createNavHelper(prodInfo, categorizer, extras.catalog.title);
	//    var relatedviewer = extras.createRelatedViewer(prodInfo.skuInfo, catalog);
	var relatedviewer = createEmptyViewer();
	var sizeTxt = "<p>Please email/DM us to check on size & colour availability before placing your order</p>";
	return createProductComponentFactory(prodInfo, dimensioner, sizer, relatedviewer, navHelper, sizeTxt, "Size", true);
}

extras.shippingHTML = getShippingInfoUL(['If the item is in stock,  it will be ready to ship within 1 business day of your order.']);
extras.washcareHTML = cotton_washcareHTML;

extras.dipdye = {
	SKU: 'DPDYSF1501PT',
	basePath: '/products/scarves/',
	imgDir: 'dipdye',
	imageFile: "sizing.jpg",
	dimensionNames: ["A. Length", "B. Width", "C. Pom-Pom Fringe Width"],
	dimensionsCm: {
		Free: [[183, 186], [59, 60], 2.5]
	},
	getFabric: function (varidx) {
		return "P.F.I. Tangail";
	},
	data: [
		{
			colourName: "Black Currant",
			vid: "CW1",
            colourPfx: "rr",
            colourSfxs: ["p"]
        },
		{
			colourName: "Sand",
			vid: "CW2",
            colourPfx: "sand",
            colourSfxs: ["p"]
        },
		{
			colourName: "Charcoal",
			vid: "CW3",
            colourPfx: "cc",
            colourSfxs: ["p"]
        },
		{
			colourName: "Azure",
			vid: "CW4",
            colourPfx: "indigo",
            colourSfxs: ["p"]
        },
		{
			colourName: "Blush",
			vid: "CW5",
            colourPfx: "blsh",
            colourSfxs: ["p"]
        },
		{
			colourName: "Gold",
			vid: "CW6",
            colourPfx: "gold",
            colourSfxs: ["p"]
        },
    ],
	sizes: ['Free'],
	description: '<p>I love designing scarves. They allow me to collaborate with the artisanal tangail weavers to create distinctive, original fabrics that incorporate the finest of the hand-loom tradition and techniques. Most of my scarves feature <strong><a href="/journey/pfifabrics.html">P.F.I. Tangail</a></strong> fabrics, designed by me and custom-woven for my atelier.</p><p>This Dip-Dye scarf is woven from a hand-spun yarn which is a blend of 60% cotton and 40% silk fibers. The finished scarf is then dyed by hand in a variety of vibrant shades. The process of dyeing involves dipping the scarf into a pot of dye and then slowly drawing it out giving it a beautiful colour gradient.</p><p>Fibers that are left protruding out around the edge of the fabric are gathered together and used to attach individual hand-made pom-poms. The scarf is soft, with a buttery feel.</p><p>The yarn used to weave the scarf is very fine, so the fabric is extremely light-weight. The pom-poms add just enough weight that the entire scarf drapes and falls like one made from a much heavier fabric. It fits snugly around your frame without needing constant adjustment.</p>',
	garmentDetails: ''
};

extras.champagnebag = {
	SKU: 'CHMPGN1501JL',
	basePath: '/products/xtras/',
	imgDir: 'chambag',
	imageFile: "sizing.jpg",
	dimensionNames: ["A. Height", "B. Diameter"],
	dimensionsCm: {
		Free: [31, 9.55]
	},
	getFabric: function (varidx) {
		return "Jacquard Lace";
	},
	data: [
		{
			colourName: "Beige Gold",
			vid: "CW1",
			width: "1000",
			height: "1000",
            colourPfx: "CBCG",
            colourSfxs: ["MD","F","B"]
        },
		{
			colourName: "Champagne",
			vid: "CW2",
			width: "1000",
			height: "1000",
            colourPfx: "CBCC",
            colourSfxs: ["MD","F","B"]
        },
		{
			colourName: "Midnight Blue",
			vid: "CW3",
			width: "1000",
			height: "1000",
            colourPfx: "CBMB",
            colourSfxs: ["MD","F","B"]
        }
    ],
	sizes: ['Free'],
	description: '<p>A few years ago, I worked on a range of creations for the home. I experimented with many ideas, some of which worked better than others.</p><p>I\'m particularly fond of this champagne bag. I have wanted something like it for years, but could never find one anywhere. So I decided to manifest it myself.</p><p>The body of the bag is made from a fine Jacquard lace fabric, with a satin lining showing through in a complementary colour. The bottom is embellished with trim, and the "collar" is lined with border or trim. The neck is closed with a sparkly ribbon.</p><p>It makes a perfect gift bag for an expensive bottle of wine or champagne, or as part of the table setting at an elegant meal.</p>',
	garmentDetails: ''
};

extras.mala = {
	SKU: 'STNMAL1709GS',
	basePath: '/products/xtras/',
	imgDir: 'mala',
	imageFile: "sizing.jpg",
	dimensionNames: ["A. Drop", "B. Pendant"],
	dimensionsCm: {
		Free: [45, [6, 12]]
	},
	getFabric: function (varidx) {
		return "Treasure Trove";
	},
	data: [
		{
			colourName: "1",
			vid: "CW1",
			width: "1800",
			height: "2250",
            colourPfx: "1",
            colourSfxs: ["1"]
        },
		{
			colourName: "2",
			vid: "CW2",
			width: "1800",
			height: "2250",
            colourPfx: "2",
            colourSfxs: ["1"]
        },
		{
			colourName: "3",
			vid: "CW3",
			width: "1800",
			height: "2250",
            colourPfx: "3",
            colourSfxs: ["1"]
        },
		{
			colourName: "4",
			vid: "CW4",
			width: "1800",
			height: "2250",
            colourPfx: "4",
            colourSfxs: ["1"]
        },
		{
			colourName: "5",
			vid: "CW5",
			width: "1800",
			height: "2250",
            colourPfx: "3",
            colourSfxs: ["1"]
        },
		{
			colourName: "6",
			vid: "CW6",
			width: "1800",
			height: "2250",
            colourPfx: "6",
            colourSfxs: ["1"]
        },
		{
			colourName: "7",
			vid: "CW7",
			width: "1800",
			height: "2250",
            colourPfx: "7",
            colourSfxs: ["1"]
        },
		{
			colourName: "8",
			vid: "CW8",
			width: "1800",
			height: "2250",
            colourPfx: "8",
            colourSfxs: ["1"]
        },
		{
			colourName: "9",
			vid: "CW9",
			width: "1800",
			height: "2250",
            colourPfx: "9",
            colourSfxs: ["1"]
        },
		{
			colourName: "10",
			vid: "CW10",
			width: "1800",
			height: "2250",
            colourPfx: "10",
            colourSfxs: ["1"]
        },
		{
			colourName: "11",
			vid: "CW11",
			width: "1800",
			height: "2250",
            colourPfx: "11",
            colourSfxs: ["1"]
        },
		{
			colourName: "12",
			vid: "CW12",
			width: "1800",
			height: "2250",
            colourPfx: "12",
            colourSfxs: ["1"]
        },
	],
	sizes: ['Free'],
	description: '',
	garmentDetails: '',
};

extras.createJSON = function (style) {
	var basePath = style.basePath + style.imgDir + "/";
	return createProductJSON(style.SKU, basePath, style, null, createCWImageFactory);
}

extras.catalog = {
	title: "Extras",
	shopURL: "/products/xtras/shop.html",
	skus: null,
	styles: [artwear.facemask, extras.dipdye, vagabond.kageratie, extras.champagnebag, artwear.tote, artwear.liljhola, artwear.tablet, artwear.postman, artwear.lilajhola, cesoir.clutch, cesoir.pompombracelet, cesoir.handloombracelet, artwear.corsetbelt, extras.mala],
	bags: [artwear.tote.SKU, artwear.liljhola.SKU, artwear.tablet.SKU, artwear.postman.SKU, artwear.lilajhola.SKU, cesoir.clutch.SKU],
	xtras: [artwear.facemask.SKU, extras.dipdye.SKU, vagabond.kageratie.SKU, extras.champagnebag.SKU, cesoir.pompombracelet.SKU, artwear.corsetbelt.SKU, extras.mala.SKU],
	productDB: null,
	getProduct: function (sku) {
		return this.productDB[sku];
	}
}

pfiavG.getLineInitializer(extras).initialize();

extras.categorizer = createFieldCategorizer(
	extras.catalog,
    ["Handbags", "Other"],
    ["bags", "xtras"],
    ["b", "x"],
	"t",
	"b");
