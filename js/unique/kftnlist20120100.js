function createKaftanFactory(base, product, listData, varPL) {
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

function getKaftanFactory(sku) {
var listData = [
[1, ['1F', '1B'], '#27283D', 'Ebony Clay', null],
[2, ['2F', '2B'], '#A25C6D', 'Tapestry', null],
[3, ['3F', '3B'], '#6D302B', 'Spice', null],
[4, ['4F', '4B'], '#C1A85F', 'Husk', null],
[5, ['5F', '5B'], '#6A3C3E', 'Congo Brown', null],
];
    var varPL = varPLData[sku];
    var product = pfiavG.productCatalog.getProduct(sku);

    return createKaftanFactory('/products/artwear/kaftan/', product, listData, varPL);
}
