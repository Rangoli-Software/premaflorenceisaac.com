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
[1, ['1.1','1.1a'],'#E3CA79','Chenin',true],
[2, ['2','2a'],'#242925','Heavy Metal',true],
[3, ['3','3a'],'#1C2A2D','Mirage',true],
[4, ['4','4a'],'#212B2A','Outer Space',true],
[5, ['5','5a'],'#202A2C','Outer Space',true],
[6, ['6','6a'],'#1F1F1F','Mine Shaft',true],
[7, ['7','7a'],'#222526','Shark',true],
];
    return createNakshaFactory(base + 'mc/', listData, varPL);
}

function getNakshaMiniFactory(base, varPL) {
var listData = [
[1, ['1','1a'],'#202F25','Log Cabin',true],
];
    return createNakshaFactory(base + 'mi/', listData, varPL);
}

function getNakshaMidiFactory(base, varPL) {
var listData = [
[1, ['1.2','1.2a'],'#372844','Martinique',true],
[2, ['2.2','2.2a'],'#15181D','Woodsmoke',true],
[3, ['3','3a'],'#9D5A68','Coral Tree',true],
[4, ['4.1','4.1a'],'#A9AC8A','Locust',true],
[5, ['5','5a'],'#E7BA46','Anzac',true],
[6, ['6','6a'],'#9E4666','Vin Rouge',true],
[7, ['7','7a'],'#8C3042','Solid Pink',true],
[8, ['8','8a'],'#8D2C42','Stiletto',true],
[9, ['9','9a'],'#252945','Martinique',true],
[10, ['10.1','10.1a'],'#DACB6D','Chenin',true],
[11, ['11','11a'],'#171B1C','Woodsmoke',true],
[12, ['12','12a'],'#674857','Eggplant',true],
[13, ['13','13a'],'#DDBEA2','Cameo',true],
[14, ['14','14a'],'#FBFCFD','Zircon',true],
[15, ['15','15a'],'#753D69','Cosmic',true],
[16, ['16','16a'],'#244A41','Plantation',true],
[17, ['17','17a'],'#80505E','Ferra',true],
[18, ['18','18a'],'#B5AF50','Husk',true],
[19, ['19','19a'],'#823B6A','Cannon Pink',true],
[20, ['20','20a'],'#674567','Eggplant',true],
[21, ['21','21a'],'#18232F','Mirage',true],
[22, ['22','22a'],'#6F3045','Finn',true],
[23, ['23','23a'],'#389288','Lochinvar',true],
[24, ['24','24a'],'#C7AA64','Laser',true],
[25, ['25','25a'],'#7E3D51','Cosmic',true],
[26, ['26','26a'],'#7EB54E','Sushi',true],
];
    return createNakshaFactory(base + 'md/', listData, varPL);
}

function getNakshaMinuitFactory(base, varPL) {
var listData = [
[1, ['1','1a'],'#6D3C55','Cosmic',true],
[2, ['2.1','2.1a'],'#852A47','Camelot',true, 'CW1'],
[3, ['3','3a'],'#919A3C','Sycamore',true],
[4, ['4','4a'],'#F1E04E','Energy Yellow',true, 'CW1'],
[5, ['5','5a'],'#D26690','Hopbush',true, 'CW1'],
[6, ['6','6a'],'#D96A56','Terracotta',true],
[7, ['7.2','7.2a'],'#D29E59','Di Serria',true, 'CW1'],
[8, ['8','8a'],'#498640','Fern Green',true, 'CW1'],
[9, ['9','9a'],'#C97983','Old Rose',true],
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
