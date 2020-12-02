function createKamalamFactory(base, product, listData, varPL) {
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
                cwDesc = 'Jamdani Lace';
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

function getKamalamFactory(sku) {
var listData = [
[1, ['1F', '1B'], '#6E4C5B', 'Ferra', null],
[2, ['2F', '2B'], '#B24958', 'Hippie Pink', null],
[3, ['3F', '3B'], '#555974', 'Comet', null],
[4, ['4F', '4B'], '#4F4B6B', 'Mulled Wine', null],
[5, ['5F', '5B'], '#D2898A', 'Puce', null],
[6, ['6F', '6B'], '#B49D91', 'Thatch', null],
];
    var varPL = varPLData[sku];
    var product = getProductCatalog().getProduct(sku);

    return createKamalamFactory('/products/artwear/kamalam/', product, listData, varPL);
}
