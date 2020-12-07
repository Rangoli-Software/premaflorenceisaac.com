function createCatalog() {
    var ret = {};
    for (var i = 0; i < cmData.length; i++) {
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
    for (var i = 0; i < plData.length; i++) {
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
        getProduct: function (code) {
            var cm = this.catalog[code];
            var pr = this.priceList[code];
            return createProduct(cm.name, "", cm.sku, cm.isUnique, pr.price, '', cm.url, cm.weight, cm.volFactor);
        }
    };
}

pfiavG.catalog = createCatalog();
pfiavG.productCatalog = createProductCatalog(pfiavG.catalog, createPriceList());

function createCardlist(cardRefs) {
    return {
        cardRefs: cardRefs,
        createHTML: function () {
            var res = '<section class="pt-5 pb-3"><div class="row">';
            for (var i = 0; i < this.cardRefs.length; i++) {
                res += '<div class="col-6 col-md-4">'
                res += this.cardRefs[i].createCard();
                res += '</div>';
            }
            res += '</div></section>';
            return res;
        }
    }
}

function createStoryDisplay() {
    return {
        createStoryCardRefs: function (section) {
            var res = [];
            for (var i = 0; i < section.sub.length; i++) {
                var cR = createStoryRef(section, section.sub[i]);
                res.push(cR);
            }
            return res;
        },
        createCardlist: function (section) {
            var cardRefs = this.createStoryCardRefs(section);
            return createCardlist(cardRefs);
        }
    }
}

function createCatalogDisplay(catalog, merchOnly) {
    return {
        merchOnly: merchOnly,
        catalog: catalog,
        miPageSet: pfiavG.pageIdx.miPageSet,
        createProductCardRefs: function (fname) {
            var skus = this.catalog[fname];
            var res = [];
            for (var i = 0; i < skus.length; i++) {
                var sku = skus[i];
                var product = this.catalog.getProduct(sku);
                var cardRef = createProductRef(product.product);
                cardRef.setImg(product.getImages(0).getImage(0).url);
                res.push(cardRef);
            }
            return res;
        },
        createMerchCardRefs: function (fname) {
            var skus = this.catalog[fname];
            var res = [];
            for (var i = 0; i < skus.length; i++) {
                var item = this.miPageSet.select('SKU', skus[i]);
                if (item === undefined) {
                    continue;
                }
                var cardRef = createMerchandisingRef(item);
                cardRef.setRandImg();
                res.push(cardRef);
            }
            return res;
        },
        createCardlist: function (fname) {
            var cardRefs = this.merchOnly ? this.createMerchCardRefs(fname) : this.createProductCardRefs(fname);
            return createCardlist(cardRefs);
        }
    }
}

pfiavG.getLineInitializer = function (thisLine) {
    return {
        thisLine: thisLine,
        catalog: thisLine.catalog,
        createProductDB: function () {
            var map = {};
            for (var i = 0; i < this.catalog.styles.length; i++) {
                var style = this.catalog.styles[i];
                var entry = this.thisLine.createJSON(style);
                map[entry.skuInfo.SKU] = entry;
            }
            return map;
        },
        initialize: function () {
            this.catalog.productDB = 
                this.catalog.createProductDB === undefined ? this.createProductDB() : this.catalog.createProductDB();
            this.catalog.skus = this.catalog.styles.map(p => p.SKU);
        }
    };
}
