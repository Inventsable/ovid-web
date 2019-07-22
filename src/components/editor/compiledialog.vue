<template>
  <v-dialog v-model="state" fullscreen hide-overlay transition="dialog-bottom-transition">
    <v-card class="fake-editor-wrapper">
      <v-toolbar dense dark color="primary">
        <v-toolbar-title>Compiled</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon dark @click="state = false">
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>
      <div class="fake-editor-padding" :style="getCardStyle()">
        <fakeeditor ref="editor" :code="contents" />
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import fakeeditor from "@/components/editor/fakeeditor";

export default {
  name: "compiledialog",
  components: {
    fakeeditor
  },
  data: () => ({
    msg: "Hello world",
    state: false,
    contents: ""
  }),
  computed: {
    app() {
      return this.$root.$children[0];
    }
  },
  mounted() {
    this.app.compiledialog = this;
  },
  methods: {
    init() {
      this.state = true;
      this.contents = this.app.compiledContent();
      setTimeout(() => {
        this.$refs.editor.updateEditorSize();
      }, 100);
    },
    getCardStyle() {
      let parent = document.getElementsByClassName("fake-editor-wrapper");
      return `height: ${parent.offsetHeight - 36}px`;
    }
  }
};
</script>

<style>
.fake-editor-padding {
  width: 100%;
  /* height: 100%; */
  padding: 10px;
  background-color: var(--color-editor);
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  border-radius: 5px;
}
</style>
