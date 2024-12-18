<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <h1 class="text-center">Vprašaj!</h1>

        <div v-if="isLoggedIn">
          <v-card class="pa-5">
            <v-form @submit.prevent="submitAQuestion">
              <v-text-field
                v-model="formData.name"
                label="Avtor:"
                placeholder="Vnesite vaše ime..."
                outlined
                dense
                required
              ></v-text-field>

              <v-textarea
                v-model="formData.qustion"
                label="Vaše vprašanje:"
                placeholder="Opišite vaš problem in kaj vas zanima..."
                outlined
                dense
                rows="5"
                required
              ></v-textarea>

              <v-btn
                type="submit"
                color="red"
                class="mt-4 d-block mx-auto"
                :disabled="isButtonDisabled"
              >
                Vprašaj
              </v-btn>
            </v-form>
          </v-card>
        </div>

        <div v-else class="text-center">
          <p class="mt-4 not-logged-in-info">
            V kolikor želite postaviti vprašanje morate biti v sistem
            prijavljeni.
          </p>

          <v-row class="mt-4" justify="center" align="center">
            <v-col cols="6" class="text-center">
              <v-btn color="primary">
                <router-link class="button-link-text" to="/login"
                  >Prijava</router-link
                >
              </v-btn>
            </v-col>
            <v-col cols="6" class="text-center">
              <v-btn color="primary">
                <router-link class="button-link-text" to="/register"
                  >Registracija</router-link
                >
              </v-btn>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Cookies from "js-cookie";
import axios from "axios";

export default {
  data() {
    return {
      isLoggedIn: false,
      formData: {
        name: "",
        qustion: "",
      },
    };
  },
  computed: {
    isButtonDisabled() {
      return !this.formData.name || !this.formData.qustion;
    },
  },
  methods: {
    checkLoginStatus() {
      this.isLoggedIn = !!Cookies.get("id");
    },
    submitAQuestion() {
      console.log(this.formData.name);
      axios
        .post("http://localhost:8080/post", {
          username: this.formData.name,
          problem: this.formData.qustion,
        })
        .then((response) => {
          if (response.status === 200) {
            this.$router.push({ name: "Posts" });
          }
        })
        .catch((error) => console.error(error));
    },
  },
  mounted() {
    this.checkLoginStatus();
  },
};
</script>

<style>
.not-logged-in-info {
  font-size: 22px;
  font-weight: bold;
}

.button-link-text {
  color: white;
  text-decoration: none;
}
</style>
