<template>
  <v-container fill-height fluid class="page-body">
    <v-snackbar
      v-model="notification.active"
      :timeout="notification.timeout"
      :color="notification.color"
      right
      top
    >
      {{ notification.text }}
    </v-snackbar>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <v-card
          :loading="loading"
          class="pa-4 justify-center mx-auto"
          rounded="lg"
          max-width="400"
          style="border-radius: 10px"
        >
          <v-card-title class="d-flex justify-center">
            <Logo />
          </v-card-title>
          <v-card-title class="justify-center">
            <h3 class="d-flex text1">Iniciar Sesiòn</h3>
          </v-card-title>
          <v-card-text>
            <v-form ref="refs" lazy-validation>
              <v-col cols="12">
                <v-text-field
                  :rules="loginEmailRules"
                  @keyup.enter="login"
                  v-model="state.user.email"
                  outlined
                  dense
                  label="E-mail"
                  required
                  style="border-radius: 5px"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  @keyup.enter="login"
                  :rules="[rules.required, rules.min]"
                  outlined
                  v-model="state.user.password"
                  dense
                  style="border-radius: 5px"
                  label="Password"
                  @click:append="show3 = !show3"
                  :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show3 ? 'text' : 'password'"
                ></v-text-field>
              </v-col>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn block color="primary" @click="login"> Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import {
  defineComponent,
  ref,
  onMounted,
  reactive,
} from "@nuxtjs/composition-api";
import { AuthService } from "~/common/Auth.service";
import { AuthType } from "~/type/auth.model";

//@ts-ignore
import Cookiesjs from "js-cookie";

interface State {
  user: AuthType;
}

const index = defineComponent({
  layout: "login",
  middleware: "authRedirect",
  setup(prop, { root }) {
    const state = reactive<State>({
      user: {
        email: "",
        password: "",
      } as AuthType,
    });

    const notification = reactive({
      active: false,
      timeout: 2000,
      text: "",
      color: "orange",
    });
    const show3 = ref(false);
    const loading = ref(false);
    const loginEmailRules = [
      (v: string) => !!v || "Required",
      (v: string) => /.+@.+\..+/ || "E-mail must be valid",
    ];

    const rules = {
      required: (value: string) => !!value || "Required.",
      min: (v: string) => (v && v.length >= 4) || "Min 4 characters",
    };
    const refs = ref(null);
    const login = async () => {
      // @ts-ignore
      if (refs.value.validate()) {
        try {
          loading.value = true;
          const serviceUse = new AuthService();
          const response = await serviceUse.loginPost(state.user);
          loading.value = false;
          console.log(response);
          root.$store.commit("setLoggedIn", true);
          root.$store.commit("setUser", response.data);
          //@ts-ignore
          Cookiesjs.set("isAuth", true);
          Cookiesjs.set("Auth", JSON.stringify(response.data));

          root.$router.push("/reportes");
        } catch (e) {
          loading.value = false;
          console.log("error en validacion");
          notification.text = "Usuario o Contraseña Incorrecta";
          notification.color = "red";
          notification.active = true;
        }
      } else {
        console.log("error en validacion");
        notification.text = "complete los campos";
        notification.active = true;
      }
    };

    return {
      show3,
      login,
      state,
      notification,
      loginEmailRules,
      refs,
      rules,
      loading,
    };
  },
});
export default index;
</script>
<style scoped>
.text1 {
  font-family: Montserrat;
  font-size: 36px;
  font-style: normal;
  font-weight: 700;
  line-height: 44px;
  letter-spacing: 0em;
  text-align: left;
}
.text2 {
  font-family: Montserrat;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 22px;
  letter-spacing: 0em;
  text-align: left;
  color: #676161;
}

.page-body {
  background: #2f37cd
    url("http://38.media.tumblr.com/d23deac40b06633b79520a8552f40b94/tumblr_nb1uhrRrge1st5lhmo1_1280.jpg")
    no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  font-family: "Roboto";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.page-body::before {
  z-index: -1;
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  background: #2f37cd;
  /* IE Fallback */
  background: rgba(45, 55, 205, 0.8) !important;
  width: 100%;
  height: 100%;
}
</style>
