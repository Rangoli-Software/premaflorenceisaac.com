const washcareHTML = "<ul><li>Do not soak</li><li>Hand Wash</li><li>Mild Detergent</li><li>Do Not Bleach</li><li>Dry In Shade</li><li>No Need to Iron</li><li>Follow this tie-up procedure to maintain the crushed look-and-feel</li></ul>";

const shippingHTML = getShippingInfoUL(['Since our Naksha skirts are on sale in several physical locations in addition to the website, there is a chance that the skirt that you have selected has already been sold. In this case, we will let you select another skirt, or refund your purchase price, as you prefer.']);

function createSKUs(factory) {
    return {
        factory: factory,
        data: [
            {
                SKU: 'NKSHMU1501PP',
                text: 'Minuit',
                image: 'minuitL4',
                pxWidth: '65'
            },
            {
                SKU: 'NKSHMD1501PP',
                text: 'Midi',
                image: 'midiL4',
                pxWidth: '59.28'
            },
            {
                SKU: 'NKSHMI1501PP',
                text: 'Mini',
                image: 'miniL3',
                pxWidth: '48.88'
            },
            {
                SKU: 'NKSHMC1512PP',
                text: 'Micro',
                image: 'microL4',
                pxWidth: '44.72'
            }
        ],
        getImage: function (vidx) {
            var vnt = this.data[vidx];
            return {
                url: this.factory.listFactory.base + vnt.image + ".jpg"
            }
        },
    };
}

function createSKUSelector(skus) {
    return {
        skus: skus,
        divId: 'skuSelector',
        skuRadioName: "skuRadio",
        getSKUIdx: function (sku) {
            for (var i = 0; i < this.skus.data.length; i++) {
                var variant = this.skus.data[i];
                if (variant.SKU == sku) {
                    return i;
                }
            }
            return -1;
        },
        getSelectedSKU: function () {
            var selRadio = $("input[name='" + this.skuRadioName + "']:checked");
            return selRadio.val();
        },
        createSKUPanel: function (name, varIdx) {
            var res = '<div class="mb-4 ml-n1">';
            for (var i = 0; i < this.skus.data.length; i++) {
                var opt = this.skus.data[i];
                res += '<div class="custom-control custom-control-inline custom-control-img"><input type="radio" onclick="onSKUChange(\'' + opt.SKU + '\')" class="custom-control-input" id="' + name + i + '" name="' + name + '" value="' + opt.SKU + '"' + (varIdx == i ? " checked" : "") + '><label class="custom-control-label" for="' + name + i + '" style="width: ' + opt.pxWidth + 'px">' +
                    '<img class="img-fluid" src="' + this.skus.getImage(i).url + '">' +
                    '</label></div>';
            }
            res += '</div>';
            return res;
        },
        createDiv: function (varIdx) {
            var res = '<form id="' + this.divId + '"><div class="row align-items-center">'
            res += '<div class="col-12 text-center"><figure>' +
                this.createSKUPanel(this.skuRadioName, varIdx) +
                '</figure></div>' +
                '</div></form>';
            return res;
        }
    }
}

var carouselFn = {
    NKSHMC1512PP: createSquareImageCarousel,
    NKSHMI1501PP: createSquareImageCarousel,
    NKSHMD1501PP: createSquareImageCarousel,
    NKSHMU1501PP: createSquareImageCarousel
};

var isProdPortrait = {
    NKSHMC1512PP: true,
    NKSHMI1501PP: true,
    NKSHMD1501PP: true,
    NKSHMU1501PP: true
};

function createNakshaCardCreator(sku) {
    return createArtWearCardCreator(carouselFn[sku]);
}

function createUICFactory(factory, colSelData, prodDataFactoryFn, browseInfo, sizingChart) {
    var skus = createSKUs(factory);
    var skuSelector = createSKUSelector(skus);
    return {
        factory: factory,
        colSelData: colSelData,
        prodDataFactoryFn: prodDataFactoryFn,
        skuSelector: skuSelector,
        browseInfo: browseInfo,
        sizingChart: sizingChart,
        createGenerator: function (sku) {
            var factory = this.factory.createSKU(sku);
            var prodData = this.prodDataFactoryFn(sku);
            var prodJSON = createUIProductJSON(sku, factory.base, prodData, this.sizingChart[sku]);
            var skuSelViewer = createHTMLViewer(skuSelector.createDiv(skuSelector.getSKUIdx(sku)));
            var detailViewer = createHTMLViewer(prodJSON.skuInfo.garmentDetails);
            var storyViewer = this.browseInfo.getStoryViewer();
            var viewerFactory = {
                product: prodJSON.product,
                createPre: function () {
                    return skuSelViewer;
                },
                createBase: function (shop) {
                    var pl = factory.varPL;
                    if (pl === undefined) {
                        return createBasePanelr(shop, this.product);
                    } else {
                        return createBasePanelrRange(shop, this.product, pl);
                    }
                },
                create: function () {
                    return createCatenatedViewer([detailViewer, storyViewer]);
                }
            };
            return createComponentGenerator(factory, prodJSON, viewerFactory, this.colSelData, !isProdPortrait[sku], createNakshaCardCreator(sku), "The model is 5 ft 3 in (160 cm).");
        },
        updateURL: function (sku) {
            var encoder = factory.encoder;
            var urlModifier = factory.urlModifier;
            var c = encoder.toCode(sku);
            urlModifier.updateURL(c);
        }
    }
}

const styDimensionsCm = {
    NKSHMC1512PP: {
        Free: [
            52,
            45,
            240,
            72,
            90
        ]
    },
    NKSHMI1501PP: {
        Free: [
            62,
            53,
            336,
            72,
            130
        ]
    },
    NKSHMD1501PP: {
        Free: [
            81,
            72,
            376,
            72,
            130
        ]
    },
    NKSHMU1501PP: {
        Free: [
            102,
            93,
            392,
            72,
            130
        ]
    }
};

const nkshSizing = {
    NKSHMC1512PP: {
        sizeGeo: ["US", "UK", "EU", "IT", "GR", "JP", "RU"],
        capGeo: ["US", "UK / AU / NZ", "EU / FR", "IT", "DE", "JP", "RU"],
        chart: {
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
    },
    NKSHMI1501PP: {
        sizeGeo: ["US", "UK", "EU", "IT", "GR", "JP", "RU"],
        capGeo: ["US", "UK / AU / NZ", "EU / FR", "IT", "DE", "JP", "RU"],
        chart: {
            Free: {
                US: [6, 30],
                UK: [10, 34],
                EU: [38, 52],
                IT: [42, 56],
                GR: [36, 50],
                JP: [11, 25],
                RU: [44, 58]
            }
        }
    },
    NKSHMD1501PP: {
        sizeGeo: ["US", "UK", "EU", "IT", "GR", "JP", "RU"],
        capGeo: ["US", "UK / AU / NZ", "EU / FR", "IT", "DE", "JP", "RU"],
        chart: {
            Free: {
                US: [6, 30],
                UK: [10, 34],
                EU: [38, 52],
                IT: [42, 56],
                GR: [36, 50],
                JP: [11, 25],
                RU: [44, 58]
            }
        }
    },
    NKSHMU1501PP: {
        sizeGeo: ["US", "UK", "EU", "IT", "GR", "JP", "RU"],
        capGeo: ["US", "UK / AU / NZ", "EU / FR", "IT", "DE", "JP", "RU"],
        chart: {
            Free: {
                US: [6, 30],
                UK: [10, 34],
                EU: [38, 52],
                IT: [42, 56],
                GR: [36, 50],
                JP: [11, 25],
                RU: [44, 58]
            }
        }
    }
}

var nkshVariants = {
    NKSHMC1512PP: {
        vid: "AW",
        images: ["front", "back", "side", "detail1", "detail2"]
    },
    NKSHMI1501PP: {
        vid: "AW",
        images: ["front", "back", "side", "detail1", "detail2"]
    },
    NKSHMD1501PP: {
        vid: "AW",
        images: ["front", "back", "side", "detail1", "detail2"]
    },
    NKSHMU1501PP: {
        vid: "AW",
        images: ["front", "back", "side", "detail1", "detail2"]
    },
}

function createProdData(sku) {
    var isMicro = (sku == 'NKSHMC1512PP')
    return {
        imageFile: "sizing.jpg",
        dimensionNames: ["A. Length", "B. Outer Layer Length", "C. Hem", "D. Waist - Relaxed", "D. Waist - Stretched"],
        dimensionsCm: styDimensionsCm[sku],
        data: [nkshVariants[sku]],
        sizes: ['Free'],
        description: '<p>Almost from the <a href="/journey/salsa.html">earliest days of my atelier</a>, the Naksha skirt has been my signature piece of <a href="/journey/artwear.html">ArtWear</a>, and an evergreen favourite with clients. It is available in 4 lengths - Micro, Mini, Midi and Minuit.</p><p>As the name suggests, each ArtWear Naksha is a <strong>one-of-a-kind</strong> piece, <strong>unique and exclusive.</strong></p><p>The perfect fusion of traditional Tangail textile in a modern western silhouette, the Naksha is a multi-paneled, crushed skirt. Made of sheer 100% cotton fabrics, the skirt offers comfort, playfulness and complete freedom of movement. It suits every age group from teenagers (we even have a kids\' Naksha) to seniors. It can be worn with a variety of tops and t-shirts and is suitable for a range of occasions all around the world.</p><p>Each Artwear Naksha skirt is cut from a single Tangail / Jamdani sari. The skirt is lined with a harmonizing hue of translucent Voile de Coton to create my signature light-layer effect. It is made up of 16 fabric panels (12 on the Micro) which adds a lot of volume and flare. Because of the way the panels are cut, only 1 Minuit, Midi or Mini can be created from a single sari.</p><p>The waist band is made up of 9 rows of elastic (6 rows on the Micro). Because of the need for care while working with the delicate Tangail fabric, it can take a skilled tailor almost a full day of work to create this waistband. The result is a snug, comfortable fit, for a range of waist measurements.</p>',
        garmentDetails: '',
    };
}

var nkshListFactory = createNakshaSKUsList('/products/artwear/skirts/');
var nakshaFactory = createNakshaSKUsFactory(nkshListFactory);
