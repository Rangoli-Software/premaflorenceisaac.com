function createSariTopFactory(base, product, listData, varPL) {
    return {
        listData: listData,
        product: product,
        base: base,
        varPL: varPL,
        getRowId: function(row) {
            return row[0];
        },
        createDescriptor: function(row) {
            var num = this.getRowId(row);
            var collected = row[ 4 ];
            var cwPrice;
            var cwDesc;
            if (row[5] === undefined) {
                cwPrice = this.product.inrPrice;
                cwDesc = 'Tangail Tradition';
            } else {
/*
                var cw = row[5];
                var vpl = this.varPL[cw];
                cwPrice = vpl === undefined ? this.product.inrPrice : vpl;
                cwDesc = 'Indigo In-Love';
*/
            }
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
                getHue: function() {
                    return this.hsl.h;
                },
                getSat: function() {
                    return this.hsl.s;
                },
                getV: function() {
                    return this.hsl.l;
                },
                getCWPrice: function () {
                    return this.inrPrice;
                },
                getCWDesc: function () {
                    return this.catDesc;
                },
                isAvailable: function() {
                    return this.collected === null;
                },
                getCollectedText: function() {
                    var res = "Collected";
                    var name = this.collected.Name;
                    if ( name !== undefined ) {
                        res += " by " + name;
                    }
                    var date = this.collected.Date;
                    if ( date !== undefined ) {
                        var dt = Date.parse(date);
                        res += " in " + nkdtformatter.format(dt);
                    }
                    return res;
                }
            };
        }
    };
}

function getSariTopFactory(sku) {
var listData = [
[1, ['1F', '1B'], '#27283D', 'Ebony Clay', null],
];
    var varPL = varPLData[sku];
    var product = pfiavG.productCatalog.getProduct(sku);

    return createSariTopFactory('/products/artwear/saritp/', product, listData, varPL);
}
