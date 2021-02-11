function getShortOvertopFactory(sku) {
    var listData = [
[1, ['S_1F', 'S_1B'], '#0F1314', 'Woodsmoke', null, null, 'S'],
[2, ['S_2F', 'S_2B'], '#BF4331', 'Mojo', null, null, 'S'],
[3, ['M_3F', 'M_3B'], '#AC6E4D', 'Santa Fe', null, null, 'M'],
[4, ['M_4F', 'M_4B'], '#B9AD85', 'Mongoose', null, null, 'M'],
[5, ['M_5F', 'M_5B'], '#7B9584', 'Spanish Green', null, null, 'M'],
[6, ['M_6F', 'M_6B'], '#7C5665', 'Falcon', {Name: 'Michel', Date: '2021-01'}, null, 'M']
    ];
    var basedir = '/products/artwear/sovrtop/';
    var descMap = {
        CW1: 'Tangail Tradition'
    };
	var imgdim = {
		width: "1500",
		height: "1454"
	};
    return createStyleDescFactory(sku, basedir, listData, descMap, imgdim);
}
