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

function getNakshaMidiFactory(base) {
var listData = [
[1, ['1','1a'],'#372844','Martinique',true],
[2, ['2','2a'],'#15181D','Woodsmoke',true],
[3, ['3','3a','3b'],'#9D5A68','Coral Tree',true],
[4, ['4','4a'],'#A9AC8A','Locust',true],
[6, ['6','6a'],'#9E4666','Vin Rouge',true],
[7, ['7','7a'],'#8C3042','Solid Pink',true],
[8, ['8','8a'],'#8D2C42','Stiletto',true],
];
    return createNakshaFactory(base + 'md/', listData);
}

function getNakshaMinuitFactory(base) {
var listData = [
[2, ['2','2a'],'#852A47','Camelot',true],
[7, ['7','7a'],'#D29E59','Di Serria',true],
[8, ['8','8a','3b'],'#498640','Fern Green',true],
[9, ['9','9a'],'#C97983','Old Rose',true],
];
    return createNakshaFactory(base + 'mu/', listData);
}

function createNakshaSKUsFactory(base) {
    return {
        base: base,
        createSKU(sku) {
            switch(sku) {
                case 'NKSHMC1512PP':
                case 'NKSHMI1501PP':
                case 'NKSHMD1501PP':
                    return getNakshaMidiFactory(base);
                case 'NKSHMU1501PP':
                    return getNakshaMinuitFactory(base);
                default:
                    return null;
            }
        }
    };
}
