function getSariTopFactory(sku) {
    var listData = [
    ];
    var basedir = '/products/artwear/sari/';
    var descMap = {
        CW1: 'Tangail Tradition'
    };
    return createStyleDescFactory(sku, basedir, listData, descMap);
}
