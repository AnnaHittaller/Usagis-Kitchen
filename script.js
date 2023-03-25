const foodIcons = [
	"🍇",
	"🍔",
	"🌯",
	"🍣",
	"🥪",
	"🥑",
	"🍪",
	"🍰",
	"🍕",
	"🍓",
	"🍹",
	"🥐",
	"🍳",
	"🥞",
	"🥦",
	"🍩",
	"🧀",
	"🍟",
	"🥗",
	"🍌",
	"🥨",
];

const faces = [
	"( ° - °)",
	"( • - •)",
	"( ˆ-ˆ)",
	"( ° • °)",
	"( *•*)",
	"( *-*)",
	"( ˆ•ˆ)",
];

const dishes = [];
const desserts = [];
const reminder = [
	"shine the sink",
	"put away the dry clothes",
	"do the laundry",
	"water the plants",
	"change water in the cat drinking fountain",
	"start the dishwasher",
	"unload the dishwasher",
	"vacuum everywhere",
	"mop the floor",
	"clean the toilet",
	"dust the flat surfaces",
	"change the cat litter",
	"tidy up",
];

const ingredients = [];
const categories = [];

class Dish {
	constructor(title, category, ingr) {
		this.title = title;
		this.category = category;
		this.ingr = ingr;

		if (this.category === "dessert") {
			desserts.push(this);
		} else {
			dishes.push(this);
		}

		for (let i = 0; i < ingr.length; i++) {
			if (ingr[i] && ingredients.indexOf(ingr[i]) === -1) {
				ingredients.push(ingr[i]);
			}
		}
		if (category && categories.indexOf(category) === -1) {
			categories.push(category);
		}
	}
}

// functionalities for the main button

const button = document.getElementById("button");
const categoryFilter = document.getElementById("cat-list");
const ingredientFilter = document.getElementById("ingr-list");
const mainParagraph = document.getElementById("main-p");
const dessertParagraph = document.getElementById("dessert-p");

button.onclick = () => {

	// const datalistCat = document.querySelectorAll("#categories option")
	// let categoryValues = []
	// for(let i of datalistCat) {
	// 	categoryValues.push(i.value)
	// }

	// const datalistIngr = document.querySelectorAll("#ingredients option");
	// let ingredientValues = []
	// for(let i of datalistIngr) {
	// 	ingredientValues.push(i.value)
	// }

	// console.log(ingredientValues)
	// console.log(categoryValues)
	// console.log(categoryFilter.value);

	// if (categoryValues.indexOf(categoryFilter.value) === -1) {
	// 	mainParagraph.style.display = "block";
	// 	mainParagraph.innerHTML = "There is no such category";
	// } else {
	// 	return
	// }

	// for (let i of categoryValues) {
	// 	if(i !== categoryFilter.value) {
	// 		mainParagraph.style.display = "block";
	// 		mainParagraph.innerHTML = "There is no such category"
	// 	}
	// }



	// no categoriy or filter is given: gives randomized results
	if (!categoryFilter.value && !ingredientFilter.value) {
		mainParagraph.style.display = "block";
		dessertParagraph.style.display = "block";
		document.getElementById("main-course").innerHTML =
			dishes[Math.floor(Math.random() * dishes.length)].title;
		document.getElementById("dessert").innerHTML =
			desserts[Math.floor(Math.random() * desserts.length)].title;
		// only ingredient is given: gives filtered result for both main course and dessert
	} else if (!categoryFilter.value && ingredientFilter.value) {
		mainParagraph.style.display = "block";
		dessertParagraph.style.display = "block";
		const filteredMainArr = dishes.filter(
			(dish) => dish.ingr.indexOf(ingredientFilter.value) !== -1
		);
		if (filteredMainArr.length > 0) {
			document.getElementById("main-course").innerHTML =
				filteredMainArr[
					Math.floor(Math.random() * filteredMainArr.length)
				].title;
		} else {
			mainParagraph.innerHTML = "There's no main course with this ingredient.";
		}

		const filteredDessertArr = desserts.filter(
			(dessert) => dessert.ingr.indexOf(ingredientFilter.value) !== -1
		);
		if (filteredDessertArr.length > 0) {
			document.getElementById("dessert").innerHTML =
				filteredDessertArr[Math.floor(Math.random() * filteredDessertArr.length)].title;
		} else {
			dessertParagraph.innerHTML =
				"This is an unacceptable ingredient for desserts.";
		}
		// dessert category is given without ingredients: gives randomized dessert result, main course remains hidden
	} else if (categoryFilter.value === "dessert" && !ingredientFilter.value) {
		mainParagraph.style.display = "none";
		document.getElementById("dessert").innerHTML =
			desserts[Math.floor(Math.random() * desserts.length)].title;
		// dessert category and ingredient is both given: gives filtered dessert results, main course remains hidden
	} else if (categoryFilter.value === "dessert" && ingredientFilter.value) {
		mainParagraph.style.display = "none";
		dessertParagraph.style.display = "block";
		const filteredDessertArray = desserts.filter(
			(dessert) => dessert.ingr.indexOf(ingredientFilter.value) !== -1
		);
		if (filteredDessertArray.length > 0) {
			document.getElementById("dessert").innerHTML =
				filteredDessertArray[
					Math.floor(Math.random() * filteredDessertArray.length)
				].title;
		} else {
			dessertParagraph.innerHTML =
				"Are you sure? Go and eat an ice cream instead.";
		}
		// category is not dessert, ingredient is not given: gives randomized results for main course, dessert remains hidden
	} else if (categoryFilter.value !== "dessert" && !ingredientFilter.value) {
		dessertParagraph.style.display = "none";
		mainParagraph.style.display = "block";

		
		const filteredMainArray = dishes.filter(
		(dish) => dish.category === categoryFilter.value
		);

		// for (let i in filteredMainArray) {
 		// console.log(filteredMainArray[i].category)
		// 	if (filteredMainArray[i].category !== categoryFilter.value) {
		// 		mainParagraph.innerHTML = "There is no such category";
		// 	} else {
		// 	document.getElementById("main-course").innerHTML =
		// 	filteredMainArray[Math.floor(Math.random() * filteredMainArray.length)].title;
		// 	}
		// }
		document.getElementById("main-course").innerHTML =
			filteredMainArray[
				Math.floor(Math.random() * filteredMainArray.length)
			].title;
		// category is not dessert, and ingredient is also given: gives filtered result, dessert remains hidden
	} else if (categoryFilter.value !== "dessert" && ingredientFilter.value) {
		dessertParagraph.style.display = "none";
		mainParagraph.style.display = "block";

		const filteredMainArray2 = dishes.filter(
			(dish) => dish.category === categoryFilter.value
		);
		const filteredMainArray3 = filteredMainArray2.filter(
			(dish) => dish.ingr.indexOf(ingredientFilter.value) !== -1
		);

		if (filteredMainArray3.length > 0) {
			document.getElementById("main-course").innerHTML =
				filteredMainArray3[
					Math.floor(Math.random() * filteredMainArray3.length)
				].title;
		} else {
			mainParagraph.innerHTML =
				"Sorry, I don`t have any idea. Just order a pizza.";
		}
	}
	//randomized results for bunny's face, food icons and cleaning tips
	document.getElementById("cleaning").innerHTML =
		reminder[Math.floor(Math.random() * reminder.length)];
	document.querySelector(".face").innerHTML =
		faces[Math.floor(Math.random() * faces.length)];
	document.querySelector(".foodicon").innerHTML =
		foodIcons[Math.floor(Math.random() * foodIcons.length)];
	// document.querySelector(".waiting").classList.add("hidden");
	// visual changes at the tips section and at the button
	document.querySelector(".tips").classList.add("visible");
	button.style.color = "#8C64DA";
	button.innerHTML = "Recommend something else";
};

button.onmousedown = () => {
	button.style.backgroundColor = "rgba(255, 234, 238, .5)";
};

button.onmouseup = () => {
	button.style.backgroundColor = "#fff";
};

// listed ingredients are shown when clicked on the names of dishes
const mainSpan = document.getElementById("main-course");
const dessertSpan = document.getElementById("dessert");
const hoverSpanMain = document.querySelector("#ul-main");
const hoverSpanDessert = document.querySelector("#ul-dessert");
console.log(hoverSpanDessert);

mainSpan.addEventListener("click", addListItems);

function addListItems() {
	removeListItems();

	dishes.forEach((item) => {
		if (item.title == mainSpan.innerHTML) {
			const ingArr = item.ingr;
			ingArr.forEach((i) => {
				const listItem = document.createElement("li");
				listItem.innerHTML = i;
				hoverSpanMain.appendChild(listItem);
			});
		}
	});
}

function removeListItems() {
	while (hoverSpanMain.firstChild) {
		hoverSpanMain.removeChild(hoverSpanMain.firstChild);
	}
}

mainSpan.addEventListener("click", () => {
	hoverSpanMain.classList.toggle("hidden");
});

button.addEventListener("click", () => {
	if (hoverSpanMain.className !== "hidden") {
		hoverSpanMain.classList.add("hidden");
	}
	if (hoverSpanDessert.className !== "hidden") {
		hoverSpanDessert.classList.add("hidden");
	}
});

const body = document.querySelector(".wrapper");
//ezt kivenni a todos scriptből

window.addEventListener("click", (e) => {
	//console.log(e.target)
 	if (e.target.id !== "main-course") {
		if(hoverSpanMain.className !== "hidden" && !hoverSpanMain.contains(e.target)) {
			hoverSpanMain.classList.add("hidden");
			//hoverSpanMain.style.color = "red"
		}
	}

if (e.target.id !== "dessert") {
	if (
		hoverSpanDessert.className !== "hidden" &&
		!hoverSpanDessert.contains(e.target)
	) {
		hoverSpanDessert.classList.add("hidden");
		//hoverSpanMain.style.color = "red"
	}
}

	}
 );

//listed ingredients when clicking on the name of the dessert
dessertSpan.addEventListener("click", addListItemsDesserts);

function addListItemsDesserts() {
	removeListItemsDesserts();

	desserts.forEach((item) => {
		if (item.title == dessertSpan.innerHTML) {
			const ingArr = item.ingr;
			ingArr.forEach((i) => {
				const listItem = document.createElement("li");
				listItem.innerHTML = i;
				hoverSpanDessert.appendChild(listItem);
			});
		}
	});
}

function removeListItemsDesserts() {
	while (hoverSpanDessert.firstChild) {
		hoverSpanDessert.removeChild(hoverSpanDessert.firstChild);
	}
}

dessertSpan.addEventListener("click", () => {
	hoverSpanDessert.classList.toggle("hidden");
});

console.log(mainSpan);
console.log(hoverSpanMain);

// reset button reloads the page
const refreshButton = document.getElementById("refresh");
console.log(refreshButton);
refreshButton.addEventListener("click", function () {
	location.reload();
});

// ===============================================================================
// adding the dishes
// ===============================================================================

const tofuStirFry = new Dish("tofu stir fry", "rice dishes", [
	"tofu",
	"rice",
	"veggies",
]);

const bombayEggs = new Dish("Bombay eggs", "dinner", [
	"tomato sauce",
	"eggs",
	"chickpeas",
]);

const waffles = new Dish("waffles", "dessert", ["eggs", "milk"]);

const oatmealCookies = new Dish("oatmeal raisin cookies", "dessert", [
	"rolled oats",
	"raisins",
	"chocolate chips",
]);

const chickpeaWrap = new Dish("chickpea BBQ enchiladas", "veggie dishes", [
	"tortilla wraps",
	"chickpeas",
	"baby spinach",
]);

const mushroomPasta = new Dish("pasta with mushroom sauce", "pastas", [
	"pasta",
	"mushrooms",
	"cooking cream",
]);

const friedRice = new Dish("fried rice", "rice dishes", [
	"rice",
	"eggs",
	"veggies",
]);

const spaghetti = new Dish("spaghetti bolognese", "pastas", [
	"spaghetti",
	"tomato sauce",
	"vegan minced meat",
]);

const grilledCheese = new Dish("grilled cheese", "lunch", [
	"grillcheese",
	"veggies",
	"potatoes",
]);

const beanEnchilada = new Dish("butternut squash enchiladas", "veggie dishes", [
	"pumpkin",
	"tortilla wraps",
	"black beans",
	"sweet potatoes",
]);

const layeredCauliflower = new Dish("layered cauliflower", "veggie dishes", [
	"cauliflower",
	"rice",
	"vegan minced meat",
]);

const eggplantParm = new Dish("eggplant parmesan", "veggie dishes", [
	"eggplant",
	"tomato sauce",
	"panko breadcrumb",
	"cheese",
	"parmesan",
]);

const friedPasta = new Dish("chinese fried pasta", "pastas", [
	"spaghetti",
	"soy sauce",
	"veggies",
]);

const teriyakiVeggies = new Dish("teriyaki veggies", "veggie dishes", [
	"veggies",
	"teriyaki sauce",
	"rice",
]);

const spicyLentil = new Dish("indian lentil dahl", "soups", [
	"lentil",
	"tomatoes",
]);

const frenchToast = new Dish("french toast", "dinner", ["bread", "eggs"]);

const quiche = new Dish("veggie quiche", "veggie dishes", [
	"quiche dough",
	"veggies",
	"eggs",
	"cooking cream",
	"broccoli",
	"spring onion",
	"red onion",
	"baby spinach",
]);

const doughnutBalls = new Dish("quick doughnut balls", "dessert", [
	"eggs",
	"milk",
	"yoghurt",
]);

const pancakesUS = new Dish("american pancakes", "dessert", [
	"eggs",
	"milk",
	"maple syrup",
]);

const cupcake = new Dish("cupcakes", "dessert", [
	"eggs",
	"milk",
	"chocolate",
	"fruits",
]);

const spinach = new Dish("spinach", "soups", [
	"spinach",
	"potatoes",
	"cooking cream",
]);

const spinachPasta = new Dish("pasta with spinach", "pastas", [
	"spinach",
	"pasta",
	"cooking cream",
]);

const pumpkinCasserole = new Dish("pumpkin-potato casserole", "veggie dishes", [
	"Hokkaido pumpkin",
	"potatoes",
	"cooking cream",
	"sweet potatoes",
]);

const pumpkinSoup = new Dish("pumpkin soup", "soups", [
	"Hokkaido pumpkin",
	"potatoes",
	"cooking cream",
]);

const palooAratha = new Dish("paloo aratha", "lunch", [
	"potatoes",
	"peas",
	"pizza dough",
]);

const samosa = new Dish("samosas", "lunch", [
	"potatoes",
	"onion",
	"Filo-dough",
	"sweet potatoes",
	"peas",
]);

const cheeseSticks = new Dish("salty cheese sticks", "dessert", [
	"eggs",
	"cheese",
	"flour",
]);

const broccoliPasta = new Dish("broccoli pasta", "pastas", [
	"broccoli",
	"spaghetti",
	"cooking cream",
]);

const fishFingers = new Dish("fish fingers", "fish", [
	"fish fingers",
	"rice",
	"potatoes",
]);

const tunaPasta = new Dish("tuna pasta", "fish", [
	"tuna",
	"pasta",
	"tomato sauce",
]);

const bakedCheese = new Dish("breaded cheese", "lunch", [
	"cheese",
	"rice",
	"potatoes",
]);

const ovenCheese = new Dish("Ofenkäse", "dinner", [
	"cheese",
	"baguette",
	"wine",
]);

const flammkuchen = new Dish("Flammkuchen", "dinner", [
	"Flammkuchen dough",
	"sour cream",
	"veggies",
]);

const pastaSalad = new Dish("pasta salad", "pastas", [
	"pasta",
	"veggies",
	"cucumber",
	"baby spinach",
	"tomatoes",
	"chickpeas",
]);

const veggieBurger = new Dish("veggie burger", "lunch", [
	"burger buns",
	"vegan patties",
	"tomatoes",
]);

const risotto = new Dish("risotto", "rice dishes", [
	"rice",
	"cooking cream",
	"wine",
	"mushrooms",
]);

const cottageCheeseDumpling = new Dish("cottage cheese dumpling", "lunch", [
	"cottage cheese",
	"breadcrumbs",
	"sour cream",
	"wheat groat",
]);

const bakedSpaghettiSquash = new Dish(
	"baked spaghetti squash",
	"veggie dishes",
	["spaghetti squash", "sour cream", "mushrooms", "cheese"]
);

const sweetAndSourChicken = new Dish("sweet and sour chicken", "rice dishes", [
	"Uncle Ben's sauce",
	"vegan chicken",
	"rice",
]);

const falafel = new Dish("falafel", "veggie dishes", [
	"falafel base",
	"yoghurt",
	"potatoes",
	"veggies",
]);

const beanChili = new Dish("black bean chili", "veggie dishes", [
	"black beans",
	"sweet corn",
	"white beans",
	"peas",
	"onion",
]);

const beanSoup = new Dish("bean soup", "soups", [
	"kidney beans",
	"sour cream",
	"onion",
]);

const squashGnocchi = new Dish("butternut squash gnocchi", "veggie dishes", [
	"Hokkaido pumpkin",
	"butternut squash",
	"onion",
	"sweet potatoes",
	"gnocchi",
]);

const broccoliSoup = new Dish("broccoli cream soup", "soups", [
	"broccoli",
	"potatoes",
	"cooking cream",
]);

const filledPaprika = new Dish("filled paprika", "veggie dishes", [
	"paprika",
	"rice",
	"cheese",
	"tomato sauce",
]);

const langos = new Dish("lángos", "lunch", [
	"eggs",
	"milk",
	"sour cream",
	"potatoes",
	"cheese",
]);

const penneArrabbiata = new Dish("penne arrabbiata", "pastas", [
	"pasta",
	"tomato sauce",
	"chilipaprika",
]);

const mushroomSoup = new Dish("mushroom soup", "soups", [
	"mushrooms",
	"carrots",
	"potatoes",
]);

const deviledEggs = new Dish("deviled eggs", "dinner", [
	"eggs",
	"mayo",
	"mustard",
	"sour cream",
]);

const spaghettiCarbonara = new Dish("spaghetti carbonara", "pastas", [
	"eggs",
	"spaghetti",
	"cooking cream",
]);

const nokedli = new Dish("nokedli with eggs", "lunch", [
	"eggs",
	"milk",
	"flour",
]);

const tofuMousse = new Dish("chocolate silken tofu mousse", "dessert", [
	"tofu",
	"chocolate",
	"fruits",
]);

const poppyCake = new Dish("poppy and jam cookies", "dessert", [
	"poppy seeds",
	"jam",
	"eggs",
]);

const makosGuba = new Dish("mákosguba", "dessert", [
	"poppy seeds",
	"crescent rolls",
	"milk",
	"honey",
]);

const pumpkinAppleRoll = new Dish("pumpkin-apple roll", "dessert", [
	"pumpkin",
	"apple",
	"walnut",
	"sour cream",
]);

const breadcrumbBroccoli = new Dish(
	"buttered broccoli in breadcrumbs",
	"veggie dishes",
	["breadcrumbs", "broccoli"]
);

const fruitCake = new Dish("fruity sponge cake", "dessert", [
	"fruits",
	"gelatine powder",
	"pudding powder",
	"eggs",
	"flour",
]);

const cottageCheesePasta = new Dish("pasta with cottage cheese", "pastas", [
	"pasta",
	"cottage cheese",
	"sour cream",
]);

const friedVeggies = new Dish(
	"deep fried veggies in breadcrumbs",
	"veggie dishes",
	["veggies", "mushrooms", "cauliflower", "broccoli", "rice"]
);

const batteredApple = new Dish("battered apple", "dessert", [
	"apple",
	"milk",
	"eggs",
	"flour",
]);

const maisEggSoup = new Dish("chinese eggs and sweet corn soup", "soups", [
	"sweet corn",
	"eggs",
	"starch",
]);

const cottageCheeseBuns = new Dish("cottage cheese-filled buns", "lunch", [
	"cottage cheese",
	"buns",
	"raisins",
	"sour cream",
	"eggs",
]);

const carrotCake = new Dish("carrot cake", "dessert", [
	"carrots",
	"walnut",
	"eggs",
	"oat flour",
]);

const crumbCake = new Dish("fruity crumb cake", "dessert", [
	"apple",
	"blueberry",
	"peach",
	"fruits",
	"eggs",
	"flour",
	"butter",
]);

const lecso = new Dish("lecsó", "veggie dishes", [
	"paprika",
	"tomatoes",
	"onion",
]);

// ===============================================================================
// creating the options for the datalist items based on the dishes above
// ===============================================================================

ingredients.forEach((item) => {
	const option = document.createElement("option");
	const datalistIngr = document.getElementById("ingredients");
	option.value = item;
	datalistIngr.appendChild(option);
});

categories.forEach((item) => {
	const option = document.createElement("option");
	const datalistCat = document.getElementById("categories");
	option.value = item;
	datalistCat.appendChild(option);
});
