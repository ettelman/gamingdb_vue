<script>
    import { RouterLink } from 'vue-router';
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
export default {
    components: {
        Header,
        Footer
    }
    
}
</script>

<template>
  <div class="wrapper">
<Header />
<RouterView />
<Footer />
</div>
</template>

<style scoped>
.wrapper {
    margin: auto;
    margin-top: 1vh;
    margin-bottom: 1vh;
    max-width: 1200px;
   background-color: white;
   border-radius: 10px;
   border:1px solid #cacaca;
   padding: 1rem;
   
}
@media (max-width: 850px) {
    .wrapper {
        width: 90%;
        margin-top: 1vh;
        margin: 1vh, auto;
    }
}
</style>
