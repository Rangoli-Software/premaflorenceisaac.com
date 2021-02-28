function getKaftanFactory(sku) {
    var listData = [
[1, ['1F', '1B'], '#27283D', 'Ebony Clay', {Name: 'Ananda Shanti', Date: '2021-02'}],
[2, ['2F', '2B'], '#A25C6D', 'Tapestry', null],
[3, ['3F', '3B'], '#6D302B', 'Spice', null],
[4, ['4F', '4B'], '#C1A85F', 'Husk', null],
[5, ['5F', '5B'], '#6A3C3E', 'Congo Brown', null]
    ];
    var basedir = '/products/artwear/kaftan/';
    var descMap = {
        CW1: 'Tangail Tradition'
    };
	var imgdim = {
		width: "1200",
		height: "1883"
	};
    return createStyleDescFactory(sku, basedir, listData, descMap, imgdim);
}
