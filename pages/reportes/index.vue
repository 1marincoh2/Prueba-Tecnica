<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="12" md="12" lg="12" xl="12">
      <v-card
        elevation="2"
        class="pa-4 justify-center mx-auto"
        rounded="lg"
        style="border-radius: 10px"
      >
        <h1 class="text-title d-flex justify-center">Reportes</h1>
        <v-expansion-panels focusable>
          <v-subheader class="text1">PROGRAMA</v-subheader>
          <v-subheader class="text1" style="margin-left: 100px"
            >TOTAL DE INSCRITOS</v-subheader
          >
          <v-spacer></v-spacer><v-subheader class="text1">DETALLE</v-subheader>
          <v-expansion-panel
            v-for="items in state.studens"
            :key="items.program"
          >
            <v-expansion-panel-header disable-icon-rotate
              ><h2 class="text-panel">{{ items.program }}</h2>
              <h2 class="text-panel" style="margin-right: 570px">
                {{ items.inscribed }}
              </h2></v-expansion-panel-header
            >

            <v-expansion-panel-content>
              <p class="text-left text1" style="margin-left: 30px">ALUMNO</p>
              <p class="text2">FECHA DE INSCRIPCION</p>
              <v-simple-table>
                <tbody>
                  <tr
                    class="app-table mb-1 mt-1"
                    v-for="child in items.students"
                    :key="child.name"
                  >
                    <td style="width: 82%" class="text-xs-left">
                      {{ child.name }}
                    </td>
                    <td class="text-xs-left">{{ child.dates }}</td>
                  </tr>
                </tbody>
              </v-simple-table>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import {
  defineComponent,
  onMounted,
  reactive,
  computed,
} from "@nuxtjs/composition-api";
import { ReportService } from "~/common/report.service";
import { ReporType } from "~/type/report.model";

interface State {
  studens: ReporType[];
  studen: ReporType;
}

const index = defineComponent({
  middleware: "authRedirect",

  setup(prop, { root }) {
    const state = reactive<State>({
      studens: [],
      studen: {
        students: [{ name: "", dates: 0 }],
        program: "",
        inscribed: 0,
      } as ReporType,
    });

    const compu = computed(() => {
      return root.$store.state;
    });
    onMounted(() => {
      compu;
      getStudens();
    });

    const getStudens = async () => {
      try {
        const serviceUse = new ReportService();
        const response = await serviceUse.StudensGet();
        // console.log(response.reportes, "hola desde reportes");
        state.studens = response.reportes;
      } catch (e) {}
    };
    return {
      state,
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
    table-layout: auto;
    width: 100%;
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
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  text-transform: uppercase;
  color: #828282;
}
.text2 {
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  text-transform: uppercase;
  color: #828282;
  margin-top: -55px;
  margin-left: 830px;
}

.text-title {
  font-family: Montserrat;
  font-size: 46px;
  font-style: normal;
  font-weight: 700;
  line-height: 59px;
  letter-spacing: 0em;
  text-align: center;
}
.text-panel {
  font-family: Montserrat;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: 0em;
  text-align: left;
}
</style>
