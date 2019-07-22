<template>
  <v-navigation-drawer v-model="state" style="z-index: 2001;" absolute temporary>
    <!-- temporary
    :mini-variant="mini"-->
    <!-- :permanent="mini" -->
    <!-- <div style="height: 36px;"></div> -->
    <v-list class="pt-0" dense v-if="appName">
      <v-subheader>{{appName ? `${realName} Resources` : 'Resources'}}</v-subheader>
      <!-- <v-list-tile
        v-for="(item, index) in fullResources"
        :key="item.title"
        @click="openLink(item.link)"
      >-->
      <template v-for="(item, index) in fullResources">
        <v-subheader v-if="item.header" :key="item.header">{{ item.header }}</v-subheader>
        <v-divider v-else-if="item.divider" :key="index" :inset="item.inset"></v-divider>
        <!-- v-for="(item, index) in fullResources" -->
        <v-list-tile v-else :key="item.title" @click="openLink(item.link)">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
      <!-- <v-divider light></v-divider> -->
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
          title: "ai.aenhancers Scripting Docs",
          icon: "mdi-book-open-variant",
          link: "http://ai.aenhancers.com/"
        },
        {
          title: "Adobe DevNet for Illustrator",
          icon: "mdi-adobe",
          link: "https://www.adobe.com/devnet/illustrator/scripting.html"
        },
        {
          divider: true,
          inset: true
        },
        {
          header: "Illustrator Forums"
        },
        {
          title: "Adobe Scripting Forum",
          icon: "mdi-adobe",
          link:
            "https://forums.adobe.com/community/illustrator/illustrator_scripting"
        },
        {
          title: "r/AdobeIllustrator",
          icon: "mdi-reddit",
          link: "https://www.reddit.com/r/AdobeIllustrator/"
        },
        {
          title: "CreativeCow",
          icon: "mdi-comment-text",
          link: "https://forums.creativecow.net/adobeillustrator"
        },
        {
          divider: true,
          inset: true
        },
        {
          header: "General Resources"
        }
      ],
      AEFT: [
        {
          title: "aenhancers Scripting Docs",
          icon: "mdi-book-open-variant",
          link: "http://docs.aenhancers.com/"
        },
        {
          title: "aenhancers Expression Reference",
          icon: "mdi-book-open-variant",
          link: "http://expressions.aenhancers.com/"
        },
        {
          title: "aenhancers SDK Guide",
          icon: "mdi-book-open-variant",
          link: "http://ae-plugin-sdk.aenhancers.com/"
        },
        {
          title: "aenhancers > AEQuery",
          icon: "mdi-book-open-variant",
          link: "http://aequery.aenhancers.com/"
        },
        {
          title: "Scripts in After Effects",
          icon: "mdi-adobe",
          link: "https://helpx.adobe.com/after-effects/using/scripts.html"
        },
        {
          title: "Fabian Zirfas Snippets",
          icon: "mdi-github-circle",
          link:
            "https://github.com/fabianmoronzirfas/after-effects-script-snippets"
        },
        {
          divider: true,
          inset: true
        },
        {
          header: "After Effects Forums"
        },
        {
          title: "Adobe Scripting Forum",
          icon: "mdi-adobe",
          link: "https://forums.adobe.com/community/aftereffects/ae_scripting"
        },
        {
          title: "aenhancers",
          icon: "mdi-comment-text",
          link: "http://aenhancers.com/"
        },
        {
          title: "r/AfterEffects",
          icon: "mdi-reddit",
          link: "https://www.reddit.com/r/AfterEffects/"
        },
        {
          title: "CreativeCow",
          icon: "mdi-comment-text",
          link: "https://forums.creativecow.net/adobeaftereffects"
        },
        {
          divider: true,
          inset: true
        },
        {
          header: "General Resources"
        }
      ],
      PHXS: [
        {
          title: "Photoshop Object Library",
          icon: "mdi-book-open-variant",
          link:
            "https://www.indesignjs.de/extendscriptAPI/photoshop2015.5/#about.html"
        },
        {
          title: "Photoshop Scripting Reference",
          icon: "mdi-file-pdf",
          link:
            "https://www.adobe.com/content/dam/acom/en/devnet/photoshop/pdfs/photoshop-cc-javascript-ref-2019.pdf"
        },
        {
          title: "Davide Barranca's Blog",
          icon: "mdi-book-open-variant",
          link: "https://www.davidebarranca.com/"
        },
        {
          title: "Photoshop User Guide > Automation",
          icon: "mdi-adobe",
          link: "https://helpx.adobe.com/photoshop/using/scripting.html"
        },
        {
          divider: true,
          inset: true
        },
        {
          header: "Photoshop Forums"
        },
        {
          title: "Adobe Scripting Forum",
          icon: "mdi-adobe",
          link:
            "https://forums.adobe.com/community/photoshop/photoshop_scripting"
        },
        {
          title: "r/photoshop",
          icon: "mdi-reddit",
          link: "https://www.reddit.com/r/photoshop/"
        },
        {
          title: "CreativeCow",
          icon: "mdi-comment-text",
          link: "https://forums.creativecow.net/adobephotoshop"
        },
        {
          divider: true,
          inset: true
        },
        {
          header: "General Resources"
        }
      ],
      IDSN: [
        {
          title: "InDesign Object Library",
          icon: "mdi-book-open-variant",
          link: "https://www.indesignjs.de/extendscriptAPI/indesign-latest"
        },
        {
          title: "Scripting in InDesign",
          icon: "mdi-adobe",
          link: "https://helpx.adobe.com/indesign/using/scripting.html"
        },
        {
          title: "indiscripts Blog",
          icon: "mdi-book-open-variant",
          link: "http://www.indiscripts.com/"
        },
        {
          title: "InDesignSecrets Blog",
          icon: "mdi-book-open-variant",
          link: "https://indesignsecrets.com/resources/plug-ins-and-scripts"
        },
        {
          divider: true,
          inset: true
        },
        {
          header: "InDesign Forums"
        },
        {
          title: "Adobe Scripting Forum",
          icon: "mdi-adobe",
          link: "https://forums.adobe.com/community/indesign/indesign_scripting"
        },
        {
          title: "r/indesign",
          icon: "mdi-reddit",
          link: "https://www.reddit.com/r/indesign/"
        },
        {
          title: "CreativeCow",
          icon: "mdi-comment-text",
          link: "https://forums.creativecow.net/adobeindesign"
        },
        {
          divider: true,
          inset: true
        },
        {
          header: "General Resources"
        }
      ],
      PPRO: [
        {
          title: "aenhancers Scripting Docs",
          icon: "mdi-book-open-variant",
          link: "https://premiere-scripting-guide.readthedocs.io/"
        },
        {
          title: "Adobe DevNet for Illustrator",
          icon: "mdi-adobe",
          link: "https://www.adobe.com/devnet/illustrator/scripting.html"
        },
        {
          divider: true,
          inset: true
        },
        {
          header: "Premiere Pro Forums"
        },
        {
          title: "Adobe Scripting Forum",
          icon: "mdi-adobe",
          link: "https://forums.adobe.com/community/premiere/sdk"
        },
        {
          title: "r/premiere",
          icon: "mdi-reddit",
          link: "https://www.reddit.com/r/premiere/"
        },
        {
          title: "CreativeCow",
          icon: "mdi-comment-text",
          link: "https://forums.creativecow.net/adobepremierepro"
        },
        {
          divider: true,
          inset: true
        },
        {
          header: "General Resources"
        }
      ],
      AUDT: [
        {
          title: "Adobe Docs for Audition",
          icon: "mdi-adobe",
          link: "https://console.adobe.io/downloads/au"
        },
        {
          divider: true,
          inset: true
        },
        {
          header: "Audition Forums"
        },
        {
          title: "Adobe Scripting Forum",
          icon: "mdi-adobe",
          link:
            "https://forums.adobe.com/community/audition/audition-sdk/content"
        },
        {
          title: "r/AdobeAudition",
          icon: "mdi-reddit",
          link: "https://www.reddit.com/r/AdobeAudition/"
        },
        {
          title: "CreativeCow",
          icon: "mdi-comment-text",
          link: "https://forums.creativecow.net/adobeaudition"
        },
        {
          divider: true,
          inset: true
        },
        {
          header: "General Resources"
        }
      ],
      ANY: [
        {
          title: "aenhancers Javascript Tools Guide",
          icon: "mdi-book-open-variant",
          link: "http://estk.aenhancers.com/"
        },
        {
          title: "Peter Kahrel's ScriptUI For Dummies",
          icon: "mdi-book-open-variant",
          link: "http://www.kahrel.plus.com/indesign/scriptui.html"
        },
        {
          divider: true,
          inset: true
        },
        {
          header: "Tools and Extensions"
        },
        {
          title: "VSCode",
          icon: "mdi-visual-studio",
          link: "https://code.visualstudio.com/"
        },
        {
          title: "rendertom's Adobe Script Runner",
          icon: "mdi-visual-studio",
          link: "https://github.com/rendertom/VSCode-Adobe-Script-Runner"
        },
        {
          title: "Adobe's ESTK Debugger",
          icon: "mdi-visual-studio",
          link:
            "https://marketplace.visualstudio.com/items?itemName=Adobe.extendscript-debug"
        },
        {
          title: "Atom",
          icon: "mdi-atom",
          link: "https://atom.io/"
        }
      ]
    },
    mini: false,
    right: null
  }),
  mounted() {
    // console.log(this.appName);
    this.app.drawer = this;
  },
  computed: {
    app() {
      return this.$root.$children[0];
    },
    fullResources() {
      return this.activeResources && !/any/i.test(this.appName)
        ? [].concat(this.activeResources, this.resources.ANY)
        : this.resources.ANY;
    },
    appName() {
      return this.$route.name == "editor" && this.$route.params.name
        ? this.$route.params.name.replace("dark", "")
        : "default";
    },
    activeResources() {
      return this.appName ? this.resources[this.appName] : null;
    },
    realName() {
      if (this.$route.name == "home") return "General";
      if (this.app.toolbar) {
        return this.app.toolbar.activeApp
          ? /any/i.test(this.app.toolbar.activeApp.key)
            ? "General"
            : this.app.toolbar.activeApp.name
          : null;
      } else return null;
    }
  },
  methods: {
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

.v-list__tile__action {
  min-width: 40px;
}
</style>
