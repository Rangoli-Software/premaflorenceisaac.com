const nkdtformatter = new Intl.DateTimeFormat('en-US', {
	month: 'long',
	year: 'numeric'
});

const moods = {
	title: "Stories",
	url: "/look.html?t=m",
	sub: [
		{
			title: "Pigmented Universe",
			url: "/products/happyeveryday/pigmenteduniverse.html",
			lede: "Happy Everyday in a Pigmented Universe",
			imageURL: "/products/happyeveryday/mood/hedm-04.jpg"
        },
		{
			title: "Summer Dreams",
			url: "/summerdreams.html",
			lede: "The first capsule in my <strong>Ce Soir</strong> line.",
			imageURL: "/products/summerdreams/Line.jpg"
        },
		{
			title: "Vagabond",
			url: "/vagabond.html",
			lede: "The <strong>Vagabond</strong>: A capsule in a bio-washed, hand-spun, hand-loomed khadi and P.F.I. tangail - inspired by the travelers and mavericks of the world.....",
			imageURL: "/products/vagabond/KohBoy.jpg"
        },
		{
			title: "Eco Boho",
			url: "/holydaysreboot.html",
			lede: "A multi-layered boho re-imagining of our classic one-of-a-kind line of sari-based <strong>Art Wear</strong>.",
			imageURL: "/products/holydaysreboot/KaftanS.jpg"
        },
		{
			title: "It's Magic!",
			url: "/itsmagic.html",
			lede: "The <strong>It's Magic</strong> capsule of colourful, <strong>reversible</strong> children's garments in 100% Voile de Cotton",
			imageURL: "/products/itsmagic/Balloon.jpg"
        }
    ]
};

const ramp = {
	title: "Ramp",
	url: "/look.html?t=r",
	sub: [
		{
			title: 'Balearic Boho',
			url: '/look/bc.html',
			lede: 'Boho chic on the Balearic island of Ibiza',
			imageURL: "/look/ramp/j201.jpg"
        },
		{
			title: 'Va-Va Voom',
			url: '/look/vvv.html',
			lede: 'Distinctive Designs in Treasured Textiles',
			imageURL: "/look/ramp/em.jpg"
        },
		{
			title: 'Move~in',
			url: '/look/wc.html',
			lede: 'Casual Looks featuring my Woven Canvas Ts',
			imageURL: "/look/ramp/wcw2.jpg"
        }
    ]
};

const lotm = {
	title: "Prema",
	url: "/look.html?t=p",
	sub: [
		{
			title: "Breezy Beach",
			url: "/look/bb.html",
			lede: 'A trio of recent designs',
			imageURL: "/look/prema/ss03.jpg"
        },
		{
			title: "Florence in Florence",
			url: "/blog/finf.html",
			lede: 'Notes from a short holiday in Florence.',
			imageURL: "/blog/FlorDuomo.jpg"
        },
		{
			title: "Tapestries!",
			url: "/tapestries/tapestries.html",
			lede: 'An artistic collaboration with Montreal photographer <strong>Jérémi Poulin</strong>',
			imageURL: "/tapestries/PremaShoot (JPEDD)-7385.jpg"
        },
		{
			lede: 'Off-shoulder knit top with one of my signature Art Wear skirts - The Naksha.',
			imageURL: "/g/look/nkshofstp.jpg"
        },
		{
			lede: 'New! Black &amp; Silver spandex creation with deep handwoven neckline.',
			imageURL: "/g/look/bwspndnew.jpg"
        },
		{
			lede: 'All set to trick-or-treat in Kitty Mask with hand-embroidered sequins, Peekaboo Top and Jeggings.',
			imageURL: "/g/look/Halloween.jpg"
        },
		{
			title: 'Look-of-the-Month',
			url: '/look/lotm.html',
			lede: 'How we started our impromptu Look-of-the-Moment series of images',
			imageURL: "/g/look/look01.jpg"
        }
    ]
};

const archives = {
	title: "Look Back",
	url: "/blog.html?t=l",
	sub: [
		{
			title: "Happy Everyday",
			url: "/blog/lb/hed.html",
			lede: 'Some interesting designs from early work on my Happy Everyday line.',
			imageURL: "/blog/lb/hed2.jpg"
        },
		{
			title: "Delta &amp; Naksha",
			url: "/blog/lb/dnn.html",
			lede: 'Older images of the Delta Dress and Naksha Scarf',
			imageURL: "/blog/lb/lb3.jpg"
        }
    ]
};

const origin = {
	title: "My Journey",
	url: "/blog.html?t=o",
	sub: [
		{
			title: "Prema's Story",
			url: "/journey/myjourney.html",
			lede: 'Over the years, I have told this story in bits and pieces to clients and friends, who kept asking why it was not on the website.....',
			imageURL: "/journey/PremaStory.jpg"
        },
		{
			title: "Auroville",
			url: "/journey/auroville.html",
			lede: 'Auroville is the center of my journey',
			imageURL: "/journey/GrowingUp.jpg"
        },
		{
			title: "Odissi 2 Salsa!",
			url: "/journey/salsa.html",
			lede: 'How my changing dance passions led me to fashion design',
			imageURL: "/journey/NakshaEvolution.jpg"
        },
		{
			title: "The Atelier",
			url: "/journey/atelier.html",
			lede: 'The history of my Rangoli Atelier',
			imageURL: "/journey/TeamYears.jpg"
        },
		{
			title: "Rang = Colour",
			url: "/journey/colour.html",
			lede: 'Rangoli is the expression of artistic vision through the joyful use of colour',
			imageURL: "/journey/LogoRangoli.jpg"
        },
		{
			title: "Tangail Traditions",
			url: "/journey/tangail.html",
			lede: 'My inspiration and signature fabric, originally created for the Moghul Emperors',
			imageURL: "/journey/Saris.jpg"
        },
		{
			title: "Treasure Trove",
			url: "/journey/treasuretrove.html",
			lede: 'How I wound up creating a treasure trove of vintage tangail borders',
			imageScript: "createWovenCanvasImage()"
        },
		{
			title: "Art Wear",
			url: "/journey/artwear.html",
			lede: 'The origin story of my one-of-a-kind Art Wear line',
			imageURL: "/g/aw/HDRKaftan1AW.jpg"
        },
		{
			title: "P.F.I. Tangail",
			url: "/journey/pfifabrics.html",
			lede: '<strong>A Bouquet of Borders!</strong> How and Why I created my own line of fabrics: <strong>P.F.I. Tangail</strong>',
			imageURL: "/journey/PreciousI.jpg"
        },
		{
			title: "Evolution",
			url: "/journey/evolution.html",
			lede: 'Influences on my evolution as an artist',
			imageURL: "/journey/EdExp.jpg"
        }
    ]
};

const atelier = {
	title: "Atelier Tales",
	url: "/blog.html?t=a",
	sub: [
		{
			title: "Jamdani Lace",
			url: "/blog/naksha2020.html",
			lede: "The Jamdani Lace Naksha Capsule",
			imageURL: "/products/artwear/skirts/mu/12.jpg"
        },
		{
			title: "Joy of Colour",
			url: "/blog/joyofcolour.html",
			lede: "Expression of artistic vision through the joyful use of colour",
			imageURL: "/blog/joyofcolour/f.jpg"
        },
		{
			title: "Vilnius Artists",
			url: "/blog/vilartists.html",
			lede: 'Visiting Vilnius  - Meeting some inspirational artists.',
			imageURL: "/blog/unda.jpg"
        },
		{
			title: "UNESCO Talk",
			url: "/blog/unesco.html",
			lede: 'Visiting Vilnius - My talk at the UNESCO hall.',
			imageURL: "/blog/utalk1.jpg"
        },
		{
			title: "The G-Spot!",
			url: "/blog/gspot.html",
			lede: 'Visiting Vilnius - The G-Spot of Europe.',
			imageURL: "/blog/oldtown.jpg"
        },
		{
			title: "Vignettes",
			url: "/atelier/vignettes.html",
			lede: 'Vignettes from in and around the Atelier',
			imageURL: "/atelier/sott.jpg"
        },
		{
			title: "Fashion Week",
			url: "/fw/fashionweek.html",
			lede: 'In September, I put together my first ever fashion show at <strong>Fashion Week Pondicherry!</strong>',
			imageURL: "/fw/finale.jpg"
        },
		{
			title: "Dream Team",
			url: "/atelier/dreamteam.html",
			lede: 'My work family - they are a big part of what makes my Rangoli Atelier tick!',
			imageURL: "/atelier/PFW.jpg"
        },
		{
			title: "Tangail Art",
			url: "/tangailcollage.html",
			lede: 'Some time ago, I started creating <strong>one-of-a-kind, numbered Woven Canvases</strong> using borders from my <strong>Treasure Trove</strong>...',
			imageURL: "/g/blog/CllgPrcSq.jpg"
        },
		{
			title: "Pranayama",
			url: "/atelier/pranayama.html",
			lede: 'We are sharing some pictures we recently received of the morning Pranayama sessions at the atelier.',
			imageURL: "/atelier/PranSq.jpg"
        },
		{
			title: "Kagera",
			url: "/products/ties/kagera.html",
			lede: 'Manifesting a designer Tie',
			imageURL: "/products/ties/Black.jpg"
        },
		{
			title: "KidinMi Launch",
			url: "/kidinmi.html",
			lede: 'After 10 years on the drawing boards, I am finally ready to launch my new kids label!! - <strong>KidinMi</strong>',
			imageURL: "/g/kimgphsimp.svg"
        }
    ]
};

const lookbook = {
	title: "Look Books",
	url: "/about.html?a=l&#about-tabs",
	sub: [
		{
			title: "Happy Everyday",
			url: "/products/happyeveryday/looks.html",
			lede: "Look Book for my Happy Everyday Line",
			imageURL: "/products/happyeveryday/blln/magenta-d1.jpg"
        },
    ]
}

const clients = {
	title: "Friends",
	url: "/look.html?t=f",
	sub: [
		{
			title: "#artwear",
			url: "/people/artwear.html",
			lede: "Images of friends wearing my signature Art Wear silhouettes",
			imageURL: "/look/friends/2.jpg"
        },
		{
			title: "Rainbow Girl",
			url: "/look/abbie.html",
			lede: "Collaborating with Abbie Stirrup",
			imageURL: "/look/friends/tt.jpg"
        },
		{
			title: "Gangsta Gal",
			url: "/look/gg.html",
			lede: "Fun with Face Masks",
			imageURL: "/look/friends/gg-aqua.jpg"
        },
		{
			title: "#oneofakind",
			url: "/people/oneofakind.html",
			lede: "The unique individuals who have collected my woven canvases",
			imageURL: "/people/ooak/sl02.jpg"
        },
		{
			title: "Curators",
			url: "/people/curators.html",
			lede: "A trio of curators that like my designs",
			imageURL: "/people/mmib.jpg"
        },
		{
			title: "Ibiza Living!",
			url: "/people/resortwear.html",
			lede: "At a beach resort on Ibiza",
			imageURL: "/people/ibgirl.jpg"
        },
		{
			title: "Birthday Boy",
			url: "/blog/bdayboy.html",
			lede: "The story of my meeting with a group of Israeli artists.",
			imageURL: "/blog/nir03.jpg"
        }
    ]
};

const about = {
	title: "About",
	url: "/about.html",
	sub: [
		{
			title: "Essence",
			url: '/essence.html',
			lede: 'The Essence of my Way',
			imageURL: '/g/premabydinh.jpg'
        },
		{
			title: "Inspiration",
			url: '/beauty.html',
			lede: 'The Beauty of the Tangail Handloom Tradition',
			imageURL: '/g/w/IMG_0093.jpg'
        },
		{
			title: "Visit",
			url: '/visitus.html',
			lede: 'How to visit our locations',
			imageURL: '/atelier/mib.jpg'
        }
    ]
};

const buzzTL = {
	title: "Buzzing...",
	url: "/about.html?a=b&#about-tabs",
	sub: []
};

const buzz = {
	title: "Buzzing...",
	url: "/about.html?a=b&#about-tabs",
	lede: 'Media coverage, both traditional and new.',
	sub: [
		{
			title: "Voice of Fashion",
			url: "https://thevoiceoffashion.com/fabric-of-india/the-south-india-edit/tangail-territory-in-auroville-2849",
			lede: 'A really well-written article and accompanying video by The Voice of Fashion',
			imageHTML: '<iframe class="embed-responsive-item" title="vimeo-player"  src="https://player.vimeo.com/video/349628022" frameborder="0" allowfullscreen></iframe>'
        },
		{
			title: "Yves Richez",
			url: "https://www.talentreveal.com/blog/rencontre-avec-prema-florence-isaac-creatrice-et-entrepreneuse-solidaire-en-inde",
			lede: 'Presenting a short documentary (in French) created by the delightful <a href="https://www.facebook.com/richez.yves">Yves Richez</a>, who visited the atelier a while ago. Scholar, writer and teacher par-excellence, Yves is committed to finding and developing human potential all around him. During his short visit, he taught me how to start creating my own videos. His presence is inspirational!</p><p>We are still trying to decide if he looks more like Richard Gere or Aidan Gillen :-)',
			imageHTML: '<iframe class="embed-responsive-item" src="https://www.youtube.com/embed/UD5KhbKHvCI?start=5" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
        },
		{
			title: "Alia ૐ",
			url: "https://aliaom.com/alia-yoga-prema-design-auroville/",
			lede: "Check out the blog article of Alia M'Hamdi, women's yoga teacher, about our meeting and her visit to the atelier.",
			imageURL: "https://aliaom.com/wp-content/uploads/2017/03/Alia-@-The-Pink-Temple-Auroville-India.jpg"
        },
		{
			title: "Lila",
			url: "https://lila.lt/en/2018/12/prema-florence-isaac-at-first-i-look-within/",
			lede: 'Here is the first part of a story in Lila Magazine. I was interviewed by the wonderful journalist Ginta Gaivenyte.',
			imageURL: "https://lila.lt/wp-content/uploads/sites/10/2018/07/lila_logo_sviesa.png"
        },
		{
			title: "Auroville.com",
			url: "https://www.auroville.com/blog/post/meet-auroville:-prema-from-rangoli",
			lede: 'I was interviewed by Taranti for this nice article on the blog of the  Auroville Online Store.',
			imageHTML: '<figure><img src="/g/premabydinh.jpg" class="img-fluid center-block"><figcaption><small>Image: Dinh Thi Thien</small></figcaption></figure>'
        },
		{
			title: "Erika Lernot",
			url: "http://www.lesvoyagesderika.fr/mon-look-reves-de-cuba-by-rangoli/",
			lede: '<strong>Mon look - Reves de Cuba</strong> - a blog by Erika Lernot, singer and traveler, who modeled our <a href="summerdreams.html">A Midsummer Nights Dream</a> Mood.',
			imageURL: "https://i1.wp.com/www.lesvoyagesderika.fr/wp-content/uploads/2015/11/Erika-tet-mare-.jpg?zoom=2&resize=666%2C352"
        },
		{
			title: "The Hindu",
			url: "https://www.thehindu.com/features/metroplus/fashion/Ethically-swish/article16881597.ece",
			lede: '<strong>Ethically Swish</strong> - a story about Prema in The Hindu',
			imageURL: "https://www.thehindu.com/migration_catalog/article16861703.ece/ALTERNATES/FREE_660/MP16_RANGOLI.JPG"
        }
    ]
};

const shop = {
	title: "Shop",
	url: "/shop.html",
	sub: [
		{
			title: "Woven Canvas",
			url: "/products/wovencanvas/shop.html"
        },
		{
			title: "Art Wear",
			url: "/products/artwear/shop.html"
        },
		{
			title: "It's Magic",
			url: "/products/itsmagic/shop.html"
        },
		{
			title: "Ce Soir",
			url: "/products/night/shop.html"
        },
		{
			title: "Vagabond",
			url: "/products/men/shop.html"
        },
		{
			title: "Happy Everyday",
			url: "/products/happyeveryday/shop.html"
        },
		{
			title: "Extras",
			url: "/products/xtras/shop.html"
        }
    ]
};

const faqs = {
	title: "Shop FAQ",
	url: "/shopfaq.html",
	sub: [
    ]
};


const siteMap = [
	{
		sub: [
			{
				title: "Blog",
				url: "/blog.html"
            },
			{
				title: "About Us",
				url: "/about.html"
            },
			{
				title: "Look",
				url: "/look.html"
            },
			{
				title: "Shop",
				url: "/shop.html"
            }
        ]
    },
    origin,
    atelier,
    clients,
    lookbook,
    about,
    buzz,
    moods,
    ramp,
    archives,
    lotm,
    shop
];

function getSubEntry(item, url) {
	for (var i = 0; i < item.sub.length; i++) {
		var entry = item.sub[i];
		if (entry.url == url) {
			return entry;
		}
	}
	return null;
}

function getHostName(url) {
	var match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
	if (match !== null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
		return match[2];
	} else {
		return null;
	}
}

function getUrlVars() {
	var vars = {};
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
		vars[key] = value;
	});
	return vars;
}

function replaceQueryParam(param, newval, search) {
	var regex = new RegExp("([?;&])" + param + "[^&;]*[;&]?");
	var query = search.replace(regex, "$1").replace(/&$/, '');

	return (query.length > 2 ? query + "&" : "?") + (newval ? param + "=" + newval : '');
}

function modifyUrl(nm, val) {
	var strOld = window.location.search;
	var strNew = replaceQueryParam(nm, val, strOld);
	if (window.history.replaceState) {
		window.history.replaceState({}, null, strNew);
	} else {
		window.location.assign(strNew);
	}
}

function createSqPanelImageList(panelNumArr) {
	var res = [];
	for (var i = 0; i < panelNumArr.length; i++) {
		res.push({
			imageURL: "/tbc/sqIC/IC" + panelNumArr[i] + ".jpg"
		});
	}
	return res;
}

function createWovenCanvasImage() {
	var panelNums = [545, 548, 549, 552, 565, 571];
	var panelImgs = createSqPanelImageList(panelNums);
	var len = panelImgs.length;
	var rndI = Math.floor(Math.random() * len);
	var itm = panelImgs[rndI];
	return '<img class="d-block img-fluid" src="' + itm.imageURL + '" alt="Woven Canvas #' + panelNums[rndI] + '">';
}

function createBreadCrumb(location) {
	var res = '<nav class="py-2"><div class="container"><div class="row"><div class="col-12">';
	res += createBreadCrumbContents(location);
	res += '</div></div></div></nav>';
	return res;
}

function createBreadCrumbContents(location) {
	var path = location;
	for (var i = 0; i < siteMap.length; i++) {
		var level1 = siteMap[i];
		if (level1)
			for (var j = 0; j < level1.sub.length; j++) {
				var level2 = level1.sub[j];
				if (level2.url === path) {
					return createBreadCrumbLevels([level1, level2]);
				}
			}
	}
	return createBreadCrumbLevels();
}

function createBreadCrumbLevels(levels) {
	var res = '<ol class="breadcrumb mb-0 font-size-xs text-gray-400">';
	if (levels !== undefined && levels !== null) {
		if ( levels[0].title !== 'Shop') {
			res += '<li class="breadcrumb-item"><a class="text-gray-400" href="/index.html">Home</a></li>';
		}
		for (var i = 0; i < levels.length - 1; i++) {
			var level = levels[i];
			if (level.title !== undefined) {
				res += '<li class="breadcrumb-item"><a class="text-gray-400" href="' + level.url + '">' + level.title + '</a></li>';
			}
		}
		res += '<li class="breadcrumb-item active">' + levels[levels.length - 1].title + '</a></li>';
	}
	res += '</ol>';
	return res;
}

function createItemUrl(item, cls) {
	var res = "";
	if (item.url !== undefined) {
		if (getHostName(item.url) === null) {
			res += '<a href="' + item.url + '"' + (cls === null ? '' : ' class="' + cls + '"') + '>';
		} else {
			res += '<a href="' + item.url + '" target="_blank' + (cls === null ? '' : ' class="' + cls + '"') + '">';
		}
	}
	res += item.title;
	if (item.url !== undefined) {
		if (getHostName(item.url) === null) {
			res += '</a>';
		} else {
			res += '<i class="fa fa-external-link-alt"></i></a>';
		}
	}
	return res;
}

function createDDList(items) {
	var res = '<ul class="list-styled mb-3 font-size-sm">';
	for (var i = 0; i < items.length; i++) {
		var item = items[i];
		if (item.title === undefined) {
			continue;
		}
		res += '<li class="list-styled-item mt-2">' + createItemUrl(item, "list-styled-link") + '</li>';
	}
	res += '</ul>';
	return res;
}

function createDDColumn(itemLists, colCls) {
	var res = '<div class="py-3 ' + colCls + '">';
	for (var i = 0; i < itemLists.length; i++) {
		var item = itemLists[i];
		if (item.title === undefined) {
			continue;
		}
		res += '<div class="' + (i === 0 ? "mb-3" : "my-3") + ' font-weight-bold">';
		res += createItemUrl(item);
		res += '</div>';
		res += createDDList(item.sub);
	}
	res += '</div>';
	return res;
}

function createDDContents(cols) {
	var res = '<div class="row no-gutters">';
	for (var i = 0; i < cols.length; i++) {
		res += cols[i];
	}
	res += '</div>';
	return res;
}

function createDDMenu(id, alignRight, width, contents) {
	return '<div class="mw-100 m-3 px-3 dropdown-menu' + (alignRight ? " dropdown-menu-right" : "") + '" id="' + id + '" style="min-width: ' + width + ';">'+ contents + '</div>';
}

function createShopMenuHTML() {
	var col = createDDColumn([shop, faqs], "col-12");
	return createDDContents([col]);
}

function createLookMenuHTML() {
	var col1 = createDDColumn([lotm, moods], "col-7");
	var col2 = createDDColumn([clients, ramp], "col-5");
	return createDDContents([col1, col2]);
}

function createBlogMenuHTML() {
	var col1 = createDDColumn([atelier], "col-6");
	var col2 = createDDColumn([origin, archives], "col-6");
	return createDDContents([col1, col2]);
}

function createAboutMenuHTML() {
	var col1 = createDDColumn([about, buzzTL, lookbook], "col-12");
	return createDDContents([col1]);
}

function createStyledList(jsonArray) {
	var res = '<ul class="list-styled mb-6 font-size-sm">';
	for (var i = 0; i < jsonArray.length; i++) {
		var item = jsonArray[i];
		if (item.title === undefined) {
			continue;
		}
		res += '<li class="list-styled-item">' + createItemUrl(item, "list-styled-link") + '</li>';
	}
	res += '</ul>';
	return res;
}

function createDropdownColumn(itemLists, colCls) {
	var res = '<div class="' + colCls + '">';
	for (var i = 0; i < itemLists.length; i++) {
		var item = itemLists[i];
		if (item.title === undefined) {
			continue;
		}
		res += '<div class="' + (i === 0 ? "mb-5" : "my-5") + ' font-weight-bold">';
		res += createItemUrl(item, null);
		res += '</div>';
		res += createStyledList(item.sub);
	}
	res += '</div>';
	return res;
}

function createDropdownCard(cols) {
	var res = '<div class="card"><div class="card-body"><div class="row">';
	for (var i = 0; i < cols.length; i++) {
		res += cols[i];
	}
	res += '</div></div></div>';
	return res;
}

function createMinWidthWithContents(html, width, alignRight) {
	var res = '<div class="dropdown-menu' + (alignRight ? " dropdown-menu-right" : "") + '" style="min-width: ' + width + ';">';
	res += html;
	res += '</div>';
	return res;
}

function createLookDDContents() {
	var col1 = createDropdownColumn([lotm, moods], "col-6");
	var col2 = createDropdownColumn([clients, ramp], "col-6");
	return createDropdownCard([col1, col2]);
}

function createBlogDDContents() {
	var col1 = createDropdownColumn([atelier], "col-6");
	var col2 = createDropdownColumn([origin, archives], "col-6");
	return createDropdownCard([col1, col2]);
}

function createAboutDDContents() {
	var col1 = createDropdownColumn([about, buzzTL, lookbook], "col-12");
	return createDropdownCard([col1]);
}

function createShopDDContents() {
	var col1 = createDropdownColumn([shop, faqs], "col-12");
	return createDropdownCard([col1]);
}

function createMerchColumn(colCls) {
	var res = '<div class="py-3 ' + colCls + '">';
	res += pfiavG.pageIdx.createShopCard();
	res += '</div>';
	return res;
}

function createMerchShopMenuHTML() {
	var col = createDDColumn([shop, faqs], "col-5");
	var mch = createMerchColumn("col-7");
	return createDDContents([col, mch]);
}

function updateTopLevelMenus() {
	$('#tlShopMnu').replaceWith(createDDMenu('#tlShopMnu', false, "360px", createMerchShopMenuHTML()));
}

function createShopMM() {
	return createDDMenu("tlShopMnu", false, "150px", createShopMenuHTML());
}

function createLookMM() {
	return createDDMenu("tlLookMnu", true, "295px", createLookMenuHTML());
}

function createBlogDD() {
	return createDDMenu("tlBlogMnu", true, "295px", createBlogMenuHTML());
//	return createMinWidthWithContents(createBlogDDContents(), "320px", true);
}

function createAboutDD() {
	return createDDMenu("tlAboutMnu", true, "140px", createAboutMenuHTML());
//	return createMinWidthWithContents(createAboutDDContents(), "145px", true);
}

function createTopNav() {
	var res = '<ul class="nav nav-justified py-0">';

	res += '<li class="nav-item dropdown"><a class="nav-link" data-toggle="dropdown" href="#">Shop</a>';
	res += createShopMM();
	res += '</li>';

	res += '<li class="nav-item dropdown"><a class="nav-link" data-toggle="dropdown" href="#">Look</a>'
	res += createLookMM();
	res += '</li>';

	res += '<li class="nav-item dropdown"><a class="nav-link" data-toggle="dropdown" href="#">Blog</a>';
	res += createBlogDD();
	res += '</li>';

	res += '<li class="nav-item dropdown"><a class="nav-link" data-toggle="dropdown" href="#">About</a>';
	res += createAboutDD();
	res += '</li>';

	res += '</ul>';
	return res;
}

function getPriceStringHTML(shop, product, vid) {
	var priceString = shop.getPriceHTML(product);
	var varPL = varPLData[product.sku];
	if (vid === undefined) {
		if (varPL !== undefined) {
			var mn = product.inrPrice;
			var mx = product.inrPrice;
			Object.keys(varPL).forEach(function (k, i) {
				var v = varPL[k];
				mn = Math.min(mn, v);
				mx = Math.max(mx, v);
			});
			priceString = shop.getFXPriceHTML(mn) + " - " + shop.getFXPriceHTML(mx);
		}
		return priceString;
	} else {
		var prV = varPL[vid];
		if (prV !== undefined) {
			return shop.getFXPriceHTML(prV);
		} else {
			return priceString;
		}
	}
}

function pfisig() {
	return '<strong>Prema Florence Isaac</strong>';
}

function getTabItem(title, id, isActive) {
	return '<li class="nav-item"><a class="nav-link' +
		(isActive ? ' active' : '') + '"  data-toggle="tab" href="#' + id + '" role="tab">' + title + '</a></li>';
}

function getTabContent(content, id, isActive) {
	return '<div class="tab-pane fade' + (isActive ? " show active" : "") +
		'" id="' + id + '" role="tabpanel">' +
		content +
		'</div>';
}

function createURLModifer(paramName, defaultCode) {
	return {
		paramName: paramName,
		defaultCode: defaultCode,
		getCodeOrDefault: function () {
			var c = this.getCode();
			if (c === undefined) {
				c = this.defaultCode;
			}
			return c;
		},
		getCode: function () {
			return getUrlVars()[this.paramName];
		},
		updateURL: function (c) {
			var oldC = this.getCode();
			if (oldC !== c) {
				modifyUrl(this.paramName, c);
			}
		}
	}
}

function createUrlVarSelector(titles, ids, vals, key, defaultVal) {
	return {
		titles: titles,
		ids: ids,
		vals: vals,
		key: key,
		defaultVal: defaultVal,
		length: ids.length,
		hasChoices: function () {
			return this.ids.length > 1;
		},
		toId: function (val) {
			var i = this.vals.indexOf(val);
			return this.ids[i];
		},
		toVal(id) {
			var i = this.ids.indexOf(id);
			return this.vals[i];
		},
		updateURL: function (oldId, newId) {
			if (oldId !== newId) {
				modifyUrl(this.key, this.toVal(newId));
			}
		},
		getURLValue: function () {
			return getUrlVars()[this.key];
		},
		isActive: function (i) {
			var v = this.getURLValue();
			var isActive = (v === this.vals[i]);
			return isActive || (this.vals[i] === this.defaultVal ? v === undefined : false);
		}
	}
}

function createTabber(uvSel, cardlists) {
	return {
		uvSel: uvSel,
		cardlists: cardlists,
		createTabbedSection: function () {
			if (this.uvSel.hasChoices()) {
				return '<ul class="nav nav-tabs nav-justified">' +
					this.createTabStrip() +
					'</ul><div class="tab-content">' +
					this.createTabContents() +
					'</div>';
			} else {
				return this.cardlists[0].createHTML();
			}
		},
		createTabStrip: function () {
			var res = "";
			for (var i = 0; i < this.uvSel.length; i++) {
				var isActive = this.uvSel.isActive(i);
				res += getTabItem(this.uvSel.titles[i], this.uvSel.ids[i], isActive);
			}
			return res;
		},
		createTabContents: function () {
			var res = "";
			for (var i = 0; i < this.uvSel.ids.length; i++) {
				var isActive = this.uvSel.isActive(i);
				res += getTabContent(this.cardlists[i].createHTML(), this.uvSel.ids[i], isActive);
			}
			return res;
		},
		enableDocumentReady: function () {
			var that = this;
			$(document).ready(function () {
				$("a[data-toggle=\"tab\"]").on('shown.bs.tab', function (e) {
					var newId = $(e.target).attr("href").slice(1);
					var oldId = $(e.relatedTarget).attr("href").slice(1);
					that.uvSel.updateURL(oldId, newId);
				})
			});
		}
	};
}

function shuffle(array) {
	var currentIndex = array.length;
	while (0 !== currentIndex) {
		var randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		var temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	return array;
}

function createCarousel(carId, carItems) {
	var id = "carousel-" + carId;
	var res = '<div id="' + id + '" class="carousel slide" data-ride="carousel" data-interval="2500"><ol class="carousel-indicators">';
	for (var i = 0; i < carItems.length; i++) {
		res += '<li data-target="#' + id + '" data-slide-to="' + i + '"' + (i === 0 ? '" class="active"' : '') + '></li>';
	}
	res += '</ol><div class="carousel-inner">';
	for (i = 0; i < carItems.length; i++) {
		var itm = carItems[i];
		res += '<div class="carousel-item' + (i === 0 ? ' active' : '') + '">' +
			'<img class="d-block img-fluid" src="' + itm.imageURL + '"' + (itm.width !== undefined ? 'width="' + itm.width + '"' : "") +
			(itm.height !== undefined ? 'height="' + itm.height + '"' : "") + '>' +
			'</div>';
	}
	res += '</div>\
<a class="carousel-control-prev" href="#' + id + '" role="button" data-slide="prev">\
<span class="carousel-control-prev-icon" aria-hidden="true"></span>\
<span class="sr-only">Previous</span>\
</a>\
<a class="carousel-control-next" href="#' + id + '" role="button" data-slide="next">\
<span class="carousel-control-next-icon" aria-hidden="true"></span>\
<span class="sr-only">Next</span>\
</a>\
</div>';
	return res;
}

function gaFunnel(funnel) {
	if (funnel === "Lead") {
		return "generate_lead";
	} else if (funnel === "ViewContent") {
		return "view_item";
	} else {
		return "page_view";
	}
}

function fbFunnel(funnel) {
	if (funnel === "Lead" || funnel === "ViewContent") {
		return funnel;
	} else {
		return "PageView";
	}
}

function gaInit(gaCode, eventType) {
	var ret = '<scr' + 'ipt>\
window.dataLayer = window.dataLayer || [];\
function gtag(){dataLayer.push(arguments);}\
gtag("js", new Date());\
gtag("config", "' + gaCode + '");\
gtag("config", "AW-861963921");';
	if (eventType != "page_view") {
		ret += 'gtag("event", "' + eventType + '");';
	}
	ret += '</scr' + 'ipt>';
	return ret;
}

function fbInit(fbpCode, eventType) {
	var ret = '<sc' + 'ript>\
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?\
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;\
n.push=n;n.loaded=!0;n.version="2.0";n.queue=[];t=b.createElement(e);t.async=!0;\
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,\
document,"script","//connect.facebook.net/en_US/fbevents.js");\
fbq("init","' + fbpCode + '");fbq("track","PageView");';
	if (eventType != "PageView") {
		ret += 'fbq("track", "' + eventType + '");';
	}
	ret += '</scr' + 'ipt>';
	return ret;
}

function shareInit() {
	return fbShareInit() + twitterShareInit();
}

function fbShareInit() {
	return '<div id="fb-root"></div>\
<sc' + 'ript>(function(d, s, id) {\
var js, fjs = d.getElementsByTagName(s)[0];\
if (d.getElementById(id)) return;\
js = d.createElement(s); js.id = id;\
js.src = "https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.12";\
fjs.parentNode.insertBefore(js, fjs);\
}(document, "sc' + 'ript", "facebook-jssdk"));</sc' + 'ript>';
}

function twitterShareInit() {
	return '<sc' + 'ript>window.twttr = (function(d, s, id) {\
var js, fjs = d.getElementsByTagName(s)[0],\
t = window.twttr || {};\
if (d.getElementById(id)) return t;\
js = d.createElement(s);\
js.id = id;\
js.src = "https://platform.twitter.com/widgets.js";\
fjs.parentNode.insertBefore(js, fjs);\
t._e = [];\
t.ready = function(f) {\
t._e.push(f);\
};\
return t;\
}(document, "sc' + 'ript", "twitter-wjs"));</sc' + 'ript>';
}

function pfiTopMenu(location) {
	return shareInit() +
		'<div class="rwell text-center">\
<strong>✂️ Atelier creations from📍 Auroville 🇮🇳</strong>\
</div>' + '<div class="container p-0">' + '<div class="text-center px-3 pt-3 pb-2"><a href="/index.html"><img src="/g/pfilogo2002.svg" alt="Prema Florence Isaac" class="img-fluid" width="1000px" height="71.5px"></a></div>' +
		createTopNav() + '</div>' + createBreadCrumb(location);
}

function kimTopMenu(location) {
	return shareInit() +
		'<div class="rwell text-center">\
<strong>✂️ Atelier creations from📍 Auroville 🇮🇳</strong></div>' + '<div class="container p-0">' +
		'<div class="item text-center px-3 pt-3 pb-2"><a href="/kidinmi.html"><img src="/g/kimlogo.svg" alt="KidInMi" class="img-fluid" width="300px" height="139.14px"></a></div>' +
		createTopNav() + '</div>' + createBreadCrumb(location);
}

function creatFBShareBtn(location) {
	var fullPath = location;
	return '<div class="fb-share-button" data-href="' +
		fullPath +
		'" data-layout="button" data-size="large" data-mobile-iframe="true"><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=' +
		encodeURI(fullPath) +
		'&amp;src=sdkpreparse" class="fb-xfbml-parse-ignore">Share</a></div>';
}

function creatTweetBtn(location) {
	var fullPath = location;
	return '<a class="twitter-share-button" href="https://twitter.com/intent/tweet?url=' + encodeURI(fullPath) + '" data-size="large">Tweet</a>';
}

function createINBtn(location) {
	return '<script src="https://platform.linkedin.com/in.js" type="text/javascript">lang: en_US</script><script type="IN/Share" data-url="' + location + '"></script>';
}

function createMCSignup() {
	return '<center><div class="form-group">\
<form action="https://premaflorenceisaac.us12.list-manage.com/subscribe/post?u=66ac2e4e6cda6ea157ef47afd&amp;id=0c8cc89a5b" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" target="_blank" novalidate>\
<input type="email" value="Your EMail Address" name="EMAIL" class="required email">\
<input type="submit" value="Sign Up" name="subscribe" class="button">\
<div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_66ac2e4e6cda6ea157ef47afd_0c8cc89a5b" tabindex="-1" value=""></div>\
</form></div></center>';
}

function createShareBar(location) {
	return '<div class="container mb-5"><p>If you like this page, please help us spread the word by sharing 🙏🏾 ❤️</p><div style="display: flex; justify-content: space-between;">' +
		'<span>' +
		creatFBShareBtn(location) +
		'</span>' +
		'<span>' +
		'<a data-pin-do="buttonBookmark" data-pin-tall="true" data-pin-round="true" href="https://www.pinterest.com/pin/create/button/"><img src="//assets.pinterest.com/images/pidgets/pinit_fg_en_round_red_32.png"/>Save</a>' +
		'</span>' +
		'<span>' +
		creatTweetBtn(location) +
		'</span>' +
		'<span>' +
		createINBtn(location) +
		'</span>' +
		'</div></div>';
}

function botNav(botImgTag, location) {
	return createShareBar(location) +
		'<div class="rwell">\
<p class="text-center"><strong>Light . Beauty . Freedom</strong></p>\
</div>\
<div class="container">\
<div class="pb-2"><center><div class="row">\
<div class="col-sm-6">\
Instagram <i class="fa fa-instagram"></i>: <a href="https://www.instagram.com/_prema.florence.isaac_/">@_prema.florence.isaac_</a><br>\
Facebook <i class="fa fa-facebook-square"></i>: <a href="https://www.facebook.com/rangolibyprema">@rangolibyprema</a><br>\
WhatsApp <i class="fa fa-whatsapp"></i>: <a href="https://wa.me/919443362528?text=Website%20Enquiry">+919443362528</a><br>\
Mail <i class="fa fa-envelope-o"></i>: <a href="mailto:premaflorenceisaac@gmail.com">prema.florence.isaac@gmail.com</a><br>\
Phone <i class="fa fa-phone"></i>: <a href="tel:+919443362528">+919443362528</a>\
</div>\
<div class="col-sm-6">\
Visit <i class="fa fa-map-marker"></i>: <a href="https://goo.gl/maps/rszKWi3P7xM2">Rangoli Atelier<br>Aurosarjan Complex<br>Auroshilpam<br>Auroville 605101<br>Tamil Nadu, India</a>\
</div>\
</div></center></div>\
<center>Sign up for our (few-times-a-year) newsletter.<br>' + createMCSignup() + '</center>\
<p class="text-center">' +
		botImgTag +
		'</p>\
<p class="text-right">&copy; 2015 - 2020 Prema Florence Isaac</p>\
</div>';
}

function kimBotMenu(location) {
	return botNav('<img src="/g/kimgphsimp.svg" alt="KidinMi Graphic" class="img-fluid center-block" width="150px" height="300px">', location);
}

function botMenu(location) {
	return botNav('<img src="/g/since199900.svg" alt="Rangoli Graphic" class="img-fluid center-block" width="150px" height="300px">', location);
}

function scriptSrcs() {
	return '\
<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">\
<script async defer src="//assets.pinterest.com/js/pinit.js"></script>\
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>\
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script><script type="text/javascript" src="https://www.paypalobjects.com/api/checkout.js"></script>\
';
}

function getShopTop() {
	return '<div class="modal fade" id="shopping-cart" tabindex="-1" role="dialog" aria-labelledby="shoppingCartTitle" aria-hidden="true"><div class="modal-dialog modal-dialog-centered" role="document"><div class="modal-content"><div class="modal-header"><div class="modal-title" id="shoppingCartTitle"><div class="row p-1 text-left"> <strong>Your Shopping Cart</strong> </div></div><button type="button" class="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">&times;</span> </button></div><div class="modal-body"><div class="item p-1 text-left"> <strong><span>Total: <span class="sc-currency-string"><i class="fa fa-inr"> </i></span> <span class="sc-total">0</span></span></strong><br><span>Subtotal: <span class="sc-currency-string"><i class="fa fa-inr"> </i></span> <span class="sc-subtotal">0</span></span><br><span>Shipping: <span class="sc-currency-string"><i class="fa fa-inr"></i></span> <span class="sc-shipping">0</span></span> </div><div class="item sc-item-list"> </div><div class="row p-1" style="background-color: white; color: black"><div class="col align-self-center"><span></span></div></div></div><div class="modal-footer"> <button class="btn btn-secondary btn-sm sc-save-changes float-left" type="button">Save Cart</button> <button class="btn btn-warning btn-sm sc-finalize float-right" type="button">Proceed to Buy</button> </div></div></div></div><div class="modal fade" id="finalize-form" tabindex="-1" role="dialog" aria-labelledby="finalizeFormTitle" aria-hidden="true"><div class="modal-dialog modal-dialog-centered" role="document"><div class="modal-content"><div class="modal-header"><div class="modal-title" id="finalizeFormTitle"><p><strong>Finalize Order</strong></p></div><button type="button" class="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">&times;</span> </button></div><div class="modal-body"><div class="row p-1"><div class="col-12"><small><strong><span>Total: <span class="sc-currency-string"><i class="fa fa-inr"></i></span> <span class="sc-total">0</span></span></strong><br><span>Subtotal: <span class="sc-currency-string"><i class="fa fa-inr"> </i></span> <span class="sc-subtotal">0</span></span><br><span class="sc-discount-display"><span>Discount: <span class="sc-currency-string"><i class="fa fa-inr"></i></span> <span class="sc-discount">0</span></span><br></span><span>Shipping: <span class="sc-currency-string"><i class="fa fa-inr"></i></span> <span class="sc-shipping">0</span></span></small></div></div><div id="form-group" class="row p-1" style="background-color: white; color: black"><div class="col text-center"><div class="form-check form-check-inline"> <input class="form-check-input" id="sc-ship-to-india" type="checkbox" value=""> <label class="form-check-label" for="sc-ship-to-india">Ship to India</label> </div><div class="form-check form-check-inline"> <input class="form-check-input" id="sc-ship-express" type="checkbox" value=""> <label class="form-check-label" for="sc-ship-express">Express Shipping</label> </div></div></div><div class="row p-1"><div class="col text-center"><small><button id="btnOffer" class="btn btn-outline btn-sm dropdown-toggle" type="button" data-target="#promoForm" data-toggle="collapse" aria-haspopup="true" aria-expanded="false">Add Gift Card or Promo Code</button><form class="collapse" id="promoForm"><div class="form-group sc-code-group"><div class="input-group"><input type="text" class="form-control" id="sc-offer-code" placeholder="Enter Code" aria-describedby="codeHelpBlock"><div class="input-group-append"><button class="btn btn-secondary sc-apply-code" type="button">Apply</button></div></div><small id="codeHelpBlock" class="form-text text-muted"></small></div></form></small></div></div></div><div class="modal-footer"><button class="btn btn-warning btn-sm sc-checkout float-right" type="button">Checkout</button></div></div></div></div><div class="modal fade" id="checkout-form" tabindex="-1" role="dialog" aria-labelledby="checkoutFormTitle" aria-hidden="true"><div class="modal-dialog modal-dialog-centered" role="document"><div class="modal-content"><div class="modal-header"><div class="modal-title" id="checkoutFormTitle"><p><strong>Checkout with Paypal<span class="align-top">*</span></strong></p></div><button type="button" class="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">&times;</span> </button></div><div class="modal-body"><div class="row p-1"><div class="col-12"><p class="float-left"><strong><span>Order Total: <span class="sc-currency-string"><i class="fa fa-inr"></i></span> <span class="sc-total">0</span></span></strong></p><div id="sc-paypal-btn" class="float-right"></div></div></div><div class="item sc-item-list"> </div></div><div class="modal-footer sc-checkout-btn"><div><p><span class="align-top">*</span><small>To maximize the security of your data, we do not collect your personal details on our website. When you complete your secure payment through PayPal, we receive your contact information and shipping address from them.</small></p></div></div></div></div></div><div class="modal fade" id="paypal-return" tabindex="-1" role="dialog" aria-hidden="true"><div class="modal-dialog modal-dialog-centered" role="document"><div class="modal-content"><div class="modal-header"><div class="modal-title pptitle"></div><button type="button" class="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">&times;</span> </button></div><div class="modal-body"><p class="ppmessage"></p></div></div></div></div>';
}

function getShopHeader() {
	return '<div class="container"> <div class="row py-1"> <div class="col-12"><div id="currencies" class="text-left float-left" style="font-size: 12px"><span data-currency="INR" id="currencies-inr">INR(&#8377;)</span><span data-currency="GBP" id="currencies-gbp">GBP(&pound;)</span> <span data-currency="EUR" id="currencies-eur">EUR(&euro;)</span> <span data-currency="USD" id="currencies-usd">USD(&dollar;)</span></div><div id="shop-cart-summary" class="text-right float-right" style="font-size: 12px"> <a id="sc-edit-id" class="disabled" aria-disabled="true" type="button" data-toggle="modal" data-target="#shopping-cart"> <i class="fa fa-shopping-cart"></i> (<span class="sc-badge-items">0</span>) <span class="sc-non-empty" style="display:none"> - </span> <span class="sc-currency-string sc-non-empty" style="display:none"><i class="fa fa-inr"></i></span> <span class="sc-total sc-non-empty" style="display:none">0</span> </a> <div class="item sc-item-list" style="display: none"> </div></div></div></div></div>';
}

function createSizeRadio(name, idPfx, val, i, checked) {
	return '<div class="custom-control custom-control-inline custom-control-size mb-2"><input type="radio" class="custom-control-input" name="' + name + '" id="' + idPfx + i + '" value="' + val + '"' + (checked ? 'checked="checked" ' : '') + ' onclick="onSelectionChange()"><label class="custom-control-label" for="' + idPfx + i + '">' + val + '</label></div>';
}

function createSizeModalToggle(id, cap) {
	var caption = (cap === undefined || cap === null) ? 'Size chart' : cap;
	return '<a class="ml-3" data-toggle="modal" href="#' + id + '">' + caption + '</a>';
}

function createSizeOptions(radName, label, vals, selIdx, toggleHTML) {
	var id = radName + "Group";
	var res = '<div class="form-group"><label for="' + id + '">' + label + ':</label> <span id="' + id + '" class="mb-2">';
	var idPfx = radName + "ID";
	for (var i = 0; i < vals.length; i++) {
		res += createSizeRadio(radName, idPfx, vals[i], i, (i == selIdx));
	}
	res += '</span>' + toggleHTML + '</div>';
	return res;
}

function getShippingInfoUL(points) {
	var res = '<ul>';
	for (var i = 0; i < points.length; i++) {
		res += '<li>' + points[i] + '</li>';
	}
	res += '<li>We will notify you by email / WhatsApp when your item is dispatched  and send you the tracking id.</li><li>Within India we will courier your item, which  will reach you within 2-3 business days of dispatch.</li><li>Our recommended international shipping method is India Post Registered Letter, which will reach almost anywhere in the world within 7-15 business days from dispatch. <span class="text-danger">Post COVID, India Post Registered Letter is not available to all destinations, please check with us if you are uncertain about shipping.</span></li><li>We can also courier items anywhere in the world in 3-5 business days after dispatch.</li><li>Shipping time estimates <strong>do not</strong> include delays due to customs and other formalities at the port of entry.</li>';
	res += '</ul>';
	return res;
}

function createSizeChartr(sizing, sizes) {
	return {
		sizeGeo: sizing.sizeGeo,
		capGeo: sizing.capGeo,
		sizingChart: sizing.chart,
		sizes: sizes,
		createSizeChart: function () {
			var nCols = this.sizes.length + 1;
			var szWidth = Math.floor(100 / nCols);
			var rem = 100 - (this.sizes.length * szWidth);

			var table = '<div class="table-responsive mb-7"><table class="dim-table table table-bordered table-hover table-sm mb-0 text-center" style="padding: 6px;">';

			table += '<thead><tr><td class="text-left" width="' + rem + '%"><strong>Size</strong></td>';
			for (var i = 0; i < this.sizes.length; i++) {
				var sz = this.sizes[i];
				table += '<td width="' + szWidth + '%"><strong>' + sz + '</strong></td>';
			}
			table += '</tr></thead><tbody>';
			for (var i = 0; i < this.sizeGeo.length; i++) {
				var szG = this.sizeGeo[i];
				table += '<tr><td class="text-left">' + this.capGeo[i] + '</td>';
				for (var j = 0; j < this.sizes.length; j++) {
					var sz = this.sizes[j];
					var chart = this.sizingChart[sz];
					if (chart === undefined) {
						continue;
					}
					var szGeo = chart[szG];
					table += '<td>' + szGeo[0] + (szGeo.length > 1 ? '-' + szGeo[1] : "") + '</td>';
				}
				table += '</tr>'
			}
			table += '</tbody></table></div>';
			return table;
		},
		update: function () {}
	}
}

function createGenderSizeChartr(mensSizing, womensSizing, sizes) {
	return {
		curIdx: 0,
		chartrs: [createSizeChartr(mensSizing, sizes), createSizeChartr(womensSizing, sizes)],
		tableId: 'IntlSizing',
		radioName: 'GenderVal',
		eventFnStr: 'onGenderChange',
		radios: [{
				value: 'men',
				text: "Men",
        },
			{
				value: 'women',
				text: "Women",
        }],
		createSizeChart: function () {
			return this.createSexSelectorChart(this.curIdx);
		},
		createButton(rad, isActive) {
			return '<label class="btn btn-xxs btn-outline-dark font-size-xxxs rounded-0 ' + (isActive ? "active" : "") + '"><input type="radio" name="' + this.radioName + '" value="' + rad.value + '" onclick="' + this.eventFnStr + '(\'' + rad.value + '\')"' + (isActive ? ' checked' : '') + '>' + rad.text + '</label>';
		},
		createSexSelectorChart: function (idx) {
			return '<div class="row align-items-center"><div class="col-12 text-center py-5"><div class="btn-group btn-group-toggle ml-auto py-5" data-toggle="buttons">' + this.createButton(this.radios[0], idx == 0) + this.createButton(this.radios[1], idx == 1) + '</div>' + '<div id="' + this.tableId + '">' + this.createSelectedChart(idx) + '</div></div></div>';
		},
		createSelectedChart: function (idx) {
			return this.chartrs[idx].createSizeChart();
		},
		getIndex: function (value) {
			for (var i = 0; i < this.radios.length; i++) {
				if (value == this.radios[i].value) {
					return i;
				}
			}
			return -1;
		},
		update: function () {
			$('#' + this.tableId + '').empty();
			var selRadio = $("input[name='" + this.radioName + "']:checked");
			var idx = this.getIndex(selRadio.val())
			this.curIdx = idx;
			var table = this.createSelectedChart(idx);
			$(table).appendTo('#' + this.tableId + '');
		}
	};
}

function createDimensioner(units, dimensionNames, dimensions, imagePath, dimVariation, sizes) {
	return {
		dimensionUnits: units,
		dimensionNames: dimensionNames,
		dimensions: dimensions,
		dimVariation: dimVariation,
		imagePath: imagePath,
		sizes: sizes,
		tableId: 'SizeTable',
		unitFieldName: 'SizeChartUnits',
		eventFnStr: 'onUnitChange',
		createMeasurementsPanel: function (units) {
			return '<div class="row align-items-center"><div class="col-md-4 text-center py-5"><img src="' + this.imagePath + '" class="img-fluid center-block"/></div><div class="col-md-8 text-center py-5">' + this.createMeasurementsTable(units) + '</div></div>'
		},
		createUnitInput(units, sel, lbl) {
			return '<input type="radio" name="' + this.unitFieldName + '" value="' + sel + '" onclick="' + this.eventFnStr + '(\'' + sel + '\')"' + ((units === sel) ? ' checked' : '') + '>' + lbl;
		},
		createMeasurementsTable: function (units) {
			return '<div class="btn-group btn-group-toggle ml-auto py-5" data-toggle="buttons"><label class="btn btn-xxs btn-circle btn-outline-dark font-size-xxxs rounded-0 active">' + this.createUnitInput(units, "in", "IN") + '</label><label class="btn btn-xxs btn-circle btn-outline-dark font-size-xxxs rounded-0 ml-2">' + this.createUnitInput(units, "cm", "CM") + '</label></div>' + '<div id="' + this.tableId + '">' + this.createSizingTable(units) + '</div>';
			/*
						return '<div class="btn-group btn-group-toggle ml-auto py-5" data-toggle="buttons"><label class="btn btn-xxs btn-circle btn-outline-dark font-size-xxxs rounded-0 active"><input type="radio" name="' + this.unitFieldName + '" value="in" onclick="' + this.eventFnStr + '" checked>IN</label><label class="btn btn-xxs btn-circle btn-outline-dark font-size-xxxs rounded-0 ml-2"><input type="radio" name="' + this.unitFieldName + '" value="cm" onclick="' + this.eventFnStr + '">CM</label></div>' + '<div id="' + this.tableId + '">' + this.createSizingTable(units) + '</div>';
			*/
		},
		createSizingTable: function (units) {
			var fn = (units === this.dimensionUnits) ? identity : (units == "in" ? cm2inches : inches2cm);

			var szWidth = Math.floor(75 / this.sizes.length);
			var rem = 100 - (this.sizes.length * szWidth);

			var unTxt = (units == "in" ? " inches" : "  cm")
			var table = '<div class="table-responsive"><table class="dim-table table table-bordered table-hover table-sm mb-0 text-center" style="padding: 6px;"><caption><strong>Measurements (in' + unTxt + ')</strong>' + (this.dimVariation === undefined ? "" : "<br>Variation can be up to +/- " + fn(this.dimVariation) + unTxt) + '</caption>';

			table += '<thead><tr><td class="text-left" width="' + rem + '%"><strong>Size</strong></td>';
			for (var i = 0; i < this.sizes.length; i++) {
				var sz = this.sizes[i];
				if (this.dimensions[sz] === undefined) {
					continue;
				}
				table += '<td width="' + szWidth + '%"><strong>' + sz + '</strong></td>';
			}
			table += '</tr></thead><tbody>';
			for (i = 0; i < this.dimensionNames.length; i++) {
				var dimName = this.dimensionNames[i];
				table += '<tr><td class="text-left">' + dimName + '</td>';
				for (var j = 0; j < this.sizes.length; j++) {
					var sz = this.sizes[j];
					var dims = this.dimensions[sz];
					if (dims === undefined) {
						continue;
					}
					var dim = dims[i];
					if (!Array.isArray(dim)) {
						table += '<td>' + fn(dim) + '</td>';
					} else {
						table += '<td>' + fn(dim[0]) + " - " + fn(dim[1]) + '</td>';
					}
				}
				table += '</tr>'
			}
			table += '</tbody></table></div>';
			return table;
		}
	};
}

function getSizeDialog(contentid, contents) {
	return '<div class="modal-dialog modal-dialog-centered modal-lg" role="document"><div class="modal-content"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><i class="fa fa-times" aria-hidden="true"></i></button><div class="modal-header line-height-fixed font-size-lg"><strong class="mx-auto">Sizing</strong></div><div class="modal-body border-bottom" id="' + contentid + '">' + contents + '</div></div></div>'
}

function getSizeModalWithId(id, contentid, contents) {
	return '<div class="modal fade" id="' + id + '" tabindex="-1" role="dialog" aria-hidden="true">' + getSizeDialog(contentid, contents) + '</div>';
}

function createAddToCartButton(id) {
	return '<button id="' + id + '" class="btn btn-warning btn-block" type="button"><span class="fa fa-cart-plus"></span> Add to Cart</button>';
}

function createSiteMapGenerator(path) {
	return {
		path: path,
		createSMNode: function (node) {
			var res = "";
			if (node.url !== undefined && getHostName(node.url) === null) {
				res += "<url><loc>" + this.path + node.url + "</loc></url>";
			};
			if (node.sub !== undefined) {
				res += this.createSM(node.sub);
			}
			return res;
		},
		createSM: function (nodeArr) {
			var res = "";
			for (var i = 0; i < nodeArr.length; i++) {
				res += this.createSMNode(nodeArr[i]);
			}
			return res;
		}
	};
}

function createSM(path) {
	return createSiteMapGenerator(path).createSM(siteMap);
}
