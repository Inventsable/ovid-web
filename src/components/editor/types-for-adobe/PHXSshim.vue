<template>
  <div></div>
</template>

<script>
import { PHXSshim } from "./typeMaster";

export default {
  name: "PHXSshim",
  data: () => ({
    apptypes: null,
    isActive: false
  }),
  watch: {
    $route() {
      this.isActive = /PHXS/.test(this.$route.params.name);
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
        PHXSshim
      );
    },
    destroyTypes() {
      this.apptypes.dispose();
    }
  }
};
</script>
