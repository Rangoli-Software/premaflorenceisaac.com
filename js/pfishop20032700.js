/* global shopRevisionVersion, cmData, plData, paypal, gtag, fbq */

function inches2cm (x) {
    return (Math.round(10 * 2.54 * x) / 10).toFixed(0);
}

function cm2inches (x) {
    return (Math.round(10 * x / 2.54) / 10).toFixed(0);
}

function identity (x) {
    return x;
}

function createCatalog() {
    var ret = {};
    for(var i = 0; i < cmData.length; i++) {
        var cm = createCatalogMediaFromRec(cmData[i]);
        ret[cm.sku] = cm;
    }
    return ret;
}

function createCatalogMedia(name, sku, isUnique, imageURL, weight, volFactor) {
    return {
        name: name,
        sku: sku,
        isUnique: isUnique,
        imageURL: imageURL,
        weight: parseFloat(weight),
        volFactor: parseFloat(volFactor)
    };
}

function createCatalogMediaFromRec(prdArr) {
    return createCatalogMedia(prdArr[0], prdArr[1], (prdArr[5] === 'TRUE' ? true : false), prdArr[4], prdArr[2], prdArr[3]);
}

function createPriceList() {
    var ret = {};
    for(var i = 0; i < plData.length; i++) {
        var rec = plData[i];
        var cm = createPriceRow(rec[0], rec[1]);
        ret[cm.sku] = cm;
    }
    return ret;
}

function createPriceRow(sku, price) {
    return {
        sku: sku,
        price: price
    };
}

function createProduct(name, description, sku, isUnique, inrPrice, imageURL, url, weight, volFactor) {
    return {
        name: name,
        description: description,
        sku: sku,
        isUnique: isUnique,
        inrPrice: inrPrice,
        imageURL: imageURL,
        url: url,
        weight: weight,
        volFactor: volFactor
    };
}

function createProductCatalog(cat, pl) {
    return {
        catalog: cat,
        priceList: pl,
        getProduct: function(code) {
            var cm = this.catalog[ code ];
            var pr = this.priceList[ code ];
            return createProduct(cm.name, "", cm.sku, cm.isUnique, pr.price, cm.imageURL, "", cm.weight, cm.volFactor);
        }
    };
}

var catalogMedia = createCatalog();
var priceList = createPriceList();
var prodCatalog = createProductCatalog(catalogMedia, priceList);

function getProductCatalog() {
    return prodCatalog;
}
var cartKey = 'pfi-cart';
var shopKey = 'pfi-shop';

function createInvoiceNum() {
    var dt = new Date();
    var rand = Math.floor((Math.random() * 10000) + 1);
    var res = "PFI-PP-" + dt.getFullYear() + dt.getMonth() + dt.getDate() + "-" + dt.getHours() + dt.getMinutes() + "-" + rand;
    return res;
}

function createTracker() {
    return {
        fbanal: true,
        ganal: true,
        addItem: function(item) {
            if (this.ganal) {
                gtag('event', 'add_to_cart');
            }
            if (this.fbanal) {
                fbq('track', 'AddToCart');
            }
        },
        removeItem: function(item) {
            if (this.ganal) {
                gtag('event', 'remove_from_cart');
            }
        },
        purchase: function (shop, cart) {
            var currency = shop.currency;
            var amount = shop.getTotal(cart) * 0.25;
            var transId = cart.transId;
            if ( this.ganal ) {
                gtag("event", "purchase");
                gtag('event', 'conversion', {
                    'send_to': 'AW-861963921/k9iaCI_UoJIBEJGNgpsD',
                    'value': amount,
                    'currency': currency,
                    'transaction_id': transId
                });
            }
            if ( this.fbanal ) {
                fbq('track', 'Purchase', {
                    currency: currency,
                    value: amount
                });
            }
        },
        beginCheckout: function(shop, cart) {
            if (this.ganal) {
                gtag("event", "begin_checkout");
            }
            if (this.fbanal) {
                fbq('track', 'InitiateCheckout');
            }
        },
        paypalCheckout: function(shop, cart) {
            if (this.ganal) {
                gtag("event", "begin_checkout");
            }
            if (this.fbanal) {
                fbq('track', 'InitiateCheckout');
            }
        },
        incompleteCheckout: function (shop, cart) {
            if (this.fbanal) {
                fbq('trackCustom', 'IncompleteCheckout');
            }
        }
    };
}

function createShop(version, metric, currency, currencyString) {
    return {
        version: version,
        metric: metric,
        currency: currency,
        currencyString: currencyString,
        save: function() {
            sessionStorage.setItem(shopKey, JSON.stringify(this));
        },
        isIndian: function () {
            return this.currency === 'INR';
        },
        round: function (num) {
            return Math.ceil(num);
        },
        fromINR: function (inr) {
            if (this.isIndian()) {
                return inr;
            } else {
                var fx = FX[this.currency];
                return this.round(inr / fx);
            }
        },
        getPrice: function (item) {
            return this.fromINR(item.price);
        },
        getPriceHTML: function (product) {
            return this.getFXPriceHTML(product.inrPrice);
        },
        getFXPriceHTML: function (inrPrice) {
            return this.currencyString + " " + this.fromINR(inrPrice);
        },
        getTotal: function (cart) {
            var tot = 0.0;
            for (var i = 0; i < cart.items.length; i++) {
                var item = cart.items[i];
                tot += this.fromINR(item.price * item.quantity);
            }
            return tot;
        },
        getShipping: function (cart, calc) {
            return this.fromINR(calc.getShipping(cart.items));
        }
    };
}

function createShopObject(shop) {
    return createShop(shop.version, shop.metric, shop.currency, shop.currencyString);
}

function createItemObject(item) {
    return createItem(item.product, item.price, item.size, item.colour, item.quantity, item.itemSKU, item.imageURL, item.isUnique);
}

function createItem(product, price, size, colour, quantity, sku, imageURL, isUnique) {
    return {
        product: product,
        price: price,
        size: size,
        colour: colour,
        quantity: quantity,
        itemSKU: sku,
        imageURL: imageURL,
        isUnique: isUnique,
        getName: function () {
            return this.product.name;
        },
        getDescription: function () {
            return this.product.name + " " + this.product.description + (this.itemSKU != null ? " - #" + this.itemSKU : "") + (this.size != null && this.size !== "" ? " Size: " + this.size : "") + (this.colour != null && this.colour !== "" ? " Colour: " + this.colour : "");
        },
        getImageURL: function () {
            return this.product.imageURL;
        },
        getURL: function () {
            return this.product.url;
        },
        incrementQty: function (byNum) {
            return createItem(this.product, this.price, this.size, this.colour, this.quantity + byNum, this.itemSKU, this.imageURL, this.isUnique);
        }
    };
}

function createCartObject(cart) {
    var iobjs = [];
    for (var i = 0; i < cart.items.length; i++) {
        iobjs.push(createItemObject(cart.items[i]));
    }
    return createCart(cart.version, iobjs);
}

function createShippingCalculator(toIndia, express) {
    return {
        toIndia: toIndia,
        express: express,
        getShipping: function (items) {
            if (items.length == 0) {
                return 0.0;
            }
            var iw = this.getItemsWeight(items);
            var pw = this.getPackageWeight(items);
            var totalWeight = {
                weight: pw.weight + iw.weight,
                volumetric: pw.volumetric + iw.volumetric
            };
            if (this.toIndia) {
                if (express) {
                    return 200.0 * totalWeight.volumetric;
                } else {
                    return 0.0;
                }
            } else {
                if (this.express) {
                    return 2000.0 * totalWeight.volumetric;
                } else {
                    return this.getIndiaPost(totalWeight.weight);
                }
            }
        },
        getItemsWeight: function (items) {
            var itmWeight = 0;
            var itmVol = 0;
            for (var i = 0; i < items.length; i++) {
                var item = items[ i ];
                var prod = item.product;
                var w = prod.weight;
                var vF = prod.volFactor;
                itmWeight += w * item.quantity;
                itmVol += w * vF * item.quantity;
            }
            return {
                weight: itmWeight,
                volumetric: itmVol
            };
        },
        getPackageWeight: function (items) {
            var contents = this.getItemsWeight(items);
            return {
                weight: contents < 2.0 ? 0.02 : 0.25,
                volumetric: contents < 2.0 ? 0.04 : 0.4
            };
        },
        getIndiaPost: function (weight) {
            if (weight < 2.0) {
                return this.getRegisteredLetterCost(weight);
            } else {
                return this.getRegisteredParcelCost(weight);
            }
        },
        getRegisteredLetterCost: function (weight) {
            var perKilo = (1900 - 200) / 1.9;
            return (weight < 0.1) ? 200 : (200 + ((weight - 0.1) * perKilo));
        },
        getRegisteredParcelCost: function (weight) {
            var perKilo = (3700 - 2200) / 3;
            return (weight < 2.0) ? 2200 : (2200 + ((weight - 2) * perKilo));
        }
    };
}

function createCart(version, items) {
    var transId = createInvoiceNum();
    return {
        version: version,
        items: items,
        transId: transId,
        tracker: createTracker(),
        findIndexSKU: function (itemSKU, sku) {
            for (var i = 0; i < this.items.length; i++) {
                var cartItem = this.items[i];
                if (cartItem.itemSKU === itemSKU &&
                    cartItem.product.sku == sku) {
                    return i;
                }
            }
            return -1;
        },
        getNumItems: function() {
            var num = 0;
            for (var i = 0; i < this.items.length; i++) {
                num += this.items[ i ].quantity;
            }
            return num;
        },
        findIndex: function (item) {
            return this.findIndexSKU(item.itemSKU, item.product.sku);
        },
        hasItem: function (item) {
            var i = this.findIndex(item);
            return 0 <= i;
        },
        addItem: function (item) {
            var i = this.findIndex(item);
            var nitems;
            if (i < 0) {
                nitems = [].concat(this.items);
                nitems.push(item);
                this.tracker.addItem(item);
            } else {
                if (! item.isUnique) {
                    nitems = [].concat(this.items);
                    nitems[i] = this.items[i].incrementQty(1);
                } else {
                    nitems = this.items;
                }
            }
            return createCart(this.version, nitems);
        },
        removeItemWithSKU: function (itemSKU, sku) {
            var i = this.findIndexSKU(itemSKU, sku);
            this.tracker.removeItem(this.items[i]);
            return this.items.splice(i, 1);
        }
    };
}

function createShopForCur(fx, version) {
    if (fx === 'USD') {
        return createShop(version, false, 'USD', '<i class="fa fa-usd"></i>', true);
    } else if (fx === 'EUR') {
        return createShop(version, true, 'EUR', '<i class="fa fa-eur"></i>', true);
    } else if (fx === 'GBP') {
        return createShop(version, true, 'GBP', '<i class="fa fa-gbp"></i>', true);
    } else if (fx === 'AUD') {
        return createShop(version, true, 'AUD', 'A<i class="fa fa-usd"></i>', true);
    } else if (fx === 'CAD') {
        return createShop(version, 'true, CAD', 'C<i class="fa fa-usd"></i>', true);
    } else if (fx === 'CHF') {
        return createShop(version, true, 'CHF', 'SFr.', true);
    } else {
        return createShop(version, true, 'INR', '<i class="fa fa-inr"></i>', fx !== null);
    }
}

function saveShop(shop) {
    sessionStorage.setItem(shopKey, JSON.stringify(shop));
}

function initShop(cur, version) {
    var shop = createShopForCur(cur, version);
    saveShop(shop);
    return shop;
}

function loadShop(cur) {
    var version = shopRevisionVersion;
    if (cur !== null) {
        return initShop(cur, version);
    }
    var shopString = sessionStorage.getItem(shopKey);
    if (shopString == null) {
        return initShop(null, version);
    } else {
        var shop = createShopObject(JSON.parse(shopString));
        if ( shop.version === version ) {
            return shop;
        } else {
            return initShop(shop.currency, version);
        }
    }
}

function loadCart(version) {
    var cartString = sessionStorage.getItem(cartKey);
    if (cartString == null) {
        return initCart(version);
    } else {
        var cart = createCartObject(JSON.parse(cartString));
        if (cart.version === version) {
            return cart;
        } else {
            return initCart(version);
        }
    }
}

function saveCart(cart) {
    sessionStorage.setItem(cartKey, JSON.stringify(cart));
}

function initCart(version) {
    var cart = createCart(version, []);
    saveCart(cart);
    return cart;
}

function emptyCart(version) {
    return initCart(version);
}

// Paypal specific Code

function createPPItemJSON(shop, item) {
    var product = item.product;
    var name = product.name;
    var description = item.getDescription();
    return {
        name: name,
        description: description,
        quantity: item.quantity,
        price: shop.getPrice(item),
        tax: 0,
        sku: item.sku,
        currency: shop.currency
    };
}

function createPPItemsJSON(shop, items) {
    var nitems = [];
    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        nitems.push(createPPItemJSON(shop, item));
    }
    return {
        items: nitems
    };
}

function createPPSaleJSON(shop, cart, calc) {
    var subT = shop.getTotal(cart);
    var shp = shop.getShipping(cart, calc);
    return {
        intent: 'sale',
        payer: {
            payment_method: 'paypal'
        },
        transactions: [{
            amount: {
                total: subT + shp,
                currency: shop.currency,
                details: {
                    subtotal: subT,
                    shipping: shp,
                    tax: 0
                }
            },
            invoice_number: createInvoiceNum(),
            payment_options: {
                allowed_payment_method: 'INSTANT_FUNDING_SOURCE'
            },
            item_list: createPPItemsJSON(shop, cart.items)
        }],
        note_to_payer: 'Contact us at prema.florence.isaac@gmail.com for any questions on your order.',
    };
}

function createPaypalCheckoutButton(id, shop, cart, calc, allCartC) {
    var saleJSON = createPPSaleJSON(shop, cart, calc);
    var tracker = createTracker();
    return paypal.Button.render({
        env: 'production', // sandbox | production
        style: {
            fundingicons: true,
            branding: true,
            label: 'checkout', // checkout | credit | pay | buynow | generic
            size: 'small', // small | medium | large | responsive
            shape: 'rect', // pill | rect
            color: 'gold' // gold | blue | silver | black
        },
        client: {
            sandbox: 'ATFh7VwBqghYazyysj2M_N64CQDHLS6gsbmvcLptHpR2uR1w7hJSjjB8VvoZ3MJf-xoT_6BTWZKM6Ps0',
            production: 'ARjY3kYcCLKkycQsJ0c1WqplwPa_4IoTrSlhO9gzZViRXzQnEtOdaafv0JozCb-padelApZAhOU_7iIv'
        },
        commit: true,
        payment: function (data, actions) {
            return actions.payment.create(saleJSON);
        },
        onClick: function () {
            tracker.beginCheckout(shop, cart);
        },
        onAuthorize: function (data, actions) {
            return actions.payment.execute().then(function (res) {
                // Show a confirmation message to the buyer
                //state codes - completed, partially_refunded, pending, refunded, denied
                var state = res.transactions[0].related_resources[0].sale.state;
                if (state == 'completed') {
                    tracker.purchase(shop, cart);
                    var msg = "Payment received for the invoice number " +
                        res.transactions[0].invoice_number;
                    allCartC.onTransactionComplete(true, state, msg);
                } else if (state == 'pending') {
                    tracker.purchase(shop, cart);
                    allCartC.onTransactionComplete(true, state, "Your transaction is pending, we will contact you at your email within 24 hours to update you");
                } else {
                    tracker.incompleteCheckout(shop, cart);
                    allCartC.onTransactionComplete(false, state, "There was a problem with your PayPal transaction: " + state);
                }
            });
        },
        onCancel: function (data, actions) {
            tracker.incompleteCheckout(shop, cart);
            allCartC.onTransactionComplete(false, null, "Your PayPal transaction was canceled");
        },
        onError: function (err) {
            tracker.incompleteCheckout(shop, cart);
            allCartC.onTransactionComplete(false, null, "Oops your PayPal transaction did not complete");
        }
    }, id);
}

function getRandom(num, min, max) {
    var tot = max - min + 1;
    var res = [];
    for (var i = 0; i < num; i++) {
        var r = Math.floor(Math.random() * tot) + 1;
        while (res.includes(r)) {
            r = Math.floor(Math.random() * tot) + 1;
        }
        res.push(r);
    }
    return res;
}

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

function createSizeRadio(name, idPfx, val, i, checked) {
    return '<div class="custom-control custom-control-inline custom-control-size mb-2"><input type="radio" class="custom-control-input" name="' + name   +'" id="' + idPfx + i + '" value="' +  val  + '"' + (checked ? 'checked="checked" ' : '') +  ' onclick="onSelectionChange()"><label class="custom-control-label" for="' + idPfx + i + '">' + val +'</label></div>';
}

function createSizeOptions(radName, label, vals, selIdx) {
    var id = radName + "Group";
    var res = '<div class="form-group"><label for="' + id + '">' + label + ':</label> <span id="' +  id + '" class="mb-2">';
    var idPfx = radName + "ID";
    for (var i = 0; i < vals.length; i++) {
        res += createSizeRadio(radName, idPfx, vals[i], i, (i == selIdx));
    }
    res += '</span></div>';
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

function createCurrencySelectorComponent(shop, allCartC) {
    return {
        shop: shop,
        allCartC: allCartC,
        setShop: function (shop) {
            this.shop = shop;
            this.updateUI();
        },
        initUI: function () {
            let that = this;
            var buttons = jQuery('#currencies span');
            buttons.removeClass('selected');
            $('#currencies span[data-currency=' + this.shop.currency + ']').addClass('selected');
            buttons.click(function () {
                buttons.removeClass('selected');
                jQuery(this).addClass('selected');
                let cur = jQuery(this).attr('data-currency');
                if (cur === that.shop.currency) {
                    return;
                }
                let shop = createShopForCur(cur);
                shop.save();
                that.allCartC.setShop(shop);
            });
        },
        updateUI: function () {
            var buttons = jQuery('#currencies span');
            buttons.removeClass('selected');
            $('#currencies span[data-currency=' + this.shop.currency + ']').addClass('selected');
        }
    };
}

function createItemRenderer(parentId, tshirtItem, shop, options) {
    return {
        parentId: parentId,
        item: tshirtItem,
        shop: shop,
        options: options,
        getButtonID: function () {
            return parentId + "sc-itm-" + tshirtItem.itemSKU;
        },
        getDescription: function () {
            var number = this.item.itemSKU;
            return "#" + number;
        },
        getOrderDescription: function () {
            return this.item.getDescription();
            //            return this.item.quantity + " " + this.item.size + " " + this.item.colour + " T-Shirt";
        },
        createRemoveFromCartButton: function () {
            return '<button id="' + this.getButtonID() + '" class="btn btn-outline-dark btn-sm" type="button"><span class="fa fa-times"></span> Remove From Cart</button>';
        },
        createRow: function (html) {
            return '<div class="row border border-dark p-2" " style="background-color:' + this.options.bgColor + '; color:' + this.options.fgColor + '">' +
                html +
                '</div>';
        },
        createColumn: function (ncol, html) {
            return '<div class="col-' + ncol + ' align-self-center">' +
                html +
                '</div>';
        },
        createDesciptionPanel: function () {
            var html = '<span class="text-center"><figure><img src="' 
            + this.item.imageURL 
            + '" class="img-fluid center-block"></figure></span>';
            return this.createColumn(4, html);
        },
        createOrderPanel: function () {
            var html = '<p>' + this.getOrderDescription() + '<br>' 
                + this.shop.getPriceHTML(this.item.product) + '</p>'
            + this.createRemoveFromCartButton();
            return this.createColumn(8, html);
        },
        createSalePanel: function (options) {
            return this.createRow(
                this.createDesciptionPanel() + this.createOrderPanel());
        }
    };
}

function createCartSummaryComponent(shop, cart, allCartC) {
    return {
        id: '#shop-cart-summary',
        shop: shop,
        cart: createCart(cart.version, cart.items.slice()),
        allCartC: allCartC,
        reset: function (shop, cart) {
            this.shop = shop;
            this.cart = cart;
        },
        setShop: function (shop) {
            this.shop = shop;
            this.updateUI();
        },
        initUI: function () {},
        showUI: function () {},
        hideUI: function () {},
        updateUI: function () {
            $('.sc-badge-items').text(this.cart.getNumItems());
            if (0 == this.cart.items.length) {
                $('.sc-non-empty').css("visibility", "hidden");
                $('.sc-non-empty').hide();
                let elt = $('#sc-edit-id');
                elt.addClass('disabled');
                elt.attr('aria-disabled', true);
            } else {
                var subTotal = this.shop.getTotal(this.cart);
                var shipping = this.shop.getShipping(this.cart, this.allCartC.shippingCalc);
                var total = Math.round((subTotal + shipping) * 100) / 100;
                $('.sc-currency-string').html(this.shop.currencyString);
                $('.sc-total').text(total);
                $('.sc-non-empty').show();
                $('.sc-non-empty').css("visibility", "visible");
                let elt = $('#sc-edit-id');
                elt.removeClass('disabled');
                elt.attr('aria-disabled', false);
            }
        }
    };
}

function createCartComponent(componentId, shop, cart, allCartC) {
    return {
        componentId: componentId,
        shop: shop,
        cart: createCart(cart.version, cart.items.slice()),
        allCartC: allCartC,
        setShop(shop) {
            this.shop = shop;
            this.updateUI();
        },
        resetCart: function () {
            this.cart = this.allCartC.cloneCart();
            this.updateUI();
        },
        removeItem: function (itemSKU, sku) {
            this.cart.removeItemWithSKU(itemSKU, sku);
            this.updateUI();
        },
        saveCart: function () {
            this.allCartC.saveCart(this.cart);
            this.updateUI();
            this.hideUI();
        },
        initUI: function () {
            var that = this;
            var idString = '#' + this.componentId;
            $(idString + " .sc-save-changes").on('click', function (event) {
                that.saveCart();
            });
            $(idString + " .sc-checkout").on('click', function (event) {
                that.saveCart();
                that.hideUI();
                allCartC.checkoutC.showUI();
            });
            $(idString).on('show.bs.modal', function (event) {
                that.resetCart();
            });
            $(idString).on('hide.bs.modal', function (event) {
                that.resetCart();
            });
        },
        hideUI: function () {
            var idString = '#' + this.componentId;
            $(idString).modal("hide");
        },
        updateUI: function () {
            var idString = '#' + this.componentId;
            var subTotal = this.shop.getTotal(this.cart);
            var shipping = this.shop.getShipping(this.cart, this.allCartC.shippingCalc);
            var total = Math.round((subTotal + shipping) * 100) / 100;
            $(idString + ' .sc-badge-items').text(this.cart.getNumItems());
            $(idString + ' .sc-currency-string').html(this.shop.currencyString);
            $(idString + ' .sc-subtotal').text(subTotal);
            $(idString + ' .sc-shipping').text(shipping);
            $(idString + ' .sc-total').text(total);
            $(idString + ' .sc-item-list .btn').off('click');
            $(idString + ' .sc-item-list').empty();
            for (var i = 0; i < this.cart.items.length; i++) {
                var options = {
                    edit: true,
                    fgColor: "black",
                    bgColor: (i % 2 == 0) ? "lightgrey" : "white"
                };
                var item = this.cart.items[i];
                var renderer = createItemRenderer(this.componentId, item, this.shop, options);
                var html = renderer.createSalePanel();
                $(html).appendTo(idString + ' .sc-item-list');
                var that = this;
                var btnElt = $('#' + renderer.getButtonID());
                let itemSKU = item.itemSKU;
                let sku = item.product.sku;
                btnElt.on('click', function () {
                    that.removeItem(itemSKU, sku);
                });
            }
        }
    };
}

function createCheckoutComponent(componentId, shop, cart, allCartC) {
    return {
        componentId: componentId,
        shop: shop,
        cart: createCart(cart.version, cart.items.slice()),
        allCartC: allCartC,
        setShop: function (shop) {
            this.shop = shop;
            $('#sc-ship-to-india').prop("checked", shop.isIndian());
            var shippingCalc = createShippingCalculator(
                this.getShipToIndiaField(), this.getExpressField());
            this.allCartC.setShippingCalc(shippingCalc);
            this.updateUI();
        },
        resetCart: function () {
            this.cart = this.allCartC.cloneCart();
            this.updateUI();
        },
        getShipToIndiaField: function () {
            return $('#sc-ship-to-india').prop("checked");
        },
        getExpressField: function () {
            return $('#sc-ship-express').prop("checked");
        },
        onFieldChange() {
            var shipToIndia = this.getShipToIndiaField();
            var shipExpress = this.getExpressField();
            var shippingCalc = createShippingCalculator(shipToIndia, shipExpress);
            this.allCartC.setShippingCalc(shippingCalc);
            this.updateUI();
        },
        initUI: function () {
            var that = this;
            var isIndian = this.shop.isIndian();
            var sti = $('#sc-ship-to-india');
            sti.prop("checked", isIndian);
            sti.prop("disabled", true);
            $('#sc-ship-to-india').on("click", function () {
                that.onFieldChange();
            });
            $('#sc-ship-express').on("click", function () {
                that.onFieldChange();
            });
            var idString = '#' + this.componentId;
            $(idString).on('show.bs.modal', function (event) {
                that.resetCart();
            });
            $(idString).on('hide.bs.modal', function (event) {
                that.resetCart();
            });
        },
        showUI: function () {
            var idString = '#' + this.componentId;
            $(idString).modal("show");
        },
        hideUI: function () {
            var idString = '#' + this.componentId;
            $(idString).modal("hide");
        },
        updateUI: function () {
            $("#sc-paypal-btn").empty();
            createPaypalCheckoutButton("#sc-paypal-btn", this.shop, this.cart, this.allCartC.shippingCalc, this.allCartC);
            var idString = '#' + this.componentId;
            var subTotal = this.shop.getTotal(this.cart);
            var shipping = this.shop.getShipping(this.cart, this.allCartC.shippingCalc);
            var total = Math.round((subTotal + shipping) * 100) / 100;
            $(idString + ' .sc-badge-items').text(this.cart.getNumItems());
            $(idString + ' .sc-currency-string').html(this.shop.currencyString);
            $(idString + ' .sc-subtotal').text(subTotal);
            $(idString + ' .sc-shipping').text(shipping);
            $(idString + ' .sc-total').text(total);
        }
    };
}

function createPPReturnComponent(componentId, allCartC) {
    return {
        componentId: componentId,
        allCartC: allCartC,
        initUI: function () {},
        toast: function (header, text) {
            this.setMessage(header, text);
            this.showUI();
        },
        setMessage: function (header, text) {
            var idString = '#' + this.componentId;
            $(idString + ' .pptitle').text(header);
            $(idString + ' .ppmessage').html(text);
        },
        showUI: function () {
            var idString = '#' + this.componentId;
            $(idString).modal("show");
        },
        updateUI: function (isOk, status, error) {
            if (isOk) {
                if (status == 'completed') {
                    this.setMessage("Payment Complete", "Thank you for your order! We will send you an email summarizing the order and keep you updated as your order is processed and shipped.");
                } else {
                    this.setMessage("Payment Complete", error);
                }
            } else {
                this.setMessage("Problem with Payment", error);
            }
        }
    };
}

function createAllCartComponents(shop, tlpc) {
    var allCartC = {
        shop: shop,
        curSelC: null,
        ppReturnC: null,
        cartSummaryC: null,
        cartC: null,
        checkoutC: null,
        tlpc: tlpc,
        shippingCalc: createShippingCalculator(shop.isIndian(), false),
        setShippingCalc: function (sc) {
            this.shippingCalc = sc;
        },
        onTransactionComplete: function (isOK, status, error) {
            this.ppReturnC.updateUI(isOK, status, error);
            this.checkoutC.hideUI();
            if (isOK) {
                var cart = emptyCart(shopRevisionVersion);
                this.cartSummaryC.cart = cart;
                this.cartSummaryC.updateUI();
            }
            this.ppReturnC.showUI();
        },
        saveCart: function (cart) {
            saveCart(cart);
            this.cartSummaryC.cart = cart;
            this.cartSummaryC.updateUI();
        },
        cloneCart: function () {
            return createCart(this.cartSummaryC.cart.version, this.cartSummaryC.cart.items.slice());
        },
        setShop: function (shop) {
            this.shop = shop;
            this.curSelC.setShop(shop);
            this.cartSummaryC.setShop(shop);
            this.cartC.setShop(shop);
            this.checkoutC.setShop(shop);
            this.tlpc.onSelectionChange();
        },
        initCartComponents: function (cart) {
            this.curSelC = createCurrencySelectorComponent(this.shop, this);
            this.curSelC.initUI();

            this.cartSummaryC = createCartSummaryComponent(this.shop, cart, this);
            this.cartSummaryC.initUI();

            this.ppReturnC = createPPReturnComponent('paypal-return', this);
            this.ppReturnC.initUI();

            this.cartC = createCartComponent('shopping-cart', this.shop, cart, this);
            this.cartC.initUI();

            this.checkoutC = createCheckoutComponent('checkout-form', this.shop, cart, this);
            this.checkoutC.initUI();
        },
        addToCart: function (item) {
            var cart = loadCart(shopRevisionVersion);
            cart = cart.addItem(item);
            saveCart(cart);

            this.toast("Shopping Cart", "You added <strong>" + item.getDescription() + "</strong> to your cart.");
            this.updateCartSummary(cart);
            return true;
        },
        updateUI: function () {
            this.curSelC.updateUI();
            this.cartSummaryC.updateUI();
            this.ppReturnC.updateUI();
            this.cartC.updateUI();
            this.checkoutC.updateUI();
        },
        toast: function (header, message) {
            this.ppReturnC.toast(header, message);
        },
        updateCartComponents: function (shop, cart) {
            this.cartC.resetCart();
            this.checkoutC.resetCart();
        },
        updateCartSummary: function (cart) {
            this.cartSummaryC.reset(this.shop, cart);
            this.updateCartComponents(this.shop, cart);
            this.cartSummaryC.updateUI();
        },
    };
    var cart = loadCart(shopRevisionVersion);
    allCartC.initCartComponents(cart);
    allCartC.updateUI();
    return allCartC;
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

function createShopPageComponent() {
    var catalog = getProductCatalog();
    return {
        catalog: catalog,
        allCartC: null,
        init: function () {
            let shop = loadShop(null);
            this.allCartC = createAllCartComponents(shop, this);
        },
        createButtonID: function(num) {
            return "btn" + num;
        },
        createPurchasePanelID: function(num) {
            return "scpp-" + num;
        },
        onDocumentReady: function () {
            this.init();
            this.onSelectionChange();
        },
        onSelectionChange: function() {
            var elts =$('.sc-item');
            var that = this;
            elts.each(function(index) {
                var sku = $(this).data('vsku');
                var prod =  that.catalog.getProduct(sku);
                $(this).empty();
                var html = that.allCartC.shop.getPriceHTML(prod);
                $(this).append(html);
            });
        }
    };
}