const nkdtformatter = new Intl.DateTimeFormat('en-US',{month: 'long', year: 'numeric'});

function createNakshaFactory(base, listData, varPL) {
    return {
        listData: listData,
        base: base,
        varPL: varPL,
        createDescriptor: function (row) {
            var num = row[0];
            var cwPrice;
            var cwDesc;
            if (row[5] === undefined) {
                cwPrice = null;
                cwDesc = 'Tangail';
            } else {
                var cw = row[5];
                var vpl = this.varPL[cw];
                cwPrice = vpl === undefined ? null : vpl;
                cwDesc = (cw === 'CW1' ? 'Jamdani Lace' : 'Indigo In-Love')
            }
            var collected = row[4];
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

function getNakshaMicroFactory(base, varPL) {
    var listData = [
[1, ['1.1', '1.1a'], '#E3CA79', 'Chenin', null],
[2, ['2', '2a'], '#242925', 'Heavy Metal', null],
[3, ['3', '3a'], '#1C2A2D', 'Mirage', null],
[4, ['4', '4a'], '#212B2A', 'Outer Space', null],
[5, ['5', '5a'], '#202A2C', 'Outer Space', null],
[6, ['6', '6a'], '#1F1F1F', 'Mine Shaft', null],
[7, ['7', '7a'], '#222526', 'Shark', null],
[8, ['8', '8a'], '#512F2B', 'Cork', null],
[9, ['9', '9a'], '#CAF1F5', '', null, 'CW1'],
];
    return createNakshaFactory(base + 'mc/', listData, varPL);
}

function getNakshaMiniFactory(base, varPL) {
    var listData = [
[1, ['1', '1a'], '#202F25', 'Log Cabin', null],
];
    return createNakshaFactory(base + 'mi/', listData, varPL);
}

function getNakshaMidiFactory(base, varPL) {
    var listData = [
[1, ['1.6', '1a.6'], '#372844', 'Martinique', null, 'CW2'],
[2, ['2.6', '2a.6'], '#15181D', 'Woodsmoke', null],
[3, ['3.6', '3a.6'], '#9D5A68', 'Coral Tree', null],
[4, ['4.6', '4a.6'], '#A9AC8A', 'Locust', null],
[5, ['5.6', '5a.6'], '#E7BA46', 'Anzac', null],
[6, ['6.6', '6a.6'], '#9E4666', 'Vin Rouge', null],
[7, ['7.6', '7a.6'], '#8C3042', 'Solid Pink', null],
[8, ['8.6', '8a.6'], '#8D2C42', 'Stiletto', null],
[9, ['9.6', '9a.6'], '#252945', 'Martinique', null],
[10, ['10.6', '10a.6'], '#DACB6D', 'Chenin', {Name: 'Prema'}],
[11, ['11.6', '11a.6'], '#171B1C', 'Woodsmoke', null],
[12, ['12.6', '12a.6'], '#674857', 'Eggplant', null],
[13, ['13.6','13a.6'],'#DDBEA2','Cameo',{Name: 'Judith', Date: '2020-07'}],
[14, ['14.6', '14a.6'], '#FBFCFD', 'Zircon', null],
[15, ['15.6', '15a.6'], '#753D69', 'Cosmic', null],
[16, ['16.6', '16a.6'], '#244A41', 'Plantation', null],
[17, ['17.6', '17a.6'], '#80505E', 'Ferra', null],
[18, ['18.6', '18a.6'], '#B5AF50', 'Husk', {Name: 'Naomi', Date: '2020-08'}],
[19, ['19.6', '19a.6'], '#823B6A', 'Cannon Pink', null],
[20, ['20.6', '20a.6'], '#674567', 'Eggplant', null],
[21, ['21.6', '21a.6'], '#263E55', '', null, 'CW2'],
[22, ['22.6', '22a.6'], '#6F3045', 'Finn', null],
[23, ['23.6', '23a.6'], '#389288', 'Lochinvar', null],
[24, ['24.6', '24a.6'], '#C7AA64', 'Laser', null],
[25, ['25.6', '25a.6'], '#7E3D51', 'Cosmic', null],
[26, ['26.6', '26a.6'], '#7EB54E', 'Sushi', null],
];
    return createNakshaFactory(base + 'md/', listData, varPL);
}

function getNakshaMinuitFactory(base, varPL) {
    var listData = [
//[1, ['1','1a'],'#6D3C55','Cosmic',null],
[2, ['2.6', '2a.6'], '#852A47', 'Camelot', null, 'CW1'],
//[3, ['3.6','3a.6'],'#919A3C','Sycamore',null],
[4, ['4.6', '4a.6'], '#F1E04E', 'Energy Yellow', null, 'CW1'],
[5, ['5.6', '5a.6'], '#D26690', 'Hopbush', null, 'CW1'],
[6, ['6.6', '6a.6'], '#D96A56', 'Terracotta', null],
[7, ['7.6', '7a.6'], '#D29E59', 'Di Serria', null, 'CW1'],
[8, ['8.6', '8a.6'], '#498640', 'Fern Green', null, 'CW1'],
[9, ['9.6', '9a.6'], '#C97983', 'Old Rose', null],
[10, ['10.6', '10a.6'], '#CAF1F5', '', null, 'CW1'],
];
    return createNakshaFactory(base + 'mu/', listData, varPL);
}

function createNakshaEncoder() {
    return {
        toSKU: function (c) {
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
        toCode: function (sku) {
            switch (sku) {
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
        getCodeOrDefault: function () {
            var c = this.getCode();
            if (c === undefined) {
                c = this.defaultCode;
            }
            return c;
        },
        getCode: function () {
            return getUrlVars()[this.paramName];
        },
        updateURL: function (c) {
            var oldC = this.getCode();
            if (oldC !== c) {
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
        createSKU: function (sku) {
            var varPL = varPLData[sku];
            switch (sku) {
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
