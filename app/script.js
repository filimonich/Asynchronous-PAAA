'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = ``) {
  const html = `
      <article class="country ${className}">
      <img class="country__img" src="${data.flag}" />
      <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)}</p>
        <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
        <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
        </div>
        </article>
        `;
  countriesContainer.insertAdjacentHTML(`beforeend`, html);
  // countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText(`beforeend`, msg);
  // countriesContainer.style.opacity = 1;
};

// Метод fetch() , относящийся к миксину WindowOrWorkerGlobalScope, запускает процесс извлечения ресурса из сети. Возвращает promise, содержащий Response объект (ответ на запрос).
const request = fetch(`https://restcountries.com/v2/name/portugal`);
console.log(request);

const getJSON = function (url, errorMsg = `Something went wrong`) {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    // Инструкция throw позволяет генерировать исключения, определяемые пользователем. При этом //выполнение текущей функции будет остановлено// (инструкции после throw не будут выполнены), и //управление будет передано в первый блок catch// в стеке вызовов. Если catch блоков среди вызванных функций нет, выполнение программы будет остановлено.

    return response.json();
  });
};

const getCountryData = function (country) {
  // Country 1
  getJSON(`https://restcountries.com/v2/name/${country}`, `Country not found`)
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders?.[0];
      // const neighbour = `fdsakjh`;

      if (!neighbour) throw new Error(`No neighbour found!`);

      // Country 2
      return getJSON(
        `https://restcountries.com/v2/alpha/${neighbour}`,
        `Country not found`
      );
    })

    .then(data => renderCountry(data, `neighbour`))
    .catch(err => {
      console.error(`${err} 💥💥💥`);
      renderError(`Something went wrong  💥💥 ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener(`click`, function () {
  // getCountryData(`portugal`);
  getCountryData(`australia`);
});

// const getCountryData = function (country) {
//   // Country 1
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(response => {
//       console.log(response);

//       if (!response.ok)
//         // Инструкция throw позволяет генерировать исключения, определяемые пользователем. При этом //выполнение текущей функции будет остановлено// (инструкции после throw не будут выполнены), и //управление будет передано в первый блок catch// в стеке вызовов. Если catch блоков среди вызванных функций нет, выполнение программы будет остановлено.
//         throw new Error(`Country not found (${response.status})`);

//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);
//       // const neighbour = data[0].borders[0];
//       // Optional chaining (?.) // Оператор опциональной последовательности
//       // const neighbour = data[0].borders?.[0];
//       const neighbour = `fdsakjh`;

//       if (!neighbour) return;

//       // Country 2
//       return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
//     })
//     // Метод json()интерфейса Responseберет Responseпоток и читает его до конца. Он возвращает обещание, которое разрешается с результатом анализа основного текста как JSON.
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);

//       return response.json();
//     })
//     .then(data => renderCountry(data, `neighbour`))
//     // обработка ошибки // поймать ошибку
//     // Метод catch() возвращает промис (Promise() и работает только в случае отклонения промиса. Ведёт себя аналогично вызову Promise.prototype.then(undefined, onRejected).
//     .catch(err => {
//       console.error(`${err} 💥💥💥`);
//       renderError(`Something went wrong  💥💥 ${err.message}. Try again!`);
//     })
//     // Метод finally() возвращает Promise. Когда промис был выполнен, вне зависимости успешно или с ошибкой, указанная функция будет выполнена. Это даёт возможность запустить один раз определённый участок кода, который должен выполниться вне зависимости от того, с каким результатом выполнился Promise.
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// btn.addEventListener(`click`, function () {
//   getCountryData(`portugal`);
// });

// getCountryData(`portuasdsdfsfadgal`);
