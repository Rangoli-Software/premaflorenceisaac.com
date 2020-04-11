function createSizeOptions(radName, label, vals, selIdx) {
    var id = radName + "Group";
    var res = '<div class="form-group"><label for="' + id + '">' + label + ':</label> <span id="' +  id + '" class="mb-2">';
    var idPfx = radName + "ID";
    for (var i = 0; i < vals.length; i++) {
        res += createSizeRadio(radName, idPfx, vals[i], i, (i == selIdx));
    }
    res += '</span><a class="ml-3" data-toggle="modal" href="#modalSizeChart">Size chart</a></div>';
    return  res;
}  

function getShippingInfoUL(points) {
    var res = '<ul>';
    for(var i = 0; i < points.length; i++) {
        res += '<li>' + points[i] + '</li>';
    }
    res += '<li>We will notify you by email / WhatsApp when your item is dispatched  and send you the tracking id.</li><li>Within India we will courier your item, which  will reach you within 2-3 business days of dispatch.</li><li>Our recommended international shipping method is India Post, which will reach almost anywhere in the world within 7-15 business days from dispatch.</li><li>We can also courier items anywhere in the world in 3-5 business days after dispatch.</li><li>Shipping time estimates <strong>do not</strong> include delays due to customs and other formalities at the port of entry.</li>';
    res += '</ul>';
    return res;
}

function createDimensioner(units, dimensionNames, dimensions, imagePath, sizeGeo, sizingChart) {
    return {
        dimensionUnits: units,
        dimensionNames: dimensionNames,
        dimensions: dimensions,
        imagePath: imagePath,
        sizeGeo: sizeGeo,
        sizingChart: sizingChart,
        createSizeChart: function(sizes) {
            var nCols = this.sizeGeo.length + 1;
            var szWidth = Math.floor(100 / nCols);
            var rem = 100 - (this.sizeGeo.length * szWidth);

            var table = '<div class="table-responsive mb-7"><table class="dim-table table table-bordered table-hover table-sm mb-0 text-center" style="padding: 6px;">';

            table += '<thead><tr><td class="text-left" width="' + rem + '%"><strong>Size</strong></td>';
            for (var i = 0; i < this.sizeGeo.length; i++) {
                var sz = this.sizeGeo[i];
                table += '<td width="' + szWidth + '%"><strong>' + sz + '</strong></td>';
            }
            table += '</tr></thead><tbody>';
            for (var i = 0; i < sizes.length; i++) {
                var sz = sizes[i];
                var chart = this.sizingChart[ sz ];
                if ( chart === undefined ) {
                    continue;
                }
                table += '<tr><td class="text-left">' + sz + '</td>';
                for (var j = 0; j < this.sizeGeo.length; j++) {
                    var szG = this.sizeGeo[j];
                    var szGeo = chart[szG];
                    table += '<td>' + szGeo[0] + '-' + szGeo[1] + '</td>';
                }
                table += '</tr>'
            }
            table += '</tbody></table></div>';
            return table;
        },
        createSizingTable: function (units, sizes) {
            var fn = (units === this.dimensionUnits) ? identity : (units == "in" ? cm2inches : inches2cm);

            var szWidth = Math.floor(75 / sizes.length);
            var rem = 100 - (sizes.length * szWidth);

            var unTxt = (units == "in" ? " inches" : "  cm")
            var table = '<div class="table-responsive"><table class="dim-table table table-bordered table-hover table-sm mb-0 text-center" style="padding: 6px;"><caption><strong>Measurements (in' + unTxt + ')</strong></caption>';

            table += '<thead><tr><td class="text-left" width="' + rem + '%"><strong>Size</strong></td>';
            for (var i = 0; i < sizes.length; i++) {
                var sz = sizes[i];
                if (this.dimensions[sz] === undefined)  {
                    continue;
                }
                table += '<td width="' + szWidth + '%"><strong>' + sz + '</strong></td>';
            }
            table += '</tr></thead><tbody>';
            for (var i = 0; i < this.dimensionNames.length; i++) {
                var dimName = this.dimensionNames[i];
                table += '<tr><td class="text-left">' + dimName + '</td>';
                for (var j = 0; j < sizes.length; j++) {
                    var sz = sizes[j];
                    var dims = this.dimensions[sz];
                    if (dims === undefined)  {
                        continue;
                    }
                    var dim = dims[i];
                    table += '<td>' + fn(dim) + '</td>';
                }
                table += '</tr>'
            }
            table += '</tbody></table></div>';
            return table;
        }
    };
}

function createProductInfo(skuInfo, product, variants) {
    return {
        skuInfo: skuInfo,
        product: product,
        variants: variants
    };
}

function createProductRenderer(shop, prodInfo, dimensioner, looks) {
    return {
        shop: shop,
        skuInfo: prodInfo.skuInfo,
        product: prodInfo.product,
        variants: prodInfo.variants,
        dimensioner: dimensioner,
        looks: looks,
        getVarIdx: function (valColour) {
            for (var i = 0; i < this.variants.length; i++) {
                var variant = this.variants[i];
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
        getBtnId: function () {
            return "btnATC";
        },
        getPanelId: function () {
            return "imgSlider";
        },
        getGallery: function () {
            return "gallery";
        },
        getNavId: function () {
            return this.getPanelId() + "-Nav";
        },
        getColourRadioName: function () {
            return "colRadio";
        },
        getSizeRadioName: function () {
            return "sizeRadio";
        },
        getPriceHTML: function () {
            return this.shop.getPriceHTML(this.product);
        },
        createSizingPanel: function () {
            var imgHTML = '<img src="' + this.dimensioner.imagePath + '" class="img-fluid center-block"/>';
            return '<h6>International Sizing</h6>' + this.dimensioner.createSizeChart(this.skuInfo.sizes) +
            '<h6 class="mb-0">Garment Measurements</h6><div class="row align-items-center"><div class="col-md-4 text-center py-5">' + imgHTML + '</div><div class="col-md-8 text-center py-5"><div class="btn-group btn-group-toggle ml-auto py-5" data-toggle="buttons"><label class="btn btn-xxs btn-circle btn-outline-dark font-size-xxxs rounded-0 active"><input type="radio" name="SizeChartUnits" value="in" onclick="onUnitChange()" checked>IN</label><label class="btn btn-xxs btn-circle btn-outline-dark font-size-xxxs rounded-0 ml-2"><input type="radio" name="SizeChartUnits" value="cm" onclick="onUnitChange()">CM</label></div>' + '<div id="SizeTable">' + this.dimensioner.createSizingTable("in", this.skuInfo.sizes) + '</div></div></div>';
        },
        createImageCarousel: function (varIdx) {
            var variant = this.variants[varIdx];
            return '<div class="col-2 px-1">' +
                this.createImageNav(variant.images) +
                '</div><div class="col-10">' +
                this.createImagePanel(variant.images) +
                '</div>';
        },
        createImageNav: function (images) {
            var res = '<div class="flickity-nav flickity-vertical" data-flickity=\'' + '{"asNavFor": "#' + this.getPanelId() + '", "draggable": false}\' id="' + this.getNavId() + '">';
            var i = 0;
            for (; i < images.length - 1; i++) {
                var img = images[i];
                res += '<div class="mb-2"><img class="img-fluid" src="' + img.url + '"></div>';
            }
            var img = images[i];
            res += '<div class="mb-0"><img class="img-fluid" src="' + img.url + '"></div>';
            res += '</div>';
            return res;
        },
        createImagePanel: function (images) {
            var res = '<div class="card"><div data-flickity=\'{"draggable": false, "fade": true}\' id="' + this.getPanelId() + '">';
            for (var i = 0; i < images.length; i++) {
                var img = images[i]; 
                res += '<a href="' + img.url + '" data-fancybox="' + this.getGallery() + '"><img src="' + img.url + '" class="img-fluid"></a>';
            }
            res += '</div></div>';
            return res;
        },
        createColourPanel: function (name, varIdx) {
            var res = '<p class="mb-4">Colour: <strong id="colorCaption">' + this.variants[varIdx].colourName + '</strong></p><div class="mb-8 ml-n1">';
            for (var i = 0; i < this.variants.length; i++) {
                var opt = this.variants[i];
                res += '<div class="custom-control custom-control-inline custom-control-img"><input type="radio" onclick="onSelectionChange()" class="custom-control-input" id="' + name + i + '" name="' + name + '" value="' + opt.colourName + '"' + (varIdx == i ? " checked" : "") + '><label class="custom-control-label" for="' + name + i + '"><span class="embed-responsive embed-responsive-1by1 bg-cover" style="background-image: url(' + opt.images[0].url + ');"></span></label></div>';
            }
            res += '</div>';
            return res;
        },
        createImageDiv: function (varIdx) {
            return '<div class="col-12 col-md-7"><div class="form-row mb-10 mb-md-0" id="prodImages">' +
                this.createImageCarousel(varIdx) +
                '</div></div>';
        },
        createQuantityDiv: function () {
            return '<select class="custom-select"><option value="1" selected>1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select>';
        },
        createInfoDiv: function (varIdx, szIdx) {
            return '<div class="col-12 col-md-5 pl-lg-10"><div class="row mb-1"><div class="col"><a class="text-muted" href="looks.html">Happy Everyday</a></div></div>' +
                '<h4 class="mb-2">' + this.product.name + '</h4>' +
                '<div class="mb-7 text-gray-400"><span class="ml-1 font-size-h5 font-weight-bold">' +
                this.getPriceHTML() + '</span></div>' +
                '<form><div class="form-group">' +
                this.createColourPanel("colRadio", varIdx) +
                '</div><div class="mb-3">Model is 5 ft 7 in (173 cm) and wearing size S</div>' +
                createSizeOptions("sizeRadio", "Size", this.skuInfo.sizes, szIdx) +
                '<div class="form-row mb-7"><div class="col-12 col-lg-auto">' +
                this.createQuantityDiv() +
                '</div><div class="col-12 col-lg">' +
                this.createAddToCartButton() +
                '</div></div>' +
                '</div></form>' +
                this.createShopTheLookDiv() +
                '</div>';
        },
        createAddToCartButton: function () {
            return '<button id="' + this.getBtnId() + '" class="btn btn-block btn-warning" type="button"><span class="fa fa-cart-plus"></span> Add to Cart</button>';
        },
        createShopTheLookDiv: function () {
            var related = this.looks.getRelatedStyles(this.skuInfo.SKU);
            if (related === null) {
                return '';
            }
            var res = '<h6>Pair with</h6><div class="row">';
            for(var i = 0; i < related.length; i++) {
                var lk = related[i].look;
                var st = related[i].styles;
                res += this.createRelatedProductCard(lk, st);
            }
            res += '</div>';
            return res;
        },
        createRelatedProductCard: function(idx, styles){
            var lkImg = this.looks.getImagePath(idx);
            var res = '<div class="col-6"><div class="card mb-2"><div class="embed-responsive embed-responsive-1by1"><img class="embed-responsive-item" src="' + lkImg + '" style="object-fit: cover"></div><div class="card-body">';
            for (var i =  0; i < styles.length; i++) {
                var sty = styles[i];
                var entry = getProductCatalog().getProduct(sty);
                if ( i > 0 ) {
                    res += ' &amp;'
                }
                res += ' <a href="' + entry.imageURL + '">' + entry.name + '</a>';
            }
            res += '</div></div></div>';
            return res;
        }
    };
}

function createPageComponent(prodInfo, dimensioner, looks) {
    return {
        prodInfo: prodInfo,
        dimensioner: dimensioner,
        looks: looks,
        allCartC: null,
        init: function (shop) {
            this.allCartC = createAllCartComponents(shop, this);
        },
        createRenderer: function (shop) {
            return createProductRenderer(shop, this.prodInfo, this.dimensioner, this.looks);
        },
        getRenderer: function () {
            return this.createRenderer(this.allCartC.shop);
        },
        createItem: function (clr, size, qty) {
            var product = this.prodInfo.product;
            var vidx = this.getRenderer().getVarIdx(clr);
            var vnt = this.prodInfo.variants[vidx];
            var itmSKU = vnt.vid + "-" + size;
            var imgURL = vnt.images[0].url;
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
            var atcBtnElt = $('#' + this.getRenderer().getBtnId());
            let that = this;
            atcBtnElt.on('click', function () {
                that.addToCart();
            });
        },
        unregisterATCListener: function () {
            var atcBtnElt = $('#' + this.getRenderer().getBtnId());
            atcBtnElt.off('click');
        },
        getSelectedQty: function () {
            var selOpt = $("select.custom-select");
            return Number(selOpt.val());
        },
        getSelectedColour: function () {
            var selRadio = $("input[name='colRadio']:checked");
            return selRadio.val();
        },
        getSelectedSize: function () {
            var selRadio = $("input[name='sizeRadio']:checked");
            return selRadio.val();
        },
        setShop: function (shop) {
            this.allCartC.setShop(shop);
        },
        updateImageCarousel: function () {
            var prodRenderer = this.getRenderer();

            var panelId = prodRenderer.getPanelId();
            var eltCarousel = $('#' + panelId);
            eltCarousel.flickity({
                draggable: false,
                fade: true
            });

            var navId = prodRenderer.getNavId();
            var eltNav = $('#' + navId);
            eltNav.flickity({
                asNavFor: '#' + panelId,
                draggable: false
            });

            $('[data-fancybox="' + prodRenderer.getGallery() + '"]').fancybox({});
        },
        onSelectionChange: function() {
            this.unregisterATCListener();

            var valColour = this.getSelectedColour();
            var valSize = this.getSelectedSize();

            var prodImgSelector = "#prodPanel"
            $(prodImgSelector).empty();
            var renderer = this.getRenderer();
            var valIdx = renderer.getVarIdx(valColour);
            var imageHTML = renderer.createImageDiv(valIdx);
            $(prodImgSelector).append(imageHTML);

            this.updateImageCarousel();

            var szIdx = renderer.getSizeIdx(valSize);
            var infoHTML = renderer.createInfoDiv(valIdx, szIdx);
            $(prodImgSelector).append(infoHTML);

            this.registerATCListener();
        },
        onUnitChange: function () {
            $('#SizeTable').empty();
            var selRadio = $("input[name='SizeChartUnits']:checked");
            var units = selRadio.val();
            var table = this.getRenderer().dimensioner.createSizingTable(units, skuInfo.sizes);
            $('#SizeTable').append(table);
        }
    }
}

function renderProductDetails (summary, detailsHTML) {
    return '<section class="pt-7"><div class="container"><div class="row"><div class="col-12">'
    + '<div class="nav nav-tabs nav-overflow justify-content-start justify-content-md-center border-bottom"><a class="nav-link active" data-toggle="tab" href="#description">Summary</a><a class="nav-link" data-toggle="tab" href="#details">Details</a><a class="nav-link" data-toggle="tab" href="#care">Care</a><a class="nav-link" data-toggle="tab" href="#shipping">Shipping</a></div>'
    + '<div class="tab-content">'
    + '<div class="tab-pane fade show active" id="description"><div class="item py-5">' + summary + '</div></div>'
    + '<div class="tab-pane fade" id="details"><div class="item py-5">'
    +  detailsHTML + '</div></div>'
    +
        '<div class="tab-pane fade" id="care"><div class="item py-5">'
    + '<ul><li>Machine Wash Cold</li><li>Mild Detergent</li><li>Gentle Cycle</li><li>Do Not Bleach</li><li>Dry In Shade</li><li>Medium Iron</li></ul>'
    + '</div></div>'
    + '<div class="tab-pane fade" id="shipping"><div class="item py-5">'
    + getShippingInfoUL(['If the item is in stock,  it will be ready to ship within 1 business day of your order.','If the item is not in stock, it will be ready to ship within 2-3 business days of your order.'])
    + '</div></div>'
    + '</div>'
    + '</div></div></div></section>';
}

function getSizeModal(contents) {
    return '<div class="modal fade" id="modalSizeChart" tabindex="-1" role="dialog" aria-hidden="true"><div class="modal-dialog modal-dialog-centered modal-lg" role="document"><div class="modal-content"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><i class="fa fa-times" aria-hidden="true"></i></button><div class="modal-header line-height-fixed font-size-lg"><strong class="mx-auto">Sizing</strong></div><div class="modal-body border-bottom">'
    + contents +
        '</div></div></div></div>';
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
