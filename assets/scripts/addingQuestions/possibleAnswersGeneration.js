const outputArea = document.querySelector('.answersArea');
const answersTypes = document.querySelector('.types');
const FIELD_NAME = "answer";

class CustomControl {

    constructor(type) {
        this.type = type;
    }
}

class InputTypedControl extends CustomControl {

    constructor(type) {
        super(type);
    }

    generateInputTypedControl(title,value) {
        return `
            <label>
                <input type="${this.type}" name="${FIELD_NAME}" data-value="${value}">
                <span class="${this.type}-case"></span>
                    ${title}  
            </label><br>            
        `;
    }
}

class SelectControl extends CustomControl {
    
    constructor({type}) {
        super({type});
    }

    generateSelectControl(option) {
        return `
            <select name="${FIELD_NAME}">
                ${option}
            </select>`;
    }

    generateOption(title,value) {
        return `<option value="${value}">
                    ${title}
                </option>`;
    }

    generateSelectedOption(title,value) {
        return `<option selected value="${value}">
                    ${title}
                </option>`;
    }
}

class TextControl extends CustomControl {
    
    constructor({type}) {
        super({type});
    }

    generateTextControl() {
        return `
		    <input type="text" name="${FIELD_NAME}" class="input-text" placeholder="Ответ">
	    `;        
    }

    generateFilledTextControl(answerValue) {
        return `
		    <input type="text" value="${answerValue}" name="${FIELD_NAME}" class="input-text" placeholder="Ответ">
	    `;    
    }
}

function generatePrompt(text) {
    return prompt(`${text}`,'');
}

function generateAnswersFields(type) {
    let amount = generatePrompt("Сколько вариантов ответа необходимо?");
    let outputString = '';
    if (type === "checkbox" || type === "radio") {
        let currentCheckbox = new InputTypedControl(type);
        console.log(currentCheckbox.type);
        for (let i = 0; i < Number(amount); i++) {
            let title = generatePrompt("Вариант");
            let value = generatePrompt("Значение");
            outputString += currentCheckbox.generateInputTypedControl(title,value);
        }
    }
    outputArea.innerHTML = outputString;
}

answersTypes.onchange = function(){
    // if (answersTypes.value == "checkbox") {
    // }
    // console.log(answersTypes.value); 
    generateAnswersFields(answersTypes.value);
}
