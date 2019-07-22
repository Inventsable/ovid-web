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
import leylo from "leylo";

import MonacoEditor from "monaco-editor-vue";
export default {
  name: "editor",
  components: {
    MonacoEditor
  },
  props: {
    appName: String
  },
  data: () => ({
    notes: [],
    theme: "vs",
    editor: null,
    editorH: 400,
    doc: null,
    editorW: 800,
    code: "",
    colors: {
      dark: {
        bg: "#2e2e2e",
        editor: "#1e1e1e",
        activeLine: "#262626",
        syntax: [
          "#d4d4d4",
          "red",
          "green",
          "#fca369",
          "#98c379",
          "#d09966",
          "#676767",
          "#b17cb6",
          // "#f2777a", // 8
          "#56b7c2",
          "#cdcdcd",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "#d09966",
          "#50a14e",
          "",
          "#69addf"
        ]
      },
      light: {
        bg: "#fff",
        editor: "#fafbfc",
        activeLine: "#f3f3f3",
        syntax: [
          "#101010",
          "red",
          "green",
          "violet",
          "orange",
          "#4f72b7",
          "#e45649",
          "#9ea0a6",
          "yellow",
          "red",
          "#E45649",
          "",
          "",
          "#c0852b",
          "",
          "",
          "",
          "",
          "#d09966",
          "#50a14e",
          "",
          "#9d3895"
        ]
      }
    },
    options: {
      //Monaco Editor Options
      glyphMargin: true,
      scrollBeyondLastLine: false,
      lineDecorationsWidth: "6px",
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
    },
    local() {
      return !this.$route.params.page;
    }
  },
  watch: {
    theme(value) {
      this.updateTheme();
    },
    notes(value) {
      console.log("New value:");
      console.log(value);
      this.createGlyphMarginInfo(value[value.length - 1]);
    },
    doc(content) {
      console.log(content);
      if (content) {
        this.setContents();
      } else {
        this.resetContents();
      }
    }
  },
  async mounted() {
    const self = this;
    this.app.editor = this;
    this.editor = this.$refs.editor._getEditor();
    this.setDefaultLibsToFalse();
    window.addEventListener("resize", this.updateEditorSize);
    this.updateEditorSize();
    this.updateTheme();
    this.createActions();
    if (!this.$route.params.page && window.localStorage.getItem("code")) {
      this.code = window.localStorage.getItem("code");
    } else if (this.$route.params.page) {
      leylo
        .getDocByQuery("snippets", "title", "==", self.$route.params.page)
        .then(doc => {
          self.doc = doc;
          self.code = doc.contents;
        });
    }
  },
  methods: {
    focus() {
      this.editor.focus();
    },
    createActions() {
      const self = this;
      this.editor.addAction({
        id: "create note",
        label: "Create Note",
        contextMenuGroupId: "action",
        contextMenuOrder: 1.6,
        precondition: "editorHasSelection",
        keybindings: [monaco.KeyMod.Alt | monaco.KeyCode.Enter],
        keybindingContext: null,
        run: async function(ed) {
          let selection = ed.getSelection();

          let range = [
            selection.startLineNumber,
            selection.startColumn,
            selection.endLineNumber,
            selection.endColumn
          ];
          console.log(range);
          self.app.notedialog.init(range);

          // self.notes.push(await self.getNoteText(range));
          // console.log("Finished");
          return null;
        }
      });
      this.editor.addAction({
        id: "save",
        label: "Save Snippet",
        precondition: null,
        keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S],
        keybindingContext: null,
        contextMenuGroupId: "io",
        contextMenuOrder: 1.6,
        run: async function(ed) {
          self.app.toolbar.promptSnippetSave();
          return null;
        }
      });
      this.editor.addAction({
        id: "save-as",
        label: "Save Snippet As...",
        precondition: null,
        keybindings: [
          monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KEY_S
        ],
        keybindingContext: null,
        contextMenuGroupId: "io",
        contextMenuOrder: 1.6,
        run: async function(ed) {
          self.app.toolbar.promptSnippetSave(true);
          return null;
        }
      });
      this.editor.addAction({
        id: "open",
        label: "Open Snippet",
        precondition: null,
        keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_O],
        keybindingContext: null,
        contextMenuGroupId: "io",
        contextMenuOrder: 1.6,
        run: async function(ed) {
          self.app.toolbar.promptOpenDialog();
          return null;
        }
      });
    },
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
    setContents() {
      const self = this;
      if (this.doc) {
        setTimeout(() => {
          self.code = self.doc.contents;
        }, 200);
        if (this.doc.notes) {
          let notes = JSON.parse(this.doc.notes);
          setTimeout(() => {
            notes.forEach(note => {
              self.createGlyphMarginInfo(note);
            });
          }, 200);
          console.log(notes);
        }
      }
      // console.log(this.doc);
    },
    resetContents() {
      console.log(this.local);
      this.code = window.localStorage.getItem("code") || "";
    },
    onChange(value) {
      if (!this.doc) window.localStorage.setItem("code", value);
      else {
        // No changes should be made?
      }
    },
    updateTheme() {
      let isDark = /dark/.test(this.theme);
      let active = isDark ? "dark" : "light";

      this.app.setCSS("color-bg", this.colors[active].bg);
      this.app.setCSS("color-editor", this.colors[active].editor);
      this.app.setCSS("color-active-line", this.colors[active].activeLine);
      this.colors[active].syntax.forEach((entry, i) => {
        this.app.setCSS(`mtk${i + 1}`, entry);
      });
    },
    async getNoteText(range) {
      // setTimeout(() => {
      return { note: "Testing", range: range };
      // }, 200);
    },
    confirmNote(text, range) {
      this.notes.push({
        note: text,
        range: range
      });
    },
    addDefaultNote(item) {
      this.confirmNote(item.note, item.range);
    },
    createGlyphMarginInfo(item) {
      console.log(item);
      var decorations = this.editor.deltaDecorations(
        [],
        [
          {
            range: new monaco.Range(
              item.range[0],
              item.range[1],
              item.range[2],
              item.range[3]
            ),
            options: {
              isWholeLine: false,
              className: "myContentClass",
              glyphMarginClassName: "myGlyphMarginClass",
              hoverMessage: { value: item.note },
              glyphMarginHoverMessage: { value: item.note }
            }
          }
        ]
      );
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

.mtk10 {
  /* Default */
  color: var(--mtk10) !important;
}
.mtk11 {
  color: var(--mtk11) !important;
}
.mtk12 {
  color: var(--mtk12) !important;
}
.mtk13 {
  color: var(--mtk13) !important;
}
.mtk14 {
  color: var(--mtk14) !important;
}
.mtk15 {
  color: var(--mtk15) !important;
}
.mtk16 {
  color: var(--mtk16) !important;
}
.mtk17 {
  color: var(--mtk17) !important;
}
.mtk18 {
  color: var(--mtk18) !important;
}
.mtk19 {
  color: var(--mtk19) !important;
}
.mtk20 {
  color: var(--mtk20) !important;
}
.mtk21 {
  color: var(--mtk21) !important;
}
.mtk22 {
  color: var(--mtk22) !important;
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

.myGlyphMarginClass {
  background: transparent;
  border-style: solid;
  border-color: var(--color-note-margin);
  border-width: 0px 4px 0px 0px;
}
.myContentClass {
  background: var(--color-note-label);
}
</style>
