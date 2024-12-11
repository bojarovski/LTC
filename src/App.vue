<script setup>
import Home from "@/components/Home.vue";
import Navbar from "@/components/Navbar.vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
</script>

<template>
  <v-app id="inside">
    <v-app-bar color="grey-4" flat>
      <Header></Header>
    </v-app-bar>

    <Navbar />
    <v-main
      style="
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        position: relative;
      "
    >
      <router-view />
    </v-main>
    <v-footer>
      <Footer></Footer>
    </v-footer>
  </v-app>
</template>

<style scoped>
header {
  line-height: 1.5;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
