<template>
  <v-toolbar app :dark="isDark" dense :flat="isDark" :style="getActiveStyle()">
    <v-toolbar-side-icon :style="getIconColor()" @click="toggleDrawer"></v-toolbar-side-icon>

    <v-menu bottom offset-y :disabled="doc ? true : false">
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" class="hidden-sm-and-up" flat :disabled="doc ? true : false">
          App
          <v-icon class="pl-2">mdi-chevron-down</v-icon>
        </v-btn>
        <v-btn v-on="on" class="hidden-xs-only" flat :disabled="doc ? true : false">
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

    <v-divider vertical class="mr-3" />

    <v-icon class="mr-2" v-if="docLocked">mdi-lock</v-icon>
    <v-avatar v-if="docProfile" size="24">
      <img :src="this.doc.userprofile" />
    </v-avatar>
    <v-toolbar-title style="user-select: none;">{{pageTitle}}</v-toolbar-title>
    <v-btn icon class="ml-2" v-if="pageTitle.length" :style="getIconColor()" @click="closeDoc">
      <v-icon>mdi-close</v-icon>
    </v-btn>

    <v-spacer></v-spacer>

    <v-divider vertical class="mr-3" />

    <v-btn icon :style="getIconColor()" @click="openCompiled" v-if="!isHome">
      <v-icon>mdi-file-xml</v-icon>
    </v-btn>

    <v-btn icon :style="getIconColor()" @click="promptOpenDialog">
      <v-icon>mdi-file-find</v-icon>
    </v-btn>

    <v-btn
      icon
      v-if="!isHome"
      :style="getIconColor()"
      @click="promptSnippetSave"
      :loading="isLoadingSave"
      :disabled="cannotSave"
    >
      <v-icon>{{saveIcon}}</v-icon>
    </v-btn>

    <v-btn icon :style="getIconColor()" @click="toggleTheme" v-if="!isHome">
      <v-icon>mdi-format-color-fill</v-icon>
    </v-btn>

    <v-menu bottom offset-y left v-if="!loggedIn">
      <template v-slot:activator="{ on }">
        <v-btn flat v-on="on">Login</v-btn>
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
          <v-avatar size="24" class="grey lighten-2" v-if="user">
            <img :src="user.photoURL" style="width: 22px; height: 22px;" />
          </v-avatar>
        </v-btn>
      </template>

      <v-list>
        <v-list-tile @click="logOut()">
          <v-list-tile-title>
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
    isLoadingSave: false,
    saveIcon: "mdi-content-save",
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
      },
      // {
      //   name: "XD",
      //   key: "XD",
      //   active: false,
      //   colors: {
      //     min: "#dd499a",
      //     mid: "#9b5da6",
      //     max: "#2a1020"
      //   }
      // },
      {
        name: "Any App",
        key: "ANY",
        active: false,
        colors: {
          min: "",
          mid: "",
          max: ""
        }
      }
    ]
  }),
  computed: {
    app() {
      return this.$root.$children[0];
    },
    activeApp() {
      if (this.$route.name == "home") {
        this.apps.forEach(app => {
          app.active = false;
        });
        return null;
      }
      return this.apps.find(item => {
        return item.active;
      });
    },
    pageTitle() {
      return this.$route.params
        ? this.$route.params.page
          ? this.deslug(this.$route.params.page)
          : ""
        : "";
    },
    cannotSave() {
      if (!this.app.editor) return null;
      if (this.app.editor.doc) {
        if (this.app.editor.doc.isLocked)
          return this.user.displayName == this.app.editor.doc.displayName;
        else return false;
      } else {
        return false;
      }
    },
    isHome() {
      return /home/.test(this.$route.name);
    },
    doc() {
      return this.app.editor ? this.app.editor.doc : null;
    },
    docLocked() {
      return this.doc ? this.doc.isLocked : null;
    },
    docProfile() {
      return this.doc ? this.doc.userprofile : null;
    },
    isDark() {
      return this.$route.name !== "home";
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
    },
    doc(data) {
      // console.log("Doc changed");
      // console.log(data);
    }
  },
  methods: {
    openCompiled() {
      this.app.compiledialog.init();
    },
    closeDoc() {
      const self = this;
      this.$router.push({
        name: "editor",
        params: {
          name: self.$route.params.name
        }
      });
      // this.app.editor.resetContents();
      this.app.editor.doc = null;
    },
    promptOpenDialog() {
      this.app.opendialog.init();
    },
    openSnippet(doc) {
      const self = this;
      self.$router.push({
        name: "editor",
        params: {
          name: doc.app,
          page: doc.title
        }
      });
      this.app.editor.doc = doc;
      console.log(doc);
    },
    async overwriteDoc() {
      const self = this;
      this.isLoadingSave = true;
      let newdoc = {
        title: self.doc.title,
        username: self.user.displayName,
        userprofile: self.user.photoURL,
        contents: self.app.editor.contents,
        isPrivate: self.doc.isPrivate,
        isLocked: self.doc.isLocked,
        app: self.doc.app
      };
      let olddoc = await leylo.getDocByQuery(
        "snippets",
        "title",
        "==",
        self.doc.title,
        false
      );
      leylo.setPath(olddoc.ref.path, newdoc);
      setTimeout(() => {
        self.isLoadingSave = false;
        self.saveIcon = "mdi-check";
        setTimeout(() => {
          self.saveIcon = "mdi-content-save";
        }, 1000);
      }, 200);
    },
    async promptSnippetSave(override = false) {
      if (this.override) {
        this.app.savedialog.init();
      } else if (this.doc && this.doc.isLocked) {
        this.overwriteDoc();
      } else {
        this.app.savedialog.init();
      }
    },
    deslug(str) {
      return str.replace("-", " ");
    },
    async writeSnippetSave(params) {
      console.log("Write result");
      console.log(params);
      const self = this;
      let data = {
        title: params.title,
        isPrivate: params.isPrivate,
        isLocked: params.isLocked,
        contents: self.app.editor.contents,
        app: self.$route.params.name.replace("dark", "")
      };
      if (this.app.editor.notes.length) {
        data["notes"] = JSON.stringify(this.app.editor.notes);
      }
      if (this.user) {
        data["username"] = this.user.displayName;
        data["userprofile"] = this.user.photoURL;
      }
      leylo.addDoc(`snippets`, data).then(res => {
        self.$router.push({
          name: "editor",
          params: {
            name: params.app,
            page: params.title
          }
        });
      });
      this.app.editor.doc = data;
    },
    toggleDrawer() {
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
      if (this.$route.name == "home") {
        return `background-color: #fafbfc`;
      } else
        return this.activeApp
          ? `background-color: ${this.activeApp.colors.mid};`
          : // color: ${this.activeApp.colors.max}
            `background-color: #1e1e1e;
        color: #fff;`;
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
