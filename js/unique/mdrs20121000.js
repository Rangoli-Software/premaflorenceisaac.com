function createColourWayFactory(product, varPL, descMap) {
    return {
        product: product,
        varPL: varPL,
        descMap: descMap,
        getPrice: function (cw) {
            if (cw === undefined || this.varPL === undefined) {
                return this.product.inrPrice;
            }
            return this.varPL[cw];
        },
        getDescription: function (cw) {
            if (cw === undefined) {
                return this.descMap['CW1']
            }
            return this.descMap[cw];
        }
    }
}

function createCollectedText(collected) {
    var res = "Collected";
    var name = collected.Name;
    if (name !== undefined) {
        res += " by " + name;
    }
    var date = collected.Date;
    if (date !== undefined) {
        var dt = Date.parse(date);
        res += " in " + nkdtformatter.format(dt);
    }
    return res;
}

function createUIDescriptorFactory(base, product, listData, cwFactory) {
    return {
        listData: listData,
        product: product,
        base: base,
        cwFactory: cwFactory,
        getRowId: function (row) {
            return row[0];
        },
        createDescriptor: function (r) {
            var num = this.getRowId(r);
            var collected = r[4];
            var cw = r[5]
            var cwPrice = this.cwFactory.getPrice(cw);
            var cwDesc = this.cwFactory.getDescription(cw);
			let row = r;
            return {
                base: this.base,
                number: num,
                hsl: hexToHSL(row[2]),
                inrPrice: cwPrice,
                catDesc: cwDesc,
                collected: collected,
                getNumImages: function () {
                    return row[1].length;
                },
                getImagePath: function (idx) {
                    return this.base + row[1][idx] + '.jpg';
                },
                getHue: function () {
                    return this.hsl.h;
                },
                getSat: function () {
                    return this.hsl.s;
                },
                getV: function () {
                    return this.hsl.l;
                },
                getCWPrice: function () {
                    return this.inrPrice;
                },
                getCWDesc: function () {
                    return this.catDesc;
                },
                isAvailable: function () {
                    return this.collected === null;
                },
                getCollectedText: function () {
                    return createCollectedText(this.collected);
                }
            };
        }
    };
}

function createStyleDescFactory(sku, basedir, listdata, descmap) {
    var product = pfiavG.productCatalog.getProduct(sku);
    var varPL = varPLData[sku];
    var cwFactory = createColourWayFactory(product, varPL, descmap);
    return createUIDescriptorFactory(basedir, product, listdata, cwFactory);
}

function getMadrasFactory(sku) {
    var listData = [
[1, ['1F', '1B'], 'E3DFD4', 'Satin Linen', null],
[2, ['2F', '2B'], 'B41C48', 'Maroon Flush', null],
[3, ['3F', '3B'], '7E1222', 'Merlot', null],
[4, ['4F', '4B'], 'F1BD02', 'Corn', null],
[5, ['5F', '5B'], 'D83C04', 'Grenadier', null],
[6, ['6F', '6B'], '1B4572', 'Chathams Blue', null],
[7, ['7F', '7B'], '2A4A63', 'San Juan', null, 'CW2'],
    ];
    var basedir = '/products/artwear/madras/';
    var descMap = {
        CW1: 'Tangail Tradition',
        CW2: 'Indigo In-Love',
        CW3: 'Jamdani Lace'
    };
    return createStyleDescFactory(sku, basedir, listData, descMap);
}
