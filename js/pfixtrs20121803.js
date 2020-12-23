const extras = {};

extras.createComponentFactory = function (prodInfo, dimensioner, sizer, categorizer) {
	var navHelper = createNavHelper(prodInfo, categorizer, extras.catalog.title);
	//    var relatedviewer = extras.createRelatedViewer(prodInfo.skuInfo, catalog);
	var relatedviewer = createEmptyViewer();
	var sizeTxt = "<p>Please email/DM us to check on size & colour availability before placing your order</p>";
	return createProductComponentFactory(prodInfo, dimensioner, sizer, relatedviewer, navHelper, sizeTxt, "Size", true);
}

extras.shippingHTML = getShippingInfoUL(['If the item is in stock,  it will be ready to ship within 1 business day of your order.']);
extras.washcareHTML = khadi_washcareHTML;

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

extras.createJSON = function (style) {
	var basePath = style.basePath + style.imgDir + "/";
	return createProductJSON(style.SKU, basePath, style, null, createCWImageFactory);
}

extras.catalog = {
	title: "Extras",
	shopURL: "/products/xtras/shop.html",
	skus: null,
	styles: [artwear.facemask, extras.dipdye, vagabond.kageratie],
	productDB: null,
	getProduct: function (sku) {
		return this.productDB[sku];
	}
}

pfiavG.getLineInitializer(extras).initialize();

extras.categorizer = createFieldCategorizer(
	extras.catalog,
    ["All"],
    ["skus"],
    ["a"],
	"t",
	"a");
