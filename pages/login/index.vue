<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6" justify="center" align="center">
      <v-col cols="12" sm="8" md="6" justify="center" align="center">
        <v-card elevation="0">
          <v-card-title class="d-flex justify-left">
            <LogoLogin />
          </v-card-title>

          <v-card-title class="headline" style="margin-top: 10px">
            <h3 class="  d-flex text1 ">Inicia Sesiòn</h3>
          </v-card-title>

          <v-card-text>
            <h3
              class="text-center text--secondary  d-flex text2"
              style="margin: 20px "
            >
              Usuario
            </h3>
            <v-text-field
              v-model="state.user.email"
              single-line
              outlined
              style="border-radius: 10px;"
            />
            <h3
              class="text-center text--secondary  d-flex text2"
              style="margin: 20px"
            >
              Contraseña <v-spacer></v-spacer>
              <v-icon >
              
              </v-icon>
            </h3>
            <v-text-field
              v-model="state.user.password"
              style="border-radius: 10px;"
              single-line
              :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
              outlined
              :type="show3 ? 'text' : 'password'"
              class="input-group--focused"
              @click:append="show3 = !show3"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="warning"
              block
              x-large
              style="border-radius: 10px;"
              @click="login"
            >
              Iniciar sesion
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-col>

    <v-col cols="12" sm="8" md="6" justify="center" align="center">
      <v-card
        elevation="0"
        color="#23B8E3"
        style=" border-radius: 0px 20px 20px 0px"
      >
        <v-img src="logo2.png" class="white--text"> </v-img>
      </v-card>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import {
  defineComponent,
  ref,
  onMounted,
  reactive
} from "@nuxtjs/composition-api";
import { AuthService } from '~/common/Auth.service';
import  {AuthType}  from '~/type/auth.model';
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
        password: ""
      } as AuthType
    });

    const show3 = ref(false);

    const login = async () => {
      try {
        const serviceUse = new AuthService();
        const response = await serviceUse.loginPost(state.user);
        console.log(response.data);
        root.$store.commit("setLoggedIn", true);
        root.$store.commit("setUser", response.data.user);
        //@ts-ignore
        Cookiesjs.set("isAuth", true);
        Cookiesjs.set("Auth", JSON.stringify(response.data.user));

        root.$router.push("/reportes");
      } catch (e) {}
    };

    return {
      show3,
      login,
      state
    };
  }
});
export default index;
</script>
<style>
.logo1 {
  width: 500px;
  height: 500px;
  left: 758px;
  top: 0px;
}

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
</style>
