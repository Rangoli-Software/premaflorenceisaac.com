function hexToRGB(hexRGB) {
	return {
		r: parseInt(hexRGB.substr(1, 2), 16),
		g: parseInt(hexRGB.substr(3, 2), 16),
		b: parseInt(hexRGB.substr(5, 2), 16)
	};
}

function rgbToHSL(hexRGB) {
	var r = hexRGB.r / 255;
	var g = hexRGB.g / 255
	var b = hexRGB.b / 255;

	var max = Math.max(r, g, b),
		min = Math.min(r, g, b);
	var h, s, l = (max + min) / 2;

	if (max == min) {
		h = s = 0; // achromatic
	} else {
		var d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		switch (max) {
			case r:
				h = (g - b) / d + (g < b ? 6 : 0);
				break;
			case g:
				h = (b - r) / d + 2;
				break;
			case b:
				h = (r - g) / d + 4;
				break;
		}
		h /= 6;
	}

	return {
		h: h,
		s: s,
		l: l
	};
}

function createFlickityCarousel(id, imgs, imgdim) {
	var images = {
		items: imgs,
		getNumImages: function() {
			return this.items.length;
		},
		getImage: function(i) {
			return this.items[i];
		}
	};
	return createSquareImageCarousel(images, id).createImageCarousel(imgdim);
}

const SelChangeReason = {
	currencyChange: 'CurrencyChange',
	genderChange: 'GenderChange',
	unitChange: 'UnitChange',
	skuChange: 'SKUChange',
	sizeChange: 'SizeChange',
	colorChange: 'ColourChange',
	colorCategoryChange: 'ColourCategoryChange',
	selChange: 'SelChange',
	createValidator: function (validreasons) {
		return {
			validreasons: validreasons,
			isValid(reason) {
				return this.validreasons.includes(reason);
			}
		}
	},
	createNullValidator: function () {
		return this.createValidator([]);
	}
};

function createFieldCategorizer(catalog, titles, ids, tabvals, tabvar, tabdefault) {
	return {
		catalog: catalog,
		baseURL: catalog.shopURL,
		titles: titles,
		ids: ids,
		tabvals: tabvals,
		tabvar: tabvar,
		tabdefault: tabdefault,
		hasTabs: function () {
			return this.ids.length > 1;
		},
		createUrlVarSelector: function () {
			return createUrlVarSelector(this.titles, this.ids, this.tabvals, this.tabvar, this.tabdefault);
		},
		getCategory: function (sku) {
			var idx = this.ids.findIndex(id => this.catalog[id].includes(sku));
			if (0 <= idx) {
				return this.ids[idx];
			}
			return null;
		},
		getTabVal: function (sku) {
			var idx = this.ids.findIndex(id => this.catalog[id].includes(sku));
			if (0 <= idx) {
				return this.tabvals[idx];
			}
			return this.tabdefault;
		},
		getUrl: function (sku) {
			if (this.hasTabs()) {
				var tabval = this.getTabVal(sku);
				return this.baseURL + "?" + this.tabvar + "=" + tabval;
			} else {
				return this.baseURL;
			}
		}
	};
}

function createColSelData(path, data) {
	return {
		path: path,
		data: data,
		getNumImages: function () {
			return this.data.length;
		},
		getImage: function (i) {
			return {
				url: this.path + this.data[i].image + '.jpg'
			};
		}
	};
}

function hexToHSL(hexRGB) {
	return rgbToHSL(hexToRGB(hexRGB));
}

function createBrowseInfo(infoSections, numSections, baseBlackList) {
	return {
		infoSections: infoSections,
		numSections: numSections,
		getArticles: function () {
			var res = [];
			for (var i = 0; i < infoSections.length; i++) {
				var section = infoSections[i];
				var sec = [];
				for (var j = 0; j < section.length; j++) {
					var info = section[j];
					sec.push(getSubEntry(info[0], info[1]));
				}
				res.push(sec);
			}
			return res;
		},
		getSections: function () {
			var res = [];
			for (var i = 0; i < infoSections.length; i++) {
				var section = infoSections[i];
				var sec = [];
				for (var j = 0; j < section.length; j++) {
					var info = section[j];
					sec.push(info[0]);
				}
				res.push(sec);
			}
			return res;
		},
		getFlattenedURLs: function () {
			var res = [];
			for (var i = 0; i < infoSections.length; i++) {
				var section = infoSections[i];
				for (var j = 0; j < section.length; j++) {
					var info = section[j];
					res.push(info[1]);
				}
			}
			return res;
		},
		getStoryViewer: function () {
			return createStoryViewer('Background', this.getArticles(), this.getSections(), this.numSections);
		}
	};
}

function createUIItemFactory(product, varPL, descMap) {
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
			return null;
		},
		getBGColor: function (row) {
			return null;
		},
		getDescription: function (row) {
			return null;
		},
		getCurated: function (row) {
			return null;
		}
	}
}

function createUICollectedText(collected) {
	var res = "Collected";
	var name = collected.Name;
	if (name !== undefined) {
		res += " by " + name;
	}
	var date = collected.Date;
	if (date !== undefined) {
		var dt = Date.parse(date);
		res += " in " + nkdtformatter.format(dt);
	}
	return res;
}

function createUIDescriptorFactory(base, product, listData, itemFactory, imgdim) {
	return {
		listData: listData,
		product: product,
		base: base,
		itemFactory: itemFactory,
		getRowId: function (row) {
			return row[0];
		},
		createDescriptor: function (r) {
			var num = this.getRowId(r);
			var collected = r[4];
			var cw = r[5];
			var cwPrice = this.itemFactory.getPrice(cw);
			var cwDesc = this.itemFactory.getCategoryDescription(cw);
			let row = r;
			return {
				itemFactory: this.itemFactory,
				base: this.base,
				number: num,
				hsl: (row[2] !== '') ? hexToHSL(row[2]) : null,
				inrPrice: cwPrice,
				catDesc: cwDesc,
				collected: collected,
				imgdim: imgdim,
				getNumImages: function () {
					return row[1].length;
				},
				getImagePath: function (idx) {
					return this.base + row[1][idx] + '.jpg';
				},
				getHue: function () {
					return this.hsl.h;
				},
				getSat: function () {
					return this.hsl.s;
				},
				getV: function () {
					return this.hsl.l;
				},
				getCWPrice: function () {
					return this.inrPrice;
				},
				getCWDesc: function () {
					return this.catDesc;
				},
				isCollected: function () {
					return this.collected !== null;
				},
				isAvailable: function () {
					return this.collected === null && this.getCurated() === null;
				},
				getCollectedText: function () {
					return createUICollectedText(this.collected);
				},
				getSize: function () {
					return row[6];
				},
				getFGColor: function () {
					return itemFactory.getFGColor(row);
				},
				getBGColor: function () {
					return itemFactory.getBGColor(row);
				},
				getDescription: function () {
					return itemFactory.getDescription(row);
				},
				getCurated: function () {
					return itemFactory.getCurated(row);
				}
			};
		}
	};
}

function createStyleDescFactory(sku, basedir, listdata, descmap, imgdim) {
	var product = pfiavG.productCatalog.getProduct(sku);
	var varPL = varPLData[sku];
	var cwFactory = createUIItemFactory(product, varPL, descmap);
	return createUIDescriptorFactory(basedir, product, listdata, cwFactory, imgdim);
}

function createNullURLUpdater() {
	return {
		updateURL: function (arg) {}
	};
}

function createComponentGenerator(uiFactory, prodJSON, viewerFactory, sizeSelector, isSquare, cardCreator, varidx) {
	return {
		viewerFactory: viewerFactory,
		sizeSelector: sizeSelector,
		cardCreator: cardCreator,
		uiFactory: uiFactory,
		prodJSON: prodJSON,
		createSizePanelr: function () {
			var prodJSON = this.prodJSON;
			var skuInfo = prodJSON.skuInfo;
			var dimensioner = (prodJSON.dimensionsIn === undefined) ?
				createDimensioner("cm", prodJSON.dimensionNames, prodJSON.dimensionsCm, prodJSON.styleImagePath, undefined, skuInfo.sizes) :
				createDimensioner("in", prodJSON.dimensionNames, prodJSON.dimensionsIn, prodJSON.styleImagePath, undefined, skuInfo.sizes);
			var sizeChartr;
			if (viewerFactory.createSizeChartr === undefined) {
				var chart = skuInfo.getSizeChart();
				sizeChartr = chart !== null ? createSizeChartr(chart, skuInfo.sizes) : null;
			} else {
				sizeChartr = viewerFactory.createSizeChartr();
			}
			return createSizePanelr(prodJSON.skuInfo, dimensioner, sizeChartr);
		},
		createPCFactory: function () {
			var prePanelr = this.viewerFactory.createPre();
			var sizePanelr = this.createSizePanelr();
			var addlViewer = this.viewerFactory.create();
			var carousel = createSquareProductCarousel(this.prodJSON);
			var that = this;
			var srv = this.viewerFactory.createPanelRVs();
			var vntSelector = this.viewerFactory.createVarSel();
			return {
				navHelper: this.viewerFactory.createNavHelper(),
				createProductComponent: function (shop) {
					var basePanelr = that.viewerFactory.createBase(shop);
					return createUIProductComponent(prePanelr, basePanelr, sizePanelr, carousel, addlViewer, vntSelector, srv, varidx);
				}
			};
		},
		createUIC: function (shop) {
			var items = this.viewerFactory.createList();
			var productComponentFactory = this.createPCFactory();
			var itemCategorySelector = this.viewerFactory.createCategorySelector();
			var sizeSelector = this.sizeSelector;
			var productComponent = productComponentFactory.createProductComponent(shop);
			var srv = this.viewerFactory.createPanelRVs();
			var urlUpdater = this.viewerFactory.getURLUpdater === undefined ? createNullURLUpdater() : this.viewerFactory.getURLUpdater();
			return createUniqueItemsComponent(shop, items, productComponentFactory, productComponent, itemCategorySelector, sizeSelector, this.cardCreator, srv.itemsRV, urlUpdater);
		},
	};
}

function createProductJSON(sku, basePath, prodData, sizingChart, imageFactory) {
	return {
		product: pfiavG.productCatalog.getProduct(sku),
		styleImagePath: basePath + prodData.imageFile,
		dimensionNames: prodData.dimensionNames,
		dimensionsCm: prodData.dimensionsCm,
		dimensionsIn: prodData.dimensionsIn,
		imageFactory: imageFactory,
		variants: {
			getFabric: function (varidx) {
				return prodData.getFabric(varidx);
			},
			getColourName: function (varidx) {
				return this.data[varidx].colourName;
			},
			getVarIdx: function (key, val) {
				return this.data.findIndex(itm => itm[key] === val);
			},
			getVarVal: function (key, idx) {
				return this.data[idx][key];
			},
			data: prodData.data
		},
		getBasePath: function () {
			return basePath;
		},
		getImages: function (vidx) {
			return this.imageFactory(this, vidx);
		},
		skuInfo: {
			SKU: sku,
			sizes: prodData.sizes,
			getSizeChart: function () {
				return sizingChart;
			},
			description: prodData.description,
			garmentDetails: prodData.garmentDetails
		}
	}
}

function createImageFactory(that, vidx) {
	return {
		that: that,
		vidx: vidx,
		getNumImages: function () {
			var vnt = this.that.variants.data[this.vidx];
			return vnt.images.length;
		},
		getImage: function (iidx) {
			var vnt = this.that.variants.data[this.vidx];
			return {
				url: this.that.getBasePath() + vnt.images[iidx] + ".jpg",
				text: this.that.product.name + '-Vnt:' + vnt.vid + '-Img:' + iidx,
				width: vnt.width,
				height: vnt.height
			}
		}
	};
}

function createCWImageFactory(that, vidx) {
	return {
		that: that,
		vidx: vidx,
		getNumImages: function () {
			var vnt = this.that.variants.data[this.vidx];
			return vnt.colourSfxs.length;
		},
		getImage: function (iidx) {
			var vnt = this.that.variants.data[this.vidx];
			return {
				url: this.that.getBasePath() + vnt.colourPfx + "-" + vnt.colourSfxs[iidx] + ".jpg",
				text: this.that.product.name + '-' + vnt.colourPfx + '-' + vnt.colourSfxs[iidx],
				width: vnt.width,
				height: vnt.height
			};
		}
	};
}

function createUIProductJSON(sku, basePath, prodData, sizingChart) {
	return createProductJSON(sku, basePath, prodData, sizingChart, createImageFactory);
}

function createUniqueItemList(listdata, factory) {
	return {
		base: listdata,
		factory: factory,
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
		findIndexOf(rowId) {
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
		getINRPrice: function (i) {
			return this.getDescriptor(i).getCWPrice();
		},
		filterFinal: function () {
			return this;
		},
		filterOnSize: function (size) {
			var nList = [];
			for (var i = 0; i < this.base.length; i++) {
				var val = this.getDescriptor(i).getSize();
				if (val === size) {
					nList.push(this.base[i]);
				}
			}
			return createUniqueItemList(nList, this.factory);
		},
		filterOnValue: function (range) {
			var nList = [];
			for (var i = 0; i < this.base.length; i++) {
				var val = this.getDescriptor(i).getV();
				if (range[0] < val && val <= range[1]) {
					nList.push(this.base[i]);
				}
			}
			return createUniqueItemList(nList, this.factory);
		},
		filterOnSaturation: function (range) {
			var nList = [];
			for (var i = 0; i < this.base.length; i++) {
				var val = this.getDescriptor(i).getSat();
				if (range[0] < val && val <= range[1]) {
					nList.push(this.base[i]);
				}
			}
			return createUniqueItemList(nList, this.factory);
		},
		filterOnHue: function (range) {
			var nList = [];
			for (var i = 0; i < this.base.length; i++) {
				var val = this.getDescriptor(i).getHue();
				if (range[0] < val && val <= range[1]) {
					nList.push(this.base[i]);
				}
			}
			return createUniqueItemList(nList, this.factory);
		},
		sortOn: function (cmp) {
			var keys = Array.from(this.base.keys());
			let that = this;
			keys.sort(cmp);
			var res = [];
			for (var i = 0; i < keys.length; i++) {
				res.push(this.base[keys[i]]);
			}
			return createUniqueItemList(res, this.factory);
		},
		sortOnHue: function () {
			let that = this;
			return this.sortOn(function (l, r) {
				var hL = that.getDescriptor(l).getHue();
				var hR = that.getDescriptor(r).getHue();
				return hL < hR ? -1 : (hL > hR ? 1 : 0);
			});
		},
		sortOnV: function () {
			let that = this;
			return this.sortOn(function (l, r) {
				var hL = that.getDescriptor(l).getV();
				var hR = that.getDescriptor(r).getV();
				return hL < hR ? -1 : (hL > hR ? 1 : 0);
			});
		}
	};
}

function createColourCategories(data, factory) {
	return {
		factory: factory,
		greyRange: [0, 0.15],
		colourRange: [0.15, 1.0],
		whiteValRange: [0.8, 1],
		blackValRange: [0.0, 0.2],
		colourValRange: [0.2, 0.8],
		redRange0: [5.0 / 6, 1.0],
		redRange1: [0.0, 1.0 / 6],
		blueRange: [0.5, 5.0 / 6],
		greenRange: [1.0 / 6, 0.5],
		blueRange: [0.5, 5.0 / 6],
		bluegreenRange: [1.0 / 6, 5.0 / 6],
		data: data,
		getNumCategories() {
			return data.data.length;
		},
		hasCategories: function () {
			return this.getNumCategories() > 0;
		},
		getCategory(vidx) {
			return this.data.data[vidx];
		},
		getImage(vidx) {
			return this.data.getImage(vidx);
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
		isEmpty: function (vidx) {
			var items = this.filterOnCategory(vidx);
			return items.base.length == 0;
		},
		unfiltered: function () {
			var list = createUniqueItemList(this.factory.listData, this.factory);
			var clrList = list.filterOnValue(this.colourValRange).filterOnSaturation(this.colourRange).base;
			var greyList = list.base.filter(x => !clrList.includes(x));
			var sortedClrs = createUniqueItemList(clrList, this.factory).sortOnHue();
			var sortedGrey = createUniqueItemList(greyList, this.factory).sortOnV();
			var full = sortedClrs.base.concat(sortedGrey.base);
			return createUniqueItemList(full, this.factory);
		},
		filterOnCategory: function (vidx) {
			var list = createUniqueItemList(this.factory.listData, this.factory);
			var clrList = list.filterOnValue(this.colourValRange).filterOnSaturation(this.colourRange);
			var greyList = list.base.filter(x => !clrList.base.includes(x));
			switch (vidx) {
				case 0:
					return createUniqueItemList(greyList, this.factory).sortOnV();
				case 1: {
					var l = clrList.filterOnHue(this.redRange0).sortOnHue();
					var r = clrList.filterOnHue(this.redRange1).sortOnHue();
					var full = l.base.concat(r.base);
					return createUniqueItemList(full, this.factory);
				}
				case 2:
					return clrList.filterOnHue(this.bluegreenRange).sortOnHue();
				default:
					return null;
			}
		},
		getRandomIdx() {
			var len = this.getNumCategories();
			return Math.floor(Math.random() * len);
		},
		getFirstNonEmptyIdx() {
			for (var i = 0; i < 3; i++) {
				if (!this.isEmpty(i)) {
					return i;
				}
			}
			return -1;
		}
	}
}

function createSquareImageCarousel(images, idSfx) {
	var panelId = "imgSlider" + idSfx;
	var navId = panelId + "-Nav" + idSfx;
	return {
		images: images,
		panelId: panelId,
		navId: navId,
		createImageCarousel: function (imgdims) {
			return '<div class="col-12 px-0">' + this.createImagePanel(imgdims) +
				this.createImageNav(imgdims) + '</div>';
		},
		createImageNav: function (imgdims) {
			var res = '<div class="flickity-nav mx-n2 mb-2" data-flickity=\'{"asNavFor": "#' + this.panelId + '", "contain": true, "wrapAround": false, "cellAlign": "center", "imagesLoaded": true}\' id="' + this.navId + '">';
			var i = 0;
			for (; i < this.images.getNumImages(); i++) {
				var img = this.images.getImage(i);
				res += '<div class="col-12 px-1" style="max-width: 80px;"><img class="img-fluid" src="' + img.url + '"' +
					(img.text !== undefined ? ' alt="' + img.text + '"' : '') +
					(imgdims !== undefined ? ' width="' + imgdims.width + '" height="' + imgdims.height + '"': "") +
					'></div>';
			}
			res += '</div>';
			return res;
		},
		createImagePanel: function (imgdims) {
			var res = '<div class="mb-2" data-flickity=\'{"wrapAround": false, "contain": true, "draggable": false, "imagesLoaded": true, "fade": true}\' id="' + this.panelId + '">';
			for (var i = 0; i < this.images.getNumImages(); i++) {
				var img = this.images.getImage(i);
				res += '<a href="' + img.url + '" data-fancybox><img src="' + img.url + '"' +
					(img.text !== undefined ? ' alt="' + img.text + '"' : '') +
					(imgdims !== undefined ? ' width="' + imgdims.width + '" height="' + imgdims.height + '"': "") +
					' class="img-fluid"></a>';
			}
			res += '</div>';
			return res;
		},
		update: function () {
			var panelId = this.panelId;
			var eltCarousel = $('#' + panelId);
			eltCarousel.flickity({
				contain: true,
				wrapAround: false,
				draggable: false,
				imagesLoaded: true,
				fade: true
			});

			var navId = this.navId;
			var eltNav = $('#' + navId);
			eltNav.flickity({
				asNavFor: '#' + panelId,
				contain: true,
				wrapAround: false,
				cellAlign: 'center',
				imagesLoaded: true
			});

			$('[data-fancybox]').fancybox({});
		}
	};
}

/*
function createPortraitImageCarousel(images, idSfx, sqNav) {
	var panelId = "imgSlider" + idSfx;
	var navId = panelId + "-Nav" + idSfx;
	return {
		images: images,
		sqNav: sqNav,
		panelId: panelId,
		navId: navId,
		createImageCarousel: function () {
			return '<div class="col-2 px-1">' +
				this.createImageNav() +
				'</div><div class="col-10">' +
				this.createImagePanel() +
				'</div>';
		},
		createImageWithBorder: function (img, bw) {
			return '<div class="mb-' + bw + '"><img class="img-fluid" src="' + img.url + '"' + (img.text !== undefined ? ' alt="' + img.text + '"' : '') + '></div>';
		},
		createSquareImage: function (img, bw) {
			return '<div class="embed-responsive embed-responsive-1by1 bg-cover mb-' + bw + '" style="background-image: url(\'' + img.url + '\');"></div>';
		},
		createImageNav: function () {
			var res = '<div class="flickity-nav flickity-vertical" data-flickity=\'{"asNavFor": "#' + this.panelId + '", "draggable": false, "imagesLoaded": true, "wrapAround": false, "contain": true}\' id="' + this.navId + '">';
			var i = 0;
			for (; i < this.images.getNumImages() - 1; i++) {
				var img = this.images.getImage(i);
				res += this.sqNav ? this.createSquareImage(img, 4) : this.createImageWithBorder(img, "2");
			}
			var img = this.images.getImage(i);
			res += this.sqNav ? this.createSquareImage(img, 4) : this.createImageWithBorder(img, "0");
			res += '</div>';
			return res;
		},
		createImagePanel: function () {
			var res = '<div data-flickity=\'{"draggable": false, "fade": true, "imagesLoaded": true, "wrapAround": false, "contain": true}\' id="' + this.panelId + '">';
			for (var i = 0; i < this.images.getNumImages(); i++) {
				var img = this.images.getImage(i);
				res += '<a href="' + img.url + '" data-fancybox><img src="' + img.url + '"' +
					(img.text !== undefined ? ' alt="' + img.text + '"' : '') +
					' class="img-fluid"></a>';
			}
			res += '</div>';
			return res;
		},
		update: function () {
			var panelId = this.panelId;
			var eltCarousel = $('#' + panelId);
			eltCarousel.flickity({
				contain: true,
				wrapAround: false,
				draggable: false,
				fade: true,
				imagesLoaded: true
			});

			var navId = this.navId;
			var eltNav = $('#' + navId);
			eltNav.flickity({
				contain: true,
				wrapAround: false,
				asNavFor: '#' + panelId,
				draggable: false,
				imagesLoaded: true
			});

			$('[data-fancybox]').fancybox({});
		}
	};
}
*/

function createSquareProductCarousel(prodJSON) {
	return {
		createVariantCarousel: function (varIdx) {
			var images = prodJSON.getImages(varIdx);
			return createSquareImageCarousel(images, "");
		}
	};
}

function createVariantSelector(prodInfo) {
	return {
		prodInfo: prodInfo,
		variants: prodInfo.variants,
		colourRadioName: "colRadio",
		sizeRadioName: "sizeRadio",
		colorCaption: "colorCaption",
		createItem: function (qty) {
			var vidx = this.getSelectedVariant();
			var size = this.getSelectedSize();
			var vnt = this.prodInfo.variants.data[vidx];
			var itmSKU = vnt.vid + "-" + size;
			var imgURL = this.prodInfo.getImages(vidx).getImage(0).url;
			var product = this.prodInfo.product;
			var clr = this.getSelectedColour();
			return createItem(product, product.inrPrice, size, clr, qty, itmSKU, imgURL, false);
		},
		getVarIdx: function (valColour) {
			if (this.variants.data.length == 1 && valColour == undefined) {
				return 0;
			}
			for (var i = 0; i < this.variants.data.length; i++) {
				var variant = this.variants.data[i];
				if (variant.colourName === valColour) {
					return i;
				}
			}
			return -1;
		},
		getSelectedVariant: function () {
			return this.getVarIdx(this.getSelectedColour());
		},
		getSelectedColour: function () {
			var selRadio = $("input[name='" + this.colourRadioName + "']:checked");
			return selRadio.val();
		},
		createFabricPanel: function (varIdx) {
			return '<div class="row mb-4"><div class="col-6 text-left">Fabric: <strong>' + this.variants.getFabric(varIdx) + '</strong></div>'
		},
		createColourPanel: function (name, varIdx) {
			var res = '<div class="col-6 text-right">Colour: <strong id="' + this.colorCaption + '">' + this.variants.getColourName(varIdx) + '</strong></div></div>' + '<div class="mb-8 ml-n1">';
			if (this.variants.data.length > 1) {
				for (var i = 0; i < this.variants.data.length; i++) {
					var opt = this.variants.data[i];
					res += '<div class="custom-control custom-control-inline custom-control-img my-1"><input type="radio" onclick="onColourChange(\'' + opt.colourName + '\')"' + ' class="custom-control-input" id="' + name + i + '" name="' + name + '" value="' + opt.colourName + '"' + (varIdx == i ? " checked" : "") + ' data-toggle="form-caption" data-target="#' + this.colorCaption + '"><label class="custom-control-label" for="' + name + i + '">' /*+ '<span class="embed-responsive embed-responsive-1by1 bg-cover" style="background-image: url(' + this.prodInfo.getImages(i).getImage(0).url + ');"></span>'*/ +
						'<img class="img-fluid" src="' + this.prodInfo.getImages(i).getImage(0).url + '">' +
						'</label></div>';
				}
			}
			res += '</div>';
			return res;
		},
		createSelectorPanel: function (varIdx) {
			return '<div class="form-group">' +
				this.createFabricPanel(varIdx) +
				this.createColourPanel(this.colourRadioName, varIdx) +
				'</div>';
		}
	}
}

function createSizeSelector(sizes, toggleHTML, eventFn, modelTxt, captionTxt) {
	return {
		sizes: sizes,
		toggleHTML: toggleHTML,
		eventFn: eventFn,
		modelTxt: modelTxt,
		captionTxt: captionTxt,
		sizeRadioName: 'sizeRadio',
		getSizeIdx: function (valSize) {
			for (var i = 0; i < this.sizes.length; i++) {
				var size = this.sizes[i];
				if (size === valSize) {
					return i;
				}
			}
			return -1;
		},
		getSelectedSize: function () {
			var selRadio = $("input[name='" + this.sizeRadioName + "']:checked");
			return selRadio.val();
		},
		getSelectedSizeIdx: function () {
			return this.getSizeIdx(this.getSelectedSize());
		},
		createSelectorPanel: function (szIdx) {
			var id = this.sizeRadioName + "Group";
			var res = this.modelTxt + '<div class="form-group"><label for="' + id + '">' + this.captionTxt + ':</label> <span id="' + id + '" class="mb-2">';
			var idPfx = this.sizeRadioName + "ID";
			for (var i = 0; i < this.sizes.length; i++) {
				var checked = (i == szIdx);
				var val = this.sizes[i];
				res += '<div class="custom-control custom-control-inline custom-control-size mb-2">' +
					'<input type="radio" class="custom-control-input" name="' + this.sizeRadioName + '" id="' + idPfx + i + '" value="' + val + '"' + (checked ? 'checked="checked" ' : '') + (this.eventFn !== null ? ' onclick="' + this.eventFn + '(\'' + val + '\')"' : "") + '>' +
					'<label class="custom-control-label" for="' + idPfx + i + '">' + val + '</label></div>';
			}
			res += '</span>' + this.toggleHTML + '</div>';
			return res;
		},
		createDiv: function (szIdx) {
			return this.createSelectorPanel(szIdx);
		}
	}
}

function createColourCategoryUI(categories, caption, colourCategoryFn) {
	return {
		divId: 'catSelector',
		caption: caption,
		categories: categories,
		captionId: 'rangeCaption',
		colourRadioName: "colRadio",
		colourCategoryFn: colourCategoryFn,
		hasCategories: function () {
			return this.categories.hasCategories();
		},
		createCaption: function (caption) {
			return '<strong id="' + this.captionId + '">' + caption + '</strong>';
		},
		setRange: function (range) {
			if (range === undefined) {
				range = this.categories.getCategory(this.getSelectedIdx()).colourName;
			}
			$('#' + this.captionId).replaceWith(this.createCaption(range));
		},
		getCatIdx: function (valColour) {
			return this.categories.getCatIdx(valColour);
		},
		getSelectedIdx: function () {
			return this.getCatIdx(this.getSelectedCategory());
		},
		getSelectedCategory: function () {
			var selRadio = $("input[name='" + this.colourRadioName + "']:checked");
			return selRadio.val();
		},
		createColourPanel: function (name, varIdx) {
			var res = '<div class="mb-4 ml-n1">';
			for (var i = 0; i < this.categories.getNumCategories(); i++) {
				var opt = this.categories.getCategory(i);
				res += '<div class="custom-control custom-control-inline custom-control-img">' +
					'<input type="radio" onclick="' + this.colourCategoryFn + '(\'' + opt.colourName + '\')' + '" class="custom-control-input' + (this.categories.isEmpty(i) ? " cat-color-is-empty" : "") + '" id="' + name + i + '" name="' + name + '" value="' + opt.colourName + '"' + (varIdx == i ? " checked" : "") + '>' +
					'<label class="custom-control-label" for="' + name + i + '"><span class="embed-responsive embed-responsive-1by1 bg-cover" style="background-image: url(' + this.categories.getImage(i).url + ');"></span></label></div>';
			}
			res += '</div>';
			return res;
		},
		createDiv: function (varIdx) {
			var res = '<div id="' + this.divId + '">' + this.caption + ': ' +
				this.createCaption(this.categories.getCategory(varIdx).colourName) +
				this.createColourPanel(this.colourRadioName, varIdx) +
				'</div>';
			return res;
		},
		getNonEmptyCatIdx: function () {
			return this.categories.getFirstNonEmptyIdx();
		},
		updateSelection: function () {
			if (this.hasCategories()) {
				var varIdx = this.getSelectedIdx();
				$('#' + this.divId).replaceWith(this.createDiv(varIdx));
			}
		},
		getItems: function () {
			if (this.hasCategories()) {
				var varIdx = this.getSelectedIdx();
				return this.categories.filterOnCategory(varIdx);
			} else {
				return this.categories.unfiltered();
			}
		}
	}
}

function createColourSizeCategorySelector(categories, sizeSelector) {
	return {
		reasonValidator: SelChangeReason.createValidator([SelChangeReason.colorChange, SelChangeReason.sizeChange]),
		sizeSelector: sizeSelector,
		colourCategoryUI: createColourCategoryUI(categories, "Colour", "onColourChange"),
		getEmptyStatusHTML: function () {
			return '<div class="alert alert-info" role="alert">There are no items that match your selection</div>';
		},
		getItems: function () {
			var size = this.sizeSelector.getSelectedSize();
			return this.colourCategoryUI.getItems().filterOnSize(size).filterFinal();
		},
		updateSelection: function (reason) {
			if (this.reasonValidator.isValid(reason)) {
				this.colourCategoryUI.updateSelection();
			}
		},
		getSelectedIdx: function () {
			return this.colourCategoryUI.getSelectedIdx();
		}
	}
}

function createColourCategorySelector(categories) {
	return {
		reasonValidator: SelChangeReason.createValidator([SelChangeReason.colorCategoryChange]),
		colourCategoryUI: createColourCategoryUI(categories, "Colour Range", "onColourCategoryChange"),
		getEmptyStatusHTML: function () {
			return '<div class="alert alert-info" role="alert">There are no items that match your selection</div>';
		},
		getItems: function () {
			return this.colourCategoryUI.getItems();
		},
		updateSelection: function (reason) {
			if (this.reasonValidator.isValid(reason)) {
				this.colourCategoryUI.updateSelection();
			}
		}
	}
}

function createNavHelper(prodInfo, categorizer, title) {
	return {
		categorizer: categorizer,
		prodInfo: prodInfo,
		title: title,
		getBreadCrumb: function () {
			var levels = [{
				title: 'Shop',
				url: '/shop.html'
			},{
				title: this.title,
				url: this.categorizer.getUrl(this.prodInfo.skuInfo.SKU)
            }, {
				title: this.prodInfo.product.name
            }];
			return createBreadCrumbLevels(levels);
		}
	};
}

function createItemAdder(prodInfo, variantSelector) {
	return {
		prodInfo: prodInfo,
		variantSelector: variantSelector,
		getBtnId: function () {
			return "btnATC";
		},
		createQuantityDiv: function () {
			return '<select class="custom-select"><option value="1" selected>1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select>';
		},
		createAddToCartButton: function () {
			return createAddToCartButton(this.getBtnId());
		},
		getSelectedQty: function () {
			var selOpt = $("select.custom-select");
			return Number(selOpt.val());
		},
		createDiv: function () {
			return '<div class="form-row mb-4"><div class="col-12 col-lg-auto">' +
				this.createQuantityDiv() +
				'</div><div class="col-12 col-lg">' +
				this.createAddToCartButton() +
				'</div></div>';
		}
	};
}

function createRelatedItemCard(SKU, catalog) {
	return {
		SKU: SKU,
		catalog: catalog,
		createCard: function () {
			var entry = this.catalog.getProduct(this.SKU);
			var res = '<div class="card mb-2 px-1 px-md-2"><div class="embed-responsive embed-responsive-1by1"><img class="embed-responsive-item" src="' + entry + '" style="object-fit: cover"></div><div class="card-body">';
			res += ' <a href="' + entry.url + '">' + entry.name + '</a>';
			res += '</div></div>';
			return res;
		}
	};
}

function createRelatedLookCard(SKU, lkImg, idx, styles, catalog) {
	return {
		SKU: SKU,
		lkImg: lkImg,
		idx: idx,
		styles: styles,
		catalog: catalog,
		createCard: function () {
			var res = '<div class="card mb-2 px-1 px-md-2"><div class="embed-responsive embed-responsive-1by1"><img class="embed-responsive-item" src="' + this.lkImg + '" style="object-fit: cover"></div><div class="card-body">';
			var first = true;
			for (var i = 0; i < this.styles.length; i++) {
				var sty = this.styles[i];
				if (sty == this.SKU) {
					continue;
				}
				var entry = this.catalog.getProduct(sty);
				if (!first) {
					res += ' &amp;'
				}
				res += ' <a href="' + entry.url + '">' + entry.name + '</a>';
				first = false;
			}
			res += '</div></div>';
			return res;
		}
	};
}

function createStoryViewer(caption, items, sections, ncol) {
	var res = [];
	for (var s = 0; s < items.length; s++) {
		var itms = items[s];
		var keys = Array.from(itms.keys());
		var rnd = shuffle(keys);
		for (var i = 0; i < itms.length && i < ncol[s]; i++) {
			res.push(createStoryRef(sections[s][rnd[i]], itms[rnd[i]], false));
		}
	}
	return createRelatedViewer(caption, res, 2);
}

function createRelatedViewer(caption, related, ncol) {
	return {
		caption: caption,
		related: related,
		ncol: ncol,
		createDiv: function () {
			var res = '<h6>' + this.caption + '</h6><div class="row no-gutters mx-n1 mx-md-n2">';
			for (var i = 0; i < this.related.length && i < this.ncol; i++) {
				res += '<div class="col-6">' + this.related[i].createCard() + '</div>';
			}
			res += '</div>';
			return res;
		}
	};
}

function createEmptyViewer() {
	return {
		createDiv: function () {
			return '';
		}
	};
}

function createHTMLViewer(html) {
	return {
		html: html,
		createDiv: function () {
			return this.html;
		}
	};
}

function createCatenatedViewer(viewers) {
	return {
		viewers: viewers,
		createDiv: function () {
			var res = '';
			for (var i = 0; i < this.viewers.length; i++) {
				res += this.viewers[i].createDiv();
			}
			return res;
		}
	};
}

pfiavG.sizeModalInfo = {
	sizeDlgId: 'modalSizeChart',
	togglerCaption: 'Size Chart',
	getToggleHTML: function () {
		return createSizeModalToggle(this.sizeDlgId, this.togglerCaption);
	}
}

function createSizePanelr(skuInfo, dimensioner, sizer) {
	return {
		skuInfo: skuInfo,
		dimensioner: dimensioner,
		sizer: sizer,
		sizeDlgId: pfiavG.sizeModalInfo.sizeDlgId,
		contentId: 'sizingContents',
		getSizeModal: function () {
			return getSizeModalWithId(this.sizeDlgId, this.contentId, this.createSizingPanel());
		},
		createSizingPanel: function () {
			var res = '';
			if (this.sizer !== null) {
				res += '<h6>International Sizing</h6>' +
					this.sizer.createSizeChart() +
					'<p>The sizing chart above is only approximate. Please check the actual garment measurements below to find your size. Please email us at prema.florence.isaac@gmail.com or WhatsApp +919443362528 if you have further questions or wish to customize your order.</p>';
			}
			res += '<h6 class="mb-0">Product Measurements</h6>' +
				this.dimensioner.createMeasurementsPanel("cm");
			return res;
		},
		update: function (reason) {
			if (SelChangeReason.genderChange === reason) {
				this.sizer.update();
			} else {
				$("#" + this.sizeDlgId).replaceWith(this.getSizeModal());
			}
		},
		updateUnits: function () {
			var tableid = '#' + this.dimensioner.tableId;
			$(tableid).empty();
			var selRadio = $("input[name='" + this.dimensioner.unitFieldName + "']:checked");
			var units = selRadio.val();
			var table = this.dimensioner.createSizingTable(units, this.skuInfo.sizes);
			$(tableid).append(table);
		}
	};
}

function createBasePanelr(shop, variants, product) {
	return {
		shop: shop,
		variants: variants,
		product: product,
		createBasePanel: function (varidx) {
			return '<h4 class="mb-2">' 
				+ this.product.name + (this.variants === null ? '' : " - " + this.variants.data[varidx].Name)
				+ '</h4>' +
				'<div class="mb-5 text-gray-400"><span class="ml-1 font-size-h5 font-weight-bold">' 
				+ getPriceStringHTML(this.shop, this.product, (this.variants === null ?  undefined : this.variants.data[varidx].vid))
				+ '</span></div>';
		}
	}
}

function createPanelRVs(itemsRV, carouselRV, infoRV, sizingRV) {
	return {
		itemsRV: itemsRV,
		carouselRV: carouselRV,
		infoRV: infoRV,
		sizingRV: sizingRV
	}
}

function createDefaultPanelRVs() {
	return createPanelRVs(
		null,
		SelChangeReason.createValidator([SelChangeReason.colorChange]),
		SelChangeReason.createValidator([SelChangeReason.currencyChange]),
		SelChangeReason.createNullValidator()
	);
}

function createProductComponent(prePanelr, basePanelr, sizePanelr, carousel, variantSelector, sizeSelector, itemAdder, addlViewer, srv) {
	return {
		prePanelr: prePanelr,
		basePanelr: basePanelr,
		sizePanelr: sizePanelr,
		carousel: carousel,
		variantSelector: variantSelector,
		sizeSelector: sizeSelector,
		itemAdder: itemAdder,
		addlViewer: addlViewer,
		srv: srv,
		prodPanelId: 'prodPanel',
		prodImageId: 'prodImages',
		prodInfoId: 'prodInfo',
		getSizeModal: function () {
			return this.sizePanelr.getSizeModal();
		},
		createProductDiv: function (varIdx, szIdx) {
			return '<div class="row" id="' + this.prodPanelId + '"><div class="col-12 col-md-7">' +
				this.prePanelr.createDiv() +
				this.createImageDiv(varIdx) +
				'</div><div class="col-12 col-md-5 pl-lg-10">' +
				this.createInfoDiv(varIdx, szIdx) +
				'</div></div>';
		},
		createItem: function () {
			var qty = this.itemAdder.getSelectedQty();
			var vidx = this.variantSelector.getSelectedVariant();
			var size = this.sizeSelector.getSelectedSize();
			var prodInfo = this.variantSelector.prodInfo;
			var vnt = prodInfo.variants.data[vidx];
			var itmSKU = vnt.vid + "-" + size;
			var imgURL = prodInfo.getImages(vidx).getImage(0).url;
			var product = prodInfo.product;
			var clr = this.variantSelector.getSelectedColour();
			return createItem(product, product.inrPrice, size, clr, qty, itmSKU, imgURL, false);
		},
		updateUnits: function () {
			this.sizePanelr.updateUnits();
		},
		unregisterATC: function () {
			var atcBtnElt = $('#' + this.itemAdder.getBtnId());
			atcBtnElt.off('click');
		},
		registerATC: function (fn) {
			var atcBtnElt = $('#' + this.itemAdder.getBtnId());
			atcBtnElt.on('click', fn);
		},
		updateProductDiv: function () {
			var varIdx = this.variantSelector.getSelectedVariant();
			var szIdx = this.sizeSelector.getSelectedSizeIdx();
			var imageHTML = this.createProductDiv(varIdx, szIdx);

			$("#" + this.prodPanelId).replaceWith(imageHTML);

			this.carousel.createVariantCarousel(varIdx).update();
		},
		updateImageDiv: function () {
			var varIdx = this.variantSelector.getSelectedVariant();
			var imageHTML = this.createImageDiv(varIdx);
			$("#" + this.prodImageId).replaceWith(imageHTML);
			this.carousel.createVariantCarousel(varIdx).update();
		},
		updateInfoDiv: function () {
			var varIdx = this.variantSelector.getSelectedVariant();
			var szIdx = this.sizeSelector.getSelectedSizeIdx();
			var infoHTML = this.createInfoDiv(varIdx, szIdx);
			$("#" + this.prodInfoId).replaceWith(infoHTML);
		},
		updateSelection: function (reason) {
			if (this.srv.carouselRV.isValid(reason)) {
				this.updateImageDiv();
			}
			if (this.srv.infoRV.isValid(reason)) {
				this.updateInfoDiv();
			}
			if (this.srv.sizingRV.isValid(reason)) {
				this.sizePanelr.update(reason);
			}
		},
		createImageDiv: function (varIdx) {
			return '<div class="row mb-4" id="' + this.prodImageId + '">' +
				this.carousel.createVariantCarousel(varIdx).createImageCarousel(undefined) +
				'</div>';
		},
		createInfoDiv: function (varIdx, szIdx) {
			var res = '<div id="' + this.prodInfoId + '">' + this.basePanelr.createBasePanel(varIdx) + '<form>' +
				this.variantSelector.createSelectorPanel(varIdx) +
				this.sizeSelector.createSelectorPanel(szIdx) +
				this.itemAdder.createDiv() +
				'</form>' +
				this.addlViewer.createDiv() +
				'</div>';
			return res;
		}
	};
}

function createUIProductComponent(prePanelr, basePanelr, sizePanelr, carousel, addlViewer, vntSelector, srv, varidx) {
	return {
		prePanelr: prePanelr,
		basePanelr: basePanelr,
		sizePanelr: sizePanelr,
		varidx: varidx,
		vntSelector: vntSelector,
		carousel: carousel,
		addlViewer: addlViewer,
		srv: srv,
		prodPanelId: 'prodPanel',
		prodImageId: 'prodImages',
		prodInfoId: 'prodInfo',
		getSizeModal: function () {
			return this.sizePanelr.getSizeModal();
		},
		createProductDiv: function () {
			return '<div class="row" id="' + this.prodPanelId + '"><div class="col-12 col-md-7">' +
				this.prePanelr.createDiv() +
				this.createImageDiv() +
				'</div><div class="col-12 col-md-5 pl-lg-10">' +
				this.createInfoDiv() +
				'</div></div>';
		},
		updateUnits: function () {
			this.sizePanelr.updateUnits();
		},
		updateProductDiv: function () {
			var imageHTML = this.createProductDiv();
			$("#" + this.prodPanelId).replaceWith(imageHTML);
			this.carousel.createVariantCarousel(this.varidx).update();
		},
		updateImageDiv: function () {
			let that = this;
			var divImgId = "#" + this.prodImageId;
			$(divImgId).fadeOut("slow", function () {
				var imageHTML = that.createImageDiv();
				$(this).replaceWith(imageHTML);
				that.carousel.createVariantCarousel(that.varidx).update();
				$(divImgId).fadeIn("slow");
			});
		},
		updateInfoDiv: function () {
			let that = this;
			var divInfoId = "#" + this.prodInfoId;
			$(divInfoId).fadeOut("slow", function () {
				var infoHTML = that.createInfoDiv();
				$(this).replaceWith(infoHTML);
				$(divInfoId).fadeIn("slow");
			})
		},
		updateVariant: function () {
			var newid = this.vntSelector.getSelectedIdx();
			if (newid !== -1) {
				this.varidx = newid;
			}
		},
		updateSelection: function (reason) {
			this.updateVariant();
			if (this.srv.carouselRV.isValid(reason)) {
				this.updateImageDiv();
			}
			if (this.srv.infoRV.isValid(reason)) {
				this.updateInfoDiv();
			}
			if (this.srv.sizingRV.isValid(reason)) {
				this.sizePanelr.update(reason);
			}
		},
		createImageDiv: function () {
			return '<div class="row mb-4" id="' + this.prodImageId + '">' +
				this.carousel.createVariantCarousel(this.varidx).createImageCarousel(undefined) +
				'</div>';
		},
		createInfoDiv: function () {
			var res = '<div id="' + this.prodInfoId + '">' + this.basePanelr.createBasePanel(this.varidx) +
				this.addlViewer.createDiv() + '</div>';
			return res;
		}
	};
}

function createSingleImageCreator() {
	return {
		createImageDiv: function (images, btnId, imgdim) {
			var img = images.getImage(0);
			return '<a href="' + img.url + '" data-fancybox><img src="' + img.url + '" alt="' + img.text + '" class="img-fluid"'
			+ (imgdim !== undefined ? ' height=\"' + imgdim.height + '" width=\"' + imgdim.width + '"' : "")
			+ '></a>';
		},
		updateImg: function (images, id) {}
	};
}

function createCarouselImageCreator(carouselFn) {
	return {
		carouselFn: carouselFn,
		createImageDiv: function (images, btnId, imgdim) {
			return '<div class="row"><div class="col-12"><div class="form-row mb-4">' + this.carouselFn(images, btnId).createImageCarousel(imgdim) + '</div></div></div>';
		},
		updateImg: function (images, id) {
			this.carouselFn(images, id).update();
		},
	};
}

function createUICardCreatorBase(imgCreator, colClasses) {
	return {
		imgCreator: imgCreator,
		colClasses: colClasses,
		createCard: function (images, btnId, priceHTML, desc) {
			var res = '<div class="card mb-2 px-1 px-md-2">';
			res += this.imgCreator.createImageDiv(images, btnId, desc.imgdim);
			res += '<div class="card-body px-0 pt-2 pb-4 text-center">';
			res += '<div class="card-title mb-2"><span>' + desc.getCWDesc() + '</span></div>';
			res += '<div class="card-subtitle mb-3"><span>' + priceHTML + '</span></div>';
			if (desc.getSize() !== undefined && desc.getSize() !== null) {
				res += '<p>Size: ' + desc.getSize() + '</p>'
			}
			if (desc.isAvailable()) {
				res += createAddToCartButton(btnId);
			} else {
				res += '<div class="alert alert-primary text-center" role="alert">' + desc.getCollectedText() + '</div>';
			}
			res += '</div></div>';
			return res;
		},
		updateCard: function (images, id) {
			this.imgCreator.updateImg(images, id);
		},
	};
}

function createUICardCreator() {
	return createUICardCreatorBase(createSingleImageCreator(), 'col-6 col-sm-4');
}

function createArtWearCardCreator(carouselFn) {
	return createUICardCreatorBase(createCarouselImageCreator(carouselFn), 'col-12 col-sm-6');
}

function createUniqueItemsComponent(shop, items, productComponentFactory, productComponent, itemCategorySelector, sizeSelector, cardCreator, itemsRV, urlUpdater) {
	return {
		shop: shop,
		items: items,
		productComponentFactory: productComponentFactory,
		productComponent: productComponent,
		itemCategorySelector: itemCategorySelector,
		sizeSelector: sizeSelector,
		cardCreator: cardCreator,
		itemsRV: itemsRV,
		urlUpdater: urlUpdater,
		listId: 'artwear-list',
		updateURL: function (reason) {
			if (!this.itemsRV.isValid(reason)) {
				return;
			}
			this.urlUpdater.updateURL(reason);
		},
		getBreadCrumb: function () {
			return this.productComponentFactory.navHelper.getBreadCrumb();
		},
		createCard: function (i) {
			return this.cardCreator.createCard(
				this.items.getImages(i),
				this.getButtonId(i),
				this.shop.getFXPriceHTML(this.items.getINRPrice(i)),
				this.items.getDescriptor(i));
		},
		createCards: function () {
			if (this.items.base.length == 0) {
				return this.itemCategorySelector.getEmptyStatusHTML();
			}
			var ret = '<div class="row no-gutters mx-n1 mx-md-n2">';
			for (var i = 0; i < this.items.base.length; i++) {
				ret += '<div class="' + this.cardCreator.colClasses + '">'
				ret += this.createCard(i);
				ret += '</div>'
			}
			ret += '</div>'
			return ret;
		},
		updateCards: function () {
			for (var i = 0; i < this.items.base.length; i++) {
				this.cardCreator.updateCard(this.items.getImages(i), this.getButtonId(i));
			}
		},
		getNumItems: function () {
			return items.getNumItems();
		},
		getButtonId: function (idx) {
			return 'btnId' + idx;
		},
		createItem: function (i) {
			var unique = this.items.getDescriptor(i);
			var size = this.sizeSelector.getSelectedSize();
			return createItem(this.items.factory.product, unique.getCWPrice(), size, unique.fabricColour, 1, unique.number, unique.getImagePath(0), true);
		},
		createHTML: function (list) {
			return '<form action="/shop/checkout.html" method="get"><div id="' + this.listId + '" class="item">' +
				list +
				'</div></form>';
		},
		createDiv: function () {
			return this.createHTML("");
		},
		unregisterATC: function () {
			if (this.items === null) {
				return;
			}
			for (var i = 0; i < this.getNumItems(); i++) {
				var eltBnd = $("#" + this.getButtonId(i));
				eltBnd.off('click');
			}
		},
		registerATC: function (fn) {
			if (this.items === null) {
				return;
			}
			for (var i = 0; i < this.getNumItems(); i++) {
				var eltBnd = $("#" + this.getButtonId(i));
				let idx = i;
				eltBnd.on('click', function () {
					fn(idx);
				});
			}
		},
		updateItemCategories: function (fn, reason) {
			if (!this.itemsRV.isValid(reason)) {
				return;
			}
			this.unregisterATC();

			this.items = this.itemCategorySelector.getItems();

			var divId = '#' + this.listId;
			$(divId + ' .btn').off('click');

			let that = this;
			$(divId).fadeOut("slow", function () {
				var listHTML = that.createHTML(that.createCards());
				$(this).replaceWith(listHTML);
				that.updateCards();
				$(divId).fadeIn("slow");
				that.registerATC(fn);
			})
		},
		updateSelection: function (shop, fn, reason) {
			if (SelChangeReason.currencyChange === reason) {
				this.shop = shop;
			}
			this.productComponent = this.productComponentFactory.createProductComponent(shop);
			this.productComponent.updateSelection(reason);
			this.updateItemCategories(fn, reason);
			this.itemCategorySelector.updateSelection(reason);
		},
		updateUnits: function () {
			this.productComponent.updateUnits();
		}
	};
}

function createProductComponentFactory(prodInfo, dimensioner, sizer, addlViewer, navHelper, modelTxt, captionTxt, isStacked) {
	var prePanelr = createEmptyViewer();
	var sizePanelr = createSizePanelr(prodInfo.skuInfo, dimensioner, sizer);
	var carousel = createSquareProductCarousel(prodInfo);
	var variantSelector = createVariantSelector(prodInfo);
	var sizeSelector = createSizeSelector(prodInfo.skuInfo.sizes, pfiavG.sizeModalInfo.getToggleHTML(), 'onSizeChange', modelTxt, captionTxt);
	var itemAdder = createItemAdder();
	var srv = createDefaultPanelRVs();
	return {
		createProductComponent: function (shop) {
			var basePanelr = createBasePanelr(shop, null, prodInfo.product);
			return createProductComponent(prePanelr, basePanelr, sizePanelr, carousel, variantSelector, sizeSelector, itemAdder, addlViewer, srv);
		},
		getBreadCrumb: function () {
			return navHelper.getBreadCrumb();
		}
	};
}

function createPageComponent(prodInfo, catalog, productComponentFactory) {
	return {
		catalog: catalog,
		prodInfo: prodInfo,
		productComponentFactory: productComponentFactory,
		allCartC: null,
		sizeVal: null,
		clrVal: null,
		init: function (shop) {
			this.allCartC = createAllCartComponents(shop, this);
		},
		updateURL: function (arg) {

		},
		updateBreadCrumb: function () {
			$('.breadcrumb').replaceWith(this.productComponentFactory.getBreadCrumb())
		},
		createProductComponent: function (shop) {
			return this.productComponentFactory.createProductComponent(shop);
		},
		getProductComponent: function () {
			return this.createProductComponent(this.allCartC.shop);
		},
		addToCart: function () {
			var item = this.getProductComponent().createItem();
			return this.allCartC.addToCart(item);
		},
		updateItemPrices: function () {
			updatePageItemPrices(this.catalog, this.allCartC.shop);
		},
		unregisterATC: function () {
			this.getProductComponent().unregisterATC();
		},
		registerATC: function () {
			let that = this;
			this.getProductComponent().registerATC(function () {
				that.addToCart();
			});
		},
		onSelectionChange: function (reason, value) {
			this.unregisterATC();
			this.getProductComponent().updateSelection(reason);
			this.registerATC();
			this.updateItemPrices();
		},
		onReadyState() {
			this.unregisterATC();
			this.updateBreadCrumb();
			this.registerATC();
			this.updateItemPrices();
		},
		onUnitChange: function () {
			this.getProductComponent().updateUnits();
		}
	}
}

function createUIPageComponent(catalog, itemsComponent, itemsComponentFactory) {
	return {
		catalog: catalog,
		itemsComponent: itemsComponent,
		itemsComponentFactory: itemsComponentFactory,
		allCartC: null,
		clrVal: null,
		colRngVal: null,
		sizeVal: null,
		init: function (shop) {
			this.allCartC = createAllCartComponents(shop, this);
		},
		addToCart: function (i) {
			var item = this.itemsComponent.createItem(i);
			return this.allCartC.addToCart(item);
		},
		updateItemPrices: function () {
			updatePageItemPrices(this.catalog, this.allCartC.shop);
		},
		updateSelection: function (reason) {
			var that = this;
			this.itemsComponent.updateSelection(
				this.allCartC.shop,
				function (idx) {
					that.addToCart(idx);
				},
				reason);
		},
		updateURL: function (reason) {
			this.itemsComponent.updateURL(reason);
		},
		updateBreadCrumb: function () {
			$('.breadcrumb').replaceWith(this.itemsComponent.getBreadCrumb())
		},
		onSKUChange: function (sku) {
			pfiavG.pageIdx.page['SKU'] = sku;
			pfiavG.pageIdx.page['SKUvid'] = sku;
			var icGen = this.itemsComponentFactory.createGenerator(sku);
			this.itemsComponent = icGen.createUIC(this.allCartC.shop);
			this.updateSelection(SelChangeReason.skuChange);
			this.itemsComponentFactory.updateURL(sku);
			this.updateBreadCrumb();
		},
		onColourCategoryChange: function (colRngVal) {
			if (this.colRngVal === colRngVal) {
				return;
			}
			if (this.itemsComponent.itemCategorySelector.colourCategoryUI.hasCategories()) {
				this.itemsComponent.itemCategorySelector.colourCategoryUI.setRange(colRngVal);
			}
			this.updateURL(null);
			this.updateSelection(SelChangeReason.colorCategoryChange);
			this.updateItemPrices();
			this.colRngVal = colRngVal;
		},
		valueChanged(reason, newval) {
			switch (reason) {
				case SelChangeReason.sizeChange:
					return this.sizeVal !== newval;
				case SelChangeReason.colorChange:
					return this.clrVal !== newval;
				case SelChangeReason.colorCategoryChange:
					return this.colRngVal !== newval;
				case SelChangeReason.currencyChange:
					return true;
				case SelChangeReason.genderChange:
					return true;
				default:
					return false;
			}
		},
		updateValue(reason, newval) {
			switch (reason) {
				case SelChangeReason.sizeChange:
					return this.sizeVal = newval;
				case SelChangeReason.colorChange:
					return this.clrVal = newval;
				case SelChangeReason.colorCategoryChange:
					return this.colRngVal = newval;
				default:
					return undefined;
			}
		},
		onSelectionChange: function (reason, value) {
			if (!this.valueChanged(reason, value)) {
				return;
			}
			this.updateURL(reason);
			this.updateSelection(reason);
			this.updateItemPrices();
			this.updateValue(reason, value);
		},
		onReadyState() {
			this.onColourCategoryChange();
			this.updateBreadCrumb();
		},
		onUnitChange: function () {
			this.itemsComponent.updateUnits();
		}
	}
}

function renderProductDetails(summary, detailsHTML, washcareHTML, shippingInfoHTML) {
	var res = '<section class="pt-1"><div class="container"><div class="row"><div class="col-12"><div class="nav nav-tabs nav-overflow justify-content-start justify-content-md-center border-bottom">';
	if (summary !== null) {
		res += '<a class="nav-link active" data-toggle="tab" href="#description">Summary</a>';
	}
	if (detailsHTML !== null) {
		res += '<a class="nav-link' + (summary === null ? ' active' : '') + '" data-toggle="tab" href="#details">Details</a>';
	}
	if (washcareHTML !== null) {
		res += '<a class="nav-link" data-toggle="tab" href="#care">Care</a>';
	}
	if (shippingInfoHTML !== null) {
		res += '<a class="nav-link" data-toggle="tab" href="#shipping">Shipping</a>';
	}
	res += '</div><div class="tab-content">';
	if (summary !== null) {
		res += '<div class="tab-pane fade show active" id="description"><div class="item py-2">' +
			summary +
			'</div></div>';
	}
	if (detailsHTML !== null) {
		res += '<div class="tab-pane fade' + (summary === null ? ' show active' : '') + '" id="details"><div class="item py-2">' +
			detailsHTML +
			'</div></div>';
	}
	if (washcareHTML !== null) {
		res += '<div class="tab-pane fade" id="care"><div class="item py-2">' +
			washcareHTML +
			'</div></div>';
	}
	if (shippingInfoHTML !== null) {
		res += '<div class="tab-pane fade" id="shipping"><div class="item py-2">' +
			shippingInfoHTML +
			'</div></div>';
	}
	res += '</div></div></div></div></section>';
	return res;
}

const khadi_washcareHTML = "<ul><li>Machine Wash Cold</li><li>Mild Detergent</li><li>Gentle Cycle</li><li>Do Not Bleach</li><li>Dry In Shade</li><li>Medium Iron</li></ul>";

const pret_shippingHTML = getShippingInfoUL(['If the item is in stock,  it will be ready to ship within 1 business day of your order.', 'If the item is not in stock, it will be ready to ship within 2-3 business days of your order.']);

const tangail_washcareHTML = "<ul><li>Machine Wash Cold</li><li>Mild Detergent</li><li>Gentle Cycle</li><li>Do Not Bleach</li><li>Dry In Shade</li><li>Medium Iron</li></ul>";

const surmesure_shippingHTML = getShippingInfoUL(['If the item is in stock,  it will be ready to ship within 1 business day of your order.', 'If the item is not in stock, it will be ready to ship within 2-3 business days of your order.']);
