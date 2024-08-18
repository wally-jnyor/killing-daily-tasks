import axios from 'axios';
//import Modal from '../views/vaiserOmodal.vue';
import { ref, onMounted } from 'vue';  // import { ref, onMounted } from 'vue';
import Swal from 'sweetalert2'

const userData = ref([]);
const showModal = ref(false);
const showCreateModalState = ref(false);
const dataTask = ref({});
const fileUrl = ref('');
const fileInput = ref(null);
const newTaskTitle = ref('');
const newTaskDescription = ref('');
const newTaskLocal = ref('');
const newTaskDataHora = ref('');
const newTaskStatus = ref(0);

// Função para capturar e editar dados do card selecionado
function updateTask(task) {
  showModal.value = true;
  dataTask.value = task;
  fileUrl.value = task.image; // Atualiza fileUrl com a imagem atual da tarefa
  console.log(dataTask);
}

// Função para exibir o modal de criação de nova tarefa
//function showCreateModal() {
//  showCreateModalState.value = true;
//}

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
  } //else if (userdataOff.length > 0) {
    //return userdataOff[0].checklist.slice(0, 6);
  //}
  return [];
}

// Função para upload de imagens
let file = null;

//const handleFileChange = (event) => {
//  file = event.target.files[0];
//};
const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    fileUrl.value = URL.createObjectURL(file);
    console.log('File selected:', file);
  }
};

const updateImagePath = () => {
  if (fileInput.value.files.length > 0) {
    const file = fileInput.value.files[0];
    fileUrl.value = URL.createObjectURL(file);
    console.log('Updated fileUrl:', fileUrl.value);
  } else {
    console.warn('No file selected');
  }
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

// Função para criar novo item na checklist
const createNewTask = async () => {
    const imagePath = fileUrl.value;
  console.log('Caminho da imagem:', imagePath); // Exibe o caminho da imagem no console
  try {
    const response = await axios.post(`http://localhost:3000/userData/1/checklist`, {
      title: newTaskTitle.value,
      description: newTaskDescription.value,
      local: newTaskLocal.value,
      dataHora: newTaskDataHora.value,
      status: newTaskStatus.value,
      image: fileUrl.value // Enviando o caminho da imagem diretamente
    });

    console.log('Nova tarefa criada:', response.data);
    showCreateModalState.value = false;
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Nova tarefa criada com sucesso!",
      showConfirmButton: false,
      timer: 1800
    });

    // Atualiza a checklist após a criação
    getUserData();
  } catch (error) {
    console.error('Erro ao criar nova tarefa:', error);
  }
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