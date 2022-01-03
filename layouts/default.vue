<template>
  <v-app dark>
    <v-navigation-drawer
      dark
      color="#263238"
      v-model="drawer"
      clipped
      fixed
      class="white--text"
      app
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title style="margin-top: 30px">
            <LogoDrewer />
          </v-list-item-title>
          <v-list-item-title>
            <div class="mx-auto text-center">
              <v-avatar size="50" color="#EA465B">
                <v-icon dark> mdi-account-circle </v-icon>
              </v-avatar>
            </div>
          </v-list-item-title>
          <v-list-item-title>
            <h1 class="text-center">{{ computedStore.name }}</h1>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list v-if="computedStore.rol === 'Admin'">
        <v-list-item
          :class="ruta === 'reportes' ? 'focusSelect' : ''"
          link
          to="/reportes"
        >
          <v-list-item-icon>
            <v-icon :color="ruta === 'reportes' ? '#263238' : ''"
              >mdi-briefcase-check</v-icon
            >
          </v-list-item-icon>
          <v-list-item-title
            :class="ruta === 'reportes' ? 'black--text ' : 'white--text '"
            >Reportes</v-list-item-title
          >
        </v-list-item>
        <v-list-item
          :class="ruta === 'usuarios' ? 'focusSelect' : ''"
          link
          to="/usuarios"
        >
          <v-list-item-icon>
            <v-icon :color="ruta === 'usuarios' ? '#263238' : ''"
              >mdi-account-check</v-icon
            >
          </v-list-item-icon>
          <v-list-item-title
            :class="ruta === 'usuarios' ? 'black--text ' : 'white--text '"
            >usuarios</v-list-item-title
          >
        </v-list-item>
        <v-list-item
          :class="ruta === 'configuracion' ? 'focusSelect' : ''"
          link
          to="/configuracion"
        >
          <v-list-item-icon>
            <v-icon :color="ruta === 'configuracion' ? '#263238' : ''"
              >mdi-cog-outline</v-icon
            >
          </v-list-item-icon>
          <v-list-item-title
            :class="ruta === 'configuracion' ? 'black--text ' : 'white--text '"
            >Configuraciòn</v-list-item-title
          >
        </v-list-item>
      </v-list>
      <v-list v-else>
        <v-list-item
          :class="ruta === 'reportes' ? 'focusSelect' : ''"
          link
          to="/reportes"
        >
          <v-list-item-icon>
            <v-icon :color="ruta === 'reportes' ? '#263238' : ''"
              >mdi-briefcase-check</v-icon
            >
          </v-list-item-icon>
          <v-list-item-title
            :class="ruta === 'reportes' ? 'black--text ' : 'white--text '"
            >Reportes</v-list-item-title
          >
        </v-list-item>
        <v-list-item
          :class="ruta === 'configuracion' ? 'focusSelect' : ''"
          link
          to="/configuracion"
        >
          <v-list-item-icon>
            <v-icon :color="ruta === 'configuracion' ? '#263238' : ''"
              >mdi-cog-outline</v-icon
            >
          </v-list-item-icon>
          <v-list-item-title
            :class="ruta === 'configuracion' ? 'black--text ' : 'white--text '"
            >Configuraciòn</v-list-item-title
          >
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar clipped-left fixed color=" primary" class="white--text" app>
      <v-app-bar-nav-icon color="#FDFDFD" @click.stop="drawer = !drawer" />
      <v-toolbar-title> <Logo /></v-toolbar-title>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn icon @click="logout()" color="#FDFDFD">
        <v-icon>mdi-power-standby</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
  useAsync,
  useContext,
  useFetch,
  useMeta,
  reactive,
  useRoute,
  onMounted,
} from "@nuxtjs/composition-api";
//@ts-ignore
import Cookiesjs from "js-cookie";

import Logo from "~/components/Logo.vue";

import LogoDrewer from "~/components/LogoDrewer.vue";

const index = defineComponent({
  setup(props, { root }) {
    const clipped = ref(false);
    const drawer = ref(false);
    const fixed = ref(false);

    const miniVariant = ref(false);
    const right = ref(true);
    const rightDrawer = ref(false);
    const title = " prueba tecnica";

    const router = useRoute();

    const computedStore = computed(() => {
      return root.$store.state.user;
    });

    const ruta = computed(() => {
      return router.value.name;
    });

    const logout = async () => {
      //@ts-ignore
      Cookiesjs.remove("isAuth");
      //@ts-ignore

      Cookiesjs.remove("Auth");

      root.$router.push("/login");
    };
    onMounted(() => {
      console.log(router);
    });

    return {
      miniVariant,
      title,
      computedStore,
      router,
      ruta,
      logout,
      clipped,
      drawer,
      right,
      rightDrawer,
      fixed,
    };
  },
});
export default index;
</script>
<style scoped>
.focusSelect {
  background: white !important;
  border-radius: 15px;
}
</style>
