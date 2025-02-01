<template>
  <div class="form-wrapper">
    <input
        type="number"
        v-model="delay"
        class="delay-input"
    />
    <button @click="toggleAutoUpdate" :class="['update-button', { 'in-process': isAutoUpdating }]">
      {{ isAutoUpdating ? 'Остановить автообновление' : 'Запустить автообновление' }}
    </button>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const delay = ref(5000);
const isAutoUpdating = ref(false);
const isUpdating = ref(false);
let intervalId = null;

onMounted(() => {
  const savedState = localStorage.getItem('autoUpdateState');
  if (savedState) {
    const { autoUpdateEnabled, savedDelay } = JSON.parse(savedState);
    isAutoUpdating.value = autoUpdateEnabled;
    delay.value = savedDelay;
    if (isAutoUpdating.value) {
      startAutoUpdate()
    }
  }
});

const startAutoUpdate = () => {
  intervalId = setInterval(updateTable, delay.value);
  isAutoUpdating.value = true;
  setUpdatingAnimationClass()
  saveStateToLocalStorage()
}

const stopAutoUpdate = () => {
  clearInterval(intervalId);
  intervalId = null;
  isAutoUpdating.value = false;
  removeUpdatingAnimationClass()
  localStorage.removeItem('autoUpdateState');
}

const toggleAutoUpdate = () => {
  if (intervalId) {
    stopAutoUpdate()
  } else {
    startAutoUpdate()
  }
};

const removeUpdatingAnimationClass = () => {
  const element = document.querySelector('table.heat-result.updating');
  if (element) {
    element.classList.remove('updating');
  }
}

const setUpdatingAnimationClass = () => {
  const element = document.querySelector('table.heat-result');
  if (element) {
    element.classList.add('updating');
  }
}

const updateTable = async () => {
  const table = document.querySelector('table.heat-result');
  if (!table) return;

  isUpdating.value = true;

  try {
    const response = await fetch(window.location.href);
    const html = await response.text();
    const newTableBody = parseNewTable(html);
    const currentTableBody = document.querySelector('table.heat-result tbody');

    if (newTableBody && currentTableBody) {
      currentTableBody.replaceWith(newTableBody.cloneNode(true));
      animateNewContent(newTableBody);
    }
  } catch (err) {
    console.error('Ошибка загрузки страницы:', err);
  } finally {
    isUpdating.value = false;
  }
};

const parseNewTable = (html) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  return doc.querySelector('table.heat-result tbody');
};

const animateNewContent = (element) => {
  element.style.opacity = 0;
  setTimeout(() => {
    element.style.opacity = 1;
  }, 500);
};

const saveStateToLocalStorage = () => {
  const state = {
    autoUpdateEnabled: isAutoUpdating.value,
    savedDelay: delay.value,
  };
  localStorage.setItem('autoUpdateState', JSON.stringify(state)); // Сохраняем состояние в localStorage
};
</script>

<style>
.form-wrapper {
  display: flex;
  gap: 20px;
  padding: 0 12px;
}
.update-button {
  padding: 10px 20px;
  background: #28a745;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.update-button.in-process {
  background: #e74c3c;
}

.delay-input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
table.heat-result.updating {
  animation: pulse-border 1s infinite;
}

@keyframes pulse-border {
  0% {
    border: 2px solid rgba(40, 167, 69, 0.1);
  }
  50% {
    border: 2px solid rgba(40, 167, 69, 0.8);
  }
  100% {
    border: 2px solid rgba(40, 167, 69, 0.1);
  }
}
</style>
