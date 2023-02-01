<template>
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
</template>

<script setup>
import { ref } from 'vue';
import { useTaskStore } from '../store/task';

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

defineProps({
});
function deleteTask(task){
    //console.log("lo estamos borrando");
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
    width: 50%;
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
</style>