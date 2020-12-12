/*
function createNewFMListData(listData) {
	var res = [];
	for (var i = 0; i < listData.length; i++) {
		var row = [];
		row.push(i + 1);
		row.push(listData[i][0])
		row.push([listData[i][1]])
		row.push(listData[i][2])
		row.push(listData[i][3])
		if (listData[i][4] !== undefined) {
			row.push(listData[i][4]);
		}
		res.push(row);
	}
	return res;
}
*/

function createWovenCanvasFactory(base, product, listData, varPL) {
    return {
        listData: listData,
        product: product,
        base: base,
        varPL: varPL,
        getRowId: function(row) {
            return row[0];
        },
        createDescriptor: function(row) {
            var num = this.getRowId(row);
            var collected = row[ 4 ];
            var cwPrice;
            var cwDesc;
            if (row[5] === undefined) {
                cwPrice = this.product.inrPrice;
                cwDesc = 'Tangail';
            } else {
                var cw = row[5];
                var vpl = this.varPL[cw];
                cwPrice = vpl === undefined ? this.product.inrPrice : vpl;
                cwDesc = 'Indigo In-Love';
            }
            return {
                base: this.base,
                number: num,
                hsl: hexToHSL(row[2]),
                inrPrice: cwPrice,
                catDesc: cwDesc,
                collected: collected,
                getNumImages: function () {
                    return row[1].length;
                },
                getImagePath: function (idx) {
                    return this.base + row[1][idx] + '.jpg';
                },
                getHue: function() {
                    return this.hsl.h;
                },
                getSat: function() {
                    return this.hsl.s;
                },
                getV: function() {
                    return this.hsl.l;
                },
                getCWPrice: function () {
                    return this.inrPrice;
                },
                getCWDesc: function () {
                    return this.catDesc;
                },
                isAvailable: function() {
                    return this.collected === null;
                },
                getCollectedText: function() {
                    var res = "Collected";
                    var name = this.collected.Name;
                    if ( name !== undefined ) {
                        res += " by " + name;
                    }
                    var date = this.collected.Date;
                    if ( date !== undefined ) {
                        var dt = Date.parse(date);
                        res += " in " + nkdtformatter.format(dt);
                    }
                    return res;
                }
            };
        }
    };
}

var colListData = [
['501','/tbc/501.jpg','Black','12','30','Mar 2018','Elrun','',''],
['502','/tbc/502.jpg','Black','12','28.5','Mar 2018','','',''],
['503','/tbc/503.jpg','Black','12','30.75','Aug 2018','','',''],
['504','/tbc/504.jpg','Black','12','30.5','Dec 2018','','S',''],
['505','/tbc/505.jpg','White','12.4','32.1','Mar 2018','Kartik','',''],
['506','/tbc/506.jpg','White','11.9','27.6','Oct 2018','Aloke','',''],
['507','/tbc/507.jpg','Black','12.1','30.1','Feb 2018','','',''],
['508','/tbc/508.jpg','Black','11.9','30','Mar 2018','','',''],
['509','/tbc/509.jpg','Black','12','28','Jun 2018','Alessandro','',''],
['510','/tbc/510.jpg','White','12.1','30.6','Feb 2018','Catarina','',''],
['511','/tbc/511.jpg','Black','11.8','29.7','Oct 2018','Al','',''],
['512','/tbc/512.jpg','White','12.1','28.5','','','',''],
['513','/tbc/513.jpg','White','12','29.6','Mar 2018','Nir','',''],
['514','/tbc/514.jpg','White','12.1','31.7','Feb 2018','','',''],
['515','/tbc/515.jpg','White','11.9','29.9','Feb 2019','','L',''],
['516','/tbc/516.jpg','White','12.3','29.1','Aug 2018','Tom','',''],
['517','/tbc/517.jpg','Black','12.2','30.6','Sep 2018','','',''],
['518','/tbc/518.jpg','Black','11.9','30.8','Jun 2018','Nitika','',''],
['519','/tbc/519.jpg','Black','12','32.4','Mar 2018','Cecilie','',''],
['520','/tbc/520.jpg','Black','12.1','34.1','Jun 2018','Taran','',''],
['521','/tbc/521.jpg','Black','12','30.7','Mar 2018','','',''],
['522','/tbc/522.jpg','Black','12.1','30.4','Jun 2018','Rick','',''],
['523','/tbc/523.jpg','Black','12','31.3','Mar 2018','Nir','',''],
['524','/tbc/524.jpg','Black','12','32.1','Mar 2018','Elrun','',''],
['525','/tbc/525.jpg','White','12','31','Aug 2018','','',''],
['526','/tbc/526.jpg','Black','12','30','Apr 2018','Vikas','',''],
['527','/tbc/527.jpg','Black','12.1','25.5','Sep 2018','','',''],
['528','/tbc/528.jpg','White','12.1','28.8','','','',''],
['529','/tbc/529.jpg','White','12','30.9','Aug 2018','','',''],
['530','/tbc/530.jpg','Black','12','28','Aug 2018','','',''],
['531','/tbc/531.jpg','Black','12','30.4','Jun 2018','Kavi','',''],
['532','/tbc/532.jpg','Black','12.1','28','Aug 2018','','',''],
['533','/tbc/533.jpg','Black','12','29.5','Aug 2018','','',''],
['534','/tbc/534.jpg','Black','12','30','Aug 2018','','',''],
['535','/tbc/535.jpg','Black','12','32.8','Jun 2018','Kevin','',''],
['536','/tbc/536.jpg','Black','12','32.6','Jun 2018','Bimal','',''],
['537','/tbc/537.jpg','Black','12','32.8','Jun 2015','Brittany','',''],
['538','/tbc/538.jpg','Black','12','32.1','Aug 2018','','',''],
['539','/tbc/539.jpg','Black','12','33.1','Feb 2019','','XXL',''],
['540','/tbc/540.jpg','Black','12','34.5','Oct 2018','','',''],
['541','/tbc/541.jpg','White','12','33.4','Apr 2019','Sebastien','XXL',''],
['542','/tbc/542.jpg','Black','12','32.3','Nov 2018','','L',''],
['543','/tbc/543.jpg','Black','12','31.7','Dec 2018','','M',''],
['544','/tbc/544.jpg','Black','12.3','33.6','Jan 2019','','XXL',''],
['545','/tbc/545.jpg','Black','12','32.2','Nov 2018','','M',''],
['546','/tbc/546.jpg','Black','12','30.8','Sep 2020','Alok','L',''],
['547','/tbc/547.jpg','White','12.3','27.7','','','S',''],
['548','/tbc/548.jpg','Black','12.2','32.6','Oct 2018','','',''],
['549','/tbc/549.jpg','Black','12.1','29.9','Oct 2018','','',''],
['550','/tbc/550.jpg','Black','12.2','28','Sep 2019','','S',''],
['551','/tbc/551.jpg','Black','12.1','29.3','Nov 2018','','L',''],
['552','/tbc/552.jpg','Black','12.2','31.9','Mar 2019','','XL',''],
['553','/tbc/553.jpg','White','12.1','29.9','Feb 2019','','M',''],
['554','/tbc/554.jpg','Black','12.1','28.7','Feb 2020','','M',''],
['555','/tbc/555.jpg','White','12.3','30.2','','','',''],
['556','/tbc/556.jpg','White','12.1','29.2','','','',''],
['557','/tbc/557.jpg','White','12.4','28.2','','','',''],
['558','/tbc/558.jpg','White','12.2','29','Mar 2019','','M',''],
['559','/tbc/559.jpg','White','12.5','29.3','Oct 2019','','M',''],
['560','/tbc/560.jpg','White','12','30.2','Nov 2018','','',''],
['561','/tbc/561.jpg','White','12.1','33.9','Dec 2019','','XL',''],
['562','/tbc/562.jpg','Black','12.1','29.6','Dec 2019','','M',''],
['563','/tbc/563.jpg','White','12','31.3','Jan 2019','','L',''],
['564','/tbc/564.jpg','Black','12','34.2','Dec 2019','','XL',''],
['565','/tbc/565.jpg','Black','12.4','31.8','Mar 2019','','M',''],
['566','/tbc/566.jpg','White','12.1','36.8','','','',''],
['567','/tbc/567.jpg','White','12.2','35.4','','','',''],
['568','/tbc/568.jpg','Black','12.1','32.1','Nov 2018','','L',''],
['569','/tbc/569.jpg','White','12.1','30.3','','','S',''],
['570','/tbc/570.jpg','Black','12.1','29','Dec 2019','Marouane','S',''],
['571','/tbc/571.jpg','Black','12.3','33.3','Jan 2019','','XL',''],
['572','/tbc/572.jpg','White','12.1','31.9','Jan 2019','','XL',''],
['573','/tbc/573.jpg','White','12.1','30.3','Jan 2019','','M',''],
['574','/tbc/574.jpg','Black','12','31.4','Feb 2020','','M',''],
['575','/tbc/575.jpg','Black','12','33.9','Sep 2020','Alok','L',''],
['576','/tbc/576.jpg','Black','12','34.1','Dec 2019','','',''],
['577','/tbc/577.jpg','Black','12','34','Feb 2020','Abbie','XXL',''],
['578','/tbc/578.jpg','Black','12.2','29.9','Aug 2020','','M',''],
['579','/tbc/579.jpg','Black','12.1','28.8','Nov 2018','Kazimieras','',''],
['580','/tbc/580.jpg','Black','11.9','28','','','S',''],
['581','/tbc/581.jpg','Black','12.1','29.6','','','M',''],
['582','/tbc/582.jpg','Black','12','30.9','Sep 2019','Erich','',''],
['583','/tbc/583.jpg','Black','12.1','32.5','Feb 2020','','L',''],
['584','/tbc/584.jpg','Black','12.2','32.4','Mar 2019','','L',''],
['585','/tbc/585.jpg','Black','12','28.6','Dec 2019','','M',''],
['586','/tbc/586.jpg','Black','12','32','','','L',''],
['587','/tbc/587.jpg','Black','12.1','34.2','Sep 2020','Paul','',''],
['588','/tbc/588.jpg','Black','12','30.6','Sep 2019','Joerg','XL',''],
['589','/tbc/589.jpg','Black','12','30','Feb 2020','','M',''],
['590','/tbc/590.jpg','Black','12','31.6','Apr 2019','Kartik','L',''],
['591','/tbc/591.jpg','Black','12.1','34.4','Nov 2018','','',''],
['592','/tbc/592.jpg','White','12','32','','','S',''],
['593','/tbc/593.jpg','Black','12','34.5','Jan 2020','Muriel','XL',''],
['594','/tbc/594.jpg','White','12','31.5','Sep 2020','Indre','M',''],
['595','/tbc/595.jpg','White','12','32','Sep 2019','Erich','XL',''],
['596','/tbc/596.jpg','Black','12','34.5','Feb 2020','','XL',''],
['597','/tbc/597.jpg','White','12','32.5','Feb 2020','','XXL',''],
['598','/tbc/598.jpg','White','12','32','Dec 2019','','L',''],
['599','/tbc/599.jpg','White','12','30','Dec 2019','','M',''],
['600','/tbc/600.jpg','Black','12','36','','','XL',''],
['601','/tbc/601.jpg','White','12','33.5','Jan 2020','Muriel','XL',''],
['602','/tbc/602.jpg','White','12','30','','','M',''],
['603','/tbc/603.jpg','White','12','30.5','','','L',''],
['604','/tbc/604.jpg','White','12','34.5','Jan 2020','Muriel','XL',''],
['605','/tbc/605.jpg','White','12','28','','','M',''],
['606','/tbc/606.jpg','Black','12','33','Jan 2020','Muriel','XL',''],
['607','/tbc/607.jpg','Black','12','31','Dec 2019','','S',''],
['608','/tbc/608.jpg','Black','12','33','Dec 2019','','XL',''],
['609','/tbc/609.jpg','Black','12','31.5','Sep 2020','Indre','M',''],
['610','/tbc/610.jpg','Black','12','34','Sep 2020','Indre','XL',''],
['611','/tbc/611.jpg','Black','12','31','Jan 2020','','M',''],
['612','/tbc/612.jpg','Indigo','12','36','','','M',''],
['613','/tbc/613.jpg','White','12','36','','','XL',''],
['614','/tbc/614.jpg','White','12','32','Jun 2020','Mary','M',''],
['615','/tbc/615.jpg','White','12','33','Jan 2020','','L',''],
['616','/tbc/616.jpg','Black','12','30','','','S',''],
['617','/tbc/617.jpg','Black','12','31.5','Jan 2020','','M',''],
['618','/tbc/618.jpg','Black','12','30.5','','','S',''],
['619','/tbc/619.jpg','Black','12','34','','','XL',''],
['620','/tbc/620.jpg','Black','12','32','Feb 2020','Savitri','',''],
['621','/tbc/621.jpg','Black','12','32.5','','','XL',''],
['622','/tbc/622.jpg','Black','12','29','Feb 2020','','',''],
['623','/tbc/623.jpg','White','12','34.5','','','XL',''],
['624','/tbc/624.jpg','Black','12','32','','','L',''],
['625','/tbc/625.jpg','White','12','27','Feb 2020','Dan','',''],
['626','/tbc/626.jpg','White','12','31','','','M',''],
['627','/tbc/627.jpg','White','12','32.5','Aug 2020','','L',''],
['628','/tbc/628.jpg','White','12','34','','','',''],
['629','/tbc/629.jpg','Black','12','35.5','Mar 2020','Anne','',''],
['630','/tbc/630.jpg','Black','12','35.5','','','',''],
['631','/tbc/631.jpg','White','12','33','','','XL',''],
['632','/tbc/632.jpg','Indigo','12','34','','','L',''],
['633','/tbc/633.jpg','Black','12','30','','','','AV'],
['634','/tbc/634.jpg','Black','12','30','','','','AV'],
['635','/tbc/635.jpg','Black','12','30','','','','AV'],
['636','/tbc/636.jpg','Black','12','30','','','','AV'],
['637','/tbc/637.jpg','Black','12','30','','','','AV'],
['638','/tbc/638.jpg','Black','12','30','','','','AV / Missing'],
['639','/tbc/639.jpg','Black','12','30.5','Jul 2020','Alex','M',''],
['640','/tbc/640.jpg','Black','12','29','','','S',''],
['641','/tbc/641.jpg','Black','12','32','','','L',''],
['642','/tbc/642.jpg','Black','12','','','','XL',''],
['643','/tbc/643.jpg','Black','12','32','Oct 2020','Sahiba','M',''],
['644','/tbc/644.jpg','Black','12','','','','XL',''],
['645','/tbc/645.jpg','Black','12','32','','','M',''],
['646','/tbc/646.jpg','Black','12','','','','L',''],
['647','/tbc/647.jpg','Black','12','','','','XL',''],
['648','/tbc/648.jpg','White','12','','Jun 2020','Michel','L',''],
['649','/tbc/649.jpg','White','12','','Jul 2020','Alex','M',''],
['650','/tbc/650.jpg','White','12','30','','','S','TD'],
['651','/tbc/651.jpg','White','12','31','','','M','TD'],
['652','/tbc/652.jpg','White','12','31.5','Feb 2020','','',''],
['653','/tbc/653.jpg','Black','12','27.5','','','',''],
['654','/tbc/654.jpg','Black','12','33','','','XL','TD'],
['655','/tbc/655.jpg','Black','12','33.5','','','XL','TD'],
['656','/tbc/656.jpg','Black','12','30','Feb 2020','','',''],
['657','/tbc/657.jpg','Black','12','30','','','',''],
['658','/tbc/658.jpg','Black','12','30','','','',''],
['659','/tbc/659.jpg','Black','12','30','','','S','TD'],
['660','/tbc/660.jpg','Black','12','30','','','',''],
['661','/tbc/661.jpg','Black','12','30','','','',''],
['662','/tbc/662.jpg','Black','12','31','','','M','TD'],
['663','/tbc/663.jpg','Black','12','30.5','','','M','TD'],
['664','/tbc/664.jpg','Black','12','32.5','','','L','TD'],
['665','/tbc/665.jpg','Black','12','32.5','','','L','TD'],
['666','/tbc/666.jpg','Black','12','32','','','',''],
['667','/tbc/667.jpg','Black','12','32.5','','','',''],
['668','/tbc/668.jpg','White','12','31.5','','','L','TD'],
['669','/tbc/669.jpg','White','12','33','','','XL','TD'],
['670','/tbc/670.jpg','White','12','30','','','','AV'],
['671','/tbc/671.jpg','White','12','30','','','','AV'],
['672','/tbc/672.jpg','White','12','30','','','','AV'],
['673','/tbc/673.jpg','White','12','30','','','','AV'],
['674','/tbc/674.jpg','White','12','30','','','S','AV'],
['675','/tbc/675.jpg','White','12','34.7','','','',''],
['676','/tbc/676.jpg','White','12','32','','','',''],
['677','/tbc/677.jpg','White','12','32.6','','','',''],
['678','/tbc/678.jpg','White','12','31','','','',''],
['679','/tbc/679.jpg','White','12','31','Mar 2020','Vaishnavi','',''],
['680','/tbc/680.jpg','White','12','30.5','Sep 2020','Charlaine','',''],
['681','/tbc/681.jpg','White','12','30.5','','','',''],
['682','/tbc/682.jpg','White','12','31','','','',''],
['683','/tbc/683.jpg','White','12','30','Mar 2020','Anne','',''],
['684','/tbc/684.jpg','White','12','34','','','',''],
['685','/tbc/685.jpg','White','12','32','Sep 2020','Charlaine','',''],
['686','/tbc/686.jpg','White','12','33.3','','','',''],
['687','/tbc/687.jpg','Black','12','34','','','',''],
['688','/tbc/688.jpg','Black','12','32','','','',''],
['689','/tbc/689.jpg','Black','12','35.5','Mar 2020','Martine','',''],
['690','/tbc/690.jpg','Black','12','33','','','',''],
['691','/tbc/691.jpg','Black','12','31','','','',''],
['692','/tbc/692.jpg','Black','12','32.5','','','',''],
['693','/tbc/693.jpg','Black','12','32','','','',''],
['694','/tbc/694.jpg','Black','12','30.5','','','',''],
['695','/tbc/695.jpg','White','12','34.5','','','',''],
['696','/tbc/696.jpg','Black','12','30','','','',''],
['697','/tbc/697.jpg','Black','12','34.5','','','',''],
['698','/tbc/698.jpg','Black','12','34','','','',''],
['699','/tbc/699.jpg','Black','12','36.5','','','',''],
['700','/tbc/700.jpg','White','12','30','','','',''],
['701','/tbc/701.jpg','White','12','33','','','',''],
['702','/tbc/702.jpg','Black','12','30','','','',''],
['703','/tbc/703.jpg','White','12','29.5','','','',''],
['704','/tbc/704.jpg','White','12','31','','','',''],
['705','/tbc/705.jpg','White','12','29.5','','','',''],
['706','/tbc/706.jpg','Black','12','33','','','',''],
['707','/tbc/707.jpg','Black','12','29.5','Oct 2020','Sabina','','']
];

function createTShirtDescriptor(tshirtArr) {
    return {
        number: tshirtArr[ 0 ],
        imageURL: tshirtArr[ 1 ],
        fabricColour: tshirtArr[ 2 ],
        height: tshirtArr[ 3 ],
        width: tshirtArr[ 4 ],
        collDate: tshirtArr[ 5 ],
        collector: tshirtArr[ 6 ],
        size: tshirtArr[ 7 ],
        shop: tshirtArr[ 8 ]
    };
}
