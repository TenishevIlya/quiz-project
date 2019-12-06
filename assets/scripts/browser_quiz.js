/* html elements */
const questionBlock = document.querySelector('.question');
const formEl = document.querySelector('.js-form');
const controlWrapperEl = formEl.querySelector('.js-form-control');
const FIELD_NAME = "answer";

/* data containers */
let questionsArray = [];
let allResults = {};
let currentAnswers = [];

class CustomConrtol {

    constructor({type}) {
        this.type = type;
    }
}

class InputTypedControl extends CustomConrtol {

    constructor({type}) {
        super({type});
    }

    generateInputTypedControl(title,value) {
        return `
            <label class="${this.type}-row">
                <input type="${this.type}" name="${FIELD_NAME}" data-value="${value}" class="${this.type}-input">
                <span class="${this.type}-case"></span>
                    ${title}  
            </label>            
        `;
    }

    generateFilledInputTypedControl(title,value) {
        return `
                <label class="${this.type}-row">
                    <input type="${this.type}" name="${FIELD_NAME}" data-value="${value}" checked class="${this.type}-input">
                    <span class="${this.type}-case"></span>
                        ${title}  
                </label>            
        `;
    }
}

class SelectControl extends CustomConrtol {
    
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

class TextControl extends CustomConrtol {
    
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

function hasNextQuestion(allQuestions,property) {
    return allQuestions.hasOwnProperty(property);
}

function showNextQuestion(data) {
    generateDynamicForm(data[resultsDataLength(allResults)],data.length);
    hideUnwantedWarnings(questionBlock,1);        
}

function showPrevQuestion(data,answer) {
    generateDynamicFilledForm(data[resultsDataLength(allResults)],data.length,answer)
    hideUnwantedWarnings(questionBlock,1);        
}


function generateControlContainer({question_text,id,type},control,size) {
    return `
        <h1 class="" data-translate="QUESTION_№${id}"> Вопрос: №${id} </h1>
        <p class="question-content"> ${question_text} </p>
        <div class="${type}-answers">
            ${control}
        </div>
        <hr>
        <div class="question-navigation">
            <button class="question-btn back-btn" type="reset"><i class="fas fa-arrow-left"></i></button>
            <span class="question-number"> Вопрос: ${id}/${size}</span>
            <button class="question-btn next-btn" type="submit" data-direction='forward'>
                <i class="fas fa-arrow-right"></i>
            </button>
        </div>   
    `;    
}

function extractAnswersListValue(inputEls) {
    let result = [];
    if (isTextControl(inputEls)) { 
        result.push(inputEls.value); 
    }
    else if (inputEls.type === 'select-one') {
        result.push(inputEls.value); 
    }
    else {
        for (let el of inputEls) {
            if (el.checked) {
                result.push(el.dataset.value);
            }
        }
    }
    return result;
}

function attachToForm(html) {
    let controlEl = document.createElement('div');
    controlEl.innerHTML = html;
    controlWrapperEl.append(controlEl);
    if (controlWrapperEl.children.length > 1) {
        controlWrapperEl.firstElementChild.replaceWith(controlEl); 
    }
}

function isTextControl(control) {
    return (control.type === 'text') ? true : false;
}

function isSelectControl(control) {
    return (control.type === 'select') ? true : false;   
}

function getSelectTypeCase(formElement) {
    return formElement[0].type === 'select-one';    
}

function selectAnswerOrNot(formElement) {
    if (getSelectTypeCase(formElement)){
        return toString(extractAnswersListValue(formEl.elements[0]));
    }
    return toString(extractAnswersListValue(formEl.elements[FIELD_NAME]));
}


function extractStringToArray(str) {
    let currentLetter = 0;
    let currentComma = 0;
    let resultedArray = [];
    for (let i = 0; i < str.length; i++) {
        if (str[i] === ',') {
            currentComma = i;
            resultedArray.push(str.slice(currentLetter,currentComma));
            currentLetter = i + 1;
        }
    }
    resultedArray.push(str.slice(currentComma+1,str.length));
    return resultedArray;
}


// in checkbox case when we have more than one answer and answers are separated by commas
function isAnyCommas(str) {
    return str.indexOf(',') !== -1;
}

function generateDynamicForm(element,elementsSize) {
    let controlEl = {};
    let controlHTML = '';
    let selectHTML = '';
    if (isTextControl(element)) {
        controlEl = new TextControl(element);
        controlHTML += controlEl.generateTextControl();
    }
    else if (isSelectControl(element)) {
        controlEl = new SelectControl(element); 
        for (let answer of element.answers) {
            selectHTML += controlEl.generateOption(answer.title,answer.value);
        } 
        controlHTML += controlEl.generateSelectControl(selectHTML);
    }
    else {
        controlEl = new InputTypedControl(element);
        for (let answer of element.answers) {
            controlHTML += controlEl.generateInputTypedControl(answer.title,answer.value);
        }
    }
    let container = generateControlContainer(element,controlHTML,elementsSize);
    attachToForm(container);
}

function generatePrevSelect(selectHTML,element,prevAnswer) {
    controlEl = new SelectControl(element); 
        for (let answer of element.answers) {
            if (toString(prevAnswer) === answer.value) {
                selectHTML += controlEl.generateSelectedOption(answer.title,prevAnswer);
            }
            else {
                selectHTML += controlEl.generateOption(answer.title,answer.value);    
            }
        } 
        return controlEl.generateSelectControl(selectHTML);
}

function generatePrevCheckboxes(element,controlEl,prevAnswer) {
    let checkboxControl = '';
    let currentQuestionAnswers = extractStringToArray(toString(prevAnswer));
    for (let answer of element.answers) {
        for (let elem of currentQuestionAnswers) {
            if (elem === toString(answer.value)) {
                checkboxControl += controlEl.generateFilledInputTypedControl(answer.title,answer.value);
                break;
            }   
            if (currentQuestionAnswers.indexOf(toString(answer.value)) === -1) {
                checkboxControl += controlEl.generateInputTypedControl(answer.title,answer.value);
                break; 
            } 
        }   
    }
    return checkboxControl;
}

function generatePrevRadios(element,controlEl,prevAnswer) {
    let radioControl = '';
    for (let answer of element.answers) {
        if (toString(prevAnswer) === toString(answer.value)) {
            radioControl  += controlEl.generateFilledInputTypedControl(answer.title,answer.value);
        } 
        else {
            radioControl  += controlEl.generateInputTypedControl(answer.title,answer.value);   
        }   
    }
    return radioControl;
}

function generateDynamicFilledForm(element,elementsSize,prevAnswer) {
    let controlEl = {};
    let controlHTML = '';
    let selectHTML = '';
    if (isTextControl(element)) {
        controlEl = new TextControl(element);
        controlHTML += controlEl.generateFilledTextControl(prevAnswer);
    }
    else if (isSelectControl(element)) {
        controlHTML += generatePrevSelect(selectHTML,element,prevAnswer);
    }
    if (!isSelectControl(element) && !isTextControl(element)) {
        controlEl = new InputTypedControl(element);
        if (isAnyCommas(toString(prevAnswer))) {
            controlHTML += generatePrevCheckboxes(element,controlEl,prevAnswer);
        }
        else {
            controlHTML += generatePrevRadios(element,controlEl,prevAnswer);
        }
    }
    let container = generateControlContainer(element,controlHTML,elementsSize);
    attachToForm(container);
}


function checkTheAnswer(answer,value) {
    return (value === answer) ? true : false;
}


function stringValidation(text) {
    return (typeof text) === 'string';
}

function rewriteData(resultsArray,actualAnswers) {
    delete resultsArray[resultsDataLength(resultsArray)];
    actualAnswers.splice(actualAnswers.length-1,1);
}

function toString(answer) {
    return String(answer);
}

function addAnswerToFinalResults(userAnswer) {
    let formElement = formEl.elements;
    let index = resultsDataLength(allResults);
    let currentAnswerArray = [];
    userAnswer = selectAnswerOrNot(formElement);
    if(!inputValidation(userAnswer)) {
        return;
    }
    else {
        let checkUserAnswer = checkTheAnswer(userAnswer,questionsArray[index].answer); 
        allResults[String(index+1)] = String(checkUserAnswer);
        currentAnswerArray.push(userAnswer);
        currentAnswers.push(currentAnswerArray);
    }
}

function inputValidation(answer) {
    return (stringValidation(answer)) ? (answer.trim() !== '') : (toString(answer).trim() !== '');
}

function resultsDataLength(data) {
    return Object.keys(data).length;
}

function createTableRow(prop,value) {
    if (value === 'true') {
        return `<tr><td>${prop}</td><td>Верно</td></tr>`;
    }
    else {
        return `<tr><td>${prop}</td><td>Неверно</td></tr>`;   
    }
}


function createTableContainer(row) {
    return `<table class="custom-table">
                <tbody>
                    <tr><th>Номер вопроса</th><th>Результат</th></tr>
                    ${row}
                </tbody>
            </table>
            <a class='backToIndex' href='index.html'>На главную</a>`;
}


function showTable(obj) {
    let tableHTML = '';
    for (let elem in obj) {
            tableHTML += createTableRow(elem,obj[elem]);
        }
    let container = createTableContainer(tableHTML);
    attachToForm(container);
}


function getQuestionsData(data) {
    let questionsCounter = 0;
    while (hasNextQuestion(data.questions,questionsCounter)) {
        questionsArray.push(data.questions[questionsCounter]);
        questionsCounter++; 
    }    
}

function addWarning(formElement,warningMessage) {
    formElement.insertAdjacentHTML('afterend', `<strong class="error">*${warningMessage}</strong>`);  
    hideUnwantedWarnings(questionBlock,2);
}

function hideUnwantedWarnings(domElem,index) {
    if (domElem.children.length > index) {
        domElem.children[index].innerHTML = '';
    }   
}

function runQuiz(data) {
    generateDynamicForm(data.questions[0],data.questions.length);    
}


function getDataAndRunQuiz() {
    fetch("../assets/scripts/sample.json")
    .then((resp) => {
	   	return resp.json();
	})
	.then((data) => {
        getQuestionsData(data);
        runQuiz(data);
    });
}


getDataAndRunQuiz(); 


formEl.addEventListener('submit', (event) => {
    event.preventDefault();
    let userAnswer = toString(extractAnswersListValue(formEl.elements[FIELD_NAME]));
    addAnswerToFinalResults(userAnswer);
    if (!inputValidation(userAnswer)) {
        addWarning(formEl,"Введите ответ корректно");
    }
    else {
        if (hasNextQuestion(questionsArray,resultsDataLength(allResults))) {
            showNextQuestion(questionsArray);
        }
        else {
            showTable(allResults);
        }
    } 
});

formEl.addEventListener('reset', (event) => {
    event.preventDefault();
    let answer = currentAnswers[currentAnswers.length-1];
    if (hasNextQuestion(questionsArray,resultsDataLength(allResults)-1)) {
        rewriteData(allResults,currentAnswers);
        showPrevQuestion(questionsArray,answer);
    }   
    else {
        addWarning(formEl,"Нет предыдущего вопроса");
    }
});