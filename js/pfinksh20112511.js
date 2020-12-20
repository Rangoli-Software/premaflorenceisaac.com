const naksha = {};

naksha.microSKU = 'NKSHMC1512PP';
naksha.miniSKU = 'NKSHMI1501PP';
naksha.midiSKU = 'NKSHMD1501PP';
naksha.minuitSKU = 'NKSHMU1501PP';

naksha.createSKUsList = function (base) {
	return {
		base: base,
		createSKU: function (sku) {
			var product = pfiavG.productCatalog.getProduct(sku);
			var varPL = varPLData[sku];
			switch (sku) {
				case naksha.microSKU:
					return getNakshaMicroFactory(base, product, varPL);
				case naksha.miniSKU:
					return getNakshaMiniFactory(base, product, varPL);
				case naksha.midiSKU:
					return getNakshaMidiFactory(base, product, varPL);
				case naksha.minuitSKU:
					return getNakshaMinuitFactory(base, product, varPL);
				default:
					return null;
			}
		}
	};
}

naksha.createEncoder = function () {
	return {
		toSKU: function (c) {
			switch (c) {
				case 'u':
					return naksha.minuitSKU;
				case 'd':
					return naksha.midiSKU;
				case 'm':
					return naksha.miniSKU;
				case 'c':
					return naksha.microSKU;
				default:
					return null;
			}
		},
		toCode: function (sku) {
			switch (sku) {
				case naksha.microSKU:
					return 'c';
				case naksha.miniSKU:
					return 'm';
				case naksha.midiSKU:
					return 'd';
				case naksha.minuitSKU:
					return 'u';
				default:
					return null;
			}
		}
	};
}

naksha.createURLUpdater = function () {
	return {
		encoder: naksha.createEncoder(),
		urlModifier: createURLModifer('s','d')
	};
}

naksha.createSKUsFactory = function (listFactory) {
	return {
		listFactory: listFactory,
		createSKU: function (sku) {
			return this.listFactory.createSKU(sku);
		}
	};
}

naksha.washcareHTML = "<ul><li>Do not soak</li><li>Hand Wash</li><li>Mild Detergent</li><li>Do Not Bleach</li><li>Dry In Shade</li><li>No Need to Iron</li><li>Follow this tie-up procedure to maintain the crushed look-and-feel</li></ul>";

naksha.shippingHTML = getShippingInfoUL(['Since our Naksha skirts are on sale in several physical locations in addition to the website, there is a chance that the skirt that you have selected has already been sold. In this case, we will let you select another skirt, or refund your purchase price, as you prefer.']);

naksha.createSKUs = function (factory) {
	return {
		factory: factory,
		data: [
			{
				SKU: naksha.minuitSKU,
				text: 'Minuit',
				image: 'minuitL4',
				pxWidth: '65'
			},
			{
				SKU: naksha.midiSKU,
				text: 'Midi',
				image: 'midiL4',
				pxWidth: '59.28'
			},
			{
				SKU: naksha.miniSKU,
				text: 'Mini',
				image: 'miniL3',
				pxWidth: '48.88'
			},
			{
				SKU: naksha.microSKU,
				text: 'Micro',
				image: 'microL4',
				pxWidth: '44.72'
			}
		],
		getImage: function (vidx) {
			var vnt = this.data[vidx];
			return {
				url: this.factory.listFactory.base + vnt.image + ".jpg"
			}
		},
	};
}

naksha.getDimensionsCm = function (sku) {
	switch (sku) {
		case naksha.microSKU:
			return {
				Free: [52, 45, 240, 72, 90]
			};
		case naksha.miniSKU:
			return {
				Free: [62, 53, 336, 72, 130]
			};
		case naksha.midiSKU:
			return {
				Free: [81, 72, 376, 72, 130]
			};
		case naksha.minuitSKU:
			return {
				Free: [102, 93, 392, 72, 130]
			};
		default:
			return null;
	}
};

naksha.sizing = {
	sizeGeo: ["US", "UK", "EU", "IT", "GR", "JP", "RU"],
	capGeo: ["US", "UK / AU / NZ", "EU / FR", "IT", "DE", "JP", "RU"],
	chart: {
		Free: {
			US: [6, 30],
			UK: [10, 34],
			EU: [38, 52],
			IT: [42, 56],
			GR: [36, 50],
			JP: [11, 25],
			RU: [44, 58]
		}
	}
};

naksha.sizing1 = {
	sizeGeo: ["US", "UK", "EU", "IT", "GR", "JP", "RU"],
	capGeo: ["US", "UK / AU / NZ", "EU / FR", "IT", "DE", "JP", "RU"],
	chart: {
		Free: {
			US: [6, 14],
			UK: [10, 18],
			EU: [38, 46],
			IT: [42, 50],
			GR: [36, 44],
			JP: [11, 19],
			RU: [44, 52]
		}
	}
};

naksha.getSizing = function (sku) {
	switch (sku) {
		case naksha.microSKU:
			return naksha.sizing1;
		case naksha.miniSKU:
			return naksha.sizing;
		case naksha.midiSKU:
			return naksha.sizing;
		case naksha.minuitSKU:
			return naksha.sizing;
		default:
			return null;
	}
}

naksha.getVariants = function (sku) {
	switch (sku) {
		case naksha.microSKU:
			return {
				vid: "AW",
					images: ["front", "back", "side", "detail1", "detail2"]
			};
		case naksha.miniSKU:
			return {
				vid: "AW",
					images: ["front", "back", "side", "detail1", "detail2"]
			};
		case naksha.midiSKU:
			return {
				vid: "AW",
					images: ["front", "back", "side", "detail1", "detail2"]
			};
		case naksha.minuitSKU:
			return {
				vid: "AW",
					images: ["front", "back", "side", "detail1", "detail2"]
			};
		default:
			return null;
	}
};

naksha.createSKUSelector = function (skus) {
	return {
		skus: skus,
		divId: 'skuSelector',
		skuRadioName: "skuRadio",
		getSKUIdx: function (sku) {
			for (var i = 0; i < this.skus.data.length; i++) {
				var variant = this.skus.data[i];
				if (variant.SKU == sku) {
					return i;
				}
			}
			return -1;
		},
		getSelectedSKU: function () {
			var selRadio = $("input[name='" + this.skuRadioName + "']:checked");
			return selRadio.val();
		},
		createSKUPanel: function (name, varIdx) {
			var res = '<div class="mb-4 ml-n1">';
			for (var i = 0; i < this.skus.data.length; i++) {
				var opt = this.skus.data[i];
				res += '<div class="custom-control custom-control-inline custom-control-img"><input type="radio" onclick="onSKUChange(\'' + opt.SKU + '\')" class="custom-control-input" id="' + name + i + '" name="' + name + '" value="' + opt.SKU + '"' + (varIdx == i ? " checked" : "") + '><label class="custom-control-label" for="' + name + i + '" style="width: ' + opt.pxWidth + 'px">' +
					'<img class="img-fluid" src="' + this.skus.getImage(i).url + '">' +
					'</label></div>';
			}
			res += '</div>';
			return res;
		},
		createDiv: function (varIdx) {
			var res = '<form id="' + this.divId + '"><div class="row align-items-center">'
			res += '<div class="col-12 text-center"><figure>' +
				this.createSKUPanel(this.skuRadioName, varIdx) +
				'</figure></div>' +
				'</div></form>';
			return res;
		}
	}
}

naksha.createProdData = function (sku) {
	var isMicro = (sku == naksha.microSKU)
	return {
		imageFile: "sizing.jpg",
		dimensionNames: ["A. Length", "B. Outer Layer Length", "C. Hem", "D. Waist - Relaxed", "D. Waist - Stretched"],
		dimensionsCm: naksha.getDimensionsCm(sku),
		data: [naksha.getVariants(sku)],
		sizes: ['Free'],
		description: '<p>Almost from the <a href="/journey/salsa.html">earliest days of my atelier</a>, the Naksha skirt has been my signature piece of <a href="/journey/artwear.html">ArtWear</a>, and an evergreen favourite with clients. It is available in 4 lengths - Micro, Mini, Midi and Minuit.</p><p>As the name suggests, each ArtWear Naksha is a <strong>one-of-a-kind</strong> piece, <strong>unique and exclusive.</strong></p><p>The perfect fusion of traditional Tangail textile in a modern western silhouette, the Naksha is a multi-paneled, crushed skirt. Made of sheer 100% cotton fabrics, the skirt offers comfort, playfulness and complete freedom of movement. It suits every age group from teenagers (we even have a kids\' Naksha) to seniors. It can be worn with a variety of tops and t-shirts and is suitable for a range of occasions all around the world.</p><p>Each Artwear Naksha skirt is cut from a single Tangail / Jamdani sari. The skirt is lined with a harmonizing hue of translucent Voile de Coton to create my signature light-layer effect. It is made up of 16 fabric panels (12 on the Micro) which adds a lot of volume and flare. Because of the way the panels are cut, only 1 Minuit, Midi or Mini can be created from a single sari.</p><p>The waist band is made up of 9 rows of elastic (6 rows on the Micro). Because of the need for care while working with the delicate Tangail fabric, it can take a skilled tailor almost a full day of work to create this waistband. The result is a snug, comfortable fit, for a range of waist measurements.</p>',
		garmentDetails: '',
	};
}

naksha.createCardCreator = function (sku) {
	return createArtWearCardCreator(createSquareImageCarousel);
}

naksha.createProductJSON = function (sku) {
	var factory = naksha.factory.createSKU(sku);
	var prodData = naksha.createProdData(sku);
	return createUIProductJSON(sku, factory.base, prodData, naksha.getSizing(sku));
}

naksha.createStyle = function (sku) {
	return {
		SKU: sku,
		sizing: naksha.getSizing(sku),
		prodData: naksha.createProdData(sku),
		washcareHTML: naksha.washcareHTML,
		shippingHTML: naksha.shippingHTML,
		createCardCreator: naksha.createCardCreator,
		getFactory: function (sku) {
			return naksha.factory.createSKUs(sku);
		},
		createJSON: function (style) {
			return naksha.createProductJSON(this.SKU);
		}
	};
}

naksha.createUICFactory = function (scope, colSelData, browseInfo) {
	var skus = scope.createSKUs(scope.factory);
	var skuSelector = scope.createSKUSelector(skus);
	return {
		scope: scope,
		skuSelector: skuSelector,
		browseInfo: browseInfo,
		createGenerator: function (sku) {
			var factory = this.scope.factory.createSKU(sku);
			var prodData = this.scope.createProdData(sku);
			var prodJSON = createUIProductJSON(sku, factory.base, prodData, this.scope.getSizing(sku));
			var skuSelViewer = createHTMLViewer(skuSelector.createDiv(skuSelector.getSKUIdx(sku)));
			var detailViewer = createHTMLViewer(prodJSON.skuInfo.garmentDetails);
			var storyViewer = this.browseInfo.getStoryViewer();
			var viewerFactory = {
				product: prodJSON.product,
				createPre: function () {
					return skuSelViewer;
				},
				createBase: function (shop) {
					return createBasePanelr(shop, null, this.product);
				},
				create: function () {
					return createCatenatedViewer([detailViewer, storyViewer]);
				},
				createNavHelper: function () {
					return createNavHelper(prodJSON, artwear.categorizer, artwear.catalog.title);
				},
				createList: function () {
					return createUniqueItemList(factory.listData, factory);
				},
				createCategorySelector: function () {
					var selCategory = createColourCategories(colSelData, factory);
					return createColourCategorySelector(selCategory);
				},
				createVarSel: function () {
					return {
						getSelectedIdx: function () {
							return 0;
						}
					}
				},
				createPanelRVs: function () {
					var itemsRVlist = [SelChangeReason.colorCategoryChange, SelChangeReason.skuChange];
					return createPanelRVs(
						SelChangeReason.createValidator(itemsRVlist),
						SelChangeReason.createValidator([SelChangeReason.colorChange, SelChangeReason.skuChange]),
						SelChangeReason.createValidator([SelChangeReason.skuChange, SelChangeReason.currencyChange]),
						SelChangeReason.createValidator([SelChangeReason.unitChange, SelChangeReason.skuChange])
					);
				}
			};
			var sizeSelector = createSizeSelector(prodJSON.skuInfo.sizes, pfiavG.sizeModalInfo.getToggleHTML(), null, "The model is 5 ft 3 in (160 cm).", "Size");
			return createComponentGenerator(factory, prodJSON, viewerFactory, sizeSelector, true, this.scope.createCardCreator(sku),0);
		},
		updateURL: function (sku) {
			var encoder = this.scope.urlUpdater.encoder;
			var urlModifier = this.scope.urlUpdater.urlModifier;
			var c = encoder.toCode(sku);
			urlModifier.updateURL(c);
		}
	}
}

var nkshListFactory = naksha.createSKUsList('/products/artwear/skirts/');
naksha.factory = naksha.createSKUsFactory(nkshListFactory);
naksha.urlUpdater = naksha.createURLUpdater();
