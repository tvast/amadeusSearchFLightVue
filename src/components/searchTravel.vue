<template src="./searchTravel.html"></template>

<style  src="./style.css"></style>

<script>
// import Form from "./Form.vue"
export default {
  name: 'Home',
  data: () => ({
    menuVisible: false,
    selectedCountryDeparture: null,
    countriesDeparture: [
        'MAD',
        'PAR',
        'SYD',
        'BKK',
       ],
       selectedCountryArrival: null,
    countriesArrival: [
        'MAD',
        'PAR',
        'SYD',
        'BKK',
       ],
      localhost: "https://shielded-depths-64980.herokuapp.com/",
      info:{},
  info2:{},
  info3:{},
  token:"",
  localhost3: "http://localhost:3000/token",
  localhost2: "http://localhost:3000/flight",
  selectedDateDeparture :"2020-02-01",
  selectedDateArrival : "2020-02-27",
  mojsOptions : {
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
          }
  }),
created() {

  
}, 

methods: {

  autocompleteCity(){
    window.console.log(this.selectedCountryDeparture+" "+this.selectedCountryArrival)
  },

letsFly() {
  this.info2="";
  let bodyDate = "departure="+
  this.selectedDateDeparture + 
  "&arrival="+
  this.selectedDateArrival+
  "&locationDeparture="+
  this.selectedCountryDeparture+
  "&locationArrival="+
  this.selectedCountryArrival;
  
  window.console.log(bodyDate);
 let vm = this
  async function postUrlEncoded() {
  // Default options are marked with *
  const response = await fetch(vm.localhost+"date?"+bodyDate, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      // 'Content-Type': 'application/json'   
      'Content-Type': 'application/x-www-form-urlencoded',
     },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
    body: bodyDate// body data type must match "Content-Type" header
  });
  return await response.json(); // parses JSON response into native JavaScript objects
}

postUrlEncoded().then((data) => {
    window.console.log(data);
    // this.info3=data // JSON data parsed by `response.json()` call
  });

async function flightSearch() {
  // Default options are marked with *
  const response = await fetch(vm.localhost+"flightSearch" );
  return await response.json(); // parses JSON response into native JavaScript objects
}
this.isLoading = true
flightSearch()
  .then((json) => {
   this.info2=json;
  this.toggleInfo=true;
  // this.isLoading = false // JSON data parsed by `response.json()` call
  });
},
}

        

}
</script>
  
