function createCatalog() {
    var ret = {};
    for(var i = 0; i < cmData.length; i++) {
        var cm = createCatalogMediaFromRec(cmData[i]);
        ret[cm.sku] = cm;
    }
    return ret;
}

function createCatalogMedia(name, sku, isUnique, url, weight, volFactor) {
    return {
        name: name,
        sku: sku,
        isUnique: isUnique,
        url: url,
        weight: parseFloat(weight),
        volFactor: parseFloat(volFactor)
    };
}

function createCatalogMediaFromRec(prdArr) {
    return createCatalogMedia(prdArr[0], prdArr[1], (prdArr[5] === 'TRUE' ? true : false), prdArr[4], prdArr[2], prdArr[3]);
}

function createPriceList() {
    var ret = {};
    for(var i = 0; i < plData.length; i++) {
        var rec = plData[i];
        var cm = createPriceRow(rec[0], rec[1]);
        ret[cm.sku] = cm;
    }
    return ret;
}

function createPriceRow(sku, price) {
    return {
        sku: sku,
        price: price
    };
}

function createProduct(name, description, sku, isUnique, inrPrice, imageURL, url, weight, volFactor) {
    return {
        name: name,
        description: description,
        sku: sku,
        isUnique: isUnique,
        inrPrice: inrPrice,
        imageURL: imageURL,
        url: url,
        weight: weight,
        volFactor: volFactor
    };
}

function createProductCatalog(cat, pl) {
    return {
        catalog: cat,
        priceList: pl,
        getProduct: function(code) {
            var cm = this.catalog[ code ];
            var pr = this.priceList[ code ];
            return createProduct(cm.name, "", cm.sku, cm.isUnique, pr.price, '', cm.url, cm.weight, cm.volFactor);
        }
    };
}

pfiavG.catalog = createCatalog();
pfiavG.productCatalog = createProductCatalog(pfiavG.catalog, createPriceList());

function getProductCatalog() {
    return pfiavG.productCatalog;
}
