<template>
  <div></div>
</template>

<script>
export default {
  name: "typeparser",
  data: () => ({
    ILST: ``,
    AUDT: ``,
    IDSN: ``,
    PPRO: ``
  }),
  methods: {
    getTypes(name) {
      return this[name];
    }
  },
  mounted() {
    console.log("Parser mounted");
    this.$root.$children[0].parser = this;
  }
};
</script>
