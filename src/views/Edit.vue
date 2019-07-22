<template>
  <v-container class="main-editor-wrapper">
    <div class="main-editor-padding" :style="getCardStyle()">
      <editor ref="editor" :appName="appName" />
    </div>
    <div v-if="isMounted">
      <typeShims :appName="appName" />
    </div>
    <bottombar />
  </v-container>
</template>

<script>
import editor from "../components/editor/editor";
import typeShims from "@/components/editor/types-for-adobe/typeShims";
import bottombar from "@/components/bottombar";

export default {
  data: () => ({
    appName: null,
    isMounted: false
  }),
  computed: {
    app() {
      return this.$root.$children[0];
    }
  },
  components: {
    editor,
    typeShims,
    bottombar
  },
  watch: {
    $route() {
      this.appName = this.$route.params.name;
    }
  },
  mounted() {
    if (this.$route.params.name) {
      this.appName = !/dark/.test(this.$route.params.name)
        ? this.$route.params.name
        : this.$route.params.name.replace("dark", "");
      if (/dark/.test(this.$route.params.name)) {
        this.$refs.editor.toggleTheme();
        this.app.isDark = true;
      }
    } else {
      throw new Error("No app found, redirect home or to error page");
    }
    this.isMounted = true;
  },
  methods: {
    getCardStyle() {
      let parent = document.getElementsByClassName("main-editor-wrapper");
      // return `${parent.offsetHeight}`;
      return `height: ${parent.offsetHeight}px`;
    }
  }
};
</script>

<style>
body::-webkit-scrollbar {
  width: 0px;
}

.main-editor-wrapper {
  box-sizing: border-box;
  /* border: 2px solid #262626; */
  height: 100%;
}

.main-editor-padding {
  width: 100%;
  height: calc(100% - 20px);
  padding: 10px;
  background-color: var(--color-editor);
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  border-radius: 5px;
}
</style>
