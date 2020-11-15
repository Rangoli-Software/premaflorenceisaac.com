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

itsmagic.createNavHelper = function (prodInfo) {
    return {
        prodInfo: prodInfo,
        getBreadCrumb: function () {
            var levels = [{
                title: 'Shop',
                url: '/shop.html'
            }, {
                title: 'It\'s Magic',
                url: '/products/itsmagic/shop.html'
            }, {
                title: this.prodInfo.product.name
            }];
            return createBreadCrumbLevels(levels);
        }
    };
}

itsmagic.createComponentFactory = function (prodInfo, dimensioner, sizer, catalog) {
    var navHelper = itsmagic.createNavHelper(prodInfo);
    //    var relatedviewer = itsmagic.createRelatedViewer(prodInfo.skuInfo, catalog);
    var relatedviewer = createEmptyViewer();
    return createProductComponentFactory(prodInfo, dimensioner, sizer, relatedviewer, navHelper, "", "Age");
}

itsmagic.sizing_top = {};

itsmagic.princess = {
    SKU: 'PRNCDR1501Rv',
    imgDir: 'princess',
    imageFile: "sizing.jpg",
    dimensionNames: ['A. Length', 'B. Chest', 'C. Waist', 'D. Armhole'],
    dimensionsCm: {
        '2-4': [66, 60, 56, 36],
        '5-7': [75, 64, 60, 40],
        '8-10': [87, 76, 70, 46]
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

itsmagic.flow = {
    SKU: 'KDHRDR1601Rv',
    imgDir: 'flow',
    imageFile: "sizing.jpg",
    dimensionNames: ['A. Length', 'B. Shoulder', 'C. Chest', 'D. Armhole'],
    dimensionsCm: {
        '2-4': [54, 16, 54, 16],
        '5-7': [61, 17, 58, 17],
        '8-10': [72, 18, 62, 18]
    },
    getFabric: function (varidx) {
        return "Voile";
    },
    data: [
        {
            colourName: "Aqua with Lemon",
            vid: "CW1",
            picPfx: "1",
            carouselPix: ["F", "B", "R", "D1", "D2"],
            cwPix: ["F", "R"]
        },
        {
            colourName: "Lavender with Chartreuse",
            vid: "CW2",
            picPfx: "2",
            cwPix: ["F", "R"]
        },
        {
            colourName: "Pink with Rose",
            vid: "CW3",
            picPfx: "3",
            cwPix: ["F", "R"]
        }
    ],
    sizes: ['2-4', '5-7', '8-10'],
    description: '',
    garmentDetails: ''
};

itsmagic.wave = {
    SKU: 'KWAVDR1601Rv',
    imgDir: 'wave',
    imageFile: "sizing.jpg",
    dimensionNames: ['A. Length', 'B. Shoulder', 'C. Chest', 'D. Armhole'],
    dimensionsCm: {
        '2-4': [60, 12, 60, 42],
        '5-7': [66, 14, 70, 45],
        '8-10': [73, 16, 76, 48]
    },
    getFabric: function (varidx) {
        return "Voile";
    },
    data: [
        {
            colourName: "Chartreuse & Green & Krishna Blue over Lemon",
            vid: "CW1",
            picPfx: "1",
            carouselPix: ["F", "B", "D1", "D2"],
            cwPix: ["F", "B"]
        },
        {
            colourName: "Lavender & Rose & Old Rose over Aqua",
            vid: "CW2",
            picPfx: "2",
            cwPix: ["F", "B"]
        },
        {
            colourName: "Orange & Lemon & Pink over Chartreuse",
            vid: "CW3",
            picPfx: "3",
            cwPix: ["F", "B"]
        },
        {
            colourName: "Dark Grey & Brass & Silver Sheen over Sunflower",
            vid: "CW4",
            picPfx: "4",
            cwPix: ["F", "B"]
        }
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
        styles: [itsmagic.princess, itsmagic.flow, itsmagic.wave],
        boys: [],
        girls: [itsmagic.princess.SKU, itsmagic.flow.SKU, itsmagic.wave.SKU],
        dresses: [itsmagic.princess.SKU, itsmagic.flow.SKU, itsmagic.wave.SKU],
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
