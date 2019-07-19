import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebase from "firebase/app";
// eslint-disable-next-line
import leylo from "leylo";

Vue.config.productionTip = false;

let app = null;
firebase.auth().onAuthStateChanged(() => {
  console.log("Auth changed");
  if (!app) {
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});
