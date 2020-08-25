function createFaceMaskFactory(base, listData) {
    return {
        listData: listData,
        base: base,
        createDescriptor: function(row) {
            var num = row[ 0 ];
            var collected = row[ 3 ];
            return {
                base: this.base,
                number: num,
                hsl: hexToHSL(row[1]),
                collected: collected,
                getNumImages: function() {
                    return 1;
                },
                getImagePath: function(idx) {
                    return this.base + this.number + '.jpg';
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
                isAvailable: function() {
                    return this.collected === null;
                },
                getCollectedText: function() {
                    return "Collected";
                }
            };
        }
    };
}

function getFaceMaskFactory() {
var listData = [
['1b','#588E79','Patina',null],
['2a','#A35367','Brown Rust',null],
['3a','#DBD8C5','Moon Mist',null],
['4a','#914A50','Copper Rust',null],
['5','#7B8539','Pesto',null],
['6','#1B1B19','Tuatara',null],
['7','#5D262B','Buccaneer',null],
['8','#AD4426','Paarl',null],
['9','#7D6659','Russet',null],
['10','#972328','Old Brick',null],
['11a','#A6Ad53','Olive Green',null],
['12a','#9BA060','Green Smoke',null],
['13','#4D5687','East Bay',null],
['14','#403248','BlackCurrant',null],
['15','#204565','Astronaut',null],
['16','#3A7681','Ming',null],
['17','#EEE8CE','Parchment',null],
['18a','#595647','Soya Bean',null],
['19','#B4A23D','Roti',null],
['20','#1E6461','Green Pea',null],
['21','#BC7606','Pirate Gold',null],
['22','#CCD5C5','Pale Leaf',{Name: 'Tamara', Date: '2020-07'}],
['23','#424642','Cape Cod',null],
['24','#E2DCBF','Stark White',{Date: '2020-07'}],
['25','#EDF4E2','Loafer',null],
['26','#304970','San Juan',null],
['27','#E2B440','Anzac',null],
['28','#8E4563','Cannon Pink',null],
['29','#898b2d','',null],
['30','#EFF7EC','Feta',null],
['31','#A9AF98','Bud',null],
['32','#EEF7E6','Feta',null],
['33','#E36D7E','Deep Blush',null],
['34','#107586','Surfie Green',null],
['35','#A72850','Night Shadz',null],
['36','#32423D','Outer Space',null],
['37','#3A9C7A','Ocean Green',null],
];

    return createFaceMaskFactory('/products/accessories/fm/', listData)
}