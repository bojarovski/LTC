import { createApp } from "vue";
import { createVuetify } from "vuetify";
import "vuetify/styles";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "@fortawesome/fontawesome-free/css/all.css";

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    icons: {
      defaultSet: "mdi", // Material Icons
    },
  },
});
import App from "./App.vue";
import "./assets/main.css";
import router from "./router";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
createApp(App).use(vuetify).use(router).mount("#app");
