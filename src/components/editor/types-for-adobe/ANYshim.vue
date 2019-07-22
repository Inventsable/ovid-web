<template>
  <div></div>
</template>

<script>
import { ANYshim } from "./typeMaster";

export default {
  name: "ANYshim",
  data: () => ({
    apptypes: null,
    isActive: false
  }),
  watch: {
    $route() {
      this.isActive = /ANY/.test(this.$route.params.name);
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
        ANYshim
      );
    },
    destroyTypes() {
      this.apptypes.dispose();
    }
  }
};
</script>
