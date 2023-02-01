<template>
    <section class="flex-container">
        <form class="form" v-if=isLogIn >
            <div class="email-container">
                <div class="hero-image-log-container">
                </div>
                <label class="email-font" for="email">Enter your email:</label>
                <input type="email" v-model="email.name">
                <label class="email-font" for="email">Enter your password:</label>
                <input type="password" v-model="email.password1">
                <div id="container-btn">
                    <button class="active-btn" @click="logInf" type="button">Log in</button>
                    <button @click="changeForm" type="button">Sign up</button>
                </div>
            </div>
        </form>
        <form class="form" v-else>
            <div class="email-container">
                <div class="hero-img-sign-container">
                </div>
                <label class="email-font" for="email">Enter your email:</label>
                <input type="email" v-model="email.name">
                <label class="email-font" for="email">Enter your password:</label>
                <input type="password" v-model="email.password1">
                <label class="email-font" for="email">Repeat your password:</label>
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


input {
    background-color: #D0D1D3;
    color: black;
    margin: 1% 0%;
    padding: 5px;
    border: 2px solid #444B5B;
    border-radius: 10px;
}
    .flex-container{
        display: flex;
        flex-direction: row;
        height: 550px;
        width: 100%;
        justify-content: center;
    }
  
    .form{
        display: flex;
        width: 40%;
        background-color:  #f3f4f7;
        border: 2px solid rgb(137, 137, 137);
        justify-content: center;
        border-radius: 10px;

    }

    .email-container{
        margin: 5% 5%;
        width: 70%;
        display: flex;
        flex-direction: column;

    }

    .hero-image-log-container {
        width: 100%;
        height: 250px;
        background-image: url(../assets/stationary.jpg);
        background-size: cover;
    }

    .hero-img-sign-container {
        width: 100%;
        height: 200px;
        background-image: url(../assets/messy-hero.jpg);
        background-size: cover;
    }

    .email-font {
        font-size: larger;
    }

    .hidden {
        display: none;
    }

    #container-btn {
        display: flex;
        width: 100%;
        justify-content: space-around;
    }

    button {
        padding: 15px 40px;
        background-color: #93B8B5;
        border-radius: 5px;
        color: black;
        margin-top: 5%;
    }

    .active-btn {
        padding: 15px 40px;
        background-color: #a73b3be2;
        border-radius: 5px;
        margin-top: 5%;
        color: black;
    }

    #hero-text {
        text-align: center;

    }

    h1 {
    font-size: 3rem;
    font: lighter;
    color: #fff;
    text-shadow:
        0 0 7px rgb(198, 79, 79),
        0 0 10px #A43A3A,
        0 0 21px #DFAF67,
        0 0 42px #DFAF67
       
}


</style>