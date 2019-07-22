<template>
  <div class="fake-editor-container">
    <MonacoEditor
      ref="editor"
      :width="editorW"
      :height="editorH"
      :theme="getTheme"
      language="javascript"
      :options="options"
      :value="code"
    ></MonacoEditor>
  </div>
</template>

<script>
import MonacoEditor from "monaco-editor-vue";
export default {
  name: "fakeeditor",
  components: {
    MonacoEditor
  },
  props: {
    code: String
  },
  data: () => ({
    notes: [],
    // code: "",
    theme: "vs",
    editor: null,
    editorH: 400,
    doc: null,
    editorW: 800,
    // code: "",
    // colors: {
    //   dark: {
    //     bg: "#2e2e2e",
    //     editor: "#1e1e1e",
    //     activeLine: "#262626",
    //     syntax: [
    //       "#d4d4d4",
    //       "red",
    //       "green",
    //       "#fca369",
    //       "#98c379",
    //       "#d09966",
    //       "#676767",
    //       "#b17cb6",
    //       // "#f2777a", // 8
    //       "#56b7c2",
    //       "#cdcdcd",
    //       "",
    //       "",
    //       "",
    //       "",
    //       "",
    //       "",
    //       "",
    //       "",
    //       "#d09966",
    //       "#50a14e",
    //       "",
    //       "#69addf"
    //     ]
    //   },
    //   light: {
    //     bg: "#fff",
    //     editor: "#fafbfc",
    //     activeLine: "#f3f3f3",
    //     syntax: [
    //       "#101010",
    //       "red",
    //       "green",
    //       "violet",
    //       "orange",
    //       "#4f72b7",
    //       "#e45649",
    //       "#9ea0a6",
    //       "yellow",
    //       "red",
    //       "#E45649",
    //       "",
    //       "",
    //       "#c0852b",
    //       "",
    //       "",
    //       "",
    //       "",
    //       "#d09966",
    //       "#50a14e",
    //       "",
    //       "#9d3895"
    //     ]
    //   }
    // },
    options: {
      //Monaco Editor Options
      glyphMargin: true,
      scrollBeyondLastLine: false,
      lineDecorationsWidth: "6px",
      lineNumbersMinChars: 4,
      autoIndent: true,
      formatOnPaste: true,
      formatOnType: true,
      readOnly: true,
      wordwrap: "min"
    }
  }),
  computed: {
    app() {
      return this.$root.$children[0];
    },
    getTheme() {
      return this.app.editor ? this.app.editor.theme : "vs";
    }
    // contents() {
    //   return this.editor ? this.editor.getValue() : null;
    // },
    // selection() {
    //   return this.editor
    //     ? this.editor.getModel().getValueInRange(this.editor.getSelection())
    //     : null;
    // },
    // local() {
    //   return !this.$route.params.page;
    // }
  },
  watch: {
    // theme(value) {
    //   this.updateTheme();
    // },
    // notes(value) {
    //   console.log(value);
    //   this.createGlyphMarginInfo(value[value.length - 1]);
    // },
    // doc(content) {
    //   if (content) {
    //     this.setContents();
    //   } else {
    //     this.resetContents();
    //   }
    // }
  },
  async mounted() {
    const self = this;
    // this.app.editor = this;
    // this.editor = this.$refs.editor._getEditor();
    // this.setDefaultLibsToFalse();
    window.addEventListener("resize", this.updateEditorSize);
    this.updateEditorSize();
    // this.updateTheme();
    // this.createActions();
    // if (!this.$route.params.page && window.localStorage.getItem("code")) {
    //   this.code = window.localStorage.getItem("code");
    // } else {
    //   leylo
    //     .getDocByQuery(
    //       self.$route.params.name.replace("dark", ""),
    //       "title",
    //       "==",
    //       self.$route.params.page
    //     )
    //     .then(doc => {
    //       self.doc = doc;
    //       self.code = doc.contents;
    //     });
    // }
  },
  methods: {
    updateEditorSize() {
      this.editorW = this.$el.offsetWidth - 20;
      this.editorH = this.$el.offsetHeight - 20;
    }
  }
};
</script>

<style>
.fake-editor-container {
  padding: 10px;
  width: 100%;
  height: calc(100vh - 68px);
}
</style>
