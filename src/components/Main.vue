<template>
    <section class="flex-container">
       <!--<div class="check-list-img"></div>--> 
        
        <!--<form :class="logIn">-->
        <form class="form" v-if=isLogIn >
            <div class="email-container">
                <label for="email">Enter your email:</label>
                <input type="email" v-model="email.name">
                <label for="email">Enter your password:</label>
                <input type="password" v-model="email.password1">
                <div id="container-btn">
                    <button @click="logInf" type="button">Log in</button>
                    <button @click="changeForm" type="button">Sign up</button>
                </div>
            </div>
        </form>
        <!--<form :class="signUp">-->
        <form class="form" v-else>
            <div class="email-container">
                <label for="email">Enter your email:</label>
                <input type="email" v-model="email.name">
                <label for="email">Enter your password:</label>
                <input type="password" v-model="email.password1">
                <label for="email">Repeat your password:</label>
                <input type="password" v-model="email.password2">
                <div id="container-btn">
                    <button @click="changeForm" type="button">Log in</button>
                    <button @click="signUpf" type="button">Sign up</button>
                </div>
            </div>
        </form>
    </section>
</template>

<script setup>
    import { ref } from 'vue';
    import { useUserStore } from '../store/user';

    const userStore = useUserStore(); 
    const logIn = ref("email-container"); 
    const signUp = ref("hidden");
    const isLogIn = ref(true);

    

    function changeForm() {
        isLogIn.value = !isLogIn.value;
    };
    

    const email = ref({
        name: "",
        password1: "",
        password2: "",
    });

    function validateName(name) {
        if (name.includes("@") && name.includes(".")){
            return(true);
        } else {
            alert("Not a valid email!")
            return(false);
        }
    };

    
    function validatePassword(password) {
        if (password.length >= 6){
            return(true);
        } else {
            alert("The password is too short!")
            return(false);
        }
    };

    function validatePasswordRepetition () {
        if (email.value.password1 === email.value.password2){
            return(true);
        } else {
            alert("The password do not match");
            return(false);
        }
    };

    function validateEmail () {
        const val1 = validateName(email.value.name);
        const val2 = validatePassword(email.value.password1);
        if (val1 && val2) {
            return(true);
        } else {
            alert("Somethign went wrong, try again")
            return(false);
        }
    };

    function signUpf() {
        const validation = validateSignUp();
        if (validation) {
            userStore.signUp(email.value.name, email.value.password1);
        }
    };

    function logInf() {
        const validation = validateEmail();
        if (validation) {
            userStore.signIn(email.value.name, email.value.password1);
        }
    };

    function validateSignUp () {
        const val1 = validateName(email.value.name);
        const val2 = validatePassword(email.value.password1);
        const val3 = validatePasswordRepetition();
        if (val1 && val2 && val3){
            return true;
        }
        else {
            alert("Something went wrong, repeat your registration!")
            return false;
        }

    };




</script>

<style scoped>
section {
    color: aliceblue;
}
input {
    color: black;
}
    .flex-container{
        display: flex;
        flex-direction: row;
        height: 500px;
        width: 100%;
        justify-content: center;
        margin-top: 100px;
    }
  
    .form{
        display: flex;
        width: 40%;
        background-color: rgba(45, 41, 68, 0.903);
        justify-content: center;

    }

    .email-container{
        margin: 10% 15%;
        width: 70%;
        display: flex;
        flex-direction: column;
        background-color: rgba(45, 41, 68, 0.903);

    }

    .email-items{
        width: 90%;
    }

    .hidden {
        display: none;
    }

    #container-btn {
        display: flex;
        width: 100%;
        justify-content: space-around;
    }


</style>