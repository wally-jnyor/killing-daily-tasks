<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-container">
        <div class="modal-header">
          <slot name="header">default header</slot>
        </div>

        <div class="modal-body">
          <slot name="body">default body</slot>
        </div>

        <div class="modal-footer">
          <slot name="footer">
            default footer
            <button
              class="modal-default-button"
              @click="$emit('close')"
            >OK</button>
          </slot>
        </div>
      </div>
    </div>
  </Transition>

<!--
  <div class="container">
    <div class="card">
      <div class="image">
        <div class="img">
          <img src="" alt="" srcset="">
        </div>
        <div class="img-actions">
          <button class="btn">Delete</button>
          <button class="btn">Change</button>
        </div>
      </div>
      <div class="title">
        <h1>title</h1>
      </div>
      <div class="description">
        <p>description</p>
      </div>
      <div class="actions">
        <button class="btn">Delete</button>
        <button class="btn">Update</button>
      </div>
    </div>
  </div>
-->

  <!-- FileUpload.vue 
<template>
  <div>
    <h2>Upload de Arquivos</h2>
    <input type="file" ref="fileInput" @change="handleFileChange">
    <button @click="uploadFile">Enviar</button>
    <div v-if="fileUrl">
      <p>Arquivo enviado com sucesso!</p>
      <img :src="fileUrl" alt="Arquivo enviado">
    </div>
  </div>
</template>
-->
</template>

<script setup>
//import axios from 'axios';

const props = defineProps({
  show: Boolean
});
console.log(props)

//let file = null;
//let fileUrl = null;

// Método para lidar com a mudança de arquivo
//const handleFileChange = (event) => {
//  file = event.target.files[0];
//};

// Método para enviar o arquivo
//const uploadFile = () => {
//  let formData = new FormData();
//  formData.append('file', file);

//  axios.post('http://localhost:3000/upload', formData, {
//    headers: {
//      'Content-Type': 'multipart/form-data'
//    }
//  })
//  .then(response => {
//    console.log(response.data);
//    fileUrl = 'http://localhost:3000' + response.data.path;
//  })
//  .catch(error => {
//    console.error('Erro ao enviar arquivo:', error);
//  });
//};


</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
}

.modal-container {
  width: 300px;
  margin: auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>