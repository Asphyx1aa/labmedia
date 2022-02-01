"use strict";

const URL = 'https://5ebbb8e5f2cfeb001697d05c.mockapi.io/users';

let users = [];
const tableData = document.querySelector('#table-body');

const input = document.getElementById('form-input');

const searchForm = document.getElementById('search-form');
const clearButton = document.getElementById('search-button');
const deleteButton = document.getElementById('delete');
const modalWindow = document.getElementById('modal');
const sortButtonRating = document.getElementById('sort-rating');
const sortButtonDate = document.getElementById('sort-date');



clearButton.addEventListener('click', e => {
    e.preventDefault();

    input.value = '';
    drawTable(users);
})

input.addEventListener('keydown', e => {
    const inputValue = e.target.value.trim();
    if (inputValue === 0) {
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

    tableData.innerHTML = '';

    for (let i = 0; i < users.length; i++) {
        let date = new Date(users[i].registration_date);
        date = date.toLocaleDateString();
        const userRow = `<tr>
                            <td>${users[i].username}</td>
                            <td>${users[i].email}</td>
                            <td>${date}</td>
                            <td id="rating">${users[i].rating}</td>
                            <td id="delete" class="delete">X</td>
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
    drawTable(filtered);
}

/*deleteButton.addEventListener('click', () => {
    let isActive = false;

    if(!isActive) {
        modalWindow.classList.add('modal_active');
    }
});*/
input.addEventListener('keyup', searchUser);


let isAsc = false;

const sortByRating = () => {
    isAsc = !isAsc;
    let sortedByRating = users.sort((a, b) => {
        return (isAsc ? a.rating - b.rating : b.rating - a.rating);
    })
    drawTable(sortedByRating);
}

const sortByDate = () => {
    isAsc = !isAsc;
    let sortedByDate = users.sort((a, b) => {
        return (isAsc ? new Date(a.registration_date) - new Date(b.registration_date): new Date(b.registration_date) - new Date(a.registration_date));
    })
    drawTable(sortedByDate);
}

const pagination = () => {
    const paginationCount = document.getElementById('pagination');
    let itemPerPage = 5;
    let totalPages = Math.ceil(users.length / itemPerPage);
    let items = [];
    for (let i = 0; i < itemPerPage; i++) {
        items.push(users[i]);
    }
    drawTable(items);
    console.log(totalPages);
}

sortButtonDate.addEventListener('click', sortByDate);
sortButtonRating.addEventListener('click', sortByRating);



loadUser(URL)
    .then(pagination);