<template>
  <v-row class="footer-section" align="center" justify="center">
    <span>
      Razvoj in upravlanje računalniških sistemov
      <br />
      Fakulteta za elektrotehniko, računalništvo in informatiko @ 2024/2025
      <br />
      MARIO CARE STAMPAJ NAM PARE
    </span>
  </v-row>
</template>

<script setup></script>

<style scoped>
/* Make the footer section fill the entire screen */
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
</style>
