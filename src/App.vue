<template>
  <v-app :dark="isDark || hasDark">
    <toolbar />
    <drawer />
    <savedialog />
    <opendialog />
    <compiledialog />
    <notedialog />
    <v-content :style="getBGStyle()">
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import toolbar from "@/components/toolbar";
import drawer from "@/components/drawer";
import savedialog from "@/components/editor/savedialog";
import opendialog from "@/components/editor/opendialog";
import compiledialog from "@/components/editor/compiledialog";
import notedialog from "@/components/editor/notedialog";

const Babel = require("@babel/standalone");

export default {
  name: "App",
  components: {
    toolbar,
    drawer,
    savedialog,
    compiledialog,
    notedialog,
    opendialog
  },
  data: () => ({
    editor: null,
    isDark: false,
    toolbar: null,
    savedialog: null,
    compiledialog: null,
    notedialog: null,
    opendialog: null,
    drawer: null,
    msg: "Hello world"
  }),
  computed: {
    hasDark() {
      return /dark/.test(this.$route.params.name);
    }
  },
  methods: {
    getBGStyle() {
      let style = `
        height: calc(100vh - 48px);
        overflow-y: auto;
      `;
      if (this.$route.name == "home") style += `background-color: #fafbfc`;
      return style;
    },
    compiledContent(msg = null) {
      let output = Babel.transform(msg || this.editor.contents, {
        presets: ["es2015"],
        plugins: [
          // https://babeljs.io/docs/en/plugins
          "transform-template-literals",
          "transform-block-scoping",
          "transform-arrow-functions"
        ]
      }).code;
      output = output.replace("const", "var");
      output = output.replace("let", "var");
      return output;
    },
    getCSS(prop) {
      // Returns current value of CSS variable
      // prop == typeof String as name of variable, with or without leading dashes:
      // this.getCSS('color-bg') || this.getCSS('--scrollbar-width')
      return window
        .getComputedStyle(document.documentElement)
        .getPropertyValue(`${/^\-\-/.test(prop) ? prop : "--" + prop}`);
    },
    setCSS(prop, data) {
      // Sets value of CSS variable
      // prop == typeof String as name of variable, with or without leading dashes:
      // this.setCSS('color-bg', 'rgba(25,25,25,1)') || this.setCSS('--scrollbar-width', '20px')
      document.documentElement.style.setProperty(
        `${/^\-\-/.test(prop) ? prop : "--" + prop}`,
        data
      );
    }
  }
};
</script>

<style>
::-webkit-scrollbar {
  position: absolute;
  top: 48px;
  height: calc(100vh - 48px);
}

:root {
  --color-bg: #fafbfc;
  --color-editor: #1e1e1e;
  --color-active-line: rgba(255, 255, 255, 0.03);
  --color-note-label: rgba(150, 150, 250, 0.2);
  --color-note-margin: rgba(150, 150, 250, 0.5);

  --mtk1: #cdcdcd;
  --mtk2: red;
  --mtk3: green;
  --mtk4: #fca369;
  --mtk5: #92d192;
  --mtk6: #f2777a;
  --mtk7: #676767;
  --mtk8: #f2777a;
  --mtk9: #fff;
  --mtk10: #cdcdcd;
  --mtk11: #cdcdcd;
  --mtk12: red;
  --mtk13: green;
  --mtk14: #fca369;
  --mtk15: #92d192;
  --mtk16: #f2777a;
  --mtk17: #676767;
  --mtk18: #f2777a;
  --mtk19: #fff;
  --mtk20: #cdcdcd;
}
.theme--light.application,
.theme--dark.application {
  background-color: var(--color-bg);
}

.v-content__wrap {
  overflow-y: auto;
}
</style>
