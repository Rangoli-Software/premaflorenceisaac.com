function createProductDescriptor(varArr) {
    return {
        number: varArr[0],
        imageURL: varArr[1],
        fabricColour: varArr[2],
    };
}

function createProductObjects(listData, product) {
    return {
        base: listData,
        product: product,
        getNumProducts: function () {
            return this.base.length;
        },
        getId: function (i) {
            return this.base[i][0];
        },
        getDescriptor: function (i) {
            return createProductDescriptor(this.base[i]);
        },
        getItem: function (i) {
            var desc = this.getDescriptor(i);
            return createItem(product, product.inrPrice, '', desc.fabricColour, 1, desc.number, desc.imageURL, false);
        }
    };
}

function createProductRenderer(prodDesc, product, shop, options, tlcc) {
    return {
        prodDesc: prodDesc,
        product: product,
        shop: shop,
        options: options,
        tlcc: tlcc,
        getDescription: function () {
            return this.prodDesc.fabricColour;
        },
        getButtonID: function () {
            return tlcc.createButtonID(this.prodDesc.number);
        },
        createAddToCartButton: function () {
            var id = this.getButtonID();
            return '<button id="' + id + '" class="btn btn-warning btn-sm" type="button"><span class="fa fa-cart-plus"></span> Add to Cart</button>';
        },
        createDescriptionPanel: function () {
            return '<div class="col-md-7"><div class="row"><div class="col-10 offset-1"><p class="text-center">' + this.product.name + '<br>' +
                this.getDescription() +
                '</p></div></div></div>';
        },
        createItemPanel: function () {
            return '<p>' + this.createAddToCartButton() + '</p>';
        },
        createPurchasePanel: function () {
            return '<div class="col-md-5 align-self-center"><div class="row"><div class="col-10 offset-1 text-center">\
<p style="font-size: 150%">' +
                this.shop.getPriceHTML(this.product) + '</p>' + (this.shop.isIndian() ? '<p style="font-size: 75%">free shipping within India</p>' : '') +
                this.createItemPanel() +
                '</div></div></div>';
        },
        createImage: function (imageURL) {
            return '<img src="' + imageURL + '" class="img-fluid center-block"/>';
        },
        createSalePanel: function () {
            return '<div class="row">\
                    <div class="col-8 offset-2"><figure>' +
                this.createImage(this.prodDesc.imageURL) +
                '</figure></div>\
                </div><div class="row align-items-center sc-panel">' +
                this.createDescriptionPanel() +
                this.createPurchasePanel() +
                '</div>';
        }
    };
}

function createRenderer(shop, options, productObjects, tlcc) {
    return {
        shop: shop,
        options: options,
        productObjects: productObjects,
        tlcc: tlcc,
        createRenderer: function (i) {
            var prodDesc = this.productObjects.getDescriptor(i);
            var product = this.productObjects.product;
            return createProductRenderer(prodDesc, product, this.shop, this.options, this.tlcc);
        }
    };
}

function createProductPageComponent(sku, listData) {
    var product = getProductCatalog().getProduct(sku);
    var prodObjs = createProductObjects(listData, product);
    return {
        product: product,
        prodObjs: prodObjs,
        listData: listData,
        allCartC: null,
        init: function () {
            let shop = loadShop(null);
            this.allCartC = createAllCartComponents(shop, this);
        },
        createButtonID: function (num) {
            return "btn" + num;
        },
        createPurchasePanelID: function (num) {
            return "scpp-" + num;
        },
        addToCart: function (i) {
            var item = this.prodObjs.getItem(i);
            return this.allCartC.addToCart(item);
        },
        renderProductList: function() {
            var renderer = createRenderer(this.allCartC.shop, {}, this.prodObjs, this);
            for (var i = 0; i < this.listData.length; i++) {
                var idString = "#" + this.createPurchasePanelID(i);
                $(idString + ' .btn').off('click');
                $(idString).empty();
                var prodRenderer = renderer.createRenderer(i);
                var html = prodRenderer.createSalePanel();
                $(html).appendTo(idString);
                let idx = i;
                let that = this;
                $("#" + prodRenderer.getButtonID()).on('click', function () {
                    that.addToCart(idx);
                });
            }
        },
        onDocumentReady: function () {
            this.init();
            this.onSelectionChange();
        },
        onSelectionChange: function () {
            this.renderProductList();
        }
    };
}
