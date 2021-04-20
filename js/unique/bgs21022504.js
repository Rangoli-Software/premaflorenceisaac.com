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

function getPostmanJholaFactory(sku) {
var listData = [
    [1, ["1F", "1B", "1R"], "#6ACCC7", "Downy", null],
    [2, ["2F", "2B", "2R"], "#2F1B17", "Eclipse", null],
    [3, ["3F", "3B", "3R"], "#6ABABB", "Tradewind", null],
    [4, ["4F", "4B", "4R"], "#AC3D25", "Terracotta", null],
    [5, ["5F", "5B", "5R"], "#792320", "Metallic Copper", null],
    [6, ["6F", "6B", "6R"], "#C53F1E", "Thunderbird", null],
    [7, ["7F", "7B", "7R"], "#66633B", "Verdigris", null],
    [8, ["8F", "8B", "8R"], "#DE5024", "Punch", null],
    [9, ["9F", "9B", "9R"], "#2791A5", "Jelly Bean", null],
    [10, ["10F", "10B", "10R"], "#2D3919", "Mallard", null],
];
	var basedir = '/products/accessories/postman/';
    var descMap = {
        CW1: 'Art Wear'
    };
	var imgdim = {
		width: "1500",
		height: "1500"
	};
    return createStyleDescFactory(sku, basedir, listData, descMap, imgdim);
}

function getTabletJholaFactory(sku) {
var listData = [
    [1, ["1F", "1B", "1R"], "#DD725B", "Terracotta", null],
    [2, ["2F", "2B", "2R"], "#CB7552", "Raw Sienna", null],
    [3, ["3F", "3B", "3R"], "#C06548", "Crail", null],
    [4, ["4F", "4B", "4R"], "#6A362C", "Spice", null],
    [5, ["5F", "5B", "5R"], "#B46251", "Matrix", null],
    [6, ["6F", "6B", "6R"], "#6A272F", "Tawny Port", null],
    [7, ["7F", "7B", "7R"], "#798B42", "Sycamore", null],
    [8, ["8F", "8B", "8R"], "#BE7A68", "Contessa", null],
];
	var basedir = '/products/accessories/tablet/';
    var descMap = {
        CW1: 'Art Wear'
    };
	var imgdim = {
		width: "1500",
		height: "1500"
	};
    return createStyleDescFactory(sku, basedir, listData, descMap, imgdim);
}

function getLilaJholaFactory(sku) {
var listData = [
    [1, ["1F", "1B", "1R"], "#B57633", "Copper", null],
    [2, ["2F", "2B", "2R"], "#D9C499", "Pavlova", null],
    [3, ["3F", "3B", "3R"], "#C02F52", "Brick Red", null],
];
	var basedir = '/products/accessories/lila/';
    var descMap = {
        CW1: 'Art Wear'
    };
	var imgdim = {
		width: "1500",
		height: "1500"
	};
    return createStyleDescFactory(sku, basedir, listData, descMap, imgdim);
}
