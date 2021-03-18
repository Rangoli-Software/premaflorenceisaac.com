const happyED = {};

happyED.createRelatedViewer = function (skuInfo, looks, catalog) {
    var related = looks.getRelatedStyles(skuInfo.SKU);
    if (related === null) {
        return creatEmptyViewer();
    }
    var caption = 'Pair with';
    var res = [];
    for (var i = 0; i < related.length; i++) {
        var lk = related[i].look;
        var st = (related[i].styles === undefined) ?
            looks.getLookFromTitle(lk).styles :
            related[i].styles;
        var lkImg = looks.getImagePath(lk);
        res.push(createRelatedLookCard(skuInfo.SKU, lkImg, lk, st, catalog));
    }
    return createRelatedViewer(caption, res, 2);
}

happyED.createComponentFactory = function (prodInfo, dimensioner, sizer, looks, categorizer, catalog) {
    var navHelper = createNavHelper(prodInfo, categorizer, happyED.catalog.title);
    var relatedviewer = happyED.createRelatedViewer(prodInfo.skuInfo, looks, catalog);
    var modelTxt = "The model is 5 ft 7.5 in (171.5 cm.) and wearing size '" + prodInfo.skuInfo.sizes[0] + "'";
    return createProductComponentFactory(prodInfo, dimensioner, sizer, relatedviewer, navHelper, modelTxt, "Size", true);
}
const hed_sizing_top = {
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

const hed_sizing_pant = {
    sizeGeo: ["US", "UK", "EU", "IT", "GR", "JP", "RU"],
    capGeo: ["US", "UK / AU / NZ", "EU / FR", "IT", "DE", "JP", "RU"],
    chart: {
        S: {
            US: [2, 10],
            UK: [4, 12],
            EU: [34, 42],
            IT: [38, 46],
            GR: [32, 40],
            JP: [7, 15],
            RU: [40, 48]
        },
        M: {
            US: [4, 12],
            UK: [6, 14],
            EU: [36, 44],
            IT: [40, 48],
            GR: [34, 42],
            JP: [9, 17],
            RU: [42, 50]
        },
        L: {
            US: [6, 14],
            UK: [8, 16],
            EU: [38, 46],
            IT: [42, 50],
            GR: [36, 44],
            JP: [11, 19],
            RU: [44, 52]
        },
        XL: {
            US: [8, 16],
            UK: [10, 18],
            EU: [40, 48],
            IT: [44, 52],
            GR: [38, 46],
            JP: [13, 21],
            RU: [48, 54]
        },
        Free: {
            US: [4, 16],
            UK: [8, 18],
            EU: [36, 48],
            IT: [40, 52],
            GR: [34, 46],
            JP: [7, 21],
            RU: [40, 54]
        }
    }
}

happyED.harem = {
    SKU: "BALLPA1501Vo",
    imgDir: 'blln',
    sizing: hed_sizing_pant,
    imageFile: "sizing1.jpg",
    dimensionNames: ['A. Length', 'B. Waist Elastic', 'C. Hips', 'D. Crotch', 'E. Hem'],
    dimensionsCm: {
        Free: [90, 30, 152, 68, 10]
    },
    getFabric: function (varidx) {
        return "Voile";
    },
    data: [
        {
            colourName: "Magenta",
            vid: "CW1",
            colourPfx: "magenta",
            colourSfxs: ["f", "b", "r", "d1", "d2"]
        },
        {
            colourName: "Electric Blue",
            vid: "CW2",
            colourPfx: "blue",
            colourSfxs: ["f", "b", "r", "d1", "d2"]
        },
        {
            colourName: "Candy Red",
            vid: "CW3",
            colourPfx: "red",
            colourSfxs: ["f", "b", "r", "d1", "d2"]
        },
        {
            colourName: "Calm Tan",
            vid: "CW4",
            colourPfx: "tan",
            colourSfxs: ["f", "b", "r", "d1", "d2"]
        }
    ],
    sizes: ['Free'],
    description: '"Happy Everyday" includes more fun silhouettes for your daily routine. This carefree pant features a stretch waistband to fit a variety of sizes. It is cut in a breathable 100% cotton voile and is gathered at the waist and hem. As a "crushed" garment, it needs no ironing, only needing to be twisted and tied after wash. The colour options vary from vibrant to neutral and cater to every taste. The candy red, magenta and electric blue exaggerate this voluminous silhouette while the calm tan brings it down a notch. Whether you pair it with a crop top or a tunic, this pants works with different lengths and styles.',
    garmentDetails: '<li>Elastic waist with drawstring</li><li>Calf-length</li><li>Two side pockets</li>'
};

happyED.bermuda = {
    SKU: "BERMPA1609Kh",
    imgDir: 'brmda',
    sizing: hed_sizing_pant,
    imageFile: "sizing1.jpg",
    dimensionNames: ['A. Length', 'B. Waist', 'C. Hips', 'D. Crotch', 'E. Hem'],
    dimensionsCm: {
        S: [75, 70, 107, 60, 50],
        M: [77, 74, 110, 62, 52],
        L: [79, 78, 112, 63, 54],
        XL: [81, 82, 115, 65, 56]
    },
    getFabric: function (varidx) {
        return "Cotton";
    },
    data: [
        {
            colourName: "Magenta",
            vid: "CW1",
            colourPfx: "magenta",
            colourSfxs: ["f", "b", "r"]
        },
        {
            colourName: "Calm Tan",
            vid: "CW2",
            colourPfx: "tan",
            colourSfxs: ["f", "b", "r"]
        }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'This calf-length pant from our Happy Everyday collection is one of my favourite basics. The elastic in the waistband and hems makes it easy to slip into and move around in. The side pockets give this 100% cotton pant more utility.  Pair it with our flared Lotus Wings Top, a shirt, crop top or a tank top - it will work from dawn to dusk, from morning meetings to evening strolls. This pant is available in a vibrant solid magenta and a neutral calm tan, suitable to a wide range of personalities and moods.',
    garmentDetails: '<li>Elastic waist with drawstring</li><li>Calf-length</li><li>Two side pockets</li>'
};

happyED.crop = {
    SKU: "CRPTOP1805Kh",
    imgDir: 'crptp',
    sizing: hed_sizing_top,
    imageFile: "sizing1.jpg",
    dimensionNames: ['A. Length', 'B. Shoulders', 'C. Bust', 'D. Armhole', 'E. Hem'],
    dimensionsCm: {
        S: [39, 26, 92, 48, 90],
        M: [41, 28, 96, 50, 94],
        L: [43, 30, 100, 52, 98],
        XL: [45, 32, 104, 54, 100]
    },
    getFabric: function (varidx) {
        if (varidx == 3) {
			return "Cotton";
		}
        return "Voile";
    },
    data: [
        {
            colourName: "Magenta",
            vid: "CW1",
            colourPfx: "magenta",
            colourSfxs: ["f", "b", "r"]
        },
        {
            colourName: "Electric Blue",
            vid: "CW2",
            colourPfx: "blue",
            colourSfxs: ["f", "b", "r"]
        },
        {
            colourName: "Candy Red",
            vid: "CW3",
            colourPfx: "red",
            colourSfxs: ["f", "b", "r"]
        },
        {
            colourName: "Calm Tan",
            vid: "CW4",
            colourPfx: "tan",
            colourSfxs: ["f", "b", "r"]
        }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Our Happy Everyday collection is all about bold colour blocking of modern silhouettes. This boxy crop top is fun to pair with different bottoms. It\'s a round neck and sleeveless. The elastic in the back makes the top flattering to wear. The magenta lifts up the minimal cut and 100% cotton voile keeps it breezy in summers. Pair it with our Balloon Pants, your own culottes, trousers, skirts or basically anything - it\'s versatility ensures that you will wear it often.',
    garmentDetails: '<li>Round neck</li><li>Sleeveless</li><li>Boxy cut</li><li>Elastic in the back</li><li>Slips on</li>'
};

happyED.drawstring = {
    SKU: "DRAWPA1609Kh",
    imgDir: 'drwstrg',
    sizing: hed_sizing_pant,
    imageFile: "sizing1.jpg",
    dimensionNames: ['A. Length', 'B. Waist', 'C. Hips', 'D. Crotch', 'E. Hem'],
    dimensionsCm: {
        S: [99, 100, 100, 60, 54],
        M: [100, 104, 104, 62, 56],
        L: [101, 108, 108, 64, 58],
        XL: [102, 112, 112, 67, 60]
    },
    getFabric: function (varidx) {
        return "Cotton";
    },
    data: [
        {
            colourName: "Magenta",
            vid: "CW1",
            colourPfx: "magenta",
            colourSfxs: ["f", "b", "r"]
        },
        {
            colourName: "Calm Tan",
            vid: "CW2",
            colourPfx: "tan",
            colourSfxs: ["f", "b", "r"]
        }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Another lounge pant from our Happy Everyday collection. The adjustable drawstring on the waist makes it easier to slip into and move around in. This wide-legged pant is cut in 100% cotton. Pair it with our flared Lotus Wings Top, a shirt, crop top or a tank top - it will work from dawn to dusk, from morning meetings to evening strolls. This pant is available in a vibrant solid magenta and a neutral calm tan, suitable to a wide range of personalities and moods.',
    garmentDetails: '<li>Drawstring waist</li><li>Full length</li><li>Wide hem</li>'
};

happyED.jodhpur = {
    SKU: "JODHPA1708Kh",
    imgDir: 'jdhpr',
    sizing: hed_sizing_pant,
    imageFile: "sizing1.jpg",
    dimensionNames: ["A. Length", "B. Waist", "C. Hip", "D. Crotch", "E. Hem"],
    dimensionsCm: {
        S: [
            75,
            70,
            104,
            60,
            50
        ],
        M: [
            77,
            74,
            110,
            62,
            52
        ],
        L: [
            79,
            78,
            116,
            63,
            54
        ],
        XL: [
            81,
            82,
            122,
            65,
            56
        ]
    },
    getFabric: function (varidx) {
        return "Cotton";
    },

    data: [
        {
            colourName: "Magenta",
            vid: "CW1",
            colourPfx: "magenta",
            colourSfxs: ["f", "b", "r"]
        },
        {
            colourName: "Calm Tan",
            vid: "CW2",
            colourPfx: "tan",
            colourSfxs: ["f", "b", "r"]
        }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'This lounge pant from our Happy Everyday collection is one of my favourite basics. The elastic on the waist and tapered fit gives it a flattering shape. The side pockets give this 100% cotton pants more utility. Pair it with our flared Lotus Wings Top, a shirt, crop top or a tank top - it will work from day to night, from morning meetings to an evening stroll. These pants are available in a vibrant solid magenta and a neutral calm tan, which fits every personality and makes it even more wearable.',
    garmentDetails: '<li>Elastic waist with drawstring</li><li>Full length</li><li>Two side pockets</li>'
};

happyED.layer = {
    SKU: "LITLAY1708Vo",
    imgDir: 'lyr',
    sizing: hed_sizing_top,
    imageFile: "sizing1.jpg",
    dimensionNames: ['A. Length', 'B. Shoulders', 'C. Bust', 'D. Armhole', 'E. Slit'],
    dimensionsCm: {
        S: [129, 26, 94, 53, 57],
        M: [130, 28, 98, 55, 58],
        L: [131, 30, 102, 57, 59],
        XL: [132, 32, 106, 59, 60]
    },
    getFabric: function (varidx) {
        return "Voile";
    },
    data: [
        {
            colourName: "Magenta",
            vid: "CW1",
            colourPfx: "magenta",
            colourSfxs: ["f", "b", "r", "d1", "d2"]
        },
        {
            colourName: "Electric Blue",
            vid: "CW2",
            colourPfx: "blue",
            colourSfxs: ["f", "b", "r", "d1", "d2"]
        },
        {
            colourName: "Candy Red",
            vid: "CW3",
            colourPfx: "red",
            colourSfxs: ["f", "b", "r", "d1", "d2"]
        }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Happy Everyday" - as the name of the line suggests, this vibrant dress is made for your daily routine. The 100% cotton voile feels light on the skin, especially in summers. The A-line silhouette with side slits makes it easy to move around in. The lively candy red or magenta lifts up this simple round neck, sleeveless dress. The dress can also be worn with a pair of trousers, denim or palazzos underneath.',
    garmentDetails: '<li>Round neck</li><li>Sleeveless</li><li>A-line with side slits</li><li>Slips on</li>'
};

happyED.lily = {
    SKU: "WNDRPA1709Kh",
    imgDir: 'lly',
    sizing: hed_sizing_pant,
    imageFile: "sizing1.jpg",
    dimensionNames: ['A. Length', 'B. Waist Elastic', 'C. Hips', 'D. Crotch', 'E. Hem'],
    dimensionsCm: {
        Free: [84, 64, 140, 92, 85]
    },
    getFabric: function (varidx) {
        return "Cotton";
    },
    data: [
        {
            colourName: "Magenta",
            vid: "CW1",
            colourPfx: "magenta",
            colourSfxs: ["f", "b", "r"]
        },
        {
            colourName: "Calm Tan",
            vid: "CW2",
            colourPfx: "tan",
            colourSfxs: ["f", "b", "r"]
        }
    ],
    sizes: ['Free'],
    description: '"Happy Everyday" includes more fun silhouettes to wear in your daily routine. This is a carefree pant, with a wide stretchable waistband to fit a wide range of sizes. The material is a breathable 100% cotton. The colour options vary from vibrant to neutral to cater to every taste. The magenta exaggerates this relaxed silhouette while the calm tan brings it down a notch. Pair it with a crop top or a shirt as you please - these pants will work with every length and style.',
    garmentDetails: '<li>Elastic waist</li><li>Wide hem</li><li>Adjustable hem with string</li><li>Slips on</li>'
};

happyED.longovertop = {
    SKU: "OVTPLO1501Vo",
    imgDir: 'lovrtp',
    sizing: hed_sizing_top,
    imageFile: "sizing1.jpg",
    dimensionNames: ['A. Length', 'B. Shoulders', 'C. Bust', 'D. Armhole', 'E. Bicep', 'F. Sleeve Length', 'G. Sleeve Hem'],
    dimensionsCm: {
        S: [103, 39, 92, 47, 37, 46, 31],
        M: [104, 41, 96, 49, 38.5, 47, 32],
        L: [105, 43, 100, 52, 40, 48, 34],
        XL: [106, 45, 104, 55, 43, 49, 36]
    },
    getFabric: function (varidx) {
        if (varidx == 3) {
			return "Cotton";
        }
        return "Voile";
    },
    data: [
        {
            colourName: "Magenta",
            vid: "CW1",
            colourPfx: "magenta",
            colourSfxs: ["f", "b", "r"]
        },
        {
            colourName: "Electric Blue",
            vid: "CW2",
            colourPfx: "blue",
            colourSfxs: ["f", "b", "r"]
        },
        {
            colourName: "Candy Red",
            vid: "CW3",
            colourPfx: "red",
            colourSfxs: ["f", "b", "r"]
        },
        {
            colourName: "Calm Tan",
            vid: "CW4",
            colourPfx: "tan",
            colourSfxs: ["f", "b", "r"]
        }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Blocking of bold hues in tropical fabrics to infuse simplicity and design in everyday life is the core of "Happy Everyday". This overtop is particularly inspired by the warm climate of the coastal town that is Auroville. The light 100% cotton voile protects from the extreme heat, but also acts as a coverup in the chilly evenings. Tie-up the front flaps over a maxi dress or a top and bottoms to add a tonal layer, its magenta will add life to the lazy summers.',
    garmentDetails: '<li>3/4 Sleeves</li><li>front tie-up</li><li>Slips on</li>'

};

happyED.shoulderstring = {
    SKU: "LTSDSL1501Kh",
    imgDir: 'shdrstrg',
    sizing: hed_sizing_top,
    imageFile: "sizing1.jpg",
    dimensionNames: ['A. Length', 'B. Bust', 'C. Armhole'],
    dimensionsCm: {
        S: [117, 94, 51],
        M: [119, 98, 54],
        L: [121, 104, 57],
        XL: [123, 110, 60]
    },
    getFabric: function (varidx) {
        return "Voile";
    },
    data: [
        {
            colourName: "Magenta",
            vid: "CW1",
            colourPfx: "magenta",
            colourSfxs: ["f", "b", "r"]
        },
        {
            colourName: "Electric Blue",
            vid: "CW2",
            colourPfx: "blue",
            colourSfxs: ["f", "b", "r"]
        },
        {
            colourName: "Candy Red",
            vid: "CW3",
            colourPfx: "red",
            colourSfxs: ["f", "b", "r"]
        }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'A tunic or summer dress from our \'Happy Everyday\' collection featuring an A-line cut, V neck with delicate shoulder straps and side pockets. Elastic in the back and drawstring in the front allows the dress flatter a variety of sizes and shapes. The dress is cut in 100% cotton voile to keep it light and breezy in summers. The electric blue will make you stand out in the daytime and evening mood. The dress can also be worn as a long tunic, with trousers or straight fit pants underneath.',
    garmentDetails: '<li>V neck</li><li>Shoulder straps</li><li>A-line with a straight hem</li><li>Drawstring fastening in the front</li><li>Elastic in the back</li><li>Slips on</li>'
};

happyED.shortovertop = {
    SKU: "OVTPSH1501Vo",
    imgDir: 'shvrtp',
    sizing: hed_sizing_top,
    imageFile: "sizing1.jpg",
    dimensionNames: ['A. Length', 'B. Shoulders', 'C. Back Bust', 'D. Armhole', 'E. Bicep', 'F. Sleeve Length', 'G. Sleeve Hem'],
    dimensionsCm: {
        S: [64, 41, 51, 48, 37, 49, 28],
        M: [65, 43, 53, 50, 38.5, 51, 30],
        L: [66, 45, 55, 53, 40, 53, 32],
        XL: [67, 47, 57, 55, 43, 55, 34]
    },
    getFabric: function (varidx) {
        if (varidx == 3) {
			return "Cotton";
        }
        return "Voile";
    },
    data: [
        {
            colourName: "Magenta",
            vid: "CW1",
            colourPfx: "magenta",
            colourSfxs: ["f", "b", "r"]
        },
        {
            colourName: "Electric Blue",
            vid: "CW2",
            colourPfx: "blue",
            colourSfxs: ["f", "b", "r"]
        },
        {
            colourName: "Candy Red",
            vid: "CW3",
            colourPfx: "red",
            colourSfxs: ["f", "b", "r"]
        },
        {
            colourName: "Calm Tan",
            vid: "CW4",
            colourPfx: "tan",
            colourSfxs: ["f", "b", "r"]
        }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Blocking of bold hues in tropical fabrics to infuse simplicity and design in everyday life is the core of Happy Everyday. This overtop is particularly inspired by the warm climate of the coastal town that is Auroville. The light 100% cotton voile protects from the extreme heat, but also acts as a coverup in the chilly evenings. Tie-up the front flaps over a maxi dress or a top and bottoms to add a tonal layer, its magenta will add life to the lazy summers.',
    garmentDetails: '<li>3/4 Sleeves</li><li>Shorter back; front tie-up flaps</li><li>Slips on</li>'
};

happyED.sideslit = {
    SKU: "VAMPAL1708Kh",
    imgDir: 'sdslt',
    sizing: hed_sizing_top,
    imageFile: "sizing1.jpg",
    dimensionNames: ['A. Length', 'B. Shoulders', 'C. Bust', 'D. Armhole', 'E. Slit'],
    dimensionsCm: {
        S: [97, 27, 94, 45, 58],
        M: [99, 29, 98, 47, 59],
        L: [101, 31, 102, 49, 60],
        XL: [103, 33, 106, 51, 61]
    },
    getFabric: function (varidx) {
        return "Cotton";
    },
    data: [
        {
            colourName: "Calm Tan",
            vid: "CW1",
            colourPfx: "tan",
            colourSfxs: ["f", "b", "r", "l"]
        },
        {
            colourName: "Magenta",
            vid: "CW2",
            colourPfx: "magenta",
            colourSfxs: ["f", "b", "r"]
        }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Our Happy Everyday collection includes casual pieces like this asymmetric tunic. Its A-line cut with a side slit makes it easy to pair with different bottoms and allows for interesting colour blocking. This basic round neck, sleeveless top in pink cotton is a contemporary ode to the kurta. The vibrant magenta lifts up the minimalist silhouette and 100% cotton keeps it cool in summers.  Pair it with your salwar, trousers or palazzos - it\'s versatility allows it to be worn in a variety of settings.',
    garmentDetails: '<li>Round neck</li><li>Sleeveless</li><li>A-line with a slit on the left</li><li>Asymmetrical hem</li><li>Slips on</li>'
};

happyED.tank = {
    SKU: "TNKTPS1902Kh",
    imgDir: 'tnktp',
    sizing: hed_sizing_top,
    imageFile: "sizing1.jpg",
    dimensionNames: ['A. Length', 'B. Shoulders', 'C. Bust', 'D. Armhole', 'E. Hem'],
    dimensionsCm: {
        S: [55, 26, 92, 48, 94],
        M: [57, 28, 96, 50, 96],
        L: [59, 30, 100, 52, 98],
        XL: [61, 32, 104, 54, 100]
    },
    getFabric: function (varidx) {
        return "Cotton";
    },
    data: [
        {
            colourName: "Magenta",
            vid: "CW1",
            colourPfx: "magenta",
            colourSfxs: ["f", "b", "r"]
        },
        {
            colourName: "Calm Tan",
            vid: "CW2",
            colourPfx: "tan",
            colourSfxs: ["f", "b", "r"]
        }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'This classic top from our Happy Everyday edit is cut in a 100% cotton to make the everyday heat more endurable. The boxy feel of the top gives an interesting silhouette when paired with pyjamas, trousers or skirts. It\'s sleeveless, has a round neck and an elastic in the back to make it easy to slip on. The magenta brightens the otherwise subtle top. Pair it with our Balloon Pants, your own culottes, trousers, skirts or basically anything - it\'s versatility will encourage you to wear it often.',
    garmentDetails: '<li>Round neck</li><li>Sleeveless</li><li>Boxy cut</li><li>Elastic in the back</li><li>Slips on</li>'
};

happyED.wings = {
    SKU: "TRPZTP1807Kh",
    imgDir: 'wngs',
    sizing: hed_sizing_top,
    imageFile: "sizing1.jpg",
    dimensionNames: ['A. Length', 'B. Shoulders', 'C. Bust', 'D. Armhole', 'E. Hem'],
    dimensionsCm: {
        Free: [72, 34, 104, 52, 274]
    },
    getFabric: function (varidx) {
        return "Cotton";
    },
    data: [
        {
            colourName: "Calm Tan",
            vid: "CW1",
            colourPfx: "tan",
            colourSfxs: ["f", "b", "l", "d"]
        },
        {
            colourName: "Magenta",
            vid: "CW2",
            colourPfx: "magenta",
            colourSfxs: ["f", "b", "r", "d"]
        }
    ],
    sizes: ['Free'],
    description: 'Our Happy Everyday collection also includes fun silhouettes in cotton like the Lotus Wings Top - a breezy style which will fit you now and in 10 years as well. Its A-line flare makes it playful to wear and easy to move around in. This sleeveless top is cut in 100% cotton which gives the top its structured fall that stays away from the skin. The classic Tan is versatile to pair with a lot of colours like electric blue, candy red, magenta or neutrals - black and white. Pair it with boxy culottes or skinny jeans - the top can work with your taste and mood.',
    garmentDetails: '<li>Drape collar</li><li>Sleeveless</li><li>A-line flare with round hem</li><li>Slips on</li>'
};

happyED.createJSON = function (style) {
    var basePath = "/products/happyeveryday/" + style.imgDir + "/";
    return createProductJSON(style.SKU, basePath, style, style.sizing, createCWImageFactory);
}

const hed_lookbook = {
    styles: ['WNDRPA1709Kh', 'DRAWPA1609Kh', 'BERMPA1609Kh', 'CRPTOP1805Kh', 'TNKTPS1902Kh', 'VAMPAL1708Kh', 'TRPZTP1807Kh', 'LTSDSL1501Kh', 'LITLAY1708Vo', 'OVTPLO1501Vo', 'OVTPSH1501Vo', 'BALLPA1501Vo'],
    looks: [
        {
            title: '1.1',
            idxsfx: '01',
            styles: ['VAMPAL1708Kh', 'DRAWPA1609Kh']
        },
        {
            title: '1.2',
            idxsfx: '02',
            styles: ['VAMPAL1708Kh', 'DRAWPA1609Kh', 'OVTPLO1501Vo']
        },
        {
            title: '1.3',
            idxsfx: '03',
            styles: ['VAMPAL1708Kh', 'DRAWPA1609Kh', 'OVTPSH1501Vo']
        },
        {
            title: '2.1',
            idxsfx: '15',
            styles: ['CRPTOP1805Kh', 'DRAWPA1609Kh']
        },
        {
            title: '2.2',
            idxsfx: '16',
            styles: ['CRPTOP1805Kh', 'DRAWPA1609Kh', 'OVTPSH1501Vo']
        },
        {
            title: '3',
            idxsfx: '14',
            styles: ['CRPTOP1805Kh']
        },
        {
            title: '4',
            idxsfx: '11',
            styles: ['TRPZTP1807Kh', 'BERMPA1609Kh']
        },
        {
            title: '5',
            idxsfx: '04',
            styles: ['CRPTOP1805Kh', 'BERMPA1609Kh']
        },
        {
            title: '6',
            idxsfx: '06',
            styles: ['CRPTOP1805Kh', 'BALLPA1501Vo', 'OVTPSH1501Vo']
        },
        {
            title: '7',
            idxsfx: '05',
            styles: ['CRPTOP1805Kh', 'WNDRPA1709Kh']
        },
        {
            title: '8',
            idxsfx: '12',
            styles: ['TNKTPS1902Kh', 'BERMPA1609Kh']
        },
        {
            title: '9',
            idxsfx: '07',
            styles: ['LITLAY1708Vo']
        },
        {
            title: '10',
            idxsfx: '08',
            styles: ['LITLAY1708Vo', 'OVTPSH1501Vo']
        },
        {
            title: '11',
            idxsfx: '09',
            styles: ['LTSDSL1501Kh']
        },
        {
            title: '12',
            idxsfx: '10',
            styles: ['LTSDSL1501Kh', 'OVTPLO1501Vo']
        }
    ],
    getStyle2Looks: function () {
        var res = {};
        for (var i = 0; i < this.looks.length; i++) {
            var lk = this.looks[i];
            for (var j = 0; j < lk.styles.length; j++) {
                var sty = lk.styles[j];
                var r = res[sty];
                if (r === undefined) {
                    res[sty] = [i];
                } else {
                    r.push(i);
                }
            }
        }
        return res;
    },
    getLookFromTitle: function (title) {
        return this.looks[this.getIndexFromTitle(title)];
    },
    getIndexFromTitle: function (title) {
        for (var i = 0; i < this.looks.length; i++) {
            if (title === this.looks[i].title) {
                return i;
            }
        }
        return null;
    },
    getRelatedStyles: function (sku) {
        switch (sku) {
            case 'WNDRPA1709Kh':
                return [{
                    look: '7',
                    styles: ['CRPTOP1805Kh']
                }];
            case 'DRAWPA1609Kh':
                return [{
                    look: '1.3',
                    styles: ['OVTPSH1501Vo']
                }, {
                    look: '2.1',
                    styles: ['CRPTOP1805Kh']
                }];
            case 'BERMPA1609Kh':
                return [{
                    look: '5',
                    styles: ['CRPTOP1805Kh']
                }, {
                    look: '4',
                    styles: ['TRPZTP1807Kh']
                }];
            case 'BALLPA1501Vo':
                return [{
                    look: '6',
                    styles: ['CRPTOP1805Kh', 'OVTPSH1501Vo']
                }];
            case 'CRPTOP1805Kh':
                return [{
                    look: '2.2',
                    styles: ['DRAWPA1609Kh', 'OVTPSH1501Vo']
                }, {
                    look: '5',
                    styles: ['BERMPA1609Kh']
                }];
            case 'TNKTPS1902Kh':
                return [{
                    look: '8',
                    styles: ['BERMPA1609Kh']
                }];
            case 'TRPZTP1807Kh':
                return [{
                    look: '4',
                    styles: ['BERMPA1609Kh']
                }];
            case 'OVTPLO1501Vo':
                return [{
                    look: '1.2',
                    styles: ['VAMPAL1708Kh']
                }, {
                    look: '12',
                    styles: ['LTSDSL1501Kh']
                }];
            case 'OVTPSH1501Vo':
                return [{
                    look: '2.2'
                }, {
                    look: '6'
                }];
            case 'VAMPAL1708Kh':
                return [{
                    look: '1.2'
                }, {
                    look: '1.3'
                }];
            case 'LTSDSL1501Kh':
                return [{
                    look: '12'
                }];
            case 'LITLAY1708Vo':
                return [{
                    look: '10'
                }];
        }
        return null;
    },
    getImagePath: function (title) {
        var i = this.getIndexFromTitle(title);
        return "/products/happyeveryday/looks/lk-" + this.looks[i].idxsfx + ".jpg";
    },
    getImageLeft: function (title) {
        var i = this.getIndexFromTitle(title);
        return "/products/happyeveryday/looks/ll-" + this.looks[i].idxsfx + ".jpg";
    }
};

happyED.catalog = {
    title: "Happy Everyday",
    shopURL: "/products/happyeveryday/shop.html",
    skus: null,
    styles: [happyED.lily, happyED.drawstring, happyED.bermuda, happyED.harem, happyED.crop, happyED.tank,
            happyED.wings, happyED.longovertop, happyED.shortovertop, happyED.sideslit, happyED.shoulderstring, happyED.layer],
    tops: [happyED.crop.SKU, happyED.tank.SKU, happyED.sideslit.SKU, happyED.wings.SKU],
    overtops: [happyED.longovertop.SKU, happyED.shortovertop.SKU],
    dresses: [happyED.shoulderstring.SKU, happyED.layer.SKU],
    pants: [happyED.lily.SKU, happyED.drawstring.SKU, happyED.bermuda.SKU, happyED.harem.SKU],
    productDB: null,
    getProduct: function (sku) {
        return this.productDB[sku];
    },
    summaries: [
        {
            sku: 'BALLPA1501Vo',
            url: "/products/happyeveryday/balloon.html",
            lede: 'Full length Harem Pants'
        },
        {
            sku: 'BERMPA1609Kh',
            url: "/products/happyeveryday/bermuda.html",
            lede: 'Calf length Bermuda pants'
        },
        {
            sku: 'DRAWPA1609Kh',
            url: "/products/happyeveryday/drawstring.html",
            lede: 'Wide legged drawstring pants'
        },
        {
            sku: 'JODHPA1708Kh',
            url: "/products/happyeveryday/jodhpur.html",
            lede: 'Full length Jodhpur cut pants'
        },
        {
            sku: 'WNDRPA1709Kh',
            url: "/products/happyeveryday/lily.html",
            lede: 'Drawstring  waist and hem'
        },
        {
            sku: 'CRPTOP1805Kh',
            url: "/products/happyeveryday/croptop.html",
            lede: ''
        },
        {
            sku: 'TNKTPS1902Kh',
            url: "/products/happyeveryday/tanktop.html",
            lede: ''
        },
        {
            sku: 'TRPZTP1807Kh',
            url: "/products/happyeveryday/wings.html",
            lede: ''
        },
        {
            sku: 'OVTPLO1501Vo',
            url: "/products/happyeveryday/lovertop.html",
            lede: ''
        },
        {
            sku: 'OVTPSH1501Vo',
            url: "/products/happyeveryday/shovertop.html",
            lede: ''
        },
        {
            sku: 'VAMPAL1708Kh',
            url: "/products/happyeveryday/sideslit.html",
            lede: ''
        },
        {
            sku: 'LTSDSL1501Kh',
            url: "/products/happyeveryday/shoulderstring.html",
            lede: ''
        },
        {
            sku: 'LITLAY1708Vo',
            url: "/products/happyeveryday/layer.html",
            lede: ''
        },
    ],
    getSummary: function (sku) {
        var catalog = pfiavG.productCatalog;
        for (var i = 0; i < this.summaries.length; i++) {
            if (this.summaries[i].sku === sku) {
                var sum = this.summaries[i];
                sum.title = catalog.getProduct(sum.sku).name;
                return sum;
            }
        }
        return null;
    }
};

pfiavG.getLineInitializer(happyED).initialize();

happyED.categorizer = createFieldCategorizer(
    happyED.catalog,
    ["Pants", "Tops", "Jackets", "Dresses"],
    ["pants", "tops", "overtops", "dresses"],
    ["p", "t", "o", "d"],
    "t",
    "p");
