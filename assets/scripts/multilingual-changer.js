const LANG = document.documentElement.lang;
const ALL_TAGS_NEEDED = document.querySelectorAll('[data-translate]');

function replaceText(tags, translatesList) {
    for (let elem of tags) {
    	let keyWord = elem.getAttribute('data-translate');
        elem.textContent = translatesList[keyWord];
        if (elem.placeholder) {
        	elem.placeholder = translatesList[keyWord];
        }
    }
}

function getTranslation(lang) {
	return fetch(`../assets/scripts/${lang}.json`)
		.then((resp) => resp.json())
}

getTranslation(LANG).then(
	(data) => replaceText(ALL_TAGS_NEEDED, data)
);