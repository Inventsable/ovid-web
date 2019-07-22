<template>
  <v-dialog v-model="state" persistent max-width="400">
    <v-card :dark="isDark">
      <v-alert
        style="margin-top: 0px;"
        :value="hasError"
        color="error"
        icon="mdi-alert"
      >{{alertText}}</v-alert>
      <v-card-title class="headline">Save snippet</v-card-title>
      <v-card-text style="padding-top: 0px">
        <v-layout wrap>
          <v-flex xs12 style="height: 72px">
            <v-text-field
              ref="input"
              label="Title"
              :color="getColor()"
              @keyup.enter="submit"
              hint="Optional, will be auto-generated if no title is given"
              v-model="title"
            ></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-checkbox
              :color="getColor()"
              label="Don't show this on any public lists"
              v-model="isPrivate"
              hide-details
            ></v-checkbox>
          </v-flex>
          <v-flex xs12>
            <v-checkbox
              :color="getColor()"
              label="Don't let any one but me modify this snippet"
              v-model="isLocked"
              hide-details
            ></v-checkbox>
          </v-flex>
        </v-layout>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :color="getColor()" flat @click="cancel">Cancel</v-btn>
        <v-btn :color="getColor()" flat @click="submit">Submit</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
const shortid = require("shortid");
import leylo from "leylo";

export default {
  name: "savedialog",
  data: () => ({
    state: false,
    title: null,
    isLocked: false,
    isPrivate: false,
    hasError: false,
    alertText: "A snippet of this name already exists"
  }),
  computed: {
    app() {
      return this.$root.$children[0];
    },
    toolbar() {
      return this.app ? this.app.toolbar : null;
    },
    editor() {
      return this.app ? this.app.editor : null;
    },
    isDark() {
      return /dark/.test(this.$route.params.name);
    },
    appName() {
      return this.$route.params.name.replace("dark", "");
    },
    slug() {
      return this.title ? this.title.replace(" ", "-") : null;
    }
  },
  mounted() {
    this.app.savedialog = this;
  },
  methods: {
    generateID() {
      return shortid.generate();
    },
    getColor() {
      if (/dark/.test(this.$route.params.name)) return "primary lighten-2";
      else return "primary";
    },
    cancel() {
      this.clear();
    },
    verifySubmit() {
      const self = this;
      let params = {
        isLocked: this.isLocked,
        isPrivate: this.isPrivate,
        app: self.$route.params.name.replace("dark", "")
      };
      params["title"] = this.title ? this.slug : this.generateID;
      this.state = false;
      this.clear();
      this.app.toolbar.writeSnippetSave(params);
    },
    async submit() {
      const self = this;
      this.state = true;
      if (this.title) {
        let result = await leylo.getDocByQuery(
          "snippets",
          "title",
          "==",
          self.slug
        );
        if (result) return (this.hasError = true);
      } else {
        this.hasError = false;
        this.verifySubmit();
      }
      this.verifySubmit();
    },
    close() {
      this.clear();
    },
    clear() {
      this.state = false;
      this.title = null;
      this.isLocked = false;
      this.isPrivate = false;
      this.hasError = false;
      setTimeout(() => {
        this.app.editor.focus();
      }, 100);
    },
    async init() {
      this.state = true;
      const self = this;
      setTimeout(() => {
        self.$refs.input.focus();
      }, 20);
    }
  }
};
</script>
