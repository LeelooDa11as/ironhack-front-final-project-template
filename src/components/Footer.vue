<template>
    <footer>
        <div class="container">
            <h1 id="name">Kateryna Koval</h1>
            <h1 id="project">IronHack Final Project, 2023</h1>
        </div>
        <div>
            <img id="ironhack-logo" src="../assets/ironhack-logo.png" alt="Ironhack logo" />
        </div>
        
      
    </footer>
</template>

<script setup>

</script>

<style scoped>
footer {
    height: 9vh;
    background-color: #434A5A;
    width: 100%;
    display: flex;
    justify-content: center;
}

.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

h1 {
    text-align: center;
    line-height: 0.7cm;
}

#name {
    color: #DFB068;
    font-size: larger;
}

#project {
    color: #DFB068;
}

#ironhack-logo {
    height: 50%;
    float: right;
    margin-right: 20px;
    margin-top: 20px;
}


</style>