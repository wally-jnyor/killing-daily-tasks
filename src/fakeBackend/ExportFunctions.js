// taskService.js

import localUserDataOffline from '../fakeBackend/UserData';

const localStorageKey = 'userData';

// Função para salvar os dados no localStorage
function saveToLocalStorage(data) {
  localStorage.setItem(localStorageKey, JSON.stringify(data));
}

// Função para carregar os dados do localStorage
function loadFromLocalStorage() {
  const data = localStorage.getItem(localStorageKey);
  return data ? JSON.parse(data) : null;
}

// Função para inicializar os dados no localStorage, se ainda não existirem
function initializeLocalStorage() {
  const existingData = loadFromLocalStorage();
  if (!existingData) {
    saveToLocalStorage(localUserDataOffline); // Salva os dados iniciais no localStorage
    console.log('Dados iniciais salvos no localStorage:', localUserDataOffline);
  }
}

// Função para buscar os dados do usuário, usando localStorage
export function getUserData(userData) {
  try {
    initializeLocalStorage(); // Garante que os dados iniciais estejam no localStorage
    const localData = loadFromLocalStorage();
    userData.value = localData;
    console.log('Dados carregados do localStorage:', localData);
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
  }
}

// Função para capturar e editar dados do card selecionado
export function updateTask(dataTask, showModal) {
  try {
    const localData = loadFromLocalStorage();
    const checklist = localData[0].checklist;
    const index = checklist.findIndex(task => task.id === dataTask.value.id);
    
    if (index !== -1) {
      checklist[index] = { ...dataTask.value }; // Atualiza a tarefa localmente
      saveToLocalStorage(localData); // Salva as alterações no localStorage
    }

    console.log('Tarefa atualizada:', checklist[index]);
    showModal.value = false;

    return checklist;
  } catch (error) {
    console.error('Erro ao atualizar item:', error);
  }
}

// Função para exibir o modal de criação de nova tarefa
export function showCreateModal(showCreateModalState) {
  showCreateModalState.value = true;
}

// Função para upload de imagens
export function handleFileChange(event, fileUrl) {
  const file = event.target.files[0];
  if (file) {
    fileUrl.value = URL.createObjectURL(file);
    console.log('File selected:', file);
  }
}

export function updateImagePath(fileInput, fileUrl) {
  if (fileInput.value.files.length > 0) {
    const file = fileInput.value.files[0];
    fileUrl.value = URL.createObjectURL(file);
    console.log('Updated fileUrl:', fileUrl.value);
  } else {
    console.warn('No file selected');
  }
}

// Função para criar novo item na checklist sem Axios, salvando no localStorage
export function createNewTask(newTask, userData) {
  const localData = loadFromLocalStorage();
  newTask.id = Date.now(); // Gerando um ID único baseado na data atual
  localData[0].checklist.push(newTask); // Adiciona a nova tarefa no array local

  console.log('Nova tarefa criada:', newTask);
  saveToLocalStorage(localData); // Salva as alterações no localStorage
  userData.value = localData; // Atualiza os dados do usuário
}

// Função para deletar item da checklist localmente e salvar no localStorage
export function deleteTask(dataTask, showModal, userData) {
  try {
    const localData = loadFromLocalStorage();
    const checklist = localData[0].checklist;
    const index = checklist.findIndex(task => task.id === dataTask.id);

    if (index !== -1) {
      checklist.splice(index, 1); // Remove a tarefa do array local
      saveToLocalStorage(localData); // Salva as alterações no localStorage
    }

    console.log('Tarefa deletada:', dataTask);
    showModal.value = false;
    userData.value = localData; // Atualiza os dados do usuário
  } catch (error) {
    console.error('Erro ao deletar item:', error);
  }
}
