<template>
  <div class="main">
    <div class="container p-3">
      desenvolvimento futuro
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>
.main {
  width: 30%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  list-style: none;
  /* From https://css.glass */
  background: rgba(255, 255, 255, 0.52);
  border-radius: 0px 16px 16px 0px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(14.3px);
  -webkit-backdrop-filter: blur(14.3px);
}

@media screen and (max-width: 1200px) {
  .main {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;
    background-color: #ffaaf052;
    border-radius: 25px;
  }
  .title {
    color: #ffff;
  }
}
</style>