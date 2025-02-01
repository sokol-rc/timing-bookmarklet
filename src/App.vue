<template>
  <auto-update></auto-update>
  <pit-table></pit-table>
  <div class="container">
    <h1>Установка букмарклета</h1>
    <p>Перетащите кнопку ниже в панель закладок вашего браузера:</p>
    <a :href="bookmarkletCode" class="bookmarklet-button">Добавить букмарклет</a>
    <h2>Как пользоваться?</h2>
    <p>Перейдите на нужную страницу и нажмите на закладку.</p>
  </div>
<!--  <video-editing-tools />-->
</template>

<script setup>
import AutoUpdate from "./components/AutoUpdate.vue"
import VideoEditingTools from "./components/VideoEditingTools.vue"
// import PitTable from "./components/PitTable.vue"
const githubPagesUrl = window.location.origin;
const scriptUrl = `${githubPagesUrl}/assets/script.js`;
const bookmarkletCode = `javascript:(function(){
  var d = document,
      s = d.createElement('script');
  if (!d.getElementById('app')) {
    var appDiv = d.createElement('div');
    appDiv.id = 'app';
    d.body.appendChild(appDiv);
  }
  s.src = '${scriptUrl}';
  d.body.appendChild(s);
})();`;
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}
.bookmarklet-button {
  display: inline-block;
  padding: 10px 15px;
  background: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  margin-top: 10px;
  cursor: pointer;
}
</style>
