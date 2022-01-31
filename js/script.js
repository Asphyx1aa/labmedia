"use strict";

const URL = 'https://5ebbb8e5f2cfeb001697d05c.mockapi.io/users';

const checkForIE = () => {
    const ua = navigator.userAgent;
    let isIE = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
    console.log(isIE);

}
checkForIE();

async function loadUser(url) {
    try {
        const response = await fetch(url);
        const userData = await response.json();
        drawTable(userData);

    } catch(err) {
        console.error(err);
    }
}

const drawTable = users => {
    const tableData = document.querySelector('#table-body');

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

const searchUser = (name, email) => {
    const input = document.querySelector('#form-input');
}

loadUser(URL);

