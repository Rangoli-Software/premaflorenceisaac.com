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
            var res = '<div class="flickity-nav flickity-vertical" data-flickity=\'' + '{"asNavFor": "#' + this.getPanelId() + '", "draggable": false}\' id="' + this.getNavId() + '">';
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

function createVariantSelector(skuInfo, variants) {
    return {
        skuInfo: skuInfo,
        variants: variants,
        colourRadioName: "colRadio",
        sizeRadioName: "sizeRadio",
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
            for (var i = 0; i < this.skuInfo.sizes.length; i++) {
                var size = this.skuInfo.sizes[i];
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
            var sz = this.skuInfo.sizes[0];
            return '<div class="form-group">'
                + this.createFabricPanel(varIdx)
                + this.createColourPanel(this.colourRadioName, varIdx)
                + '</div>'
                + '<div class="mb-3">Model is 5 ft 7 in (173 cm)' + (sz == 'Free' ? '' : ' and wearing size S') + '</div>'
                + createSizeOptions(this.sizeRadioName, "Size", this.skuInfo.sizes, szIdx);
        }
    }
}

function createSizeOnlySelector(skuInfo, variants) {
    return {
        skuInfo: skuInfo,
        variants: variants,
        sizeRadioName: "sizeRadio",
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
            return createSizeOptions(this.sizeRadioName, "Size", this.skuInfo.sizes, szIdx);
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

function createItemAdder() {
    return {
        getBtnId: function () {
            return "btnATC";
        },
        createQuantityDiv: function () {
            return '<select class="custom-select"><option value="1" selected>1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select>';
        },
        createAddToCartButton: function () {
            return '<button id="' + this.getBtnId() + '" class="btn btn-block btn-warning" type="button"><span class="fa fa-cart-plus"></span> Add to Cart</button>';
        },
        getSelectedQty: function () {
            var selOpt = $("select.custom-select");
            return Number(selOpt.val());
        },
        createDiv: function() {
            return '<div class="form-row mb-7"><div class="col-12 col-lg-auto">'
                + this.createQuantityDiv()
                + '</div><div class="col-12 col-lg">'
                + this.createAddToCartButton()
                + '</div></div>';
        }
    };
}

function createRelatedViewer(skuInfo, looks, catalog) {
    return {
        skuInfo: skuInfo,
        looks: looks,
        catalog: catalog,
        createDiv: function () {
            var related = this.looks.getRelatedStyles(this.skuInfo.SKU);
            if (related === null) {
                return '';
            }
            var res = '<h6>Pair with</h6><div class="row">';
            for (var i = 0; i < related.length; i++) {
                var lk = related[i].look;
                var st = (related[i].styles === undefined) ? this.looks.getLookFromTitle(lk).styles : related[i].styles;
                res += this.createRelatedProductCard(lk, st);
            }
            res += '</div>';
            return res;
        },
        createRelatedProductCard: function (idx, styles) {
            var lkImg = this.looks.getImagePath(idx);
            var res = '<div class="col-6"><div class="card mb-2"><div class="embed-responsive embed-responsive-1by1"><img class="embed-responsive-item" src="' + lkImg + '" style="object-fit: cover"></div><div class="card-body">';
            var first = true;
            for (var i = 0; i < styles.length; i++) {
                var sty = styles[i];
                if (sty == this.skuInfo.SKU) {
                    continue;
                }
                var entry = this.catalog.getProduct(sty);
                if (!first) {
                    res += ' &amp;'
                }
                res += ' <a href="' + entry.imageURL + '">' + entry.name + '</a>';
                first = false;
            }
            res += '</div></div></div>';
            return res;
        },
    };
}

function createEmptyViewer() {
    return {
        createDiv: function () {
            return '';
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
                '<div class="mb-7 text-gray-400"><span class="ml-1 font-size-h5 font-weight-bold">' + this.getPriceHTML() + '</span></div>';
        }
    }
}

function createProductRenderer(basepanelr, sizepanelr, carousel, variantSelector, itemadder, addlviewer, navhelper) {
    return {
        basepanelr: basepanelr,
        sizepanelr: sizepanelr,
        carousel: carousel,
        variantSelector: variantSelector,
        itemadder: itemadder,
        addlviewer: addlviewer,
        navhelper: navhelper,
        prodPanelId: 'prodPanel',
        createSizingPanel: function () {
            return sizepanelr.createSizingPanel();
        },
        createImageDiv: function (varIdx) {
            return '<div class="form-row mb-10 mb-md-0" id="prodImages">' +
                this.carousel.createImageCarousel(varIdx) +
                '</div>';
        },
        getBreadCrumb: function () {
            return this.navhelper.getBreadCrumb();
        },
        createInfoDiv: function (varIdx, szIdx) {
            var res = this.basepanelr.createBasePanel() + '<form>'
            + this.variantSelector.createSelectorPanel(varIdx, szIdx) 
            + this.itemadder.createDiv()
            + '</form>'
            + this.addlviewer.createDiv();
            return res;
        },
        createProductDiv: function(varIdx, szIdx) {
            return '<div class="row" id="' + this.prodPanelId + '"><div class="col-12 col-md-7">'
            + this.createImageDiv(varIdx)
            + '</div><div class="col-12 col-md-5 pl-lg-10">'
            + this.createInfoDiv(varIdx, szIdx)
            + '</div></div>';
        },
        updateSelection: function() {
            var valColour = this.variantSelector.getSelectedColour();
            var valSize = this.variantSelector.getSelectedSize();

            var valIdx = this.variantSelector.getVarIdx(valColour);
            var szIdx = this.variantSelector.getSizeIdx(valSize);
            var imageHTML = this.createProductDiv(valIdx, szIdx);

            var prodImgSelector = "#" + this.prodPanelId;
            $(prodImgSelector).empty();
            $(prodImgSelector).append(imageHTML);

            this.carousel.update();
        }
    };
}

function createFMRendererFactory(prodInfo, dimensioner, catalog) {
    var sizepanelr = createSizePanelr(prodInfo.skuInfo, dimensioner, null);
    var carousel = createProductCarousel(prodInfo.variants);
    var variantSelector = createSizeOnlySelector(prodInfo.skuInfo, prodInfo.variants);
    var itemadder = createEmptyViewer();
    var relatedviewer = createEmptyViewer();
    var levels = [{
        title: 'Shop',
        url: '/shop.html'
    }, {
        title: prodInfo.product.name
    }];
    var navhelper = createLevelsNavHelper(levels);
    return {
        createRenderer: function(shop) {
            var basepanelr = createBasePanelr(shop, prodInfo.product)
            return createProductRenderer(basepanelr, sizepanelr, carousel, variantSelector, itemadder, relatedviewer, navhelper);
        }
    };
}

function createHEDRendererFactory(prodInfo, dimensioner, sizer, looks, categorizer, catalog) {
    var sizepanelr = createSizePanelr(prodInfo.skuInfo, dimensioner, sizer);
    var carousel = createProductCarousel(prodInfo.variants);
    var variantSelector = createVariantSelector(prodInfo.skuInfo, prodInfo.variants);
    var itemadder = createItemAdder();
    var relatedviewer = createRelatedViewer(prodInfo.skuInfo, looks, catalog);
    var navhelper = createNavHelper(prodInfo, categorizer);
    return {
        createRenderer: function(shop) {
            var basepanelr = createBasePanelr(shop, prodInfo.product)
            return createProductRenderer(basepanelr, sizepanelr, carousel, variantSelector, itemadder, relatedviewer, navhelper);
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
            return rendererFactory.createRenderer(shop);
        },
        getRenderer: function () {
            return this.createRenderer(this.allCartC.shop);
        },
        createItem: function (clr, size, qty) {
            var product = this.prodInfo.product;
            var vidx = this.getRenderer().variantSelector.getVarIdx(clr);
            var vnt = this.prodInfo.variants.data[vidx];
            var itmSKU = vnt.vid + "-" + size;
            var imgURL = this.prodInfo.variants.getImage(vidx, 0).url;
            return createItem(product, product.inrPrice, size, clr, qty, itmSKU, imgURL, false);
        },
        addToCart: function () {
            var size = this.getSelectedSize();
            var clr = this.getSelectedColour();
            var qty = this.getSelectedQty();
            var item = this.createItem(clr, size, qty);
            return this.allCartC.addToCart(item);
        },
        registerATCListener: function () {
            var atcBtnElt = $('#' + this.getRenderer().itemadder.getBtnId());
            let that = this;
            atcBtnElt.on('click', function () {
                that.addToCart();
            });
        },
        unregisterATCListener: function () {
            var atcBtnElt = $('#' + this.getRenderer().itemadder.getBtnId());
            atcBtnElt.off('click');
        },
        getSelectedQty: function () {
            return this.getRenderer().itemadder.getSelectedQty();
        },
        getSelectedColour: function () {
            return this.getRenderer().variantSelector.getSelectedColour();
        },
        getSelectedSize: function () {
            return this.getRenderer().variantSelector.getSelectedSize();
        },
        setShop: function (shop) {
            this.allCartC.setShop(shop);
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
        updateImageCarousel: function () {
            this.getRenderer().carousel.update();
        },
        onSelectionChange: function () {
            this.unregisterATCListener();
            this.getRenderer().updateSelection();
            this.registerATCListener();
            this.updateItemPrices();
        },
        onUnitChange: function () {
            $('#SizeTable').empty();
            var selRadio = $("input[name='SizeChartUnits']:checked");
            var units = selRadio.val();
            var table = this.getRenderer().dimensioner.createSizingTable(units, this.prodInfo.skuInfo.sizes);
            $('#SizeTable').append(table);
        }
    }
}

function renderProductDetails(summary, detailsHTML) {
    return '<section class="pt-7"><div class="container"><div class="row"><div class="col-12">' +
        '<div class="nav nav-tabs nav-overflow justify-content-start justify-content-md-center border-bottom"><a class="nav-link active" data-toggle="tab" href="#description">Summary</a><a class="nav-link" data-toggle="tab" href="#details">Details</a><a class="nav-link" data-toggle="tab" href="#care">Care</a><a class="nav-link" data-toggle="tab" href="#shipping">Shipping</a></div>' +
        '<div class="tab-content">' +
        '<div class="tab-pane fade show active" id="description"><div class="item py-5">' + summary + '</div></div>' +
        '<div class="tab-pane fade" id="details"><div class="item py-5">' +
        detailsHTML + '</div></div>' +
        '<div class="tab-pane fade" id="care"><div class="item py-5">' +
        '<ul><li>Machine Wash Cold</li><li>Mild Detergent</li><li>Gentle Cycle</li><li>Do Not Bleach</li><li>Dry In Shade</li><li>Medium Iron</li></ul>' +
        '</div></div>' +
        '<div class="tab-pane fade" id="shipping"><div class="item py-5">' +
        getShippingInfoUL(['If the item is in stock,  it will be ready to ship within 1 business day of your order.', 'If the item is not in stock, it will be ready to ship within 2-3 business days of your order.']) +
        '</div></div>' +
        '</div>' +
        '</div></div></div></section>';
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
