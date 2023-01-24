<template>
  <Header/>
  <section>
    <button class="add-button" @click="switchIsNewTask" type="button">{{ addNewTaskMsn }}</button>
    <div class="add-task" v-if=isNewTask >
      <form class="container-input">
        <label for="title">Title:</label>
        <input type="text" placeholder="Work"><br>
        <label for="task">Task description</label>
        <input type="text"><br>
      </form>
      <div class="add-task-buttons">
        <label for="title">Priority</label>
        <input type="number" placeholder="1,2 or 3" min="1" max="3">
        <button class="add-task-btn" type="button">Add to the list</button>
      </div>
    </div>
  </section>
  <tyt v-for="task in tasks" :key="task.id">
    <div class="items flex-container">
      <div class="container-items" >
          <td >{{task.title}}</td>
          <td >{{task.description}}</td>
          <td >{{task.priority}}</td>
      </div>
      <div class="container-items">
          <button type="button">Done</button>
          <button type="button">Edit</button>
          <button type="button">Delete</button>
      </div>
    </div>
  </tyt>
  <Footer/>

  
</template>

<script setup>
  import {ref} from 'vue';
  import {useTaskStore} from '../store/task';
  import Header from '../components/Header.vue';
  import TaskItem from '../components/TaskItem.vue';
  import Footer from '../components/Footer.vue';
  

  const useTaskStoreSB = useTaskStore();
  const addNewTaskMsn = ref("Add task");
  const isNewTask = ref(false);
  useTaskStoreSB.fetchTasks();
  const tasks = useTaskStoreSB.tasks;
  console.log(tasks);
  /*ref([
  {"title": "Work", "description": "Work hard", "priority": 2},
  {"title": "Study", "description": "Work hard", "priority": 1},
  {"title": "Play", "description": "Work hard", "priority": 3},
  ]);*/

  function switchIsNewTask() {
    isNewTask.value = !isNewTask.value;
    if(addNewTaskMsn.value == "Add task") {
      addNewTaskMsn.value = "Close task";
    } else {
      addNewTaskMsn.value = "Add task";
    }
  };


  
  
</script>

<style scoped>
  .add-button {
    position: fixed;
    top: 120px;
    right: 50px;
    padding: 10px 10px;
    border-radius: 2px;
    background-color: grey;
  }

  .add-task {
    display: flex;
    position: fixed;
    top: 120px;
    left: 40%;
    border: 2px solid black;
    border-radius: 2px;
    padding: 50px;
  }

  .container-input {
    display: flex;
    flex-direction: column;
  }
  .add-task-buttons {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin: 5%;
  }

  input {
    background-color:bisque;
  }

  
  .flex-container{
        display: flex;
        justify-content: space-between;

    }

  .container-items {
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
  }

  .items {
    margin: 5px;
    border: 1px solid black;
    width: 80%;
  }



</style>