function createTamaraiFactory(base, product, listData, varPL) {
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
                cwDesc = 'Tangail';
            } else {
                var cw = row[5];
                var vpl = this.varPL[cw];
                cwPrice = vpl === undefined ? this.product.inrPrice : vpl;
                cwDesc = 'Indigo In-Love';
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

function getTamaraiFactory(sku) {
var listData = [
[1, ['1F', '1B'], '#1C272B', 'Ebony Clay', null, 'CW1'],
[2, ['2F', '2B'], '#1D1E2B', 'Steel Gray', {Name: 'Priyanka', Date: '2020-09'}, 'CW1'],
[3, ['3F', '3B'], '#EFF1F2', 'Porcelain', null],
[4, ['4F', '4B'], '#E1E7B2', 'Caper', null],
];
    var varPL = varPLData[sku];
    var product = getProductCatalog().getProduct(sku);

    return createTamaraiFactory('/products/artwear/tamarai/', product, listData, varPL);
}
