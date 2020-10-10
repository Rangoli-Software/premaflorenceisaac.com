const shopRevisionVersion = "2020101001";

const cmData = [
['Test Live Trans','TESTIT0000Hi','0','0','','FALSE'],

['Woven Canvas on T','AWTSHT1604Je','0.2','1.2','/fabricart/TShirtColl.jpg','TRUE'],
['Kagera Tie','KAGTIE1601Kh','0.094','1.1','/products/ties/Black.jpg','FALSE'],
['Dip-Dye Scarf','DPDYSF1501PT','0.36','1.2','/products/scarves/TurbanMood.jpg','FALSE'],
['Champagne Bag','CHMPGN1501JL','0.0208333333333333','1.1','/products/home/cbaglite.jpg','FALSE'],


['Handloom Facemask','FACEMK2005Ta','0.0095','1.2','/products/accessories/facemask.html','TRUE'],
['Naksha Micro Skirt','NKSHMC1512PP','0.15','1.4','/products/artwear/naksha.html?s=c','TRUE'],
['Naksha Mini Skirt','NKSHMI1501PP','0.25','1.4','/products/artwear/naksha.html?s=m','TRUE'],
['Naksha Midi Skirt','NKSHMD1501PP','0.3','1.4','/products/artwear/naksha.html?s=d','TRUE'],
['Naksha Minuit Skirt','NKSHMU1501PP','0.4','1.4','/products/artwear/naksha.html?s=u','TRUE'],
['Tamarai Dress','NKSHDR1501Ta','0.35','1.2','/products/artwear/tamarai.html','TRUE'],
['Lotus Dress','LOTSDR1501Ja','0.35','1.2','/products/artwear/lotus.html','TRUE'],


['Angkor Kurta','ANGKRT1601Kh','0.1','1.1','/products/men/angkor.html','FALSE'],
['Arambol 3/4 Pants','ARAMPA1601Kh','','','/products/men/arambol.html','FALSE'],
['Koh Kurta','KOHKRT1601Kh','0.1','1.1','/products/men/koh.html','FALSE'],
['Mavericks Kurta','MAVKRT1601Kh','0.1375','1.1','/products/men/mavericks.html','FALSE'],
['Narigama Kurta','NARKRT1601Kh','0.1375','1.1','/products/men/narigama.html','FALSE'],
['Pondy Pant','PNDPNT1601Kh','0.15','1.2','/products/men/pondy.html','FALSE'],
['Ubud Pant','UBDPNT1601Kh','0.1875','1.2','/products/men/ubud.html','FALSE'],


['Butterfly Pea Shoulder String Dress','LTSDSL1501Kh','0.25','1.15','/products/happyeveryday/shoulderstring.html','FALSE'],
['Twiggy Side Slit Top','VAMPAL1708Kh','0.1','1.15','/products/happyeveryday/sideslit.html','FALSE'],
['Love Power Layered Dress','LITLAY1708Vo','0.15','1.15','/products/happyeveryday/layer.html','FALSE'],
['Bougainvillea Crop Top','CRPTOP1805Kh','0.025','1.15','/products/happyeveryday/croptop.html','FALSE'],
['Bougainvillea Top','TNKTPS1902Kh','0.04','1.15','/products/happyeveryday/tanktop.html','FALSE'],
['Lotus Wings Top','TRPZTP1807Kh','0.1','1.15','/products/happyeveryday/wings.html','FALSE'],
['Wild Pansy Pants','BERMPA1609Kh','0.12','1.15','/products/happyeveryday/bermuda.html','FALSE'],
['Gloriosa Tie Pants','DRAWPA1609Kh','0.12','1.15','/products/happyeveryday/drawstring.html','FALSE'],
['Pineapple Lily Pants','WNDRPA1709Kh','0.15','1.15','/products/happyeveryday/lily.html','FALSE'],
['Balloon Flower Pants','BALLPA1501Vo','0.25','1.15','/products/happyeveryday/balloon.html','FALSE'],
['Jodhpur Pants','JODHPA1708Kh','','','/products/happyeveryday/jodhpur.html','FALSE'],
['Floating Overlayer','OVTPSH1501Vo','0.0375','1.15','/products/happyeveryday/shovertop.html','FALSE'],
['Long Floating Overlayer','OVTPLO1501Vo','0.075','1.15','/products/happyeveryday/lovertop.html','FALSE'],


['Bianca Dress','BNCADR1505PT','','','/products/night/biancaD.html','FALSE'],
['Bianca Jacket','BNCJKT1505PT','','','/products/night/biancaJ.html','FALSE'],
['Celia Mini Skirt','NKSHMI1501PT','','','/products/night/celia.html','FALSE'],
['Cleopatra Top','CLPTRT1505PT','','','/products/night/cleoT.html','FALSE'],
['Cleopatra Shorts','CLPTRS1505PT','','','/products/night/cleoS.html','FALSE'],
['Emilia Dress','EMLDRS1505PT','','','/products/night/emilia.html','FALSE'],
['Helena Dress','HLNDRS1505PT','','','/products/night/helena.html','FALSE'],
['Juliet Dress','JLTDRS1505PT','','','/products/night/juliet.html','FALSE'],
['Nerissa Top','NRSSTP1505PT','','','/products/night/nerissaT.html','FALSE'],
['Nerissa Pants','NRSPNT1505PT','','','/products/night/nerissaP.html','FALSE'],
['Ophelia Dress','OPHLDR1505PT','','','/products/night/ophelia.html','FALSE'],
['Portia Top','PRTATP1505PT','','','/products/night/portia.html','FALSE'],
['Tamora Dress','BKLLTS1505Je','','','/products/night/tamora.html','FALSE'],
['Titania Dress','TTNDRS1505Je','','','/products/night/titania.html','FALSE'],
['Viola Dress','VLADRS1505PT','','','/products/night/viola.html','FALSE']
];

const varPLData = {
    NKSHMC1512PP: {
        CW1: 7800
    },
    NKSHMD1501PP: {
        CW1: 12625,
        CW2: 12625
    },
    NKSHMU1501PP: {
        CW1: 13650
    },
    NKSHDR1501Ta: {
        CW1: 17550
    }
}

const plData = [
['TESTIT0000Hi',1],

['AWTSHT1604Je',5000],
['KAGTIE1601Kh',3550],
['DPDYSF1501PT',5700],
['CHMPGN1501JL',1750],


['FACEMK2005Ta',700],
['NKSHMC1512PP',6000],
['NKSHMI1501PP',9150],
['NKSHMD1501PP',9720],
['NKSHMU1501PP',10150],
['NKSHDR1501Ta',13500],
['LOTSDR1501Ja',22800],


['ANGKRT1601Kh',9500],
['ARAMPA1601Kh',4000],
['KOHKRT1601Kh',7500],
['MAVKRT1601Kh',15000],
['NARKRT1601Kh',9500],
['PNDPNT1601Kh',3200],
['UBDPNT1601Kh',12000],


['LTSDSL1501Kh',5000],
['VAMPAL1708Kh',2900],
['LITLAY1708Vo',4000],
['CRPTOP1805Kh',1750],
['TNKTPS1902Kh',1750],
['TRPZTP1807Kh',2900],
['BERMPA1609Kh',2750],
['DRAWPA1609Kh',2750],
['WNDRPA1709Kh',3500],
['BALLPA1501Vo',4400],
['JODHPA1708Kh',3000],
['OVTPSH1501Vo',1700],
['OVTPLO1501Vo',2000],


['BNCADR1505PT',29700],
['BNCJKT1505PT',29700],
['NKSHMI1501PT',18000],
['CLPTRT1505PT',9900],
['CLPTRS1505PT',14400],
['EMLDRS1505PT',29700],
['HLNDRS1505PT',36000],
['JLTDRS1505PT',29700],
['NRSSTP1505PT',9900],
['NRSPNT1505PT',15750],
['OPHLDR1505PT',29700],
['PRTATP1505PT',9900],
['BKLLTS1505Je',36000],
['TTNDRS1505Je',29700],
['VLADRS1505PT',29700]
];
