<template>
  <v-app>
    <v-container class="pa-4">
      <v-card class="pa-4">
        <v-card-title class="text-h4">Global Chat</v-card-title>
        <v-card-text>
          <v-container>
            <!-- Chat Messages -->
            <v-row>
              <v-col>
                <div id="chatbox" ref="chatbox" class="chatbox">
                  <div
                    v-for="(message, index) in messages"
                    :key="index"
                    class="message"
                  >
                    <strong>{{ message.username }}:</strong>
                    {{ message.content }}
                    <span class="timestamp">({{ message.timestamp }})</span>
                  </div>
                </div>
              </v-col>
            </v-row>

            <!-- Inputs -->
            <v-row class="mt-3">
              <v-col cols="12" sm="4">
                <v-text-field
                  v-model="username"
                  label="Enter your username"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="message"
                  label="Enter your message"
                  outlined
                  @keyup.enter="sendMessage"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="2">
                <v-btn color="primary" @click="sendMessage" block>Send</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      username: "", // Username for the chat
      message: "", // Message to be sent
      messages: [], // Array to store received messages
      socket: null, // WebSocket connection
    };
  },
  methods: {
    connectWebSocket() {
      this.socket = new WebSocket("ws://localhost:8080/ws");

      this.socket.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        // Add timestamp to the received message
        msg.timestamp = new Date().toLocaleTimeString();
        this.messages.push(msg);
        this.scrollToBottom();
      };

      this.socket.onclose = () => {
        console.log("WebSocket connection closed. Reconnecting...");
        setTimeout(this.connectWebSocket, 1000);
      };
    },
    sendMessage() {
      if (!this.username || !this.message) {
        alert("Both username and message are required!");
        return;
      }

      const msg = {
        username: this.username,
        content: this.message,
        timestamp: new Date().toLocaleTimeString(), // Add timestamp when sending message
      };

      this.socket.send(JSON.stringify(msg));
      this.message = "";
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const chatbox = this.$refs.chatbox;
        chatbox.scrollTop = chatbox.scrollHeight;
      });
    },
  },
  mounted() {
    this.connectWebSocket();
  },
};
</script>

<style scoped>
.chatbox {
  border: 1px solid #ccc;
  height: 300px;
  overflow-y: auto;
  margin-bottom: 10px;
  padding: 10px;
}
.message {
  margin-bottom: 8px;
}
.timestamp {
  font-size: 0.8em;
  color: gray;
  margin-left: 10px;
}
</style>
