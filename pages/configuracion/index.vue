<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="4" justify="center" align="center">
      <v-card elevation="0">
        <v-card-title class=" d-flex justify-center">
          <h1 class="  d-flex text1" style="margin-top: -30px">
            Configuraciòn
          </h1>
        </v-card-title>

        <v-card-text style="margin-top: 30px">
          <h3 class="text-center   d-flex text2" style="margin-bottom: 15px">
            Usuario
          </h3>
          <v-text-field
            v-model="state.user.username"
            single-line
            outlined
            style="border-radius: 10px "
          />
          <h3 class="text-center  d-flex text2" style="margin-bottom: 15px">
            Nombre
          </h3>
          <v-text-field
            v-model="state.user.name"
            single-line
            outlined
            style="border-radius: 10px;"
          />
          <h3 class="text-center d-flex text2" style="margin-bottom: 15px">
            Correo
          </h3>
          <v-text-field
            v-model="state.user.email"
            single-line
            outlined
            style="border-radius: 10px;"
          />
          <h3
            class="text-center text--secondary  d-flex text2"
            style="margin-bottom: 15px"
          >
            Contraseña
          </h3>
          <v-text-field
            v-model="state.user.password"
            style="border-radius: 10px;"
            single-line
            outlined
            :type="show3 ? 'text' : 'password'"
            class="input-group--focused"
            @click:append="show3 = !show3"
          ></v-text-field>
        </v-card-text>

        <v-card-actions class=" d-flex justify-center">
          <v-btn @click="cancelar()" text color="primary">
            Cancelar
          </v-btn>
          <v-btn
            align="center"
            color="#23B8E3"
            x-large
            style="border-radius: 10px;"
            width="150px"
            height="50px"
            class="white--text "
            @click="UserUpgrade()"
          >
            Guardar
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
  computed
} from "@nuxtjs/composition-api";
import { UserService } from "~/common/users.service";
import { UserType } from "~/type/users.model";

interface State {
  user: UserType;
}

const index = defineComponent({
  middleware: "authRedirect",
  setup(prop,{root}) {
    const state = reactive<State>({
     user: {
        id: 0,
        name: "",
        email: "",
        password: "",
        username: "",
        rol: ""
      } as UserType
    });
    

   
     
    const show3 = ref(false);
    onMounted(async () => {
            getUsers()
            edit(state.user)
            
           
   });
    
    const UserUpgrade = async () => {

      try {
        const serviceUser = new UserService();
       const serviceUpdate = await serviceUser.userPatch(state.user); 
            cancelar()
      } catch (response) {
        console.log("error", response);
      }

      console.log("estoy actualizando");
    };
      
      

const getUsers = async () => {
    const datoId =root.$store.state.user.id
           try {
        const serviceUse = new UserService();
        const response = await serviceUse.userGet1(datoId);
        console.log(response.data);
        state.user = response.data;
      } catch (e) {}
    };


    const cancelar = () => {
      state.user = {
        id: 0,
        name: "",
        email: "",
        password: "",
        username: "",
        rol: ""
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
    
     edit

    };
  }
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
}</style
>style="margin-top:20px"
