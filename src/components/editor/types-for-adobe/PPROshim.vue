<template>
  <div></div>
</template>

<script>
import { PPROshim } from "./typeMaster";

export default {
  name: "PPROshim",
  data: () => ({
    apptypes: null,
    isActive: false
  }),
  watch: {
    $route() {
      this.isActive = this.$route.params.name == "PPRO";
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
        PPROshim
      );
    },
    destroyTypes() {
      this.apptypes.dispose();
    }
  }
};
</script>
