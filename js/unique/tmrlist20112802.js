function getTamaraiFactory(sku) {
    var listData = [
[1, ['1F', '1B'], '#1C272B', 'Ebony Clay', null, 'CW2'],
[2, ['2F', '2B'], '#1D1E2B', 'Steel Gray', {Name: 'Priyanka', Date: '2020-09'}, 'CW2'],
[3, ['3F', '3B'], '#EFF1F2', 'Porcelain', {Name: 'Michel', Date: '2020-11'}],
[4, ['4F', '4B'], '#E1E7B2', 'Caper', null],
[5, ['5F', '5B'], '#6C5C42', 'Tobacco', null],
[6, ['6F', '6B'], '#962E33', 'Stiletto', null],
    ];
    var basedir = '/products/artwear/tamarai/';
    var descMap = {
        CW1: 'Tangail Tradition',
        CW2: 'Indigo In-Love'
    };
    return createStyleDescFactory(sku, basedir, listData, descMap);
}
