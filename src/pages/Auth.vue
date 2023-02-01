  <template>
    <Header :show-log-out="false" />
    <div class="fill-page">
       <Main />
    </div>
   
    <Footer />

  </template>
  
  <script setup>
    import Header from '../components/Header.vue';
    import Main from '../components/Main.vue';
    import Footer from '../components/Footer.vue';
  </script>
  
  <style scoped>
    .fill-page {
    min-height: 78vh;
  }
  </style>