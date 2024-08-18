<template>
  <div class="container pt-2">
    <div class="create">
      <button class="btn btn-success" @click="showCreateModal()">Create</button>
    </div>
    <!--
    <div>
      <div class="cards d-flex justify-content-start align-content-start align-items-baseline flex-wrap" 
        v-for="user in userData" :key="user.id"
      >
        <div class="card justify-content-between d-flex m-2" v-for="task in limitedItems()" :key="task.id">
          <div class="image">
            <img :src="task.image || '/img/cardsUser/imagcard1.png'" alt="">
          </div>
          <div class="title">
            <p class="my-2"> {{ task.title }}</p>
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
    -->
    <div>
      <div class="cards d-flex justify-content-start align-content-start align-items-baseline flex-wrap" 
        v-for="user in userData" :key="user.id"
      >
        <div class="card justify-content-between d-flex m-2" v-for="task in limitedItems()" :key="task.id">
          <div class="image">
            <img :src="task.image || '/img/cardsUser/imagcard1.png'" alt="">
          </div>
          <div class="title">
            <p class="my-2"> {{ task.title }}</p>
          </div>
          <div class="description">
            <p> {{ task.description }} </p>
          </div>
          <div class="actions d-flex justify-content-center align-items-center">
            <button class="btn btn-primary" id="show-modal" @click="updateTaskModal(task)">Details</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--
  <p>{{ userdataOff }}</p> -->
  <!-- MODAIS -->
  <Teleport to="body">
      <Modal :show="showModal" @close="showModal = false">
        <template #header>
          <div v-if="fileUrl" class="imgUpload">
            <img :src="fileUrl" alt="" class="h-25 rounded-4" style="width:90%;">
          </div>
          <div class="inputImageFile w-100 mt-3 d-flex justify-content-between flex-column text-light">
            <input type="file" ref="fileInput" @change="handleFileChange" placeholder="image">
            <button @click="updateImagePath" class="btn btn-warning m-1">Change</button>
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
            <button type="submit" @click="onUpdateTask(dataTask)" class="btn btn-success m-1">Update</button>
          </div>
        </template>
      </Modal>
    </Teleport>

    <!-- Create Task Modal -->
    <Teleport to="body">
      <Modal :show="showCreateModalState" @close="showCreateModalState = false">
        <template #header>
          <div v-if="fileUrl" class="imgUpload">
            <img :src="fileUrl" alt="" class=" h-25 rounded-4" style="width:90%;">
          </div>
          <div class="inputImageFile w-100 mt-3 d-flex justify-content-between flex-column text-light">
            <input type="file" ref="fileInput" @change="handleFileChange" placeholder="image">
            <button @click="uploadFile" class="btn btn-warning m-1">Change</button>
          </div>
        </template>
        <template #body>
          <div class="flex-column w-100">
            <label class="text-light">Title</label>
            <textarea v-model="newTaskTitle" class="form-control mb-3" name="title" type="" id="title"></textarea>
            <label class="text-light">Description</label>
            <input v-model="newTaskDescription" class="form-control" name="description" id="description">
            <label class="text-light">Local</label>
            <input v-model="newTaskLocal" class="form-control" name="local" id="local">
            <label class="text-light">Data e Hora</label>
            <input v-model="newTaskDataHora" class="form-control" type="datetime-local" name="dataHora" id="dataHora">
            <label class="text-light">Status</label>
            <input v-model="newTaskStatus" class="form-control" type="number" name="status" id="status">
          </div>
        </template>
        <template #footer>
          <div class="btn-actions-footer w-100 d-flex justify-content-end">
            <button type="submit" @click="onCreateNewTask()" class="btn btn-success m-1">Create</button>
          </div>
        </template>
      </Modal>
    </Teleport>
    
</template>

<script setup>
//import localUserDataOffline from '../fakeBackend/UserData';
//import LocalUserData from '../fakeBackend/UserData';
// Importando as funções do taskService.js
import {
  updateTask,
  //showCreateModal,
  getUserData,
  //limitedItems,
  handleFileChange,
  updateImagePath,
  createNewTask,
  //updateTaskInServer,
  deleteTask
} from '../fakeBackend/ExportFunctions';
import Modal from '../views/vaiserOmodal.vue';
import Swal from 'sweetalert2'
import { ref, onMounted } from 'vue';


//const userData = LocalUserData;
const userData = ref (null)
const fileUrl = ref('');
const dataTask = ref({});
const fileInput = ref(null);
const newTaskTitle = ref('');
const newTaskDescription = ref('');
const newTaskLocal = ref('');
const newTaskDataHora = ref('');
const newTaskStatus = ref(0);
const showModal = ref(false);
const showCreateModalState = ref(false);

//function getUserData() {
//  userData
//}

onMounted(() => {
  getUserData(userData);
});

function limitedItems() {
  if (this.userData.length > 0) {
    return this.userData[0].checklist.slice(0, 6);
  }
  return [];
}

function onCreateNewTask() {
  const newTask = {
    title: newTaskTitle.value,
    description: newTaskDescription.value,
    local: newTaskLocal.value,
    dataHora: newTaskDataHora.value,
    status: newTaskStatus.value,
    image: fileUrl.value
  };

  createNewTask(newTask, this.userData);

  Swal.fire({
    position: "center",
    icon: "success",
    title: "Nova tarefa criada com sucesso!",
    showConfirmButton: false,
    timer: 1800
  });
}

function updateTaskModal(task) {
  let updateData = task
  //console.log(task)
  this.showModal = true;
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


// Exibindo no console apenas para verificação
//console.log(userData);
</script>


<style scoped>
.container {
  width: 100%;
  height: auto;
  color: #ffff;
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
#modal-title textarea {
  background-color: #14d69700;
  border: none;
  font-size: 1.7rem;
  color: #fff;
}
</style>
