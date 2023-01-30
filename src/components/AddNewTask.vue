<template>
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

</template>

<script setup>
	import { ref } from 'vue';
	import { useUserStore } from '../store/user';
	import { useTaskStore } from '../store/task';

	const useTaskStoreSB = useTaskStore();
  const userStoreSB = useUserStore(); 

	const addCancelLogo = ref("add-btn-icon");
  const isNewTask = ref(false);
  const currentTask = ref(null);
  const newPostDetails = ref ({ 
    user_id: "",
    title: "",
    description: "",
    priority: 1
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


</script>
<style scoped>
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



  input, textarea {
    background-color:bisque;
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

	.add-task-buttons {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin: 5%;
  }

	.container-input {
    display: flex;
    flex-direction: column;
  }



</style>