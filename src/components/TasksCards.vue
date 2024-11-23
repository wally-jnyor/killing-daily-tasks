<template>
  <div class="container pt-2 mx-1" style="max-width:100%;">
    <div class="create d-flex justify-content-end my-3">
      <RouterLink to="/all-tasks" class="p-0" style="margin-right: 10px; border-radius: 10px;">
        <button class="btn btn-primary" style="border-radius: 10px; height:40px; ">Show All</button>
      </RouterLink>
      <button class="btn btn-success mr-3" @click="showCreateModalState = true" style="margin-right: 10px; border-radius: 10px; height:40px;">
        Create new task
      </button>
    </div>
    <div>
      <div class="cards d-flex justify-content-evenly align-content-start align-items-baseline flex-wrap" 
        v-for="user in userData" :key="user.id"
      >
        <div class="card justify-content-between d-flex m-2" v-for="task in limitedItems()" :key="task.id">
          <div class="image" v-if="task.image">
            <img :src="task.image" alt="">
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
  </div>
  <!-- MODAIS -->
  <Teleport to="body">
      <Modal :show="showModal" @close="showModal = false">
        <template #header>
          <div v-if="fileUrl" class="imgUpload">
            <img :src="fileUrl" alt="" class="h-25 rounded-4" style="width:90%;">
          </div>
          <div class="inputImageFile w-100 mt-3 d-flex justify-content-between flex-column text-light">
            <input type="file" ref="fileInput" @change="handleFileChange" placeholder="image">
            <button @click="uploadFile()" class="btn btn-warning m-1">Change</button>
          </div>
        </template>
        <template #body>
          <div class="flex-column w-100">
            <label class="text-light">Title</label>
            <input v-model="dataTask.title" class="form-control mb-3" name="title" type="" id="title">
            <label class="text-light">Description</label>
            <textarea v-model="dataTask.description" class="form-control" name="description" id="description"></textarea>
          </div>
        </template>
        <template #footer>
          <div class="btn-actions-footer w-100 d-flex justify-content-end">
            <button type="submit" @click="deleteTask(dataTask)" class="btn btn-danger m-1">Delete</button>
            <button type="submit" @click="updateTaskInServer()" class="btn btn-success m-1">Update</button>
          </div>
        </template>
      </Modal>
    </Teleport>

    <!-- Create Task Modal -->
    <Teleport to="body">
      <Modal :show="showCreateModalState" @close="showCreateModalState = false">
        <template #body>
          <div class="flex-column w-100">
            <label class="text-light">Title</label>
            <textarea v-model="newTaskTitle" class="form-control mb-3" name="title" type="" id="title"></textarea>
            <label class="text-light">Description</label>
            <input v-model="newTaskDescription" class="form-control" name="description" id="description">
          </div>
        </template>
        <template #footer>
          <div class="btn-actions-footer w-100 d-flex justify-content-end">
            <button type="submit" @click="createTask()" class="btn btn-success m-1">Create</button>
          </div>
        </template>
      </Modal>
    </Teleport>
    
</template>

<script setup>
import Modal from '../views/vaiserOmodal.vue';
import Swal from 'sweetalert2'
import axios from 'axios';
import { ref, onMounted } from 'vue';

const fileInput = ref(null);
const newTaskTitle = ref('');
const newTaskDescription = ref('');
const newTaskLocal = ref('');
const newTaskDataHora = ref('');
const newTaskStatus = ref(0);
const userData = ref([]);
const dataTask = ref({});
const fileUrl = ref('');
const showModal = ref(false);
const showCreateModalState = ref(false);
const res = ref([]);

onMounted(() => {
  getUserData(userData);
});

function limitedItems() {
  if (this.userData.length > 0) {
    return this.userData[0].checklist.slice(0, 10);
  }
  return [];
}

// Função para abrir modal, capturar e editar dados do card selecionado
function updateTask(task) {
  showModal.value = true;
  dataTask.value = task;
  fileUrl.value = task.image; // Atualiza fileUrl com a imagem atual da tarefa
}

const getUserData = async () => {
  try {
    const response = await axios.get('http://localhost:3000/userData');
    userData.value = response.data;
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
  }
};

onMounted(getUserData); // Função para receber os dados

// Função para criar a nova tarefa com upload de imagem
const createTask = async () => {
  try {
    // Cria o objeto para a nova tarefa
    const newTask = {
      title: newTaskTitle.value,
      description: newTaskDescription.value,
      local: newTaskLocal.value,
      dataHora: newTaskDataHora.value,
      status: newTaskStatus.value,
      image: '' //'/public/uploads/train.jpg' // Imagem padrão
    };

    // Faz a requisição para adicionar a nova tarefa
    const userId = userData.value[0].id; // ID do usuário
    res.value = await axios.post(`http://localhost:3000/userData/${userId}/checklist`, newTask)
    .then((res) => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Nova tarefa criada com sucesso!",
        showConfirmButton: false,
        text: res.data.message,
        timer: 2100
    });
    })
    
    // Atualiza a lista de tarefas
    getUserData();

    // Reseta os campos do formulário após a criação
    newTaskTitle.value = '';
    newTaskDescription.value = '';
    newTaskLocal.value = '';
    newTaskDataHora.value = '';
    newTaskStatus.value = 0;
    fileUrl.value = ''

    showCreateModalState.value = false;

  } catch (error) {
    console.error('Erro ao criar nova tarefa:', error);
  }
};

// Função para upload de imagens
let file = null;

const handleFileChange = (event) => {
  file = event.target.files[0];
};

const uploadFile = () => {
  console.log('test')
  let formData = new FormData();
  formData.append('file', file);

  axios.post('http://localhost:3000/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  .then(res => {
    fileUrl.value = 'http://localhost:3000' + res.data.path;
    dataTask.value.image = fileUrl.value; // Atualiza o campo 'image' em dataTask
    console.log(res.data);
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
    res.value = await axios.put(`http://localhost:3000/userData/${userId}/checklist/${checklistId}`, dataTask.value)
    .then((res) => {
      Swal.fire({
      position: "center",
      icon: "success",
      title: "Card atualizado com sucesso!",
      text: res.data.message,
      showConfirmButton: false,
      timer: 2100
    });
    })
    // Atualiza a checklist após a atualização
    getUserData();
    showModal.value = false;
  } catch (error) {
    console.error('Erro ao atualizar item:', error);
  }
};


const deleteTask = async () => {
  try {
    const userId = userData.value[0].id;
    const checklistId = dataTask.value.id;
    console.log(checklistId)
    res.value = await axios.delete(`http://localhost:3000/userData/${userId}/checklist/${checklistId}`, dataTask.value)
    .then((res) => {
      Swal.fire({
        title: "Deletado!",
        text: res.data.message,
        icon: "success",
        timer: 2100
      });
    });
    getUserData();
    showModal.value = false;
  } catch (error) {
    console.error('Erro ao deletar item:', error);
  }
}

// Função para exibir a descrição da task no hover
//const showDescription = (user) => {
  // Implemente aqui a lógica para exibir a descrição da task ao passar o mouse
//  console.log(user.checklist[0].description);
//};




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
  width: 240px;
  height: auto;
  padding: 6px;
  color: #ffff;
  border-radius: 10px;
  /* From https://css.glass */
  background: rgba(255, 255, 255, 0.13);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(14.9px);
  -webkit-backdrop-filter: blur(14.9px);
  border: 1px solid rgba(255, 255, 255, 0.16);
}
.image {
  width: 100%;
  height: 150px;
  border-radius: 10px;
}
.image img{
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 10px;
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
  border-radius: 10px;
  border: none;
  color: #000;
}
.actions button:hover {
  color: #ffff;
  /* From https://css.glass */
  background: rgba(20, 214, 151, 0.68);
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
