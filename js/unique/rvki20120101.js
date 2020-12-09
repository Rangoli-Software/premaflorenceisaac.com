function getRavakaiFactory(sku) {
    var listData = [
    ];
    var basedir = '/products/artwear/ravakai/';
    var descMap = {
        CW1: 'Tangail Tradition'
    };
    return createStyleDescFactory(sku, basedir, listData, descMap);
}
