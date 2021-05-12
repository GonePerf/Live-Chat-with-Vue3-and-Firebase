<template>
  <div class="container">
      <Navbar />
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { watch } from 'vue'
import Navbar from '../components/Navbar.vue'
import getUser from '../composables/getUser'

export default {
    components: { Navbar },
    setup() {
      const router = useRouter()
      const { user } = getUser()
      
      watch(user, () =>{
        if (!user.value){
          router.push({ name: 'Welcome' })
        }
      })
      
    }
}
</script>

<style>

</style>