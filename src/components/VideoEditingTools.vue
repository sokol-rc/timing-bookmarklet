<template>
  <div>
    <!-- Кнопка "Инструменты для видеомонтажа" -->
    <n-button @click="handleVideoToolsClick">Инструменты для видеомонтажа</n-button>

    <!-- Dropdown кнопка -->
    <n-dropdown trigger="click" :options="dropdownOptions">
      <n-button>Dropdown</n-button>
    </n-dropdown>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { NButton, NDropdown } from 'naive-ui';

// Массив опций для dropdown меню
const dropdownOptions = ref([
  {
    label: 'Пункт 1',
    key: 'option1',
    onClick: () => alert('Пункт 1 выбран'),
  },
  {
    label: 'Пункт 2',
    key: 'option2',
    onClick: () => alert('Пункт 2 выбран'),
  },
]);

// Функция для обработки клика по кнопке "Инструменты для видеомонтажа"
const handleVideoToolsClick = () => {
  alert('Инструменты для видеомонтажа');
};

// Функция для добавления строки с кнопками между 2-й и 3-й строками в thead
const addRowToThead = () => {
  const table = document.querySelector('.heat-result');
  if (table) {
    const thead = table.querySelector('thead');
    if (thead) {
      const rows = Array.from(thead.rows);
      if (rows.length >= 2) {
        const newRow = document.createElement('tr');

        // Добавляем ячейки с кнопками для каждого столбца
        const columnCount = rows[0].cells.length; // Получаем количество столбцов
        for (let i = 0; i < columnCount; i++) {
          const th = document.createElement('th');
          const button = document.createElement('button');
          button.textContent = `Кнопка ${i + 1}`;
          button.classList.add('n-button'); // Добавляем класс для стилей Naive UI
          th.appendChild(button); // Добавляем кнопку в ячейку
          newRow.appendChild(th);
        }

        // Вставляем новую строку между второй и третьей строками
        thead.insertBefore(newRow, rows[2]);
      }
    }
  }
};

// Монтирование компонента и добавление строки
onMounted(() => {
  addRowToThead();
});
</script>

<style scoped>
/* Добавим стили для кнопок в таблице, если нужно */
.n-button {
  padding: 5px 10px;
  font-size: 14px;
  background-color: #2e8b57; /* Пример цветовой схемы */
  border-radius: 4px;
  border: none;
  cursor: pointer;
}

.n-button:hover {
  background-color: #3cb371; /* Цвет при наведении */
}
</style>
