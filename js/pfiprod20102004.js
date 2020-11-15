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
        baseList: baseBlackList.splice(),
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

function createComponentGenerator(uiFactory, prodJSON, viewerFactory, colSelData, isSquare, cardCreator, modelTxt) {
    return {
        viewerFactory: viewerFactory,
        cardCreator: cardCreator,
        uiFactory: uiFactory,
        prodJSON: prodJSON,
        colSelData: colSelData,
        isSquare: isSquare,
        modelTxt: modelTxt,
        createSizePanelr: function () {
            var dimensioner = createDimensioner("cm", this.prodJSON.dimensionNames, this.prodJSON.dimensionsCm, this.prodJSON.styleImagePath);
            var chart = this.prodJSON.skuInfo.getSizeChart();
            var sizeChartr = chart !== null ? createSizeChartr(chart) : null;
            return createSizePanelr(this.prodJSON.skuInfo, dimensioner, sizeChartr);
        },
        createPCFactory: function () {
            var prePanelr = this.viewerFactory.createPre();
            var sizePanelr = this.createSizePanelr();
            var addlViewer = this.viewerFactory.create();
            var carousel = this.isSquare ?
                createSquareProductCarousel(this.prodJSON) :
            createProductCarousel(this.prodJSON, false);
            var that = this;
            return {
                createProductComponent: function (shop) {
                    var basePanelr = that.viewerFactory.createBase(shop);
                    return createUIProductComponent(prePanelr, basePanelr, sizePanelr, carousel, addlViewer);
                }
            };
        },
        createItemCatSelector: function () {
            var selCategory = createColourCategories(this.colSelData, this.uiFactory);
            return createItemCategorySelector(this.prodJSON, selCategory);
        },
        createUIC: function (shop) {
            var items = createUniqueItemList(this.uiFactory.listData, this.uiFactory);
            var productComponentFactory = this.createPCFactory();
            var itemCategorySelector = this.createItemCatSelector();
            var sizeSelector = createSizeSelector(this.prodJSON.skuInfo.sizes, this.createSizePanelr().getToggleHTML(), null, this.modelTxt, "Size");
            var productComponent = productComponentFactory.createProductComponent(shop);
            return createUniqueItemsComponent(items, productComponentFactory, productComponent, itemCategorySelector, sizeSelector, this.cardCreator);
        },
    };
}

function createProductJSON(sku, basePath, prodData, sizingChart, imageFactory) {
    return {
        product: getProductCatalog().getProduct(sku),
        styleImagePath: basePath + prodData.imageFile,
        dimensionNames: prodData.dimensionNames,
        dimensionsCm: prodData.dimensionsCm,
        imageFactory: imageFactory,
        variants: {
            getFabric: function (varidx) {
                return prodData.getFabric(varidx);
            },
            getColourName: function (varidx) {
                return this.data[varidx].colourName;
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
                text: this.that.product.name + '-Vnt:' + vnt.vid + '-Img:' + iidx
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
                text: this.that.product.name + '-' + vnt.colourPfx + '-' + vnt.colourSfxs[iidx]
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
            var desc = this.getDescriptor(i);
            var text = this.factory.product.name;
            return {
                desc: desc,
                text: text,
                getNumImages: function () {
                    return this.desc.getNumImages();
                },
                getImage: function (i) {
                    var that = this;
                    return {
                        url: that.desc.getImagePath(i),
                        text: that.text
                    };
                }
            };
        },
        findIndexOf(rowId) {
            for (var i = 0; i < this.base.length; i++) {
                if ( rowId === this.factory.getRowId(this.base[i])) {
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
        hasCategories: function () {
            return data.data.length > 0;
        },
        isEmpty: function (vidx) {
            var items = this.filterOnCategory(vidx);
            return items.base.length == 0;
        },
        unfiltered: function () {
            return createUniqueItemList(this.factory.listData, this.factory).sortOnHue();
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
            var len = this.data.getNumImages();
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
        createImageCarousel: function () {
            return '<div class="col-12">' + this.createImagePanel() +
                this.createImageNav() + '</div>';
        },
        createImageNav: function () {
            var res = '<div class="flickity-nav mx-n2 mb-2" data-flickity=\'{"asNavFor": "#' + this.panelId + '", "contain": true, "wrapAround": false, "cellAlign": "center", "imagesLoaded": true}\' id="' + this.navId + '">';
            var i = 0;
            for (; i < this.images.getNumImages(); i++) {
                var img = this.images.getImage(i);
                res += '<div class="col-12 px-1" style="max-width: 80px;"><img class="img-fluid" src="' + img.url + '"' +
                    (img.text !== undefined ? ' alt="' + img.text + '"' : '') +
                    '></div>';
            }
            res += '</div>';
            return res;
        },
        createImagePanel: function () {
            var res = '<div class="mb-2" data-flickity=\'{"wrapAround": false, "contain": true, "draggable": false, "imagesLoaded": true, "fade": true}\' id="' + this.panelId + '">';
            for (var i = 0; i < this.images.getNumImages(); i++) {
                var img = this.images.getImage(i);
                res += '<a href="' + img.url + '" data-fancybox><img src="' + img.url + '"' +
                    (img.text !== undefined ? ' alt="' + img.text + '"' : '') +
                    ' class="card-img-top"></a>';
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

function createSquareProductCarousel(prodJSON) {
    return {
        createVariantCarousel: function (varIdx) {
            var images = prodJSON.getImages(varIdx);
            return createSquareImageCarousel(images, "");
        }
    };
}

function createProductCarousel(prodJSON, sqNav) {
    return {
        createVariantCarousel: function (varIdx) {
            var images = prodJSON.getImages(varIdx);
            return createPortraitImageCarousel(images, "", sqNav);
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
            var res = '<div class="col-6 text-right">Colour: <strong id="colorCaption">' + this.variants.getColourName(varIdx) + '</strong></div></div>' + '<div class="mb-8 ml-n1">';
            if (this.variants.data.length > 1) {
                for (var i = 0; i < this.variants.data.length; i++) {
                    var opt = this.variants.data[i];
                    res += '<div class="custom-control custom-control-inline custom-control-img"><input type="radio" onclick="onSelectionChange()" class="custom-control-input" id="' + name + i + '" name="' + name + '" value="' + opt.colourName + '"' + (varIdx == i ? " checked" : "") + '><label class="custom-control-label" for="' + name + i + '"' + '>' /*+ '<span class="embed-responsive embed-responsive-1by1 bg-cover" style="background-image: url(' + this.prodInfo.getImages(i).getImage(0).url + ');"></span>'*/
                    + '<img class="img-fluid" src="' + this.prodInfo.getImages(i).getImage(0).url + '">'
                    + '</label></div>';
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
                res += '<div class="custom-control custom-control-inline custom-control-size mb-2"><input type="radio" class="custom-control-input" name="' + this.sizeRadioName + '" id="' + idPfx + i + '" value="' + val + '"' + (checked ? 'checked="checked" ' : '') + (this.eventFn !== null ? ' onclick="' + this.eventFn + '"' : "") + '><label class="custom-control-label" for="' + idPfx + i + '">' + val + '</label></div>';
            }
            res += '</span>' + this.toggleHTML + '</div>';
            return res;
        },
        createDiv: function (szIdx) {
            return this.createSelectorPanel(szIdx);
        }
    }
}


function createItemCategorySelector(prodInfo, categories) {
    return {
        prodInfo: prodInfo,
        categories: categories,
        divId: 'catSelector',
        captionId: 'rangeCaption',
        colourRadioName: "colRadio",
        colourCategoryFn: "onColourCategoryChange",
        hasCategories: function () {
            return this.categories.hasCategories();
        },
        getEmptyStatusHTML: function () {
            return '<div class="alert alert-info" role="alert">There are no items that match your selection</div>';
        },
        createCaption: function (caption) {
            return '<strong id="' + this.captionId + '">' + caption + '</strong>';
        },
        setCaption: function (caption) {
            if (caption === undefined) {
                caption = this.categories.data.data[this.getSelectedCatIdx()].colourName;
            }
            $('#' + this.captionId).replaceWith(this.createCaption(caption));
        },
        getCatIdx: function (valColour) {
            for (var i = 0; i < this.categories.data.data.length; i++) {
                var variant = this.categories.data.data[i];
                if (variant.colourName === valColour) {
                    return i;
                }
            }
            return -1;
        },
        getSelectedColour: function () {
            var selRadio = $("input[name='" + this.colourRadioName + "']:checked");
            return selRadio.val();
        },
        createColourPanel: function (name, varIdx) {
            var res = '<div class="mb-4 ml-n1">';
            for (var i = 0; i < this.categories.data.getNumImages(); i++) {
                var opt = this.categories.data.data[i];
                res += '<div class="custom-control custom-control-inline custom-control-img">' +
                    '<input type="radio" onclick="' + this.colourCategoryFn + '(\'' + opt.colourName + '\')' + '" class="custom-control-input' + (this.categories.isEmpty(i) ? " cat-color-is-empty" : "") + '" id="' + name + i + '" name="' + name + '" value="' + opt.colourName + '"' + (varIdx == i ? " checked" : "") + '>' +
                    '<label class="custom-control-label" for="' + name + i + '"><span class="embed-responsive embed-responsive-1by1 bg-cover" style="background-image: url(' + this.categories.data.getImage(i).url + ');"></span></label></div>';
            }
            res += '</div>';
            return res;
        },
        createDiv: function (varIdx) {
            var res = '<div id="' + this.divId + '">Colour Range: ' +
                this.createCaption(this.categories.data.data[varIdx].colourName) +
                this.createColourPanel(this.colourRadioName, varIdx) +
                '</div>';
            return res;
        },
        getSelectedCatIdx: function () {
            return this.getCatIdx(this.getSelectedColour());
        },
        getNonEmptyCatIdx: function () {
            return this.categories.getFirstNonEmptyIdx();
        },
        getItems: function () {
            if (this.hasCategories()) {
                var varIdx = this.getSelectedCatIdx();
                return this.categories.filterOnCategory(varIdx);
            } else {
                return this.categories.unfiltered();
            }
        },
        updateSelection: function () {
            if (this.hasCategories()) {
                var varIdx = this.getSelectedCatIdx();
                $('#' + this.divId).replaceWith(this.createDiv(varIdx));
            }
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

function createNavHelper(prodInfo, categorizer, title) {
    return {
        categorizer: categorizer,
        prodInfo: prodInfo,
        title: title,
        getBreadCrumb: function () {
            var levels = [{
                title: 'Shop',
                url: '/shop.html'
            }, {
                title: this.title,
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
            var res = '<div class="card mb-2"><div class="embed-responsive embed-responsive-1by1"><img class="embed-responsive-item" src="' + entry + '" style="object-fit: cover"></div><div class="card-body">';
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
                res += ' <a href="' + entry.url + '">' + entry.name + '</a>';
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
        createCard: function () {
            return createFeatureItemCard(this.item, this.section);
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
            res.push(createStoryCard(itms[rnd[i]], sections[s][rnd[i]]));
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
            for (var i = 0; i < this.viewers.length; i++) {
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
        sizeDlgId: 'modalSizeChart',
        togglerCaption: 'Size Chart',
        getToggleHTML: function () {
            return createSizeModalToggle(this.sizeDlgId, this.togglerCaption);
        },
        getSizeModal: function () {
            return getSizeModalWithId(this.sizeDlgId, this.createSizingPanel());
        },
        createSizingPanel: function () {
            var res = '';
            if (this.sizer !== null) {
                res += '<h6>International Sizing</h6>' +
                    this.sizer.createSizeChart(this.skuInfo.sizes) +
                    '<p>The sizing chart above is only approximate. Please check the actual garment measurements below to find your size. Please email us at prema.florence.isaac@gmail.com or WhatsApp +919443362528 if you have further questions or wish to customize your order.</p>';
            }
            res += '<h6 class="mb-0">Product Measurements</h6>' +
                this.dimensioner.createMeasurementsPanel("in", this.skuInfo.sizes);
            return res;
        },
        update: function () {
            $("#" + this.sizeDlgId).replaceWith(this.getSizeModal());
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

function createBasePanelrRange(shop, product, varPL) {
    return {
        shop: shop,
        product: product,
        varPL: varPL,
        createBasePanel: function () {
            var mn = product.inrPrice;
            var mx = product.inrPrice;
            Object.keys(this.varPL).forEach(function (k, i) {
                var v = varPL[k];
                mn = Math.min(mn, v);
                mx = Math.max(mx, v);
            });
            return '<h4 class="mb-2">' + this.product.name + '</h4>' +
                '<div class="mb-5 font-size-h5 font-weight-bold"><span class="ml-1 text-gray-400">' + this.shop.getFXPriceHTML(mn) + '</span> - <span class="text-gray-400">' + this.shop.getFXPriceHTML(mx) + '</span></div>';
        }
    }
}


function createProductComponent(prePanelr, basePanelr, sizePanelr, carousel, variantSelector, sizeSelector, itemAdder, addlViewer) {
    return {
        prePanelr: prePanelr,
        basePanelr: basePanelr,
        sizePanelr: sizePanelr,
        carousel: carousel,
        variantSelector: variantSelector,
        sizeSelector: sizeSelector,
        itemAdder: itemAdder,
        addlViewer: addlViewer,
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
        updateImageInfo: function () {
            var varIdx = this.variantSelector.getSelectedVariant();

            var imageHTML = this.createImageDiv(varIdx);
            $("#" + this.prodImageId).replaceWith(imageHTML);

            this.carousel.createVariantCarousel(varIdx).update();

            var szIdx = this.sizeSelector.getSelectedSizeIdx();
            var infoHTML = this.createInfoDiv(varIdx, szIdx);
            $("#" + this.prodInfoId).replaceWith(infoHTML);
        },
        updateSelection: function () {
            this.updateImageInfo();
            this.sizePanelr.update();
        },
        createImageDiv: function (varIdx) {
            return '<div class="form-row mb-4" id="' + this.prodImageId + '">' +
                this.carousel.createVariantCarousel(varIdx).createImageCarousel() +
                '</div>';
        },
        createInfoDiv: function (varIdx, szIdx) {
            var res = '<div id="' + this.prodInfoId + '">' + this.basePanelr.createBasePanel() + '<form>' +
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

function createUIProductComponent(prePanelr, basePanelr, sizePanelr, carousel, addlViewer) {
    return {
        prePanelr: prePanelr,
        basePanelr: basePanelr,
        sizePanelr: sizePanelr,
        carousel: carousel.createVariantCarousel(0),
        addlViewer: addlViewer,
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

            this.carousel.update();
        },
        updateImageInfo: function () {
            var divImgId = "#" + this.prodImageId;
            let that = this;
            $(divImgId).fadeOut("slow", function () {
                var imageHTML = that.createImageDiv();
                $(this).replaceWith(imageHTML);
                that.carousel.update();
                $(divImgId).fadeIn("slow");
            });

            var divInfoId = "#" + this.prodInfoId;
            $(divInfoId).fadeOut("slow", function () {
                var infoHTML = that.createInfoDiv();
                $(this).replaceWith(infoHTML);
                that.carousel.update();
                $(divInfoId).fadeIn("slow");
            })
        },
        updateSelection: function () {
            this.updateImageInfo();
            this.sizePanelr.update();
        },
        createImageDiv: function () {
            return '<div class="form-row mb-4" id="' + this.prodImageId + '">' +
                this.carousel.createImageCarousel() +
                '</div>';
        },
        createInfoDiv: function () {
            var res = '<div id="' + this.prodInfoId + '">' + this.basePanelr.createBasePanel() +
                this.addlViewer.createDiv() + '</div>';
            return res;
        }
    };
}

function createSingleImageCreator() {
    return {
        createImageDiv: function(images, btnId) {
            var img = images.getImage(0);
            return '<a href="' + img.url + '" data-fancybox><img src="' + img.url + '" alt="' + img.text + '" class="img-fluid" width="1000" height="1000"></a>';
        },
        updateImg(images, id) {
        }
    };    
}

function createCarouselImageCreator(carouselFn) {
    return {
        carouselFn: carouselFn,
        createImageDiv: function(images, btnId) {
            return '<div class="row"><div class="col-12"><div class="form-row mb-4">' + this.carouselFn(images, btnId).createImageCarousel() + '</div></div></div>';
        },
        updateImg(images, id) {
            this.carouselFn(images, id).update();
        },
    };
}

function createUICardCreatorBase(imgCreator, colClasses) {
    return {
        imgCreator: imgCreator,
        colClasses: colClasses,
        createCard: function (images, btnId, priceHTML, desc) {
            var res = '<div class="card mb-2">';
            res += this.imgCreator.createImageDiv(images, btnId);
            res += '<div class="card-body px-0 pt-2 pb-4 text-center">';
            res += '<div class="card-title mb-2"><span>' + desc.getCWDesc() + '</span></div>';
            res += '<div class="card-subtitle mb-3"><span>' + priceHTML + '</span></div>';
            if (desc.isAvailable()) {
                res += createAddToCartButton(btnId);
            } else {
                res += '<div class="alert alert-primary text-center" role="alert">' + desc.getCollectedText() + '</div>';
            }
            res += '</div></div>';
            return res;
        },
        updateCard(images, id) {
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

function createUniqueItemsComponent(items, productComponentFactory, productComponent, itemCategorySelector, sizeSelector, cardCreator) {
    return {
        size: 'Free',
        items: items,
        productComponentFactory: productComponentFactory,
        productComponent: productComponent,
        itemCategorySelector: itemCategorySelector,
        sizeSelector: sizeSelector,
        cardCreator: cardCreator,
        listId: 'artwear-list',
        getBreadCrumb: function () {
            var levels = [{
                title: 'Shop',
                url: '/shop.html'
            }, {
                title: this.productComponent.basePanelr.product.name
            }];
            return createBreadCrumbLevels(levels);
        },
        createCard: function (i) {
            return this.cardCreator.createCard(
                this.items.getImages(i),
                this.getButtonId(i),
                this.productComponent.basePanelr.shop.getFXPriceHTML(this.items.getINRPrice(i)),
                this.items.getDescriptor(i));
        },
        createCards: function () {
            if (this.items.base.length == 0) {
                return this.itemCategorySelector.getEmptyStatusHTML();
            }
            var ret = '<div class="row">';
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
            return createItem(unique.product, unique.getCWPrice(), this.size, unique.fabricColour, 1, unique.number, unique.getImagePath(0), true);
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
        updateItemCategories: function (fn) {
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
        updateSelection: function (shop, fn) {
            this.productComponent = this.productComponentFactory.createProductComponent(shop);
            this.productComponent.updateSelection();
            this.updateItemCategories(fn);
            this.itemCategorySelector.updateSelection();
        },
        updateUnits: function () {
            this.productComponent.updateUnits();
        }
    };
}

function createProductComponentFactory(prodInfo, dimensioner, sizer, addlViewer, navHelper, modelTxt, captionTxt) {
    var prePanelr = createEmptyViewer();
    var sizePanelr = createSizePanelr(prodInfo.skuInfo, dimensioner, sizer);
    var carousel = createProductCarousel(prodInfo, false);
    var variantSelector = createVariantSelector(prodInfo);
    var sizeSelector = createSizeSelector(prodInfo.skuInfo.sizes, sizePanelr.getToggleHTML(), null, modelTxt, captionTxt);
    var itemAdder = createItemAdder();
    return {
        createProductComponent: function (shop) {
            var basePanelr = createBasePanelr(shop, prodInfo.product);
            return createProductComponent(prePanelr, basePanelr, sizePanelr, carousel, variantSelector, sizeSelector, itemAdder, addlViewer);
        },
        getBreadCrumb: function () {
            return navHelper.getBreadCrumb();
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
        updateBreadCrumb: function () {
            $('.breadcrumb').replaceWith(this.rendererFactory.getBreadCrumb())
        },
        createRenderer: function (shop) {
            return this.rendererFactory.createProductComponent(shop);
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
        unregisterATC: function () {
            this.getRenderer().unregisterATC();
        },
        registerATC: function () {
            let that = this;
            this.getRenderer().registerATC(function () {
                that.addToCart();
            });
        },
        onSelectionChange: function () {
            this.unregisterATC();
            this.getRenderer().updateSelection();
            this.registerATC();
            this.updateItemPrices();
        },
        onReadyState() {
            this.unregisterATC();
            this.updateBreadCrumb();
            this.registerATC();
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
        init: function (shop) {
            this.allCartC = createAllCartComponents(shop, this);
        },
        addToCart: function (i) {
            var item = this.itemsComponent.createItem(i);
            return this.allCartC.addToCart(item);
        },
        updateItemPrices: function () {
            var elts = $('.sc-item');
            var that = this;
            elts.each(function (index) {
                var sku = $(this).data('vsku');
                var prod = that.catalog.getProduct(sku);
                $(this).empty();
                var html = that.allCartC.shop.getPriceHTML(prod);
                $(this).append(html);
            });
        },
        updateItemCategories: function () {
            var that = this;
            this.itemsComponent.updateItemCategories(
                function (idx) {
                    that.addToCart(idx);
                });
        },
        updateSelection: function () {
            var that = this;
            this.itemsComponent.updateSelection(
                this.allCartC.shop,
                function (idx) {
                    that.addToCart(idx);
                });
        },
        updateBreadCrumb: function () {
            $('.breadcrumb').replaceWith(this.itemsComponent.getBreadCrumb())
        },
        onSKUChange: function (sku) {
            var icGen = this.itemsComponentFactory.createGenerator(sku);
            this.itemsComponent = icGen.createUIC(this.allCartC.shop);
            this.updateSelection();
            this.itemsComponentFactory.updateURL(sku);
            this.updateBreadCrumb();
        },
        onColourCategoryChange: function (colVal) {
            if (this.itemsComponent.itemCategorySelector.hasCategories()) {
                this.itemsComponent.itemCategorySelector.setCaption(colVal);
            }
            this.updateItemCategories();
            this.updateItemPrices();
        },
        onSelectionChange: function () {
            this.updateSelection();
            this.updateItemPrices();
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
        res += '<a class="nav-link" data-toggle="tab" href="#details">Details</a>';
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
        res += '<div class="tab-pane fade" id="details"><div class="item py-2">' +
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
