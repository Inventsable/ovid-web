<template>
  <v-dialog v-model="state" persistent max-width="400">
    <v-card :dark="isDark">
      <!-- <v-alert
        style="margin-top: 0px;"
        :value="hasError"
        color="error"
        icon="mdi-alert"
      >{{alertText}}</v-alert>-->
      <v-card-text>
        <v-form ref="form" @submit.prevent>
          <v-layout wrap>
            <v-flex xs12>
              <v-textarea
                ref="input"
                @keyup.enter="submit"
                :rules="[rules.required]"
                label="Add a note"
                :color="getColor()"
                hint="Text to display on hovering this selected text"
                v-model="note"
              ></v-textarea>
            </v-flex>
          </v-layout>
        </v-form>
        <div class="color-picker-wrapper">
          <div
            v-for="item in highlights"
            :key="item.className"
            @click="selectColor(item)"
            class="ovid-color-box"
            :style="fillWithColor(item)"
          ></div>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :color="getColor()" flat @click="cancel">Cancel</v-btn>
        <v-btn :color="getColor()" :disabled="!note" flat @click="submit">Submit</v-btn>
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
    note: null,
    rules: {
      required: value => !!value || "Required."
    },
    highlights: [
      {
        color: "rgba(250, 150, 150, 0.5)",
        className: "ovid-red-highlight",
        active: false
      },
      {
        color: "rgba(150, 250, 150, 0.5)",
        className: "ovid-green-highlight",
        active: false
      },
      {
        color: "rgba(150, 150, 250, 0.5)",
        className: "ovid-blue-highlight",
        active: true
      }
    ],
    hasError: false
    // alertText: `A snippet with this title doesn't exist`
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
    }
  },
  mounted() {
    this.app.notedialog = this;
  },
  methods: {
    getColor() {
      if (/dark/.test(this.$route.params.name)) return "primary lighten-2";
      else return "primary";
    },
    cancel() {
      this.clear();
    },
    selectColor(item) {
      this.highlights.forEach(color => {
        color.active = color.className == item.className;
      });
    },
    fillWithColor(item) {
      return `
        background-color: ${item.color};
        border-color: ${
          item.active
            ? "#46a0f5"
            : /dark/.test(this.$route.params.name)
            ? "#545454"
            : "#999"
        };
      `;
    },
    verifyOpen(doc) {
      // this.state = false;
      // this.clear();
      // this.app.toolbar.openSnippet(doc);
    },
    submit() {
      this.app.editor.confirmNote(this.note, this.range);
      this.clear();
    },
    close() {
      this.clear();
    },
    clear() {
      this.state = false;
      this.note = null;
      this.range = null;
      // this.hasError = false;
      setTimeout(() => {
        this.app.editor.focus();
      }, 100);
    },
    init(range) {
      this.range = range;
      const self = this;
      this.state = true;
      setTimeout(() => {
        self.$refs.input.focus();
        self.$refs.form.resetValidation();
      }, 20);
    }
  }
};
</script>

<style>
.v-text-field__details {
  height: 15px;
}

.ovid-color-box {
  width: 40px;
  height: 40px;
  border-style: solid;
  border-width: 2px;
  cursor: pointer;
}
.ovid-color-box:not(:first-child) {
  margin: 0px 0px 0px 10px;
}

.color-picker-wrapper {
  margin-top: 16px;
  display: flex;
  justify-content: flex-start;
  /* border: 2px solid red; */
  width: 100%;
}
</style>
