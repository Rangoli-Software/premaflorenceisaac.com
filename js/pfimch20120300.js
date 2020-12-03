function getRandomIdx(arr) {
    return Math.floor(Math.random() * arr.length);
}

function createSiteMap(siteMap) {
    return {
        sm: siteMap,
        findStory: function(url) {
            for (var i = 1; i < this.sm.length; i++) {
                var sec = sm[i];
                for (var j = 0; j < sec.sub.length; j++) {
                    var itm = sec.sub[i];
                    if ( itm.url === url ) {
                        return [sec, itm];
                    }
                }
            }
            return null;
        }
    }
}

function createPageSet(pages) {
    return {
        pages: pages,
        includes: function (page) {
            var url = page.url;
            if (url === undefined) {return false;}
            for (var i = 0; i < this.pages.length; i++) {
                if (url === this.pages[i].url){
                    return true;
                }
            }
            return false;
        },
        filter: function(fn) {
            return createPageSet(pages.filter(fn));
        },
        select: function(key, val){
            return this.pages.find(function(page){ return page[key] === val});
        }
    }
}

function createMIPageSet() {
    var pages = JSON.parse(JSON.stringify(merchInfo));
    var catalog = pfiavG.catalog;
    for (var i = 0; i < pages.length; i++) {
        var item = pages[i];
        item.title = catalog[item.SKU].name;
        item.url = catalog[item.SKU].url;
    }
    return createPageSet(pages);
}

function createPageIndex(page) {
    return {
        page: page,
        included: createPageSet([page]),
        mentioned: createPageSet([]),
        miPageSet: createMIPageSet(),

        createFeatures: function() {
            var pageSel = createPageSelector(this.miPageSet, this.mentioned, this.included);
            var stories = pageSel.selectFeatures();
            var merch = pageSel.selectMerch();
            return createRelated("Features", merch.concat(stories), [1, 4, 7, 10]);
        }
    }
}

function createPageSelector(mips, wl, bl) {
    return {
        miPageSet: mips,
        blacklist: bl,
        whitelist: wl,
        selFeature: function(secList) {
            var i = getRandomIdx(secList);
            var section = secList[i];

            var idx = getRandomIdx(section.sub);
            var sel = section.sub[idx];
            while (this.blacklist.includes(sel)) {
                idx = getRandomIdx(section.sub);
                sel = section.sub[idx];
            };
            return createStoryRef(section, sel);
        },
        selectFeatures: function() {
            var bg = [atelier, origin];
            var ab = [about, buzz, archives, lotm, moods, ramp, clients];
            return [this.selFeature(bg), this.selFeature(ab)];
        },
        selMerch: function(skuList) {
            var fltMI = this.miPageSet.filter(page => !this.blacklist.includes(page));
            var idx = getRandomIdx(skuList);
            var sku = skuList[idx];
            var sel = fltMI.select("SKU", sku);
            var img = sel.images[getRandomIdx(sel.images)];
            sel.imageURL = img.url;
            return createMerchandisingRef(sel);
        },
        selectMerch: function() {
            var leftSKUs = ['OVTPLO1501Vo', 'VAMPAL1708Kh', 'LTSDSL1501Kh', 'DPDYSF1501PT', 'KAGTIE1601Kh', 'CHMPGN1501JL', 'NKSHMD1501PP', 'NKSHMC1512PP', 'BKLLTS1505Je', 'JLTDRS1505PT', 'PRNCDR1501Rv', 'FAIRST2011Rv', 'YUVRTC1601Rv'];
            var restSKUs = ['BERMPA1609Kh', 'BALLPA1501Vo', 'CRPTOP1805Kh', 'FACEMK2005Ta', 'AWTSHT1604Je', 'NKSHMU1501PP', 'NKSHMI1501PP', 'HLNDRS1505PT', 'KDHRDR1601Rv', 'KWAVDR1601Rv', 'KBALPA1601Vo', 'KGYPST1601Rv', 'HLFPNT1601Kh', 'KLGTLY1601Rv'];
            return [this.selMerch(leftSKUs), this.selMerch(restSKUs)];
        }
    }
}

function createMerchandisingRef(item) {
    return {
        itm: item,
        setRandImg: function() {
            item.imageURL = item.images[getRandomIdx(item.images)].url;
        },
        createCard: function () {
            var item = this.itm;
            var title = item.title;
            var url = item.url;
            var res = '<div class="card mb-2">';
            res += '<div class="embed-responsive embed-responsive-1by1">';
            res += '<img src="' + item.imageURL + '" alt="' + title + '" class="embed-responsive-item" style="object-fit: cover">';
            res += '</div>';
            res += '<div class="card-body px-0 pt-6 pb-4">';
            res += '<div class="card-subtitle mb-1"><span class="sc-item" data-field="price" data-vsku="' + item.SKU + '"></span></div>';
            res += '<h6 class="card-title mb-2">' + title + '<a  href="' + url + '"><i class="fa fa-arrow-right ml-2"></i></a></h6>';
            var lede = item.ledes[getRandomIdx(item.ledes)];
            res += '<p class="mb-1">' + lede + '</p>';
            res += '</div></div>';
            return res;
        }
    }
}

function createStoryRef(section, item) {
    return {
        sec: section,
        sel: item,
        createCard: function() {
            var section = this.sec;
            var item = this.sel;
            var res = '<div class="card mb-2">';
            if (item.imageURL !== undefined) {
                res += '<div class="embed-responsive embed-responsive-1by1">';
                res += '<img src="' + item.imageURL + '" alt="' + item.title + '" class="embed-responsive-item" style="object-fit: cover">';
                res += '</div>';
            } else if (item.imageHTML !== undefined) {
                res += item.imageHTML;
            } else if (item.imageScript !== undefined) {
                res += eval(item.imageScript);
            }
            res += '<div class="card-body px-0 pt-6 pb-4">';
            res += '<div class="card-subtitle mb-1"><a class="text-muted" href="' + section.url + '">' + section.title + '</a></div>';
            if (item.url !== undefined) {
                res += '<h6 class="card-title mb-2">' + item.title + '<a  href="' + item.url + '"' + (getHostName(item.url) === null ? '' : ' target="_blank"') + '><i class="fa ' + (getHostName(item.url) === null ? 'fa-arrow-right' : 'fa-external-link') + ' ml-2"></i></a></h6>';
            }
            res += '<p class="mb-1">' + item.lede + '</p>';
            res += '</div></div>';
            return res;
        }
    }
}

function createRelated(header, cards, orderidxs) {
    var catalog = createCatalog();
    var brkColCls = "col-sm-6 col-md-3";
    var res = '<div class="container mb-5"><section class="pt-4"><h5>' + header + '</h5><div class="row">';
    var ordI = 0;
    orderidxs = shuffle(orderidxs);
    for (var i = 0; i < cards.length && ordI < orderidxs.length; i++) {
        var card = cards[i];
        res += '<div class="col-6 ' + brkColCls + " order-" + orderidxs[ordI] + '">' + card.createCard() + '</div>';
        ordI++;
    }
    res += '</div></section></div>';
    return res;
}
