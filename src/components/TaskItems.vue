<template>
    <div class="edit-task" v-if=isTaskEdit>
        <form class="container-input">
            <label class="label-typography" for="title">Title:</label>
            <input v-model="editTask.title" type="text"><br>
            <label class="label-typography" for="task">Task description:</label>
            <textarea rows="6" v-model="editTask.description" type="text"></textarea><br>
        </form>
        <div class="add-task-buttons">
          <div class="priority-section">
            <label class="label-typography" for="title">Priority:</label>
            <input v-model="editTask.priority" type="number" min="1" max="3">
          </div>
            <button class="add-task-btn" @click="saveF" type="button">Save</button>
            <button class="cancel-task-btn" @click="switchEditTask" type="button">Cancel</button>
        </div>
    </div>
    <div v-for="task in useTaskStoreSB.tasks" :key="task.id">
        <div v-if="priority==task.priority" class="items flex-container" :class="[task.is_complete ? taskDone: priorityState[task.priority]]">
            <div class="container-items" >
                <td id="task-title">{{task.title}}</td>
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
</template>

<script setup>
import { ref } from 'vue';
import { useTaskStore } from '../store/task';

defineProps({
  priority: Number
})

const useTaskStoreSB = useTaskStore();
const isTaskEdit = ref(false);
const taskDone = ref ("task-done");
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


function deleteTask(task){
    useTaskStoreSB.delete(task.id);
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
template{
  width: 100%;
}
  .flex-container{
        display: flex;
        justify-content: space-between;
        background-color: #f3f4f7;
        text-align: center;
  }
  .container-items {
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
  }

  .items {
    margin: 5px;
    border: 1px solid black;
    width: 100%;
    height: 100px;
    border-radius: 10px;
    margin: 10px;
    padding: 19px;
  }

  .task-button {
    height: 30%;
  }

  .button-logo {
    height: 100%;

  }

  
  .urgent-priority {
    border: 5px solid #d15b59b1;

  }
  .moderate-priority{
    border: 5px solid rgba(242, 136, 71, 0.859);

  }

  .not-urgent-priority{
    border: 5px solid rgb(146, 146, 210);
  }

  .task-done {
    border: 5px solid rgb(143, 201, 143);
  }

  .edit-task {
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

	.container-input {
    display: flex;
    flex-direction: column;
    width: 60%;
    margin: 5% 5%;
  }

  input, textarea {
    background-color:#D0D1D3;
  }

  .label-typography {
    font-size: larger;
  }

  .add-task-btn {
    border: 2px solid #93B8B5;
    background-color: #93B8B5;
    padding: 10px 15px;
    border-radius: 5px;
  }

  .cancel-task-btn {
    border: 2px solid #a73b3be2;
    background-color: #a73b3be2;
    padding: 10px 15px;
    border-radius: 5px;
    margin-top: 50px;
  }

  .priority-section {
    display: flex;
    flex-direction: column;
    margin-bottom: 50px;
  }

  #task-title {
    font-weight: bold;
    text-align: left;
  }

  #task-description {
    text-align: left;
  }
</style>