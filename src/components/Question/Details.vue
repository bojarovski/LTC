<script>
import Cookies from 'js-cookie';
import axios from "axios";
import { ref } from 'vue';

export default {
  props: ['id'],
  data() {
    return {
      itemData: null,
      loading: true,
      formData: {
        name: '',
        details: '',
      },
      isDialogVisible: false,
    };
  },
  methods: {
    checkLoginStatus() {
      this.isLoggedIn = !!Cookies.get('id');
    },
    getQuestionData() {
      if (this.isLoggedIn) {
        axios.get(`http://localhost:8080/post?post_id=${this.id}`).then(result => {
          if (result.status === 200) {
            this.itemData = result.data;
            this.loading = false;
            console.log(this.itemData);
          }
        }).catch(error => console.error(error));
      }
    },
    postComment() {
      axios.post('http://localhost:8080/comment', {
        post_id: this.id,
        username: this.formData.name,
        description: this.formData.details,
        date: new Date().toISOString().split('T')[0],
      }).then(response => {
        if (response.status === 200) {
          this.getQuestionData();
          this.isDialogVisible = false;
        }
      }).catch(error => console.error(error));
    }
  },
  mounted() {
    this.checkLoginStatus();
    this.getQuestionData();
  },
};
</script>

<template>
  <v-container v-if="!loading">
    <!-- Question Details -->
    <div class="post-data-container">
      <span>{{ itemData.problem }}</span>
      <v-divider class="my-2"></v-divider>
      <span>
        <span class="font-weight-bold">Avtor:</span> {{ itemData.username }}
        <br>
        <span class="font-weight-bold">Datum objave:</span> {{ new Date(itemData.date).toDateString() }}
      </span>
      <v-row class="mt-3" justify="center">
        <v-btn color="error" @click="isDialogVisible = true">Pomagaj</v-btn>
      </v-row>
    </div>

    <!-- Comments Section -->
    <v-expansion-panels v-if="itemData.comments && itemData.comments.length" class="mt-4">
      <v-expansion-panel v-for="(comment, index) in itemData.comments" :key="index">
        <v-expansion-panel-header>
          <span class="mx-1"><strong>Avtor:</strong> {{ comment.username }},</span>
          <span class="mx-1">({{ new Date(comment.date).toDateString() }})</span>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          {{ comment.description }}
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>

  <!-- Comment Modal (Dialog) -->
  <v-dialog v-model="isDialogVisible" max-width="500px">
    <v-card>
      <v-card-title class="headline">Odgovor</v-card-title>
      <v-card-text>
        <v-text-field
          label="Avtor"
          v-model="formData.name"
          placeholder="Vnesite vaše ime..."
          required
          dense
        ></v-text-field>

        <v-textarea
          label="Vaše vprašanje"
          v-model="formData.details"
          placeholder="Predlagajte odgovor"
          rows="5"
          required
          dense
        ></v-textarea>
      </v-card-text>
      <v-card-actions>
        <v-btn text @click="isDialogVisible = false">Zapri</v-btn>
        <v-btn color="error" @click="postComment">Odgovori</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.v-btn.error {
  background-color: #fbb2a3 !important;
  border-color: #fbb2a3 !important;
}

.v-btn.error:hover {
  background-color: #fd9c8c !important;
  border-color: #fd9c8c !important;
}

.v-dialog {
  max-width: 500px;
}

.v-divider {
  border-color: #54627b;
}
</style>
