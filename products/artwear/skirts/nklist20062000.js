function createNakshaFactory(base, listData) {
    return {
        listData: listData,
        base: base,
        createDescriptor: function(row) {
            var num = row[ 0 ];
            return {
                base: this.base,
                number: num,
                hsl: hexToHSL(row[2]),
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
                }
            };
        }
    };
}

function getNakshaMicroFactory(base) {
var listData = [
[1, ['1.1','1.1a'],'#E3CA79','Chenin',true],
[2, ['2','2a'],'#242925','Heavy Metal',true],
[3, ['3','3a'],'#1C2A2D','Mirage',true],
[4, ['4','4a'],'#212B2A','Outer Space',true],
[5, ['5','5a'],'#202A2C','Outer Space',true],
[6, ['6','6a'],'#1F1F1F','Mine Shaft',true],
[7, ['7','7a'],'#222526','Shark',true],
];
    return createNakshaFactory(base + 'mc/', listData);
}

function getNakshaMiniFactory(base) {
var listData = [
[1, ['1','1a'],'#202F25','Log Cabin',true],
];
    return createNakshaFactory(base + 'mi/', listData);
}

function getNakshaMidiFactory(base) {
var listData = [
[1, ['1.1','1.1a'],'#372844','Martinique',true],
[2, ['2.1','2.1a'],'#15181D','Woodsmoke',true],
[3, ['3.1','3.1a'],'#9D5A68','Coral Tree',true],
[4, ['4.1','4.1a'],'#A9AC8A','Locust',true],
[5, ['5','5a'],'#E7BA46','Anzac',true],
[6, ['6.1','6.1a'],'#9E4666','Vin Rouge',true],
[7, ['7.1','7.1a'],'#8C3042','Solid Pink',true],
[8, ['8.1','8.1a'],'#8D2C42','Stiletto',true],
[9, ['9','9a'],'#252945','Martinique',true],
[10, ['10','10a'],'#DACB6D','Chenin',true],
[11, ['11','11a'],'#171B1C','Woodsmoke',true],
[12, ['12','12a'],'#674857','Eggplant',true],
[13, ['13','13a'],'#DDBEA2','Cameo',true],
[14, ['14','14a'],'#FBFCFD','Zircon',true],
[15, ['15','15a'],'#753D69','Cosmic',true],
[16, ['16','16a'],'#244A41','Plantation',true],
[17, ['17','17a'],'#80505E','Ferra',true],
[18, ['18','18a'],'#B5AF50','Husk',true],
];
    return createNakshaFactory(base + 'md/', listData);
}

function getNakshaMinuitFactory(base) {
var listData = [
[1, ['1','1a'],'#6D3C55','Cosmic',true],
[2, ['2.1','2.1a'],'#852A47','Camelot',true],
[3, ['3','3a'],'#919A3C','Sycamore',true],
[4, ['4','4a'],'#F1E04E','Energy Yellow',true],
[5, ['5','5a'],'#D26690','Hopbush',true],
[6, ['6','6a'],'#D96A56','Terracotta',true],
[7, ['7.1','7.1a'],'#D29E59','Di Serria',true],
[8, ['8.1','8.1a'],'#498640','Fern Green',true],
[9, ['9.1','9.1a'],'#C97983','Old Rose',true],
];
    return createNakshaFactory(base + 'mu/', listData);
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
            switch(sku) {
                case 'NKSHMC1512PP':
                    return getNakshaMicroFactory(base);
                case 'NKSHMI1501PP':
                    return getNakshaMiniFactory(base);
                case 'NKSHMD1501PP':
                    return getNakshaMidiFactory(base);
                case 'NKSHMU1501PP':
                    return getNakshaMinuitFactory(base);
                default:
                    return null;
            }
        },
    };
}
