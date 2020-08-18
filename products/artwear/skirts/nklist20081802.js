function createNakshaFactory(base, listData, varPL) {
    return {
        listData: listData,
        base: base,
        varPL: varPL,
        createDescriptor: function(row) {
            var num = row[ 0 ];
            var cwPrice;
            if ( row[5] === undefined) {
                cwPrice = null;
            } else {
                var cw = row[5];
                var vpl = this.varPL[cw];
                cwPrice = vpl === undefined ? null : vpl;
            }
            return {
                base: this.base,
                number: num,
                hsl: hexToHSL(row[2]),
                inrPrice: cwPrice,
                getNumImages: function() {
                    return row[1].length;
                },
                getImagePath: function(idx) {
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
                getCWPrice: function() {
                    return this.inrPrice;
                }
            };
        }
    };
}

function getNakshaMicroFactory(base, varPL) {
var listData = [
[1, ['1.1','1.1a'],'#E3CA79','Chenin',null],
[2, ['2','2a'],'#242925','Heavy Metal',null],
[3, ['3','3a'],'#1C2A2D','Mirage',null],
[4, ['4','4a'],'#212B2A','Outer Space',null],
[5, ['5','5a'],'#202A2C','Outer Space',null],
[6, ['6','6a'],'#1F1F1F','Mine Shaft',null],
[7, ['7','7a'],'#222526','Shark',null],
[8, ['8','8a'],'#341715','Eclipse',null],
];
    return createNakshaFactory(base + 'mc/', listData, varPL);
}

function getNakshaMiniFactory(base, varPL) {
var listData = [
[1, ['1','1a'],'#202F25','Log Cabin',null],
];
    return createNakshaFactory(base + 'mi/', listData, varPL);
}

function getNakshaMidiFactory(base, varPL) {
var listData = [
[1, ['1.5','1a.5'],'#372844','Martinique',null,'CW1'],
[2, ['2.5','2a.5'],'#15181D','Woodsmoke',null],
[3, ['3.5','3a.5'],'#9D5A68','Coral Tree',null],
[4, ['4.5','4a.5'],'#A9AC8A','Locust',null],
[5, ['5.5','5a.5'],'#E7BA46','Anzac',null],
[6, ['6.5','6a.5'],'#9E4666','Vin Rouge',null],
[7, ['7.5','7a.5'],'#8C3042','Solid Pink',null],
[8, ['8.5','8a.5'],'#8D2C42','Stiletto',null],
[9, ['9.5','9a.5'],'#252945','Martinique',null],
[10, ['10.5','10a.5'],'#DACB6D','Chenin',null],
[11, ['11.5','11a.5'],'#171B1C','Woodsmoke',null],
[12, ['12.5','12a.5'],'#674857','Eggplant',null],
//[13, ['13.5','13a.5'],'#DDBEA2','Cameo',null],
[14, ['14.5','14a.5'],'#FBFCFD','Zircon',null],
[15, ['15.5','15a.5'],'#753D69','Cosmic',null],
[16, ['16.5','16a.5'],'#244A41','Plantation',null],
[17, ['17.5','17a.5'],'#80505E','Ferra',null],
[18, ['18.5','18a.5'],'#B5AF50','Husk',null],
[19, ['19.5','19a.5'],'#823B6A','Cannon Pink',null],
[20, ['20.5','20a.5'],'#674567','Eggplant',null],
[21, ['21.5','21a.5'],'#18232F','Mirage',null,'CW1'],
[22, ['22.5','22a.5'],'#6F3045','Finn',null],
[23, ['23.5','23a.5'],'#389288','Lochinvar',null],
[24, ['24.5','24a.5'],'#C7AA64','Laser',null],
[25, ['25.5','25a.5'],'#7E3D51','Cosmic',null],
[26, ['26.5','26a.5'],'#7EB54E','Sushi',null],
];
    return createNakshaFactory(base + 'md/', listData, varPL);
}

function getNakshaMinuitFactory(base, varPL) {
var listData = [
//[1, ['1','1a'],'#6D3C55','Cosmic',null],
[2, ['2.5','2a.5'],'#852A47','Camelot',null, 'CW1'],
//[3, ['3.5','3a.5'],'#919A3C','Sycamore',null],
[4, ['4.5','4a.5'],'#F1E04E','Energy Yellow',null, 'CW1'],
[5, ['5.5','5a.5'],'#D26690','Hopbush',null, 'CW1'],
[6, ['6.5','6a.5'],'#D96A56','Terracotta',null],
[7, ['7.5','7a.5'],'#D29E59','Di Serria',null, 'CW1'],
[8, ['8.5','8a.5'],'#498640','Fern Green',null, 'CW1'],
[9, ['9.5','9a.5'],'#C97983','Old Rose',null],
];
    return createNakshaFactory(base + 'mu/', listData, varPL);
}

function createNakshaEncoder() {
    return {
        toSKU : function(c) {
            switch (c) {
                case 'u':
                    return 'NKSHMU1501PP';
                case 'd':
                    return 'NKSHMD1501PP';
                case 'i':
                    return 'NKSHMI1501PP';
                case 'c':
                    return 'NKSHMC1512PP';
                default:
                    return null;
            }
        },
        toCode: function(sku) {
            switch(sku) {
                case 'NKSHMC1512PP':
                    return 'c';
                case 'NKSHMI1501PP':
                    return 'i';
                case 'NKSHMD1501PP':
                    return 'd';
                case 'NKSHMU1501PP':
                    return 'u';
                default:
                    return null;
            }
        }
    };
}

function createNakshaURLModifer() {
    return {
        paramName: 's',
        defaultCode: 'd',
        getCodeOrDefault: function() {
            var c = this.getCode();
            if ( c === undefined ) {
                c = this.defaultCode;
            }
            return c;
        },
        getCode: function() {
            return getUrlVars()[this.paramName];
        },
        updateURL: function(c) {
            var oldC = this.getCode();
            if ( oldC !== c ) {
                modifyUrl(this.paramName, c);
            }
        }
    }
}

function createNakshaSKUsFactory(base) {
    return {
        base: base,
        encoder: createNakshaEncoder(),
        urlModifier: createNakshaURLModifer(),
        createSKU: function(sku) {
            var varPL = varPLData[sku];
            switch(sku) {
                case 'NKSHMC1512PP':
                    return getNakshaMicroFactory(base, varPL);
                case 'NKSHMI1501PP':
                    return getNakshaMiniFactory(base, varPL);
                case 'NKSHMD1501PP':
                    return getNakshaMidiFactory(base, varPL);
                case 'NKSHMU1501PP':
                    return getNakshaMinuitFactory(base, varPL);
                default:
                    return null;
            }
        },
    };
}
