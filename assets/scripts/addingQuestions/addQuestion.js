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


let restService = new RestService();
let array = [];

answersTypes.onchange = function(){
    array = generateAnswersVariants();
}

function generatePrompt(text) {
    return prompt(`${text}`,'');
}

function toNumber(value) {
    return Number(value);
}

function generateAnswersVariants() {
    let allAnswers = [];
    let amount = generatePrompt("Сколько вариантов ответа необходимо?");
    for (let i = 0; i < toNumber(amount); i++) {
        let title = generatePrompt("Вариант");
        let value = generatePrompt("Значение");
        let currentAnswer = new Answer(title,value);
        allAnswers.push(currentAnswer);
    }
    return allAnswers;
}

// fetch('http://localhost:3000/').then((response) => {
//         return response.json();
//     }).then((data) => {
//         for (let x in data) {
//             console.log(x);
//         }
//     })

addBtn.addEventListener('click', function(event) {
    event.preventDefault();
    let formData = new FormData(myForm);

    let postRequest = {
        type: answersTypes.value,
        question_text: String(formData.get('questionText')),
        answer: String(formData.get('answerText')),
        answers: array
    }
    

    restService.create(`questions`, postRequest).then(
        () => document.location.href = 'question-table.html'
    )

    myForm.reset();
});

// printAll();