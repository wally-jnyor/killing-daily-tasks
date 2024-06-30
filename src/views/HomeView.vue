<template>
  <main>
    <TheWelcome />
    <TasksView />
  </main>
</template>

<script setup>
import TheWelcome from '../components/TheWelcome.vue'
import TasksView from '../components/TasksView.vue'
</script>

<style scoped>
main {
  width: 100%;
  height: 100%;
  display: flex;
  /*background-image: url('../../public/img/imgd.jpg');*/
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
