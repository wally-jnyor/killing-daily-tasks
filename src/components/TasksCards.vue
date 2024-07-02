<template>
  <div class="container pt-2">

    <Teleport to="body">
      <!-- use the modal component, pass in the prop -->
      <Modal :show="showModal" @close="showModal = false">
        <template #header>
          <div class="imgUpload">
            <input type="file" name="imgUpload" id="imgUpload">
          </div>
        </template>
        <template #body>
          <div>
            <input v-model="dataTask.description" name="description" id="description">
          </div>
        </template>
        <template #footer>
          <div>
            <button type="submit">Update</button>
          </div>
        </template>
      </Modal>
    </Teleport>

    <div class="cards d-flex justify-content-start align-content-start align-items-baseline flex-wrap" 
      v-for="user in userData" :key="user.id"
    >
      <div class="card justify-content-between d-flex m-2" v-for="(task, index) in limitedItems()" :key="index">
        <div class="image">
          <img src="/img/cardsUser/imagcard1.png" alt="" srcset="">
        </div>
        <div class="title">
          <p class="my-2"> {{ task.title }} </p>
        </div>
        <div class="description">
          <p> {{ task.description }} </p>
        </div>
        <div class="actions d-flex justify-content-center align-items-center">
          <button class="btn btn-primary" id="show-modal" @click="updateTask(task)">Details</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import Modal from '../views/vaiserOmodal.vue';
import { ref, onMounted } from 'vue';

// Variável reativa para armazenar os dados do usuário
const userData = ref([]);


// Variável reativa para controlar o modal
const showModal = ref(false);

// função para capiturar e editar dados do card selecionado
const dataTask = defineModel();
function updateTask(task) {
  this.showModal = true;
  dataTask.value = task;
  console.log(dataTask)
}

// Função assíncrona para buscar os dados do usuário
const getUserData = async () => {
  try {
    const response = await axios.get('http://localhost:3000/userData');
    userData.value = response.data;
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
  }
};

onMounted(getUserData);

// Função computada para limitar os itens da checklist
function limitedItems() {
  if (userData.value.length > 0) {
    return userData.value[0].checklist.slice(0, 6);
  }
  return [];
}



// Exibindo no console apenas para verificação
console.log(userData);
</script>

<style scoped>
.container {
  width: 100%;
  height: auto;
  color: #ffff;
  border: solid 1px white;
}
.card {
  width: 275px;
  min-height: 295px;
  padding: 6px;
  color: #ffff;
  border-radius: 15px;
  /* From https://css.glass */
  background: rgba(255, 255, 255, 0.13);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(14.9px);
  -webkit-backdrop-filter: blur(14.9px);
  border: 1px solid rgba(255, 255, 255, 0.16);
}
.image {
  width: 100%;
  height: 150px;
  border-radius: 15px;
}
.image img{
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 15px;
}
.actions {
  width: 100%;
  align-items: center;
  height: auto;
}
.actions button {
  width: 100%;
  height: 35px;
  background-color: #14d697;
  font-size: .88rem;
  border-radius: 15px;
  border: none;
  color: #000;
}
.actions button:hover {
  color: #ffff;
  /* From https://css.glass */
  background: rgba(20, 214, 151, 0.68);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(20, 214, 151, 1);
}
.title p {
  font-family: "Old Standard TT", serif;
  font-size: 1.7rem;
  line-height: 25px;
}
.description p {
  font-family: "Dosis", serif;
  font-size: 1.1rem;
  line-height: 20px;
}
</style>
