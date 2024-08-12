<template>
  <div class="main">
    <div class="container p-3">
      <div v-for="user in offlineUserData" :key="user.id">
        <div class="title">
        <h4>Hello, {{ user.name}}! </h4>
        <div v-for="finance in user.finance.investment_cash" :key="finance.id">
          <p>Target: {{ finance.name }} - Progress: {{ finance.total }} / {{ finance.amount }}</p>
        </div>
        <p>something motivating</p>
        <div class="navbar">
          <li class="navigationList">
            <RouterLink to="/user-details">Details</RouterLink>
          </li>
        </div>
      </div>

      <div class="title">
        <h4>Missions in process</h4>
        <div v-for="(task, index) in limetidItems" :key="index">
          <p class="mb-0"> Doing now: {{ task.title }} </p>
          <p> {{ task.description }} </p>
        </div>
        <div class="navbar">
          <li class="navigationList">
            <RouterLink to="/all-tasks">
              <button class="btn btn-primary">Show All</button>
            </RouterLink>
          </li>
        </div>
      </div>
      <div class="title">
        <h4>Completed</h4>
        <p>something motivating</p>
        <div v-for="task in user.checklist" :key="task.id">
          <p v-if="task.status != 1">{{ task.title }} - {{ task.dataHora }} - {{ task.local }}</p>
        </div>
          <div class="navbar">
            <li class="navigationList">
              <RouterLink to="/bag">Details</RouterLink>
            </li>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import fakeBackEnd from '../fakeBackend/UserData' //offline access
//import axios from 'axios'

export default {
  components: {
  },
  data() {
    return {
      userData: [],
      offlineUserData: fakeBackEnd
    }
  },
  computed: {
    limetidItems() {
      if (this.offlineUserData) {
        for (const item of this.offlineUserData) {
          return item.checklist.slice(0,2);
        }
      }
      return [];
    }
  },
  //async created() {
    //await this.getUserData();
    //console.log(this.userData);
  //},
  methods: {
    //async getUserData() {
      //try {
        //const response = await axios.get('http://localhost:3000/userData');
        //this.userData = response.data;
      //} catch (error) {
        //console.error('Erro ao buscar dados:', error);
      //}
    //},
  },
}
</script>

<style scoped>
.main {
  width: 45%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  list-style: none;
}

@media screen and (max-width: 1200px) {
  .main {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100%;
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