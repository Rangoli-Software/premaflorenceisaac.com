function hexToRGB(hexRGB) {
    return {
        r: parseInt (hexRGB.substr(1,2), 16), 
        g: parseInt (hexRGB.substr(3,2), 16),
        b: parseInt (hexRGB.substr(5,2), 16)
    };
}

function rgbToHSL(hexRGB) {
    var r = hexRGB.r / 255;
    var g = hexRGB.g / 255
    var b = hexRGB.b / 255;

    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return {
        h: h,
        s: s,
        l: l
    };
}

function hexToHSL(hexRGB){
    return rgbToHSL(hexToRGB(hexRGB));
}

function createBrowseInfo(infoSections, numSections, baseBlackList) {
    return {
        infoSections: infoSections,
        numSections: numSections,
        baseList: baseBlackList.splice(),
        getArticles: function() {
            var res = [];
            for( var i = 0; i < infoSections.length; i++ ) {
                var section = infoSections[i];
                var sec = [];
                for ( var j = 0; j < section.length; j++ ) {
                    var info = section[j];
                    sec.push(getSubEntry(info[0], info[1]));
                }
                res.push(sec);
            }
            return res;
        },
        getSections: function() {
            var res = [];
            for( var i = 0; i < infoSections.length; i++ ) {
                var section = infoSections[i];
                var sec = [];
                for ( var j = 0; j < section.length; j++ ) {
                    var info = section[j];
                    sec.push(info[0]);
                }
                res.push(sec);
            }
            return res;
        },
        getFlattenedURLs: function() {
            var res = [];
            for(var i = 0; i < infoSections.length; i++) {
                var section = infoSections[i];
                for (var j = 0; j < section.length; j++) {
                    var info = section[j];
                    res.push(info[1]);
                }
            }
            return res;
        },
        getStoryViewer: function() {
            return createStoryViewer('Background', this.getArticles(), this.getSections(), this.numSections);
        }
    };
}

function createComponentGenerator(uiFactory, prodJSON, viewerFactory, colSelData, isSquare, cardCreator) {
    return {
        viewerFactory: viewerFactory,
        cardCreator: cardCreator,
        uiFactory: uiFactory,
        prodJSON: prodJSON,
        colSelData: colSelData,
        isSquare: isSquare,
        createPCFactory: function() {
            var levels = [{
                title: 'Shop',
                url: '/shop.html'
            }, {
                title: this.prodJSON.product.name
            }];
            var navHelper = createLevelsNavHelper(levels);

            var dimensioner = createDimensioner("cm", this.prodJSON.dimensionNames, this.prodJSON.dimensionsCm, this.prodJSON.styleImagePath);
            var carousel = this.isSquare 
                ? createSquareProductCarousel(this.prodJSON.variants)
                : createProductCarousel(this.prodJSON.variants);

            var sizePanelr = createSizePanelr(this.prodJSON.skuInfo, dimensioner, null);
            var addlViewer = this.viewerFactory.create();
            var that = this;
            return {
                createProductComponent: function(shop) {
                    var basePanelr = createBasePanelr(shop, that.prodJSON.product)
                    return createUIProductComponent(basePanelr, sizePanelr, carousel, addlViewer);
                }
            };
        },
        createItemCatSelector: function() {
            var selCategory = createColourCategories(
                this.prodJSON.product, this.colSelData, this.uiFactory);
            return createItemCategorySelector(this.prodJSON, selCategory);
        },
        createUIC: function(shop) {
            var items = createUniqueItemList(this.uiFactory.listData, this.prodJSON.product, this.uiFactory);
            var productComponentFactory = this.createPCFactory();
            var itemCategorySelector = this.createItemCatSelector();
            var productComponent = productComponentFactory.createProductComponent(shop);
            return createUniqueItemsComponent(items, productComponentFactory, productComponent, itemCategorySelector, this.cardCreator);
        }
    };
}

function createUIProductJSON(sku, basePath, prodData, sizingChart) {
    return {
        product: getProductCatalog().getProduct(sku),
        styleImagePath: basePath + prodData.imageFile,
        dimensionNames: prodData.dimensionNames,
        dimensionsCm: prodData.dimensionsCm,
        variants: {
            getFabric: function(varidx) {
                return prodData.getFabric(varidx);
            },
            getColourName: function(varidx) {
                return this.data[varidx].colourName;
            },
            getBasePath: function() {
                return basePath;
            },
            getNumImages: function(vidx) {
                var vnt = this.data[vidx];
                return vnt.images.length;
            },
            getImage: function(vidx, iidx) {
                var vnt = this.data[vidx];
                return {
                    url: this.getBasePath() + vnt.images[iidx] + ".jpg"
                }
            },
            data: prodData.data
        },
        skuInfo: {
            SKU: sku,
            sizes: prodData.sizes,
            getSizeChart: function() {
                return sizingChart;
            },
            description: prodData.description,
            garmentDetails: prodData.garmentDetails
        }
    }
}

function createUniqueItemList(listdata, product, factory) {
    return {
        base: listdata,
        product: product,
        factory: factory,
        getNumItems: function() {
            return this.base.length;
        },
        getId: function(i) {
            return this.base[i][0];
        },
        getDescriptor: function(i) {
            return this.factory.createDescriptor(this.base[i]);
        },
        getItem: function(i, size) {
            var desc = this.getDescriptor(i);
            return createItem(product, product.inrPrice, size, desc.fabricColour, 1, desc.number, desc.imageURL, true);
        },
        filterOnValue: function(range) {
            var nList = [];
            for(var i = 0; i < this.base.length; i++) {
                var val = this.getDescriptor(i).getV();
                if (range[0] < val && val <= range[1]) {
                    nList.push(this.base[i]);
                }
            }
            return createUniqueItemList(nList, this.product, this.factory);
        },
        filterOnSaturation: function(range) {
            var nList = [];
            for(var i = 0; i < this.base.length; i++) {
                var val = this.getDescriptor(i).getSat();
                if (range[0] < val && val <= range[1]) {
                    nList.push(this.base[i]);
                }
            }
            return createUniqueItemList(nList, this.product, this.factory);
        },
        filterOnHue: function(range) {
            var nList = [];
            for(var i = 0; i < this.base.length; i++) {
                var val = this.getDescriptor(i).getHue();
                if (range[0] < val && val <= range[1]) {
                    nList.push(this.base[i]);
                }
            }
            return createUniqueItemList(nList, this.product, this.factory);
        }
    };
}

function createColourCategories(product, data, factory) {
    return {
        product: product,
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
        data: data,
        getImage: function(vidx) {
            var vnt = this.data[vidx];
            return {
                url: this.factory.base + vnt.image + ".jpg"
            }
        },
        filterOnCategory: function(vidx) {
            var list = createUniqueItemList(this.factory.listData, this.product, this.factory);
            var clrList = list.filterOnValue(this.colourValRange).filterOnSaturation(this.colourRange);
            var greyList = list.base.filter(x => ! clrList.base.includes(x));
            switch(vidx) {
                case 0: return createUniqueItemList(greyList, this.product, this.factory);
                case 1: {
                    var r = clrList.filterOnHue(this.redRange0);
                    var l = clrList.filterOnHue(this.redRange1);
                    var full = l.base.concat(r.base);
                    return createUniqueItemList(full, this.product, this.factory);
                }
                case 2: return clrList.filterOnHue(this.greenRange);
                case 3: return clrList.filterOnHue(this.blueRange);
                default: return null;
            }
        },
        getRandomIdx(){
            var len = this.data.length;
            return Math.floor(Math.random() * len);
        }
    }
}

function createSquareProductCarousel(variants) {
    return {
        variants: variants,
        getPanelId: function () {
            return "imgSlider";
        },
        getNavId: function () {
            return this.getPanelId() + "-Nav";
        },
        createImageCarousel: function (varIdx) {
            return '<div class="col-12">' + this.createImagePanel(varIdx) 
                + this.createImageNav(varIdx) + '</div>';
        },
        createImageNav: function (varIdx) {
            var res = '<div class="flickity-nav mx-n2 mb-2" data-flickity=\'{"asNavFor": "#' + this.getPanelId() + '", "contain": true, "wrapAround": false, "cellAlign": "center"}\' id="' + this.getNavId() + '">';
            var i = 0;
            for (; i < this.variants.getNumImages(varIdx); i++) {
                var img = this.variants.getImage(varIdx, i);
                res += '<div class="col-12 px-1" style="max-width: 80px;"><img class="img-fluid" src="' + img.url + '"></div>';
            }
            res += '</div>';
            return res;
        },
        createImagePanel: function (varIdx) {
            var res = '<div class="card"><div class="mb-2" data-flickity=\'{"draggable": false, "fade": true}\' id="' + this.getPanelId() + '">';
            for (var i = 0; i < this.variants.getNumImages(varIdx); i++) {
                var img = this.variants.getImage(varIdx, i);
                res += '<a href="' + img.url + '" data-fancybox><img src="' + img.url + '" class="card-img-top"></a>';
            }
            res += '</div></div>';
            return res;
        },
        update: function() {
            var panelId = this.getPanelId();
            var eltCarousel = $('#' + panelId);
            eltCarousel.flickity({
                draggable: false,
                fade: true
            });

            var navId = this.getNavId();
            var eltNav = $('#' + navId);
            eltNav.flickity({
                asNavFor: '#' + panelId,
                contain: true,
                wrapAround: false,
                cellAlign: 'center'
            });

            $('[data-fancybox]').fancybox({});
        }
    };
}

function createProductCarousel(variants) {
    return {
        variants: variants,
        getPanelId: function () {
            return "imgSlider";
        },
        getGallery: function () {
            return "gallery";
        },
        getNavId: function () {
            return this.getPanelId() + "-Nav";
        },
        createImageCarousel: function (varIdx) {
            return '<div class="col-2 px-1">' +
                this.createImageNav(varIdx) +
                '</div><div class="col-10">' +
                this.createImagePanel(varIdx) +
                '</div>';
        },
        createImageNav: function (varIdx) {
            var res = '<div class="flickity-nav flickity-vertical" data-flickity=\'{"asNavFor": "#' + this.getPanelId() + '", "draggable": false}\' id="' + this.getNavId() + '">';
            var i = 0;
            for (; i < this.variants.getNumImages(varIdx) - 1; i++) {
                var img = this.variants.getImage(varIdx, i);
                res += '<div class="mb-2"><img class="img-fluid" src="' + img.url + '"></div>';
            }
            var img = this.variants.getImage(varIdx, i);
            res += '<div class="mb-0"><img class="img-fluid" src="' + img.url + '"></div>';
            res += '</div>';
            return res;
        },
        createImagePanel: function (varIdx) {
            var res = '<div class="card"><div data-flickity=\'{"draggable": false, "fade": true}\' id="' + this.getPanelId() + '">';
            for (var i = 0; i < this.variants.getNumImages(varIdx); i++) {
                var img = this.variants.getImage(varIdx, i);
                res += '<a href="' + img.url + '" data-fancybox="' + this.getGallery() + '"><img src="' + img.url + '" class="img-fluid"></a>';
            }
            res += '</div></div>';
            return res;
        },
        update: function() {
            var panelId = this.getPanelId();
            var eltCarousel = $('#' + panelId);
            eltCarousel.flickity({
                draggable: false,
                fade: true
            });

            var navId = this.getNavId();
            var eltNav = $('#' + navId);
            eltNav.flickity({
                asNavFor: '#' + panelId,
                draggable: false
            });

            $('[data-fancybox="' + this.getGallery() + '"]').fancybox({});
        }
    };
}

function createVariantSelector(prodInfo) {
    return {
        prodInfo: prodInfo,
        variants: prodInfo.variants,
        colourRadioName: "colRadio",
        sizeRadioName: "sizeRadio",
        createItem: function (qty) {
            var vidx = this.getSelectedVariant();
            var size = this.getSelectedSize();
            var vnt = this.prodInfo.variants.data[vidx];
            var itmSKU = vnt.vid + "-" + size;
            var imgURL = this.prodInfo.variants.getImage(vidx, 0).url;
            var product = this.prodInfo.product;
            var clr = this.getSelectedColour();
            return createItem(product, product.inrPrice, size, clr, qty, itmSKU, imgURL, false);
        },
        getVarIdx: function (valColour) {
            for (var i = 0; i < this.variants.data.length; i++) {
                var variant = this.variants.data[i];
                if (variant.colourName === valColour) {
                    return i;
                }
            }
            return -1;
        },
        getSizeIdx: function (valSize) {
            for (var i = 0; i < this.prodInfo.skuInfo.sizes.length; i++) {
                var size = this.prodInfo.skuInfo.sizes[i];
                if (size === valSize) {
                    return i;
                }
            }
            return -1;
        },
        getSelectedVariant: function() {
            return this.getVarIdx(this.getSelectedColour());
        },
        getSelectedColour: function () {
            var selRadio = $("input[name='" + this.colourRadioName + "']:checked");
            return selRadio.val();
        },
        getSelectedSize: function () {
            var selRadio = $("input[name='" + this.sizeRadioName + "']:checked");
            return selRadio.val();
        },
        createFabricPanel: function (varIdx) {
            return '<div class="row mb-4"><div class="col-5 text-left">Fabric: <strong>' + this.variants.getFabric(varIdx) + '</strong></div>'
        },
        createColourPanel: function (name, varIdx) {
            var res = '<div class="col-7 text-right">Colour: <strong id="colorCaption">' + this.variants.getColourName(varIdx) + '</strong></div></div>' + '<div class="mb-8 ml-n1">';
            for (var i = 0; i < this.variants.data.length; i++) {
                var opt = this.variants.data[i];
                res += '<div class="custom-control custom-control-inline custom-control-img"><input type="radio" onclick="onSelectionChange()" class="custom-control-input" id="' + name + i + '" name="' + name + '" value="' + opt.colourName + '"' + (varIdx == i ? " checked" : "") + '><label class="custom-control-label" for="' + name + i + '"><span class="embed-responsive embed-responsive-1by1 bg-cover" style="background-image: url(' + this.variants.getImage(i, 0).url + ');"></span></label></div>';
            }
            res += '</div>';
            return res;
        },
        createSelectorPanel: function(varIdx, szIdx) {
            var sz = this.prodInfo.skuInfo.sizes[0];
            return '<div class="form-group">'
                + this.createFabricPanel(varIdx)
                + this.createColourPanel(this.colourRadioName, varIdx)
                + '</div>'
                + '<div class="mb-3">Model is 5 ft 7 in (173 cm)' + (sz == 'Free' ? '' : ' and wearing size S') + '</div>'
                + createSizeOptions(this.sizeRadioName, "Size", this.prodInfo.skuInfo.sizes, szIdx, 'Size chart');
        }
    }
}

function createSizeOnlySelector(skuInfo, variants) {
    return {
        skuInfo: skuInfo,
        variants: variants,
        sizeRadioName: "sizeRadio",
        getSelectedVariant: function() {
            return 0;
        },
        getSizeIdx: function (valSize) {
            for (var i = 0; i < this.skuInfo.sizes.length; i++) {
                var size = this.skuInfo.sizes[i];
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
        createSelectorPanel: function(varIdx, szIdx) {
            return createSizeOptions(this.sizeRadioName, "Size", this.skuInfo.sizes, szIdx, 'Size chart');
        }
    }
}

function createNullSelector(skuInfo, variants) {
    return {
        skuInfo: skuInfo,
        variants: variants,
        sizeRadioName: "sizeRadio",
        getSelectedVariant: function() {
            return 0;
        },
        getSizeIdx: function (valSize) {
            for (var i = 0; i < this.skuInfo.sizes.length; i++) {
                var size = this.skuInfo.sizes[i];
                if (size === valSize) {
                    return i;
                }
            }
            return -1;
        },
        getSelectedSize: function () {
            return this.skuInfo.sizes[0];
        },
        createSelectorPanel: function(varIdx, szIdx) {
            return "";
        }
    }
}

function createItemCategorySelector(prodInfo, categories) {
    return {
        prodInfo: prodInfo,
        categories: categories,
        divId: 'catSelector',
        colourRadioName: "colRadio",
        sizeRadioName: "sizeRadio",
        getCatIdx: function (valColour) {
            for (var i = 0; i < this.categories.data.length; i++) {
                var variant = this.categories.data[i];
                if (variant.colourName === valColour) {
                    return i;
                }
            }
            return -1;
        },
        getSizeIdx: function (valSize) {
            for (var i = 0; i < this.prodInfo.skuInfo.sizes.length; i++) {
                var size = this.prodInfo.skuInfo.sizes[i];
                if (size === valSize) {
                    return i;
                }
            }
            return -1;
        },
        getSelectedColour: function () {
            var selRadio = $("input[name='" + this.colourRadioName + "']:checked");
            return selRadio.val();
        },
        getSelectedSize: function () {
            var selRadio = $("input[name='" + this.sizeRadioName + "']:checked");
            return selRadio.val();
        },
        createColourPanel: function (name, varIdx) {
            var res = '<div class="mb-4 ml-n1">';
            for (var i = 0; i < this.categories.data.length; i++) {
                var opt = this.categories.data[i];
                res += '<div class="custom-control custom-control-inline custom-control-img"><input type="radio" onclick="onSelectionChange()" class="custom-control-input" id="' + name + i + '" name="' + name + '" value="' + opt.colourName + '"' + (varIdx == i ? " checked" : "") + '><label class="custom-control-label" for="' + name + i + '"><span class="embed-responsive embed-responsive-1by1 bg-cover" style="background-image: url(' + this.categories.getImage(i).url + ');"></span></label></div>';
            }
            res += '</div>';
            return res;
        },
        createDiv: function(varIdx, szIdx) {
            var res = '<form id="' + this.divId + '"><div class="row align-items-center">'
            + '<div class="col-12 col-md-4 text-center">';
            res += createSizeOptions(this.sizeRadioName, "Size", this.prodInfo.skuInfo.sizes, szIdx, 'Dimensions');
            res += '</div><div class="col-12 col-md-8 text-center">'
                + 'Colour: <strong>' + this.categories.data[varIdx].colourName + '</strong> ' + this.createColourPanel(this.colourRadioName, varIdx)
                + '</div>'
                + '</div></form>';
            return res;
        },
        getItems: function() {
            var varIdx = this.getCatIdx(this.getSelectedColour());
            return this.categories.filterOnCategory(varIdx);
        },
        updateSelection: function () {
            var varIdx = this.getCatIdx(this.getSelectedColour());
            var szIdx = this.getSizeIdx(this.getSelectedSize());
            $('#' + this.divId).replaceWith(this.createDiv(varIdx, szIdx));
        }
    }
}

function createLevelsNavHelper(levels) {
    return {
        levels: levels,
        getBreadCrumb: function () {
            return createBreadCrumbLevels(this.levels);
        }
    };
}

function createNavHelper(prodInfo, categorizer) {
    return {
        categorizer: categorizer,
        prodInfo: prodInfo,
        getBreadCrumb: function () {
            var levels = [{
                title: 'Shop',
                url: '/shop.html'
            }, {
                title: 'Happy Everyday',
                url: this.getCategoryURL()
            }, {
                title: this.prodInfo.product.name
            }];
            return createBreadCrumbLevels(levels);
        },
        getCategoryURL: function () {
            var res = "shop.html";
            var cat = this.categorizer.getCategory(this.prodInfo.skuInfo.SKU);
            return res + (cat === null ? "" : "?t=" + cat[0]);
        },
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
        createDiv: function() {
            return '<div class="form-row mb-4"><div class="col-12 col-lg-auto">'
                + this.createQuantityDiv()
                + '</div><div class="col-12 col-lg">'
                + this.createAddToCartButton()
                + '</div></div>';
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
        createCard: function() {
            var res = '<div class="card mb-2"><div class="embed-responsive embed-responsive-1by1"><img class="embed-responsive-item" src="' + this.lkImg + '" style="object-fit: cover"></div><div class="card-body">';
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
                res += ' <a href="' + entry.imageURL + '">' + entry.name + '</a>';
                first = false;
            }
            res += '</div></div>';
            return res;
        }
    };
}

function createStoryCard(item, section) {
    return {
        item: item,
        section: section,
        createCard: function() {
            return createFeatureItemCard(this.item, this.section);
        }
    };
}

function createStoryViewer(caption, items, sections, ncol) {
    var res = [];
    for(var s = 0; s < items.length; s++) {
        var itms = items[s];
        var keys = Array.from(itms.keys());
        var rnd = shuffle(keys);
        for (var i = 0; i < itms.length && i < ncol[s]; i++) {
            res.push(createStoryCard(itms[rnd[i]], sections[s][rnd[i]]));
        }
    }
    return createRelatedViewer(caption, res, 2);
}

function createHEDRelatedViewer(skuInfo, looks, catalog) {
    var related = looks.getRelatedStyles(skuInfo.SKU);
    if (related === null) {
        return creatEmptyViewer();
    }
    var caption = 'Pair with';
    var res = [];
    for (var i = 0; i < related.length; i++) {
        var lk = related[i].look;
        var st = (related[i].styles === undefined) 
        ? looks.getLookFromTitle(lk).styles 
        :   related[i].styles;
        var lkImg = looks.getImagePath(lk);
        res.push(createRelatedLookCard(skuInfo.SKU, lkImg, lk, st, catalog));
    }
    return createRelatedViewer(caption, res, 2);
}

function createRelatedViewer(caption, related, ncol) {
    return {
        caption: caption,
        related: related,
        ncol: ncol,
        createDiv: function () {
            var res = '<h6>' + this.caption + '</h6><div class="row">';
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
            for(var i = 0; i < this.viewers.length; i++) {
                res += this.viewers[i].createDiv();
            }
            return res;
        }
    };
}

function createSizePanelr(skuInfo, dimensioner, sizer) {
    return {
        skuInfo: skuInfo,
        dimensioner: dimensioner,
        sizer: sizer,
        createSizingPanel: function () {
            var res = '';
            if ( this.sizer !== null) {
                res += '<h6>International Sizing</h6>'
                    + this.sizer.createSizeChart(this.skuInfo.sizes)
                    + '<p>The sizing chart above is only approximate. Please check the actual garment measurements below to find your size. Please email us at prema.florence.isaac@gmail.com or WhatsApp +919443362528 if you have further questions or wish to customize your order.</p>';
            }
            res += '<h6 class="mb-0">Product Measurements</h6>'
                + this.dimensioner.createMeasurementsPanel("in", this.skuInfo.sizes);
            return res;
        },
        updateUnits: function() {
            var tableid = '#' + this.dimensioner.tableId;
            $(tableid).empty();
            var selRadio = $("input[name='" + this.dimensioner.unitFieldName + "']:checked");
            var units = selRadio.val();
            var table = this.dimensioner.createSizingTable(units, this.skuInfo.sizes);
            $(tableid).append(table);
        }
    };
}

function createBasePanelr(shop, product) {
    return {
        shop: shop,
        product: product,
        getPriceHTML: function () {
            return this.shop.getPriceHTML(this.product);
        },
        createBasePanel: function () {
            return '<h4 class="mb-2">' + this.product.name + '</h4>' +
                '<div class="mb-5 text-gray-400"><span class="ml-1 font-size-h5 font-weight-bold">' + this.getPriceHTML() + '</span></div>';
        }
    }
}

function createProductComponent(basePanelr, sizePanelr, carousel, variantSelector, itemAdder, addlViewer, navHelper) {
    return {
        basePanelr: basePanelr,
        sizePanelr: sizePanelr,
        carousel: carousel,
        variantSelector: variantSelector,
        itemAdder: itemAdder,
        addlViewer: addlViewer,
        navHelper: navHelper,
        prodPanelId: 'prodPanel',
        getBreadCrumb: function () {
            return this.navHelper.getBreadCrumb();
        },
        createSizingPanel: function () {
            return this.sizePanelr.createSizingPanel();
        },
        createPDContents: function (varIdx, szIdx) {
            return '<div class="col-12 col-md-7">'
                + this.createImageDiv(varIdx)
                + '</div><div class="col-12 col-md-5 pl-lg-10">'
                + this.createInfoDiv(varIdx, szIdx)
                + '</div>';
        },
        createProductDiv: function(varIdx, szIdx) {
            return '<div class="row" id="' + this.prodPanelId + '">' + this.createPDContents(varIdx, szIdx) + '</div>';
        },
        createItem: function() {
            var qty = this.itemAdder.getSelectedQty();
            return this.variantSelector.createItem(qty);
        },
        updateUnits: function() {
            this.sizePanelr.updateUnits();
        },
        unregisterATC: function() {
            var atcBtnElt = $('#' + this.itemAdder.getBtnId());
            atcBtnElt.off('click');
        },
        registerATC: function(fn) {
            var atcBtnElt = $('#' + this.itemAdder.getBtnId());
            atcBtnElt.on('click', fn);
        },
        updateSelection: function() {
            var varIdx = this.variantSelector.getSelectedVariant();
            var valSize = this.variantSelector.getSelectedSize();
            var szIdx = this.variantSelector.getSizeIdx(valSize);
            var imageHTML = this.createProductDiv(varIdx, szIdx);

            $("#" + this.prodPanelId).replaceWith(imageHTML);

            this.carousel.update();
        },
        createImageDiv: function (varIdx) {
            return '<div class="form-row mb-4" id="prodImages">' +
                this.carousel.createImageCarousel(varIdx) +
                '</div>';
        },
        createInfoDiv: function (varIdx, szIdx) {
            var res = this.basePanelr.createBasePanel() + '<form>'
            + this.variantSelector.createSelectorPanel(varIdx, szIdx) 
            + this.itemAdder.createDiv()
            + '</form>'
            + this.addlViewer.createDiv();
            return res;
        }
    };
}

function createUIProductComponent(basePanelr, sizePanelr, carousel, addlViewer) {
    return {
        basePanelr: basePanelr,
        sizePanelr: sizePanelr,
        carousel: carousel,
        addlViewer: addlViewer,
        prodPanelId: 'prodPanel',
        createSizingPanel: function () {
            return this.sizePanelr.createSizingPanel();
        },
        createPDContents: function () {
            return '<div class="col-12 col-md-7">'
                + this.createImageDiv()
                + '</div><div class="col-12 col-md-5 pl-lg-10">'
                + this.createInfoDiv()
                + '</div>';
        },
        createProductDiv: function() {
            return '<div class="row" id="' + this.prodPanelId + '">' + this.createPDContents() + '</div>';
        },
        updateUnits: function() {
            this.sizePanelr.updateUnits();
        },
        updateSelection: function() {
            var imageHTML = this.createProductDiv();

            $("#" + this.prodPanelId).replaceWith(imageHTML);

            this.carousel.update();
        },
        createImageDiv: function (varIdx) {
            return '<div class="form-row mb-4" id="prodImages">' +
                this.carousel.createImageCarousel(0) +
                '</div>';
        },
        createInfoDiv: function () {
            var res = this.basePanelr.createBasePanel()
            + this.addlViewer.createDiv();
            return res;
        }
    };
}

function createItemComponent(idx) {
    return {
    };
}

function createUICardCreator() {
    return {
        colClasses: 'col-6 col-sm-4 col-md-3',
        createCard: function(itemDesc, prodDesc, btnId, priceHTML) {
            var res = '<div class="card mb-2">';
            var nI = itemDesc.getNumImages();
            if ( nI == 1) {
                res += '<a href="' + itemDesc.getImagePath(0) + '" data-fancybox><img src="' + itemDesc.getImagePath(0) + '" alt="' + prodDesc.name  + '" class="img-fluid" width="1000" height="1000"></a>';
            } else {
                res += '<a href="' + itemDesc.getImagePath(0) + '" data-fancybox><img src="' + itemDesc.getImagePath(0) + '" alt="' + prodDesc.name  + '" class="img-fluid" width="1000" height="1000"></a>';
            }
            res += '<div class="card-body px-0 pt-2 pb-4 text-center">';
            res += '<div class="card-subtitle mb-3"><span>' + priceHTML + '</span></div>';
            res += createAddToCartButton(btnId);
            res += '</div></div>';
            return res;
        }
    };
}

function createUniqueItemsComponent(items, productComponentFactory, productComponent, itemCategorySelector, cardCreator) {
    return {
        size: 'Free',
        items: items,
        productComponentFactory: productComponentFactory,
        productComponent: productComponent,
        itemCategorySelector: itemCategorySelector,
        cardCreator: cardCreator,
        listId: 'artwear-list',
        createCard: function(i) {
            return this.cardCreator.createCard(
                this.items.getDescriptor(i),
                this.items.product, 
                this.getButtonId(i), 
                this.productComponent.basePanelr.getPriceHTML());
        },
        createIndicesArray: function() {
            var res = [];
            for (var i = 0; i < this.items.base.length; i++) {
                res.push(i);
            }
            return res;
        },
        createCards: function() {
            var indexArr = this.createIndicesArray();
            let that = this;
            indexArr.sort(function(iL,iR){
                var lH = that.items.getDescriptor(iL).getHue();
                var rH = that.items.getDescriptor(iR).getHue();
                return (lH < rH ? -1 : (lH > rH ? 1 : 0));
            });
            var ret = '<div class="row">';
            for (var i = 0; i < indexArr.length; i++) {
                ret += '<div class="' + this.cardCreator.colClasses + '">'
                ret += this.createCard(indexArr[i]);
                ret += '</div>'
            }
            ret += '</div>'
            return ret;
        },
        getNumItems: function() {
            return items.getNumItems();
        },
        getButtonId: function(idx) {
            return 'btnId' + idx;
        },
        createItem: function(i) {
            var unique = this.items.getDescriptor(i);
            var product = this.items.product;
            return createItem(product, product.inrPrice, this.size, unique.fabricColour, 1, unique.number, unique.getImagePath(), true);
        },
        createHTML: function(list) {
            return '<form action="/shop/checkout.html" method="get"><div id="' + this.listId + '" class="item">'
                + list
                + '</div></form>';
        },
        createDiv: function() {
            return this.createHTML("");
        },
        unregisterATC: function() {
            if (this.items === null) {
                return;
            }
            for (var i = 0; i < this.getNumItems(); i++) {
                var eltBnd = $("#" + this.getButtonId(i));
                eltBnd.off('click');
            }
        },
        registerATC: function(fn) {
            if (this.items === null) {
                return;
            }
            for (var i = 0; i < this.getNumItems(); i++) {
                var eltBnd = $("#" + this.getButtonId(i));
                let idx = i;
                eltBnd.on('click', function() {
                    fn(idx);
                });
            }
        },
        updateSelection: function(shop, fn) {
            this.unregisterATC();

            this.productComponent = this.productComponentFactory.createProductComponent(shop);
            this.productComponent.updateSelection();

            this.items = this.itemCategorySelector.getItems();
            this.itemCategorySelector.updateSelection();

            var divId = '#' + this.listId;
            $(divId + ' .btn').off('click');

            let that = this;
            $(divId).fadeOut("slow", function(){
                var listHTML = that.createHTML(that.createCards());
                $(this).replaceWith(listHTML);
                $(divId).fadeIn("slow");
                that.registerATC(fn);
            })
        },
        updateUnits: function () {
            this.productComponent.updateUnits();
        }
    };
}

function createHEDRendererFactory(prodInfo, dimensioner, sizer, looks, categorizer, catalog) {
    var sizePanelr = createSizePanelr(prodInfo.skuInfo, dimensioner, sizer);
    var carousel = createProductCarousel(prodInfo.variants);
    var variantSelector = createVariantSelector(prodInfo);
    var itemAdder = createItemAdder();
    var relatedviewer = createHEDRelatedViewer(prodInfo.skuInfo, looks, catalog);
    var navHelper = createNavHelper(prodInfo, categorizer);
    return {
        createProductComponent: function(shop) {
            var basePanelr = createBasePanelr(shop, prodInfo.product)
            return createProductComponent(basePanelr, sizePanelr, carousel, variantSelector, itemAdder, relatedviewer, navHelper);
        }
    };
}

function createPageComponent(prodInfo, catalog, rendererFactory) {
    return {
        catalog: catalog,
        prodInfo: prodInfo,
        rendererFactory: rendererFactory,
        allCartC: null,
        init: function (shop) {
            this.allCartC = createAllCartComponents(shop, this);
        },
        createRenderer: function (shop) {
            return rendererFactory.createProductComponent(shop);
        },
        getRenderer: function () {
            return this.createRenderer(this.allCartC.shop);
        },
        addToCart: function () {
            var item = this.getRenderer().createItem();
            return this.allCartC.addToCart(item);
        },
        updateItemPrices: function () {
            var elts = $('.sc-item');
            let that = this;
            elts.each(function (index) {
                var sku = $(this).data('vsku');
                var prod = that.catalog.getProduct(sku);
                $(this).empty();
                var html = that.allCartC.shop.getPriceHTML(prod);
                $(this).append(html);
            });
        },
        onSelectionChange: function () {
            var renderer = this.getRenderer();
            renderer.unregisterATC();
            renderer.updateSelection();
            let that = this;
            renderer.registerATC(function() {
                that.addToCart();
            });
            this.updateItemPrices();
        },
        onUnitChange: function () {
            this.getRenderer().updateUnits();
        }
    }
}

function createUIPageComponent(catalog, itemsComponent, itemsComponentFactory) {
    return {
        catalog: catalog,
        itemsComponent: itemsComponent,
        itemsComponentFactory: itemsComponentFactory,
        allCartC: null,
        init: function(shop) {
            this.allCartC = createAllCartComponents(shop, this);
        },
        addToCart: function(i) {
            var item = this.itemsComponent.createItem(i);
            return this.allCartC.addToCart(item);
        },
        updateItemPrices: function() {
            var elts =$('.sc-item');
            var that = this;
            elts.each(function(index) {
                var sku = $(this).data('vsku');
                var prod =  that.catalog.getProduct(sku);
                $(this).empty();
                var html = that.allCartC.shop.getPriceHTML(prod);
                $(this).append(html);
            });
        },
        updateSelection() {
            var that = this;
            this.itemsComponent.updateSelection(
                this.allCartC.shop,
                function(idx){
                    that.addToCart(idx);
                });
        },
        onSKUChange(sku) {
            var icGen = this.itemsComponentFactory.createGenerator(sku);
            this.itemsComponent = icGen.createUIC(this.allCartC.shop);
            this.updateSelection();
        },
        onSelectionChange() {
            this.updateSelection();
            this.updateItemPrices();
        },
        onUnitChange: function () {
            this.itemsComponent.updateUnits();
        }
    }
}

function renderProductDetails(summary, detailsHTML, washcareHTML, shippingInfoHTML) {
    var res= '<section class="pt-1"><div class="container"><div class="row"><div class="col-12"><div class="nav nav-tabs nav-overflow justify-content-start justify-content-md-center border-bottom">';
    if ( summary !== null ) {
        res += '<a class="nav-link active" data-toggle="tab" href="#description">Summary</a>';
    }
    if ( detailsHTML !== null ) {
        res += '<a class="nav-link" data-toggle="tab" href="#details">Details</a>';
    }
    if ( washcareHTML !== null) {
        res += '<a class="nav-link" data-toggle="tab" href="#care">Care</a>';
    }
    if ( shippingInfoHTML !== null ) {
        res += '<a class="nav-link" data-toggle="tab" href="#shipping">Shipping</a>';
    }
    res += '</div><div class="tab-content">';
    if ( summary !== null ) {
        res += '<div class="tab-pane fade show active" id="description"><div class="item py-2">'
            + summary
            + '</div></div>';
    }
    if ( detailsHTML !== null ) {
        res += '<div class="tab-pane fade" id="details"><div class="item py-2">'
            + detailsHTML 
            + '</div></div>';
    }
    if ( washcareHTML !== null) {
        res += '<div class="tab-pane fade" id="care"><div class="item py-2">' 
            + washcareHTML 
            + '</div></div>';
    }
    if ( shippingInfoHTML !== null ) {
        res += '<div class="tab-pane fade" id="shipping"><div class="item py-2">' 
            + shippingInfoHTML
            + '</div></div>';
    }
    res += '</div></div></div></div></section>';
    return res;
}

function loadShopWithParam() {
    let searchParams = new URLSearchParams(window.location.search);
    var cur = searchParams.has('cur') ? searchParams.get('cur') : null;
    return loadShop(cur);
}

function onDocumentReady() {
    pageComponent.init(loadShopWithParam());
    pageComponent.onSelectionChange();
}

function onSelectionChange() {
    pageComponent.onSelectionChange();
}

function onUnitChange() {
    pageComponent.onUnitChange(dimensioner);
}

function onSKUChange(sku) {
    pageComponent.onSKUChange(sku);
}
