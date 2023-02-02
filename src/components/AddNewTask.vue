<template>
	<section>
    <button :class="addCancelLogo" @click="switchIsNewTask" type="button">
    </button>
    <div class="add-task" v-if=isNewTask >
      <form class="container-input">
        <label  class="label-typography" for="title">Title:</label>
        <input v-model="newPostDetails.title" type="text"><br>
        <label class="label-typography" for="task">Task description:</label>
        <textarea rows="6" v-model="newPostDetails.description" type="text"></textarea><br>
      </form>
      <div class="add-task-buttons">
        <div class="priority-section">
          <label class="label-typography" for="title">Priority:</label>
          <input v-model="newPostDetails.priority" type="number" placeholder="1,2 or 3" min="1" max="3">
        </div>
        
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
    background-color:#D0D1D3;
  }

	.add-task {
    display: flex;
    position: fixed; 
    top: 120px;
    left: 30%;
    height: 350px;
    width: 600px;
    background-color:  #f3f4f7;
    border: 2px solid rgb(137, 137, 137);
    border-radius: 10px;
  }

	.add-task-buttons {
    display: flex;
    flex-direction: column;
    width: 20%;
    margin: 5% 5%;
  }

  .priority-section {
    display: flex;
    flex-direction: column;
    margin-bottom: 150px;
  }

  .add-task-btn {
    border: 2px solid #93B8B5;
    background-color: #93B8B5;
    padding: 10px 15px;
    border-radius: 5px;
  }

	.container-input {
    display: flex;
    flex-direction: column;
    width: 60%;
    margin: 5% 5%;
  }

  .label-typography {
    font-size: larger;
  }
</style>