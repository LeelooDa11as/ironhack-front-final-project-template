<template>
  <Header />
  <section>
    <button :class="addCancelLogo" @click="switchIsNewTask" type="button">
    </button>
    <div class="add-task" v-if=isNewTask >
      <form class="container-input">
        <label for="title">Title:</label>
        <input v-model="newPostDetails.title" type="text" placeholder="Work"><br>
        <label for="task">Task description</label>
        <textarea rows="5" v-model="newPostDetails.description" type="text"></textarea><br>
      </form>
      <div class="add-task-buttons">
        <label for="title">Priority</label>
        <input v-model="newPostDetails.priority" type="number" placeholder="1,2 or 3" min="1" max="3">
        <button class="add-task-btn" @click="addTask" type="button">Add</button>
      </div>
    </div>
  </section>
  <div class="add-task" v-if=isTaskEdit>
    <form class="container-input">
      <label for="title">Title:</label>
      <input v-model="editTask.title" type="text" placeholder="Work"><br>
      <label for="task">Task description</label>
      <textarea cols="5" rows="5" v-model="editTask.description" type="text"></textarea><br>
    </form>
    <div class="add-task-buttons">
      <label for="title">Priority</label>
      <input v-model="editTask.priority" type="number" min="1" max="3">
      <button class="add-task-btn" @click="saveF" type="button">Save</button>
      <button class="add-task-btn" @click="switchEditTask" type="button">Cancel</button>
    </div>
  </div>
  <div v-for="task in useTaskStoreSB.tasks" :key="task.id">
    <div class="items flex-container" :class="[task.is_complete ? taskDone: priorityState[task.priority]]">
      <div class="container-items" >
        <td >{{task.title}}</td>
        <td >{{task.description}}</td>
      </div>
      <div class="container-items">
        <button class="task-button" @click="editIsCompleteF(task)" type="button">
          <img class="button-logo" src="../assets/check-icon.png" alt="completed-logo"/>
        </button>
        <button class="task-button" @click="editTaskf(task)" type="button">
          <img class="button-logo" src="../assets/edit-icon.png" alt="completed-logo"/>
        </button>
        <button class="task-button" @click="deleteTask(task)" type="button">
          <img class="button-logo" src="../assets/delete-icon.png" alt="completed-logo"/>
        </button>
      </div>
    </div>
  </div>
  <Footer/>

  
</template>

<script setup>
  import {ref} from 'vue';
  import { useUserStore } from '../store/user';
  import { useTaskStore } from '../store/task';
  import Header from '../components/Header.vue';
  import TaskItem from '../components/TaskItem.vue';
  import Footer from '../components/Footer.vue';
  import { onMounted } from "vue";

  const useTaskStoreSB = useTaskStore();
  const userStoreSB = useUserStore(); 
  const addCancelLogo = ref("add-btn-icon");
  const isNewTask = ref(false);
  const isTaskEdit = ref(false);
  const currentTask = ref(null);
  const taskDone = ref ("task-done");
  const newPostDetails = ref ({ 
    user_id: "",
    title: "",
    description: "",
    priority: 1
  });

  const editTask = ref ({
    title: "",
    description: "",
    priority: 1,
    id: -1
  });

  const priorityState = ref ({
    1: "urgent-priority",
    2: "moderate-priority",
    3: "not-urgent-priority"
  });

  onMounted(async () => {
  try {
    await userStoreSB.fetchUser();
    await useTaskStoreSB.fetchTasks();
  } catch (e) {
    console.log(e);
  }
});

  function clearTaskInputs() {
    newPostDetails.value.title = "";
    newPostDetails.value.description = "";
    newPostDetails.value.priority = 1;
  };
  
  function switchIsNewTask() {
    isNewTask.value = !isNewTask.value;
    if(isNewTask.value) {
      addCancelLogo.value = "close-btn-icon ";
    } else {
      addCancelLogo.value = "add-btn-icon";
    }
  };

  function validationNewTask() {
    if (newPostDetails.value.title === "" || 
    newPostDetails.value.description === "" || 
    newPostDetails.value.user_id === ""){
      return(false);
    }
    return(true);
  };

  function deleteTask(task){
    //console.log("lo estamos borrando");
    useTaskStoreSB.delete(task.id);
  }
  
  async function addTask() {
    newPostDetails.value.user_id = userStoreSB.user.id;
    const val = validationNewTask();
    if (val) {
      console.log(newPostDetails.value);
      await useTaskStoreSB.post(newPostDetails.value);
      switchIsNewTask();
      clearTaskInputs();
    } else {
      alert("New task data is not completed");
    }

  };


  function switchEditTask() {
    isTaskEdit.value = !isTaskEdit.value;
  };
  
  function editTaskf(task) {
    editTask.value.title = task.title;
    editTask.value.description = task.description;
    editTask.value.priority = task.priority;
    editTask.value.id = task.id;
    switchEditTask();
  };

  function editIsCompleteF (task) {
    const isItComplete = task.is_complete;
    useTaskStoreSB.taskIsComplete(task.id, !isItComplete);

  };

 function saveF(){
    useTaskStoreSB.put(editTask.value, editTask.value.id);
    switchEditTask();
  }
  
</script>

<style scoped>
.log-out-btn {
  display: none;
}
  .add-btn-icon {
    
    position: fixed;
    top: 120px;
    right: 60px;
    height: 50px;
    width: 50px;
    background: url(../assets/add-icon.png);
    background-size: contain;
    background-repeat: no-repeat;
  }

  .close-btn-icon {
    position: fixed;
    top: 120px;
    right: 60px;
    height: 50px;
    width: 50px;
    background: url(../assets/cancel-logo.png);
    background-size: contain;
    background-repeat: no-repeat;
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

  input, textarea {
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
    width: 70%;
    height: 100px;
  }

  .task-button {
    height: 30%;
  }

  .button-logo {
    height: 100%;

  }

  .urgent-priority {
    background-color: rgb(213, 137, 137);

  }
  .moderate-priority{
    background-color: rgba(242, 136, 71, 0.859);

  }

  .not-urgent-priority{
    background-color: rgb(146, 146, 210);
  }

  .task-done {
    background-color: rgb(143, 201, 143);
  }



</style>