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

function toNumber(value) {
    return Number(value);
}

function areAllPositionsCorrect(data) {
    let flag = true;
    let currentId = 0;
    for (let elem of data) {
        if ((elem.id - currentId) > 1) {
            flag = false;
            break;
        }
        currentId = elem.id;
    }
    return flag;
}  

function removePost(id) {
    let sureToDelete = generateConfirm();
    if (sureToDelete) {
        restService.remove(`questions/${id}`).then(() => document.location.href = 'question-table.html');
    }
}

function generateRow(number,{question_text, id, answer}) {
    return `
        <tr>
            <th scope="row">${number}</th>
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

function generateTable(tableTitle, rows) {
    return `
    <h2>${tableTitle}</h2>   
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

function getAllTestTitles(data,allTestsNames) {
    for (let elem of data) {
        if (allTestsNames.indexOf(elem.testTitle) === -1) {
            allTestsNames.push(elem.testTitle);
        }
    }
}

function generateRowsForCurrentTest(data,rows,counter,currentTitle) {
    for (let elem of data) {
        if (elem.testTitle === currentTitle) {
            counter++;
            rows += generateRow(counter,elem);
        }
    }    
    return rows;
}

function addTablesToHTML(allTestsNames, allTables) {
    for (let i = 0; i < allTestsNames.length; i++) {  
        let testContainer = document.createElement("div");
        dataEl.append(testContainer);
        testContainer.innerHTML = generateTable(allTestsNames[i],allTables[i]);    
    }
}

function generateTablesForEachTest(allTestsNames,data) {
    let allTables = [];
    for (let title of allTestsNames) {

        let rows = '';
        let result = '';
        let countCurrentTestQuestions = 0;

        rows += generateRowsForCurrentTest(data,result,countCurrentTestQuestions,title);
        allTables.push(rows);
    } 
    return allTables;   
}


function printAll() {
    restService.getAll(`questions/`).then(
        (data) => {
            let allTestsNames = [];
            getAllTestTitles(data,allTestsNames);
            let allTables = generateTablesForEachTest(allTestsNames,data);
            addTablesToHTML(allTestsNames,allTables);
        }
    );
}


printAll();