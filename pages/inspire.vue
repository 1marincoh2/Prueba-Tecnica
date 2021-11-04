<template>
  <v-row>
    <v-col class="text-center">
      <img
        src="/v.png"
        alt="Vuetify.js"
        class="mb-5"
      >
      {{compu}}
      <blockquote class="blockquote">
        &#8220;First, solve the problem. Then, write the code.&#8221;
        <footer>
          <small>
            <em>&mdash;John Johnson</em>
          </small>
        </footer>
      </blockquote>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import {computed, defineComponent,ref} from '@nuxtjs/composition-api'

const inspire = defineComponent({
 
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
export default inspire
</script>
