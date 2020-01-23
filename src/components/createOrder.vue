<template src="./createOrder.html"></template>


<style lang="scss" src="./style.scss"></style>

<script>
import Swal from 'sweetalert2/dist/sweetalert2.js'

import 'sweetalert2/src/sweetalert2.scss'
  import {
    required,
    email,
    minLength,
    maxLength
  } from 'vuelidate/lib/validators'
import {BadgerAccordion, BadgerAccordionItem} from 'vue-badger-accordion'
// import { store } from '../store.js';
import router from '../router.js'
export default {
  name: 'searchPrice',
  data: () => ({
  toggleInfo:false,
  toggleInfo2:false,
  isLoading: false,
    isOpen: true,
  fullPage: true,
  flightConfirmation :"",
  true:true,  
  vm:this,
  components: {
        BadgerAccordion,
        BadgerAccordionItem,
    },

  form: {
  firstName: "theo",
  lastName: "vast",
  isModalVisible: false,
  gender: null,
  age: null,
  email: "abc@gmail.com",},
  userSaved: false,
  sending: false,
  lastUser: null,
  menuVisible: false,
  selectedCountryDeparture: "",
  // countryList: [
  //       {
  //         id: 1,
  //         name: 'Algeria'
  //       },
  //       {
  //         id: 2,
  //         name: 'Argentina'
  //       },
  //       {
  //         id: 3,
  //         name: 'Brazil'
  //       },
  //       {
  //         id: 4,
  //         name: 'Canada'
  //       },
  //       {
  //         id: 5,
  //         name: 'Italy'
  //       },
  //       {
  //         id: 6,
  //         name: 'Japan'
  //       },
  //       {
  //         id: 7,
  //         name: 'United Kingdom'
  //       },
  //       {
  //         id: 8,
  //         name: 'United States'
  //       }
  //     ],
      countries: [],
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
          },
          selectedTravel:{},
          searchObject:""
  }),
  validations: {
      form: {
        firstName: {
          required,
          minLength: minLength(3)
        },
        lastName: {
          required,
          minLength: minLength(3)
        },
        age: {
          required,
          maxLength: maxLength(3)
        },
        gender: {
          required
        },
        email: {
          required,
          email
        }}},
computed: {
        accordionClasses: function() {
            return {
                'is-closed': !this.isOpen,
                'is-primary': this.isOpen,
                'is-dark': !this.isOpen
            };
        }
    },

watch:{
			selectedTravel(){
				// alert('checkbox changed');
				return window.console.log(this.selectedTravel);},
      
			},

methods: {

	autocompleteCity(){
		window.console.log(this.selectedCountryDeparture+" "+this.selectedCountryArrival)
	},getSeletedItem(){
    this.selectedCountryDeparture = this.selectedCountryDeparture.iataCode
  },
  getSeletedItem2(){
    this.selectedCountryArrival = this.selectedCountryArrival.iataCode
  },
  getCountriesDeparture (searchTerm) {
        this.countries = new Promise(resolve => {
          window.setTimeout(() => {
            if (!searchTerm) {
              resolve(this.countryList)
            } else {
              const term = searchTerm.toLowerCase()

              resolve(this.countryList.filter(({ name }) => name.toLowerCase().includes(term)))
            }
          }, 500)
        })
      },getCountriesDeparture2 (searchTerm2) {
        this.countries = new Promise(resolve => {
          window.setTimeout(() => {
            if (!searchTerm2) {
              resolve(this.countryList)
            } else {
              const term = searchTerm2.toLowerCase()

              resolve(this.countryList.filter(({ name }) => name.toLowerCase().includes(term)))
            }
          }, 500)
        })
      },searchCity() {
          this.showLoader(true)
    var vm =this;
  var urlSend= "keyword="+this.selectedCountryDeparture
  
  window.console.log(urlSend);
 
  async function postUrlEncoded() {
  // Default options are marked with *
 
  const response = await fetch("https://shielded-depths-64980.herokuapp.com/citySearch?", {
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
    body: urlSend// body data type must match "Content-Type" header
  });
   // this.isLoading = true
  return await response.json(); // parses JSON response into native JavaScript objects
}

postUrlEncoded().then((data) => {
    window.console.log(data);
    // this.info3=data // JSON data parsed by `response.json()` call
  });
async function departureGet() {

  // Default options are marked with *
  const response = await fetch(vm.localhost+"departureGet" );
  // vm.isLoading = true
  return await response.json(); // parses JSON response into native JavaScript objects
}

setTimeout(() => departureGet()
  .then((json) => {
    this.countryList=json.data;
    this.$store.commit('dataCitySearchMute', json.data)
   // this.info2=json;
   window.console.log(json.data)
  // this.toggleInfo=true;
  this.showLoader(false)
  // this.isLoading = false
  // this.isLoading = false // JSON data parsed by `response.json()` call
  }).catch(function(error) {
    Swal.fire({
  title: 'Error!',
  text: 'Do you want to continue'+error,
  icon: 'error',
  confirmButtonText: 'Cool'
})
  window.console.error(error);
}), 500); 
      },searchCity2() {
          this.showLoader(true)
    var vm =this;
  var urlSend= "keyword="+this.selectedCountryArrival
  
  window.console.log(urlSend);
 
  async function postUrlEncoded() {
  // Default options are marked with *
 
  const response = await fetch("https://shielded-depths-64980.herokuapp.com/citySearch?", {
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
    body: urlSend// body data type must match "Content-Type" header
  });
   // this.isLoading = true
  return await response.json(); // parses JSON response into native JavaScript objects
}

postUrlEncoded().then((data) => {
    window.console.log(data);
    // this.info3=data // JSON data parsed by `response.json()` call
  });
async function departureGet() {

  // Default options are marked with *
  const response = await fetch(vm.localhost+"departureGet" );
  // vm.isLoading = true
  return await response.json(); // parses JSON response into native JavaScript objects
}

setTimeout(() => departureGet()
  .then((json) => {
    this.countryList=json.data;
    this.$store.commit('dataCitySearchArrival', json.data)
   // this.info2=json;
   window.console.log(json.data)
  // this.toggleInfo=true;
  this.showLoader(false)
  // this.isLoading = false
  // this.isLoading = false // JSON data parsed by `response.json()` call
  }).catch(function(error) {
    Swal.fire({
  title: 'Error!',
  text: 'Do you want to continue'+error,
  icon: 'error',
  confirmButtonText: 'Cool'
})
  window.console.error(error);
}), 500); 
      },changed: function(event) {
      this.$store.commit('change', event.target.value)
    },  getValidationClass (fieldName) {
		const field = this.form[fieldName]

		if (field) {
			return {
				'md-invalid': field.$invalid && field.$dirty
			}
		}
	},   show () {

    Swal.fire({
  title: "Insert your email",
  text: 'hello@something.com',
  input: 'text',
  showCancelButton: true,
  closeOnConfirm: false,
  preConfirm: (inputValue) => {
   var vm=this 
    vm.getFLightPrice(inputValue);
  },
  });
    // this.$modal.show('hello-world');
//     Swal.fire({
//   title: 'Submit your Github username',
//   html: "<form @submit.prevent='validateUser'><input placeholder='Name' v-model='form.firstName' type='text'><input placeholder='Last name' v-model='form.lastName' type='text'><input placeholder='Email' v-model='form.email' type='email'><md-button v-mojs='mojsOptions' @click='getFLightPrice()' class='md-primary'>Confirm order</md-button></form>",
//   inputAttributes: {
//     autocapitalize: 'off'
//   },
//   showCancelButton: true,
//   confirmButtonText: 'Look up',
//   showLoaderOnConfirm: true,
//   preConfirm: () => {
//     this.validateuser()
//   },
//   // allowOutsideClick: () => !Swal.isLoading()s
// }).then((result) => {
//   if (result.value) {
//     Swal.fire({
//       title: `${result.value.login}'s avatar`,
//       imageUrl: result.value.avatar_url
//     })
//   }
// })
  },
  hide () {
    this.$modal.hide('hello-world');
  },
	clearForm () {
		this.$v.$reset()
		this.form.firstName = null
		this.form.lastName = null
		this.form.age = null
		this.form.gender = null
		this.form.email = null
	},

    toggleAccordion: function() {
            this.isOpen = !this.isOpen;
        },
	// saveUser () {
	// 	this.sending = true

 //        // Instead of this timeout, here you can call your API
 //        window.setTimeout(() => {
 //        this.lastUser = `${this.form.firstName} ${this.form.lastName}`
 //        this.userSaved = true
 //        this.sending = false
 //        this.clearForm()
 //        }, 1500)
 //    },
 getFLightPrice () {
 // window.console.log(this.selectedTravel)
  
 var vm=this;
function isCherries(flight) { 
  return flight.id === vm.selectedTravel;
}
this.searchObject = this.info2.find(isCherries);
this.$store.commit('changePricing', this.searchObject);
window.console.log(this.searchObject); 

// this.info3="";
  // var duh=this;\

  var duh=   {
    "data": {
        "type": "flight-offers-pricing",
        "flightOffers": [this.searchObject]
  }};
  async function postSearchPrice() {
  // Default options are marked with *
  
  const response = await fetch(vm.localhost+"flightprice", {


    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {'Content-Type': 'application/json'},
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(duh)// body data type must match "Content-Type" header
  });
  return await response.json(); // parses JSON response into native JavaScript objects
}

postSearchPrice().then((data) => {
    window.console.log(data);
    async function fligthConfirmationGet() {
  // Default options are marked with *
  const response = await fetch(vm.localhost+"flightPriceget" );
  return await response.json();
  //this.$store.commit('changePricing', response); // parses JSON response into native JavaScript objects
}
this.isLoading = true
fligthConfirmationGet()
  .then((json) => {
   window.console.log(json);
   this.flightConfirmation = "PriceConfirmed";
  this.info3=json;
  // this.$store.commit('changePricing', json.data.flightOffers);
  this.isLoading = false
  this.validateUser ()
  // this.isLoading = false // JSON data parsed by `response.json()` call
  });
    // this.info3=data // JSON data parsed by `response.json()` call
  });

},
    validateUser () {
      this.showLoader(true)
      //  store.commit('increment')
    //get info from flight
     window.console.log(this.selectedTravel)
	

	var vm=this;
	function isCherries(flight) { 
	return flight.id === vm.selectedTravel;
	}
	this.searchObject = this.info2.find(isCherries);
	window.console.log(this.searchObject);

  // this.getFLightPrice()
    // this.info3=data // JSON data parsed by `response.json()` call
 
    //get user info

    //generate request
    var requestCreateOrder={
  "data": {
    "type": "flight-order",
    "flightOffers": [this.$store.getters.pricing],
    "travelers": [
      {
        "id": "1",
        "dateOfBirth": "1982-01-16",
        "name": {
          "firstName": this.form.firstName,
          "lastName": this.form.lastName
        },
        "gender": "MALE",
        "contact": {
          "emailAddress": this.form.email ,
          "phones": [
            {
              "deviceType": "MOBILE",
              "countryCallingCode": "33",
              "number": "0665735114"
            }
          ]
        },
        "documents": [
          {
            "documentType": "PASSPORT",
            "birthPlace": "Madrid",
            "issuanceLocation": "Madrid",
            "issuanceDate": "2015-04-14",
            "number": "00000000",
            "expiryDate": "2025-04-14",
            "issuanceCountry": "ES",
            "validityCountry": "ES",
            "nationality": "ES",
            "holder": true
          }
        ]
      },
      
    ],
    "remarks": {
      "general": [
        {
          "subType": "GENERAL_MISCELLANEOUS",
          "text": "ONLINE BOOKING FROM INCREIBLE VIAJES"
        }
      ]
    },
    "ticketingAgreement": {
      "option": "DELAY_TO_CANCEL",
      "delay": "6D"
    },
    "contacts": [
      {
        "addresseeName": {
          "firstName": "PABLO",
          "lastName": "RODRIGUEZ"
        },
        "companyName": "INCREIBLE VIAJES",
        "purpose": "STANDARD",
        "phones": [
          {
            "deviceType": "LANDLINE",
            "countryCallingCode": "34",
            "number": "480080071"
          },
          {
            "deviceType": "MOBILE",
            "countryCallingCode": "33",
            "number": "480080072"
          }
        ],
        "emailAddress": "support@increibleviajes.es",
        "address": {
          "lines": [
            "Calle Prado, 16"
          ],
          "postalCode": "28014",
          "cityName": "Madrid",
          "countryCode": "ES"
        }
      }
    ]
  }
}

this.showLoader(true)

async function postBody() {
  // Default options are marked with *
  // const foo=this;
  const response = await fetch("https://shielded-depths-64980.herokuapp.com/"+"flightCreateOrder", {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {'Content-Type': 'application/json'},
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(requestCreateOrder)// body data type must match "Content-Type" header
  });
  return await response.json(); // parses JSON response into native JavaScript objects
}

postBody().then((data) => {
    window.console.log(data);
    this.info3=data // JSON data parsed by `response.json()` call
  });

async function CreateOrder() {
  // Default options are marked with *
  // this.isLoading = true
  // const bar=this;
  const response = await fetch("https://shielded-depths-64980.herokuapp.com/"+"flightcretaeorderget" );
  return await response.json(); // parses JSON response into native JavaScript objects
}

setTimeout(() => CreateOrder()
  .then((json) => {
     this.info3=json;
     window.console.log(json)
     this.$store.commit('change', json)
     router.push('result')
     this.showLoader(false)

         Swal.fire({
  title: '<strong>Congratulation <u>your flight is confirmed</u></strong>',
  icon: 'info',
  html:
    'You can use your confirmation number, ' +
    // '<a href="//sweetalert2.github.io">links</a> ' +
    'and enjoy your trip !',
  showCloseButton: true,
  showCancelButton: true,
  focusConfirm: false,
  confirmButtonText:
    '<i class="fa fa-thumbs-up"></i> Great!',
  confirmButtonAriaLabel: 'Thumbs up, great!',
  cancelButtonText:
    '<i class="fa fa-thumbs-down"></i>',
  cancelButtonAriaLabel: 'Thumbs down'
})

  // this.toggleInfo2=true;
  // this.isLoading = false   // JSON data parsed by `response.json()` call
  }).catch(function(error){
    Swal.fire({
  title: 'Error!',
  text: 'Do you want to continue'+error,
  icon: 'error',
  confirmButtonText: 'Cool'
})
  }), 4000);


// CreateOrder()
//   .then((json) => {
//      this.info3=json;
//      this.$store.commit('change', json)
//      router.push('result')
//      this.showLoader(false)
//   // this.toggleInfo2=true;
//   // this.isLoading = false   // JSON data parsed by `response.json()` call
//   })
},

  letsFly() {
    this.showLoader(true)
    var vm =this;
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
   // this.isLoading = true
  return await response.json(); // parses JSON response into native JavaScript objects
}
// this.showLoader(false)
postUrlEncoded().then((data) => {
    window.console.log(data);
    // this.info3=data // JSON data parsed by `response.json()` call
  });
async function flightSearch() {

  // Default options are marked with *
  const response = await fetch(vm.localhost+"flightSearch" );
  // vm.isLoading = true
  return await response.json(); // parses JSON response into native JavaScript objects
}

setTimeout(() => flightSearch()
  .then((json) => {
   this.info2=json.data;
   window.console.log(json)
  this.toggleInfo=true;
  this.showLoader(false)

if(json.data.length < 2){
Swal.fire({
  icon: 'error',
  title: 'Oops...',
  text: 'Something went wrong!',
  footer: '<a href>Why do I have this issue?</a>'
})
}

else {
  Swal.fire({
  title: 'Wonderfull we find 50 travel matching your ressearch',
  icon: 'info',
  html:
    'Choose one to confirm your price',
    // '<a href="//sweetalert2.github.io">links</a> ' +
    // 'and other HTML tags',
  showCloseButton: true,
  showCancelButton: true,
  focusConfirm: false,
  confirmButtonText:
    '<i class="fa fa-thumbs-up"></i> Great!',
  confirmButtonAriaLabel: 'Thumbs up, great!',
  cancelButtonText:
    '<i class="fa fa-thumbs-down"></i>',
  cancelButtonAriaLabel: 'Thumbs down'
})
}


  // this.isLoading = false
  // this.isLoading = false // JSON data parsed by `response.json()` call
  }).catch(function(error) {
  window.console.error(error);
  Swal.fire({
  icon: 'error',
  title: 'Oops...',
  text: 'Something went wrong!',
  footer: '<a href>Why do I have this issue?</a>'
})
}), 8000);


}
}


        

}
</script>
  
