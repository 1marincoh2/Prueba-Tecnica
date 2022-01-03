<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="12">
      <v-card
        elevation="5"
        class="pa-4 justify-center mx-auto"
        rounded="lg"
        style="border-radius: 10px"
      >
        <h1 class="d-flex text1" style="margin: 30px">
          <v-avatar
            color="#28ABE7"
            size="26"
            class="white--text"
            style="margin-right: 30px"
          >
            1
          </v-avatar>

          Lista de Usuario
        </h1>

        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr class="table1 mb-1 mt-1">
                <th class="text-left">NOMBRE</th>
                <th class="text-left">APELLIDOS</th>
                <th class="text-left">CORREO</th>
                <th class="text-left">ROL</th>
                <th class="text-left"></th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="app-table mb-1 mt-1"
                v-for="item in state.users"
                :key="item.name"
              >
                <td>{{ item.name }}</td>
                <td>{{ item.lastName }}</td>
                <td>{{ item.email }}</td>
                <td>{{ item.rol }}</td>

                <td>
                  <v-icon @click="DeleteUser(item)" small> mdi-delete </v-icon>
                  <v-icon @click="editar(item)" small> mdi-pencil </v-icon>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card>
    </v-col>
    <v-col cols="12" sm="8" md="12">
      <v-card
        elevation="5"
        class="pa-4 justify-center mx-auto"
        rounded="lg"
        style="border-radius: 10px"
      >
        <h1 class="d-flex text1" style="margin: 30px">
          <v-avatar
            color="#28ABE7"
            size="26"
            class="white--text"
            style="margin-right: 30px"
          >
            2
          </v-avatar>

          Nuevo Usuario
        </h1>

        <v-card elevation="0">
          <v-row justify="center" align="center">
            <v-col cols="6" sm="8" md="6">
              <h3 class="text-center text--secondary d-flex text2">Nombre</h3>
              <v-text-field
                dense
                v-model="state.user.name"
                single-line
                outlined
              />
            </v-col>
            <v-col cols="6" sm="8" md="6">
              <h3 class="text-center text--secondary d-flex text2">
                Apellidos
              </h3>
              <v-text-field
                v-model="state.user.lastName"
                single-line
                outlined
                dense
              />
            </v-col>
            <v-col cols="6" sm="8" md="6">
              <h3 class="text-center text--secondary d-flex text2">Correo</h3>
              <v-text-field
                dense
                v-model="state.user.email"
                single-line
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="6" sm="8" md="6">
              <h3 class="text-center text--secondary d-flex text2">
                Contraseña
              </h3>
              <v-text-field
                dense
                v-model="state.user.password"
                single-line
                outlined
                :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show3 ? 'text' : 'password'"
                class="input-group--focused"
                @click:append="show3 = !show3"
                style="border-radius: 10px"
              ></v-text-field>
            </v-col>
            <v-col cols="6" sm="8" md="6">
              <h3 class="text-center text--secondary d-flex text2">
                Rol en Plataforma
              </h3>
              <v-select
                dense
                :items="roles"
                v-model="state.user.rol"
                style="border-radius: 10px"
                outlined
              ></v-select>
            </v-col>

            <v-col cols="6" sm="8" md="6">
              <v-card-actions>
                <v-row align="center" justify="end">
                  <v-btn @click="reset()" text color="primary">
                    Cancelar
                  </v-btn>
                  <v-btn
                    v-if="state.user.id === 0"
                    align="center"
                    color="#23B8E3"
                    small
                    x-large
                    style="border-radius: 10px"
                    width="159px"
                    Height="28px"
                    class="white--text"
                    @click="saveUser()"
                  >
                    Crear
                  </v-btn>
                  <v-btn
                    v-else
                    align="center"
                    color="#23B8E3"
                    small
                    x-large
                    style="border-radius: 10px"
                    width="159px"
                    Height="28px"
                    class="white--text"
                    @click="userUp()"
                  >
                    Actualizar
                  </v-btn>
                </v-row>
              </v-card-actions></v-col
            >
          </v-row>
        </v-card>
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
} from "@nuxtjs/composition-api";
import { UserService } from "~/common/users.service";
import { UserType } from "~/type/users.model";

interface State {
  users: UserType[];
  user: UserType;
}

const index = defineComponent({
  middleware: "authRedirect",

  setup() {
    const state = reactive<State>({
      users: [],
      user: {
        id: 0,
        name: "",
        email: "",
        password: "",
        lastName: "",
        rol: "",
      } as UserType,
    });
    const roles = ["Admin", "Usuario"];
    const show3 = ref(false);

    const Estadosform = ref(null);
    const camporequerido = [(v: string) => !!v || "Required"];

    onMounted(async () => {
      getUsers();
    });

    const getUsers = async () => {
      try {
        const serviceUse = new UserService();
        const response = await serviceUse.userGet();
        console.log(response.usuarios);
        state.users = response.usuarios;
      } catch (e) {}
    };

    const saveUser = async () => {
      //@ts-ignore

      try {
        const serviceUser = new UserService();
        const service = await serviceUser.userPost(state.user);
        state.users.push(service);
      } catch (response) {}
      reset();
      getUsers();
    };
    const DeleteUser = async (data: UserType) => {
      try {
        const serviceuser = new UserService();
        const serviceDelete = await serviceuser.userDelete(data);
        const findIndex1 = state.users.findIndex(
          (indice) => indice.id === data.id
        );
        if (findIndex1 > -1) {
          state.users.splice(findIndex1, 1);
        }
        console.log("estoy eliminando la posicion " + findIndex1);
      } catch (response) {
        console.log("error", response);
      }
    };

    const userUp = async () => {
      try {
        const serviceuser = new UserService();
        const serviceUpdate = await serviceuser.userPatch(state.user);
        const findIndex1 = state.users.findIndex(
          (indice) => indice.id === state.user.id
        );
        if (findIndex1 > -1) {
          // @ts-ignore
          state.users.splice(findIndex1, 1, serviceUpdate);
        }
        reset();
        getUsers();
      } catch (response) {
        console.log("error", response);
      }
    };

    const reset = () => {
      state.user = {
        id: 0,
        name: "",
        email: "",
        password: "",
        lastName: "",
        rol: "",
      } as UserType;
    };

    const editar = (user: UserType) => {
      state.user = user;
    };

    return {
      state,
      camporequerido,
      Estadosform,
      roles,
      saveUser,
      reset,
      DeleteUser,
      show3,
      userUp,
      editar,
    };
  },
});
export default index;
</script>

<style lang="scss" scoped>
.app-table {
  background: #e8f9fe;
  border-radius: 10px;
  padding-bottom: 10px;
}

table {
  border-collapse: separate;
  border-spacing: 0 1em;
}

::v-deep {
  .v-data-table table {
    border-spacing: 0 0.5rem;
  }

  .v-data-table > .v-data-table__wrapper > table {
    width: 100%;
    -webkit-border-vertical-spacing: 10px;
  }

  .theme--light.v-expansion-panels .v-expansion-panel {
    background-color: transparent;
    color: rgba(0, 0, 0, 0.87);
  }

  .v-expansion-panel:before {
    border-radius: inherit;
    bottom: 0;
    content: "";
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    z-index: -1;
    transition: box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: none;
  }

  .v-expansion-panel-header {
    padding: 16px 13px;
  }

  .v-expansion-panel-content__wrap {
    padding: 0px;
    flex: 1 1 auto;
    max-width: 100%;
  }
}

.v-data-table > .v-data-table__wrapper > table {
  width: 100%;
  border-spacing: 10px;
}

.text1 {
  font-family: Montserrat;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 29px;
  letter-spacing: 0em;
  text-align: center;
}

.v-text-field.v-text-field--enclosed {
  margin-bottom: 10px;
  box-sizing: border-box;
  height: 68px;
  border-radius: 10px;
}
.text2 {
  font-family: Montserrat;
  font-size: 18px;
  color: #676161;
}

.app-table1 {
  border-top: separate;
  border-spacing: 0 1em;
}

table {
  border-collapse: separate;
  border-spacing: 0 1em;
}
</style>
