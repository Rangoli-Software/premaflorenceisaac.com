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

itsmagic.kidikini = {
    SKU: 'KIDIKI1501Vi',
    imgDir: 'kidikini',
    imageFile: "sizing.jpg",
    dimensionNames: ['A. Top', 'B. Waist', 'C. Hem'],
    dimensionsCm: {
        '1-2': [13.5, 36, 19],
        '2-4': [15.5, 40, 23],
        '5-7': [17, 46, 26],
        '8-10': [19, 50, 30]
    },
    getFabric: function (varidx) {
        return "Viscose";
    },
    data: [
        {
            colourName: "Turmeric with Chilly",
            vid: "CW1",
            picPfx: "1-",
            carouselPix: ["F", "B", "R", "D1", "D2"],
            cwPix: ["1", "2", "3"]
        },
        {
            colourName: "Krishna with Chartreuse",
            vid: "CW2",
            picPfx: "2-",
            cwPix: ["1", "2", "3"]
        }
    ],
    sizes: ['1-2', '2-4', '5-7', '8-10'],
    description: '',
    garmentDetails: ''
};

itsmagic.halfpant = {
    SKU: 'HLFPNT1601Kh',
    imgDir: 'halfpant',
    imageFile: "sizing.jpg",
    dimensionNames: ['A. Length', 'B. Waist', 'C. Hem', 'D. Crotch'],
    dimensionsCm: {
        '2-4': [43, 46, 18.5, 56],
        '5-7': [47, 50, 19, 58],
        '8-10': [51, 54, 19, 62]
    },
    getFabric: function (varidx) {
        return "Khadi";
    },
    data: [
        {
            colourName: "Grey",
            vid: "CW1",
            picPfx: "1",
            carouselPix: ["F", "B", "D1", "D2", "D3", "D4"],
            cwPix: ["F", "B"]
        },
        {
            colourName: "Green",
            vid: "CW2",
            picPfx: "2",
            cwPix: ["F", "B"]
        },
        {
            colourName: "Bordeaux",
            vid: "CW3",
            picPfx: "3",
            cwPix: ["F", "B"]
        },
        {
            colourName: "Jean",
            vid: "CW4",
            picPfx: "5",
            cwPix: ["F", "B"]
        }
    ],
    sizes: ['2-4', '5-7', '8-10'],
    description: '',
    garmentDetails: ''
};

itsmagic.prince = {
    SKU: 'YUVRTC1601Rv',
    imgDir: 'prince',
    imageFile: "sizing.jpg",
    dimensionNames: ['A. Length', 'B. Shoulder', 'C. Chest', 'D. Armhole', 'E. Sleeve', 'F. Bicep'],
    dimensionsCm: {
        '2-4': [45, 36, 72, 38, 12, 13.5],
        '5-7': [48, 38, 76, 40, 13, 14.5],
        '8-10': [54, 40, 80, 42, 15, 16.5]
    },
    getFabric: function (varidx) {
        return "Khadi & Voile";
    },
    data: [
        {
            colourName: "Burnt Orange with Chartreuse",
            vid: "CW1",
            picPfx: "1",
            carouselPix: ["F", "B", "D1", "D2", "RF", "RB"],
            cwPix: ["F", "B", "RF", "RB"]
        },
        {
            colourName: "Indigo with Chilly",
            vid: "CW2",
            picPfx: "2",
            cwPix: ["F", "B", "RF", "RB"]
        },
        {
            colourName: "Turquoise with Orange",
            vid: "CW3",
            picPfx: "3",
            cwPix: ["F", "B", "RF", "RB"]
        },
        {
            colourName: "Grey with Silver Sheen",
            vid: "CW4",
            picPfx: "4",
            cwPix: ["F", "B", "RF", "RB"]
        }
    ],
    sizes: ['2-4', '5-7', '8-10'],
    description: '',
    garmentDetails: ''
};

itsmagic.royal = {
    SKU: 'KRAJKT1601Rv',
    imgDir: 'royal',
    imageFile: "sizing.jpg",
    dimensionNames: ['A. Length', 'B. Shoulder', 'C. Chest', 'D. Armhole', 'E. Sleeve', 'F. Bicep'],
    dimensionsCm: {
        '2-4': [57, 26, 76, 38, 35.5, 22],
        '5-7': [60, 28, 80, 41, 37, 24],
        '8-10': [66, 32, 89, 44, 42, 27]
    },
    getFabric: function (varidx) {
        return "Khadi & Voile";
    },
    data: [
        {
            colourName: "Silver Sheen with Off-White",
            vid: "CW1",
            picPfx: "1",
            carouselPix: ["F", "B", "D1", "D2", "RF", "RB"],
            cwPix: ["F", "B", "RF", "RB"]
        },
        {
            colourName: "Steel with Sunflower",
            vid: "CW2",
            picPfx: "2",
            cwPix: ["F", "B", "RF", "RB"]
        },
        {
            colourName: "Black with Brass",
            vid: "CW3",
            picPfx: "3",
            cwPix: ["F", "B", "RF", "RB"]
        },
        {
            colourName: "Black with Chartreuse",
            vid: "CW4",
            picPfx: "4",
            cwPix: ["F", "B", "RF", "RB"]
        },
        {
            colourName: "Krishna with Dark Grey",
            vid: "CW5",
            picPfx: "5",
            cwPix: ["F", "B", "RF", "RB"]
        }
    ],
    sizes: ['2-4', '5-7', '8-10'],
    description: '',
    garmentDetails: ''
};

itsmagic.fullpant = {
    SKU: 'KRAJPT1601Kh',
    imgDir: 'fullpant',
    imageFile: "sizing.jpg",
    dimensionNames: ['A. Length', 'B. Waist', 'C. Hem', 'D. Crotch'],
    dimensionsCm: {
        '2-4': [60, 46, , ],
        '5-7': [65, 50, , ],
        '8-10': [75, 54, , ]
    },
    getFabric: function (varidx) {
        return "Khadi";
    },
    data: [
        {
            colourName: "Jean",
            vid: "CW1",
            picPfx: "1",
            carouselPix: ["F", "B", "D1", "D2", "D3", "D4"],
            cwPix: ["F", "B", "D1"]
        },
        {
            colourName: "Black",
            vid: "CW2",
            picPfx: "2",
            cwPix: ["F", "B", "D1"]
        },
        {
            colourName: "Grey",
            vid: "CW3",
            picPfx: "3",
            cwPix: ["F", "B", "D1"]
        }
    ],
    sizes: ['2-4', '5-7', '8-10'],
    description: '',
    garmentDetails: ''
};

itsmagic.balloon = {
    SKU: 'KBALPA1601Vo',
    imgDir: 'balloon',
    imageFile: "sizing.jpg",
    dimensionNames: ['A. Length', 'B. Waist', 'C. Hem', 'D. Crotch'],
    dimensionsCm: {
        '2-4': [59, 46, 22, 38],
        '5-7': [66, 50, 86, 43],
        '8-10': [76, 54, 96, 48]
    },
    getFabric: function (varidx) {
        return "Voile";
    },
    data: [
        {
            colourName: "Pink with Krishna",
            vid: "CW1",
            picPfx: "1",
            carouselPix: ["F", "B", "D1", "D2", "D3", "RF", "RB"],
            cwPix: ["F", "RF"]
        },
        {
            colourName: "Sunflower with Lemon",
            vid: "CW2",
            picPfx: "2",
            cwPix: ["F", "RF"]
        },
        {
            colourName: "Aqua with Lemon",
            vid: "CW3",
            picPfx: "3",
            cwPix: ["F", "RF"]
        },
        {
            colourName: "Green with Aqua",
            vid: "CW4",
            picPfx: "4",
            cwPix: ["F", "RF"]
        },
        {
            colourName: "Krishna with Aqua",
            vid: "CW5",
            picPfx: "5",
            cwPix: ["F", "RF"]
        },
        {
            colourName: "Orange with Lemon",
            vid: "CW6",
            picPfx: "6",
            cwPix: ["F", "RF"]
        },
        {
            colourName: "Santa with Anise",
            vid: "CW7",
            picPfx: "7",
            cwPix: ["F", "RF"]
        },
        {
            colourName: "Steel with Brass",
            vid: "CW8",
            picPfx: "8",
            cwPix: ["F", "RF"]
        },
    ],
    sizes: ['2-4', '5-7', '8-10'],
    description: '',
    garmentDetails: ''
};

itsmagic.fairy = {
    SKU: 'FAIRST2011Rv',
    imgDir: 'fairy',
    imageFile: "sizing.jpg",
    dimensionNames: ['A. Top Length', 'B. Shoulder', 'C. Chest', 'D. Armhole', 'E. Skirt Length', 'F. Waist'],
    dimensionsCm: {
        '2-4': [30, 12, 52, 24, 32, 40],
        '5-7': [32, 15, 56, 26, 42, 46],
        '8-10': [35, 17, 60, 29, 52, 50]
    },
    getFabric: function (varidx) {
        return "Jersey & Voile";
    },
    data: [
        {
            colourName: "Orange on Sunflower with Lemon",
            vid: "CW1",
            picPfx: "1",
            carouselPix: ["F", "B", "D1", "D2", "R"],
            cwPix: ["F", "R"]
        },
        {
            colourName: "Aqua on Bougainvillea with Aqua",
            vid: "CW2",
            picPfx: "2",
            cwPix: ["F", "R"]
        },
        {
            colourName: "Pink on Pink with Rose",
            vid: "CW3",
            picPfx: "3",
            cwPix: ["F", "R"]
        }
    ],
    sizes: ['2-4', '5-7', '8-10'],
    description: '',
    garmentDetails: ''
};

itsmagic.gypsy = {
    SKU: 'KGYPST1601Rv',
    imgDir: 'gypsy',
    imageFile: "sizing.jpg",
    dimensionNames: [],
    dimensionsCm: {
    },
    getFabric: function (varidx) {
        return "Voile & Tangail Border";
    },
    data: [
        {
            colourName: "Orange with Lemon",
            vid: "CW1",
            picPfx: "1",
            carouselPix: ["F", "RF"],
            cwPix: ["F", "RF"]
        },
        {
            colourName: "Lavender with Aqua",
            vid: "CW2",
            picPfx: "2",
            cwPix: ["F", "RF"]
        },
        {
            colourName: "Pink with Lemon",
            vid: "CW3",
            picPfx: "3",
            cwPix: ["F", "RF"]
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
        styles: [itsmagic.princess, itsmagic.flow, itsmagic.wave, itsmagic.fairy, itsmagic.gypsy, itsmagic.kidikini, itsmagic.halfpant, itsmagic.fullpant, itsmagic.prince, itsmagic.royal, itsmagic.balloon],
        unisex: [itsmagic.balloon.SKU],
        boys: [itsmagic.halfpant.SKU, itsmagic.fullpant.SKU, itsmagic.prince.SKU, itsmagic.royal.SKU],
        girls: [itsmagic.princess.SKU, itsmagic.flow.SKU, itsmagic.wave.SKU, itsmagic.fairy.SKU, itsmagic.gypsy.SKU, itsmagic.kidikini.SKU],
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
            if (this.unisex.includes(sku)) {
                return "unisex";
            }
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
