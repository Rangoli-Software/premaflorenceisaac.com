function createFaceMaskFactory(base, listData) {
    return {
        listData: listData,
        base: base,
        createDescriptor: function(row) {
            var num = row[ 0 ];
            return {
                base: this.base,
                number: num,
                hsl: hexToHSL(row[1]),
                getNumImages: function() {
                    return 1;
                },
                getImagePath: function(idx) {
                    return this.base + row[0] + '.jpg';
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
            };
        }
    };
}

function getFaceMaskFactory() {
var listData = [
['1b','#588E79','Patina',true],
['2a','#A35367','Brown Rust',true],
['3a','#DBD8C5','Moon Mist',true],
['4a','#914A50','Copper Rust',true],
['5','#7B8539','Pesto',true],
['6','#1B1B19','Tuatara',true],
['7','#5D262B','Buccaneer',true],
['8','#AD4426','Paarl',true],
['9','#7D6659','Russet',true],
['10','#972328','Old Brick',true],
['11a','#A6Ad53','Olive Green',true],
['12a','#9BA060','Green Smoke',true],
['13','#4D5687','East Bay',true],
['14','#403248','BlackCurrant',true],
['15','#204565','Astronaut',true],
['16','#3A7681','Ming',true],
['17','#EEE8CE','Parchment',true],
['18a','#595647','Soya Bean',true],
['19','#B4A23D','Roti',true],
['20','#1E6461','Green Pea',true],
['21','#BC7606','Pirate Gold',true],
['22','#CCD5C5','Pale Leaf',true],
['23','#424642','Cape Cod',true],
['24','#E2DCBF','Stark White',true],
['25','#EDF4E2','Loafer',true],
['26','#304970','San Juan',true],
['27','#E2B440','Anzac',true],
['28','#8E4563','Cannon Pink',true],
['29','#898b2d','',true],
['30','#EFF7EC','Feta',true],
['31','#A9AF98','Bud',true],
['32','#EEF7E6','Feta',true],
];

    return createFaceMaskFactory('/products/accessories/fm/', listData)
}