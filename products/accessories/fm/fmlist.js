var fmListData = [
['6','#1B1B19','Tuatara'],
['7','#5D262B','Buccaneer'],
['8','#AD4426','Paarl'],
['9','#A59586','Zorba'],
['10','#972328','Old Brick'],
['11','#AC483C','Apple Blossom'],
['12','#9BA060','Green Smoke'],
['13','#4D5687','East Bay'],
['14','#403248','BlackCurrant'],
['15','#204565','Astronaut'],
['16','#3A7681','Ming'],
['17','#EEE8CE','Parchment'],
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
        }
    };
}
