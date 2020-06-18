function createSDComponentFactory(prodInfo, dimensioner, sizer, categorizer) {
    var navHelper = createNavHelper(prodInfo, categorizer, 'Formals');
    var relatedviewer = createEmptyViewer();
    return createProductComponentFactory(prodInfo, dimensioner, sizer, relatedviewer, navHelper);
}

const sd_sizing_top = {
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

const bncaData = {
    imageFile: "sizing.jpg",
    dimensionNames: ["A. Length", "B. Back Bust", "C. Shoulder", "D. Armhole", "E. Sleeve Length", "F. Sleeve Hem"],
    dimensionsCm: {
        S: [
            103,
            47,
            39,
            48,
            46,
            30
        ],
        M: [
            104,
            49,
            41,
            50,
            49,
            32
        ],
        L: [
            105,
            51,
            43,
            52,
            51,
            34
        ],
        XL: [
            106,
            53,
            45,
            54,
            53,
            36
        ]
    },
    getFabric: function (varidx) {
        return "P.F.I. Tangail / Voile";
    },
    data: [
        {
            colourName: "Black &amp; Silver",
            vid: "CW1",
            colourPfx: "bl",
            colourSfxs: ["hero", "front", "detail"]
        }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: '',
    garmentDetails: ''

};

const celaData = {
    imageFile: "sizing.jpg",
    dimensionNames: ["A. Length", "B. Back Bust", "C. Shoulder", "D. Armhole", "E. Sleeve Length", "F. Sleeve Hem"],
    dimensionsCm: {
        S: [
            103,
            47,
            39,
            48,
            46,
            30
        ],
        M: [
            104,
            49,
            41,
            50,
            49,
            32
        ],
        L: [
            105,
            51,
            43,
            52,
            51,
            34
        ],
        XL: [
            106,
            53,
            45,
            54,
            53,
            36
        ]
    },
    getFabric: function (varidx) {
        return "P.F.I. Tangail / Voile";
    },
    data: [
        {
            colourName: "Black &amp; Silver",
            vid: "CW1",
            colourPfx: "bl",
            colourSfxs: ["hero", "front", "side"]
        }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: '',
    garmentDetails: ''

};

const cleoData = {
    imageFile: "sizing.jpg",
    dimensionNames: ["A. Length", "B. Back Bust", "C. Shoulder", "D. Armhole", "E. Sleeve Length", "F. Sleeve Hem"],
    dimensionsCm: {
        S: [
            103,
            47,
            39,
            48,
            46,
            30
        ],
        M: [
            104,
            49,
            41,
            50,
            49,
            32
        ],
        L: [
            105,
            51,
            43,
            52,
            51,
            34
        ],
        XL: [
            106,
            53,
            45,
            54,
            53,
            36
        ]
    },
    getFabric: function (varidx) {
        return "P.F.I. Tangail / Voile";
    },
    data: [
        {
            colourName: "Black &amp; Silver",
            vid: "CW1",
            colourPfx: "bl",
            colourSfxs: ["hero", "front", "side"]
        }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: '',
    garmentDetails: ''

};

const emlaData = {
    imageFile: "sizing.jpg",
    dimensionNames: ["A. Length", "B. Back Bust", "C. Shoulder", "D. Armhole", "E. Sleeve Length", "F. Sleeve Hem"],
    dimensionsCm: {
        S: [
            103,
            47,
            39,
            48,
            46,
            30
        ],
        M: [
            104,
            49,
            41,
            50,
            49,
            32
        ],
        L: [
            105,
            51,
            43,
            52,
            51,
            34
        ],
        XL: [
            106,
            53,
            45,
            54,
            53,
            36
        ]
    },
    getFabric: function (varidx) {
        return "P.F.I. Tangail / Voile";
    },
    data: [
        {
            colourName: "Black &amp; Silver",
            vid: "CW1",
            colourPfx: "bl",
            colourSfxs: ["hero", "side", "detail-1", "detail-2"]
        }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: '',
    garmentDetails: ''

};

function createBiancaDressJSON() {
    var sku = "BNCADR1505PT";
    var basePath = "/products/night/bianca/";
    return createProductJSON(sku, basePath, bncaData, sd_sizing_top, createCWImageFactory);
}

function createBiancaJacketJSON() {
    var sku = "BNCJKT1505PT";
    var basePath = "/products/night/bianca/";
    return createProductJSON(sku, basePath, bncaData, sd_sizing_top, createCWImageFactory);
}

function createCeliaSkirtJSON() {
    var sku = "NKSHMD1501PT";
    var basePath = "/products/night/celia/";
    return createProductJSON(sku, basePath, celaData, sd_sizing_top, createCWImageFactory);
}

function createCleopatraTopJSON() {
    var sku = "CLPTRT1505PT";
    var basePath = "/products/night/cleo/";
    return createProductJSON(sku, basePath, cleoData, sd_sizing_top, createCWImageFactory);
}

function createCleopatraShortsJSON() {
    var sku = "CLPTRS1505PT";
    var basePath = "/products/night/cleo/";
    return createProductJSON(sku, basePath, cleoData, sd_sizing_top, createCWImageFactory);
}

function createEmiliaDressJSON() {
    var sku = "EMLDRS1505PT";
    var basePath = "/products/night/emilia/";
    return createProductJSON(sku, basePath, emlaData, sd_sizing_top, createCWImageFactory);
}

function createProductDB() {
    var map = {};

    var entry = createBiancaDressJSON();
    map[entry.skuInfo.SKU] = entry;

    var entry = createBiancaJacketJSON();
    map[entry.skuInfo.SKU] = entry;

    var entry = createCeliaSkirtJSON();
    map[entry.skuInfo.SKU] = entry;

    var entry = createCleopatraTopJSON();
    map[entry.skuInfo.SKU] = entry;

    var entry = createCleopatraShortsJSON();
    map[entry.skuInfo.SKU] = entry;

    var entry = createEmiliaDressJSON();
    map[entry.skuInfo.SKU] = entry;

    return map;
}

const sd_catalog = {
    skus: ['BNCJKT1505PT','BNCADR1505PT','NKSHMD1501PT','CLPTRT1505PT','CLPTRS1505PT','EMLDRS1505PT'],
    dresses: ['BNCADR1505PT','EMLDRS1505PT'],
    tops: ['CLPTRT1505PT'],
    pants: [],
    culottes: ['CLPTRS1505PT'],
    skirts: ['NKSHMD1501PT'],
    overtops: ['BNCJKT1505PT'],
    getCategory: function (sku) {
        if (this.dresses.includes(sku)) {
            return "dresses";
        }
        if (this.tops.includes(sku)) {
            return "tops";
        }
        if (this.pants.includes(sku)) {
            return "pants";
        }
        if (this.culottes.includes(sku)) {
            return "culottes";
        }
        if (this.skirts.includes(sku)) {
            return "skirts";
        }
        if (this.overtops.includes(sku)) {
            return "overtops";
        }
        return null;
    },
    productDB: createProductDB(),
    getProduct: function (sku) {
        return this.productDB[sku];
    }
};
