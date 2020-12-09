function getLongOvertopFactory(sku) {
    var listData = [
    ];
    var basedir = '/products/artwear/lovrtop/';
    var descMap = {
        CW1: 'Tangail Tradition'
    };
    return createStyleDescFactory(sku, basedir, listData, descMap);
}
