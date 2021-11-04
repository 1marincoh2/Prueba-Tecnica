<template>
  <v-app>
    <v-navigation-drawer
      fixed
      permanent
      app
      dark
      color="#263238"
      width=" 250px"
      style=" border-radius: 20px 0px 0px 20px"
      class="white--text"
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title style="margin-top:30px">
            <LogoLogin />
          </v-list-item-title>

          <v-list-item-title style="margin-left:15px">
            <v-list-item-subtitle style="margin-top:20px">
              Hola
            </v-list-item-subtitle>
            {{ computedStore.name }}
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
       <template v-slot:append>
        <div class="pa-2">
          <v-btn block  outlined
      color="indigo"  @click="logout()">
           Cerrar Sesion<v-icon>mdi-power-standby</v-icon>
          </v-btn>
        </div>
      </template>
     
    </v-navigation-drawer>

    <v-main style="margin-left:40px">
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
  onMounted
} from "@nuxtjs/composition-api";
//@ts-ignore
import Cookiesjs from "js-cookie";
const index = defineComponent({
  setup(prop, { root }) {
    const fixed = ref(false);
    const miniVariant = ref(false);
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
        Cookiesjs.remove("isAuth" );
        Cookiesjs.remove("Auth");
     
      root.$router.push('/login')
    }
    onMounted(() => {
      console.log(router);
    });

    return {
      fixed,
      miniVariant,
      title,
      computedStore,
      router,
      ruta,
      logout
    };
  }
});
export default index;
</script>
<style scoped>
.focusSelect {
  background: white !important;
  border-radius: 15px;
}
</style>
