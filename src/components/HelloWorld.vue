<template>
  <v-container id="main-container">
    <div class="main-page">
      <div class="main-title pt-4">
        <div class="main-header">
          <logo style="width: 42px;" />
          <div class="display-2 pl-3">Ovid Editor</div>
        </div>
        <div class="subheading">A minimalist browser editor for Adobe scripting</div>
      </div>
      <div class="main-content">
        <main-preview />
      </div>
    </div>
  </v-container>
</template>

<script>
import logo from "@/components/editor/logo";
import mainpreview from "@/components/mainpreview";

export default {
  data: () => ({
    msg: "Hello"
  }),
  components: {
    logo,
    "main-preview": mainpreview
  }
};
</script>

<style>
.main-page {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.main-content {
  width: 100%;
}

.main-header {
  display: flex;
  justify-content: flex-start;
  flex-wrap: nowrap;
}

#main-container {
  /* height: calc(100vh - 48px);
  overflow-y: auto; */
  width: 100vw;
}

@media only screen and (max-width: 600px) {
  #main-container {
    padding: 16px 0px;
  }
}
</style>
