<template>
  <v-container class="d-flex justify-center mt-4">
    <!-- Profile Information Table -->
    <v-card outlined class="profile-info-container p-4 me-3" max-width="300">
      <v-card-title class="text-center">Profile</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <h5>Username:</h5>
            <p>{{ username }}</p>
          </v-col>
          <v-col cols="12">
            <h5>Email:</h5>
            <p>{{ email }}</p>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Change Password Table -->
    <v-card outlined class="password-change-container p-4" max-width="400">
      <v-card-title class="text-center">Change Password</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="handleChangePassword">
          <v-text-field
            v-model="newPassword"
            label="New Password:"
            type="password"
            outlined
            dense
            required
          ></v-text-field>

          <v-text-field
            v-model="confirmPassword"
            label="Confirm New Password:"
            type="password"
            outlined
            dense
            required
          ></v-text-field>

          <v-btn type="submit" color="primary" class="mt-3"
            >Change Password</v-btn
          >
        </v-form>

        <v-alert v-if="message" type="info" class="mt-3">{{ message }}</v-alert>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";
import Cookies from "js-cookie";
import router from "@/router";

export default {
  data() {
    return {
      isLoggedIn: false,
      username: "",
      email: "",
      newPassword: "",
      confirmPassword: "",
      message: "",
    };
  },
  mounted() {
    this.checkLoginStatus();
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
      if (!this.isLoggedIn) {
        router.push({ path: "/login" });
      }
      axios
        .get("http://localhost:8080/profile", {
          params: {
            username: Cookies.get("username"),
          },
        })
        .then((response) => {
          console.log("User info:", response.data);
          this.username = response.data.username;
          this.email = response.data.email;
        })
        .catch((error) => {
          console.error("Error fetching user info:", error);
          this.message =
            error.response?.data?.message || "Failed to load user data.";
        });
    },
    handleChangePassword() {
      if (this.newPassword !== this.confirmPassword) {
        this.message = "New passwords do not match.";
        return;
      }

      axios
        .post("http://localhost:8080/changePassword", {
          username: this.username,
          newPassword: this.newPassword,
        })
        .then((response) => {
          this.message =
            response.data.message || "Password changed successfully!";
          this.clearForm();
        })
        .catch((error) => {
          this.message =
            error.response?.data?.message ||
            "An error occurred while changing the password.";
          console.error("Error changing password:", error);
        });
    },
    clearForm() {
      this.newPassword = "";
      this.confirmPassword = "";
    },
    checkLoginStatus() {
      this.isLoggedIn = !!Cookies.get("id");
    },
  },
};
</script>

<style scoped>
.profile-info-container {
  background-color: #f8f9fa;
  border-radius: 8px;
}

.password-change-container {
  background-color: #f8f9fa;
  border-radius: 8px;
}
</style>
