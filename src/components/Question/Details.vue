<template>
  <v-container v-if="!loading" class="py-5">
    <!-- Question Details -->
    <v-card outlined elevation="2" class="pa-4 mb-4">
      <v-row class="mb-2" justify="space-between" align="center">
        <h4 class="mb-0">{{ itemData.problem }}</h4>

        <v-btn @click="toggleHeart" :color="heartColor" class="pa-0">
          Like {{ itemData.likeCount }}
        </v-btn>
      </v-row>
      <v-divider class="mb-3"></v-divider>
      <p>
        <strong>Avtor:</strong> {{ itemData.username }}<br />
        <strong>Datum objave:</strong>
        {{ new Date(itemData.date).toDateString() }}
      </p>
      <v-row class="mt-3" justify="center">
        <v-btn
          class="mx-5"
          color="primary"
          :disabled="itemData?.locked === true"
          @click="isDialogVisible = true"
          >Pomagaj</v-btn
        >
        <v-btn class="mx-5" color="primary" @click="openSummaryDialog"
          >Summarize</v-btn
        >
      </v-row>
    </v-card>

    <!-- Comments Section -->
    <v-card outlined elevation="2" class="pa-4">
      <h5>Komentarji</h5>
      <v-divider class="mb-3"></v-divider>
      <template v-if="itemData.comments?.length">
        <v-expansion-panels v-model="openPanels" variant="accordion">
          <v-expansion-panel
            v-for="(comment, index) in itemData.comments"
            :key="index"
            :text="`Avtor: ${comment.username}, (${new Date(
              comment.date
            ).toDateString()})`"
            :title="comment.description"
            :value="index"
          ></v-expansion-panel>
        </v-expansion-panels>
      </template>
      <v-alert v-else type="info" class="mt-3">
        Trenutno ni komentarjev. Bodite prvi, ki bo komentiral!
      </v-alert>
    </v-card>
  </v-container>

  <!-- Dialog for Adding a Comment -->
  <v-dialog v-model="isDialogVisible" max-width="500px">
    <v-card>
      <v-card-title class="headline">Dodajte Komentar</v-card-title>
      <v-card-text>
        <v-text-field
          label="Avtor"
          v-model="formData.name"
          placeholder="Vnesite vaše ime..."
          required
        ></v-text-field>
        <v-textarea
          label="Vaš odgovor"
          v-model="formData.details"
          placeholder="Predlagajte odgovor..."
          rows="5"
          required
        ></v-textarea>
      </v-card-text>
      <v-card-actions>
        <v-btn text @click="isDialogVisible = false">Prekliči</v-btn>
        <v-btn color="primary" @click="postComment">Objavi</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- Dialog for Summary -->
  <v-dialog v-model="isSummaryDialogVisible" max-width="500px">
    <v-card>
      <v-card-title class="headline">Summary</v-card-title>
      <v-card-text>
        <p v-if="summary">{{ summary }}</p>
        <p v-else>Fetching summary...</p>
      </v-card-text>
      <v-card-actions>
        <v-btn text @click="isSummaryDialogVisible = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Cookies from "js-cookie";
import axios from "axios";

export default {
  props: ["id"],
  data() {
    return {
      itemData: null,
      loading: true,
      formData: {
        name: "",
        details: "",
      },
      isDialogVisible: false,
      isSummaryDialogVisible: false, // For summary dialog
      isLoggedIn: false,
      heartColor: "grey", // Default heart color
      openPanels: [], // Track open panels
      summary: null, // Store the summary response
    };
  },
  computed: {
    defaultOpenPanels() {
      if (!this.itemData || !this.itemData.comments) return [];
      // Find all indices where the username is "AI"
      return this.itemData.comments
        .map((comment, index) => (comment.username === "AI" ? index : null))
        .filter((index) => index !== null);
    },
  },
  methods: {
    checkLoginStatus() {
      this.isLoggedIn = !!Cookies.get("id");
    },
    async getQuestionData() {
      if (!this.isLoggedIn) return;

      try {
        const response = await axios.get(
          `http://localhost:8080/post?post_id=${this.id}`
        );
        if (response.status === 200) {
          this.itemData = response.data;
          this.loading = false;
          this.openPanels = this.defaultOpenPanels;

          // Check if the post has already been liked by this user
          if (sessionStorage.getItem(`likedPost-${this.id}`)) {
            this.heartColor = "red"; // Set the heart color to red
          }
        }
      } catch (error) {
        console.error("Error fetching question data:", error);
      }
    },
    async postComment() {
      if (!this.formData.name || !this.formData.details) {
        alert("Please fill out all fields.");
        return;
      }

      try {
        const response = await axios.post("http://localhost:8080/comment", {
          post_id: this.id,
          username: this.formData.name,
          description: this.formData.details,
          date: new Date().toISOString().split("T")[0],
        });

        if (response.status === 200) {
          this.getQuestionData();
          this.isDialogVisible = false;
          this.formData = { name: "", details: "" };
        }
      } catch (error) {
        console.error("Error posting comment:", error);
      }
    },
    async openSummaryDialog() {
      this.summary = null; // Clear previous summary
      this.isSummaryDialogVisible = true; // Open the summary dialog
      try {
        const response = await axios.get(
          "http://localhost:8080/post/summarize",
          {
            params: {
              post_id: this.id, // Ensure `itemData.id` contains the correct post ID
            },
          }
        );
        if (response.status === 200) {
          this.summary = response.data.summary; // Assuming the API returns a 'summary' field
        } else {
          this.summary = "Failed to generate summary.";
        }
      } catch (error) {
        console.error("Error summarizing question:", error);
        this.summary = "Error generating summary.";
      }
    },
    async toggleHeart() {
      if (this.heartColor !== "red") {
        try {
          // Send a request to increment the like count in the backend
          await axios.post("http://localhost:8080/post/like", {
            post_id: this.id,
          });

          // Increment the like count locally
          this.itemData.likeCount += 1;

          // Store the liked post's ID in the session
          sessionStorage.setItem(`likedPost-${this.id}`, true);

          // Change the heart color to red to indicate a "liked" state
          this.heartColor = "red";
        } catch (error) {
          console.error("Error liking the post:", error);
        }
      }
    },
  },
  mounted() {
    this.checkLoginStatus();
    this.getQuestionData();
  },
};
</script>
