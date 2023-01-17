<template>
    <nav class="flex-container">
        <div class="flex-item">
            <img class="logo-img" src="../assets/logo-1.png" alt="Logo image" />
        </div>
        <div class="flex-item">
            <h1 id="title">Vite Check</h1>
        </div>
    </nav>
</template>

<script setup>

</script>

<style scoped>
.flex-container{
    width: 100%;
    height: 100px;
    display: flex;
    margin: 2% 2%;
}

.flex-item{
    width: 30%;
    height: 100%;
}

#title {
    font-size: 4rem;
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
    font-size: 6.2rem;
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
}
.logo-img{
    height: 100%;
}
</style>