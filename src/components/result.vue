<template src="./result.html">
  
</template>
<style scoped lang="scss">


$blue: #3EA5EA;
$grey: #CACDDA;
$light-grey: #EEEEEE;
$white: grey;

.tix-container {
  background-color: $white;
  border-radius: 14px;
  box-shadow: 10px 10px 23px 0px rgba(0,0,0,0.3);
  display: flex;
  flex-direction: column;
  height: 250px;
  width: 600px;
}

.tix-upper {
  display: flex;
  flex: 1 1 auto;
  flex-direction: row;
  margin-top: 25px;
  overflow: hidden;
}

.tix-upper-left {
  display: flex;
  flex: 0 1 auto;
  flex-direction: column;
  left: -6px;
  position:relative;
}

.tix-date {
  color: $blue;
  font-size: 70px;
  font-weight: 600;
  letter-spacing: 2px;
  margin: 0px;
}

.tix-time-container {
  display: flex;
  flex-direction: row;
}

.tix-time {
  font-size: 30px;
  font-weight: 300;
  margin: 0px;
}

.tix-date-time {
  color: $grey;
  font-size: 12px;
  margin: 0px;
  margin-left: auto;
}

.tix-upper-middle {
  flex: 1 1 auto;
  margin-left: 6px;
}

.tix-to-from-small {
  color: $grey;
  font-size: 12px;
  margin: 0px;
}

.tix-to-from-large {
  font-size: 40px;
  margin: 0px;
}

.tix-upper-right {

}

.tix-plane {
  color: $light-grey;
  font-size: 60px;
  margin-right: 20px;
  margin-top: 4px;
}

.tix-lower {
  background-image: url('http://www.swissarmylibrarian.net/wp-content/uploads/2011/02/barcodelunch.png');
  background-position: 0 -12px;
  background-size: auto 110px;
  border-radius: 0px 0px 30px 14px;
  box-shadow: inset 0px 67px 16px -64px rgba(0,0,0,1);
  color: $white;
  height: 80px;
  width: 100%;  
}

.tix-lower-overlay {
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 0px 0px 30px 14px;
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
}

.tix-lower-info-container {
  border-radius: 0px 0px 20px 0px;
  display: flex;
  flex-direction: row;
  margin-left: auto;
}

.tix-lower-triangle {
  border-style: solid;
  border-width: 0 50px 80px 0;
  border-color: transparent $blue transparent transparent;
  display: inline-block;
  height: 0;
  width: 0;
}

.tix-lower-triangle::before {
  background-color: transparent;
  box-shadow: -10px 20px 30px -2px rgba(0,0,0,0.1);
  content: '';
  position: absolute;
  height: 80px;
  width: 50px;
  transform: skewX(33deg);
  margin-left: 24px;
}

.tix-lower-triangle-blue-background {
  background-color: $blue;
}

.tix-lower-container {
  background-color: $blue;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
}

.tix-lower-title {
  font-size: 12px;
  margin: 0px;
}

.tix-lower-number {
  font-size: 26px;
  font-weight: 300;
  margin: 0px;
}

.tix-gate-container {
  
}

.tix-flight-container {
  
}

.tix-seat-container {
  border-radius: 0px 0px 14px 0px;
}</style>
<script>
// import { store } from './store/store'
import {BadgerAccordion, BadgerAccordionItem} from 'vue-badger-accordion'
  /* eslint-disable no-mixed-spaces-and-tabs */
export default {
data: function(){
    return {
      MojsOptions : {
            count : 6,
            radius: { 15: 100 },
            origin: '100% 100%',
            degree: 360,
            children: {
              shape: 'polygon',
              fill: ['blue','white'],
              isSwirl:true,
              swirlSize: 10,
              swirlFrequency: 2,
              delay: 'stagger(0, 30)'
            }
          },
    }
  },
  name: 'app',
  menuVisible: false,
  components: {
        BadgerAccordion,
        BadgerAccordionItem,
    },
  created :{

 	
  },
  methods: {

  

  }
}
</script>

<style>

</style>