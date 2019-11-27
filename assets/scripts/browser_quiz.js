let formEl = document.querySelector('.question');
let controlWrapperEl = formEl.querySelector('.js-form-control');
const FIELD_NAME = "answer";

function generateTextControl({type}) {
    return `
        <input type="${type}" class="input-${type}" placeholder="Ответ">
    `;
}

function generateControl({type,question_text,answers},index) {
    return `
            <label class="${type}-row">
                <input type="${type}" name="${FIELD_NAME}" data-value="${answers[index].value}" class="${type}-input">
                <span class="${type}-variant"></span>
                    ${answers[index].title}  
            </label>            
   `;
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
            <button class="question-btn back-btn"><i class="fas fa-arrow-left"></i></button>
            <span class="question-number"> Вопрос: ${id}/${size}.</span>
            <button class="question-btn next-btn" type="submit">
                <i class="fas fa-arrow-right"></i>
            </button>
        </div>   
    `;    
}

/*function extractCheckboxListValue(checkboxEls) {
    let result = [];
    for (let el of checkboxEls) {
        if (el.checked) {
            result.push(el.dataset.value);
        }
    }

    return result;
}*/

function attachToForm(html) {
    let controlEl = document.createElement('div');
    controlEl.innerHTML = html;
    controlWrapperEl.append(controlEl);
}

function generateDynamicForm(elements) {
    let controlHTML = '';
    if (elements.type === 'text') {
        controlHTML += generateTextControl(elements);
    }
    else{
        for (let answer in elements.answers) {
            controlHTML += generateControl(elements,answer);
        }
    }
    let container = generateControlContainer(elements,controlHTML,elements.length);
    console.log(controlHTML);
    attachToForm(container);
}

let runQuiz = () => {
    fetch("../assets/scripts/sample.json")
    .then((resp) => {
	   	return resp.json();
	})
	.then((data) => {
        generateDynamicForm(data.questions[2]);
    });
}
runQuiz(); 