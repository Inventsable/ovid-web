<template>
  <v-dialog v-model="state" persistent max-width="400">
    <v-card :dark="isDark">
      <v-alert
        style="margin-top: 0px;"
        :value="hasError"
        color="error"
        icon="mdi-alert"
      >{{alertText}}</v-alert>
      <v-card-title class="headline">Open snippet</v-card-title>
      <v-card-text style="padding-top: 0px">
        <v-form ref="form" @submit.prevent>
          <v-layout wrap>
            <v-flex xs12 style="height: 72px">
              <v-text-field
                ref="input"
                @keyup.enter="submit"
                :rules="[rules.required]"
                label="Title"
                :color="getColor()"
                hint="Title of the snippet to open"
                v-model="title"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :color="getColor()" flat @click="cancel">Cancel</v-btn>
        <v-btn :color="getColor()" :disabled="!title" flat @click="submit">Submit</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import leylo from "leylo";

export default {
  name: "savedialog",
  data: () => ({
    state: false,
    title: null,
    rules: {
      required: value => !!value || "Required."
    },
    hasError: false,
    alertText: `A snippet with this title doesn't exist`
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
    this.app.opendialog = this;
  },
  methods: {
    getColor() {
      if (/dark/.test(this.$route.params.name)) return "primary lighten-2";
      else return "primary";
    },
    cancel() {
      this.clear();
    },
    verifyOpen(doc) {
      this.state = false;
      this.clear();
      this.app.toolbar.openSnippet(doc);
    },
    async submit() {
      const self = this;
      let result = await leylo.getDocByQuery(
        "snippets",
        "title",
        "==",
        self.slug
      );
      if (!result) return (this.hasError = true);
      else this.verifyOpen(result);
    },
    close() {
      this.clear();
    },
    clear() {
      this.state = false;
      this.title = null;
      this.hasError = false;
      setTimeout(() => {
        this.app.editor.focus();
      }, 100);
    },
    init() {
      this.state = true;
      const self = this;
      setTimeout(() => {
        self.$refs.input.focus();
        self.$refs.form.resetValidation();
      }, 20);
    }
  }
};
</script>
