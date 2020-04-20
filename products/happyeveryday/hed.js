var hed_lookbook = {
    styles: ['WNDRPA1709Kh','DRAWPA1609Kh','BERMPA1609Kh','CRPTOP1805Kh','TNKTPS1805Kh','VAMPAL1708Kh','TRPZTP1807Kh','LTSDSL1501Vo','LITLAY1708Vo','OVTPLO1501Vo','OVTPSH1501Vo','BALLPA1501Vo','JODHPA1708Kh'],
    looks: [
    {
        title:  '1.1',
        idxsfx: '01',
        styles: ['VAMPAL1708Kh','DRAWPA1609Kh']
    },
    {
        title:  '1.2',
        idxsfx: '02',
        styles: ['VAMPAL1708Kh','DRAWPA1609Kh','OVTPLO1501Vo']
    },
    {
        title:  '1.3',
        idxsfx: '03',
        styles: ['VAMPAL1708Kh','DRAWPA1609Kh','OVTPSH1501Vo']
    },
    {
        title:  '2.1',
        idxsfx: '15',
        styles: ['CRPTOP1805Kh','DRAWPA1609Kh']
    },
    {
        title:  '2.2',
        idxsfx: '16',
        styles: ['CRPTOP1805Kh','DRAWPA1609Kh','OVTPSH1501Vo']
    },
    {
        title:  '3',
        idxsfx: '14',
        styles: ['CRPTOP1805Kh']
    },
    {
        title:  '4',
        idxsfx: '11',
        styles: ['TRPZTP1807Kh','BERMPA1609Kh']
    },
    {
        title:  '5',
        idxsfx: '04',
        styles: ['CRPTOP1805Kh','BERMPA1609Kh']
    },
    {
        title:  '6',
        idxsfx: '06',
        styles: ['CRPTOP1805Kh','BALLPA1501Vo','OVTPSH1501Vo']
    },
    {
        title:  '7',
        idxsfx: '05',
        styles: ['CRPTOP1805Kh','WNDRPA1709Kh']
    },
    {
        title:  '8',
        idxsfx: '12',
        styles: ['TNKTPS1805Kh','BERMPA1609Kh']
    },
    {
        title:  '9',
        idxsfx: '07',
        styles: ['LITLAY1708Vo']
    },
    {
        title:  '10',
        idxsfx: '08',
        styles: ['LITLAY1708Vo','OVTPSH1501Vo']
    },
    {
        title:  '11',
        idxsfx: '09',
        styles: ['LTSDSL1501Vo']
    },
    {
        title:  '12',
        idxsfx: '10',
        styles: ['LTSDSL1501Vo','OVTPLO1501Vo']
    }    
    ],
    getStyle2Looks: function() {
    var res = {};
    for(var i = 0; i < this.looks.length; i++) {
        var lk = this.looks[i];
        for (var j = 0; j < lk.styles.length; j++) {
            var sty = lk.styles[ j ];
            var r = res[sty];
            if ( r  === undefined )   {
                res[sty] = [i];
            } else {
                r.push(i);
            }
        }
    }
    return res;
    },
    getRelatedStyles: function(sku) {
        switch (sku) {
            case 'WNDRPA1709Kh': return null;
            case 'DRAWPA1609Kh': return null;
            case 'BERMPA1609Kh': return [{look: 7, styles:['CRPTOP1805Kh']},{look: 6, styles:['TRPZTP1807Kh']}];
            case 'CRPTOP1805Kh': return [{look: 4, styles:['DRAWPA1609Kh','OVTPSH1501Vo']},{look: 7, styles:['BERMPA1609Kh']}];
            case 'VAMPAL1708Kh': return null;
            case 'TRPZTP1807Kh': return null;
            case 'LTSDSL1501Vo': return null;
            case 'LITLAY1708Vo': return null;
            case 'OVERTP1501Vo': return null;
            case 'OVTPSH1501Vo': return null;
            case 'BALLPA1501Vo': return null;
            case 'JODHPA1708Kh': return null;
        }
        return null;
    },
    getImagePath: function(i) {
        return "/products/happyeveryday/looks/lk-" + this.looks[i].idxsfx + ".jpg";
    },
    getImageLeft: function(i) {
        return "/products/happyeveryday/looks/ll-" + this.looks[i].idxsfx + ".jpg";
    }
};

var hed_catalog = {
    skus: ['WNDRPA1709Kh','DRAWPA1609Kh','BERMPA1609Kh','BALLPA1501Vo','JODHPA1708Kh','CRPTOP1805Kh','TNKTPS1805Kh','TRPZTP1807Kh','OVTPLO1501Vo','OVTPSH1501Vo','VAMPAL1708Kh','LTSDSL1501Vo','LITLAY1708Vo'],
    tops: ['CRPTOP1805Kh','TNKTPS1805Kh','TRPZTP1807Kh'],
    overtops: ['OVTPLO1501Vo','OVTPSH1501Vo'],
    dresses: ['VAMPAL1708Kh','LTSDSL1501Vo','LITLAY1708Vo'],
    pants: ['WNDRPA1709Kh','DRAWPA1609Kh','BERMPA1609Kh','BALLPA1501Vo','JODHPA1708Kh'],
    getCategory: function(sku) {
        if (this.tops.includes(sku)) {
            return "tops";
        }
        if (this.overtops.includes(sku)) {
            return "overtops";
        }
        if ( this.dresses.includes(sku) ) {
            return "dresses";
        }
        if ( this.pants.includes(sku)) {
            return "pants";
        }
        return null;
    },
    summaries: [
    {
        sku: 'BALLPA1501Vo',
        title: 'Balloon Flower Pants',
        url: "/products/happyeveryday/balloon.html",
        lede: 'Full length Harem Pants',
        images: ["/products/happyeveryday/balloon/magenta-f.jpg","/products/happyeveryday/balloon/magenta-r.jpg"]
    },
    {
        sku: 'BERMPA1609Kh',
        title: 'Wild Pansy Pants',
        url: "/products/happyeveryday/bermuda.html",
        lede: 'Calf length Bermuda pants',
        images: ["/products/happyeveryday/bermuda/magenta-f.jpg","/products/happyeveryday/bermuda/magenta-r.jpg"]
    },
    {
        sku: 'DRAWPA1609Kh',
        title: 'Gloriosa Tie Pants',
        url: "/products/happyeveryday/drawstring.html",
        lede: 'Wide legged drawstring pants',
        images: ["/products/happyeveryday/drawstring/tan-f.jpg","/products/happyeveryday/drawstring/tan-r.jpg"]
    },
    {
        sku: 'JODHPA1708Kh',
        title: 'Jodhpur Pants',
        url: "/products/happyeveryday/jodhpur.html",
        lede: 'Full length Jodhpur cut pants',
        images: ["/products/happyeveryday/jodhpur/tan-f.jpg","/products/happyeveryday/jodhpur/tan-r.jpg"]
    },
    {
        sku: 'WNDRPA1709Kh',
        title: 'Pineapple Lily Pants',
        url: "/products/happyeveryday/lily.html",
        lede: 'Drawstring  waist and hem',
        images: ["/products/happyeveryday/lily/magenta-f.jpg","/products/happyeveryday/lily/magenta-r.jpg"]
    },
    {
        sku: 'CRPTOP1805Kh',
        title: 'Bougainvillea Crop Top',
        url: "/products/happyeveryday/croptop.html",
        lede: '',
        images: ["/products/happyeveryday/croptop/magenta-f.jpg","/products/happyeveryday/croptop/magenta-r.jpg"]
    },
    {
        sku: 'TNKTPS1805Kh',
        title: 'Bougainvillea Top',
        url: "/products/happyeveryday/tanktop.html",
        lede: '',
        images: ["/products/happyeveryday/tanktop/magenta-f.jpg","/products/happyeveryday/tanktop/magenta-r.jpg"]
    },
    {
        sku: 'TRPZTP1807Kh',
        title: 'Lotus Wings Top',
        url: "/products/happyeveryday/wings.html",
        lede: '',
        images: ["/products/happyeveryday/wings/tan-f.jpg","/products/happyeveryday/wings/tan-r.jpg"]
    },
    {
        sku: 'OVTPLO1501Vo',
        title: 'Long Floating Overlayer',
        url: "/products/happyeveryday/lovertop.html",
        lede: '',
        images: ["/products/happyeveryday/lovertop/blue-f.jpg","/products/happyeveryday/lovertop/blue-r.jpg"]
    },
    {
        sku: 'OVTPSH1501Vo',
        title: 'Floating Overlayer',
        url: "/products/happyeveryday/shovertop.html",
        lede: '',
        images: ["/products/happyeveryday/shovertop/red-f.jpg","/products/happyeveryday/shovertop/red-r.jpg"]
    },
    {
        sku: 'VAMPAL1708Kh',
        title: 'Twiggy Side Slit Dress',
        url: "/products/happyeveryday/sideslit.html",
        lede: '',
        images: ["/products/happyeveryday/sideslit/tan-f.jpg","/products/happyeveryday/sideslit/tan-r.jpg"]
    },
    {
        sku: 'LTSDSL1501Vo',
        title: 'Butterfly Pea Shoulder String Dress',
        url: "/products/happyeveryday/shoulderstring.html",
        lede: '',
        images: ["/products/happyeveryday/shldrstrng/blue-f-1.jpg","/products/happyeveryday/shldrstrng/blue-r-1.jpg"]
    },
    {
        sku: 'LITLAY1708Vo',
        title: 'Love Power Layered Dress',
        url: "/products/happyeveryday/layer.html",
        lede: '',
        images: ["/products/happyeveryday/layer/red-f.jpg","/products/happyeveryday/layer/red-r.jpg"]
    },
    ],
    getSummary: function(sku) {
        for(var i = 0; i < this.summaries.length; i++) {
            if ( this.summaries[i].sku === sku ) {
                return this.summaries[i];
            }
        }
        return null;
    }
};

var hed_sizing_top = {
    sizeGeo: ["US", "UK", "EU", "IT", "GR", "JP", "RU"],
    capGeo: ["US", "UK / AU / NZ", "EU / FR", "IT", "GR", "JP", "RU"],
    chart: {
    S: {
        US: [8, 10],
        UK: [12, 14],
        EU: [40, 42],
        IT: [44, 46],
        GR: [38, 40],
        JP: [13, 15],
        RU: [46, 48]
    },
    M: {
        US: [10, 12],
        UK: [14, 16],
        EU: [42, 44],
        IT: [46, 48],
        GR: [40, 42],
        JP: [15, 17],
        RU: [48, 50]
    },
    L: {
        US: [12, 14],
        UK: [16, 18],
        EU: [44, 46],
        IT: [48, 50],
        GR: [42, 44],
        JP: [17, 19],
        RU: [50, 52]
    },
    XL: {
        US: [14, 16],
        UK: [18, 20],
        EU: [46, 48],
        IT: [50, 52],
        GR: [44, 46],
        JP: [19, 21],
        RU: [52, 54]
    },
    Free : {
        US: [2, 12],
        UK: [6, 16],
        EU: [34, 44],
        IT: [38, 48],
        GR: [32, 42],
        JP: [7, 17],
        RU: [40, 50]
    }
    }
}

var hed_sizing_pant = {
    sizeGeo: ["US", "UK", "EU", "IT", "GR", "JP", "RU"],
    capGeo: ["US", "UK / AU / NZ", "EU / FR", "IT", "GR", "JP", "RU"],
    chart: {
    S: {
        US: [2, 10],
        UK: [4, 12],
        EU: [34, 42],
        IT: [38, 46],
        GR: [32, 40],
        JP: [7, 15],
        RU: [40, 48]
    },
    M: {
        US: [4, 12],
        UK: [6, 14],
        EU: [36, 44],
        IT: [40, 48],
        GR: [34, 42],
        JP: [9, 17],
        RU: [42, 50]
    },
    L: {
        US: [6, 14],
        UK: [8, 16],
        EU: [38, 46],
        IT: [42, 50],
        GR: [36, 44],
        JP: [11, 19],
        RU: [44, 52]
    },
    XL: {
        US: [8, 16],
        UK: [10, 18],
        EU: [40, 48],
        IT: [44, 52],
        GR: [38, 46],
        JP: [13, 21],
        RU: [48, 54]
    },
    Free : {
        US: [4, 16],
        UK: [8, 18],
        EU: [36, 48],
        IT: [40, 52],
        GR: [34, 46],
        JP: [7, 21],
        RU: [40, 54]
    }
    }
}
