<template>
  <v-container id="outWindow" style="width: 100%;">
    <v-card style="max-width: 800px; margin: auto; background-color: transparent;" flat>
      <v-container id="inWindow" fluid grid-list-lg>
        <v-layout row wrap v-for="(item, index) in items" :key="index" class="py-2">
          <v-flex xs12>
            <v-card height="300px" color="white" class="hidden-xs-only">
              <v-layout v-if="(index + 1) % 2" style="height: 100%;" row>
                <v-flex xs8 sm4>
                  <v-card-title primary-title>
                    <div>
                      <div class="headline pb-2">{{item.header}}</div>
                      <div v-html="item.desc"></div>
                    </div>
                  </v-card-title>
                </v-flex>
                <v-flex xs4 sm8>
                  <v-img :src="item.image" height="280px" contain></v-img>
                </v-flex>
              </v-layout>
              <v-layout v-else style="height: 100%;" row>
                <v-flex xs4 sm8>
                  <v-img :src="item.image" height="280px" contain></v-img>
                </v-flex>
                <v-flex xs8 sm4>
                  <v-card-title primary-title>
                    <div>
                      <div class="headline pb-2">{{item.header}}</div>
                      <div v-html="item.desc"></div>
                    </div>
                  </v-card-title>
                </v-flex>
              </v-layout>
            </v-card>
            <v-card color="white" class="hidden-sm-and-up">
              <div style="height: 100%;">
                <v-card-title>
                  <div>
                    <div class="headline pb-2">{{item.header}}</div>
                    <div v-html="item.desc"></div>
                  </div>
                </v-card-title>
                <v-card-text>
                  <v-img :src="item.image" height="auto" contain></v-img>
                </v-card-text>
              </div>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "mainpreview",
  data: () => ({
    items: [
      {
        header: "Just Like VSCode",
        desc: `Ovid uses Microsoft's <a target="_blank" href="https://github.com/microsoft/monaco-editor">Monaco Editor</a> core and feels nearly identical to VSCode.`,
        image:
          "https://thumbs.gfycat.com/PlaintiveBabyishCrow-size_restricted.gif"
      },
      {
        header: "Typescript Support",
        desc:
          "This editor shows the Document Object Model of the current app with descriptions of all available properties and methods as you type.",
        image:
          "https://thumbs.gfycat.com/GrizzledGlitteringBubblefish-size_restricted.gif"
      },
      {
        header: "ECMA 2018",
        desc: `Write completely modern Javascript and receive snippets compatible to run inside Adobe applications (ECMA-262)`,
        image:
          "https://thumbs.gfycat.com/WelllitFlawlessBluebottle-size_restricted.gif"
      },
      {
        header: "Share and Save",
        desc: `Instantly save or open snippets by title for ease of sharing via direct URLs.`,
        image:
          "https://thumbs.gfycat.com/SpeedyAridHamadryas-size_restricted.gif"
      },
      {
        header: "Easy Resources",
        desc: `Curated list of learning resources and forums for any app available on navigation drawer.`,
        image:
          "https://thumbs.gfycat.com/BothKeyIberianchiffchaff-size_restricted.gif"
      },
      {
        header: "Available as a Panel",
        desc: `The precursor to this web app is already <a target="_blank" href="https://github.com/Inventsable/ovid-editor">available on Github</a> for all supported apps, allowing you to write, run, save, open, and modify scripts with ease.`,
        image:
          "https://thumbs.gfycat.com/FlippantFirsthandGangesdolphin-size_restricted.gif"
      }
    ]
  })
};
</script>

<style>
@media only screen and (max-width: 600px) {
  #inWindow {
    padding: 16px 0px;
  }
}
</style>
