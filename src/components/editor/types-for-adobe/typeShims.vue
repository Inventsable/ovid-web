
<template>
  <div>
    <ILSTshim ref="ILST" />
    <AEFTshim ref="AEFT" />
    <PPROshim ref="PPRO" />
    <PHXSshim ref="PHXS" />
    <IDSNshim ref="IDSN" />
    <AUDTshim ref="AUDT" />
    <!-- <XDshim ref="XD" /> -->
    <ANYshim ref="ANY" />
  </div>
</template>

<script>
import ILSTshim from "@/components/editor/types-for-adobe/ILSTshim";
import AEFTshim from "@/components/editor/types-for-adobe/AEFTshim";
import PHXSshim from "@/components/editor/types-for-adobe/PHXSshim";
import AUDTshim from "@/components/editor/types-for-adobe/AUDTshim";
import PPROshim from "@/components/editor/types-for-adobe/PPROshim";
import IDSNshim from "@/components/editor/types-for-adobe/IDSNshim";
// import XDshim from "@/components/editor/types-for-adobe/XDshim";
import ANYshim from "@/components/editor/types-for-adobe/ANYshim";

import { es5 } from "@/components/editor/types-for-adobe/typeMaster";

export default {
  name: "typeShims",
  props: {
    appName: String
  },
  created() {
    // eslint-disable-next-line
    let deftypes = monaco.languages.typescript.javascriptDefaults.addExtraLib(
      es5
    );
  },
  mounted() {
    this.$refs[this.appName].isActive = true;
  },
  components: {
    ILSTshim,
    AEFTshim,
    AUDTshim,
    PHXSshim,
    PPROshim,
    IDSNshim,
    // XDshim,
    ANYshim
  }
};
</script>
