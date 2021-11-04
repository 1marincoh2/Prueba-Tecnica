<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="logo py-4 d-flex justify-center">
       </v-card>
      <v-card>
        <v-card-title class="headline">
         </v-card-title>
        <v-card-text>
          <div class="text-xs-right">
          
          </div>
          </v-card-text>
        <v-card-actions>
          
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import {computed, defineComponent,ref} from '@nuxtjs/composition-api'

const index = defineComponent({
 
   middleware:"authRedirect", 
  setup(prop,{root}) {
    const show3 = ref(false) 
   
   const compu = computed (()=>{
    
    return root.$store.state

   }) 
   
   
   
   return {
     show3,
     compu,

     }  

  }

})
export default index
</script>
