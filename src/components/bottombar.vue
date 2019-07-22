<template>
  <div>
    <div v-if="$route.name !== 'home'" class="bottom-bar hidden-sm-and-down">
      <div class="head-end"></div>
      <div class="tail-end">
        <div class="mr-3 mb-2">
          <v-btn flat>
            Report a bug
            <v-icon class="pl-2">mdi-github-circle</v-icon>
          </v-btn>
        </div>
      </div>
    </div>
    <div v-else class="bottom-bar-static">
      <div class="head-end">
        I make custom panels and scripts:
        <a
          target="_blank"
          href="mailto:tom@inventsable.cc"
        >tom@inventsable.cc</a>
      </div>
      <div class="tail-end">
        <div class="mr-3 mb-2">
          See my source code
          <v-btn icon>
            <v-icon>mdi-github-circle</v-icon>
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "bottombar"
};
</script>

<style>
.bottom-bar-static {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
  /* position: fixed;
  bottom: 5px;
  left: 0px; */
  /* border: 2px solid red; */
  height: 30px;
}

.bottom-bar {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
  position: fixed;
  bottom: 0px;
  left: 0px;
  /* border: 2px solid red; */
  height: 30px;
}

.head-end {
  margin-top: -10px;
  margin-left: 10px;
}
</style>
