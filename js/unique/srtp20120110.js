function getSariTopFactory(sku) {
    var listData = [
[1, ['S_1F', 'S_1B'], '#D7BA7E', 'Tumbleweed', {Name: 'Michel', Date: '2021-01'}, null, 'S'],
[2, ['S_2F', 'S_2B'], '#5D2F31', 'Buccaneer', null, null, 'S'],
[3, ['M_3F', 'M_3B'], '#413B3D', 'Tundora', null, null, 'M'],
[4, ['M_4F', 'M_4B'], '#CAC3B5', 'Ash', {Name: 'Michel', Date: '2021-01'}, null, 'M'],
[5, ['S_5F', 'S_5B'], '#222325', 'Shark', null, null, 'M'],
[6, ['M_6F', 'M_6B.1'], '#69707A', 'Nevada', null, null, 'M'],
[7, ['M_7F', 'M_7B'], '#875E2B', 'Kumera', null, null, 'M'],
[8, ['M_8F', 'M_8B'], '#BD8069', 'Contessa', null, null, 'M'],
[9, ['S_9F', 'S_9B'], '#A75056', 'Cadillac', null, null, 'S'],
    ];
    var basedir = '/products/artwear/sari/';
    var descMap = {
        CW1: 'Tangail Tradition'
    };
	var imgdim = {
		width: "1500",
		height: "1500"
	};
    return createStyleDescFactory(sku, basedir, listData, descMap, imgdim);
}
