const cesoir = {};

cesoir.createComponentFactory = function (prodInfo, dimensioner, sizer, categorizer) {
    var navHelper = createNavHelper(prodInfo, categorizer, cesoir.catalog.title);
    var relatedviewer = createEmptyViewer();
    var modelTxt = "The model is 5 ft 7 in (171 cm.) and wearing size '" + prodInfo.skuInfo.sizes[0] + "'<br>This garment is bespoke-tailored (sur-mesure), so the sizes in the chart are only the starting point for your order<br>";
    return createProductComponentFactory(prodInfo, dimensioner, sizer, relatedviewer, navHelper, modelTxt, "Size", true);
}

const sd_sizing_tops = {
    sizeGeo: ["US", "UK", "EU", "IT", "GR", "JP", "RU"],
    capGeo: ["US", "UK / AU / NZ", "EU / FR", "IT", "DE", "JP", "RU"],
    chart: {
        S: {
            US: [6, 8],
            UK: [10, 12],
            EU: [38, 40],
            IT: [42, 44],
            GR: [36, 38],
            JP: [11, 13],
            RU: [44, 46]
        },
        M: {
            US: [8, 10],
            UK: [12, 14],
            EU: [40, 42],
            IT: [44, 46],
            GR: [38, 40],
            JP: [13, 15],
            RU: [46, 48]
        },
        L: {
            US: [10, 10],
            UK: [14, 14],
            EU: [42, 42],
            IT: [46, 46],
            GR: [40, 40],
            JP: [15, 15],
            RU: [48, 48]
        },
        XL: {
            US: [10, 12],
            UK: [14, 16],
            EU: [42, 44],
            IT: [46, 48],
            GR: [40, 42],
            JP: [15, 17],
            RU: [48, 50]
        }
    }
}

const sd_sizing_bottoms = {
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
            US: [10, 10],
            UK: [14, 14],
            EU: [42, 42],
            IT: [46, 46],
            GR: [40, 40],
            JP: [15, 15],
            RU: [48, 48]
        },
        L: {
            US: [10, 12],
            UK: [14, 16],
            EU: [42, 44],
            IT: [46, 48],
            GR: [40, 42],
            JP: [15, 17],
            RU: [48, 50]
        },
        XL: {
            US: [12, 14],
            UK: [16, 18],
            EU: [44, 46],
            IT: [48, 50],
            GR: [42, 44],
            JP: [17, 18],
            RU: [50, 52]
        },
        Free: {
            US: [6, 14],
            UK: [10, 18],
            EU: [38, 46],
            IT: [42, 50],
            GR: [36, 44],
            JP: [11, 19],
            RU: [44, 52]
        }
    }
}

const sd_sizing_dresses = {
    sizeGeo: ["US", "UK", "EU", "IT", "GR", "JP", "RU"],
    capGeo: ["US", "UK / AU / NZ", "EU / FR", "IT", "DE", "JP", "RU"],
    chart: {
        S: {
            US: [6, 8],
            UK: [10, 12],
            EU: [38, 40],
            IT: [42, 44],
            GR: [36, 38],
            JP: [11, 13],
            RU: [44, 46]
        },
        M: {
            US: [8, 10],
            UK: [12, 14],
            EU: [40, 42],
            IT: [44, 46],
            GR: [38, 40],
            JP: [13, 15],
            RU: [46, 48]
        },
        L: {
            US: [10, 10],
            UK: [14, 14],
            EU: [42, 42],
            IT: [46, 46],
            GR: [40, 40],
            JP: [15, 15],
            RU: [48, 48]
        },
        XL: {
            US: [10, 12],
            UK: [14, 16],
            EU: [42, 44],
            IT: [46, 48],
            GR: [40, 42],
            JP: [15, 17],
            RU: [48, 50]
        }
    }
}

const sd_sizing_jersey_dresses = {
    sizeGeo: ["US", "UK", "EU", "IT", "GR", "JP", "RU"],
    capGeo: ["US", "UK / AU / NZ", "EU / FR", "IT", "DE", "JP", "RU"],
    chart: {
        S: {
            US: [4, 4],
            UK: [8, 8],
            EU: [36, 36],
            IT: [40, 40],
            GR: [34, 34],
            JP: [9, 9],
            RU: [42, 42]
        },
        M: {
            US: [4, 6],
            UK: [8, 10],
            EU: [36, 38],
            IT: [40, 42],
            GR: [34, 36],
            JP: [9, 11],
            RU: [42, 44]
        },
        L: {
            US: [6, 8],
            UK: [10, 12],
            EU: [38, 40],
            IT: [42, 44],
            GR: [36, 38],
            JP: [11, 13],
            RU: [44, 46]
        },
        XL: {
            US: [8, 10],
            UK: [12, 14],
            EU: [40, 42],
            IT: [44, 46],
            GR: [38, 40],
            JP: [13, 15],
            RU: [46, 48]
        },
        Free: {
            US: [4, 8],
            UK: [8, 12],
            EU: [40, 44],
            IT: [44, 48],
            GR: [38, 42],
            JP: [13, 17],
            RU: [46, 50]
        },
    }
}

cesoir.bianca = {
    SKU: "BNCADR1505PT",
    imgDir: 'bianca',
    sizing: null,
    imageFile: "sizing1.jpg",
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
        return "P.F.I. Tangail";
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

cesoir.celia = {
    SKU: "NKSHMI1501PT",
    imgDir: 'celia',
    sizing: sd_sizing_bottoms,
    imageFile: "sizing1.jpg",
    dimensionNames: ["A. Length", "B. Outer Layer Length", "C. Hem", "D. Waist - Relaxed", "D. Waist - Stretched"],
    dimensionsCm: {
        Free: [62, 53, 336, 72, 130]
    },
    getFabric: function (varidx) {
        return "P.F.I. Tangail";
    },
    data: [
        {
            colourName: "Black &amp; Silver",
            vid: "CW1",
            colourPfx: "b",
            colourSfxs: ["1", "2", "3"]
        }
    ],
    sizes: ['Free'],
    description: 'Celia Skirt is one of our favourite silhouettes. It\'s cut in the finest cotton P.F.I. Tangail. This exquisite cotton is often mistaken as silk by my clients. It has an incredible volume to play around in and is freesize! The waist band is made up of 9 rows of elastic. Because of the need for care while working with the delicate Tangail fabric, it can take a skilled tailor almost a full day of work to create this waistband. The result is a freesize waist with a snug, comfortable fit. It can work from day to night and it\'s groovy flare will have you swirling all day. Pair it with our Portia Top to take it up a notch or wear a basic t-shirt to keep it subtle.',
    garmentDetails: '<li>Freesize - Broad elastic at the waist</li><li>P.F.I. Tangail</li><li>Midi length</li><li>A line with voluminous flare</li>'
};

cesoir.cleopatratop = {
    SKU: "CLPTRT1505PT",
    imgDir: 'cleoT',
    sizing: sd_sizing_tops,
    imageFile: "sizing1.jpg",
    dimensionNames: ['A. Length', 'B. Shoulders', 'C. Bust', 'D. Armhole'],
    dimensionsCm: {
        S: [46, 30, 90, 43],
        M: [48, 32, 94, 45],
        L: [50, 34, 98, 47],
        XL: [52, 36, 102, 50]
    },
    getFabric: function (varidx) {
        return "P.F.I. Tangail";
    },
    data: [
        {
            colourName: "Black &amp; Silver",
            vid: "CW1",
            colourPfx: "b",
            colourSfxs: ["1", "2", "3"]
        }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'The Cleopatra Top is cut in ivory ahimsa silk and lined with cotton voile. The round neck is highlighted with black and silver silk P.F.I. Tangail border. It is sleeveless and adds a comfortable chic element to your outfit. Pair it with our Cleopatra Shorts or skirts to keep it easy.',
    garmentDetails: '<li>Round neck</li><li>Sleeveless</li><li>Short length</li><li>P.F.I. Tangail border at the neckline</li><li>Slips on</li><li>Cotton lining</li>'

};

cesoir.cleopatrashorts = {
    SKU: "CLPTRS1505PT",
    imgDir: 'cleoS',
    sizing: sd_sizing_bottoms,
    imageFile: "sizing1.jpg",
    dimensionNames: ['A. Length', 'B. Waist', 'C. Hips', 'D. Crotch', 'E. Hem'],
    dimensionsCm: {
        S: [35, 76, 106, 58, 59],
        M: [37, 80, 108, 61, 63],
        L: [39, 84, 110, 64, 67],
        XL: [41, 88, 112, 68, 71]
    },
    getFabric: function (varidx) {
        return "P.F.I. Tangail";
    },
    data: [
        {
            colourName: "Black &amp; Silver",
            vid: "CW1",
            colourPfx: "b",
            colourSfxs: ["1", "2", "3"]
        }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Cleopatra Shorts are cut in ivory ahimsa silk and is enhanced by black and silver silk P.F.I. Tangail borders at the pocket and hems. It sits on your waist and has a comfortable wide hem for you to move around in. Pair it with our Cleopatra Top, it\'s a fun and elegant ensemble to have in your wardrobe.',
    garmentDetails: '<li>Shorts</li><li>Wide-legged hem</li><li>P.F.I. Tangail borders at the pockets and hemline</li><li>Fly zip and button fastening at the front</li>'
};

cesoir.emilia = {
    SKU: "EMLDRS1505PT",
    imgDir: 'emilia',
    sizing: sd_sizing_bottoms,
    imageFile: "sizing1.jpg",
    dimensionNames: ['A. Length', 'B. Bust', 'C. Armhole', 'D. Sleeve Width', 'E. Sleeve Hem', 'F. Sleeve Length'],
    dimensionsCm: {
        S: [105, 94, 43, 34, 26, 33],
        M: [107, 98, 45, 36, 28, 34],
        L: [109, 102, 47, 38, 30, 35],
        XL: [111, 106, 49, 40, 32, 36]
    },
    getFabric: function (varidx) {
        return "P.F.I. Tangail";
    },
    data: [
        {
            colourName: "Black &amp; Silver",
            vid: "CW1",
            colourPfx: "b",
            colourSfxs: ["1", "2", "3", "4", "5"]
        }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Emilia Dress combines traditional handwoven P.F.I. Tangail cotton of Bengal with a western off-shoulder detail. The bias cut of the fabric goes around to overlap in uneven hemline. This gives the dress a voluminous flare which mimics your movements cheerfully. This dress stays true to a neutral palette of black with a metallic touch of tiny silver motifs.',
    garmentDetails: '<li>Off-shoulder</li><li>Half sleeves</li><li>Zip at the back</li><li>A line with voluminous flare</li>'

};

cesoir.helena = {
    SKU: "HLNDRS1505PT",
    imgDir: 'helena',
    sizing: sd_sizing_tops,
    imageFile: "sizing1.jpg",
    dimensionNames: ['A. Back Length', 'B. Front Length', 'C. Shoulders', 'D. Bust', 'E. Armhole', 'F. Hem'],
    dimensionsCm: {
        S: [131, 76, 28, 88, 40, 360],
        M: [133, 78, 30, 92, 42, 364],
        L: [135, 80, 32, 96, 44, 368],
        XL: [137, 82, 34, 100, 46, 372]
    },
    getFabric: function (varidx) {
        return "P.F.I. Tangail";
    },
    data: [
        {
            colourName: "Grey &amp; Gold",
            vid: "CW1",
            colourPfx: "g",
            colourSfxs: ["1", "2", "3", "4", "5"]
        }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'The high-low hemline and voluminous flare give the Helena Dress a flatteringly flamboyant flow. It is cut in my custom hand woven grey-striped P.F.I. Tangail. Featuring an origami pleated panel in front and in the inner layer constructed from my gold P.F.I. silk Tangail border. The contrasting red inner layer flashes in and out of view as the garment moves and flows, lifting up the muted colour palette. The hem is finished with playful cascading ruffles.',
    garmentDetails: '<li>Round neck</li><li>Sleeveless</li><li>High-low hemline</li><li>P.F.I Tangail border in the front</li><li>Contrasting lining in voile</li><li>Zip at the back</li><li>A line with voluminous flare</li>'
};

cesoir.juliet = {
    SKU: "JLTDRS1505PT",
    imgDir: 'juliet',
    sizing: sd_sizing_tops,
    imageFile: "sizing1.jpg",
    dimensionNames: ['A. Length', 'B. Shoulders', 'C. Bust', 'D. Armhole', 'E. Sleeve Hem', 'F. Sleeve Length'],
    dimensionsCm: {
        S: [110, 35, 90, 42, 30, 10],
        M: [112, 37, 94, 44, 32, 11],
        L: [114, 39, 98, 46, 34, 12],
        XL: [116, 41, 102, 48, 36, 13]
    },
    getFabric: function (varidx) {
        return "P.F.I. Tangail";
    },
    data: [
        {
            colourName: "Black &amp; Silver",
            vid: "CW1",
            colourPfx: "b",
            colourSfxs: ["1", "2", "3", "4"]
        }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'The asymmetrical panels of the Juliet Dress are composed from a collage of ivory ahimsa silk, silver P.F.I. Tangail borders and black P.F.I. Tangail fabric with tiny silver Jamdani motifs. The buttons in the front make it easy to slip into this elegant cap-sleeved, round neck dress. Pair it with black or silver high heels for special dates!',
    garmentDetails: '<li>Round neck</li><li>Cap lseeves</li><li>Asymmetrical</li><li>A line with flare</li><li>Buttons in the front</li>'
};

cesoir.nerissatop = {
    SKU: "NRSSTP1505PT",
    imgDir: 'nerissaT',
    sizing: sd_sizing_tops,
    imageFile: "sizing1.jpg",
    dimensionNames: ['A. Length', 'B. Shoulders', 'C. Bust', 'D. Armhole', 'E. Hem'],
    dimensionsCm: {
        S: [37, 31, 45, 43, 90],
        M: [39, 33, 47, 45, 94],
        L: [41, 35, 49, 47, 98],
        XL: [43, 37, 51, 49, 103]
    },
    getFabric: function (varidx) {
        return "P.F.I. Tangail";
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
    description: 'The Nerissa Top has a high-low curved hem that exposes your mid-riff just right. It\'s cut in ivory ahimsa silk and the neck is highlighted in P.F.I. Tangail striped cotton. The boxy fit adds an edgy element to this sleeveless top. It\'s versatile and can be paired with high-waisted trousers or our Nerissa Pants. ',
    garmentDetails: '<li>Round neck</li><li>Sleeveless</li><li>Cropped length</li><li>Curved hemline</li><li>Khadi striped panel at the neckline</li><li>Slips on</li>'
};

cesoir.nerissapant = {
    SKU: "NRSPNT1505PT",
    imgDir: 'nerissaP',
    sizing: sd_sizing_bottoms,
    imageFile: "sizing1.jpg",
    dimensionNames: ['A. Length', 'B. Waist', 'C. Hips', 'D. Crotch', 'E. Hem'],
    dimensionsCm: {
        S: [102, 76, 98, 61, 40],
        M: [104, 80, 104, 65, 42],
        L: [106, 84, 108, 69, 44],
        XL: [108, 90, 112, 75, 46]
    },
    getFabric: function (varidx) {
        return "P.F.I. Tangail";
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
    description: 'Nerissa Pants are tailored to make formal wear chic. It\'s cut in P.F.I. Tangail striped cotton and is enhanced with silk silver P.F.I. Tangail borders on the pocket. It sits on your waist and tapers towards the hem. Pair it with our Nerissa Top or a crisp black shirt to ace that presentation.',
    garmentDetails: '<li>Ankle length trousers</li><li>Tapers at the hem</li><li>P.F.I. Tangail borders at the pockets</li><li>Fly zip and button fastening at the front</li>'
};

cesoir.ophelia = {
    SKU: "OPHLDR1505PT",
    imgDir: 'ophelia',
    sizing: sd_sizing_dresses,
    imageFile: "sizing1.jpg",
    dimensionNames: ['A. Length', 'B. Shoulders', 'C. Bust', 'D. Armhole'],
    dimensionsCm: {
        S: [96, 20, 90, 60],
        M: [98, 22, 94, 62],
        L: [100, 24, 98, 64],
        XL: [102, 26, 102, 66]
    },
    getFabric: function (varidx) {
        return "P.F.I. Tangail";
    },
    data: [
        {
            colourName: "Black &amp; Silver",
            vid: "CW1",
            colourPfx: "b",
            colourSfxs: ["1", "2", "3", "4"]
        }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Ophelia Dress is cut in black P.F.I. Tangail cotton with a silver silk panel that highlights the neckline. Its lining extends the hemline to add more flounce to  this jovial dress. The square armhole adds a twist to the modest round neck and the zip in the back makes it easy to slip into.',
    garmentDetails: '<li>Round neck</li><li>Sleeveless</li><li>A line with voluminous flare</li><li>Zip at the back</li><li>Lining in voile</li>'
};

cesoir.portia = {
    SKU: "PRTATP1505PT",
    imgDir: 'portia',
    sizing: sd_sizing_tops,
    imageFile: "sizing1.jpg",
    dimensionNames: ['A. Length', 'B. Shoulders', 'C. Bust', 'D. Armhole', 'E. Hem'],
    dimensionsCm: {
        S: ['51', '21', '90', '43', '94'],
        M: ['53', '23', '94', '45', '98'],
        L: ['55', '25', '98', '47', '104'],
        XL: ['57', '27', '102', '49', '110']
    },
    getFabric: function (varidx) {
        return "P.F.I. Tangail";
    },
    data: [
        {
            colourName: "Black &amp; Silver",
            vid: "CW1",
            colourPfx: "b",
            colourSfxs: ["2", "1", "3"]
        }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'The black and silver silk P.F.I. Tangail panel gives the Portia Top a festive touch. It\'s cut in breathable P.F.I. Tangail cotton which is often mistaken as silk by my clients. It is sleeveless with a modest round neck and has a zip in the back to slip on easily. Pair it with our Celia Skirt for your formal dinners or basic trousers, its versatality will make you wear it more often.',
    garmentDetails: '<li>Round neck</li><li>Sleeveless</li><li>Zip at the back</li><li>P.F.I. Tangail panel in the front</li>'

};

cesoir.tamora = {
    SKU: "BKLLTS1505Je",
    imgDir: 'tamora',
    sizing: sd_sizing_jersey_dresses,
    imageFile: "sizing1.jpg",
    dimensionNames: ['A. Length', 'B. Shoulders', 'C. Bust', 'D. Armhole', 'E. Hem'],
    dimensionsCm: {
        S: [130, 32, 82, 45, 196],
        M: [132, 34, 86, 47, 200],
        L: [134, 36, 90, 49, 204],
        XL: [136, 38, 94, 51, 208],
    },
    getFabric: function (varidx) {
        return "Modal Jersey with P.F.I. Tangail Trims";
    },
    data: [
        {
            colourName: "Black &amp; Silver",
            vid: "CW1",
            colourPfx: "b",
            colourSfxs: ["2", "1", "3", "4"]
        }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'The Tamora Dress is cut in a superior modal jersey to give a flattering shape. The fabric is draped and twisted to support your bust (go bra-free!). The deep V-neck gives an illusion of a slender frame. The neck and hemline are accentuated with black and silver silk P.F.I. Tangail borders that add a subtle charm to the black dress.</p><p>The dress has been worn to weddings (both by the bride and by guests), celebrity events and other festive celebrations.',
    garmentDetails: '<li>Floor length</li><li>V neck</li><li>Deep V neckline at the back</li><li>Sleeveless</li><li>Gathers in the front</li><li>A line</li><li>P.F.I Tangail border at the neckline and hem</li>'
};

cesoir.titania = {
    SKU: "TTNDRS1505Je",
    imgDir: 'titania',
    sizing: sd_sizing_jersey_dresses,
    imageFile: "sizing1.jpg",
    dimensionNames: ['A. Length', 'B. Bust', 'C. Armhole', 'D. Hem'],
    dimensionsCm: {
        S: [92, 92, 42, 104],
        Free: [96, 100, 44, 112]
    },
    getFabric: function (varidx) {
        return "Modal Jersey with P.F.I. Tangail Trims";
    },
    data: [
        {
            colourName: "Black &amp; Silver",
            vid: "CW1",
            colourPfx: "b",
            colourSfxs: ["1", "2", "3", "4"]
        }
    ],
    sizes: ['S', 'Free'],
    description: 'A superior quality jersey is used to drape this little black dress that will hug and flatter every shape. The jersey is gathered in the centre front and back and descends at the sideseam. The shoulder straps in black and silver silk P.F.I. Tangail can be worn on either sides or on the same side to make it an off-shoulder dress. ',
    garmentDetails: '<li>Draped dress</li><li>V neck</li><li>Sleeveless</li><li>P.F.I. Tangail border at the neckline</li>'
};

cesoir.viola = {
    SKU: "VLADRS1505PT",
    imgDir: 'viola',
    sizing: sd_sizing_dresses,
    imageFile: "sizing.jpg",
    dimensionNames: ['A. Length', 'B. Shoulders', 'C. Bust', 'D. Armhole'],
    dimensionsCm: {
        S: [98, 29, 90, 44],
        M: [100, 31, 94, 46],
        L: [102, 33, 98, 48],
        XL: [104, 35, 102, 50]
    },
    getFabric: function (varidx) {
        return "P.F.I. Tangail";
    },
    data: [
        {
            colourName: "Grey &amp; Gold",
            vid: "CW1",
            colourPfx: "b",
            colourSfxs: ["1", "2", "3", "4"]
        }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'The round neck, sleeveless Viola Dress is cut in striped P.F.I. Tangail and blocked with black and silver silk P.F.I. Tangail borders. The fineness of the cotton P.F.I. Tangail is often mistaken as silk by my clients. The flirtatious volume of the dress is thoughtfully cut in bias to mimic your movements and play with you. The dress is easy to slip into and it stays true to the neutral palette of black and grey with metallic silver.',
    garmentDetails: '<li>Round neck</li><li>Sleeveless</li><li>Asymmetrical</li><li>A line with voluminous flare</li><li>Slips on</li>'
};

cesoir.createJSON = function (style) {
    var basePath = "/products/night/" + style.imgDir + "/";
    return createProductJSON(style.SKU, basePath, style, style.sizing, createCWImageFactory);
}

cesoir.catalog = {
    title: "Ce Soir",
    shopURL: "/products/night/shop.html",
    skus: null,
    styles: [cesoir.bianca, cesoir.celia, cesoir.cleopatrashorts, cesoir.cleopatratop, cesoir.emilia, cesoir.helena, cesoir.juliet, cesoir.nerissapant, cesoir.nerissatop, cesoir.ophelia, cesoir.portia, cesoir.tamora, cesoir.titania, cesoir.viola],
    dresses: [cesoir.emilia.SKU, cesoir.helena.SKU, cesoir.juliet.SKU, cesoir.ophelia.SKU, cesoir.tamora.SKU, cesoir.titania.SKU, cesoir.viola.SKU],
    nondresses: [cesoir.cleopatrashorts.SKU, cesoir.cleopatratop.SKU, cesoir.celia.SKU, cesoir.portia.SKU],
    productDB: null,
    getProduct: function (sku) {
        return this.productDB[sku];
    }
};

pfiavG.getLineInitializer(cesoir).initialize();

cesoir.categorizer = createFieldCategorizer(
    cesoir.catalog,
    ["Dresses", "Separates"],
    ["dresses", "nondresses"],
    ["d", "n"],
    "t",
    "d");
