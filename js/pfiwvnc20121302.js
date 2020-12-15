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
			res += '<div class="col-md-7"><div class="row"><div class="col-10 offset-1"><figure>' +
				'<img src="' + images.getImage(0).url + '" class="img-fluid center-block">' +
				'</figure>' +
				'<p style="color: ' + desc.getFGColor() + '; text-align: center">Woven Canvas ' + desc.getDescription() + '</p>' +
				'</div></div></div>';
			res += '<div class="col-md-5 align-self-center"><div class="row"><div class="col-10 offset-1 text-center">' +
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
		filterUnsoldPanels: function () {
			var nList = [];
			for (var i = 0; i <= this.base.length - 1; i++) {
				var row = this.base[i];
				var desc = this.getDescriptor(i);
				if (desc.isAvailable()) {
					nList.push(row);
				}
			}
			return createPanelsList(nList, this.factory);
		},
		filterOnColour: function (color) {
			var nList = [];
			for (var i = 0; i <= this.base.length - 1; i++) {
				var row = this.base[i];
				var desc = this.getDescriptor(i);
				if (desc.itemFactory.getGarmentColour(row) === color) {
					nList.push(row);
				}
			}
			return createPanelsList(nList, this.factory);
		},
		filterOnSize: function (size) {
			var nList = [];
			for (var i = 0; i <= this.base.length - 1; i++) {
				var row = this.base[i];
				var desc = this.getDescriptor(i);
				var recSize = desc.getSize();
				if (recSize === null) {
					var panel = row[7];
					var width = parseFloat(panel.Width);
					if (this.worksWithSize(width, size)) {
						nList.push(row);
					}
				} else {
					if (recSize == size) {
						nList.push(row);
					}
				}
			}
			return createPanelsList(nList, this.factory);
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
		filterOnCategory: function (cat) {
			var clr = this.getCategory(cat);
			var list = createPanelsList(this.factory.listData, this.factory);
			return list.filterOnColour(clr.colourName).filterUnsoldPanels();
		}
	}
};

function createCategoryUIViewer(selCategory) {
	return {
		selCategory: selCategory,
		getSelectedIdx: function () {
			var newidx = this.selCategory.getSelectedIdx();
			if (newidx != -1) {
				return newidx;
			}
			return 0;
		},
		createDiv: function() {
			return this.selCategory.createDiv(this.getSelectedIdx());
		}
	}
}

const wovencanvas = {};
wovencanvas.tshirt = {};
wovencanvas.tshirt.SKU = 'AWTSHT1604Je';
wovencanvas.tshirt.getFactory = getWovenCanvasFactory;
wovencanvas.tshirt.prodData = {
	imageFile: "sizing.jpg",
	dimensionNames: ["Shoulder", "Chest", "Length"],
	dimensionsCm: {
		S: [15.5, 38, 26],
		M: [16.5, 40, 27],
		L: [17.5, 42, 28],
		XL: [18.5, 44, 29],
		XXL: [19.5, 46, 30]
	},
	data: [
		{
			vid: "CW1",
			colourName: 'White',
			images: ["ManWhiteS", "GirlWhiteS", "InBagSq"]
        },
		{
			vid: "CW2",
			colourName: 'Black',
			images: ["GirlBlackS", "ManBlackS", "InBagSq"]
        },
	],
	sizes: ["S", "M", "L", "XL", "XXL"],
	description: '<p>A piece of wearable art! Our T-Shirt with a <strong>numbered</strong> Woven Canvas makes the perfect gift for that unique individual. I create each panel individually as a collage composed of textile strips.</p><p>The fabric strips come from my <a href="/journey/treasuretrove.html">treasure-trove</a> of vintage Tangail sari borders (hand-woven in the finest cotton, silk and metal-zari).</p><p>Each panel is a labour of love. You can read more about the process <a href="/tangailcollage.html">here</a></p><p>Along with your T-shirt, you will receive one of our gift bags: a delicate transparent cotton organza envelope with a mother-of-pearl button closure, making it a perfect gift item!</p>',
	garmentDetails: '',
};
wovencanvas.tshirt.washcareHTML = "<ul><li>Wash before first use</li><li>Do not soak</li><li>Hand Wash</li><li>Mild Detergent</li><li>Do Not Bleach</li><li>Dry In Shade</li></ul>";
wovencanvas.tshirt.shippingHTML = getShippingInfoUL(['If the item is in stock, it will be ready to ship within 1 business day of your order.']);
wovencanvas.tshirt.createCardCreator = createWovenCanvasCardCreator;
wovencanvas.tshirt.createJSON = createWovenCanvasJSON;
