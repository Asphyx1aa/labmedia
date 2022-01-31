"use strict";

const URL = 'https://5ebbb8e5f2cfeb001697d05c.mockapi.io/users';

let users = [];

const input = document.getElementById('form-input');

const searchForm = document.getElementById('search-form');
const clearButton = document.getElementById('search-button');

clearButton.addEventListener('click', e => {
    e.preventDefault();

    input.value = '';
    drawTable(users);
})
console.log(input)

input.addEventListener('keydown', e => {
    const inputValue = e.target.value.trim() + 1;
    console.log(inputValue.length)
    if (inputValue.length === 0) {
        searchForm.classList.remove('user-form_active');
        clearButton.classList.remove('user-form__clear_active');
    } else {
        searchForm.classList.add('user-form_active');
        clearButton.classList.add('user-form__clear_active');
    }
})

async function loadUser(url) {
    try {
        const response = await fetch(url);
        users = await response.json();
        drawTable(users);

    } catch(err) {
        console.error(err);
    }
}

const drawTable = users => {
    const tableData = document.querySelector('#table-body');
    tableData.innerHTML = '';

    for (let i = 0; i < users.length; i++) {
        const userRow = `<tr>
                            <td>${users[i].username}</td>
                            <td>${users[i].email}</td>
                            <td>${users[i].registration_date}</td>
                            <td>${users[i].rating}</td>
                            <td class="delete">X</td>
                         </tr>
        `;
        tableData.innerHTML += userRow;
    }
}

const searchUser = e => {
    e.preventDefault();
    const searchValue = e.target.value.toLowerCase();
    const filtered = users.filter(user => {
        return user.username.toLowerCase().includes(searchValue) || user.email.toLowerCase().includes(searchValue);
    });
    console.log(filtered);
    drawTable(filtered);
}



input.addEventListener('keyup', searchUser);

const showModal = () => {
    document.querySelector('')
}

loadUser(URL);
