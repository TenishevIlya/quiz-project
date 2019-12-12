// const myForm = document.querySelector('#formElem');

// myForm.addEventListener('submit', function(event) {
//     event.preventDefault();

//     const formData = new FormData(this);

//     fetch('http://localhost:3000/forms', {
//         method: 'post',
//         body: formData
//     }).then(function(response) {
//         return response.text();
//     }).then(function(text) {
//         console.log(text);
//     })
// });

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
let createBtnEl = document.querySelector('.js-add');
let dataEl = document.querySelector('.js-data');
let myForm = document.querySelector('#formElem');

function removePost(id) {
    restService.remove(`posts/${id}`).then(
        () => printAll()
    );
}

function generateRow({id, name, surname}) {
    return `
<tr>
    <td>${id}</td>
    <td>${name}</td>
    <td>${surname}</td>
    <td>
        <button type="button" onclick="removePost(${id})">Remove</button>
    </td>
</tr>                
`;
}

function generateTable(rows) {
    return `
<table>
    <thead>
    <tr>
        <th>id</th>
        <th>title</th>
        <th>author</th>
        <th>actions</th>
    </tr>
    </thead>
    <tbody>${rows}</tbody>
</table>
    `
}

function printAll() {
    restService.getAll(`posts/`).then(
        (data) => {
            let rows = data.map((item) => generateRow(item)).join('');
            dataEl.innerHTML = generateTable(rows);
        }
    );
}



createBtnEl.addEventListener('click', () => {
    let formData = new FormData(myForm);
    
    const postRequest = {
        name: formData.get('name'),
        surname: formData.get('surname')
    }

    restService.create(`posts`, postRequest).then(
        () => printAll()
    )
});

printAll();