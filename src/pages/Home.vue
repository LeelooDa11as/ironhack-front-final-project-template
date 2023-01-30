<template>
  <Header :show-log-out="true" />
  <div class="fill-page">
    <AddNewTask />
    <TaskItems />
  </div>  
  <Footer/>

  
</template>

<script setup>
  import {ref} from 'vue';
  import { useUserStore } from '../store/user';
  import { useTaskStore } from '../store/task';
  import Header from '../components/Header.vue';
  import AddNewTask from '../components/AddNewTask.vue';
  import TaskItems from '../components/TaskItems.vue';
  import Footer from '../components/Footer.vue';
  import { onMounted } from "vue";

  const useTaskStoreSB = useTaskStore();
  const userStoreSB = useUserStore(); 


 

 
  onMounted(async () => {
  try {
    await userStoreSB.fetchUser();
    await useTaskStoreSB.fetchTasks();
  } catch (e) {
    console.log(e);
  }
});

  

</script>

<style scoped>
  .fill-page {
    min-height: 78vh;
  }


  input, textarea {
    background-color:bisque;
  }








</style>