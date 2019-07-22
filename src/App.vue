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
    // bottombar,
    drawer,
    savedialog,
    compiledialog,
    notedialog,
    opendialog
    // bottombar
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
      // height: calc(100vh - 48px);
      // overflow-y: auto;
      let style = `
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
      return this.checkForES6ArrayMethods(output);
    },
    checkForES6ArrayMethods(str) {
      let methods = [
        {
          name: "filter",
          rx: /\.filter\(/,
          content: `Array.prototype.filter = function(callback) {
  var filtered = [];
  for (var i = 0; i < this.length; i++)
    if (callback(this[i], i, this)) filtered.push(this[i]);
  return filtered;
};`
        },
        {
          name: "map",
          rx: /\.map\(/,
          content: `Array.prototype.map = function(callback) {
  var mappedParam = [];
  for (var i = 0; i < this.length; i++)
    mappedParam.push(callback(this[i], i, this));
  return mappedParam;
};`
        },
        {
          name: "forEach",
          rx: /\.forEach\(/,
          content: `Array.prototype.forEach = function(callback) {
  for (var i = 0; i < this.length; i++) callback(this[i], i, this);
};`
        },
        {
          name: "find",
          rx: /\.find\(/,
          content: `Array.prototype.find = function(callback) {
  for (var i = 0; i < this.length; i++)
    if (callback(this[i], i, this)) return this[i];
};`
        }
      ];

      methods.forEach(method => {
        if (method.rx.test(str)) str += `\r\n\r\n${method.content}`;
      });
      return str;
    },
    getCSS(prop) {
      return window
        .getComputedStyle(document.documentElement)
        .getPropertyValue(`${/^--/.test(prop) ? prop : "--" + prop}`);
    },
    setCSS(prop, data) {
      document.documentElement.style.setProperty(
        `${/^--/.test(prop) ? prop : "--" + prop}`,
        data
      );
    }
  }
};
</script>

<style>
html,
body,
#app {
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
}

.v-content {
  overflow-y: hidden;
}

html {
  overflow: -moz-scrollbars-vertical;
  overflow-y: hidden;
  overflow-x: hidden;
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
  overflow-y: hidden;
  overflow-x: hidden;
}
</style>
