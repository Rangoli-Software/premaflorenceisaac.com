const artwear = {};

function createArtwearJSON(style) {
    var sku = style.SKU;
    var factory = style.getFactory(sku);
    return createUIProductJSON(sku, factory.base, style.prodData, style.sizing);
}
artwear.washcareHTML = "<ul><li>Wash before first use</li><li>Do not soak</li><li>Hand Wash</li><li>Mild Detergent</li><li>Do Not Bleach</li><li>Dry In Shade</li></ul>";
artwear.dressSizing = {
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
artwear.modelTxt = "The model is 5 ft 4.5 in (164 cm)."

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
artwear.tamarai.sizing = artwear.dressSizing;
artwear.tamarai.prodData = {
    imageFile: "sizing.jpg",
    dimensionNames: ["A. Length", "B. Neck Width", "C. Bust"],
    dimensionsCm: {
        'Free': [119, 82, 120]
    },
    data: [{
        vid: "CW1",
        images: ["4pF", "4pB", "4pS", "4pD1", "4pD2", "4pD3", "4pD4"]
    }],
    sizes: ['Free'],
    description: 'Whole 5.5 meters of a Jamdani sari is used to form our much-admired Tamarai Dress. Tamarai means Lotus in Tamil, and as the name suggests, the hem of the dress blooms like a Tamarai. The pallu of the sari is used to adorn the V neck bodice without shoulders and armhole to let the dress follow your curves. A self-tie string in the front and an elastic in the back lets you adjust the fit of the dress. The flounce of the dress makes it wearable by most shapes and sizes. The lining is stitched in lightweight 100% cotton voile in a contrasting colour with ruffles that extend the hemline to continue the flow of the dress.',
    garmentDetails: '',
};
artwear.tamarai.shippingHTML = getShippingInfoUL(['Since our Tamarai Dresses are on sale in several physical locations in addition to the website, there is a chance that the dress that you have selected has already been sold. In this case, we will let you select another dress, or refund your purchase price, as you prefer.']);
artwear.tamarai.createCardCreator = function () {
    return createArtWearCardCreator(createSquareImageCarousel);
};
artwear.tamarai.createJSON = createArtwearJSON;

artwear.kaftan = {};
artwear.kaftan.SKU = 'LNKFTN1501Ja';
artwear.kaftan.getFactory = getKaftanFactory;
artwear.kaftan.sizing = artwear.dressSizing;
artwear.kaftan.prodData = {
    imageFile: "sizing.jpg",
    dimensionNames: ['A. Length', 'B. Shoulder', 'C. Bust', 'D. Sleeve Width', 'E. Sleeve Length'],
    dimensionsCm: {
        'Free': [125, 46, 118, 46, 46]
    },
    data: [{
        vid: "CW1",
        images: ["4pF", "4pS", "4pD1", "4pD2"]
    }],
    sizes: ['Free'],
    description: 'This Moroccan inspired silhouette is an oversized Kaftan with full sleeves and wide round neck.  An exquisite handwoven Jamdani sari with minimal motifs and intricate contrasting borders is used to form 8 different panels. Whole 10 meters of the border are used to adorn the sleeves, hem, and front and back panels. The gathered sari at the side seam adds to the volume and makes it wearable by most shapes and sizes. The self-tie string at the waist helps you to adjust the fit of the Kaftan. The lining is stitched in a lightweight 100% cotton ovile in a matching colour.',
    garmentDetails: '',
};
artwear.kaftan.shippingHTML = getShippingInfoUL(['Since our Kaftans are on sale in several physical locations in addition to the website, there is a chance that the dress that you have selected has already been sold. In this case, we will let you select another dress, or refund your purchase price, as you prefer.']);
artwear.kaftan.createCardCreator = function () {
    return createArtWearCardCreator(createSquareImageCarousel);
};
artwear.kaftan.createJSON = createArtwearJSON;

artwear.kamalam = {};
artwear.kamalam.SKU = 'LOTSDR1501Ja';
artwear.kamalam.getFactory = getKamalamFactory;
artwear.kamalam.sizing = artwear.dressSizing;
artwear.kamalam.prodData = {
    imageFile: "sizing.jpg",
    dimensionNames: ['A. Length', 'B. Neck Width', 'C. Bust'],
    dimensionsCm: {
        'Free': [110, 82, 120]
    },
    data: [{
        vid: "CW1",
        images: ["4pF", "4pB", "4pS", "4pD1", "4pD2", "4pD3"]
    }],
    sizes: ['Free'],
    description: 'The Kamalam Dress is a freesize, A-line dress with voluminous flare. One Jamdani sari is used to drape the lotus-like blooming flounce that falls from your underbust. The pallu of the sari is constructed into a V-neck bodice without shoulders and armholes to let the dress follow your curves. The self-tie string in the front with an elastic in the back makes it easier to slip into and adjust the fit of the dress. The lining is stitched in lightweight 100% cotton voile in a colour that compliments the translucency of the Jamdani.',
    garmentDetails: '',
};
artwear.kamalam.shippingHTML = getShippingInfoUL(['Since our Kamalam Dresses are on sale in several physical locations in addition to the website, there is a chance that the dress that you have selected has already been sold. In this case, we will let you select another dress, or refund your purchase price, as you prefer.']);
artwear.kamalam.createCardCreator = function () {
    return createArtWearCardCreator(createSquareImageCarousel);
};
artwear.kamalam.createJSON = createArtwearJSON;


artwear.nakshaminuit = naksha.createStyle(naksha.minuitSKU);
artwear.nakshamidi = naksha.createStyle(naksha.midiSKU);
artwear.nakshamini = naksha.createStyle(naksha.miniSKU);
artwear.nakshamicro = naksha.createStyle(naksha.microSKU);

artwear.catalog = {
    title: "Art Wear",
    shopURL: "/products/artwear/shop.html",
    skus: null,
    styles: [artwear.tamarai, artwear.kamalam, artwear.kaftan, artwear.nakshaminuit, artwear.nakshamidi, artwear.nakshamini, artwear.nakshamicro, artwear.facemask],
    dresses: [artwear.tamarai.SKU, artwear.kamalam.SKU, artwear.kaftan.SKU],
    separates: [artwear.nakshaminuit.SKU, artwear.nakshamidi.SKU, artwear.nakshamini.SKU, artwear.nakshamicro.SKU],
    extras: [artwear.facemask.SKU],
    productDB: null,
    getProduct: function (sku) {
        return this.productDB[sku];
    },
    createProductDB: function () {
        var map = {};
        for (var i = 0; i < this.styles.length; i++) {
            var style = this.styles[i];
            var entry = style.createJSON(style);
            map[entry.skuInfo.SKU] = entry;
        }
        return map;
    }
}

pfiavG.getLineInitializer(artwear).initialize();

artwear.categorizer = createFieldCategorizer(
    artwear.catalog,
    ["Dresses", "Separates", "Extras"],
    ["dresses", "separates", "extras"],
    ["d", "s", "e"],
    "t",
    "d");
