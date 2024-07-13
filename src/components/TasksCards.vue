<template>
  <div class="container pt-2">
    <Teleport to="body">
      <Modal :show="showModal" @close="showModal = false">
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
            <textarea v-model="dataTask.title" class="form-control mb-3" name="title" type="" id="title"></textarea>
            <label class="text-light">Description</label>
            <input v-model="dataTask.description" class="form-control" name="description" id="description">
          </div>
        </template>
        <template #footer>
          <div class="btn-actions-footer w-100 d-flex justify-content-end">
            <button type="submit" @click="deleteTask" class="btn btn-danger m-1">Delete</button>
            <button type="submit" @click="updateTaskInServer" class="btn btn-success m-1">Update</button>
          </div>
        </template>
      </Modal>
    </Teleport>

    <div class="cards d-flex justify-content-start align-content-start align-items-baseline flex-wrap" 
      v-for="user in userData" :key="user.id"
    >
      <div class="card justify-content-between d-flex m-2" v-for="task in limitedItems()" :key="task.id">
        <div class="image">
          <img :src="task.image || '/img/cardsUser/imagcard1.png'" alt="">
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
import Swal from 'sweetalert2'

const userData = ref([]);
const showModal = ref(false);
const dataTask = ref({});
const fileUrl = ref('');

// Função para capturar e editar dados do card selecionado
function updateTask(task) {
  showModal.value = true;
  dataTask.value = task;
  fileUrl.value = task.image; // Atualiza fileUrl com a imagem atual da tarefa
  console.log(dataTask);
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

// Função para upload de imagens
let file = null;

const handleFileChange = (event) => {
  file = event.target.files[0];
};

const uploadFile = () => {
  let formData = new FormData();
  formData.append('file', file);

  axios.post('http://localhost:3000/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  .then(response => {
    fileUrl.value = 'http://localhost:3000' + response.data.path;
    dataTask.value.image = fileUrl.value; // Atualiza o campo 'image' em dataTask
    console.log(response.data);
  })
  .catch(error => {
    console.error('Erro ao enviar arquivo:', error);
  });
};

// Função para atualizar item da checklist no servidor
const updateTaskInServer = async () => {
  try {
    const userId = userData.value[0].id;
    const checklistId = dataTask.value.id;
    const response = await axios.put(`http://localhost:3000/userData/${userId}/checklist/${checklistId}`, dataTask.value);
    console.log(response.data);
    showModal.value = false;
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Card atualizado com sucesso!",
      showConfirmButton: false,
      timer: 1800
    });
    // Atualiza a checklist após a atualização
    getUserData();
  } catch (error) {
    console.error('Erro ao atualizar item:', error);
  }
};

const deleteTask = async () => {
  try {
    const userId = userData.value[0].id;
    const checklistId = dataTask.value.id;
    const response = await axios.delete(`http://localhost:3000/userData/${userId}/checklist/${checklistId}`, dataTask.value);
    console.log(response.data);
    showModal.value = false;
    Swal.fire({
      title: "Deseja realmente deletar ?",
      text: "Não será possível recupera-lo!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#14d697",
      cancelButtonColor: "#dc3545",
      confirmButtonText: "Sim, deletar!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
        title: "Deletado!",
        text: response.data.message,
        icon: "success"
        });
      }
    });
    // Atualiza a checklist após a atualização
    getUserData();
  } catch (error) {
    console.error('Erro ao deletar item:', error);
  }
}

// Exibindo no console apenas para verificação
console.log(userData);
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
