const vagabond = {};

vagabond.createRelatedViewer = function (skuInfo, catalog) {
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

vagabond.createComponentFactory = function (prodInfo, dimensioner, sizer, categorizer) {
    var navHelper = createNavHelper(prodInfo, categorizer, vagabond.catalog.title);
    //    var relatedviewer = createVBRelatedViewer(prodInfo.skuInfo, catalog);
    var relatedviewer = createEmptyViewer();
    return createProductComponentFactory(prodInfo, dimensioner, sizer, relatedviewer, navHelper, "", "Size", false);
}

vagabond.angkor = {
    SKU: "ANGKRT1601Kh",
    imgDir: 'angkor',
    sizing: null,
    imageFile: "sizing.jpg",
    dimensionNames: ["A. Length", "B. Shoulder", "C. Chest", "D. Armhole", "E. Sleeve Length", "F. Sleeve Hem"],
    dimensionsCm: {
        S: [
            68,
            47,
            110,
            50,
            20,
            17
        ],
        M: [
            71,
            49,
            114,
            53,
            21.5,
            18
        ],
        L: [
            73,
            52,
            120,
            57,
            24,
            19.5
        ],
        XL: [
            75,
            54,
            126,
            60,
            26,
            21
        ]
    },
    getFabric: function (varidx) {
        return "Khadi / P.F.I. Tangail";
    },
    data: [
        {
            colourName: "Black",
            vid: "CW1",
            colourPfx: "black",
            colourSfxs: ["hero", "front", "back", "detail-1", "detail-2"]
        },
        {
            colourName: "Grey",
            vid: "CW2",
            colourPfx: "white",
            colourSfxs: ["hero", "front-1", "front-2", "back", "detail"]
        }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'The Angkor Kurta is cut in 100% cotton khadi. It has short sleeves and a grey khadi panel highlights the neckline. The upside down button placket at the front and a short slit at the centre back (both emphasized with a silk silver P.F.I. Tangail border) add a subtle twist to this kurta.',
    garmentDetails: '<li>Round neck</li><li>Short sleeves</li><li>Button placket at the front with P.F.I. Tangail border</li><li>Slit with P.F.I. Tangail border on the back</li><li>Flap pocket on the left</li><li>Slips on</li>'

};

vagabond.arambol = {
    SKU: "ARAMPA1601Kh",
    imgDir: 'arambol',
    sizing: null,
    imageFile: "sizing.jpg",
    dimensionNames: ["A. Length", "B. Waist Elastic", "C. Hips", "D. Crotch", "E. Leg Hem"],
    dimensionsCm: {
        S: [75, 35, 112, 73, 44],
        M: [77, 37, 116, 76, 47],
        L: [79, 39, 120, 79, 49],
        XL: [81, 41, 126, 82, 52],
    },
    getFabric: function (varidx) {
        return "Khadi / P.F.I. Tangail";
    },
    data: [
        {
            colourName: "Black",
            vid: "CW1",
            colourPfx: "black",
            colourSfxs: ["hero", "front", "detail"]
        }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: '',
    garmentDetails: ''

};

vagabond.koh = {
    SKU: "KOHKRT1601Kh",
    imgDir: 'koh',
    sizing: null,
    imageFile: "sizing.jpg",
    dimensionNames: ["A. Length", "B. Shoulder", "C. Chest", "D. Armhole", "E. Sleeve Length", "F. Sleeve Hem"],
    dimensionsCm: {
        S: [68, 46, 110, 50, 17, 17.5],
        M: [
            70,
            48,
            114,
            52,
            18,
            19
        ],
        L: [
            72,
            50,
            120,
            55,
            19,
            21
        ],
        XL: [
            74,
            52,
            124,
            59,
            20,
            23
        ]
    },
    getFabric: function (varidx) {
        return "Khadi / P.F.I. Tangail";
    },
    data: [
        {
            colourName: "Black",
            vid: "CW1",
            colourPfx: "black",
            colourSfxs: ["hero", "front", "side"]
        }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'The T-shirt inspired Koh Kurta is one of our favourite basics. The grey collar sits comfortably on the high neck and the silk golden striped P.F.I. Tangail panel adds a metallic shine to the neutral palette of Koh Kurta. For your everyday attire, this is a toned down version of the Mavericks Kurta.',
    garmentDetails: '<li>High neckline</li><li>Short Sleeves</li><li>Boxy cut</li><li>Slips on</li>'

};

vagabond.mavericks = {
    SKU: "MAVKRT1601Kh",
    imgDir: 'mavericks',
    sizing: null,
    imageFile: "sizing.jpg",
    dimensionNames: ["A. Length Left", "B. Length Right", "C. Shoulder", "D. Chest", "E. Armhole", "F. Sleeve Length", "G. Sleeve Hem"],
    dimensionsCm: {
        S: [88, 63, 46, 110, 50, 17, 17.5],
        M: [90, 65, 48, 114, 52, 18, 19],
        L: [94, 67, 50, 118, 55, 19, 21],
        XL: [97, 69, 52, 124, 59, 20, 23, ]
    },
    getFabric: function (varidx) {
        return "Khadi / P.F.I. Tangail";
    },
    data: [
        {
            colourName: "Black",
            vid: "CW1",
            colourPfx: "black",
            colourSfxs: ["hero", "front", "back", "side", "detail", "detail-2"]
        }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'The Mavericks Kurta is the feature piece of this capsule and an ode to the travelers and mavericks of the world. The collar sits comfortably on the high neck and the asymmetrical panels add a jazz angle. This kurta is a mix of lightweight 100% cotton khadi and our custom P.F.I. Tangail trims in silk and cotton. The neutral palette of grey and black is highlighted with the metallic golden P.F.I. Tangail.',
    garmentDetails: '<li>High neckline</li><li>Asymmetrical</li><li>Short sleeves</li><li>Slips on</li>'
};

vagabond.narigama = {
    SKU: "NARKRT1601Kh",
    imgDir: 'narigama',
    sizing: null,
    imageFile: "sizing.jpg",
    dimensionNames: ["A. Length", "B. Shoulder", "C. Chest", "D. Armhole", "E. Sleeve Length", "F. Bicep"],
    dimensionsCm: {
        S: [71, 46, 110, 50, 63, 39],
        M: [73, 48, 114, 52, 65, 41],
        L: [75, 50, 118, 54, 67, 43],
        XL: [76, 53, 124, 56, 68, 45]
    },
    getFabric: function (varidx) {
        return "Khadi / P.F.I. Tangail";
    },
    data: [
        {
            colourName: "Grey",
            vid: "CW2",
            colourPfx: "grey",
            colourSfxs: ["hero", "front", "side", "detail"]
        }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'This basic Narigama Kurta is designed for ease and comfort. It has pintucks in the front and is cut in a100% cotton khadi. It has a mandarin collar with front placket and side slits that make the kurta even more relaxed. An Indian kurta, with western sleeve cuffs and a mandarin collar - this cross-cultural design is favored by the well-traveled "Vagabond".',
    garmentDetails: '<li>Short kurta</li><li>Mandarin collar</li><li>Full sleeves with cuff</li><li>Pintuck detail in the front</li>'
};

vagabond.pondy = {
    SKU: "PNDPNT1601Kh",
    imgDir: 'pondy',
    sizing: null,
    imageFile: "sizing.jpg",
    dimensionNames: ["A. Length", "B. Waist Elastic", "C. Hips", "D. Crotch", "E. Leg Hem"],
    dimensionsCm: {
        S: [102, 35, 112, 73, 36],
        M: [103, 37, 116, 76, 39],
        L: [104, 39, 120, 79, 41],
        XL: [105, 41, 126, 82, 44],
    },
    getFabric: function (varidx) {
        return "Khadi / P.F.I. Tangail";
    },
    data: [
        {
            colourName: "Black",
            vid: "CW1",
            colourPfx: "black",
            colourSfxs: ["hero", "front", "back", "side", "detail"]
        }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'The Pondy Pants are inspired by the relaxed resort vibe of, well, Pondicherry. It has an adjustable drawstring and elastic at the waist and is cut in 100% cotton khadi. Detailing is provided by the contrasting khadi border at the hem, on the drawstring and the back pocket. Golden silk P.F.I. Tangail trims on the sides of the hem add a subtle bit of ornamentation.',
    garmentDetails: '<li>Elastic and adjustable drawstring at the waist</li><li>P.F.I. Tangail border at hem</li><li>Side pockets</li>'
};

vagabond.ubud = {
    SKU: "UBDPNT1601Kh",
    imgDir: 'ubud',
    sizing: null,
    imageFile: "sizing.jpg",
    dimensionNames: ["A. Length", "B. Waist Elastic", "C. Hips", "D. Crotch", "E. Leg Hem"],
    dimensionsCm: {
        S: [99, 32, 112, 73, 14],
        M: [100, 34, 116, 76, 15],
        L: [102, 36, 120, 79, 15],
        XL: [104, 38, 126, 82, 16]
    },
    getFabric: function (varidx) {
        return "Khadi / P.F.I. Tangail";
    },
    data: [
        {
            colourName: "Black",
            vid: "CW1",
            colourPfx: "black",
            colourSfxs: ["hero", "side", "back"]
        }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'For the Ubud Pants, we took a streetwear silhouette and jazzed it up. These track pants are cut in 100% cotton khadi and the asymmetrical striped P.F.I. Tangail cotton panel is accentuated with silk golden P.F.I. Tangail to make a flamboyant statement. The broad elastic sits comfortably at the waist, and it has side slit pockets and an adjustable buttoned hem.',
    garmentDetails: '<li>Elastic at the waist</li><li>Side pockets</li><li>Adjustable hem band with buttons</li>'

};

vagabond.manhattanpant = {
    SKU: "MNHTPT2018SP",
    imgDir: 'manpnt',
    sizing: null,
    imageFile: "sizing.jpg",
    dimensionNames: ['A. Length', 'B. Waist', 'C. Hips', 'D. Crotch', 'E. Hem'],
    dimensionsCm: {
        S: [103, 76, 102, 60, 35],
        M: [105, 80, 108, 64, 37],
        L: [107, 84, 114, 68, 39],
        XL: [109, 88, 120, 73, 41]
    },
    getFabric: function (varidx) {
        return "Stretch Poplin / P.F.I. Tangail";
    },
    data: [
        {
            colourName: "Khaki",
            vid: "CW1",
            colourPfx: "khaki",
            colourSfxs: ["f1", "s", "d1", "d2"]
        }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'The Manhattan Trouser is tailored in a high-quality poplin fabric that has a slight stretch. The golden PFI Tangail borders at the front and back pockets, and on the folded hems to add a metallic touch to the subtle beige trousers. Adjust the length by leaving the hems unfolded for an alternate look.',
    garmentDetails: '<li>Fitted trousers</li><li>Two side pockets</li><li>PFI Tangail border on the folded hems and pockets</li><li>Zip and button fastening in the front</li><li>Two front vertical pockets</li><li>One back pocket</li>'
};

vagabond.manhattanshirt = {
    SKU: "MNHTST2016SP",
    imgDir: 'mansht',
    sizing: null,
    imageFile: "sizing.jpg",
    dimensionNames: ['A. Length', 'B. Shoulder', 'C. Chest', 'D. Armhole', 'E. Sleeve Length', 'F. Sleeve Width'],
    dimensionsCm: {
        S: [71, 45, 104, 48, 66, 38],
        M: [73, 47, 108, 50, 68, 40],
        L: [75, 49, 112, 52, 70, 42],
        XL: [77, 51, 116, 54, 72, 44]
    },
    getFabric: function (varidx) {
        return "Stretch Cambric / P.F.I. Tangail";
    },
    data: [
        {
            colourName: "Navy",
            vid: "CW1",
            colourPfx: "navy",
            colourSfxs: ["f", "b1", "s", "d11", "d2"]
        }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'The Manhattan Shirt is constructed in a high-quality stretch cambric. It is fitted with darts in the front and back, and the slight stretch in the fabric makes it easy to move around. The dark navy blue shirt is accentuated with silk golden PFI Tangail borders at the edges of the collar, hidden trims at the placket and cuffs.',
    garmentDetails: '<li>Fitted shirt with darts</li><li>Full sleeves</li><li>Button closure in front</li><li>Silk golden PFI Tangail border on the placket, cuffs and collar</li>'
};

vagabond.createJSON = function (style) {
    var basePath = "/products/men/" + style.imgDir + "/";
    return createProductJSON(style.SKU, basePath, style, style.sizing, createCWImageFactory);
}

vagabond.catalog = {
    title: "Vagabond",
    shopURL: "/products/men/shop.html",
    skus: null,
    styles: [vagabond.angkor, vagabond.arambol, vagabond.koh, vagabond.mavericks, vagabond.narigama, vagabond.pondy, vagabond.ubud, vagabond.manhattanshirt, vagabond.manhattanpant],
    tops: [vagabond.angkor.SKU, vagabond.koh.SKU, vagabond.mavericks.SKU, vagabond.narigama.SKU],
    pants: [vagabond.pondy.SKU, vagabond.ubud.SKU],
    fitted: [vagabond.manhattanshirt.SKU, vagabond.manhattanpant.SKU],
    getPairWith: function (sku) {
        if (this.shirts.includes(sku)) {
            return this.pants;
        } else if (this.pants.includes(sku)) {
            return this.shirts;
        }
        return null;
    },
    productDB: null,
    getProduct: function (sku) {
        return this.productDB[sku];
    }
};

pfiavG.getLineInitializer(vagabond).initialize();

vagabond.categorizer = createFieldCategorizer(
    vagabond.catalog,
    ["Tailored", "Kurtas", "Pants"],
    ["fitted", "tops", "pants"],
    ["f", "s", "p"],
    "t",
    "f");
