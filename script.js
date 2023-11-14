const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

// Obtener datos de LocalStorage al cargar la página
const storedUserList = localStorage.getItem('userList');
let userList = storedUserList ? JSON.parse(storedUserList) : [];

function getRandomUser() {
  fetch('https://randomuser.me/api')
    .then(res => res.json())
    .then(data => {
      const user = data.results[0];
      const randomMoney = Math.floor(Math.random() * 1000000) + 1;

      const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: randomMoney,
      };

      addData(newUser);
    });
}

function addData(obj) {
  userList.push(obj);
  updateDOM();
  saveToLocalStorage();
}

function doubleMoney() {
  userList = userList.map(user => ({
    ...user,
    money: user.money * 2,
  }));

  updateDOM();
  saveToLocalStorage();
}

function sortByRichest() {
  userList.sort((a, b) => b.money - a.money);
  updateDOM();
  saveToLocalStorage();
}

function showMillionaires() {
  const millionaires = userList.filter(user => user.money >= 1000000);
  updateDOM(millionaires);
}

function calculateWealth() {
  const wealth = userList.reduce((total, user) => total + user.money, 0);
  const wealthElement = document.createElement('div');
  wealthElement.innerHTML = `<h3>Total de dinero: <strong>${formatMoney(wealth)}</strong></h3>`;
  main.appendChild(wealthElement);
}

function updateDOM(users = userList) {
  main.innerHTML = '<h2><strong>Persona</strong> Dinero</h2>';

  users.forEach(user => {
    const userElement = document.createElement('div');
    userElement.classList.add('user');
    userElement.innerHTML = `<strong>${user.name}</strong> ${formatMoney(user.money)}`;
    main.appendChild(userElement);
  });
}

function formatMoney(number) {
  return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + '€';
}

function saveToLocalStorage() {
  localStorage.setItem('userList', JSON.stringify(userList));
}

addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);

// Obtener un usuario aleatorio al cargar la página
getRandomUser();
