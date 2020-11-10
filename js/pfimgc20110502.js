const itsmagic = {};

itsmagic.createRelatedViewer = function (skuInfo, catalog) {
    var related = catalog.getPairWith(skuInfo.SKU);
    if (related === null) {
        return creatEmptyViewer();
    }
    var caption = 'Pair with';
    var res = [];
    for (var i = 0; i < related.length; i++) {
        sku = related[i];
        res.push(createRelatedItemCard(sku, catalog));
    }
    return createRelatedViewer(caption, res, 2);
}

itsmagic.createComponentFactory = function (prodInfo, dimensioner, sizer, catalog) {
    var navHelper = createNavHelper(prodInfo, catalog, 'It\'s Magic');
    //    var relatedviewer = itsmagic.createRelatedViewer(prodInfo.skuInfo, catalog);
    var relatedviewer = createEmptyViewer();
    return createProductComponentFactory(prodInfo, dimensioner, sizer, relatedviewer, navHelper, "");
}

itsmagic.sizing_top = {};

itsmagic.princess = {
    SKU: 'PRNCDR1501Rv',
    imgDir: 'princess',
    imageFile: "",
    dimensionNames: ['A. Chest', 'B. Waist', 'C. Length'],
    dimensionsCm: {
        '2-4': [30, 56, 66],
        '5-7': [32, 60, 75],
        '8-10': [38, 70, 87]
    },
    getFabric: function (varidx) {
        return "Voile";
    },
    data: [
        {
            colourName: "Pink with Rose",
            vid: "CW1",
            picPfx: "1",
            carouselPix: ["F", "B", "R", "D1", "D2", "D3"],
            cwPix: ["F", "B", "R"]
        },
        {
            colourName: "Aqua with Lemon",
            vid: "CW2",
            picPfx: "2",
            cwPix: ["F", "B", "R"]
        },
        {
            colourName: "Lavender with Aqua",
            vid: "CW3",
            picPfx: "3",
            cwPix: ["F", "B", "R"]
        },
        {
            colourName: "Orange with Sunflower",
            vid: "CW4",
            picPfx: "4",
            cwPix: ["F", "B", "R"]
        },
        {
            colourName: "Bougainvillea with Santa",
            vid: "CW5",
            picPfx: "5",
            cwPix: ["F", "B", "R"]
        },
        {
            colourName: "Green with Aqua",
            vid: "CW6",
            picPfx: "6",
            cwPix: ["F", "B", "R"]
        },
    ],
    sizes: ['2-4', '5-7', '8-10'],
    description: '',
    garmentDetails: ''
};

function createIMImageFactory(that, vidx) {
    return {
        that: that,
        vidx: vidx,
        getNumImages: function () {
            var vnt = this.that.variants.data[this.vidx];
            return vnt.cwPix.length;
        },
        getImage: function (iidx) {
            var vnt = this.that.variants.data[this.vidx];
            return {
                url: this.that.getBasePath() + vnt.picPfx + vnt.cwPix[iidx] + ".jpg",
                text: this.that.product.name + '-' + vnt.colourName + '-' + vnt.cwPix[iidx]
            };
        }
    };
}

itsmagic.createJSON = function (style) {
    var basePath = "/products/itsmagic/" + style.imgDir + "/";
    return createProductJSON(style.SKU, basePath, style, null, createIMImageFactory);
}

itsmagic.createCatalog = function () {
    return {
        styles: [itsmagic.princess],
        boys: [],
        girls: [itsmagic.princess.SKU],
        dresses: [itsmagic.princess.SKU],
        tops: [],
        shirts: [],
        pants: [],
        productDB: null,
        createProductDB: function () {
            var map = {};
            for (var i = 0; i < this.styles.length; i++) {
                var style = this.styles[i];
                var entry = itsmagic.createJSON(style);
                map[entry.skuInfo.SKU] = entry;
            }
            return map;
        },
        getProduct: function (sku) {
            return this.productDB[sku];
        },
        getCategory: function (sku) {
            if (this.girls.includes(sku)) {
                return "girls";
            }
            if (this.boys.includes(sku)) {
                return "boys";
            }
            return null;
        },
        initialize: function () {
            this.productDB = this.createProductDB();
        }
    }
}

itsmagic.catalog = itsmagic.createCatalog();
itsmagic.catalog.initialize();
