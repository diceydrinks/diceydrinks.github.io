const localisationData = {
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

function getSelectedLanguage() {
    return "en";
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

function createOrderedList(name, attributes, parent) {
    const list = document.createElement("ol");

    localisationData["key-list-" + name].forEach(v => {
        createText("li", v[getSelectedLanguage()], {"class": "list-item"}, list);
    });

    return finalizeElement(list, attributes, parent);
}

function createIngredientList(name) {
    const elements = document.getElementsByClassName("container-" + name);
    if (!elements || elements.length < 1) {
        return;
    }

    createText("h3", localisationData["key-title-" + name][getSelectedLanguage()], {"class": "text-center"}, elements[0]);
    createOrderedList(name, {"class": "p-3 card-columns", "style": "column-count: 2;"}, elements[0]);
}

function getRandomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomElement(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
}

function rollIngredients(name) {
    const ingredients = [];
    const numIngredients = getRandomNumberBetween(1, 5);
    for (let i = 0; i < numIngredients; i++) {
        const n = getRandomNumberBetween(1, 21);
        ingredients.push([n, localisationData["key-list-" + name][n][getSelectedLanguage()]]);
    }
    return ingredients;
}

function roll() {
    const spirits = rollIngredients("spirits");
    const mixers = rollIngredients("mixers");

    const lines = [
        "#spirits: " + spirits.length + " (" + spirits.map(e => e[1]).join(", ") + ")",
        "#mixers: " + mixers.length + " (" + mixers.map(e => e[1]).join(", ") + ")"
    ];

    const output = document.getElementById("output");
    output.innerHTML = lines.join("<br/>");
}

function initialize() {
    createIngredientList("spirits");
    //createIngredientList("flair");
    createIngredientList("mixers");
}