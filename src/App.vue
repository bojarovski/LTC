<script setup>
import Home from "@/components/Home.vue";
import Navbar from "@/components/Navbar.vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
</script>

<template>
  <v-app id="app">
    <v-app-bar class="px-3" color="grey-4" height="200" flat>
      <Header></Header>
    </v-app-bar>
    <v-navigation-drawer
      location="right"
      class="scrollable-drawer"
      style="
        overflow-y: auto;
        overflow-x: hidden;
        scrollbar-width: none;
        -ms-overflow-style: none;
      "
    >
      <div
        class="mx-2"
        style="
          height: 100%;
          overflow-y: auto;
          overflow-x: hidden;
          scrollbar-width: none;
          -ms-overflow-style: none;
        "
      >
        <h3>Configurations</h3>
        <Configuration />
      </div>
    </v-navigation-drawer>
    <Navbar />
    <v-main>
      <router-view style="position: relative" />
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
