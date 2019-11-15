let allTags = document.querySelectorAll('*');

let checkLanguage = () => {
	if (document.documentElement.lang === "en") {
		return "en";
	}
	else {
		return "ru";
	}
}

let findElementsWithText = (elementsList) => {
	for (let child of allTags) {
		if ((!child.firstElementChild) && (child.hasAttribute('data-translate'))) {
			elementsList.push(child);	
		}	
	}
	return elementsList;	
} 

let findPlaceholdersWithText = (elementsList) => {
	for (let child of allTags) {
		if ((!child.firstElementChild) && (child.placeholder) && (child.hasAttribute('data-translate'))) {
			elementsList.push(child);
		}	
	}
	return elementsList;
}


let deleteText = (elementsList,placeholdersList) => {
	for (let elem of elementsList) {
		elem.textContent = '';
	}
	for (let elem of placeholdersList) {
		elem.placeholder = '';
	}
}

let addText = (elementsList,translatesList,placeholdersList) => {
	for (let elem of elementsList) {
		for (let keyWord in translatesList) {
			if (elem.getAttribute('data-translate') === keyWord) {
				elem.textContent = translatesList[keyWord];
			}
		}
	}
	for (let elem of placeholdersList) {
		for (let keyWord in translatesList) {
			if (elem.getAttribute('data-translate') === keyWord) {
				elem.placeholder = translatesList[keyWord];
			}
		}
	}
}

let translateTextToEn = () => {
    fetch("../assets/scripts/en.json")
    .then((resp) => {
	   	return resp.json();
	})
	.then((data) => {
		let textElements = [];
		let placeholderTextElements = [];
		findElementsWithText(textElements);
		findPlaceholdersWithText(placeholderTextElements);
		deleteText(textElements,placeholderTextElements);
		addText(textElements,data,placeholderTextElements);
    });
}

let translateTextToRu = () => {
	fetch("../assets/scripts/ru.json")
    .then((response) => {
	   	return response.json();
	})
	.then((data) => {
		let textElements = [];
		let placeholderTextElements = [];
		findElementsWithText(textElements);
		findPlaceholdersWithText(placeholderTextElements);
		deleteText(textElements,placeholderTextElements);
		addText(textElements,data,placeholderTextElements);
    });	
}

let translateText = () => {
	if (checkLanguage() === "en") {
		translateTextToEn();
	}
	if (checkLanguage() === "ru") {
		translateTextToRu();
	}
}
translateText();