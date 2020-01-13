---
title: Vue JS app for amadeus API
date: 2020-01-07
---

Today we'll learn how to implement a front end app to interact with the amadeus self service travel API. 

Let's first initialize our environment. We need node js install to run this sample code you''ll find it here

## Set up

You need to install vue js cli 


```sh
npm install -g @vue/cli
# OR
yarn global add @vue/cli
```

Then create a boillerplate project : 

```sh
vue create awesome-travel-agency
```

```sh
cd awesome-travel-agency
```
Install depedencies
```sh
npm i
```
serve the project

```sh
npm run serve
```

## First component : search travel

The sample project provide you your first component HelloWorld.vue. CHange the name for the one you like.
BTW you'll need to read our lasta article about how to implement a node js back end to make this example working. you'll find it here

Change the script content for the next one:

```javascript
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
      localhost: "https://test.api.amadeus.com/v1/reference-data/locations?subType=AIRPORT,CITY&keyword=",
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
 
  async function postUrlEncoded() {
  // Default options are marked with *
  const response = await fetch("http://localhost:3000/date?"+bodyDate, {
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
  const response = await fetch("http://localhost:3000/flightSearch" );
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
```
Change the content of the template tag
```html

<div>
  <!-- form -->
  <main class ="content">
    <form class="form">
      <div class ="title">
        <h2>Book a Flight</h2>
        <p>Select locations and dates to get started.</p>
      </div>
      <div class="progress">
        <p>Step 1 of 3</p>
        <div class="progress-bar">
          <div class="bar-pink">
            <p>33%</p>
          </div>
        </div>
      </div>
      <div class ="categories">
      </div>
      <div class="row1">
        <div class="locations from-location1">
         <md-autocomplete @input="autocompleteCity" v-model="selectedCountryDeparture" :md-options="countriesDeparture">
          <label>Departure</label>
        </md-autocomplete>
      </div>
      <div class="locations to-location1">
        <md-autocomplete @input="autocompleteCity" v-model="selectedCountryArrival" :md-options="countriesArrival">
          <label>Arrival</label>
        </md-autocomplete>
      </div>
    </div>
    <div class="row2">
      <div class="dates depart">
        <label class="depart-date" for="depart">Departure:</label>
        <md-datepicker v-model="selectedDateDeparture" />
      </div>
      <div class="dates return">
        <label class="returning-date" for="return">Return:</label>
        <md-datepicker v-model="selectedDateArrival" />   
      </div>
    </div>
    <div class="">
      <p v-mojs="mojsOptions" class="next" @click="letsFly()" >Let's Fly!</p>
    </div>
  </form>
</main>
<div >
  <div class="row">
    <div v-for="(item,index) in info2" :key="index" class="col s4 autoflow">
      <div class="card blue-grey darken-1">
        <div class="card-content white-text">
          <template>
          	<span  v-for="(foo, index) in item.itineraries" :key="index" class="card-title"> 

          		<span v-for="bar in foo.segments">
          			{{bar.departure.iataCode}}--{{bar.arrival.iataCode}}
          		</span>
          	</span>
          </template>
          
          <p>Number of seat : {{item.numberOfBookableSeats}}-- Price :{{item.price.grandTotal}}</p>
        </div>
        <div class="card-action">
  </div>
</div>
</div>
</div>

</div>

</div>

```

What we are doing it here ? We need some explanations.

## First step

Data is our global object where we pass our properties. They are mutable and we initialize them with the desired value. For the instance of the dropdown we give the values of the country code that we want to implement.

Our methods object is a collection of function. To ask the amadeus api we need to agregate our value from the form in url encoded post. So the var bodyDate agregate the v-model propertie that we bind with the form.

We use asynchronous fetch to post our data. Then we call our asynchronous function. Easy peasy we populate our variable with an other async function which is just a get on the answer from the amadus search travel API

We can style our first component now
```css
  .content {
  max-width: 65%;
  max-height: 100%;
  margin: 75px auto;
  border-radius: 6px;
  background-color: #424242
}

.form {
  text-align: center;
}

.title {
  text-align: center;
  padding-top: 10px;
}

.progress {
  width: 80%;
  display: inline-block;
  text-align: center;
}

.progress-bar {
  background-color: #FEAFEB;
  margin-bottom: 20px;
  border-radius: 16px;
}

.bar-pink {
  height: 26px;
  width: 33%;
  background-color: #FF33CE;
  color: white;
  border-radius: 16px;
}

.categories {
  width: 100%;
  display: inline-block;
}

.button {
  background-color: #F3F3F3;
  width: 33.3%;
  border: none;
  color: #7E7E7E;
  font-size: 16px;
  font-weight: bold;
  padding: 15px;
}

button:hover {
  background-color: #FF33CE;
  color: white;
}

.Hotels {
  margin-left: -4px;
  margin-right: -4px;
}

.row1 {
  width: 100%;
  margin-top: 30px;
  font-size: 18px;
}

.locations {
  display: inline-block;
}

.from-location2 {
  color: #7E7E7E;
}

.from {
  -webkit-appearance: none;
  background-color: #F3F3F3;
  padding: 8px 20px;
  border: none;
}

.from-location1 {
  width: 45%;
}

.to-location1 {
  width: 45%;
}

.to-location2 {
  color: #7E7E7E;
}

.to {
  -webkit-appearance: none;
  background-color: #F3F3F3;
  padding: 8px 20px;
  border: none;
}

.row2 {
  width: 100%;
  margin-top: 30px;
  font-size: 18px;
}

.dates {
  display: inline-block;
  border: none;
}

.depart {
  width: 45%;
  color: #7E7E7E;
}

.departure-date {
  border: none;
  padding: 8px 8px;
  background-color: #F3F3F3;
}

.return {
  width: 45%;
  color: #7E7E7E;
}

.return-date {
  border: none;
  padding: 8px 8px;
  background-color: #F3F3F3;
}

.next-button {
  padding-top: 10px;
  padding-bottom: 10px;  
}

.next {
  display: block;
  width: 10%;
  margin: 20px auto 20px;
  padding: 10px 20px;
  font-size: 14px;
  background-color: #448aff;
  color: white;
  border: none;
  border-radius: 16px; 
}

.next:hover {
  background-color: #D52CAC;
}
```

## Second component : Search price           

We keep what we implemented above. ANd we extend it with some few HTML and function

For this other API endpoint we need to add a UI component to select an item from the flight search. A checkbox or a switch will done the job for us. 

the function watch to keep an eyes of our selected item

```javascript

watch:{
      selectedTravel(){
        // alert('checkbox changed');
        return window.console.log(this.selectedTravel);}
      },

```

Implement this in method object :
```javascript

getFLightPrice () {
 window.console.log(this.selectedTravel)
  
 var vm=this;
function isCherries(flight) { 
  return flight.id === vm.selectedTravel;
}
this.searchObject = this.info2.find(isCherries);

window.console.log(this.searchObject); 

this.info3="";

var request =  {"data": {
    "type": "flight-offers-pricing",
    "flightOffers": [this.searchObject]}}

  async function postSearchPrice() {
  // Default options are marked with *
  const response = await fetch("http://localhost:3000/flightprice", {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {'Content-Type': 'application/json'},
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(request)// body data type must match "Content-Type" header
  });
  return await response.json(); // parses JSON response into native JavaScript objects
}

postSearchPrice().then((data) => {
    window.console.log(data);
  if(data){
    fligthConfirmationGet()
  .then((json) => {
   window.console.log(json);
  this.info3=json;
  // this.isLoading = false // JSON data parsed by `response.json()` call
  });}

  else{this.info3="loading"
    // this.info3=data // JSON data parsed by `response.json()` call
  }
  });

   async function fligthConfirmationGet() {
  // Default options are marked with *
  const response = await fetch("http://localhost:3000/flightPriceget" );
  return await response.json(); // parses JSON response into native JavaScript objects
}
this.isLoading = true


},

```
Add this element to the item in the HTML
```html
<md-checkbox @click="getFLightPrice" v-model="selectedTravel" :value="item.id">{{item.id}}</md-checkbox>
``` 

And here we are we slect an item from the flight search API and we send it to the backend to confirm the price.

## Third component : create order 

Now that we got our price confirmation we can create our request to create an order and get the confirmation code of our travel.

We need to trigger a form with the passenger data to post it to the backend and receive our confirmation number 

```html
<form novalidate class="md-layout" @submit.prevent="validateUser">
      <md-card class="content form">
        <md-card-header>
          <div class="md-title">Users</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('firstName')">
                <label for="first-name">First Name</label>
                <md-input name="first-name" id="first-name" autocomplete="given-name" v-model="form.firstName" :disabled="sending" />
                <!-- <span class="md-error" v-if="form.firstName.required">The first name is required</span>
                <span class="md-error" v-else-if="form.firstName.minlength">Invalid first name</span> -->
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('lastName')">
                <label for="last-name">Last Name</label>
                <md-input name="last-name" id="last-name" autocomplete="family-name" v-model="form.lastName" :disabled="sending" />
         <!--        <span class="md-error" v-if="form.lastName.required">The last name is required</span>
                <span class="md-error" v-else-if="form.lastName.minlength">Invalid last name</span> -->
              </md-field>
            </div>
          </div>

          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('gender')">
                <label for="gender">Gender</label>
                <md-select name="gender" id="gender" v-model="form.gender" md-dense :disabled="sending">
                  <md-option></md-option>
                  <md-option value="M">M</md-option>
                  <md-option value="F">F</md-option>
                </md-select>
                <span class="md-error">The gender is required</span>
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('age')">
                <label for="age">Age</label>
                <md-input type="number" id="age" name="age" autocomplete="age" v-model="form.age" :disabled="sending" />
               <!--  <span class="md-error" v-if="form.age.required">The age is required</span>
                <span class="md-error" v-else-if="form.age.maxlength">Invalid age</span> -->
              </md-field>
            </div>
          </div>

          <md-field :class="getValidationClass('email')">
            <label for="email">Email</label>
            <md-input type="email" name="email" id="email" autocomplete="email" v-model="form.email" :disabled="sending" />
          <!--   <span class="md-error" v-if="form.email.required">The email is required</span>
            <span class="md-error" v-else-if="form.email.email">Invalid email</span> -->
          </md-field>
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <md-button v-mojs="mojsOptions" type="submit" class="md-primary" :disabled="sending">Create user</md-button>
        </md-card-actions>
      </md-card>

      <!-- <md-snackbar :md-active.sync="userSaved">The user {{ lastUser }} was saved with success!</md-snackbar> -->
    </form>
```
Then we need to pass the data to a function (don't forget to bind those new v-model values to the data object ).

```javascript
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
  const response = await fetch("http://localhost:3000/flightCreateOrder", {
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
  const response = await fetch("http://localhost:3000/flightcretaeorderget" );
  return await response.json(); // parses JSON response into native JavaScript objects
}
CreateOrder()
  .then((json) => {
     this.info3=json;
  this.toggleInfo2=true; // JSON data parsed by `response.json()` call
  });
},
```

We fill our data in the form with the same logic than above and here we got our confirmation number in the following curly bracket binding :

```html
  <template v-if="toggleInfo2">
          <div v-for="item in info3.data.associatedRecords">
            <h1 v-mojs="mojsOptions">{{item.reference}}</h1>
          </div>
        </template>
```

That's it enjoy this code repo and have fun playing with the amadeus self service travel API!