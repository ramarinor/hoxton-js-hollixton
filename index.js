const state = {
	store: [],
	page: "Home",
	selectedItem: null,
	modal: "",
	search: "test"
};

// SERVER FUNCTIONS

function getStoreItems() {
	return fetch("http://localhost:3000/store").then((resp) => resp.json());
}

//DERIVED STATE
function getItemsToDisplay() {
	let itemsToDisplay = state.store;

	if (state.page === "Girls") {
		itemsToDisplay = itemsToDisplay.filter((item) => item.type === "Girls");
	} else if (state.page === "Guys") {
		itemsToDisplay = itemsToDisplay.filter((item) => item.type === "Guys");
	} else if (state.page === "Sale") {
		itemsToDisplay = itemsToDisplay.filter((item) => item.discountedPrice !== undefined);
	}

	if (state.search !== "") {
		itemsToDisplay = itemsToDisplay.filter((item) => item.name.toLowerCase().includes(state.search.toLocaleLowerCase()));
	}
	return itemsToDisplay;
}

//HELPER FUNCTIONS
function isItemNew(product) {
	const daysToConsider = 11;
	const second = 1000;
	const minute = second * 60;
	const hour = minute * 60;
	const day = hour * 24;

	const msForTenDaysAgo = Date.now() - day * daysToConsider;
	const msForProductDate = Date.parse(product.dateEntered);

	return msForProductDate > msForTenDaysAgo;
}

//RENDER FUNCTIONS

function renderHeader() {
	const headerEl = document.createElement("header");

	const headerLeft = document.createElement("div");
	headerLeft.className = "header-left";

	const navEl = document.createElement("nav");

	const headerLeftList = document.createElement("ul");
	headerLeftList.className = "header-left__list";

	const titleLiEl = document.createElement("li");
	titleLiEl.className = "header-left__list-item";
	const titleLiLink = document.createElement("a");
	titleLiLink.className = "header-left__link";
	const titleLih1 = document.createElement("h1");
	titleLih1.className = "header-left__title";
	titleLih1.textContent = "Hollixton";
	titleLiLink.append(titleLih1);
	titleLiEl.append(titleLiLink);
	titleLiLink.addEventListener("click", () => {
		state.page = "Home";
		state.selectedItem = null;
		render();
	});

	const girlsLiEl = document.createElement("li");
	girlsLiEl.className = "header-left__list-item";
	const girlsLiLink = document.createElement("a");
	girlsLiLink.textContent = "Girls";
	girlsLiLink.className = "header-left__link";
	girlsLiEl.append(girlsLiLink);
	girlsLiLink.addEventListener("click", () => {
		state.page = "Girls";
		state.selectedItem = null;
		render();
	});

	const guysLiEl = document.createElement("li");
	guysLiEl.className = "header-left__list-item";
	const guysLiLink = document.createElement("a");
	guysLiLink.textContent = "Guys";
	guysLiLink.className = "header-left__link";
	guysLiEl.append(guysLiLink);
	guysLiLink.addEventListener("click", () => {
		state.page = "Guys";
		state.selectedItem = null;
		render();
	});

	const saleLiEl = document.createElement("li");
	saleLiEl.className = "header-left__list-item";
	const saleLiLink = document.createElement("a");
	saleLiLink.textContent = "Sale";
	saleLiLink.className = "header-left__link";
	saleLiEl.append(saleLiLink);
	saleLiLink.addEventListener("click", () => {
		state.page = "Sale";
		state.selectedItem = null;
		render();
	});

	headerLeftList.append(titleLiEl, girlsLiEl, guysLiEl, saleLiEl);
	navEl.append(headerLeftList);
	headerLeft.append(navEl);

	const headerRight = document.createElement("div");
	headerRight.className = "header-right";

	const headerRightList = document.createElement("ul");
	headerRightList.className = "header-right__list";

	const searchLiEl = document.createElement("li");
	searchLiEl.className = "header-right__list-item";
	const searchBtn = document.createElement("button");
	searchBtn.className = "header-right__button";
	const searchImg = document.createElement("img");
	searchImg.src = "search.svg";
	searchImg.alt = "search";
	searchBtn.append(searchImg);
	searchLiEl.append(searchBtn);
	searchBtn.addEventListener("click", () => {
		state.modal = "search";
		render();
	});

	const profileLiEl = document.createElement("li");
	profileLiEl.className = "header-right__list-item";
	const profileBtn = document.createElement("button");
	profileBtn.className = "header-right__button";
	const profileImg = document.createElement("img");
	profileImg.src = "profile.svg";
	profileImg.alt = "profile";
	profileBtn.append(profileImg);
	profileLiEl.append(profileBtn);

	const bagLiEl = document.createElement("li");
	bagLiEl.className = "header-right__list-item";
	const bagBtn = document.createElement("button");
	bagBtn.className = "header-right__button";
	const bagImg = document.createElement("img");
	bagImg.src = "bag.svg";
	bagImg.alt = "bag";
	bagBtn.append(bagImg);
	bagLiEl.append(bagBtn);
	headerRightList.append(searchLiEl, profileLiEl, bagLiEl);

	headerRight.append(headerRightList);

	headerEl.append(headerLeft, headerRight);
	document.body.append(headerEl);
}

function renderProductItem(product, productList) {
	const productEl = document.createElement("li");
	productEl.setAttribute("class", "product-item");
	productEl.addEventListener("click", () => {
		state.selectedItem = product;
		render();
	});

	const imgEl = document.createElement("img");
	imgEl.setAttribute("class", "product-item__image");
	imgEl.setAttribute("src", product.image);
	imgEl.setAttribute("alt", product.name);

	const titleEl = document.createElement("h3");
	titleEl.setAttribute("class", "product-item__title");
	titleEl.textContent = product.name;

	const priceEl = document.createElement("p");
	priceEl.setAttribute("class", "product-item__price");

	const fullPriceSpan = document.createElement("span");
	fullPriceSpan.setAttribute("class", "product-item__full-price");
	fullPriceSpan.textContent = `£${product.price}`;

	priceEl.append(fullPriceSpan);

	if (product.discountedPrice) {
		fullPriceSpan.classList.add("discounted");

		const discountSpan = document.createElement("span");
		discountSpan.setAttribute("class", "product-item__discount");
		discountSpan.textContent = `£${product.discountedPrice}`;
		priceEl.append(discountSpan);
	}

	productEl.append(imgEl, titleEl, priceEl);

	if (isItemNew(product)) {
		const newEl = document.createElement("span");
		newEl.setAttribute("class", "product-item__new");
		newEl.textContent = "NEW!";
		productEl.append(newEl);
	}

	productList.append(productEl);
}

function renderProductList(mainEl) {
	const h2El = document.createElement("h2");
	h2El.textContent = state.page;
	h2El.setAttribute("class", "main-title");
	mainEl.append(h2El);
	if (state.search !== "") {
		const searchDiv = document.createElement("div");
		searchDiv.className = "current-search";
		const h4el = document.createElement("p");
		h4el.textContent = `Current search: ${state.search}`;

		const clearSearchBtn = document.createElement("button");
		clearSearchBtn.className = "cta";
		clearSearchBtn.textContent = "Clear";

		clearSearchBtn.addEventListener("click", () => {
			state.search = "";
			render();
		});

		searchDiv.append(h4el, clearSearchBtn);

		mainEl.append(searchDiv);
	}

	const productList = document.createElement("ul");
	productList.setAttribute("class", "product-list");
	for (const product of getItemsToDisplay()) {
		renderProductItem(product, productList);
	}

	mainEl.append(productList);
}

function renderItemDetails(mainEl) {
	const productDetails = document.createElement("section");
	productDetails.className = "product-details";

	const imgEl = document.createElement("img");
	imgEl.src = state.selectedItem.image;
	imgEl.alt = state.selectedItem.name;

	const productDetailsDescription = document.createElement("div");
	productDetailsDescription.className = "product-details__description";

	const h3El = document.createElement("h3");
	h3El.textContent = state.selectedItem.name;

	const addToBagBtn = document.createElement("button");
	addToBagBtn.className = "cta";
	addToBagBtn.textContent = "Add to bag";

	const goBackBtn = document.createElement("button");
	goBackBtn.className = "cta";
	goBackBtn.textContent = "Go back to shop";

	goBackBtn.addEventListener("click", () => {
		state.selectedItem = null;
		render();
	});

	productDetailsDescription.append(h3El, addToBagBtn, goBackBtn);

	productDetails.append(imgEl, productDetailsDescription);

	mainEl.append(productDetails);
}

function renderMain() {
	const mainEl = document.createElement("main");

	if (state.selectedItem === null) {
		renderProductList(mainEl);
	} else {
		renderItemDetails(mainEl);
	}

	document.body.append(mainEl);
}
function renderFooter() {
	const footer = document.createElement("footer");
	const footerTitle = document.createElement("h3");
	footerTitle.className = "footer-title";
	footerTitle.textContent = "Hollixton";

	const footerCountry = document.createElement("div");
	footerCountry.className = "footer-country";
	footerCountry.textContent = "🇬🇧 United Kingdom";
	footer.append(footerTitle, footerCountry);

	document.body.append(footer);
}

function renderSearchModal() {
	const modalWrapper = document.createElement("section");
	modalWrapper.className = "modal-wrapper";

	const modal = document.createElement("form");
	modal.className = "modal";

	const h5el = document.createElement("h5");
	h5el.textContent = "Search for your favourite items!";

	const modalInput = document.createElement("input");
	modalInput.className = "modal-input";
	modalInput.type = "search";

	const modalCloseBtn = document.createElement("button");
	modalCloseBtn.className = "modal-close-btn";
	modalCloseBtn.textContent = "x";
	modalCloseBtn.type = "button";

	modal.addEventListener("submit", (event) => {
		event.preventDefault();
		state.search = modalInput.value;
		state.modal = "";
		render();
	});

	modalCloseBtn.addEventListener("click", () => {
		state.modal = "";
		render();
	});

	modal.append(h5el, modalInput, modalCloseBtn);

	modalWrapper.append(modal);

	document.body.append(modalWrapper);
}

function renderModal() {
	if (state.modal === "search") {
		renderSearchModal();
	}
}

function render() {
	document.body.innerHTML = "";
	renderHeader();
	renderMain();
	renderFooter();
	renderModal();
}

//

function init() {
	render();
	getStoreItems().then(function (store) {
		state.store = store;
		render();
	});
}

init();
