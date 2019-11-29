// глобальные переменные это ужасно, стоит превращать в ООП по максимуму
// смотри мой код из examples где были классы

/* html elements */
let questionBlock = document.querySelector('.question');
let formEl = document.querySelector('.js-form');
let controlWrapperEl = formEl.querySelector('.js-form-control');

const FIELD_NAME = "answer";

/* data containers */
//let currentQuestion = {};
let questionsArray = [];
let allResults = {};

/* Counters */
let questionsCounter = 0;
let clickQuestionsCounter = 1;
let countWarnings = true;

function hasNextQuestion(obj,i) {
    return (obj[i] !== undefined) ? true : false;

    // вообще достаточно писать так
    // return obj[i] !== undefined
    //
    // но ещё лучше obj.hasOwnProperty(i)
    // имена обеих переменных ужасны, дай им корректные имена
}

// мой eslint говорит что функция не используется. А ещё я вижу почти копипасту прошлой функции
function hasPrevQuestion(obj,i) {
    return (obj[i-1] !== undefined) ? true : false;    
}

function generateControl({type,answers},index) {
    // у функции слишком много обязанностей
    // type === 'text' лучше сделать как isTextControl()
    // далее функции printTextControl(), printRadioControl, printCheckboxControl() стоит разделить
    // здесь не хватает немного ООП в идеале
    if (type === 'text') {
        return `
            <input type="${type}" name="${FIELD_NAME}" class="input-${type}" placeholder="Ответ">
        `;    
    }

    // variant не лучшее имя в программировании, лучше case | type | entity
    return `
            <label class="${type}-row">
                <input type="${type}" name="${FIELD_NAME}" data-value="${answers[index].value}" class="${type}-input">
                <span class="${type}-variant"></span>
                    ${answers[index].title}  
            </label>            
   `;
}

// здесь точно eslint наругает
function generateControlContainer({question_text,id,type},control,size) {
    return `
        <h1 class="" data-translate="QUESTION_№${id}"> Вопрос: №${id} </h1>
        <p class="question-content"> ${question_text} </p>
        <div class="${type}-answers">
            ${control}
        </div>
        <hr>
        <div class="question-navigation">
            <button class="question-btn back-btn" data-direction='back'><i class="fas fa-arrow-left"></i></button>
            <span class="question-number"> Вопрос: ${id}/${size}.</span>
            <button class="question-btn next-btn" type="submit" data-direction='forward'>
                <i class="fas fa-arrow-right"></i>
            </button>
        </div>   
    `;    
}

function extractAnswersListValue(inputEls) {
    let result = [];
    // isTextControl() ещё раз можно переиспользовать
    if (inputEls.type === 'text') { 
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

function generateDynamicForm(elements,elementsSize) {
    let controlHTML = '';
    for (let answer in elements.answers) {
            controlHTML += generateControl(elements,answer);
        }
    let container = generateControlContainer(elements,controlHTML,elementsSize);
    attachToForm(container);
}

function checkTheAnswer(answer,value) {
    if (value === answer) {
        return true
    }
    else {
        return false;
    }   
}

function validateInput(answer) {
    // проверка на тип должна быть отдельно
    // https://stackoverflow.com/questions/4059147/check-if-a-variable-is-a-string-in-javascript
    // и лучше использовать trim()
    // return true:false лучше делать однострочными конструкциями, как я выше описал
    if (String(answer) !== '') {
        return true;
    }
    return false;
}

function createTableRow(obj,prop,value) {
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
            tableHTML += createTableRow(obj,elem,obj[elem]);
            console.log(obj[elem]);
        }
    let container = createTableContainer(tableHTML);
    attachToForm(container);
}

// называется runQuiz, а по факту делает и запрос за данными и генерацию формы и какую-то логику, зарефакторить
// ниже пояснение расширенное
function runQuiz() {
    fetch("../assets/scripts/sample.json")
    .then((resp) => {
	   	return resp.json();
	})
	.then((data) => {
        generateDynamicForm(data.questions[0],data.questions.length);
        while (hasNextQuestion(data.questions,questionsCounter)) {
            questionsArray.push(data.questions[questionsCounter]);
            questionsCounter++; 
        }
    });
}
runQuiz(); 

// крайне большая функция у которой очень много обязанностей.
// стоит выносить много отдельных мелких функций отдельно
// а то у тебя здесь и html и проверка на валидность и цикл по вопросам и т.д., зарефакторить!
// к слову, стоит почитать Боб Мартин Чистый код, можно 2-3 главу, оч полезная инфа за 20-30 мин
formEl.addEventListener('submit', (event) => {
    event.preventDefault();
    let userAnswer = String(extractAnswersListValue(formEl.elements[FIELD_NAME]));

    let checkUserAnswer = checkTheAnswer(userAnswer,questionsArray[clickQuestionsCounter-1].answer); 
    allResults[String(clickQuestionsCounter)] = String(checkUserAnswer);
    if (!validateInput(userAnswer)) {
        if (countWarnings) {
            formEl.insertAdjacentHTML('afterend', '<strong class="error">*Введите ответ корректно</strong>');  
            countWarnings = false;  
        }
    }
    else {
        if (hasNextQuestion(questionsArray,clickQuestionsCounter)) {
            generateDynamicForm(questionsArray[clickQuestionsCounter],questionsCounter);
            clickQuestionsCounter++; 
            if (questionBlock.children.length > 1) {
                questionBlock.children[1].innerHTML = '';
            } 
        }
        else {
            showTable(allResults);
        }
        countWarnings = true;
    }   
});