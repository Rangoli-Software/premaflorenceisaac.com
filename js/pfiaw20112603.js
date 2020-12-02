const artwear = {};

function createArtwearJSON(style) {
    var sku = style.SKU;
    var factory = style.getFactory(sku);
    return createUIProductJSON(sku, factory.base, style.prodData, style.sizing);
}

artwear.facemask = {};
artwear.facemask.SKU = 'FACEMK2005Ta';
artwear.facemask.getFactory = getFaceMaskFactory;
artwear.facemask.prodData = {
    imageFile: "sizing.jpg",
    dimensionNames: ["A. Width", "B. Height"],
    dimensionsCm: {
        Free: [
            29,
            15,
        ]
    },
    data: [{
        vid: "CW1",
        images: ["nfm01", "b-f", "b-b", "b-l", "many-1"]
    }],
    sizes: ['Free'],
    description: 'The fabric for these face masks come from my <a href="/journey/treasuretrove.html">Treasure Trove</a> of Tangail sari offcuts, hand-woven in the finest cotton and silk. Each mask features a lining and a pocket in hand-woven khadi cotton in a contrasting colour. The elastic ear bands will help the mask fit firmly and provide full coverage from nose to chin. The 3 layers avoid heat-trapping while keeping you safe in style and comfort. You can fill the pocket / sleeve with your own surgical mask / filter, herbs or a pad with a few drops of essential oil. One size fits most.',
    garmentDetails: '<ul><li>each #artwear mask is <strong>unique - one-of-a-kind</strong></li><li>Outer layer of <a href="/journey/treasuretrove.html">vintage Tangail</a></li><li>2 inner layers of soft washed Khadi</li><li>Universal Size</li><li>Ear-loops of fabric-covered elastic</li><li>Full coverage from nose to chin</li><li>Non-surgical - but has pocket / sleeve to insert surgical filter</li><li>Washable and re-usable</li><li>No returns or exchanges</li><li>Scroll down to shop individual masks</li></ul>',
};
artwear.facemask.washcareHTML = "<ul><li>Wash before first use</li><li>Do not soak</li><li>Hand Wash</li><li>Mild Detergent</li><li>Do Not Bleach</li><li>Dry In Shade</li></ul>";
artwear.facemask.shippingHTML = getShippingInfoUL(['If the item is in stock, it will be ready to ship within 1 business day of your order.']);
artwear.facemask.createJSON = createArtwearJSON;

artwear.tamarai = {};
artwear.tamarai.SKU = 'NKSHDR1501Ta';
artwear.tamarai.createFactory = createTamaraiFactory;
artwear.tamarai.getFactory = getTamaraiFactory;
artwear.tamarai.sizing = {
    sizeGeo: ["US", "UK", "EU", "IT", "GR", "JP", "RU"],
    capGeo: ["US", "UK / AU / NZ", "EU / FR", "IT", "DE", "JP", "RU"],
    chart: {
        Free: {
            US: [4, 18],
            UK: [8, 22],
            EU: [36, 50],
            IT: [40, 54],
            GR: [34, 48],
            JP: [9, 23],
            RU: [42, 56]
        }
    }
};
artwear.tamarai.prodData = {
    imageFile: "sizing.jpg",
    dimensionNames: ["A. Length", "B. Neck Width", "C. Bust", "D. Back Elastic"],
    dimensionsCm: {
        Free: [119, 82, 60, 40]
    },
    data: [{
        vid: "CW1",
        images: ["4pF", "4pB", "4pS", "4pD1", "4pD2", "4pD3", "4pD4"]
    }],
    sizes: ['Free'],
    description: '',
    garmentDetails: '',
};
artwear.tamarai.washcareHTML = "";
artwear.tamarai.shippingHTML = getShippingInfoUL(['Since our Tamarai Dresses are on sale in several physical locations in addition to the website, there is a chance that the dress that you have selected has already been sold. In this case, we will let you select another dress, or refund your purchase price, as you prefer.']);
artwear.tamarai.createCardCreator = function () {
    return createArtWearCardCreator(createSquareImageCarousel);
};
artwear.tamarai.createJSON = createArtwearJSON;

artwear.kamalam = {};
artwear.kamalam.SKU = 'LOTSDR1501Ja';
artwear.kamalam.getFactory = getKamalamFactory;
artwear.kamalam.sizing = {
    sizeGeo: ["US", "UK", "EU", "IT", "GR", "JP", "RU"],
    capGeo: ["US", "UK / AU / NZ", "EU / FR", "IT", "DE", "JP", "RU"],
    chart: {
        Free: {
            US: [4, 18],
            UK: [8, 22],
            EU: [36, 50],
            IT: [40, 54],
            GR: [34, 48],
            JP: [9, 23],
            RU: [42, 56]
        }
    }
};
artwear.kamalam.prodData = {
    imageFile: "sizing.jpg",
    dimensionNames: ["A. Length", "B. Neck Width", "C. Bust", "D. Back Elastic"],
    dimensionsCm: {
        Free: [119, 82, 60, 40]
    },
    data: [{
        vid: "CW1",
        images: ["4pF", "4pB", "4pS", "4pD1", "4pD2", "4pD3"]
    }],
    sizes: ['Free'],
    description: '',
    garmentDetails: '',
};
artwear.kamalam.washcareHTML = "";
artwear.kamalam.shippingHTML = getShippingInfoUL(['Since our Kamalam Dresses are on sale in several physical locations in addition to the website, there is a chance that the dress that you have selected has already been sold. In this case, we will let you select another dress, or refund your purchase price, as you prefer.']);
artwear.kamalam.createCardCreator = function () {
    return createArtWearCardCreator(createSquareImageCarousel);
};
artwear.kamalam.createJSON = createArtwearJSON;


artwear.nakshaminuit = naksha.createStyle(naksha.minuitSKU);
artwear.nakshamidi = naksha.createStyle(naksha.midiSKU);
artwear.nakshamini = naksha.createStyle(naksha.miniSKU);
artwear.nakshamicro = naksha.createStyle(naksha.microSKU);

artwear.createCatalog = function () {
    return {
        styles: [artwear.tamarai, artwear.kamalam, artwear.nakshaminuit, artwear.nakshamidi, artwear.nakshamini, artwear.nakshamicro, artwear.facemask],
        dresses: [artwear.tamarai.SKU, artwear.kamalam.SKU],
        separates: [artwear.nakshaminuit.SKU, artwear.nakshamidi.SKU, artwear.nakshamini.SKU, artwear.nakshamicro.SKU],
        extras: [artwear.facemask.SKU],
        productDB: null,
        createProductDB: function () {
            var map = {};
            for (var i = 0; i < this.styles.length; i++) {
                var style = this.styles[i];
                var entry = style.createJSON(style);
                map[entry.skuInfo.SKU] = entry;
            }
            return map;
        },
        getProduct: function (sku) {
            return this.productDB[sku];
        },
        getCategory: function (sku) {
            if (this.dresses.includes(sku)) {
                return "dresses";
            }
            if (this.separates.includes(sku)) {
                return "separates";
            }
            if (this.separates.includes(sku)) {
                return "extras";
            }
            return null;
        },
        initialize: function() {
            this.productDB = this.createProductDB();
        }
    }
}

artwear.createNavHelper = function (product) {
    return {
        product: product,
        getBreadCrumb: function () {
            var levels = [{
                title: 'Shop',
                url: '/shop.html'
            }, {
                title: 'Art Wear',
                url: '/products/artwear/shop.html'
            }, {
                title: this.product.name
            }];
            return createBreadCrumbLevels(levels);
        }
    };
}

artwear.catalog = artwear.createCatalog();
artwear.catalog.initialize();
