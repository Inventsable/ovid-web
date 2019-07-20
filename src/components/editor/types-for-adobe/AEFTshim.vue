<template>
  <div></div>
</template>

<script>
import { AEFTshim } from "./typeMaster";

export default {
  name: "AEFTshim",
  data: () => ({
    apptypes: null,
    isActive: false
  }),
  watch: {
    $route() {
      this.isActive = /AEFT/.test(this.$route.params.name);
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
        AEFTshim
      );
    },
    destroyTypes() {
      this.apptypes.dispose();
    }
  }
};
</script>
