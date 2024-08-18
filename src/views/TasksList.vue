<template>
  <div class="container p-3 m-0 d-flex justify-content-center flex-column-reverse">
    <Teleport to="body">
      <Modal :show="showModal" @close="showModal = false">
        <template #header>
          <div v-if="fileUrl" class="imgUpload">
            <img :src="fileUrl" alt="" class=" h-25 rounded-4" style="width:90%;">
          </div>
          <div class="inputImageFile w-100 mt-3 d-flex justify-content-between flex-column text-light">
            <input type="file" ref="fileInput" @change="handleFileChange.value" placeholder="image">
            <button @click="updateImagePath.value" class="btn btn-warning m-1">Change</button>
          </div>
        </template>
        <template #body>
          <div class="flex-column w-100">
            <label class="text-light">Title</label>
            <textarea v-model="dataTask.title" class="form-control mb-3" name="title" type="" id="title"></textarea>
            <label class="text-light">Description</label>
            <input v-model="dataTask.description" class="form-control" name="description" id="description">
          </div>
        </template>
        <template #footer>
          <div class="btn-actions-footer w-100 d-flex justify-content-end">
            <button type="submit" @click="onDeleteTask(dataTask)" class="btn btn-danger m-1">Delete</button>
            <button type="submit" @click="onUpdateTask(dataTask.value)" class="btn btn-success m-1">Update</button>
          </div>
        </template>
      </Modal>
    </Teleport>

    <div class="cards d-flex justify-content-start align-content-start align-items-baseline flex-wrap"
      v-for="user in userData" :key="user.id"
      >
      <div class="card justify-content-between d-flex m-2" v-for="task in user.checklist" :key="task.id">
        <div class="image">
          <img :src="task.image || 'sem imagem'" alt="" srcset="">
        </div>
        <div class="title">
          <p class="my-2">{{ task.title }}</p>
        </div>
        <div class="description">
          <p>{{ task.description }}</p> <!-- Mostrar descrição da primeira task -->
        </div>
        <div class="actions d-flex justify-content-center align-items-center">
          <button class="btn btn-primary" id="show-modal" @click="updateTaskModal(task)">Details</button>
        </div>
      </div>
    </div>
    <div class="actions-page py-3 w-100 d-flex justify-content-start align-items-center">
      <li class="navigationList">
        <router-link to="/">
          <button class="btn btn-success">Home</button>
        </router-link>
      </li>
    </div>
  </div>
</template>

<script setup>
//import axios from 'axios';
import {
  updateTask,
  //showCreateModal,
  getUserData,
  //limitedItems,
  handleFileChange,
  updateImagePath,
  //createNewTask,
  //updateTaskInServer,
  deleteTask
} from '../fakeBackend/ExportFunctions';
import Modal from '../views/vaiserOmodal.vue';
import Swal from 'sweetalert2'
import { ref, onMounted } from 'vue';


//const userData = LocalUserData;
const userData = ref ([])
const fileUrl = ref('');
const dataTask = ref({});
const fileInput = ref(null);
//const newTaskTitle = ref('');
//const newTaskDescription = ref('');
//const newTaskLocal = ref('');
//const newTaskDataHora = ref('');
//const newTaskStatus = ref(0);
const showModal = ref(false);
//const showCreateModalState = ref(false);

//function getUserData() {
//  userData
//}

onMounted(() => {
  getUserData(userData);
});

function updateTaskModal(task) {
  let updateData = task
  //console.log(task)
  showModal.value = true;
  this.dataTask = updateData;
  this.fileUrl = updateData.image; 
}
function onUpdateTask(dataTask, showModal) {
  updateTask(dataTask, showModal)
}

function onDeleteTask(dataTask) {
  //console.log(dataTask)
  deleteTask(dataTask, showModal, userData);

  Swal.fire({
    title: "Deletado!",
    text: "O item foi deletado com sucesso.",
    icon: "success"
  });

  getUserData(userData)
}


// Função para exibir a descrição da task no hover
//const showDescription = (user) => {
  // Implemente aqui a lógica para exibir a descrição da task ao passar o mouse
//  console.log(user.checklist[0].description);
//};
</script>

<style scoped>
.container {
  max-width: 100%;
  width: 100%;
  height: auto;
  color: #ffff;
}

.card {
  width: 245px;
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

.image img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 15px;
}

.actions.actions-page {
  width: 100%;
  align-items: center;
  height: auto;
}

.actions button {
  width: 100%;
  height: 35px;
  background-color: #14d697;
  font-size: 0.88rem;
  border-radius: 15px;
  border: none;
  color: #000;
}

.actions.navigationList,
button:hover {
  color: #ffff;
  /* From https://css.glass */
  background: rgba(20, 214, 151, 0.68);
  border-radius: 15px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(20, 214, 151, 1);
}

.navigationList button:hover {
  color: #ffff;
  /* From https://css.glass */
  background: rgba(20, 214, 151, 0.68);
  border-radius: 15px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(20, 214, 151, 1);
}

.navigationList button {
  width: 200px;
  border-radius: 15px;
  background-color: #14d697;
  color: #000;
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
