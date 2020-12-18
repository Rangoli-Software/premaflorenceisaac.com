function createWovenCanvasItemFactory(product, varPL, descMap) {
	return {
		product: product,
		varPL: varPL,
		descMap: descMap,
		getPrice: function (cw) {
			if (cw === undefined || this.varPL === undefined || cw === null) {
				return this.product.inrPrice;
			}
			return this.varPL[cw];
		},
		getCategoryDescription: function (cw) {
			if (cw === undefined || cw === null) {
				return this.descMap['CW1']
			}
			return this.descMap[cw];
		},
		getFGColor: function (row) {
			var fabricColor = row[8].color;
			if ( fabricColor === "White")  {
				return "black";
			} else {
				return "white";
			}
		},
		getBGColor: function (row) {
			var fabricColor = row[8].color;
			if ( fabricColor === "White")  {
				return "white";
			} else if (fabricColor === "Black") {
				return "black"
			} else {
				return "#13004C";
			}
		},
		getDescription: function (row) {
			return "# " + row[0] + '<br>' +
				row[7].Width + " cm. x " + row[7].Height + " cm.";
		},
		getGarmentColour: function(row) {
			return row[8].color;
		},
		getCurated: function(row){
			return row[9];
		}
	}
}

function createWovenCanvasStyleDescFactory(sku, basedir, listdata, descmap) {
	var product = pfiavG.productCatalog.getProduct(sku);
	var varPL = varPLData[sku];
	var cwFactory = createWovenCanvasItemFactory(product, varPL, descmap);
	return createUIDescriptorFactory(basedir, product, listdata, cwFactory);
}

function getWovenCanvasFactory(sku) {
var listData = [
    ["501", ["501"], "", "", { "Date": "2018-03", "Name": "Elrun" }, "CW2", null, { "Height": "12", "Width": "30" }, { "color": "Black" }, null],
    ["502", ["502"], "", "", { "Date": "2018-03" }, "CW2", null, { "Height": "12", "Width": "28.5" }, { "color": "Black" }, null],
    ["503", ["503"], "", "", { "Date": "2018-08" }, "CW2", null, { "Height": "12", "Width": "30.75" }, { "color": "Black" }, null],
    ["504", ["504"], "", "", { "Date": "2018-12" }, "CW2", "S", { "Height": "12", "Width": "30.5" }, { "color": "Black", "size": "S" }, null],
    ["505", ["505"], "", "", { "Date": "2018-03", "Name": "Kartik" }, "CW1", null, { "Height": "12.4", "Width": "32.1" }, { "color": "White" }, null],
    ["506", ["506"], "", "", { "Date": "2018-10", "Name": "Aloke" }, "CW1", null, { "Height": "11.9", "Width": "27.6" }, { "color": "White" }, null],
    ["507", ["507"], "", "", { "Date": "2018-02" }, "CW2", null, { "Height": "12.1", "Width": "30.1" }, { "color": "Black" }, null],
    ["508", ["508"], "", "", { "Date": "2018-03" }, "CW2", null, { "Height": "11.9", "Width": "30" }, { "color": "Black" }, null],
    ["509", ["509"], "", "", { "Date": "2018-06", "Name": "Alessandro" }, "CW2", null, { "Height": "12", "Width": "28" }, { "color": "Black" }, null],
    ["510", ["510"], "", "", { "Date": "2018-02", "Name": "Catarina" }, "CW1", null, { "Height": "12.1", "Width": "30.6" }, { "color": "White" }, null],
    ["511", ["511"], "", "", { "Date": "2018-10", "Name": "Al" }, "CW2", null, { "Height": "11.8", "Width": "29.7" }, { "color": "Black" }, null],
    ["512", ["512"], "", "", null, "CW1", null, { "Height": "12.1", "Width": "28.5" }, { "color": "White" }, null],
    ["513", ["513"], "", "", { "Date": "2018-03", "Name": "Nir" }, "CW1", null, { "Height": "12", "Width": "29.6" }, { "color": "White" }, null],
    ["514", ["514"], "", "", { "Date": "2018-02" }, "CW1", null, { "Height": "12.1", "Width": "31.7" }, { "color": "White" }, null],
    ["515", ["515"], "", "", { "Date": "2019-02" }, "CW1", "L", { "Height": "11.9", "Width": "29.9" }, { "color": "White", "size": "L" }, null],
    ["516", ["516"], "", "", { "Date": "2018-08", "Name": "Tom" }, "CW1", null, { "Height": "12.3", "Width": "29.1" }, { "color": "White" }, null],
    ["517", ["517"], "", "", { "Date": "2018-09" }, "CW2", null, { "Height": "12.2", "Width": "30.6" }, { "color": "Black" }, null],
    ["518", ["518"], "", "", { "Date": "2018-06", "Name": "Nitika" }, "CW2", null, { "Height": "11.9", "Width": "30.8" }, { "color": "Black" }, null],
    ["519", ["519"], "", "", { "Date": "2018-03", "Name": "Cecilie" }, "CW2", null, { "Height": "12", "Width": "32.4" }, { "color": "Black" }, null],
    ["520", ["520"], "", "", { "Date": "2018-06", "Name": "Taran" }, "CW2", null, { "Height": "12.1", "Width": "34.1" }, { "color": "Black" }, null],
    ["521", ["521"], "", "", { "Date": "2018-03" }, "CW2", null, { "Height": "12", "Width": "30.7" }, { "color": "Black" }, null],
    ["522", ["522"], "", "", { "Date": "2018-06", "Name": "Rick" }, "CW2", null, { "Height": "12.1", "Width": "30.4" }, { "color": "Black" }, null],
    ["523", ["523"], "", "", { "Date": "2018-03", "Name": "Nir" }, "CW2", null, { "Height": "12", "Width": "31.3" }, { "color": "Black" }, null],
    ["524", ["524"], "", "", { "Date": "2018-03", "Name": "Elrun" }, "CW2", null, { "Height": "12", "Width": "32.1" }, { "color": "Black" }, null],
    ["525", ["525"], "", "", { "Date": "2018-08" }, "CW1", null, { "Height": "12", "Width": "31" }, { "color": "White" }, null],
    ["526", ["526"], "", "", { "Date": "2018-04", "Name": "Vikas" }, "CW2", null, { "Height": "12", "Width": "30" }, { "color": "Black" }, null],
    ["527", ["527"], "", "", { "Date": "2018-09" }, "CW2", null, { "Height": "12.1", "Width": "25.5" }, { "color": "Black" }, null],
    ["528", ["528"], "", "", null, "CW1", null, { "Height": "12.1", "Width": "28.8" }, { "color": "White" }, null],
    ["529", ["529"], "", "", { "Date": "2018-08" }, "CW1", null, { "Height": "12", "Width": "30.9" }, { "color": "White" }, null],
    ["530", ["530"], "", "", { "Date": "2018-08" }, "CW2", null, { "Height": "12", "Width": "28" }, { "color": "Black" }, null],
    ["531", ["531"], "", "", { "Date": "2018-06", "Name": "Kavi" }, "CW2", null, { "Height": "12", "Width": "30.4" }, { "color": "Black" }, null],
    ["532", ["532"], "", "", { "Date": "2018-08" }, "CW2", null, { "Height": "12.1", "Width": "28" }, { "color": "Black" }, null],
    ["533", ["533"], "", "", { "Date": "2018-08" }, "CW2", null, { "Height": "12", "Width": "29.5" }, { "color": "Black" }, null],
    ["534", ["534"], "", "", { "Date": "2018-08" }, "CW2", null, { "Height": "12", "Width": "30" }, { "color": "Black" }, null],
    ["535", ["535"], "", "", { "Date": "2018-06", "Name": "Kevin" }, "CW2", null, { "Height": "12", "Width": "32.8" }, { "color": "Black" }, null],
    ["536", ["536"], "", "", { "Date": "2018-06", "Name": "Bimal" }, "CW2", null, { "Height": "12", "Width": "32.6" }, { "color": "Black" }, null],
    ["537", ["537"], "", "", { "Date": "2018-06", "Name": "Brittany" }, "CW2", null, { "Height": "12", "Width": "32.8" }, { "color": "Black" }, null],
    ["538", ["538"], "", "", { "Date": "2018-08" }, "CW2", null, { "Height": "12", "Width": "32.1" }, { "color": "Black" }, null],
    ["539", ["539"], "", "", { "Date": "2019-02" }, "CW2", "XXL", { "Height": "12", "Width": "33.1" }, { "color": "Black", "size": "XXL" }, null],
    ["540", ["540"], "", "", { "Date": "2018-10" }, "CW2", null, { "Height": "12", "Width": "34.5" }, { "color": "Black" }, null],
    ["541", ["541"], "", "", { "Date": "2019-04", "Name": "Sebastien" }, "CW1", "XXL", { "Height": "12", "Width": "33.4" }, { "color": "White", "size": "XXL" }, null],
    ["542", ["542"], "", "", { "Date": "2018-11" }, "CW2", "L", { "Height": "12", "Width": "32.3" }, { "color": "Black", "size": "L" }, null],
    ["543", ["543"], "", "", { "Date": "2018-12" }, "CW2", "M", { "Height": "12", "Width": "31.7" }, { "color": "Black", "size": "M" }, null],
    ["544", ["544"], "", "", { "Date": "2019-01" }, "CW2", "XXL", { "Height": "12.3", "Width": "33.6" }, { "color": "Black", "size": "XXL" }, null],
    ["545", ["545"], "", "", { "Date": "2018-11" }, "CW2", "M", { "Height": "12", "Width": "32.2" }, { "color": "Black", "size": "M" }, null],
    ["546", ["546"], "", "", { "Date": "2020-09", "Name": "Alok" }, "CW2", "L", { "Height": "12", "Width": "30.8" }, { "color": "Black", "size": "L" }, null],
    ["547", ["547"], "", "", null, "CW3", "S", { "Height": "12.3", "Width": "27.7" }, { "color": "Indigo", "size": "S" }, null],
    ["548", ["548"], "", "", { "Date": "2018-10" }, "CW2", null, { "Height": "12.2", "Width": "32.6" }, { "color": "Black" }, null],
    ["549", ["549"], "", "", { "Date": "2018-10" }, "CW2", null, { "Height": "12.1", "Width": "29.9" }, { "color": "Black" }, null],
    ["550", ["550"], "", "", { "Date": "2019-09" }, "CW2", "S", { "Height": "12.2", "Width": "28" }, { "color": "Black", "size": "S" }, null],
    ["551", ["551"], "", "", { "Date": "2018-11" }, "CW2", "L", { "Height": "12.1", "Width": "29.3" }, { "color": "Black", "size": "L" }, null],
    ["552", ["552"], "", "", { "Date": "2019-03" }, "CW2", "XL", { "Height": "12.2", "Width": "31.9" }, { "color": "Black", "size": "XL" }, null],
    ["553", ["553"], "", "", { "Date": "2019-02" }, "CW1", "M", { "Height": "12.1", "Width": "29.9" }, { "color": "White", "size": "M" }, null],
    ["554", ["554"], "", "", { "Date": "2020-02" }, "CW2", "M", { "Height": "12.1", "Width": "28.7" }, { "color": "Black", "size": "M" }, null],
    ["555", ["555"], "", "", null, "CW1", null, { "Height": "12.3", "Width": "30.2" }, { "color": "White" }, null],
    ["556", ["556"], "", "", null, "CW1", null, { "Height": "12.1", "Width": "29.2" }, { "color": "White" }, null],
    ["557", ["557"], "", "", null, "CW1", null, { "Height": "12.4", "Width": "28.2" }, { "color": "White" }, null],
    ["558", ["558"], "", "", { "Date": "2019-03" }, "CW1", "M", { "Height": "12.2", "Width": "29" }, { "color": "White", "size": "M" }, null],
    ["559", ["559"], "", "", { "Date": "2019-10" }, "CW1", "M", { "Height": "12.5", "Width": "29.3" }, { "color": "White", "size": "M" }, null],
    ["560", ["560"], "", "", { "Date": "2018-11" }, "CW1", null, { "Height": "12", "Width": "30.2" }, { "color": "White" }, null],
    ["561", ["561"], "", "", { "Date": "2019-12" }, "CW1", "XL", { "Height": "12.1", "Width": "33.9" }, { "color": "White", "size": "XL" }, null],
    ["562", ["562"], "", "", { "Date": "2019-12" }, "CW2", "M", { "Height": "12.1", "Width": "29.6" }, { "color": "Black", "size": "M" }, null],
    ["563", ["563"], "", "", { "Date": "2019-01" }, "CW1", "L", { "Height": "12", "Width": "31.3" }, { "color": "White", "size": "L" }, null],
    ["564", ["564"], "", "", { "Date": "2019-12" }, "CW2", "XL", { "Height": "12", "Width": "34.2" }, { "color": "Black", "size": "XL" }, null],
    ["565", ["565"], "", "", { "Date": "2019-03" }, "CW2", "M", { "Height": "12.4", "Width": "31.8" }, { "color": "Black", "size": "M" }, null],
    ["566", ["566"], "", "", null, "CW1", null, { "Height": "12.1", "Width": "36.8" }, { "color": "White" }, null],
    ["567", ["567"], "", "", null, "CW1", null, { "Height": "12.2", "Width": "35.4" }, { "color": "White" }, null],
    ["568", ["568"], "", "", { "Date": "2018-11" }, "CW2", "L", { "Height": "12.1", "Width": "32.1" }, { "color": "Black", "size": "L" }, null],
    ["569", ["569"], "", "", null, "CW1", "S", { "Height": "12.1", "Width": "30.3" }, { "color": "White", "size": "S" }, null],
    ["570", ["570"], "", "", { "Date": "2019-12", "Name": "Marouane" }, "CW2", "S", { "Height": "12.1", "Width": "29" }, { "color": "Black", "size": "S" }, null],
    ["571", ["571"], "", "", { "Date": "2019-01" }, "CW2", "XL", { "Height": "12.3", "Width": "33.3" }, { "color": "Black", "size": "XL" }, null],
    ["572", ["572"], "", "", { "Date": "2019-01" }, "CW1", "XL", { "Height": "12.1", "Width": "31.9" }, { "color": "White", "size": "XL" }, null],
    ["573", ["573"], "", "", { "Date": "2019-01" }, "CW1", "M", { "Height": "12.1", "Width": "30.3" }, { "color": "White", "size": "M" }, null],
    ["574", ["574"], "", "", { "Date": "2020-02" }, "CW2", "M", { "Height": "12", "Width": "31.4" }, { "color": "Black", "size": "M" }, null],
    ["575", ["575"], "", "", { "Date": "2020-09", "Name": "Alok" }, "CW2", "L", { "Height": "12", "Width": "33.9" }, { "color": "Black", "size": "L" }, null],
    ["576", ["576"], "", "", { "Date": "2019-12" }, "CW2", null, { "Height": "12", "Width": "34.1" }, { "color": "Black" }, null],
    ["577", ["577"], "", "", { "Date": "2020-02", "Name": "Abbie" }, "CW2", "XXL", { "Height": "12", "Width": "34" }, { "color": "Black", "size": "XXL" }, null],
    ["578", ["578"], "", "", { "Date": "2020-08" }, "CW2", "M", { "Height": "12.2", "Width": "29.9" }, { "color": "Black", "size": "M" }, null],
    ["579", ["579"], "", "", { "Date": "2018-11", "Name": "Kazimieras" }, "CW2", null, { "Height": "12.1", "Width": "28.8" }, { "color": "Black" }, null],
    ["580", ["580"], "", "", null, "CW2", "S", { "Height": "11.9", "Width": "28" }, { "color": "Black", "size": "S" }, null],
    ["581", ["581"], "", "", null, "CW2", "M", { "Height": "12.1", "Width": "29.6" }, { "color": "Black", "size": "M" }, null],
    ["582", ["582"], "", "", { "Date": "2019-09", "Name": "Erich" }, "CW2", null, { "Height": "12", "Width": "30.9" }, { "color": "Black" }, null],
    ["583", ["583"], "", "", { "Date": "2020-02" }, "CW2", "L", { "Height": "12.1", "Width": "32.5" }, { "color": "Black", "size": "L" }, null],
    ["584", ["584"], "", "", { "Date": "2019-03" }, "CW2", "L", { "Height": "12.2", "Width": "32.4" }, { "color": "Black", "size": "L" }, null],
    ["585", ["585"], "", "", { "Date": "2019-12" }, "CW2", "M", { "Height": "12", "Width": "28.6" }, { "color": "Black", "size": "M" }, null],
    ["586", ["586"], "", "", null, "CW2", "L", { "Height": "12", "Width": "32" }, { "color": "Black", "size": "L" }, null],
    ["587", ["587"], "", "", { "Date": "2020-09", "Name": "Paul" }, "CW2", null, { "Height": "12.1", "Width": "34.2" }, { "color": "Black" }, null],
    ["588", ["588"], "", "", { "Date": "2019-09", "Name": "Joerg" }, "CW2", "XL", { "Height": "12", "Width": "30.6" }, { "color": "Black", "size": "XL" }, null],
    ["589", ["589"], "", "", { "Date": "2020-02" }, "CW2", "M", { "Height": "12", "Width": "30" }, { "color": "Black", "size": "M" }, null],
    ["590", ["590"], "", "", { "Date": "2019-04", "Name": "Kartik" }, "CW2", "L", { "Height": "12", "Width": "31.6" }, { "color": "Black", "size": "L" }, null],
    ["591", ["591"], "", "", { "Date": "2018-11" }, "CW2", null, { "Height": "12.1", "Width": "34.4" }, { "color": "Black" }, null],
    ["592", ["592"], "", "", null, "CW1", "S", { "Height": "12", "Width": "32" }, { "color": "White", "size": "S" }, null],
    ["593", ["593"], "", "", { "Date": "2020-01", "Name": "Muriel" }, "CW2", "XL", { "Height": "12", "Width": "34.5" }, { "color": "Black", "size": "XL" }, null],
    ["594", ["594"], "", "", { "Date": "2020-09", "Name": "Indre" }, "CW1", "M", { "Height": "12", "Width": "31.5" }, { "color": "White", "size": "M" }, null],
    ["595", ["595"], "", "", { "Date": "2019-09", "Name": "Erich" }, "CW1", "XL", { "Height": "12", "Width": "32" }, { "color": "White", "size": "XL" }, null],
    ["596", ["596"], "", "", { "Date": "2020-02" }, "CW2", "XL", { "Height": "12", "Width": "34.5" }, { "color": "Black", "size": "XL" }, null],
    ["597", ["597"], "", "", { "Date": "2020-02" }, "CW1", "XXL", { "Height": "12", "Width": "32.5" }, { "color": "White", "size": "XXL" }, null],
    ["598", ["598"], "", "", { "Date": "2019-12" }, "CW1", "L", { "Height": "12", "Width": "32" }, { "color": "White", "size": "L" }, null],
    ["599", ["599"], "", "", { "Date": "2019-12" }, "CW1", "M", { "Height": "12", "Width": "30" }, { "color": "White", "size": "M" }, null],
    ["600", ["600"], "", "", null, "CW2", "XL", { "Height": "12", "Width": "36" }, { "color": "Black", "size": "XL" }, null],
    ["601", ["601"], "", "", { "Date": "2020-01", "Name": "Muriel" }, "CW1", "XL", { "Height": "12", "Width": "33.5" }, { "color": "White", "size": "XL" }, null],
    ["602", ["602"], "", "", null, "CW3", "M", { "Height": "12", "Width": "30" }, { "color": "Indigo", "size": "M" }, null],
    ["603", ["603"], "", "", null, "CW3", "L", { "Height": "12", "Width": "30.5" }, { "color": "Indigo", "size": "L" }, null],
    ["604", ["604"], "", "", { "Date": "2020-01", "Name": "Muriel" }, "CW1", "XL", { "Height": "12", "Width": "34.5" }, { "color": "White", "size": "XL" }, null],
    ["605", ["605"], "", "", null, "CW1", "M", { "Height": "12", "Width": "28" }, { "color": "White", "size": "M" }, null],
    ["606", ["606"], "", "", { "Date": "2020-01", "Name": "Muriel" }, "CW2", "XL", { "Height": "12", "Width": "33" }, { "color": "Black", "size": "XL" }, null],
    ["607", ["607"], "", "", { "Date": "2019-12" }, "CW2", "S", { "Height": "12", "Width": "31" }, { "color": "Black", "size": "S" }, null],
    ["608", ["608"], "", "", { "Date": "2019-12" }, "CW2", "XL", { "Height": "12", "Width": "33" }, { "color": "Black", "size": "XL" }, null],
    ["609", ["609"], "", "", { "Date": "2020-09", "Name": "Indre" }, "CW2", "M", { "Height": "12", "Width": "31.5" }, { "color": "Black", "size": "M" }, null],
    ["610", ["610"], "", "", { "Date": "2020-09", "Name": "Indre" }, "CW2", "XL", { "Height": "12", "Width": "34" }, { "color": "Black", "size": "XL" }, null],
    ["611", ["611"], "", "", { "Date": "2020-01" }, "CW2", "M", { "Height": "12", "Width": "31" }, { "color": "Black", "size": "M" }, null],
    ["612", ["612"], "", "", { "Date": "2020-11", "Name": "Paul" }, "CW3", "M", { "Height": "12", "Width": "36" }, { "color": "Indigo", "size": "M" }, null],
    ["613", ["613"], "", "", null, "CW3", "XL", { "Height": "12", "Width": "36" }, { "color": "Indigo", "size": "XL" }, null],
    ["614", ["614"], "", "", { "Date": "2020-06", "Name": "Mary" }, "CW1", "M", { "Height": "12", "Width": "32" }, { "color": "White", "size": "M" }, null],
    ["615", ["615"], "", "", { "Date": "2020-01" }, "CW1", "L", { "Height": "12", "Width": "33" }, { "color": "White", "size": "L" }, null],
    ["616", ["616"], "", "", null, "CW2", "S", { "Height": "12", "Width": "30" }, { "color": "Black", "size": "S" }, null],
    ["617", ["617"], "", "", { "Date": "2020-01" }, "CW2", "M", { "Height": "12", "Width": "31.5" }, { "color": "Black", "size": "M" }, null],
    ["618", ["618"], "", "", null, "CW2", "S", { "Height": "12", "Width": "30.5" }, { "color": "Black", "size": "S" }, null],
    ["619", ["619"], "", "", null, "CW2", "XL", { "Height": "12", "Width": "34" }, { "color": "Black", "size": "XL" }, null],
    ["620", ["620"], "", "", { "Date": "2020-02", "Name": "Savitri" }, "CW2", null, { "Height": "12", "Width": "32" }, { "color": "Black" }, null],
    ["621", ["621"], "", "", null, "CW2", "XL", { "Height": "12", "Width": "32.5" }, { "color": "Black", "size": "XL" }, null],
    ["622", ["622"], "", "", { "Date": "2020-02" }, "CW2", null, { "Height": "12", "Width": "29" }, { "color": "Black" }, null],
    ["623", ["623"], "", "", null, "CW1", "XL", { "Height": "12", "Width": "34.5" }, { "color": "White", "size": "XL" }, null],
    ["624", ["624"], "", "", null, "CW2", "L", { "Height": "12", "Width": "32" }, { "color": "Black", "size": "L" }, null],
    ["625", ["625"], "", "", { "Date": "2020-02", "Name": "Dan" }, "CW1", null, { "Height": "12", "Width": "27" }, { "color": "White" }, null],
    ["626", ["626"], "", "", null, "CW1", "M", { "Height": "12", "Width": "31" }, { "color": "White", "size": "M" }, null],
    ["627", ["627"], "", "", { "Date": "2020-08" }, "CW1", "L", { "Height": "12", "Width": "32.5" }, { "color": "White", "size": "L" }, null],
    ["628", ["628"], "", "", null, "CW1", null, { "Height": "12", "Width": "34" }, { "color": "White" }, null],
    ["629", ["629"], "", "", { "Date": "2020-03", "Name": "Anne" }, "CW2", null, { "Height": "12", "Width": "35.5" }, { "color": "Black" }, null],
    ["630", ["630"], "", "", null, "CW2", null, { "Height": "12", "Width": "35.5" }, { "color": "Black" }, null],
    ["631", ["631"], "", "", null, "CW3", "XL", { "Height": "12", "Width": "33" }, { "color": "Indigo", "size": "XL" }, null],
    ["632", ["632"], "", "", null, "CW3", "L", { "Height": "12", "Width": "34" }, { "color": "Indigo", "size": "L" }, null],
    ["633", ["633"], "", "", null, "CW2", null, { "Height": "12", "Width": "30" }, { "color": "Black" }, { "code": "AV" }],
    ["634", ["634"], "", "", null, "CW2", null, { "Height": "12", "Width": "30" }, { "color": "Black" }, { "code": "AV" }],
    ["635", ["635"], "", "", null, "CW2", null, { "Height": "12", "Width": "30" }, { "color": "Black" }, { "code": "AV" }],
    ["636", ["636"], "", "", null, "CW2", null, { "Height": "12", "Width": "30" }, { "color": "Black" }, { "code": "AV" }],
    ["637", ["637"], "", "", null, "CW2", null, { "Height": "12", "Width": "30" }, { "color": "Black" }, { "code": "AV" }],
    ["638", ["638"], "", "", null, "CW2", null, { "Height": "12", "Width": "30" }, { "color": "Black" }, { "code": "AV / Missing" }],
    ["639", ["639"], "", "", { "Date": "2020-07", "Name": "Alex" }, "CW2", "M", { "Height": "12", "Width": "30.5" }, { "color": "Black", "size": "M" }, null],
    ["640", ["640"], "", "", null, "CW2", "S", { "Height": "12", "Width": "29" }, { "color": "Black", "size": "S" }, null],
    ["641", ["641"], "", "", null, "CW2", "L", { "Height": "12", "Width": "32" }, { "color": "Black", "size": "L" }, null],
    ["642", ["642"], "", "", null, "CW2", "XL", { "Height": "12", "Width": "" }, { "color": "Black", "size": "XL" }, null],
    ["643", ["643"], "", "", { "Date": "2020-10", "Name": "Sahiba" }, "CW2", "M", { "Height": "12", "Width": "32" }, { "color": "Black", "size": "M" }, null],
    ["644", ["644"], "", "", null, "CW2", "XL", { "Height": "12", "Width": "" }, { "color": "Black", "size": "XL" }, null],
    ["645", ["645"], "", "", null, "CW2", "M", { "Height": "12", "Width": "32" }, { "color": "Black", "size": "M" }, null],
    ["646", ["646"], "", "", null, "CW2", "L", { "Height": "12", "Width": "" }, { "color": "Black", "size": "L" }, null],
    ["647", ["647"], "", "", null, "CW2", "XL", { "Height": "12", "Width": "" }, { "color": "Black", "size": "XL" }, null],
    ["648", ["648"], "", "", { "Date": "2020-06", "Name": "Michel" }, "CW1", "L", { "Height": "12", "Width": "" }, { "color": "White", "size": "L" }, null],
    ["649", ["649"], "", "", { "Date": "2020-07", "Name": "Alex" }, "CW1", "M", { "Height": "12", "Width": "" }, { "color": "White", "size": "M" }, null],
    ["650", ["650"], "", "", null, "CW1", "S", { "Height": "12", "Width": "30" }, { "color": "White", "size": "S" }, { "code": "TD" }],
    ["651", ["651"], "", "", null, "CW1", "M", { "Height": "12", "Width": "31" }, { "color": "White", "size": "M" }, { "code": "TD" }],
    ["652", ["652"], "", "", { "Date": "2020-02" }, "CW1", null, { "Height": "12", "Width": "31.5" }, { "color": "White" }, null],
    ["653", ["653"], "", "", null, "CW2", null, { "Height": "12", "Width": "27.5" }, { "color": "Black" }, null],
    ["654", ["654"], "", "", null, "CW2", "XL", { "Height": "12", "Width": "33" }, { "color": "Black", "size": "XL" }, { "code": "TD" }],
    ["655", ["655"], "", "", null, "CW2", "XL", { "Height": "12", "Width": "33.5" }, { "color": "Black", "size": "XL" }, { "code": "TD" }],
    ["656", ["656"], "", "", { "Date": "2020-02" }, "CW2", null, { "Height": "12", "Width": "30" }, { "color": "Black" }, null],
    ["657", ["657"], "", "", null, "CW2", null, { "Height": "12", "Width": "30" }, { "color": "Black" }, null],
    ["658", ["658"], "", "", null, "CW2", null, { "Height": "12", "Width": "30" }, { "color": "Black" }, null],
    ["659", ["659"], "", "", null, "CW2", "S", { "Height": "12", "Width": "30" }, { "color": "Black", "size": "S" }, { "code": "TD" }],
    ["660", ["660"], "", "", null, "CW2", null, { "Height": "12", "Width": "30" }, { "color": "Black" }, null],
    ["661", ["661"], "", "", null, "CW2", null, { "Height": "12", "Width": "30" }, { "color": "Black" }, null],
    ["662", ["662"], "", "", null, "CW2", "M", { "Height": "12", "Width": "31" }, { "color": "Black", "size": "M" }, { "code": "TD" }],
    ["663", ["663"], "", "", null, "CW2", "M", { "Height": "12", "Width": "30.5" }, { "color": "Black", "size": "M" }, { "code": "TD" }],
    ["664", ["664"], "", "", null, "CW2", "L", { "Height": "12", "Width": "32.5" }, { "color": "Black", "size": "L" }, { "code": "TD" }],
    ["665", ["665"], "", "", null, "CW2", "L", { "Height": "12", "Width": "32.5" }, { "color": "Black", "size": "L" }, { "code": "TD" }],
    ["666", ["666"], "", "", null, "CW2", null, { "Height": "12", "Width": "32" }, { "color": "Black" }, null],
    ["667", ["667"], "", "", null, "CW2", null, { "Height": "12", "Width": "32.5" }, { "color": "Black" }, null],
    ["668", ["668"], "", "", null, "CW1", "L", { "Height": "12", "Width": "31.5" }, { "color": "White", "size": "L" }, { "code": "TD" }],
    ["669", ["669"], "", "", null, "CW1", "XL", { "Height": "12", "Width": "33" }, { "color": "White", "size": "XL" }, { "code": "TD" }],
    ["670", ["670"], "", "", null, "CW1", null, { "Height": "12", "Width": "30" }, { "color": "White" }, { "code": "AV" }],
    ["671", ["671"], "", "", null, "CW1", null, { "Height": "12", "Width": "30" }, { "color": "White" }, { "code": "AV" }],
    ["672", ["672"], "", "", null, "CW1", null, { "Height": "12", "Width": "30" }, { "color": "White" }, { "code": "AV" }],
    ["673", ["673"], "", "", null, "CW1", null, { "Height": "12", "Width": "30" }, { "color": "White" }, { "code": "AV" }],
    ["674", ["674"], "", "", null, "CW1", "S", { "Height": "12", "Width": "30" }, { "color": "White", "size": "S" }, { "code": "AV" }],
    ["675", ["675"], "", "", null, "CW1", null, { "Height": "12", "Width": "34.7" }, { "color": "White" }, null],
    ["676", ["676"], "", "", null, "CW1", null, { "Height": "12", "Width": "32" }, { "color": "White" }, null],
    ["677", ["677"], "", "", null, "CW1", null, { "Height": "12", "Width": "32.6" }, { "color": "White" }, null],
    ["678", ["678"], "", "", null, "CW1", null, { "Height": "12", "Width": "31" }, { "color": "White" }, null],
    ["679", ["679"], "", "", { "Date": "2020-03", "Name": "Vaishnavi" }, "CW1", null, { "Height": "12", "Width": "31" }, { "color": "White" }, null],
    ["680", ["680"], "", "", { "Date": "2020-09", "Name": "Charlaine" }, "CW1", null, { "Height": "12", "Width": "30.5" }, { "color": "White" }, null],
    ["681", ["681"], "", "", null, "CW1", null, { "Height": "12", "Width": "30.5" }, { "color": "White" }, null],
    ["682", ["682"], "", "", null, "CW1", null, { "Height": "12", "Width": "31" }, { "color": "White" }, null],
    ["683", ["683"], "", "", { "Date": "2020-03", "Name": "Anne" }, "CW1", null, { "Height": "12", "Width": "30" }, { "color": "White" }, null],
    ["684", ["684"], "", "", null, "CW1", null, { "Height": "12", "Width": "34" }, { "color": "White" }, null],
    ["685", ["685"], "", "", { "Date": "2020-09", "Name": "Charlaine" }, "CW1", null, { "Height": "12", "Width": "32" }, { "color": "White" }, null],
    ["686", ["686"], "", "", null, "CW3", null, { "Height": "12", "Width": "33.3" }, { "color": "Indigo" }, null],
    ["687", ["687"], "", "", null, "CW2", null, { "Height": "12", "Width": "34" }, { "color": "Black" }, null],
    ["688", ["688"], "", "", null, "CW2", null, { "Height": "12", "Width": "32" }, { "color": "Black" }, null],
    ["689", ["689"], "", "", { "Date": "2020-03", "Name": "Martine" }, "CW2", null, { "Height": "12", "Width": "35.5" }, { "color": "Black" }, null],
    ["690", ["690"], "", "", null, "CW2", null, { "Height": "12", "Width": "33" }, { "color": "Black" }, null],
    ["691", ["691"], "", "", null, "CW2", null, { "Height": "12", "Width": "31" }, { "color": "Black" }, null],
    ["692", ["692"], "", "", null, "CW2", null, { "Height": "12", "Width": "32.5" }, { "color": "Black" }, null],
    ["693", ["693"], "", "", null, "CW2", null, { "Height": "12", "Width": "32" }, { "color": "Black" }, null],
    ["694", ["694"], "", "", null, "CW2", null, { "Height": "12", "Width": "30.5" }, { "color": "Black" }, null],
    ["695", ["695"], "", "", null, "CW1", null, { "Height": "12", "Width": "34.5" }, { "color": "White" }, null],
    ["696", ["696"], "", "", null, "CW2", null, { "Height": "12", "Width": "30" }, { "color": "Black" }, null],
    ["697", ["697"], "", "", null, "CW2", null, { "Height": "12", "Width": "34.5" }, { "color": "Black" }, null],
    ["698", ["698"], "", "", null, "CW2", null, { "Height": "12", "Width": "34" }, { "color": "Black" }, null],
    ["699", ["699"], "", "", null, "CW2", null, { "Height": "12", "Width": "36.5" }, { "color": "Black" }, null],
    ["700", ["700"], "", "", null, "CW1", null, { "Height": "12", "Width": "30" }, { "color": "White" }, null],
    ["701", ["701"], "", "", null, "CW1", null, { "Height": "12", "Width": "33" }, { "color": "White" }, null],
    ["702", ["702"], "", "", null, "CW2", null, { "Height": "12", "Width": "30" }, { "color": "Black" }, null],
    ["703", ["703"], "", "", { "Date": "2020-12", "Name": "Jelena" }, "CW1", null, { "Height": "12", "Width": "29.5" }, { "color": "White" }, null],
    ["704", ["704"], "", "", null, "CW1", null, { "Height": "12", "Width": "31" }, { "color": "White" }, null],
    ["705", ["705"], "", "", null, "CW1", null, { "Height": "12", "Width": "29.5" }, { "color": "White" }, null],
    ["706", ["706"], "", "", null, "CW2", null, { "Height": "12", "Width": "33" }, { "color": "Black" }, null],
    ["707", ["707"], "", "", { "Date": "2020-10", "Name": "Sabina" }, "CW2", null, { "Height": "12", "Width": "29.5" }, { "color": "Black" }, null]
];
    var basedir = '/products/wovencanvas/wc/';
    var descMap = {
        CW1: 'Tangail Tradition',
        CW3: 'Indigo In-Love'
    };

    return createWovenCanvasStyleDescFactory(sku, basedir, listData, descMap);
}
