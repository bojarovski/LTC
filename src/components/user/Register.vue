<template>
  <v-container class="register-container">
    <v-alert v-if="errorMessage" type="error" dismissible>
      {{ errorMessage }}
    </v-alert>

    <v-form ref="form" lazy-validation>
      <h2>Login Form</h2>
      <h5>Fill Filds and tryt to not make mistake</h5>
      <v-text-field
        label="Uporabniško ime:"
        v-model="username"
        outlined
        dense
        placeholder="Vnesi uporabniško ime..."
      />

      <v-text-field
        label="Elektronski naslov:"
        v-model="email"
        outlined
        dense
        :rules="[rules.required, rules.email]"
        placeholder="Vnesi elektronski naslov..."
      />

      <v-text-field
        label="Geslo:"
        v-model="password"
        type="password"
        outlined
        dense
        placeholder="Vnesi geslo..."
      />

      <v-text-field
        label="Ponovi geslo:"
        v-model="repeat_password"
        type="password"
        outlined
        dense
        :rules="[rules.required, matchPasswords]"
        placeholder="Ponovno vnesi geslo..."
      />

      <v-btn color="secondary" class="mt-4" block @click="addUser">
        Registracija
      </v-btn>
    </v-form>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "Register",
  data() {
    return {
      username: "",
      email: "",
      password: "",
      repeat_password: "",
      errorMessage: "",
      rules: {
        required: (value) => !!value || "This field is required",
        email: (value) => /.+@.+\..+/.test(value) || "Invalid email address",
      },
    };
  },
  methods: {
    matchPasswords() {
      return this.password === this.repeat_password || "Passwords do not match";
    },
    async addUser() {
      if (this.$refs.form.validate()) {
        try {
          const response = await axios.post("http://localhost:8080/register", {
            Username: this.username,
            Email: this.email,
            Password: this.password,
          });
          this.$router.push({ path: "/login" }).then(() => {
            window.location.reload();
          });
        } catch (error) {
          this.errorMessage =
            error.response?.data?.message || "An error occurred";
        }
      }
    },
  },
};
</script>

<style scoped>
.register-container {
  border: 1px solid #54627b;
  border-radius: 5px;
  padding: 30px 40px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

.form-label {
  font-size: 17px;
  font-weight: bold;
}

.btn-secondary {
  background-color: #54627b;
}
</style>
