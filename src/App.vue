<template>
  <v-app>
    <toolbar />
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import toolbar from "@/components/toolbar";

export default {
  name: "App",
  components: {
    toolbar
  },
  data: () => ({
    editor: null,
    toolbar: null,
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

  --color-active-line: rgba(255, 255, 255, 0.03);
}
.theme--light.application,
.theme--dark.application {
  background-color: var(--color-bg);
}
</style>
