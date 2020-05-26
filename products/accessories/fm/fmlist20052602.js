var fmListData = [
['1a','#588E79','Patina',true],
['2','#993936','El Salva',true],
['3a','#DBD8C5','Moon Mist',true],
['4a','#914A50','Copper Rust',true],
['6','#1B1B19','Tuatara',true],
['7','#5D262B','Buccaneer',true],
['8','#AD4426','Paarl',true],
['9','#A59586','Zorba',true],
['10','#972328','Old Brick',true],
['11','#AC483C','Apple Blossom',true],
['12','#9BA060','Green Smoke',true],
['13','#4D5687','East Bay',true],
['14','#403248','BlackCurrant',true],
['15','#204565','Astronaut',true],
['16','#3A7681','Ming',true],
['17','#EEE8CE','Parchment',true],
];

function createFMDescriptor(fmRow) {
    var num = fmRow[ 0 ];
    const base = '/products/accessories/fm/';
    return {
        number: num,
        getImagePath: function() {
            return base + this.number + '.jpg';
        },
        getHue: function() {
            var hex = fmRow[1];
            return hexToH(hex);
        },
        getV: function() {
            var hex = fmRow[1];
            return hexToV(hex);
        }
    };
}
