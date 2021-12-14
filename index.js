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

	const girlsLiEl = document.createElement("li");
	girlsLiEl.className = "header-left__list-item";
	const girlsLiLink = document.createElement("a");
	girlsLiLink.textContent = "Girls";
	girlsLiEl.append(girlsLiLink);

	girlsLiLink.className = "header-left__link";
	const guysLiEl = document.createElement("li");
	guysLiEl.className = "header-left__list-item";
	const guysLiLink = document.createElement("a");
	guysLiLink.textContent = "Guys";
	guysLiEl.append(guysLiLink);

	guysLiLink.className = "header-left__link";
	const saleLiEl = document.createElement("li");
	saleLiEl.className = "header-left__list-item";
	const saleLiLink = document.createElement("a");
	saleLiLink.className = "header-left__link";
	saleLiLink.textContent = "Sale";
	saleLiEl.append(saleLiLink);

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

function render() {
	document.body.innerHTML = "";
	renderHeader();
}
render();
