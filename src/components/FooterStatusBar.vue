<script setup>

</script>

<template>
  <div class="footer">
    <nav class="navBar">
      <li class="navigationList">
        <RouterLink to="/">Geral</RouterLink>
      </li>
      <li class="navigationList">
        <RouterLink to="/quests">Missions</RouterLink>
      </li>
      <li class="navigationList">
        <RouterLink to="/bag">Completed</RouterLink>
      </li>
      <li class="navigationList">
        <RouterLink to="/about">About</RouterLink>
      </li>
    </nav>
  </div>
</template>

<style scoped>
.footer {
  height: 5rem;
  width: 100%;
  display: flex;
  align-items: end;
}
li {
  list-style: none;
  width: 5rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 10px 0 10px;
}
.navBar {
  display: flex;
  width: 100%;
  height: 70%;
}

@media screen and (max-width: 1200px) {
  .navBar {
    display: flex;
    justify-content: center;
  }
}
</style>