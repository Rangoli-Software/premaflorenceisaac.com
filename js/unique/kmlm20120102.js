function getKamalamFactory(sku) {
    var listData = [
[1, ['1F', '1B'], '#6E4C5B', 'Ferra', null],
[2, ['2F', '2B'], '#B24958', 'Hippie Pink', null],
[3, ['3F', '3B'], '#555974', 'Comet', null],
[4, ['4F', '4B'], '#4F4B6B', 'Mulled Wine', null],
[5, ['5F', '5B'], '#D2898A', 'Puce', null],
[6, ['6F', '6B'], '#B49D91', 'Thatch', null],
    ];
    var basedir = '/products/artwear/kamalam/';
    var descMap = {
        CW1: 'Jamdani Lace'
    };
    return createStyleDescFactory(sku, basedir, listData, descMap);
}
