<template>
  <div></div>
</template>

<script>
import { AUDTshim } from "./typeMaster";

export default {
  name: "AUDTshim",
  data: () => ({
    apptypes: null,
    isActive: false
  }),
  watch: {
    $route() {
      this.isActive = /AUDT/.test(this.$route.params.name);
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
        AUDTshim
      );
    },
    destroyTypes() {
      this.apptypes.dispose();
    }
  }
};
</script>
