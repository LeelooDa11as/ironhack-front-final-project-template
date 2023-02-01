<template>
    <nav class="flex-container">
       <div class="flex-item flex-img">
            <img class="logo-img" src="../assets/logo.png" alt="Logo image" />
        </div>
        <div class="flex-item">
        </div>
        <div  class="flex-item">
            <button v-if=showLogOut class="log-out-btn" @click="useUserSB.logOut" type="button">Log out</button>
        </div>
    </nav>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '../store/user';

const useUserSB = useUserStore();
defineProps ({
    showLogOut: Boolean
})

</script>

<style scoped>
.flex-container{
    width: 100%;
    height: 10vh;
    display: flex;
    justify-content: center;
    background-color: #93B8B5;
    align-items: center;
    margin-bottom: 25px;
}

.flex-item {
    text-align: center;
}
.flex-item{
    margin-left: 5%;
    margin-right: 5%;
    width: 40%;
}

.flex-img {
    height: 100%;
    width: 20%;
}

.log-out-btn {
    background-color: #DEAE66;
    color: black;
    border: 1px solid #DEAE66;
    padding: 5px 10px;
    border-radius: 4px;
    float: right;
}

.logo-img{
    float: center;
    width: 100%;
}
</style>