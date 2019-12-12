//(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

let restService = new RestService();
let dataEl = document.querySelector('.tableArea');

function generateConfirm() {
    return confirm("Удалить вопрос?");
}

function removePost(id) {
    let sureToDelete = generateConfirm();
    if (sureToDelete) {
        restService.remove(`questions/${id}`).then(
            () => printAll()
        );
    }
}

function generateRow(id,{question_text, answer}) {
    return `
        <tr>
            <th scope="row">${id}</th>
            <td>${question_text}</td>
            <td>${answer}</td>
            <td>
                <button class="btn btn-outline-danger rounded-pill question-table-link" onclick="removePost(${id})">
                    <i class="far fa-trash-alt"></i>
                </button>
            </td>                
        </tr>
    `;
}

function generateTable(rows) {
    return `
    <table class="table table-responsive">
      	<thead>
      	    <tr>
                <th scope="col" data-translate="ID">Номер</th>
                <th scope="col" data-translate="QUESTION">Вопрос</th>
                <th scope="col" data-translate="ANSWER">Ответ</th>
                <th scope="col" data-translate="ACTIONS">Действия</th>
      	    </tr>
        </thead>
        <tbody>
      	    ${rows}      
        </tbody>
    </table>
    `
}

// fetch('http://localhost:3000/questions').then((response) => {
//         return response.json();
//     }).then((data) => {
//         let elems = [];
//         let countElems = 0;
//         for (let elem in data) {
//             elems.push(elem);
//         }
//         for (let elem of data) {
//             elem.id = elems[countElems]+1;
//             countElems++;
//         }
//     })

function printAll() {
    restService.getAll(`questions/`).then(
        (data) => {
            let elems = [];
            let countElems = 0;
            for (let elem in data) {
                elems.push(elem);
            }
            let rows = data.map((item) => generateRow(item.id,item)).join('');
            dataEl.innerHTML = generateTable(rows);
        }
    );
}

printAll();
//},{}]},{},[1]);
