// Alejandro Reina Custodio DAW2

const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

// Vector para almacenar los usuarios
let userList = [];

// Función que obtiene de la API un nombre aleatorio y genera una cantidad de dinero aleatoria con un máximo de 1,000,000
async function getRandomUser() {
  let res = await fetch('https://randomuser.me/api');
  let data = await res.json();
  let user = data.results[0];

  const randomMoney = Math.floor(Math.random() * 1000000) + 1;

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: randomMoney,
  };

  addData(newUser);
}

// Función que añade un objeto (usuario) a la userList y actualiza el DOM
function addData(obj) {
  userList.push(obj);
  updateDOM();
}

// Función que multiplica por 2 el dinero que tenga cada usuario y actualiza el DOM
function doubleMoney() {
  userList = userList.map(user => ({
    ...user,
    money: user.money * 2,
  }));

  updateDOM();
}

// Función que ordena de mayor a menor los usuarios en función de la cantidad de dinero que tengan,
// cuanto más dinero tengan, más arriba de la lista estarán. Actualiza el DOM
function sortByRichest() {
  userList.sort((a, b) => b.money - a.money);
  updateDOM();
}

// Filtra los usuarios que tengan o superen el millón de euros y los muestra, desapareciendo temporalmente
// los usuarios que no lleguen a la cifra. Actualiza el DOM
function showMillionaires() {
  const millionaires = userList.filter(user => user.money >= 1000000);
  updateDOM(millionaires);
}

// Función que calcula el total de dinero que hay entre todos los usuarios, sumando la cantidad de cada uno 
// y mostrando el resultado. 
function calculateWealth() {
  const wealth = userList.reduce((total, user) => total + user.money, 0);
  const wealthElement = document.createElement('div');
  wealthElement.innerHTML = `<h3>Total de dinero: <strong>${formatMoney(wealth)}</strong></h3>`;
  main.appendChild(wealthElement);
}

// Función que se encarga de actualizar la representación en el DOM de la 
// página web en función de la lista de usuarios proporcionada como argumento (users).
function updateDOM(users = userList) {
  main.innerHTML = '<h2><strong>Persona</strong> Dinero</h2>';

  users.forEach(user => {
    const userElement = document.createElement('div');
    userElement.classList.add('user');
    userElement.innerHTML = `<strong>${user.name}</strong> ${formatMoney(user.money)}`;
    main.appendChild(userElement);
  });
}

// Función que únicamente se encarga de darle formato a la cantidad del dinero.
function formatMoney(number) {
  return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + '€';
}

// Eventos con la acción de 'click' establecida, para que funcionen los botones.
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);

// Inicia la página, y obtiene un usuario aleatorio al iniciarse.
getRandomUser();