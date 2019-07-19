<template>
  <div></div>
</template>

<script>
import { ILSTshim } from "./typeMaster";

export default {
  name: "ILSTshim",
  data: () => ({
    apptypes: null,
    isActive: false
  }),
  watch: {
    $route() {
      this.isActive = this.$route.params.name == "ILST";
    },
    isActive(state) {
      state ? this.createTypes() : this.destroyTypes();
    }
  },
  beforeDestroyed() {
    this.apptypes.dispose();
  },
  methods: {
    createTypes() {
      // eslint-disable-next-line
      this.apptypes = monaco.languages.typescript.javascriptDefaults.addExtraLib(
        ILSTshim
      );
    },
    destroyTypes() {
      this.apptypes.dispose();
    }
  }
};
</script>
