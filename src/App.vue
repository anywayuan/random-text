<template>
  <!-- <router-link to="/home">Home</router-link>
  <router-link to="/fuck">Fuck</router-link> -->

  <router-view v-slot="{ Component }">
    <component :is="Component"/>
  </router-view>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "App",
  setup() {
    return {};
  },
});
</script>

<style lang="scss">
@import "./common/style/global.scss";
</style>