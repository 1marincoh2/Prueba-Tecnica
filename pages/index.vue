<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="logo py-4 d-flex justify-center">
        <VuetifyLogo />
      </v-card>
    </v-col>

    <v-card class="mx-auto overflow-hidden" height="400" width="344">
      <v-system-bar color="deep-purple darken-3"></v-system-bar>

      <v-app-bar color="deep-purple accent-4" dark prominent>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-btn icon @click.stop="mini = !mini">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>

        <v-toolbar-title>My files</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-filter</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-app-bar>

      <v-navigation-drawer
        :mini-variant.sync="mini"
        v-model="drawer"
        absolute
        bottom
        temporary
      >
        <v-list nav dense>
          <v-list-item-group
            v-model="group"
            active-class="deep-purple--text text--accent-4"
          >
            <v-list-item>
              <v-list-item-title>Foo</v-list-item-title>
            </v-list-item>

            <v-list-item>
              <v-list-item-title>Bar</v-list-item-title>
            </v-list-item>

            <v-list-item>
              <v-list-item-title>Fizz</v-list-item-title>
            </v-list-item>

            <v-list-item>
              <v-list-item-title>Buzz</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>

      <v-card-text>
        The navigation drawer will appear from the bottom on smaller size
        screens.
      </v-card-text>
    </v-card>
  </v-row>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from "@nuxtjs/composition-api";

const index = defineComponent({
  layout: "login",
  middleware: "authRedirect",
  setup(prop, { root }) {
    const show3 = ref(false);
    const drawer = ref(false);
    const group = ref(null);
    const mini = ref(true);
    const compu = computed(() => {
      return root.$store.state;
    });

    return {
      show3,
      compu,
      drawer,
      group,
      mini,
    };
  },
});
export default index;
</script>
