<template>
  <v-container>
    <!-- Search input field -->
    <v-row class="my-4">
      <v-col cols="12" md="12" lg="12">
        <v-text-field
          v-model="searchQuery"
          label="Search posts"
          outlined
          dense
          prepend-icon="mdi-magnify"
        />
      </v-col>
    </v-row>

    <!-- Post list -->
    <v-row>
      <v-col
        v-for="(item, index) in filteredPosts"
        :key="index"
        cols="12"
        md="6"
        lg="4"
      >
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
            Comments: {{ item.comments?.length ?? 0 }}
            <v-btn color="error" @click="goToDetails(item.ID)">Pomagaj</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { ref } from "vue";
import axios from "axios";
import Cookies from "js-cookie";

export default {
  name: "Posts",
  data() {
    return {
      data: null,
      searchQuery: "", // Holds the search query
    };
  },
  computed: {
    // Filtered posts based on the search query
    filteredPosts() {
      if (!this.searchQuery) {
        return this.data; // If no search query, return all posts
      }
      return this.data.filter((item) => {
        return (
          item.problem.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          item.username.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      });
    },
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
