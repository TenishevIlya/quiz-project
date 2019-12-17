const answersTypes = document.querySelector('.types');
const addBtn = document.querySelector('.addQuestion');
const myForm = document.querySelector('#editQuestion');

class RestService {
    get apiUrl() {
        return 'http://localhost:3000/';
    }

    getAll(endpoint) {
        return fetch(`${this.apiUrl}${endpoint}`)
            .then((response) => response.json())
    }

    createNew(body) {
        return fetch(`${this.apiUrl}`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            },
        })    
    }

    create(endpoint, body) {
        return fetch(`${this.apiUrl}${endpoint}`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            },
        })
    }

    remove(endpoint) {
        return fetch(`${this.apiUrl}${endpoint}`, {
            method: 'DELETE'
        })
    }
}

class Answer {

    constructor(title,value) {
        this.title = title;
        this.value = value;
    }
}

class AnswersCases {

    constructor(cases) {
        this.cases = cases;
    }

    getCases() {
        return this.cases;
    }

    setCases(newCases) {
        this.cases = newCases; 
    }
}


let restService = new RestService();
let allAnswerCases = new AnswersCases();

function getQuestionType() {
    return answersTypes.value;
}

answersTypes.onchange = function(){
    if (!isTextAnswer(answersTypes.value)) {
        allAnswerCases.setCases(generateAnswersVariants());  
    }
}

function generatePrompt(text) {
    return prompt(`${text}`,'');
}

function toNumber(value) {
    return Number(value);
}

function toString(value) {
    return String(value);   
}

function isTextAnswer(answersType) {
    if (answersType === 'text') {
        return true;
    }
}

function generateAnswersVariantsValues(amount,allAnswers) {
    for (let i = 0; i < toNumber(amount); i++) {
        let title = generatePrompt("Вариант");
        let value = generatePrompt("Значение");
        let currentAnswer = new Answer(title,value);
        allAnswers.push(currentAnswer);
    }
}

function generateAnswersVariants() {
    let allAnswers = [];
    let amount = generatePrompt("Сколько вариантов ответа необходимо?");
    while (amount < 2) {
        alert("Не может быть меньше двух вариантов ответа");
        amount = generatePrompt("Сколько вариантов ответа необходимо?");
    }
    generateAnswersVariantsValues(amount,allAnswers);
    return allAnswers;
}

addBtn.addEventListener('click', function(event) {
    event.preventDefault();
    let formData = new FormData(myForm);

    let postRequest = {
        testTitle: toString(formData.get('testCase')),
        type: answersTypes.value,
        question_text: toString(formData.get('questionText')),
        answer: toString(formData.get('answerText')),
        answers: allAnswerCases.getCases()
    }


    restService.create(`questions`, postRequest).then(
        () => document.location.href = 'question-table.html'
    )

    myForm.reset();
});

// printAll();