function getToteFactory(sku) {
var listData = [
    [1, ["1"], "#AD546C", "Cadillac", null],
    [2, ["2"], "#A50124", "Carmine", null],
    [3, ["3"], "#CA250D", "Thunderbird", null],
    [4, ["4"], "#ED8810", "Zest", null],
    [5, ["5"], "#795A3B", "Yellow Metal", null],
    [6, ["6"], "#8F7D65", "Cement", null],
    [7, ["7"], "#B8AA77", "Mongoose", null],
    [8, ["8"], "#C59358", "Twine", null],
    [9, ["9"], "#0D5F79", "Atoll", null],
    [10, ["10"], "#212221", "Heavy Metal", null],
    [11, ["11"], "#E7E4DF", "Pearl Bush", null],
];
	var basedir = '/products/accessories/tote/';
    var descMap = {
        CW1: 'Art Wear'
    };
	var imgdim = {
		width: "1200",
		height: "2052"
	};
    return createStyleDescFactory(sku, basedir, listData, descMap, imgdim);
}

function getLilJholaFactory(sku) {
var listData = [
    [1, ["1F", "1B", "1R"], "#BB7333", "Copper", null],
    [2, ["2F", "2B", "2R"], "#CF6B3A", "Red Damask", null],
    [3, ["3F", "3B", "3R"], "#7C623F", "Yellow Metal", null],
    [4, ["4F", "4B", "4R"], "#40411A", "Thatch Green", null],
    [5, ["5F", "5B", "5R"], "#C4C383", "Pine Glade", null],
    [6, ["6F", "6B", "6R"], "#A02631", "Mexican Red", null],
];
	var basedir = '/products/accessories/liljhola/';
    var descMap = {
        CW1: 'Art Wear'
    };
	var imgdim = {
		width: "1200",
		height: "1200"
	};
    return createStyleDescFactory(sku, basedir, listData, descMap, imgdim);
}

function getTabletJholaFactory(sku) {
var listData = [
    [1, ["1F", "1B", "1R"], "#BB7333", "Copper", null],
];
	var basedir = '/products/accessories/tabletjhola/';
    var descMap = {
        CW1: 'Art Wear'
    };
	var imgdim = {
		width: "1000",
		height: "1000"
	};
    return createStyleDescFactory(sku, basedir, listData, descMap, imgdim);
}

function getMessengerJholaFactory(sku) {
var listData = [
    [1, ["1b"], "#588E79", "Patina", null],
];
	var basedir = '/products/accessories/messengerjhola/';
    var descMap = {
        CW1: 'Art Wear'
    };
	var imgdim = {
		width: "1000",
		height: "1000"
	};
    return createStyleDescFactory(sku, basedir, listData, descMap, imgdim);
}
