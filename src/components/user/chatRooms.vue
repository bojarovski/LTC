<template>
  <v-app>
    <v-container>
      <v-row class="mt-10">
        <!-- Room Creation -->
        <v-col cols="12" md="6">
          <v-card>
            <v-card-title>Ustvari novo sobo</v-card-title>
            <v-card-text>
              <v-text-field
                v-model="newRoomName"
                label="Vnesite ime sobe"
                outlined
                dense
              />
              <v-btn @click="createRoom" color="primary" block
                >Ustvari sobo</v-btn
              >
            </v-card-text>
          </v-card>
        </v-col>

        <!-- Room List -->
        <v-col cols="12" md="6">
          <v-card>
            <v-card-title>Razpoložljive sobe</v-card-title>
            <v-card-text>
              <v-list>
                <v-list-item
                  v-for="room in availableRooms"
                  :key="room"
                  @click="joinRoom(room)"
                  style="cursor: pointer"
                >
                  <v-list-item-content>
                    <v-list-item-title>{{ room }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- Chatroom -->
        <v-col v-if="currentRoom" cols="12">
          <v-card>
            <v-card-title>Soba: {{ currentRoom }}</v-card-title>
            <v-card-text>
              <div id="chatbox" ref="chatbox">
                <div v-for="(message, index) in messages" :key="index">
                  <strong>{{ message.username }}:</strong> {{ message.content }}
                </div>
              </div>

              <v-text-field
                v-model="username"
                label="Vnesite svoje uporabniško ime"
                outlined
                dense
              />
              <v-text-field
                v-model="message"
                @keyup.enter="sendMessage"
                label="Vnesite svojo sporočilo"
                outlined
                dense
              />
              <v-btn @click="sendMessage" color="primary" block>Pošlji</v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      newRoomName: "",
      availableRooms: [],
      currentRoom: null,
      username: "",
      message: "",
      messages: [],
      socket: null,
    };
  },
  methods: {
    async fetchRooms() {
      try {
        const response = await fetch("http://localhost:8080/rooms");
        if (response.ok) {
          const data = await response.json();
          this.availableRooms = data.rooms;
        } else {
          alert("Failed to fetch rooms");
        }
      } catch (err) {
        console.error("Error fetching rooms:", err);
      }
    },

    async createRoom() {
      if (!this.newRoomName.trim()) {
        alert("Room name cannot be empty!");
        return;
      }

      try {
        const response = await fetch("http://localhost:8080/create_room", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ room_name: this.newRoomName }),
        });

        if (response.ok) {
          const data = await response.json();
          //   alert(`Room "${data.room_name}" created successfully!`);
          this.newRoomName = "";
          this.fetchRooms();
        } else {
          const error = await response.json();
          alert(error.error || "Failed to create room");
        }
      } catch (err) {
        console.error("Error creating room:", err);
        alert("An error occurred while creating the room.");
      }
    },

    joinRoom(roomName) {
      this.currentRoom = roomName;
      this.messages = [];
      this.connectWebSocket();
    },

    connectWebSocket() {
      if (this.socket) {
        this.socket.close();
      }

      this.socket = new WebSocket(
        `ws://localhost:8080/ws?room=${this.currentRoom}`
      );

      this.socket.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        this.messages.push(msg);
        this.scrollToBottom();
      };

      this.socket.onclose = () => {
        console.log("WebSocket closed. Reconnecting...");
        setTimeout(this.connectWebSocket, 1000);
      };

      this.socket.onerror = (error) => {
        console.error("WebSocket error:", error);
      };
    },

    sendMessage() {
      if (!this.username.trim() || !this.message.trim()) {
        alert("Both username and message are required!");
        return;
      }

      const msg = {
        username: this.username,
        content: this.message,
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
    this.fetchRooms();
  },
};
</script>

<style scoped>
#chatbox {
  border: 1px solid #ccc;
  height: 300px;
  overflow-y: scroll;
  margin-bottom: 10px;
  padding: 10px;
  background-color: #f9f9f9;
}
</style>
