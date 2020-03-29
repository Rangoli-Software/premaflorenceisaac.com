var hed_lookbook = {
    styles: ['WNDRPA1709Kh','DRAWPA1609Kh','BERMPA1609Kh','CRPTOP1805Kh','VAMPAL1708Kh','TRPZTP1807Kh','LTSDSL1501Vo','LITLAY1708Vo','OVERTP1501Vo','OVTPSH1501Vo','BALLPA1501Vo','JODHPA1708Kh'],
    looks: [
    {
        title:  '1.1',
        idxsfx: '01',
        styles: ['VAMPAL1708Kh','DRAWPA1609Kh']
    },
    {
        title:  '1.2',
        idxsfx: '02',
        styles: ['VAMPAL1708Kh','DRAWPA1609Kh','OVERTP1501Vo']
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
        styles: ['CRPTOP1805Kh','JODHPA1708Kh']
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
        styles: ['','BERMPA1609Kh']
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
        styles: ['LTSDSL1501Vo','OVERTP1501Vo']
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
    }
};
