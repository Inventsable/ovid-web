<template>
  <div></div>
</template>

<script>
import { IDSNshim } from "./typeMaster";

export default {
  name: "IDSNshim",
  data: () => ({
    apptypes: null,
    isActive: false
  }),
  watch: {
    $route() {
      this.isActive = /IDSN/.test(this.$route.params.name);
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
        IDSNshim
      );
    },
    destroyTypes() {
      this.apptypes.dispose();
    }
  }
};
</script>
