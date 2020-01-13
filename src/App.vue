<template src="./appHome.html">
  
</template>
<script>
import searchTravel from './components/searchTravel.vue'
import Loader from './components/loader.vue'

  /* eslint-disable no-mixed-spaces-and-tabs */
export default {
data: function(){
    return {
      showLoader : false,
    }
  },
  name: 'app',
  menuVisible: false,
  components: {
    searchTravel,
    Loader,
     isLoading: false,
  },
  created :{

 	
  },
  methods: {

  

  }
}
</script>

<style>
.md-app-content {min-height :1280px}

</style>
