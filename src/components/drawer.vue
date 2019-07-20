<template>
  <v-navigation-drawer v-model="state" style="z-index: 2001;" absolute temporary>
    <!-- temporary
    :mini-variant="mini"-->
    <!-- :permanent="mini" -->
    <!-- <div style="height: 36px;"></div> -->
    <v-list class="pt-0" dense v-if="appName">
      <v-subheader>Resources</v-subheader>
      <v-list-tile v-for="item in activeResources" :key="item.title" @click="openLink(item.link)">
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider light></v-divider>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "drawer",
  data: () => ({
    state: false,
    resources: {
      ILST: [
        {
          title: "AEnhancers Scripting Docs",
          icon: "mdi-book-open-variant",
          link: "http://ai.aenhancers.com/"
        }
      ]
    },
    items: [
      { title: "Scripting Docs", icon: "mdi-book-open-variant", type: "docs" },
      {
        title: "Scripting Forum",
        icon: "mdi-comment-question",
        type: "forums"
      },
      { title: "Reddit forum", icon: "mdi-reddit", type: "reddit" }
    ],
    links: {
      docs: {
        ILST: "http://ai.aenhancers.com/",
        AEFT: "http://docs.aenhancers.com/",
        PPRO: "https://premiere-scripting-guide.readthedocs.io/",
        IDSN: "https://www.indesignjs.de/extendscriptAPI/indesign-latest",
        AUDT: "https://console.adobe.io/downloads/au",
        PHXS: "https://www.adobe.com/devnet/photoshop/scripting.html"
      },
      forums: {
        ILST:
          "https://forums.adobe.com/community/illustrator/illustrator_scripting",
        AEFT: "https://forums.adobe.com/community/aftereffects/ae_scripting",
        PPRO: "https://forums.adobe.com/community/premiere/sdk",
        IDSN: "https://forums.adobe.com/community/indesign/indesign_scripting",
        AUDT:
          "https://forums.adobe.com/community/audition/audition-sdk/content",
        PHXS: "https://forums.adobe.com/community/photoshop/photoshop_scripting"
      },
      reddit: {
        ILST: "https://www.reddit.com/r/AdobeIllustrator/",
        AEFT: "https://www.reddit.com/r/AfterEffects/",
        PPRO: "https://www.reddit.com/r/premiere/",
        IDSN: "https://www.reddit.com/r/indesign/",
        AUDT: "https://www.reddit.com/r/AdobeAudition/",
        PHXS: "https://www.reddit.com/r/photoshop/"
      }
    },
    mini: false,
    right: null
  }),
  mounted() {
    console.log(this.appName);
    this.app.drawer = this;
  },
  computed: {
    app() {
      return this.$root.$children[0];
    },
    appName() {
      return this.$route.name == "editor" && this.$route.params.name
        ? this.$route.params.name.replace("dark", "")
        : "default";
    },
    activeResources() {
      return this.appName ? this.resources[this.appName] : null;
    }
  },
  methods: {
    findLink(type) {
      console.log(this.appName);

      // this.openLink(this.links[type][this.appName]);
    },
    openLink(url) {
      window.open(url);
    },
    show() {
      this.state = true;
    },
    hide() {
      // http://docs.aenhancers.com/
      this.state = false;
    },
    toggle() {
      this.state = !this.state;
    }
  }
};
</script>

<style>
/* .theme--dark.v-navigation-drawer {
  background-color: var(--color-header);
} */
</style>
