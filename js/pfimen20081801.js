function createVBComponentFactory(prodInfo, dimensioner, sizer, categorizer) {
    var navHelper = createNavHelper(prodInfo, categorizer, 'Men');
    var relatedviewer = createEmptyViewer();
    return createProductComponentFactory(prodInfo, dimensioner, sizer, relatedviewer, navHelper, "");
}

const vb_sizing_top = {
    sizeGeo: ["US", "UK", "EU", "IT", "GR", "JP", "RU"],
    capGeo: ["US", "UK / AU / NZ", "EU / FR", "IT", "DE", "JP", "RU"],
    chart: {
        S: {
            US: [8, 10],
            UK: [12, 14],
            EU: [40, 42],
            IT: [44, 46],
            GR: [38, 40],
            JP: [13, 15],
            RU: [46, 48]
        },
        M: {
            US: [10, 12],
            UK: [14, 16],
            EU: [42, 44],
            IT: [46, 48],
            GR: [40, 42],
            JP: [15, 17],
            RU: [48, 50]
        },
        L: {
            US: [12, 14],
            UK: [16, 18],
            EU: [44, 46],
            IT: [48, 50],
            GR: [42, 44],
            JP: [17, 19],
            RU: [50, 52]
        },
        XL: {
            US: [14, 16],
            UK: [18, 20],
            EU: [46, 48],
            IT: [50, 52],
            GR: [44, 46],
            JP: [19, 21],
            RU: [52, 54]
        },
        Free: {
            US: [2, 12],
            UK: [6, 16],
            EU: [34, 44],
            IT: [38, 48],
            GR: [32, 42],
            JP: [7, 17],
            RU: [40, 50]
        }
    }
}

const angkData = {
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
    description: '',
    garmentDetails: ''

};

const aramData = {
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

const kohData = {
    imageFile: "sizing.jpg",
    dimensionNames: ["A. Length", "B. Shoulder", "C. Chest", "D. Armhole", "E. Sleeve Length", "F. Sleeve Hem"],
    dimensionsCm: {
        S: [
            68,
            46,
            110,
            50,
            17,
            17.5
        ],
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
    description: '',
    garmentDetails: ''

};

const mvrkData = {
    imageFile: "sizing.jpg",
    dimensionNames: ["A. Length Left", "B. Length Right", "C. Shoulder", "D. Chest", "E. Armhole", "F. Sleeve Length", "G. Sleeve Hem"],
    dimensionsCm: {
        S: [
            88,
            63,
            46,
            110,
            50,
            17,
            17.5
        ],
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
    description: '',
    garmentDetails: ''

};

const nrgmData = {
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
    description: '',
    garmentDetails: ''

};

const pndyData = {
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
    description: '',
    garmentDetails: ''

};

const ubudData = {
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
    description: '',
    garmentDetails: ''

};

function createAngkorKurtaJSON() {
    var sku = "ANGKRT1601Kh";
    var basePath = "/products/men/angkor/";
    return createProductJSON(sku, basePath, angkData, vb_sizing_top, createCWImageFactory);
}

function createArambolPantJSON() {
    var sku = "ARAMPA1601Kh";
    var basePath = "/products/men/arambol/";
    return createProductJSON(sku, basePath, aramData, vb_sizing_top, createCWImageFactory);
}

function createKohKurtaJSON() {
    var sku = "KOHKRT1601Kh";
    var basePath = "/products/men/koh/";
    return createProductJSON(sku, basePath, kohData, vb_sizing_top, createCWImageFactory);
}

function createMavericksKurtaJSON() {
    var sku = "MAVKRT1601Kh";
    var basePath = "/products/men/mavericks/";
    return createProductJSON(sku, basePath, mvrkData, vb_sizing_top, createCWImageFactory);
}

function createNarigamaKurtaJSON() {
    var sku = "NARKRT1601Kh";
    var basePath = "/products/men/narigama/";
    return createProductJSON(sku, basePath, nrgmData, vb_sizing_top, createCWImageFactory);
}

function createPondyPantJSON() {
    var sku = "PNDPNT1601Kh";
    var basePath = "/products/men/pondy/";
    return createProductJSON(sku, basePath, pndyData, vb_sizing_top, createCWImageFactory);
}

function createUbudPantJSON() {
    var sku = "UBDPNT1601Kh";
    var basePath = "/products/men/ubud/";
    return createProductJSON(sku, basePath, ubudData, vb_sizing_top, createCWImageFactory);
}

function createProductDB() {
    var map = {};

    var entry = createAngkorKurtaJSON();
    map[entry.skuInfo.SKU] = entry;

    var entry = createArambolPantJSON();
    map[entry.skuInfo.SKU] = entry;

    var entry = createKohKurtaJSON();
    map[entry.skuInfo.SKU] = entry;

    var entry = createMavericksKurtaJSON();
    map[entry.skuInfo.SKU] = entry;

    var entry = createNarigamaKurtaJSON();
    map[entry.skuInfo.SKU] = entry;

    var entry = createPondyPantJSON();
    map[entry.skuInfo.SKU] = entry;

    var entry = createUbudPantJSON();
    map[entry.skuInfo.SKU] = entry;

    return map;
}

const vb_catalog = {
    skus: ['ANGKRT1601Kh', 'ARAMPA1601Kh', 'KOHKRT1601Kh', 'MAVKRT1601Kh', 'NARKRT1601Kh', 'PNDPNT1601Kh', 'UBDPNT1601Kh'],
    shirts: ['ANGKRT1601Kh', 'KOHKRT1601Kh', 'MAVKRT1601Kh', 'NARKRT1601Kh'],
    pants: ['ARAMPA1601Kh', 'PNDPNT1601Kh', 'UBDPNT1601Kh'],
    getCategory: function (sku) {
        if (this.shirts.includes(sku)) {
            return "shirts";
        }
        if (this.pants.includes(sku)) {
            return "pants";
        }
        return null;
    },
    productDB: createProductDB(),
    getProduct: function (sku) {
        return this.productDB[sku];
    }
};
