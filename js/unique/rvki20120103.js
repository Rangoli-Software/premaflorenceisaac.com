function getRavakaiFactory(sku) {
    var listData = [
[1, ['S_1F', 'S_1B'], '#B95F78', 'Tapestry', null, null, 'S'],
[2, ['S_2F', 'S_2B'], '#EDBC60', 'Rajah', null, null, 'S'],
[3, ['M_3F', 'M_3B'], '#B7CB75', 'Wild Willow', null, null, 'M'],
[4, ['M_4F', 'M_4B'], '#AA5658', 'Cadillac', null, null, 'M'],
    ];
    var basedir = '/products/artwear/ravakai/';
    var descMap = {
        CW1: 'Tangail Tradition'
    };
	var imgdim = {
		width: "1500",
		height: "1330"
	};
    return createStyleDescFactory(sku, basedir, listData, descMap, imgdim);
}
