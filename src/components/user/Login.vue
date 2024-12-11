<template>
  <v-container class="flex justify-center">
    <v-card class="pa-5" elevation="5" max-width="500">
      <v-alert v-if="errorMessage" type="error" dismissible class="mb-4">
        {{ errorMessage }}
      </v-alert>
      <!-- <h2>Login Form</h2>
      <h5>Fill Filds and tryt to not make mistake</h5> -->
      <v-form ref="form" v-model="isFormValid">
        <v-text-field
          v-model="username"
          label="Uporabniško ime"
          outlined
          required
          placeholder="Vnesi uporabniško ime..."
          class="mb-4"
        ></v-text-field>

        <v-text-field
          v-model="password"
          label="Geslo"
          outlined
          type="password"
          required
          placeholder="Vnesi geslo..."
          class="mb-4"
        ></v-text-field>

        <v-btn
          color="secondary"
          block
          large
          :disabled="!isFormValid"
          @click="loginUser"
        >
          Prijava
        </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";
import Cookies from "js-cookie";

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      errorMessage: "",
      isFormValid: false,
      rules: {
        required: (value) => !!value || "To polje je obvezno.",
      },
    };
  },
  methods: {
    async loginUser() {
      if (!this.$refs.form.validate()) return;
      try {
        const response = await axios.post("http://localhost:8080/login", {
          Username: this.username,
          Password: this.password,
        });
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 7);
        Cookies.set("id", response.data.id, { expires: expiryDate });
        Cookies.set("username", response.data.user, { expires: expiryDate });
        this.$router.push({ path: "/" }).then(() => {
          window.location.reload();
        });
      } catch (error) {
        this.errorMessage = "Username or Password is incorrect";
      }
    },
  },
};
</script>

<style scoped>
.v-btn {
  background-color: #54627b !important;
}
</style>
