<script>
import { ref } from "vue";
import axios from "axios";
import Cookies from "js-cookie";

export default {
  name: "Posts",
  data() {
    return {
      data: null,
    };
  },
  mounted() {
    this.runOnLoad();
  },
  methods: {
    runOnLoad() {
      axios
        .get("http://localhost:8080/posts")
        .then((response) => {
          this.data = response.data;
        })
        .catch((error) => console.error(error));
    },
    goToDetails(id) {
      this.$router.push({ name: "Details", params: { id } });
    },
  },
};
</script>

<template>
  <v-container>
    <v-row>
      <v-col v-for="(item, index) in data" :key="index" cols="12" md="6" lg="4">
        <v-card class="mb-4" hover>
          <v-card-title>
            <h4 class="headline">{{ item.problem }}</h4>
          </v-card-title>
          <v-card-subtitle>
            <span><strong>Datum objave:</strong> {{ item.date }}</span>
            <br />
            <span><strong>Avtor:</strong> {{ item.username }}</span>
          </v-card-subtitle>
          <v-card-actions class="justify-end">
            <v-btn color="error" @click="goToDetails(item.ID)">Pomagaj</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.v-card {
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>
