<template>
  <v-container class="main-editor-wrapper">
    <div class="main-editor-padding">
      <editor />
    </div>
    <div v-if="isMounted">
      <typeShims :appName="appName" />
    </div>
  </v-container>
</template>

<script>
import editor from "../components/editor/editor";
import typeShims from "@/components/editor/types-for-adobe/typeShims";

export default {
  data: () => ({
    appName: null,
    isMounted: false
  }),
  computed: {
    app() {
      return this.$root.$children[0];
    }
  },
  components: {
    editor,
    typeShims
  },
  watch: {
    $route() {
      console.log(`Master route changed to ${this.$route.params.name}`);
      this.appName = this.$route.params.name;
    }
  },
  mounted() {
    if (this.$route.params.name) {
      this.appName = this.$route.params.name;
      // this.deleteTypes();
      if (this.$route.params.page) {
        console.log(`Find page: ${this.$route.params.page}`);
      }
    } else {
      throw new Error("No app found, redirect home or to error page");
    }
    this.isMounted = true;
  },
  methods: {
    // deleteTypes() {
    //   const self = this;
    //   // console.log(monaco);
    // }
  }
};
</script>

<style>
body::-webkit-scrollbar {
  width: 0px;
}

.main-editor-wrapper {
  box-sizing: border-box;
  /* border: 2px solid #262626; */
  height: 100%;
}

.main-editor-padding {
  width: 100%;
  height: 100%;
  padding: 10px;
  background-color: #1e1e1e;
}
</style>
