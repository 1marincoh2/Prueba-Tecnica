<template>
  <v-app class="white--text">
    <v-app-bar app color=" primary" class="white--text">
      <v-toolbar-title style="margin-left: 10px"> <Logo /></v-toolbar-title>
      <v-toolbar-title> Bienvenido</v-toolbar-title>

      <v-spacer />
      <v-toolbar-items class="hidden-sm-and-down">
        <v-spacer />
        <v-btn text class="white--text" to="/login"> Login </v-btn>
        <v-btn text class="white--text" to="/register"> Registro </v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  setup() {
    return {};
  },
  components: {},
});
</script>
