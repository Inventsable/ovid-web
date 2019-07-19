<template>
  <div class="main-editor-container">
    <MonacoEditor
      ref="editor"
      :width="editorW"
      :height="editorH"
      :theme="theme"
      language="javascript"
      :options="options"
      @change="onChange"
      :value="code"
    ></MonacoEditor>
  </div>
</template>

<script>
import MonacoEditor from "monaco-editor-vue";
export default {
  name: "editor",
  components: {
    MonacoEditor
  },
  data: () => ({
    theme: "vs",
    editorH: 400,
    editorW: 800,
    code: "",
    colors: {
      dark: {
        bg: "#2e2e2e",
        editor: "#1e1e1e",
        syntax: [
          "#cdcdcd",
          "red",
          "green",
          "#fca369",
          "#92d192",
          "#f2777a",
          "#676767",
          "#f2777a",
          "#fff",
          "#cdcdcd"
        ]
      },
      light: {
        bg: "#fafbfc",
        editor: "#fffffe",
        syntax: [
          "blue",
          "red",
          "green",
          "violet",
          "orange",
          "steel",
          "grey",
          "black",
          "yellow",
          "red"
        ]
      }
    },
    options: {
      //Monaco Editor Options
      scrollBeyondLastLine: false,
      lineDecorationsWidth: "0px",
      lineNumbersMinChars: 4,
      autoIndent: true,
      formatOnPaste: true,
      formatOnType: true
    }
  }),
  computed: {
    app() {
      return this.$root.$children[0];
    },
    contents() {
      return this.editor ? this.editor.getValue() : null;
    },
    selection() {
      return this.editor
        ? this.editor.getModel().getValueInRange(this.editor.getSelection())
        : null;
    }
  },
  watch: {
    theme(value) {
      this.updateTheme();
    }
  },
  mounted() {
    this.app.editor = this;
    this.editor = this.$refs.editor._getEditor();
    this.setDefaultLibsToFalse();
    window.addEventListener("resize", this.updateEditorSize);
    this.updateEditorSize();
    this.updateTheme();
    if (window.localStorage.getItem("code"))
      this.code = window.localStorage.getItem("code");
  },
  methods: {
    toggleTheme() {
      if (/dark/.test(this.theme)) this.theme = "vs";
      else this.theme = "vs-dark";
      monaco.editor.setTheme(this.theme);
    },
    updateEditorSize() {
      this.editorW = this.$el.offsetWidth;
      this.editorH = this.$el.offsetHeight;
    },
    setDefaultLibsToFalse() {
      // eslint-disable-next-line
      monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
        allowNonTsExtensions: true,
        noLib: true
      });
    },
    onChange(value) {
      window.localStorage.setItem("code", value);
    },
    updateTheme() {
      let isDark = /dark/.test(this.theme);
      let active = isDark ? "dark" : "light";

      this.app.setCSS("color-bg", this.colors[active].bg);
      this.app.setCSS("color-editor", this.colors[active].editor);
      this.colors[active].syntax.forEach((entry, i) => {
        this.app.setCSS(`mtk${i + 1}`, entry);
      });
    }
  }
};
</script>

<style>
.mtk1 {
  color: var(--mtk1) !important;
}

.mtk2 {
  color: var(--mtk2) !important;
}

.mtk3 {
  color: var(--mtk3) !important;
}

.mtk4 {
  color: var(--mtk4) !important;
}

.mtk5 {
  /* String */
  color: var(--mtk5) !important;
}

.mtk6 {
  /* Number */
  color: var(--mtk6) !important;
}

.mtk7 {
  color: var(--mtk7) !important;
}

.mtk8 {
  /* Keyword like let/var JS */
  /* tags for HTML */
  color: var(--mtk8) !important;
}

.mtk9 {
  /* Default */
  color: var(--mtk9) !important;
}

.mtk10 {
  /* Default */
  color: var(--mtk10) !important;
}

.main-editor-container {
  box-sizing: border-box;
  /* border: 2px solid blue; */
  width: 100%;
  height: 100%;
}

.current-line {
  border: 0px solid transparent !important;
  background-color: var(--color-active-line);
}
</style>
