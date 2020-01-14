<template src="./createOrder.html"></template>


<style  src="./style.css"></style>

<script>
// import { VueContentLoading,VclFacebook, VclInstagram } from 'vue-content-loading';

// Import component
    import Loading from 'vue-loading-overlay';
    // Import stylesheet
    import 'vue-loading-overlay/dist/vue-loading.css';
// import { validationMixin } from 'vuelidate'
  import {
    required,
    email,
    minLength,
    maxLength
  } from 'vuelidate/lib/validators'
// import Form from "./Form.vue"

import {BadgerAccordion, BadgerAccordionItem} from 'vue-badger-accordion'
export default {
  name: 'searchPrice',
  data: () => ({
  toggleInfo:false,
  toggleInfo2:false,
  isLoading: false,
    isOpen: true,
  fullPage: true,  components: {
        BadgerAccordion,
        BadgerAccordionItem,
        Loading
    },

  form: {
  firstName: "theo",
  lastName: "vast",
  gender: null,
  age: null,
  email: "abc@gmail.com",},
  userSaved: false,
  sending: false,
  lastUser: null,
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
  localhost: "http://localhost:3000/",
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
				return window.console.log(this.selectedTravel);}
			},

methods: {

	autocompleteCity(){
		window.console.log(this.selectedCountryDeparture+" "+this.selectedCountryArrival)
	},  getValidationClass (fieldName) {
		const field = this.form[fieldName]

		if (field) {
			return {
				'md-invalid': field.$invalid && field.$dirty
			}
		}
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
    validateUser () {
    //get info from flight
     window.console.log(this.selectedTravel)
	

	var vm=this;
	function isCherries(flight) { 
	return flight.id === vm.selectedTravel;
	}
	this.searchObject = this.info2.find(isCherries);
	window.console.log(this.searchObject);
    //get user info

    //generate request
    var requestCreateOrder={
  "data": {
    "type": "flight-order",
    "flightOffers": [this.searchObject],
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

async function postBody() {
  // Default options are marked with *
  const response = await fetch(vm.localhost+"flightCreateOrder", {
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
  const response = await fetch(vm.localhost+"flightcretaeorderget" );
  return await response.json(); // parses JSON response into native JavaScript objects
}
CreateOrder()
  .then((json) => {
     this.info3=json;
  this.toggleInfo2=true;
  // this.isLoading = false   // JSON data parsed by `response.json()` call
  })
},

  letsFly() {
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

flightSearch()
  .then((json) => {
   this.info2=json;
   window.console.log(json)
  this.toggleInfo=true;
  // this.isLoading = false
  // this.isLoading = false // JSON data parsed by `response.json()` call
  }).catch(function(error) {
  window.console.error(error);
});
},

getFLightPrice () {
 window.console.log(this.selectedTravel)
	
 var vm=this;
function isCherries(flight) { 
  return flight.id === vm.selectedTravel;
}
this.searchObject = this.info2.find(isCherries);

window.console.log(this.searchObject); 

this.info3="";

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
    body: JSON.stringify(this.searchObject)// body data type must match "Content-Type" header
  });
  return await response.json(); // parses JSON response into native JavaScript objects
}

postSearchPrice().then((data) => {
    window.console.log(data);
    async function fligthConfirmationGet() {
  // Default options are marked with *
  const response = await fetch(vm.localhost+"flightPriceget" );
  return await response.json(); // parses JSON response into native JavaScript objects
}
this.isLoading = true
fligthConfirmationGet()
  .then((json) => {
   window.console.log(json);
  this.info3=json;
  // this.isLoading = false // JSON data parsed by `response.json()` call
  });
    // this.info3=data // JSON data parsed by `response.json()` call
  });

},
}


        

}
</script>
  
