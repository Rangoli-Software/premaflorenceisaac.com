function createWovenCanvasJSON(style) {
	var sku = style.SKU;
	var factory = style.getFactory(sku);
	return createUIProductJSON(sku, factory.base, style.prodData, null);
}

function createWovenCanvasCardCreator() {
	return {
		colClasses: 'col-12',
		createCard: function (images, btnId, priceHTML, desc) {
			var res = '<div class="item sc-panel" style="background-color: ' +
				desc.getBGColor() + ';color: ' + desc.getFGColor() + ';"><div class="row">';
			res += '<div class="col-md-8"><div class="row"><div class="col-10 offset-1"><figure>' +
				'<img src="' + images.getImage(0).url + '" class="img-fluid center-block">' +
				'</figure>' +
				'<p style="color: ' + desc.getFGColor() + '; text-align: center">Woven Canvas ' + desc.getDescription() + '</p>' +
				'</div></div></div>';
			res += '<div class="col-md-4 align-self-center"><div class="row"><div class="col-10 offset-1 text-center">' +
				'<p style="font-size: 150%">' + priceHTML + '</p>';

			if (desc.isAvailable()) {
				res += '<p>' + createAddToCartButton(btnId) + '</p>';
			} else {
				res += '<div class="alert alert-primary text-center" role="alert">' + desc.getCollectedText() + '</div>';
			}

			res += '</div></div></div>';

			res += '</div></div>';
			return res;
		},
		updateCard: function (images, id) {},
	};
}

function createPanelsList(listData, factory) {
	return {
		base: listData,
		factory: factory,
		sizingData: {
			S: [27.0, 30.0],
			M: [29.0, 31.5],
			L: [30.5, 33.0],
			XL: [32.0, 35.0],
			XXL: [34.0, 37.0]
		},
		worksWithSize: function(width, size) {
			var range = this.sizingData[size];
			return (range[0] <= width && width <= range[1]);
		},
		getNumItems: function () {
			return this.base.length;
		},
		getId: function (i) {
			return this.base[i][0];
		},
		getImages: function (i) {
			let desc = this.getDescriptor(i);
			let text = this.factory.product.name;
			return {
				getNumImages: function () {
					return desc.getNumImages();
				},
				getImage: function (i) {
					let idx = i;
					return {
						url: desc.getImagePath(idx),
						text: text + "-" + idx
					};
				}
			};
		},
		getINRPrice: function (i) {
			return this.getDescriptor(i).getCWPrice();
		},
		findIndexOf: function(rowId) {
			for (var i = 0; i < this.base.length; i++) {
				if (rowId === this.factory.getRowId(this.base[i])) {
					return i;
				}
			}
			return null;
		},
		getDescriptor: function (i) {
			return this.factory.createDescriptor(this.base[i]);
		},
		sortOn: function (cmp) {
			var keys = Array.from(this.base.keys());
			let that = this;
			keys.sort(cmp);
			var res = [];
			for (var i = 0; i < keys.length; i++) {
				res.push(this.base[keys[i]]);
			}
			return createPanelsList(res, this.factory);
		},
		sortOnNumber: function () {
			let that = this;
			return this.sortOn(function (l, r) {
				var hL = that.getDescriptor(l).number;
				var hR = that.getDescriptor(r).number;
				return hL < hR ? -1 : (hL > hR ? 1 : 0);
			});
		},
		filterFinal: function() {
			let that = this;
			var avl  = this.filter(function(i) {
				return that.getDescriptor(i).isAvailable();
			});
			var col  = this.filter(function(i) {
				return that.getDescriptor(i).isCollected();
			});
			shuffle(col.base);
			var conc = createPanelsList(avl.base.concat(col.base.slice(0,2)), this.factory);
			return conc.sortOnNumber();
		},
		filter: function(fn) {
			var keys = Array.from(this.base.keys());
			let that = this;
			var filtered = keys.filter(fn);
			var res = [];
			for (var i = 0; i < filtered.length; i++) {
				res.push(this.base[filtered[i]]);
			}
			return createPanelsList(res, this.factory);
		},
		filterOutColour: function (color) {
			let that = this;
			return this.filter(function(i) {
				var row = that.base[i];
				var desc = that.getDescriptor(i);
				return desc.itemFactory.getGarmentColour(row) !== color;
			});
		},
		filterOnColour: function (color) {
			let that = this;
			return this.filter(function(i) {
				var row = that.base[i];
				var desc = that.getDescriptor(i);
				return desc.itemFactory.getGarmentColour(row) === color;
			});
		},
		filterOnSize: function (size) {
			let that = this;
			return this.filter(function(i) {
				var row = that.base[i];
				var desc = that.getDescriptor(i);
				var recSize = desc.getSize();
				if (recSize === null) {
					var panel = row[7];
					var width = parseFloat(panel.Width);
					return that.worksWithSize(width, size);
				} else {
					return (recSize == size);
				}
			});
		}
	}
}

function createColourChoiceCategories(data, factory) {
	return {
		factory: factory,
		data: data,
		getNumCategories: function() {
			return this.data.data.length;
		},
		hasCategories: function () {
			return this.getNumCategories() > 1;
		},
		getCatIdx: function (valColour) {
			for (var i = 0; i < this.getNumCategories(); i++) {
				var variant = this.getCategory(i);
				if (variant.colourName === valColour) {
					return i;
				}
			}
			return -1;
		},
		getCategory: function(cat) {
			return this.data.data[cat];
		},
		getImage: function(i) {
			return this.data.getImage(i);
		},
		isEmpty: function (vidx) {
			var items = this.filterOnCategory(vidx);
			return items.base.length == 0;
		},
		getRandomIdx: function() {
			var len = this.getNumCategories();
			return Math.floor(Math.random() * len);
		},
		unfiltered: function() {
			return createPanelsList(this.factory.listData, this.factory);
		},
		filterOnCategory: function (cat) {
			var clr = this.getCategory(cat);
			var list = createPanelsList(this.factory.listData, this.factory);
			return list.filterOnColour(clr.colourName);
		}
	}
};

function createCategoryUIViewer(selCategory, selIdx) {
	return {
		selCategory: selCategory,
		selIdx: selIdx,
		getSelectedIdx: function () {
			var newidx = this.selCategory.getSelectedIdx();
			if (newidx != -1) {
				this.selIdx = newidx;
				return newidx;
			}
			return this.selIdx;
		},
		createDiv: function() {
			return this.selCategory.createDiv(this.getSelectedIdx());
		}
	}
}

const wovencanvas = {};
wovencanvas.createJSON = createWovenCanvasJSON;

wovencanvas.tshirt = {};
wovencanvas.tshirt.SKU = 'AWTSHT1604Je';
wovencanvas.tshirt.getFactory = getWovenCanvasFactory;
wovencanvas.tshirt.menssizing = { 
	sizeGeo: ["US", "UK", "EU", "GR", "JP", "RU"], 
	capGeo: ["US", "UK", "EU", "DE", "JP", "RU"], 
	chart: {
		S: { US: [38], UK: [38], EU: [48], GR: [42], JP: [17], RU: [50] }, 
		M: { US: [40], UK: [40], EU: [50], GR: [44], JP: [19], RU: [52] }, 
		L: { US: [42], UK: [42], EU: [52], GR: [46], JP: [21], RU: [54] }, 
		XL: { US: [44], UK: [44], EU: [54], GR: [48], JP: [23], RU: [56] }, 
		XXL: { US: [46], UK: [46], EU: [56], GR: [50], JP: [25], RU: [58] } 
	}
};
wovencanvas.tshirt.womensizing = { 
	sizeGeo: ["US", "UK", "EU", "IT", "GR", "JP", "RU"], 
	capGeo: ["US", "UK", "EU / FR", "IT", "DE", "JP", "RU"], 
	chart: { 
		S: { US: [8], UK: [12], EU: [40], IT: [44], GR: [38], JP: [13], RU: [46] }, 
		M: { US: [10], UK: [14], EU: [42], IT: [46], GR: [40], JP: [15], RU: [48] }, 
		L: { US: [12], UK: [16], EU: [44], IT: [48], GR: [42], JP: [17], RU: [50] }, 
		XL: { US: [14], UK: [18], EU: [46], IT: [50], GR: [44], JP: [19], RU: [52] }, 
		XXL: { US: [16], UK: [20], EU: [48], IT: [52], GR: [46], JP: [21], RU: [54] } 
	} 
};
wovencanvas.tshirt.prodData = {
	imageFile: "sizing.jpg",
	dimensionNames: ["Shoulder", "Chest", "Length"],
	dimensionsIn: {
		S: [15.5, 38, 26],
		M: [16.5, 40, 27],
		L: [17.5, 42, 28],
		XL: [18.5, 44, 29],
		XXL: [19.5, 46, 30]
	},
	data: [
		{
			vid: "CW1",
			Name: 'White',
			colourName: 'White',
			images: ["ManWhiteS", "GirlWhiteS", "InBagSq"]
        },
		{
			vid: "CW2",
			Name: 'Black',
			colourName: 'Black',
			images: ["GirlBlackS", "ManBlackS", "InBagSq"]
        },
	],
	sizes: ["S", "M", "L", "XL", "XXL"],
	description: '<p>A piece of wearable art! Our P.F.I. T-Shirt with a <strong>numbered</strong> Woven Canvas makes the perfect gift for that unique individual. I create each panel individually as a collage composed of textile strips.</p><p>The fabric strips come from my <a href="/journey/treasuretrove.html">treasure-trove</a> of vintage Tangail sari borders (hand-woven in the finest cotton, silk and metal-zari).</p><p>Each panel is a labour of love. You can read more about the process <a href="/tangailcollage.html">here</a></p><p>Along with your T-shirt, you will receive one of our gift bags: a delicate transparent cotton organza envelope with a mother-of-pearl button closure, making it a perfect gift item!</p>',
	garmentDetails: '',
};
wovencanvas.tshirt.washcareHTML = "<ul><li>Wash before first use</li><li>Do not soak</li><li>Hand Wash</li><li>Mild Detergent</li><li>Do Not Bleach</li><li>Dry In Shade</li></ul>";
wovencanvas.tshirt.shippingHTML = getShippingInfoUL(['If the item is in stock, it will be ready to ship within 1 business day of your order.']);
wovencanvas.tshirt.createCardCreator = createWovenCanvasCardCreator;
wovencanvas.tshirt.createCardCreator = createWovenCanvasCardCreator;

wovencanvas.catalog = {
	title: "Woven Canvas",
	shopURL: "/products/wovencanvas/shop.html",
	skus: null,
	styles: [wovencanvas.tshirt],
	skuvariants:['AWTSHT1604Je-CW1','AWTSHT1604Je-CW2'],
	garments: [wovencanvas.tshirt.SKU],
	extras: [],
	productDB: null,
	getProduct: function (sku) {
		return this.productDB[sku];
	}
}

pfiavG.getLineInitializer(wovencanvas).initialize();

wovencanvas.categorizer = createFieldCategorizer(
	wovencanvas.catalog,
    ["All"],
    ["skuvariants"],
    ["a"],
	"t",
	"a");
