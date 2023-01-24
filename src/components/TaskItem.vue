<template>
    <div class="flex-container">
        <form class="container-items">
            <div class="items">
                <h2>Title</h2>
            </div>
            <div class="items">
                <p>Contents of the each to do.</p>
            </div>
        </form>
        <div class="container-items">
            <button type="button">Done</button>
            <button type="button">Edit</button>
            <button type="button">Delete</button>
        </div>


    </div> 
</template>

<script setup>
import { ref } from 'vue';

</script>

<style scoped>
    .flex-container{
        display: flex;

    }

    .container-items {
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
    }

</style>