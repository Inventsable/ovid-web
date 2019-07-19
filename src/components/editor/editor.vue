<template>
  <div class="main-editor-container">
    <MonacoEditor
      :width="editorW"
      :height="editorH"
      :theme="theme"
      language="javascript"
      :options="options"
      @change="onChange"
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
    theme: "vs-dark",
    editorH: 400,
    editorW: 800,
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
  created() {},
  mounted() {
    this.setDefaultLibsToFalse();
    window.addEventListener("resize", this.updateEditorSize);
    this.updateEditorSize();
  },
  methods: {
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
      console.log(value);
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
