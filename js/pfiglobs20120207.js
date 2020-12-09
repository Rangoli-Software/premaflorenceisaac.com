const shopRevisionVersion = "2020120207";

const pfiavG = {};
pfiavG.lineNames = ["Art Wear", "It's Magic", "Ce Soir", "Happy Everyday"];
pfiavG.lineMerchSKUs = [
	["NKSHDR1501Ta","LOTSDR1501Ja","LNKFTN1501Ja","SARITP1501Pa","MDRSTP1606PP","TRPZTP1807Pa","OVTPLO1501Pa","NKSHMU1501PP","NKSHMD1501PP","NKSHMI1501PP","NKSHMC1512PP","FACEMK2005Ta"], 
    ["KLGTLY1601Rv", "KGYPST1601Rv", "KRAJPT1601Kh", "FAIRST2011Rv", "KBALPA1601Vo", "KRAJKT1601Rv", "YUVRTC1601Rv", "HLFPNT1601Kh", "KIDIKI1501Vi", "PRNCDR1501Rv", "KWAVDR1601Rv", "KDHRDR1601Rv"], 
    ["HLNDRS1505PT", "JLTDRS1505PT", "BKLLTS1505Je"], 
    ["CRPTOP1805Kh", "VAMPAL1708Kh", "OVTPLO1501Vo", "BERMPA1609Kh", "LTSDSL1501Kh", "BALLPA1501Vo"]
];

const cmData = [
['Test Live Trans','TESTIT0000Hi','0','0','','FALSE'],

['Woven Canvas on T','AWTSHT1604Je','0.2','1.2','/fabricartT.html','TRUE'],
['Kagera Tie','KAGTIE1601Kh','0.094','1.1','/products/ties/kagera.html','FALSE'],
['Dip-Dye Scarf','DPDYSF1501PT','0.36','1.2','/products/scarves/dipdye.html','FALSE'],
['Champagne Bag','CHMPGN1501JL','0.0208333333333333','1.1','/products/home/champagnebag.html','FALSE'],

['Handloom Facemask','FACEMK2005Ta','0.0095','1.2','/products/accessories/facemask.html','TRUE'],
['Naksha Micro Skirt','NKSHMC1512PP','0.18','1.2','/products/artwear/naksha.html?s=c','TRUE'],
['Naksha Mini Skirt','NKSHMI1501PP','0.28','1.2','/products/artwear/naksha.html?s=m','TRUE'],
['Naksha Midi Skirt','NKSHMD1501PP','0.34','1.2','/products/artwear/naksha.html?s=d','TRUE'],
['Naksha Minuit Skirt','NKSHMU1501PP','0.4','1.2','/products/artwear/naksha.html?s=u','TRUE'],
['Trikona Dress','DELTDR1611PP','0.4','1.2','/products/artwear/trikona.html','TRUE'],
['Sari Top','SARITP1501Pa','0.4','1.2','/products/artwear/sari.html','TRUE'],
['Ravakai Top','JULITP1501Pa','0.4','1.2','/products/artwear/ravakai.html','TRUE'],
['Payara Top','TRPZTP1807Pa','0.4','1.2','/products/artwear/payara.html','TRUE'],
['Madras Top','MDRSTP1606PP','0.4','1.2','/products/artwear/madras.html','TRUE'],
['Seragu Overtop','OVTPSH1501Pa','0.4','1.2','/products/artwear/sovertop.html','TRUE'],
['Pallu Overtop','OVERTP1501Pa','0.4','1.2','/products/artwear/overtop.html','TRUE'],
['Aanchal Overtop','OVTPLO1501Pa','0.4','1.2','/products/artwear/lovertop.html','TRUE'],
['Tamarai Dress','NKSHDR1501Ta','0.35','1.2','/products/artwear/tamarai.html','TRUE'],
['Malligai Dress','NKSDSL1701Ta','0.35','1.2','/products/artwear/malligai.html','TRUE'],
['Kamalam Dress','LOTSDR1501Ja','0.35','1.2','/products/artwear/kamalam.html','TRUE'],
['Kaftan','LNKFTN1501Ja','0.35','1.2','/products/artwear/kaftan.html','TRUE'],

['Angkor Kurta','ANGKRT1601Kh','0.1','1.1','/products/men/angkor.html','FALSE'],
['Arambol 3/4 Pants','ARAMPA1601Kh','','','/products/men/arambol.html','FALSE'],
['Koh Kurta','KOHKRT1601Kh','0.1','1.1','/products/men/koh.html','FALSE'],
['Manhattan Shirt','MNHTST2016SP','0.15','1.1','/products/men/manhattanS.html','FALSE'],
['Manhattan Trouser','MNHTPT2018SP','0.45','1.1','/products/men/manhattanP.html','FALSE'],
['Mavericks Kurta','MAVKRT1601Kh','0.1375','1.1','/products/men/mavericks.html','FALSE'],
['Narigama Kurta','NARKRT1601Kh','0.1375','1.1','/products/men/narigama.html','FALSE'],
['Pondy Pant','PNDPNT1601Kh','0.15','1.2','/products/men/pondy.html','FALSE'],
['Ubud Pant','UBDPNT1601Kh','0.1875','1.2','/products/men/ubud.html','FALSE'],

['Shoulder String Dress','LTSDSL1501Kh','0.25','1.15','/products/happyeveryday/shoulderstring.html','FALSE'],
['Sideslit Top','VAMPAL1708Kh','0.1','1.15','/products/happyeveryday/sideslit.html','FALSE'],
['Layered Dress','LITLAY1708Vo','0.15','1.15','/products/happyeveryday/layer.html','FALSE'],
['Crop Top','CRPTOP1805Kh','0.025','1.15','/products/happyeveryday/croptop.html','FALSE'],
['Tank Top','TNKTPS1902Kh','0.04','1.15','/products/happyeveryday/tanktop.html','FALSE'],
['Wings Top','TRPZTP1807Kh','0.1','1.15','/products/happyeveryday/wings.html','FALSE'],
['Bermuda Pant','BERMPA1609Kh','0.12','1.15','/products/happyeveryday/bermuda.html','FALSE'],
['Drawstring Pant','DRAWPA1609Kh','0.12','1.15','/products/happyeveryday/drawstring.html','FALSE'],
['Lily Pant','WNDRPA1709Kh','0.15','1.15','/products/happyeveryday/lily.html','FALSE'],
['Harem Pant','BALLPA1501Vo','0.25','1.15','/products/happyeveryday/balloon.html','FALSE'],
['Jodhpur Pant','JODHPA1708Kh','','','/products/happyeveryday/jodhpur.html','FALSE'],
['Floating Overlayer','OVTPSH1501Vo','0.0375','1.15','/products/happyeveryday/shovertop.html','FALSE'],
['Floating Long Overlayer','OVTPLO1501Vo','0.075','1.15','/products/happyeveryday/lovertop.html','FALSE'],

['Bianca Dress','BNCADR1505PT','','1.15','/products/night/biancaD.html','FALSE'],
['Bianca Jacket','BNCJKT1505PT','','1.15','/products/night/biancaJ.html','FALSE'],
['Celia Mini Skirt','NKSHMI1501PT','0.25','1.15','/products/night/celia.html','FALSE'],
['Cleopatra Top','CLPTRT1505PT','0.05','1.15','/products/night/cleoT.html','FALSE'],
['Cleopatra Shorts','CLPTRS1505PT','0.1','1.15','/products/night/cleoS.html','FALSE'],
['Emilia Dress','EMLDRS1505PT','0.2','1.15','/products/night/emilia.html','FALSE'],
['Helena Dress','HLNDRS1505PT','0.25','1.15','/products/night/helena.html','FALSE'],
['Juliet Dress','JLTDRS1505PT','0.25','1.15','/products/night/juliet.html','FALSE'],
['Nerissa Top','NRSSTP1505PT','','1.15','/products/night/nerissaT.html','FALSE'],
['Nerissa Pant','NRSPNT1505PT','','1.15','/products/night/nerissaP.html','FALSE'],
['Ophelia Dress','OPHLDR1505PT','0.2','1.15','/products/night/ophelia.html','FALSE'],
['Portia Top','PRTATP1505PT','0.075','1.15','/products/night/portia.html','FALSE'],
['Tamora Dress','BKLLTS1505Je','0.35','1.15','/products/night/tamora.html','FALSE'],
['Titania Dress','TTNDRS1505Je','0.2','1.15','/products/night/titania.html','FALSE'],
['Viola Dress','VLADRS1505PT','0.2','1.15','/products/night/viola.html','FALSE'],

['Jasmine Dress','NKSDSL1701PT','','','','FALSE'],

['Balloon Pant','KBALPA1601Vo','0.15','1.15','/products/itsmagic/balloon.html','FALSE'],
['Flow Dress','KDHRDR1601Rv','0.06','1.15','/products/itsmagic/flow.html','FALSE'],
['Fairy Set','FAIRST2011Rv','0.15','1.15','/products/itsmagic/fairy.html','FALSE'],
['Fairy Skirt','FAIRSK1601Rv','','1.15','/products/itsmagic/fairyS.html','FALSE'],
['Fairy Top','FAIRTP1601Je','','1.15','/products/itsmagic/fairyT.html','FALSE'],
['Gypsy Set','KGYPST1601Rv','0.2','1.15','/products/itsmagic/gypsy.html','FALSE'],
['Half Pant','HLFPNT1601Kh','0.05','1.15','/products/itsmagic/halfpant.html','FALSE'],
['Half Pant Topsy','HLFTPS1601Kh','0.05','1.15','/products/itsmagic/halfpantT.html','FALSE'],
['Layer Dress','KLGTLY1601Rv','0.05','1.15','/products/itsmagic/layer.html','FALSE'],
['Princess Dress','PRNCDR1501Rv','0.1','1.15','/products/itsmagic/princess.html','FALSE'],
['Racerback Top','KRACBK1501Je','','1.15','/products/itsmagic/racerback.html','FALSE'],
['Full Pant','KRAJPT1601Kh','0.06','1.15','/products/itsmagic/fullpant.html','FALSE'],
['Royal Kurta','KRAJKT1601Rv','0.1','1.15','/products/itsmagic/royal.html','FALSE'],
['Prince Tunic','YUVRTC1601Rv','0.1','1.15','/products/itsmagic/prince.html','FALSE'],
['Wave Dress','KWAVDR1601Rv','0.1','1.15','/products/itsmagic/wave.html','FALSE'],

['Kidikini','KIDIKI1501Vi','0.02','1.15','/products/itsmagic/kidikini.html','FALSE'],
['Koh Kurta','KKOHKT1601Kh','','','/products/kids/koh.html','FALSE'],
['Dragon Cape','DNOCPE1708AS','','','/products/kids/dragon.html','FALSE']
];

const varPLData = {
    NKSHMC1512PP: {
        CW1: 9000
    },
    NKSHMD1501PP: {
        CW2: 13500
    },
    NKSHMU1501PP: {
        CW1: 15750
    },
    NKSHDR1501Ta: {
        CW2: 17550
    },
	MDRSTP1606PP: {
		CW2: 7500
	}
}

const plData = [
    ['TESTIT0000Hi', 1],

    ['AWTSHT1604Je', 5000],
    ['KAGTIE1601Kh', 3550],
    ['DPDYSF1501PT', 5700],
    ['CHMPGN1501JL', 1750],

    ['FACEMK2005Ta', 700],
    ['NKSHMC1512PP', 6000],
    ['NKSHMI1501PP', 9000],
    ['NKSHMD1501PP', 9720],
    ['NKSHMU1501PP', 10500],
    ['DELTDR1611PP', 15750],
    ['SARITP1501Pa', 3750],
    ['JULITP1501Pa', 4250],
    ['TRPZTP1807Pa', 5800],
    ['MDRSTP1606PP', 5000],
    ['OVTPSH1501Pa', 4350],
    ['OVERTP1501Pa', 4350],
    ['OVTPLO1501Pa', 6000],
    ['NKSHDR1501Ta', 13500],
    ['NKSDSL1701Ta', 13500],
    ['LOTSDR1501Ja', 30500],
    ['LNKFTN1501Ja', 17550],

    ['ANGKRT1601Kh', 9900],
    ['ARAMPA1601Kh', 5400],
    ['KOHKRT1601Kh', 7650],
    ['MNHTST2016SP', 20000],
    ['MNHTPT2018SP', 15000],
    ['MAVKRT1601Kh', 17100],
    ['NARKRT1601Kh', 9900],
    ['PNDPNT1601Kh', 4350],
    ['UBDPNT1601Kh', 13500],

    ['LTSDSL1501Kh', 5000],
    ['VAMPAL1708Kh', 2900],
    ['LITLAY1708Vo', 4000],
    ['CRPTOP1805Kh', 1800],
    ['TNKTPS1902Kh', 2000],
    ['TRPZTP1807Kh', 2900],
    ['BERMPA1609Kh', 2750],
    ['DRAWPA1609Kh', 2750],
    ['WNDRPA1709Kh', 3500],
    ['BALLPA1501Vo', 4400],
    ['JODHPA1708Kh', 3000],
    ['OVTPSH1501Vo', 1700],
    ['OVTPLO1501Vo', 2000],

    ['BNCADR1505PT', 29700],
    ['BNCJKT1505PT', 29700],
    ['NKSHMI1501PT', 18000],
    ['CLPTRT1505PT', 9900],
    ['CLPTRS1505PT', 14400],
    ['EMLDRS1505PT', 29700],
    ['HLNDRS1505PT', 36000],
    ['JLTDRS1505PT', 29700],
    ['NRSSTP1505PT', 9900],
    ['NRSPNT1505PT', 15750],
    ['OPHLDR1505PT', 29700],
    ['PRTATP1505PT', 9900],
    ['BKLLTS1505Je', 36000],
    ['TTNDRS1505Je', 29700],
    ['VLADRS1505PT', 29700],

    ['NKSDSL1701PT', 17500],

    ['KBALPA1601Vo', 1675],
    ['KDHRDR1601Rv', 2600],
    ['FAIRST2011Rv', 3250],
    ['FAIRSK1601Rv', 2025],
    ['FAIRTP1601Je', 1225],
    ['KGYPST1601Rv', 6000],
    ['HLFPNT1601Kh', 1125],
    ['HLFTPS1601Kh', 1700],
    ['KLGTLY1601Rv', 2250],
    ['PRNCDR1501Rv', 2975],
    ['KRACBK1501Je', 975],
    ['KRAJPT1601Kh', 1125],
    ['KRAJKT1601Rv', 2975],
    ['YUVRTC1601Rv', 2600],
    ['KWAVDR1601Rv', 2600],

    ['KIDIKI1501Vi', 1950],
    ['KKOHKT1601Kh', 2750],
    ['DNOCPE1708AS', 2000]
];
