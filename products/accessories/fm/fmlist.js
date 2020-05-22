var fmListData = [
['1'],
['2'],
['3'],
['4']
];

function createFMDescriptor(fmRow) {
    var num = fmRow[ 0 ];
    const base = '/products/accessories/fm/';
    return {
        number: num,
        getImagePath: function() {
            return base + this.number + '.jpg';
        }
    };
}
