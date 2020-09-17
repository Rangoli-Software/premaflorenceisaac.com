function createSDComponentFactory(prodInfo, dimensioner, sizer, categorizer) {
    var navHelper = createNavHelper(prodInfo, categorizer, 'Formals');
    var relatedviewer = createEmptyViewer();
    var modelTxt = "The model is 5 ft 7 in (173 cm.) and wearing size '" + prodInfo.skuInfo.sizes[0] + "'";
    return createProductComponentFactory(prodInfo, dimensioner, sizer, relatedviewer, navHelper, modelTxt);
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
    description: 'Celia Skirt is one of our favourite silhouettes. It\'s cut in the finest cotton P.F.I. Tangail. This exquisite cotton is often mistaken as silk by my clients. It has an incredible volume to play around in and is freesize! The waist band is made up of 9 rows of elastic. Because of the need for care while working with the delicate Tangail fabric, it can take a skilled tailor almost a full day of work to create this waistband. The result is a freesize waist with a snug, comfortable fit. It can work from day to night and it\'s groovy flare will have you swirling all day. Pair it with our Portia Top to take it up a notch or wear a basic t-shirt to keep it subtle.',
    garmentDetails: '<li>Freesize - Broad elastic at the waist</li><li>P.F.I. Tangail</li><li>Midi length</li><li>A line with voluminous flare</li>'
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
    description: 'The Cleopatra Top is cut in ivory ahimsa silk and lined with cotton voile. The round neck is highlighted with black and silver silk P.F.I. Tangail border. It is sleeveless and adds a comfortable chic element to your outfit. Pair it with our Cleopatra Shorts or skirts to keep it easy.',
    garmentDetails: '<li>Round neck</li><li>Sleeveless</li><li>Short length</li><li>P.F.I. Tangail border at the neckline</li><li>Slips on</li><li>Cotton lining</li>'

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
    description: 'Emilia Dress combines traditional handwoven P.F.I. Tangail cotton of Bengal with a western off-shoulder detail. The bias cut of the fabric goes around to overlap in uneven hemline. This gives the dress a voluminous flare which mimics your movements cheerfully. This dress stays true to a neutral palette of black with a metallic touch of tiny silver motifs.',
    garmentDetails: '<li>Off-shoulder</li><li>Half sleeves</li><li>Zip at the back</li><li>A line with voluminous flare</li>'

};

const hlnaData = {
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
            colourName: "Grey &amp; Gold",
            vid: "CW1",
            colourPfx: "gr",
            colourSfxs: ["hero", "front", "back", "side", "detail"]
        }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'The high-low hemline with voluminous flare gives a flattering flow to the Helena dress. It\'s cut in P.F.I. Tangail cotton in grey stripes featuring an origami-ed silver P.F.I. Tangail border in the front. The contrasting red lining in voile lifts up the muted colour palette. A subtle detail of origami-ed silver P.F.I. Tangail border on the lining of the dress adds to the elegance. The hem is finished with cascading ruffles to add more playfulness to the A line dress.',
    garmentDetails: '<li>Round neck</li><li>Sleeveless</li><li>High-low hemline</li><li>P.F.I Tangail border in the front</li><li>Contrasting lining in voile</li><li>Zip at the back</li><li>A line with voluminous flare</li>'
};

const jlitData = {
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
            colourSfxs: ["hero", "front", "side", "detail"]
        }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'The asymmetrical panels are collaged in ivory ahimsa silk, silver P.F.I. Tangail borders and black P.F.I. Tangail cotton with tiny silver motifs. The buttons in the front make it easier to slip into this modest round neck dress with cap sleeves. Pair it with black or silver high heels and enjoy your formal dinners.',
    garmentDetails: '<li>Round neck</li><li>Cap lseeves</li><li>Asymmetrical</li><li>A line with flare</li><li>Buttons in the front</li>'
};

const nrsaData = {
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
            colourName: "Grey &amp; Gold",
            vid: "CW1",
            colourPfx: 'gr',
            colourSfxs: ["hero", "front", "side"]
        }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: '',
    garmentDetails: ''

};

const ophlData = {
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
            colourPfx: 'bl',
            colourSfxs: ["hero", "front", "side","pose"]
        }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Ophelia Dress is cut in black P.F.I. Tangail cotton with a silver silk panel that highlights the neckline. Its lining extends the hemline to add more flounce to  this jovial dress. The square armhole adds a twist to the modest round neck and the zip in the back makes it easy to slip into.',
    garmentDetails: '<li>Round neck</li><li>Sleeveless</li><li>A line with voluminous flare</li><li>Zip at the back</li><li>Lining in voile</li>'
};

const prtaData = {
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
            colourPfx: 'bl',
            colourSfxs: ["hero", "front", "side"]
        }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'The black and silver silk P.F.I. Tangail panel gives the Portia Top a festive touch. It\'s cut in breathable P.F.I. Tangail cotton which is often mistaken as silk by my clients. It is sleeveless with a modest round neck and has a zip in the back to slip on easily. Pair it with our Celia Skirt for your formal dinners or basic trousers, its versatality will make you wear it more often.',
    garmentDetails: '<li>Round neck</li><li>Sleeveless</li><li>Zip at the back</li><li>P.F.I. Tangail panel in the front</li>'

};

const tmraData = {
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
            colourPfx: 'bl',
            colourSfxs: ["hero", "back", "side"]
        }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Tamora Dress is cut in a superior jersey to give a flattering shape. The jersey is draped and twisted to support your bust which will help you go bra-free. The deep V neck gives an illusion of a slender frame. The neck and hemline are accentuated with black and silver silk P.F.I. Tangail border that adds a subtle charm to the black dress.',
    garmentDetails: '<li>Floor length</li><li>V neck</li><li>Deep V neckline at the back</li><li>Sleeveless</li><li>Gathers in the front</li><li>A line</li><li>P.F.I Tangail border at the neckline and hem</li>'
};

const ttnaData = {
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
            colourPfx: 'bl',
            colourSfxs: ["hero", "back", "side"]
        }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'A superior quality jersey is used to drape this little black dress that will hug and flatter every shape. The jersey is gathered in the centre front and back and descends at the sideseam. The shoulder straps in black and silver silk P.F.I. Tangail can be worn on either sides or on the same side to make it an off-shoulder dress. ',
    garmentDetails: '<li>Draped dress</li><li>V neck</li><li>Sleeveless</li><li>P.F.I. Tangail border at the neckline</li>'
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

function createHelenaDressJSON() {
    var sku = "HLNDRS1505PT";
    var basePath = "/products/night/helena/";
    return createProductJSON(sku, basePath, hlnaData, sd_sizing_top, createCWImageFactory);
}

function createJulietDressJSON() {
    var sku = "JLTDRS1505PT";
    var basePath = "/products/night/juliet/";
    return createProductJSON(sku, basePath, jlitData, sd_sizing_top, createCWImageFactory);
}

function createNerissaTopJSON() {
    var sku = "NRSSTP1505PT";
    var basePath = "/products/night/nerissa/";
    return createProductJSON(sku, basePath, nrsaData, sd_sizing_top, createCWImageFactory);
}

function createNerissaPantJSON() {
    var sku = "NRSPNT1505PT";
    var basePath = "/products/night/nerissa/";
    return createProductJSON(sku, basePath, nrsaData, sd_sizing_top, createCWImageFactory);
}

function createOpheliaDressJSON() {
    var sku = "OPHLDR1505PT";
    var basePath = "/products/night/ophelia/";
    return createProductJSON(sku, basePath, ophlData, sd_sizing_top, createCWImageFactory);
}

function createPortiaTopJSON() {
    var sku = "PRTATP1505PT";
    var basePath = "/products/night/portia/";
    return createProductJSON(sku, basePath, prtaData, sd_sizing_top, createCWImageFactory);
}

function createTamoraDressJSON() {
    var sku = "BKLLTS1505Je";
    var basePath = "/products/night/tamora/";
    return createProductJSON(sku, basePath, tmraData, sd_sizing_top, createCWImageFactory);
}

function createTitaniaDressJSON() {
    var sku = "TTNDRS1505Je";
    var basePath = "/products/night/titania/";
    return createProductJSON(sku, basePath, ttnaData, sd_sizing_top, createCWImageFactory);
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

    var entry = createHelenaDressJSON();
    map[entry.skuInfo.SKU] = entry;

    var entry = createJulietDressJSON();
    map[entry.skuInfo.SKU] = entry;

    var entry = createNerissaTopJSON();
    map[entry.skuInfo.SKU] = entry;

    var entry = createNerissaPantJSON();
    map[entry.skuInfo.SKU] = entry;

    var entry = createOpheliaDressJSON();
    map[entry.skuInfo.SKU] = entry;

    var entry = createPortiaTopJSON();
    map[entry.skuInfo.SKU] = entry;

    var entry = createTamoraDressJSON();
    map[entry.skuInfo.SKU] = entry;

    var entry = createTitaniaDressJSON();
    map[entry.skuInfo.SKU] = entry;

    return map;
}

const sd_catalog = {
    skus: ['BNCJKT1505PT','BNCADR1505PT','NKSHMD1501PT','CLPTRT1505PT','CLPTRS1505PT','EMLDRS1505PT','HLNDRS1505PT','JLTDRS1505PT','NRSSTP1505PT','NRSPNT1505PT','OPHLDR1505PT','PRTATP1505PT','BKLLTS1505Je','TTNDRS1505Je'],
    dresses: ['EMLDRS1505PT','HLNDRS1505PT','JLTDRS1505PT','OPHLDR1505PT','BKLLTS1505Je','TTNDRS1505Je'],
    tops: ['CLPTRT1505PT','PRTATP1505PT'],
//    pants: ['NRSPNT1505PT'],
    culottes: ['CLPTRS1505PT'],
    skirts: ['NKSHMD1501PT'],
//    overtops: ['BNCJKT1505PT'],
    getCategory: function (sku) {
        if (this.dresses.includes(sku)) {
            return "dresses";
        }
        if (this.tops.includes(sku)) {
            return "tops";
        }
/*
        if (this.pants.includes(sku)) {
            return "pants";
        }
*/
        if (this.culottes.includes(sku)) {
            return "culottes";
        }
        if (this.skirts.includes(sku)) {
            return "skirts";
        }
/*
        if (this.overtops.includes(sku)) {
            return "overtops";
        }
*/
        return null;
    },
    productDB: createProductDB(),
    getProduct: function (sku) {
        return this.productDB[sku];
    }
};
