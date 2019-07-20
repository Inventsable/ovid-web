<template>
  <v-toolbar app dark dense flat :style="getActiveStyle()">
    <v-toolbar-side-icon :style="getIconColor()" @click="toggleDrawer"></v-toolbar-side-icon>

    <v-menu bottom offset-y>
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" flat>
          {{activeApp ? activeApp.name : 'Select an app' }}
          <v-icon class="pl-2">mdi-chevron-down</v-icon>
        </v-btn>
        <!-- <v-btn icon v-on="on">
          <v-icon>mdi-adobe</v-icon>
        </v-btn>-->
      </template>

      <v-list>
        <v-list-tile v-for="(item, i) in apps" :key="i" @click="goToApp(item)">
          <v-list-tile-title>
            <v-icon
              style="min-width: 24px; min-height: 24px;"
              class="mr-2"
            >{{item.active ? 'mdi-check' : ''}}</v-icon>
            <span>{{ item.name }}</span>
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>

    <v-toolbar-title>{{pageTitle}}</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn icon :style="getIconColor()" @click="toggleTheme">
      <v-icon>mdi-format-color-fill</v-icon>
    </v-btn>

    <v-menu bottom offset-y left v-if="!loggedIn">
      <template v-slot:activator="{ on }">
        <v-btn flat v-on="on">
          Login
          <!-- <v-icon>mdi-adobe</v-icon> -->
        </v-btn>
      </template>

      <v-list>
        <v-list-tile v-for="(item, i) in logins" :key="i" @click="checkLogin(item)">
          <v-list-tile-title>
            <v-icon style="min-width: 24px; min-height: 24px;" class="mr-2">{{item.icon}}</v-icon>
            <span>{{ item.name }}</span>
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
    <v-menu bottom offset-y left v-else>
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-avatar size="24" v-if="user">
            <img :src="user.photoURL" />
          </v-avatar>
        </v-btn>
      </template>

      <v-list>
        <!-- <v-list-tile v-for="(item, i) in logins" :key="i" @click="checkLogin(item)">
          <v-list-tile-title>
            <v-icon style="min-width: 24px; min-height: 24px;" class="mr-2">{{item.icon}}</v-icon>
            <span>{{ item.name }}</span>
          </v-list-tile-title>
        </v-list-tile>-->
        <v-list-tile @click="logOut()">
          <v-list-tile-title>
            <!-- <v-icon style="min-width: 24px; min-height: 24px;" class="mr-2">{{item.icon}}</v-icon> -->
            <span>Log out</span>
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>

    <!-- <v-btn icon :style="getIconColor()">
      <v-icon>more_vert</v-icon>
    </v-btn>-->
  </v-toolbar>
</template>

<script>
import firebase from "firebase/app";
import auth from "firebase/auth";
import leylo from "leylo";

export default {
  name: "toolbar",
  data: () => ({
    loggedIn: null,
    pageTitle: "",
    logins: [
      {
        name: "with Google",
        key: "Google",
        icon: "mdi-google"
        // callback: this.loginWithGoogle
      },
      {
        name: "with Github",
        key: "Github",
        icon: "mdi-github-circle"
        // callback: this.loginWithGithub
      }
    ],
    apps: [
      {
        name: "Illustrator",
        key: "ILST",
        active: false,
        colors: {
          min: "#f47920",
          mid: "#c06028",
          max: "#27180d"
        }
      },
      {
        name: "After Effects",
        key: "AEFT",
        active: false,
        colors: {
          min: "#b593c4",
          mid: "#9872b2",
          max: "#21083e"
        }
      },
      {
        name: "Photoshop",
        key: "PHXS",
        active: false,
        colors: {
          min: "#31c5f4",
          mid: "#0c9ec3",
          max: "#071e25"
        }
      },
      {
        name: "InDesign",
        key: "IDSN",
        active: false,
        colors: {
          min: "#ee4591",
          mid: "#c73074",
          max: "#250d16"
        }
      },
      {
        name: "Premiere Pro",
        key: "PPRO",
        active: false,
        colors: {
          min: "#b87cb5",
          mid: "#9b5da6",
          max: "#2a0d32"
        }
      },
      {
        name: "Audition",
        key: "AUDT",
        active: false,
        colors: {
          min: "#5fc3af",
          mid: "#05ad90",
          max: "#042621"
        }
      }
    ]
  }),
  computed: {
    app() {
      return this.$root.$children[0];
    },
    activeApp() {
      return this.apps.find(item => {
        return item.active;
      });
    }
  },
  mounted() {
    this.assignActiveApp();
    this.app.toolbar = this;

    firebase.auth().onAuthStateChanged(user => {
      this.checkUserStatus(user);
    });
  },
  watch: {
    $route() {
      this.assignActiveApp();
    }
  },
  methods: {
    toggleDrawer() {
      console.log("Hello?");
      this.app.drawer.toggle();
    },
    logOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.loggedIn = false;
        });
    },
    checkLogin(item) {
      if (item.key == "Google") this.loginWithGoogle();
      else this.loginWithGithub();
    },
    checkUserStatus(user) {
      if (!user) {
        this.user = null;
        this.loggedIn = false;
      } else {
        this.user = user;
        this.loggedIn = true;
      }

      console.log(user);
    },
    loginWithGoogle() {
      this.signInWithProvider(new firebase.auth.GoogleAuthProvider());
    },
    loginWithGithub() {
      this.signInWithProvider(new firebase.auth.GithubAuthProvider());
    },
    signInWithProvider(provider) {
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(response => {
          // console.log(response.user);
          this.$store.dispatch("setUser", response.user);
        })
        .catch(err => {
          console.error(err);
        });
    },
    toggleTheme() {
      let params = { name: null };
      params.name = /dark/.test(this.$route.params.name)
        ? this.$route.params.name.replace("dark", "")
        : this.$route.params.name + "dark";
      if (this.$route.params.page) params["page"] = this.$route.params.page;
      console.log(params);
      this.$router.push({
        name: "editor",
        params: params
      });
      this.app.editor.toggleTheme();
    },
    assignActiveApp() {
      if (this.$route.params.name) {
        let realkey = this.$route.params.name.replace("dark", "");
        this.apps.forEach(item => {
          item.active = item.key == realkey;
        });
      }
    },
    getActiveStyle() {
      return this.activeApp
        ? `
        background-color: ${this.activeApp.colors.mid};
      `
        : // color: ${this.activeApp.colors.max}
          `
        background-color: #1e1e1e;
        color: #fff;
      `;
    },
    getIconColor() {
      return "#fff";
      // return this.activeApp
      //   ? `color: ${this.activeApp.colors.max}`
      //   : `color: #fff;`;
    },
    goToApp(item) {
      if (!item.active) {
        let realname = /dark/.test(this.$route.params.name)
          ? item.key + "dark"
          : item.key;
        this.$router.push({
          name: "editor",
          params: { name: realname }
        });
      }
    }
  }
};
</script>
