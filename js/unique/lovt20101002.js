function getLongOvertopFactory(sku) {
    var listData = [
[1, ['S_1F', 'S_1B'], '#C06136', 'Tuscany', null, 'CW3', 'S'],
[2, ['S_2F', 'S_2B'], '#DB552A', 'Punch', null, 'CW3', 'S'],
[3, ['M_3F', 'M_3B'], '#5B963E', 'Apple', null, 'CW3', 'M'],
[4, ['L_4F', 'L_4B'], '#DDBF9B', 'Cameo', null, null, 'L'],
[5, ['S_5F', 'S_5B'], '#2073A3', 'Matisse', null, 'CW3', 'S'],
//[6, ['S_6F', 'S_6B'], '#A95558', 'Cadillac', null, null, 'S']
    ];
    var basedir = '/products/artwear/lovrtop/';
    var descMap = {
        CW1: 'Tangail Tradition',
        CW3: 'Jamdani Lace'
    };
	var imgdim = {
		width: "1500",
		height: "2111"
	};
    return createStyleDescFactory(sku, basedir, listData, descMap, imgdim);
}
