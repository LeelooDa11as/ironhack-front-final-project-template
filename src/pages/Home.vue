<template>
  <Header :show-log-out="true" />
  <div class="fill-page">
    <AddNewTask />
    <section class="flex-cont">
      <div class="item"><TaskItems :priority="1"/></div>
      <div class="item"><TaskItems :priority="2"/></div>
      <div class="item"><TaskItems :priority="3"/></div>
    </section>
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
template{
  width: 100%;
}
  .fill-page {
    min-height: 78vh;
    width: 100%;
  }
  
  .flex-cont{
    width: 100%;
    display: flex;
  }

  input, textarea {
    background-color:bisque;
  }

  .item{
    width: 25%;
    margin: 0 1%;
  }
  


</style>