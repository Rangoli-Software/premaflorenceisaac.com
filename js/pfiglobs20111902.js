const shopRevisionVersion = "2020111904";

const cmData = [
['0',['TESTIT0000Hi',1],],

['0.2',['AWTSHT1604Je',5000],],
['0.094',['KAGTIE1601Kh',3550],],
['0.36',['DPDYSF1501PT',5700],],
['0.0208333333333333',['CHMPGN1501JL',1750],],

['0.0095',['FACEMK2005Ta',700],],
['0.18',['NKSHMC1512PP',6000],],
['0.28',['NKSHMI1501PP',9150],],
['0.34',['NKSHMD1501PP',9720],],
['0.4',['NKSHMU1501PP',10150],],
['0.35',['NKSHDR1501Ta',13500],],
['0.35',['NKSDSL1701Ta',13500],],
['0.35',['LOTSDR1501Ja',22800],],

['0.1',['ANGKRT1601Kh',9900],],
['',['ARAMPA1601Kh',5400],],
['0.1',['KOHKRT1601Kh',7650],],
['0.15',['MNHTST2016SP',20000],],
['0.45',['MNHTPT2018SP',15000],],
['0.1375',['MAVKRT1601Kh',17100],],
['0.1375',['NARKRT1601Kh',9900],],
['0.15',['PNDPNT1601Kh',4350],],
['0.1875',['UBDPNT1601Kh',13500],],

['0.25',['LTSDSL1501Kh',5000],],
['0.1',['VAMPAL1708Kh',2900],],
['0.15',['LITLAY1708Vo',4000],],
['0.025',['CRPTOP1805Kh',1750],],
['0.04',['TNKTPS1902Kh',1750],],
['0.1',['TRPZTP1807Kh',2900],],
['0.12',['BERMPA1609Kh',2750],],
['0.12',['DRAWPA1609Kh',2750],],
['0.15',['WNDRPA1709Kh',3500],],
['0.25',['BALLPA1501Vo',4400],],
['',['JODHPA1708Kh',3000],],
['0.0375',['OVTPSH1501Vo',1700],],
['0.075',['OVTPLO1501Vo',2000],],

['',['BNCADR1505PT',29700],],
['',['BNCJKT1505PT',29700],],
['0.25',['NKSHMI1501PT',18000],],
['0.05',['CLPTRT1505PT',9900],],
['0.1',['CLPTRS1505PT',14400],],
['0.2',['EMLDRS1505PT',29700],],
['0.25',['HLNDRS1505PT',36000],],
['0.25',['JLTDRS1505PT',29700],],
['',['NRSSTP1505PT',9900],],
['',['NRSPNT1505PT',15750],],
['0.2',['OPHLDR1505PT',29700],],
['0.075',['PRTATP1505PT',9900],],
['0.35',['BKLLTS1505Je',36000],],
['0.2',['TTNDRS1505Je',29700],],
['0.2',['VLADRS1505PT',29700],],

['',['NKSDSL1701PT',17500],],

['0.15',['KBALPA1601Vo',1675],],
['0.06',['KDHRDR1601Rv',2600],],
['0.15',['FAIRST2011Rv',3250],],
['',['FAIRSK1601Rv',2025],],
['',['FAIRTP1601Je',1225],],
['0.2',['KGYPST1601Rv',6000],],
['0.05',['HLFPNT1601Kh',1125],],
['0.05',['HLFTPS1601Kh',1700],],
['0.05',['KLGTLY1601Rv',2250],],
['0.1',['PRNCDR1501Rv',2975],],
['',['KRACBK1501Je',975],],
['0.06',['KRAJPT1601Kh',1125],],
['0.1',['KRAJKT1601Rv',2975],],
['0.1',['YUVRTC1601Rv',2600],],
['0.1',['KWAVDR1601Rv',2600],],

['0.02',['KIDIKI1501Vi',1950],],
['',['KKOHKT1601Kh',2750],],
['',['DNOCPE1708AS',2000],]
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
['NKSDSL1701Ta',13500],
['LOTSDR1501Ja',22800],

['ANGKRT1601Kh',9900],
['ARAMPA1601Kh',5400],
['KOHKRT1601Kh',7650],
['MNHTST2016SP',20000],
['MNHTPT2018SP',15000],
['MAVKRT1601Kh',17100],
['NARKRT1601Kh',9900],
['PNDPNT1601Kh',4350],
['UBDPNT1601Kh',13500],

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
['VLADRS1505PT',29700],

['NKSDSL1701PT',17500],

['KBALPA1601Vo',1675],
['KDHRDR1601Rv',2600],
['FAIRST2011Rv',3250],
['FAIRSK1601Rv',2025],
['FAIRTP1601Je',1225],
['KGYPST1601Rv',6000],
['HLFPNT1601Kh',1125],
['HLFTPS1601Kh',1700],
['KLGTLY1601Rv',2250],
['PRNCDR1501Rv',2975],
['KRACBK1501Je',975],
['KRAJPT1601Kh',1125],
['KRAJKT1601Rv',2975],
['YUVRTC1601Rv',2600],
['KWAVDR1601Rv',2600],

['KIDIKI1501Vi',1950],
['KKOHKT1601Kh',2750],
['DNOCPE1708AS',2000]
];
