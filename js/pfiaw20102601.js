const artwear = {};

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

artwear.nakshaminuit = {};
artwear.nakshaminuit.SKU = 'NKSHMU1501PP';
artwear.nakshamidi = {};
artwear.nakshamidi.SKU = '';
artwear.nakshamini = {};
artwear.nakshamini.SKU = '';
artwear.nakshamicro = {};
artwear.nakshamicro.SKU = '';

artwear.createCatalog = function () {
    return {
        styles: [artwear.tamarai],
        dresses: [artwear.tamarai.SKU],
        skirts: [],
        tops: [],
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
            if (this.dresses.includes(sku)) {
                return "dresses";
            }
            if (this.skirts.includes(sku)) {
                return "skirts";
            }
            return null;
        },
        initialize: function () {
            this.productDB = this.createProductDB();
        }
    }
}

artwear.catalog = artwear.createCatalog();
artwear.catalog.initialize();
