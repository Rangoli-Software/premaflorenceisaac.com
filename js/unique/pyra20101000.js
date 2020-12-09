function getPayaraFactory(sku) {
    var listData = [
[1, ['1F', '1B'], '#1C1C1A', 'Tuatara', null],
[2, ['2F', '2B'], '#55B4DC', 'Shakespeare', null],
[3, ['3F', '3B'], '#51141C', 'Heath', null],
[4, ['4F', '4B'], '#4C393A', 'Matterhorn', null],
[5, ['5F', '5B'], '#4F1821', 'Wine Berry', null],
[6, ['6F', '6B'], '#543528', 'Saddle', null],
    ];
    var basedir = '/products/artwear/payara/';
    var descMap = {
        CW1: 'Tangail Tradition'
    };
    return createStyleDescFactory(sku, basedir, listData, descMap);
}
