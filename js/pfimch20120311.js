function getRandomIdx(arr) {
	return Math.floor(Math.random() * arr.length);
}

function createSiteMap(siteMap) {
	return {
		sm: siteMap,
		findStory: function (url) {
			for (var i = 1; i < this.sm.length; i++) {
				var sec = sm[i];
				for (var j = 0; j < sec.sub.length; j++) {
					var itm = sec.sub[i];
					if (itm.url === url) {
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
			var pageSel = createPageSelector(this.miPageSet, this.mentioned, this.included);
			var merch = pageSel.selectMerch();
			var stories = pageSel.selectFeatures();
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
			var items = this.items.filter(i => keys.includes(i[this.itemkey]));
			var sample = this.sample.filter(i => keys.includes(i[this.itemkey]));
			var cum = 0;
			items.forEach(i => cum += i.weight);
			return createNUSampler(cum, items, sample, this.itemkey);
		}
	};
}

function createItemSampler(allkeys, weights, itemkey) {
	var items = [];
	var tot = 0;
	for (var i = 0; i < allkeys.length; i++) {
		var key = allkeys[i];
		var w = weights[key];
		var weight = (w !== undefined) ? w : 1;
		tot += weight;
		var item = {
			weight: weight
		};
		item[itemkey] = key;
		items.push(item);
	}
	return createNUSampler(tot, items, [], itemkey);
}

function createMerchandisingSampler(items) {
	var merchWeights = {
		AWTSHT1604Je: 10,
		NKSHMD1501PP: 10,
		FACEMK2005Ta: 10
	};
	return createItemSampler(items, merchWeights, 'SKU');
}

function createPageSelector(mips, wl, bl) {
	var merchSKUs = pfiavG.lineMerchSKUs.flat();
	return {
		miPageSet: mips,
		blacklist: bl,
		whitelist: wl,
		maxMerch: 2,
		merchSKUs: merchSKUs,
		merchSKUSampler: createMerchandisingSampler(merchSKUs),
		selFeature: function (secList) {
			var i = getRandomIdx(secList);
			var section = secList[i];

			var idx = getRandomIdx(section.sub);
			var sel = section.sub[idx];
			while (this.blacklist.includes(sel, 'url') || this.blacklist.includesImg(sel)) {
				idx = getRandomIdx(section.sub);
				sel = section.sub[idx];
			}
			return createStoryRef(section, sel);
		},
		selectFeatures: function () {
			var bg = [atelier, origin];
			var ab = [about, buzz, archives, lotm, moods, ramp, clients];
			return [this.selFeature(bg), this.selFeature(ab)];
		},
		findSection: function (sku) {
			var lineIdx = pfiavG.lineMerchSKUs.findIndex(skulist => skulist.includes(sku));
			return pfiavG.lineMerchSections[lineIdx];
		},
		filterMerchPages: function () {
			var blacklist = this.blacklist;
			return this.miPageSet.filter(function (page) {
				return !blacklist.includes(page, 'url') && !blacklist.includesImg(page);
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
				res.push(createMerchandisingRef(sel, this.findSection(sku)));
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
		res += '<p><span class="sc-item" data-field="price" data-vsku="' + sku + '"></span></p>'
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
		SKU: item.SKU,
		title: item.title,
		url: item.url,
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
			return createProductCard(this.SKU, this.title, this.url, this.imageURL, this.lede, true, section);
		}
	}
}

function createStoryRef(section, item) {
	return {
		sec: section,
		sel: item,
		title: item.title,
		url: item.url,
		imageURL: item.imageURL,
		imageHTML: item.imageHTML,
		imageScript: item.imageScript,
		lede: item.lede,
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
	orderidxs = shuffle(orderidxs);
	for (var i = 0; i < cards.length && ordI < orderidxs.length; i++) {
		var card = cards[i];
		res += '<div class="col-6 ' + brkColCls + " order-" + orderidxs[ordI] + '">' + card.createCard() + '</div>';
		ordI++;
	}
	res += '</div></section></div>';
	return res;
}
