<template>
  <main>
    <TasksView />
  </main>
</template>

<script setup>
import TasksView from '../components/TasksView.vue'
</script>

<style scoped>
main {
  width: 100%;
  height: 100vh;
  display: flex;
  /*background-image: url('../../public/img/train.jpg');
  background-repeat: no-repeat;
  background-size: cover; */
}

@media screen and (max-width: 1200px) {
  main {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    /*padding: 10px 10px 10px 10px;*/
  }
}
</style>
