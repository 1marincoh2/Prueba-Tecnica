<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card
        class="pa-4 justify-center mx-auto"
        rounded="lg"
        max-width="500"
        style="border-radius: 10px"
      >
        <v-card-title class="justify-center">
          <h3 class="d-flex text6">Configuraciòn</h3>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="6">
              <h3 class="text--secondary d-flex text2">Nombre(s)</h3>
              <v-text-field
                v-model="state.user.name"
                dense
                single-line
                outlined
                style="border-radius: 5px"
                label="Ingrese su Nombre"
              />
            </v-col>
            <v-col cols="6">
              <h3 class="text--secondary d-flex text2">Apellido(s)</h3>
              <v-text-field
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
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn @click="cancelar()" text color="error"> Cancelar </v-btn>
          <v-btn
            align="center"
            color="#E44066"
            style="border-radius: 10px"
            class="white--text"
            @click="UserUpgrade()"
          >
            Actualizar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import {
  defineComponent,
  ref,
  onMounted,
  reactive,
  computed,
} from "@nuxtjs/composition-api";
import { UserService } from "~/common/users.service";
import { UserType } from "~/type/users.model";

interface State {
  user: UserType;
}

const index = defineComponent({
  middleware: "authRedirect",
  setup(prop, { root }) {
    const state = reactive<State>({
      user: {
        id: 0,
        name: "",
        email: "",
        password: "",
        lastName: "",
        rol: "",
      } as UserType,
    });

    const show3 = ref(false);
    onMounted(async () => {
      getUsers();
      edit(state.user);
    });

    const UserUpgrade = async () => {
      try {
        const serviceUser = new UserService();
        const serviceUpdate = await serviceUser.userPatch(state.user);
        cancelar();
      } catch (response) {
        console.log("error", response);
      }

      console.log("estoy actualizando");
    };

    const getUsers = async () => {
      const datoId = root.$store.state.user.id;
      try {
        const serviceUse = new UserService();
        const response = await serviceUse.userGet1(datoId);
        console.log(response, datoId, "hola de getUsers");
        state.user = response;
      } catch (e) {}
    };

    const cancelar = () => {
      state.user = {
        id: 0,
        name: "",
        email: "",
        password: "",
        lastName: "",
        rol: "",
      } as UserType;
    };
    const edit = (user: UserType) => {
      state.user = user;
    };
    return {
      show3,
      state,
      cancelar,
      UserUpgrade,
      edit,
    };
  },
});
export default index;
</script>
<style>
.text1 {
  font-family: Montserrat;
  font-size: 46px;
  font-style: normal;
  font-weight: 700;
  line-height: 59px;
  letter-spacing: 0em;
  text-align: center;
}
.text2 {
  font-family: Montserrat;
  font-size: 18px;
  color: #676161;
}
</style>
style="margin-top:20px"
