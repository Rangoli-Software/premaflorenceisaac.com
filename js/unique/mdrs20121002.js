function getMadrasFactory(sku) {
    var listData = [
[1, ['1F', '1B'], '#EEE9E3', 'Merino', null],
[2, ['2F', '2B'], '#B41C48', 'Maroon Flush', null],
[3, ['3F', '3B'], '#7E1222', 'Merlot', null],
[4, ['4F', '4B'], '#F0BC02', 'Corn', null],
[5, ['5F', '5B'], '#D83C04', 'Grenadier', null],
[6, ['6F', '6B'], '#1B4572', 'Chathams Blue', null],
[7, ['7F', '7B'], '#2A4A63', 'San Juan', null, 'CW2'],
    ];
    var basedir = '/products/artwear/madras/';
    var descMap = {
        CW1: 'Tangail Tradition',
        CW2: 'Indigo In-Love',
        CW3: 'Jamdani Lace'
    };
    return createStyleDescFactory(sku, basedir, listData, descMap);
}
