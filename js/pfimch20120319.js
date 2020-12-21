function getRandomIdx(arr) {
	return Math.floor(Math.random() * arr.length);
}

function createPageSet(pages) {
	return {
		pages: pages,
		includes: function (page, key) {
			var url = page[key];
			if (url === undefined) {
				return false;
			}
			return this.select(key, url) !== undefined;
		},
		includesImg: function (page) {
			var url = page.imageURL;
			if (url === undefined) {
				return false;
			}
			if (this.select('imageURL', url) !== undefined) {
				return true;
			}
			var imgs = page.images;
			if (imgs === undefined) {
				return false;
			}
			for (var i = 0; i < imgs.length; i++) {
				url = imgs[i].url;
				if (this.select('imageURL', url) !== null) {
					return true;
				}
			}
			return false;
		},
		filter: function (fn) {
			return createPageSet(pages.filter(fn));
		},
		select: function (key, val) {
			return this.pages.find(function (page) {
				return page[key] === val
			});
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

		createFeatures: function () {
			var pageSel = createPageSelector(this.miPageSet);
			var merch = pageSel.selectMerch();
			this.included = createPageSet(this.included.pages.concat(merch));
			var stories = pageSel.selectFeatures();
			this.included = createPageSet(this.included.pages.concat(stories));
			return createRelated("Features", merch.concat(stories), [1, 4, 7, 10]);
		}
	}
}

function createNUSampler(total, items, sample, itemkey) {
	return {
		itemkey: itemkey,
		total: total,
		items: items,
		sample: sample,
		sampleOne: function () {
			var rndWeight = Math.floor(Math.random() * this.total);
			var cumWeight = 0;
			for (var i = 0; i < this.items.length; i++) {
				var item = this.items[i];
				cumWeight += item.weight;
				if (rndWeight < cumWeight) {
					var newitems = this.items.slice(0, i).concat(this.items.slice(i + 1))
					var newsample = this.sample.concat([item]);
					var newtotal = this.total - item.weight;
					return createNUSampler(newtotal, newitems, newsample, this.itemkey);
				}
			}
			return this;
		},
		sampleN: function (n) {
			var sam = this;
			for (var i = 0; i < n; i++) {
				sam = sam.sampleOne();
			}
			return sam;
		},
		filter: function (keys) {
			var itms = this.items.filter(i => keys.includes(i[this.itemkey]));
			var smpl = this.sample.filter(i => keys.includes(i[this.itemkey]));
			var cum = 0;
			itms.forEach(i => cum += i.weight);
			return createNUSampler(cum, itms, smpl, this.itemkey);
		}
	};
}

function createItemSample(sku, weight) {
	return {
		SKU: sku,
		weight: weight
	};
}

function createMerchandisingSampler(merchSKUs, merchSections, sectionWeights) {
	var merchWeights = {
		AWTSHT1604Je: 30,
		NKSHMD1501PP: 30,
		FACEMK2005Ta: 20
	};
	var items = merchSKUs.flatMap((skulist, idx) => skulist.map(sku => createItemSample(sku, merchWeights[sku] !== undefined ? merchWeights[sku] : sectionWeights[idx])));
	var cum = 0;
	items.forEach(i => cum += i.weight);
	return createNUSampler(cum, items, [], 'SKU');
}

function createStorySample(item, weight) {
	var clone = JSON.parse(JSON.stringify(item));
	clone.weight = weight;
	return clone;
}

function createStorySampler(all) {
	var cum = 0;
	all.forEach(i => cum += i.weight);
	return createNUSampler(cum, all, [], 'url');
}

function createPageSelector(mips) {
	var lineMerchSKUs = [
    ["AWTSHT1604Je"],
    ["OVTPSH1501Pa", "OVTPLO1501Pa", "TRPZTP1807Pa", "MDRSTP1606PP", "SARITP1501Pa", "LNKFTN1501Ja", "LOTSDR1501Ja", "NKSHDR1501Ta", "NKSHMU1501PP", "NKSHMD1501PP", "NKSHMI1501PP", "NKSHMC1512PP", "FACEMK2005Ta"],
    ["KLGTLY1601Rv", "KGYPST1601Rv", "KRAJPT1601Kh", "FAIRST2011Rv", "KBALPA1601Vo", "KRAJKT1601Rv", "YUVRTC1601Rv", "HLFPNT1601Kh", "KIDIKI1501Vi", "PRNCDR1501Rv", "KWAVDR1601Rv", "KDHRDR1601Rv"],
    ["HLNDRS1505PT", "JLTDRS1505PT", "BKLLTS1505Je"],
    ["TRPZTP1807Kh", "CRPTOP1805Kh", "VAMPAL1708Kh", "OVTPLO1501Vo", "BERMPA1609Kh", "LTSDSL1501Kh", "BALLPA1501Vo"],
    ["DPDYSF1501PT"]
	];
	var lineMerchSections = [
		{
			"title": "Woven Canvas",
			"url": "/products/wovencanvas/shop.html"
		},
		{
			"title": "Art Wear",
			"url": "/products/artwear/shop.html"
		},
		{
			"title": "It's Magic",
			"url": "/products/itsmagic/shop.html"
		},
		{
			"title": "Ce Soir",
			"url": "/products/night/shop.html"
		},
		{
			"title": "Happy Everyday",
			"url": "/products/happyeveryday/shop.html"
		},
		{
			"title": "Extras",
			"url": "/products/xtras/shop.html"
		}
	];
	var lineMerchWeights = [3, 3, 2, 2, 1, 2];

	var merchSKUs = lineMerchSKUs.flat();
	var sections = [atelier, origin, about, buzz, archives, lotm, moods, ramp, clients];
	var weights = [3, 5, 2, 2, 1, 3, 1, 2, 5];
	var allstories = sections.flatMap((sec, secidx) => sec.sub.map(pg => createStorySample(pg, weights[secidx])));
	return {
		sections: sections,
		allstories: allstories,
		miPageSet: mips,
		maxStories: 2,
		maxMerch: 2,
		merchSKUs: merchSKUs,
		merchSKUSampler: createMerchandisingSampler(lineMerchSKUs, lineMerchSections, lineMerchWeights),
		storySampler: createStorySampler(allstories),
		filterStories: function () {
			var blacklist = pfiavG.pageIdx.included;
			return this.allstories.filter(function (page) {
				return !blacklist.includes(page, 'url') && !blacklist.includesImg(page);
			});
		},
		selectURLs: function (fltS) {
			var sampler = this.storySampler.filter(fltS.map(pg => pg.url));
			return sampler.sampleN(this.maxStories).sample.map(s => s.url);
		},
		findStorySection: function (url) {
			var secIdx = this.sections.findIndex(sec => sec.sub.find(pg => pg.url === url) !== undefined);
			return this.sections[secIdx];
		},
		selectFeatures: function () {
			var fltS = this.filterStories();
			var fltURLs = this.selectURLs(fltS);
			var res = [];
			for (var i = 0; i < fltURLs.length; i++) {
				let url = fltURLs[i];
				var sel = this.allstories.find(pg => pg.url === url);
				res.push(createStoryRef(this.findStorySection(url), sel));
			}
			return res;
		},
		findMerchSection: function (sku) {
			var lineIdx = lineMerchSKUs.findIndex(skulist => skulist.includes(sku));
			return lineMerchSections[lineIdx];
		},
		filterMerchPages: function () {
			var blacklist = pfiavG.pageIdx.included;
			return this.miPageSet.filter(function (page) {
				return !blacklist.includes(page, 'url') && !blacklist.includesImg(page) && !blacklist.includes(page, 'SKU');
			});
		},
		selectSKUs: function (fltMI) {
			var fltSKUs = this.merchSKUs.filter(sku => fltMI.select('SKU', sku) !== undefined);
			var sampler = this.merchSKUSampler.filter(fltSKUs);
			return sampler.sampleN(this.maxMerch).sample.map(s => s.SKU);
		},
		selectMerch: function () {
			var fltMI = this.filterMerchPages();
			var fltSKUs = this.selectSKUs(fltMI);
			var res = [];
			for (var i = 0; i < fltSKUs.length; i++) {
				var sku = fltSKUs[i];
				var sel = fltMI.select('SKU', sku);
				var img = sel.images[getRandomIdx(sel.images)];
				sel.imageURL = img.url;
				var ref = createMerchandisingRef(sel, this.findMerchSection(sku));
				ref.setRandLede();
				res.push(ref);
			}
			return res;
		},
	}
}

function createProductCard(sku, title, url, imageURL, lede, isSq, section) {
	var res = '<div class="card mb-2">';
	if (isSq) {
		res += '<div class="embed-responsive embed-responsive-1by1">';
		res += '<img src="' + imageURL + '" alt="' + title + '" class="embed-responsive-item" style="object-fit: cover">';
		res += '</div>';
	} else {
		res += '<div class="card-img">'
		res += '<img src="' + imageURL + '" alt="' + title + '" class="img-fluid card-img-top card-img-front">';
		res += '</div>';
	}
	res += '<div class="card-body px-0 pt-6 pb-4">';
	if (section === undefined) {
		res += '<div class="card-subtitle mb-1"><span class="sc-item" data-field="price" data-vsku="' + sku + '"></span></div>';
		res += '<h6 class="card-title mb-2">' + title + '<a  href="' + url + '"><i class="fa fa-arrow-right ml-2"></i></a></h6>';
	} else {
		res += '<div class="card-subtitle mb-1"><a class="text-muted" href="' + section.url + '">' + section.title + '</a></div>';
		res += '<h6 class="card-title mb-2">' + title + '<a  href="' + url + '"><i class="fa fa-arrow-right ml-2"></i></a></h6>';
		res += '<p class="mb-1"><span class="sc-item" data-field="price" data-vsku="' + sku + '"></span></p>'
	}
	if (lede !== null) {
		res += '<p class="mb-1">' + lede + '</p>';
	}
	res += '</div></div>';
	return res;
}

function createProductRef(product) {
	return {
		title: product.name,
		url: product.url,
		imageURL: null,
		setImg(imgurl) {
			this.imageURL = imgurl;
		},
		createCard: function () {
			return createProductCard(product.sku, this.title, this.url, this.imageURL, null, false);
		}
	};
}

function createMerchandisingRef(item, section) {
	return {
		imageURL: item.imageURL,
		lede: null,
		setRandImg: function () {
			this.setImg(getRandomIdx(item.images));
			this.setRandLede();
		},
		setImg(idx) {
			this.imageURL = item.images[idx].url;
		},
		setRandLede() {
			this.lede = item.ledes[getRandomIdx(item.ledes)];
		},
		createCard: function () {
			var url = (item.vidx === undefined) ? item.url :  item.url + "?v=" + item.vidx;
			return createProductCard(item.SKU, item.title, url, this.imageURL, this.lede, true, section);
		}
	}
}

function createStoryRef(s, itm) {
	return {
		sec: s,
		sel: itm,
		title: itm.title,
		url: itm.url,
		imageURL: itm.imageURL,
		imageHTML: itm.imageHTML,
		imageScript: itm.imageScript,
		lede: itm.lede,
		createCard: function () {
			var section = this.sec;
			var item = this.sel;
			var res = '<div class="card mb-2">';
			if (this.imageURL !== undefined) {
				res += '<div class="embed-responsive embed-responsive-1by1">';
				res += '<img src="' + this.imageURL + '" alt="' + this.title + '" class="embed-responsive-item" style="object-fit: cover">';
				res += '</div>';
			} else if (this.imageHTML !== undefined) {
				res += this.imageHTML;
			} else if (this.imageScript !== undefined) {
				res += eval(this.imageScript);
			}
			res += '<div class="card-body px-0 pt-6 pb-4">';
			res += '<div class="card-subtitle mb-1"><a class="text-muted" href="' + this.sec.url + '">' + this.sec.title + '</a></div>';
			if (item.url !== undefined) {
				res += '<h6 class="card-title mb-2">' + this.title + '<a  href="' + this.url + '"' + (getHostName(this.url) === null ? '' : ' target="_blank"') + '><i class="fa ' + (getHostName(this.url) === null ? 'fa-arrow-right' : 'fa-external-link') + ' ml-2"></i></a></h6>';
			}
			res += '<p class="mb-1">' + this.lede + '</p>';
			res += '</div></div>';
			return res;
		}
	}
}

function createRelated(header, cards, orderidxs) {
	var brkColCls = "col-sm-6 col-md-3";
	var res = '<div id="featuredBrowse" class="container mb-5"><section class="pt-4"><h5>' + header + '</h5><div class="row">';
	var ordI = 0;
	var oi = shuffle(orderidxs.slice());
	for (var i = 0; i < cards.length && ordI < oi.length; i++) {
		var card = cards[i];
		res += '<div class="col-6 ' + brkColCls + " order-" + oi[ordI] + '">' + card.createCard() + '</div>';
		ordI++;
	}
	res += '</div></section></div>';
	return res;
}
