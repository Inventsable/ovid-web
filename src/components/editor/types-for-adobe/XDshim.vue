<template>
  <div></div>
</template>

<script>
import { XDshim } from "./typeMaster";

export default {
  name: "XDshim",
  data: () => ({
    apptypes: null,
    isActive: false
  }),
  watch: {
    $route() {
      this.isActive = /XD/.test(this.$route.params.name);
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
        XDshim
      );
    },
    destroyTypes() {
      this.apptypes.dispose();
    }
  }
};
</script>
