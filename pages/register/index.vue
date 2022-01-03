<template>
  <v-container fill-height fluid class="page-body">
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <v-card
          class="pa-4 justify-center mx-auto"
          rounded="lg"
          max-width="500"
          style="border-radius: 10px"
        >
          <v-card-title class="d-flex justify-center">
            <Logo />
          </v-card-title>
          <v-card-title class="justify-center">
            <h3 class="d-flex text6">Registro</h3>
          </v-card-title>
          <v-card-text>
             <v-form ref="refs" lazy-validation>
            <v-row>
              <v-col cols="6">
                <h3 class="text--secondary d-flex text2">Nombre(s)</h3>
                <v-text-field
                  @keyup.enter="saveUser"
                  :rules="[rules.required, rules.min]"
                  dense
                  v-model="state.user.name"
                  single-line
                  outlined
                  style="border-radius: 5px"
                  label="Ingrese su Nombre"
                />
              </v-col>
              <v-col cols="6">
                <h3 class="text--secondary d-flex text2">Apellido(s)</h3>
                <v-text-field
             @keyup.enter="saveUser"
                  :rules="[rules.required, rules.min]"
                  v-model="state.user.lastName"
                  outlined
                  single-line
                  dense
                  label="Ingrese sus apellido(s)"
                  required
                  style="border-radius: 5px"
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <h3 class="text--secondary d-flex text2">Correo Electronico</h3>
                <v-text-field
                   :rules="loginEmailRules"
                  @keyup.enter="saveUser"
                  v-model="state.user.email"
                  outlined
                  single-line
                  dense
                  label="Ingrese su Correo"
                  required
                  style="border-radius: 5px"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <h3 class="text-center text--secondary d-flex text2">
                  ingrese su contraseña
                </h3>
                <v-text-field
                @keyup.enter="saveUser"
                  :rules="[rules.required, rules.min]"
                  outlined
                  v-model="state.user.password"
                  dense
                  single-line
                  style="border-radius: 5px"
                  label="Ingrese su contraseña"
                  :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show3 ? 'text' : 'password'"
                  @click:append="show3 = !show3"
                ></v-text-field>
              <div class="my-4">
                      <span>¿Ya tienes cuenta? <a   href="login">¡Inicia sesión ahora!</a></span>
                  </div>         </v-col>
            </v-row>
            </v-form>
          </v-card-text>
          <v-card-actions>
     
            <v-btn block color="primary" @click="saveUser"> registrar</v-btn>
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
  reactive
} from "@nuxtjs/composition-api";
import { UserService } from "~/common/users.service";
import { UserType } from "~/type/users.model";

interface State {
  users: UserType[];
  user: UserType;
}

const index = defineComponent({
 layout: "login",
//middleware: "authRedirect",

  setup(props,{root}) {
    const state = reactive<State>({
      users: [],
      user: {
        id: 0,
        name: "",
        email: "",
        password: "",
        lastName: "",
        rol: ""
      } as UserType
    });
      const notification = reactive({
      active: false,
      timeout: 2000,
      text: "",
      color: "orange",
    });
    const roles = ["Admin", "Usuario"];
    const show3 = ref(false);

     const loading = ref(false);
    const loginEmailRules = [
      (v: string) => !!v || "Required",
       (v: string) => /.+@.+\..+/ || "E-mail must be valid"

    ];

    const rules = {
      required: (value: string) => !!value || "Required.",
      min: (v: string) => (v && v.length >= 4) || "Min 4 characters",
    };
    const refs = ref(null)

    onMounted(async () => {
    });

   
    const saveUser = async () => {
      //@ts-ignore
      if (refs.value.validate()) {

         try {
              loading.value = true;
        const serviceUser = new UserService();
        const service = await serviceUser.userPost(state.user);
           loading.value = true;
        state.users.push(service);
    
        
      } catch (response) {
         loading.value = false;
          console.log("error en validacion");
          notification.text = "Usuario o Contraseña Incorrecta";
          notification.color = "red";
          notification.active = true;
      }
      reset();
      }else {
        console.log("error en validacion");
        notification.text = "complete los campos";
        notification.active = true;
      }

     
   
    };
   
 

    const reset = () => {
      state.user = {
        id: 0,
        name: "",
        email: "",
        password: "",
        lastName: "",
        rol: ""
      } as UserType;
    };

    const editar = (user: UserType) => {
      state.user = user;
    };

    return {
      state,
      notification,
      rules,
      refs,
      roles,
      saveUser,
      reset,
      show3,     
      editar,
      loading,
      loginEmailRules
    };
  }
});
export default index;
</script>
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
