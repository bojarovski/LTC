<script setup>
import Home from "@/components/Home.vue";
import Navbar from "@/components/Navbar.vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
</script>

<template>
  <v-app>
    <v-app-bar flat>
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
    <v-footer class="footer-section">
      <v-row align="center" justify="center">
        <span>
          Razvoj in upravlanje računalniških sistemov
          <br />
          Fakulteta za elektrotehniko, računalništvo in informatiko @ 2024/2025
          <br />
          MARIO CARE STAMPAJ NAM PARE
        </span>
      </v-row>
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
  .footer-section {
    background-color: #a1bced;
    min-height: 20vh; /* Make the footer fill the entire screen */
    display: flex;
    align-items: center; /* Center content vertically */
    justify-content: center; /* Center content horizontally */
  }

  .footer-section span {
    font-size: 18px;
    font-weight: bold;
    color: white;
    text-align: center; /* Center the text inside the span */
  }
}
</style>
