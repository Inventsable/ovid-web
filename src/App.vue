<template>
  <v-app :dark="isDark">
    <toolbar />
    <drawer />
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import toolbar from "@/components/toolbar";
import drawer from "@/components/drawer";

export default {
  name: "App",
  components: {
    toolbar,
    drawer
  },
  data: () => ({
    editor: null,
    isDark: false,
    toolbar: null,
    drawer: null,
    msg: "Hello world"
  }),
  methods: {
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
:root {
  --color-bg: #2e2e2e;
  --color-editor: #1e1e1e;
  --color-active-line: rgba(255, 255, 255, 0.03);
  --color-note-label: rgba(150, 150, 250, 0.1);
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
</style>
