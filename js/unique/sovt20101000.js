function getShortOvertopFactory(sku) {
    var listData = [
    ];
    var basedir = '/products/artwear/sovrtop/';
    var descMap = {
        CW1: 'Tangail Tradition'
    };
    return createStyleDescFactory(sku, basedir, listData, descMap);
}
