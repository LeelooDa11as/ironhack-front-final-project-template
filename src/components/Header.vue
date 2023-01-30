<template>
    <nav class="flex-container">
        <div class="flex-item flex-img">
            <img class="logo-img" src="../assets/logo-1.png" alt="Logo image" />
        </div>
        <div class="flex-item">
            <h1 id="title">Vite Check</h1>
        </div>
        <div v-if=showLogOut class="flex-item">
            <button class="log-out-btn" @click="useUserSB.logOut" type="button">Log out</button>
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
    justify-content: space-between;
    background-color: rgb(114, 114, 114);
    align-items: center;
}

.flex-item{
    margin-left: 5%;
    margin-right: 5%;
}

.flex-img {
    height: 100%;
}

.log-out-btn {
    background-color: rgb(228, 215, 117);
    color: black;
    border: 1px solid rgb(228, 215, 117);
    padding: 5px 10px;
    border-radius: 4px;
}

/*#title {
    font-size: 3rem;
    font: lighter;
    color: #fff;
    font-style: italic;
    text-shadow:
        0 0 7px #fff,
        0 0 10px #bc13fe,
        0 0 21px #bc13fe,
        0 0 42px #bc13fe,
        0 0 82px #bc13fe,
        0 0 92px #351143,
        0 0 102px #351143,
        0 0 151px #351143;
}

h1 {
    text-align: center;
    font-weight: 400;
    font-size: 4rem;
    animation: pulsate 1.5s infinite alternate;  
    border: 0.2rem solid #fff;
    border-radius: 2rem;
    padding: 0.4em;
    box-shadow: 0 0 .2rem #fff,
                0 0 .2rem #fff,
                0 0 2rem #bc13fe,
                0 0 0.8rem #bc13fe,
                0 0 2.8rem #bc13fe,
                inset 0 0 1.3rem #bc13fe; 
} */
.logo-img{
    height: 100%;
}
</style>