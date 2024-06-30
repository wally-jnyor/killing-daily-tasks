<template>
  <div class="main">
    <div class="searchBox">
      <input type="text" value="" placeholder="Search" />
      <button type="submit">O-</button>
    </div>
  </div>
</template>

<style scoped>
.searchBox {
  display: flex;
  width: 100%;
  border: solid 1px #ffff;
  height: 70%;
  display: flex;
  justify-content: space-between;
}

.searchBox input {
  width: 100%;
  padding: 10px;
  color: #ffff;
  background-color: #ffffff00;
}

.searchBox button {
  margin: 0 0 0 20px;
  width: 50px;
  background-color: #ffffff00;
  color: #ffff;
}

@media screen and (max-width: 1200px) {
  .searchBox {
    display: none;
  }
}
</style>