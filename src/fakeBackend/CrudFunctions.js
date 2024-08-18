import { ref } from 'vue';
import Swal from 'sweetalert2';
import userdataOffline from '../fakeBackend/UserData';

const userdataOff = userdataOffline;
const userData = ref([]);
const showModal = ref(false);
const showCreateModalState = ref(false);
const dataTask = ref(null);
const fileUrl = ref(null);

// Função para capturar e editar dados do card selecionado
export function updateTask_local(task) {
  showModal.value = true;
  dataTask.value = task;
  fileUrl.value = task.image; // Atualiza fileUrl com a imagem atual da tarefa
  console.log(dataTask);
}

// Função para exibir o modal de criação de nova tarefa
export function showCreateModal_local() {
  showCreateModalState.value = true;
}

// Função para buscar os dados do usuário
export function getUserData_local() {
  try {
    userData.value = userdataOff;
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
  }
}

// Função computada para limitar os itens da checklist
export function limitedItems_local() {
  if (userData.value.length > 0) {
    return userData.value[0].checklist.slice(0, 6);
  } else if (userdataOff.length > 0) {
    return userdataOff[0].checklist.slice(0, 6);
  }
  return [];
}

// Função para upload de imagens
export function handleFileChange_local(event) {
  const file = event.target.files[0];
  if (file) {
    fileUrl.value = URL.createObjectURL(file);
    console.log('File selected:', file);
  }
}

// Função para criar novo item na checklist
export function createNewTask_local(newTaskTitle, newTaskDescription, newTaskLocal, newTaskDataHora, newTaskStatus) {
  const newTask = {
    id: Date.now(),
    title: newTaskTitle.value,
    description: newTaskDescription.value,
    local: newTaskLocal.value,
    dataHora: newTaskDataHora.value,
    status: newTaskStatus.value,
    image: fileUrl.value
  };

  userdataOff[0].checklist.push(newTask);

  console.log('Nova tarefa criada:', newTask);
  showCreateModalState.value = false;
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Nova tarefa criada com sucesso!",
    showConfirmButton: false,
    timer: 1800
  });

  // Atualiza a checklist após a criação
  getUserData_local();
}

// Função para atualizar item da checklist
export function updateTaskInServer_local(userId, checklistId, dataTask) {
    checklistId,userId
    console.log('ok')
  try {
    const checklist = userdataOff[0].checklist;
    const index = checklist.findIndex(task => task.id === dataTask.value.id);

    if (index !== -1) {
      checklist[index] = { ...dataTask.value };
    }

    console.log('Tarefa atualizada:', checklist[index]);
    showModal.value = false;
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Card atualizado com sucesso!",
      showConfirmButton: false,
      timer: 1800
    });

    // Atualiza a checklist após a atualização
    getUserData_local();
  } catch (error) {
    console.error('Erro ao atualizar item:', error);
  }
}

// Função para deletar item da checklist
export function deleteTask_local() {
  try {
    const checklist = userdataOff[0].checklist;
    const index = checklist.findIndex(task => task.id === dataTask.value.id);

    if (index !== -1) {
      checklist.splice(index, 1);
    }

    console.log('Tarefa deletada:', dataTask.value);
    showModal.value = false;
    Swal.fire({
      title: "Deseja realmente deletar?",
      text: "Não será possível recuperá-lo!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#14d697",
      cancelButtonColor: "#dc3545",
      confirmButtonText: "Sim, deletar!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deletado!",
          text: "O item foi deletado com sucesso.",
          icon: "success"
        });
      }
    });

    // Atualiza a checklist após a deleção
    getUserData_local();
  } catch (error) {
    console.error('Erro ao deletar item:', error);
  }
}
