function getFaceMaskFactory(sku) {
listData = [
    [1, ["1b"], "#588E79", "Patina", null],
    [2, ["2a"], "#A35367", "Brown Rust", null],
    [3, ["3a"], "#DBD8C5", "Moon Mist", null],
    [4, ["4a"], "#914A50", "Copper Rust", null],
    [5, ["5"], "#7B8539", "Pesto", null],
    [6, ["6"], "#1B1B19", "Tuatara", null, "CW3"],
    [7, ["7"], "#5D262B", "Buccaneer", null],
    [8, ["8"], "#AD4426", "Paarl", null],
    [9, ["9"], "#7D6659", "Russet", null],
    [10, ["10"], "#972328", "Old Brick", null],
    [11, ["11a"], "#A6Ad53", "Olive Green", null],
    [12, ["12a"], "#9BA060", "Green Smoke", null],
    [13, ["13"], "#4D5687", "East Bay", null],
    [14, ["14"], "#403248", "BlackCurrant", null],
    [15, ["15"], "#204565", "Astronaut", null],
    [16, ["16"], "#3A7681", "Ming", null],
    [17, ["17"], "#EEE8CE", "Parchment", null],
    [18, ["18a"], "#595647", "Soya Bean", null],
    [19, ["19"], "#B4A23D", "Roti", null],
    [20, ["20"], "#1E6461", "Green Pea", null],
    [21, ["21"], "#BC7606", "Pirate Gold", null],
    [22, ["22"], "#CCD5C5", "Pale Leaf", {
        "Name": "Tamara",
        "Date": "2020-07"
    }],
    [23, ["23"], "#424642", "Cape Cod", null, "CW3"],
    [24, ["24"], "#E2DCBF", "Stark White", {
        "Date": "2020-07"
    }],
    [25, ["25"], "#EDF4E2", "Loafer", null],
    [26, ["26"], "#304970", "San Juan", null],
    [27, ["27"], "#E2B440", "Anzac", {
        "Name": "Indre",
        "Date": "2020-09"
    }],
    [28, ["28"], "#8E4563", "Cannon Pink", null],
    [29, ["29"], "#898b2d", "", null],
    [30, ["30"], "#EFF7EC", "Feta", null],
    [31, ["31"], "#A9AF98", "Bud", null],
    [32, ["32"], "#EEF7E6", "Feta", null],
    [33, ["33"], "#E36D7E", "Deep Blush", null],
    [34, ["34"], "#107586", "Surfie Green", null, "CW2"],
    [35, ["35"], "#A72850", "Night Shadz", null, "CW2"],
    [36, ["36"], "#32423D", "Outer Space", null, "CW2"],
    [37, ["37"], "#3A9C7A", "Ocean Green", null, "CW2"]
];
	var basedir = '/products/accessories/fm/';
    var descMap = {
        CW1: 'Art Wear',
        CW2: 'Cruise',
        CW3: 'Ce Soir',
    };
	var imgdim = {
		width: "1000",
		height: "1000"
	};
    return createStyleDescFactory(sku, basedir, listData, descMap, imgdim);
}
