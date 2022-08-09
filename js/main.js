const localisationData = {
    "key-display-languages": {
        "en": "English",
        "nl": "Nederlands"
    },
    "key-title-spirits": {
        "en": "Spirits"
    },
    "key-list-spirits": [
        {
            "en": "Jäegermeister"
        },
        {
            "en": "Liquer"
        },
        {
            "en": "Schnapps"
        },
        {
            "en": "Brandy"
        },
        {
            "en": "Sake"
        },
        {
            "en": "Vermouth"
        },
        {
            "en": "Beer"
        },
        {
            "en": "Tequila"
        },
        {
            "en": "Moonshine"
        },
        {
            "en": "Irish Cream"
        },
        {
            "en": "Vodka"
        },
        {
            "en": "Gin"
        },
        {
            "en": "Whiskey"
        },
        {
            "en": "Amaretto"
        },
        {
            "en": "Scotch"
        },
        {
            "en": "Rum"
        },
        {
            "en": "RumChata"
        },
        {
            "en": "Kahlua"
        },
        {
            "en": "Absinthe"
        },
        {
            "en": "Bourbon"
        }
    ],
    "key-title-flair": {
        "en": "Flair"
    },
    "key-list-flair": [
        {
            "en": "Lemon Wedge"
        },
        {
            "en": "Hot Sauce"
        },
        {
            "en": "Glitter"
        },
        {
            "en": "Maraschino Cherry"
        },
        {
            "en": "Salt Rim"
        },
        {
            "en": "Cinnamon"
        },
        {
            "en": "Lime Wedge"
        },
        {
            "en": "Sugar Rim"
        },
        {
            "en": "Coconut Flakes"
        },
        {
            "en": "Whipped Cream"
        }
    ],
    "key-title-mixers": {
        "en": "Mixers"
    },
    "key-list-mixers": [
        {
            "en": "Energy Drink"
        },
        {
            "en": "Milk"
        },
        {
            "en": "Water"
        },
        {
            "en": "Sweet & Sour"
        },
        {
            "en": "Tea"
        },
        {
            "en": "Lemon Juice"
        },
        {
            "en": "Coffee"
        },
        {
            "en": "Tomato Juice"
        },
        {
            "en": "Sports Drink"
        },
        {
            "en": "Bitters"
        },
        {
            "en": "Grenadine"
        },
        {
            "en": "Apple Juice"
        },
        {
            "en": "Ginger Beer"
        },
        {
            "en": "Coconut Water"
        },
        {
            "en": "Lemonade"
        },
        {
            "en": "Lime Juice"
        },
        {
            "en": "Pineapple Juice"
        },
        {
            "en": "Soda"
        },
        {
            "en": "Cranberry Juice"
        },
        {
            "en": "Orange Juice"
        }
    ]
}

function getLocalisationData(...keys) {
    let data = localisationData;
    keys.forEach(k => {
        data = data[k];
    });
    const lang = getDisplayLanguage();
    return lang in data ? data[lang] : data["en"];
}

function loadDisplayLanguage() {
    const items = document.querySelectorAll("#list-languages > li");
    items.forEach(li => {
        if (li.getAttribute("value") == getDisplayLanguage()) {
            addClassToElement(li, "active");
            document.getElementById("dropdown-languages").innerHTML = getLocalisationData("key-display-languages");
        }
        li.addEventListener('click', (e) => {
            if (e.currentTarget.classList.contains("active")) {
                return;
            }
            localStorage.setItem("preferred-language", e.currentTarget.getAttribute("value"));
            location.reload();
        });
    });
}

function changeDisplayLanguage(value) {
    localStorage.setItem("preferred-language", value);
    const items = document.querySelectorAll("#collapse-languages > li");
    items.forEach(li => {
        if (li.getAttribute("value") == getDisplayLanguage()) {
            addClassToElement(li, "active");
        }
        else {
            removeClassFromElement(li, "active");
        }
    });
}

function getDisplayLanguage() {
    const lang = localStorage.getItem("preferred-language");
    return lang ? lang : "en";
}

function addClassToElement(element, value) {
	const valueT = value.trim();
	if (!valueT) {
		return;
	}
	if (element.classList.contains(valueT)) {
		return;
	}
	element.classList.add(valueT)
}

function removeClassFromElement(element, value) {
    const valueT = value.trim();
	if (!valueT) {
		return;
	}
	element.classList.remove(valueT)
}

function addAttributesToElement(element, attributes) {
	if (!attributes) {
		return;
	}

	for (const attr in attributes) {
		const value = attributes[attr];
		if (attr === "class") {
			value.split(" ").forEach(v => addClassToElement(element, v));
			continue;
		}
		element.setAttribute(attr, value);
	}
}

function finalizeElement(element, attributes, parent) {
	addAttributesToElement(element, attributes);
	if (parent) {
		parent.appendChild(element);
	}
	return element;
}

function createText(tag, text, attributes, parent) {
	const element = document.createElement(tag);
	if (text) {
		element.innerHTML = text;
	}
	return finalizeElement(element, attributes, parent);
}

function createIngredientList(name, numColumns) {
    const header = document.getElementById("table-" + name + "-header");
    if (!header) {
        console.error("Header not found for table " + name);
        return;
    }

    createText("h3", getLocalisationData("key-title-" + name), {"class": "text-center"}, header);
    addAttributesToElement(header, {"colspan": numColumns});

    const body = document.getElementById("table-" + name + "-body");
    if (!body) {
        console.error("Body not found for table " + name);
        return;
    }

    //createOrderedList(name, {"class": "p-3 card-columns", "style": "column-count: 2;"}, elements[0]);

    const rows = [];
    for (let i = 0; i < localisationData["key-list-" + name].length; i++) {
        if (i % numColumns == 0) {
            rows.push(finalizeElement(document.createElement("tr"), undefined, body));
        }

        const cell = document.createElement("td");
        createText("span", (i+1) + ".", {"class": "m-2"}, cell);
        createText("span", getLocalisationData("key-list-" + name, i), undefined, cell);
        createText("span", "", {"id": name + "-" + (i+1) + "-amount", "class": "text-amount float-end"}, cell);
        finalizeElement(cell, {"id": name + "-" + (i+1)}, rows[rows.length-1]);
    }
}

function getRandomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomElement(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
}

function rollIngredients(name) {
    const ingredients = [];
    const numIngredients = getRandomNumberBetween(1, 5);  // [min, max[
    for (let i = 0; i < numIngredients; i++) {
        const n = getRandomNumberBetween(1, 21);  // [min, max[
        ingredients.push([n-1, getLocalisationData("key-list-" + name, n-1)]);
        addClassToElement(document.getElementById(name + "-" + n), "table-active");

        const amount = document.getElementById(name + "-" + n + "-amount");
        if (!amount.innerHTML) {
            amount.innerHTML = 0;
        }
        amount.innerHTML = +amount.innerHTML + 1;
    }
    return ingredients;
}

function roll() {
    document.querySelectorAll(".table-active").forEach(e => {
        removeClassFromElement(e, "table-active");
        e.lastChild.innerHTML = "";
    });

    const spirits = rollIngredients("spirits");
    const mixers = rollIngredients("mixers");

    const generateLine = a => a.length + " (" + a.map(e => (e[0]+1)+":"+e[1]).join(", ") + ")"
    const lines = [
        "#spirits: " + generateLine(spirits),
        "#mixers: " + generateLine(mixers)
    ];

    document.getElementById("output").innerHTML = lines.join("<br/>");
}

function initialize() {
    loadDisplayLanguage()

    createIngredientList("spirits", 2);
    //createIngredientList("flair", 1);
    createIngredientList("mixers", 2);
}