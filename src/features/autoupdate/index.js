export function init () {
  'use strict';
  console.log('22222222222')
  let delay = 5000; // начальная задержка в миллисекундах
  let intervalId;

  // Функция для получения новой страницы
  function fetchPage(url) {
    return fetch(url).then(response => response.text());
  }

  // Функция парсинга HTML и получения tbody
  function parseNewTable(html) {
    let parser = new DOMParser();
    let doc = parser.parseFromString(html, 'text/html');
    return doc.querySelector('table.heat-result tbody');
  }

  // Функция обновления таблицы
  function updateTable() {
    let table = document.querySelector('table.heat-result');
    table.classList.add('updating');

    fetchPage(window.location.href)
      .then(html => {
        let newTableBody = parseNewTable(html);
        let currentTableBody = document.querySelector('table.heat-result tbody');

        if (newTableBody && currentTableBody) {
          currentTableBody.replaceWith(newTableBody.cloneNode(true));
          animateNewContent(newTableBody);
        }
      })
      .catch(err => console.error('Ошибка загрузки страницы:', err))
      .finally(() => {
        table.classList.remove('updating');
      });
  }

  // Функция анимации нового содержимого
  function animateNewContent(element) {
    element.style.opacity = 0;
    setTimeout(() => element.style.opacity = 1, 500);
  }

  // Функция старта/остановки автообновления
  function toggleAutoUpdate() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
      updateButton.innerText = 'Запустить автообновление';
    } else {
      intervalId = setInterval(updateTable, delay);
      updateButton.innerText = 'Остановить автообновление';
    }
  }

  // Проверка, чтобы не добавить элементы повторно
  if (document.getElementById('autoUpdateButton')) return;

  // Функция создания интерфейса
  function createUI() {
    updateButton = document.createElement('button');
    updateButton.id = 'autoUpdateButton';
    updateButton.innerText = 'Запустить автообновление';
    styleElement(updateButton, {
      position: 'fixed', top: '10px', right: '10px', zIndex: '9999',
      padding: '10px 20px', background: '#28a745', color: '#fff',
      border: 'none', borderRadius: '5px', cursor: 'pointer'
    });
    document.body.appendChild(updateButton);
    updateButton.onclick = toggleAutoUpdate;

    let input = document.createElement('input');
    input.id = 'autoUpdateDelay';
    input.type = 'number';
    input.value = delay;
    styleElement(input, {
      position: 'fixed', top: '10px', right: '180px', zIndex: '9999',
      padding: '10px', border: '1px solid #ccc', borderRadius: '5px'
    });
    document.body.appendChild(input);

    input.onchange = () => {
      delay = parseInt(input.value, 10) || 5000;
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = setInterval(updateTable, delay);
      }
    };
  }

  // Вспомогательная функция стилизации
  function styleElement(element, styles) {
    Object.assign(element.style, styles);
  }

  // Добавление стилей анимации
  function addStyles() {
    let style = document.createElement('style');
    style.innerHTML = `
            .updating { animation: pulse-border 1s infinite; }
            @keyframes pulse-border {
                0% { border: 2px solid rgba(40, 167, 69, 0.1); }
                50% { border: 2px solid rgba(40, 167, 69, 0.8); }
                100% { border: 2px solid rgba(40, 167, 69, 0.1); }
            }
        `;
    document.head.appendChild(style);
  }

  // Инициализация
  let updateButton;
  createUI();
  addStyles();
}
