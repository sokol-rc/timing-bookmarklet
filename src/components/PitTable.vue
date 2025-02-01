<template>
  <div class="btn-wrapper">
    <button class="dashboard-btn" @click="isDrawerVisible = true">PITLANE STATEGY</button>
  </div>
  <n-drawer v-model:show="isDrawerVisible" :width="502" placement="right">
    <n-drawer-content title="PITLANE STATEGY">
      <div class="dashboard">
        <div class="pitlane">
          <h3>Питлейн</h3>
          <div class="pit">
            <VueDraggableNext v-model="pitlaneCarts" :group="{ name: 'carts' }" class="pit-place">
              <div v-for="cart in pitlaneCarts" :key="cart.id" class="kart">
                <div class="cart-number">Карт {{ cart.id }}</div>
              </div>
            </VueDraggableNext>
          </div>
        </div>

        <!-- Таблица команд и карт -->
        <div class="table">
          <div class="columns">
            <div class="teams">
              <div v-for="(team, index) in teams" :key="index" class="team">
                <h3 class="team-cell">{{ team.name }}</h3>
                <VueDraggableNext v-model="team.carts" :group="{ name: 'carts'}"
                                  class="team-cell">
                  <div v-for="cart in team.carts" :key="cart.id" class="kart">
                    <div class="cart-number">Карт {{ cart.id }}</div>
                  </div>
                </VueDraggableNext>
              </div>
            </div>
          </div>
        </div>

        <!-- Легенда -->
        <div class="legend">
          <div class="legend-item">
            <div class="fast"></div>
            <span>Быстрый карт</span>
          </div>
          <div class="legend-item">
            <div class="medium"></div>
            <span>Средний карт</span>
          </div>
          <div class="legend-item">
            <div class="slow"></div>
            <span>Медленный карт</span>
          </div>
        </div>
      </div>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup>
import { ref } from "vue";
import { VueDraggableNext } from "vue-draggable-next";
import {NDrawer, NDrawerContent} from 'naive-ui'

const isDrawerVisible = ref(false);

const pitlaneCarts = ref([
  { id: 8 },
  { id: 10 },
]);

const teams = ref([
  {
    name: `Apex motors`,
    carts: [{ id: 1 }],
  },
  {
    name: `Apex motors Nova`,
    carts: [{ id: 2 }],
  },
  {
    name: `Mira`,
    carts: [{ id: 3 }],
  },
  {
    name: `Rookies`,
    carts: [{ id: 4 }],
  },
  {
    name: `Griphunters`,
    carts: [{ id: 5 }],
  },
]);
</script>

<style scoped>
.btn-wrapper {
  padding: 12px;
}
.dashboard-btn {
  padding: 10px 20px;
  background: #2080f0;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.dashboard {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.pitlane {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.pit {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

.pit-place {
  display: flex;
  gap: 10px;
}

.kart {
  background-color: #eee;
  padding: 20px;
  border-radius: 8px;
  width: 100px;
  text-align: center;
  margin-bottom: 10px;
}

.table {
  display: flex;
  flex-direction: column;
}

.columns {
  display: flex;
  gap: 20px;
}

.teams{
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-bottom: 1px solid black;
}

.team {
  display: flex;
}
.team-cell {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.legend {
  display: flex;
  gap: 20px;
  margin-top: 20px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.legend-item div {
  width: 16px;
  height: 16px;
  border-radius: 4px;
}

.fast {
  background-color: #4caf50;
}

.medium {
  background-color: #ffeb3b;
}

.slow {
  background-color: #f44336;
}
</style>
