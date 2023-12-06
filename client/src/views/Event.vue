<script>
import HeaderBar from '@/components/HeaderBar'
import { StripeCheckout } from '@vue-stripe/vue-stripe'
import { Api } from '@/Api'

export default {
  name: 'Event',
  data() {
    // We'll replace it with an env variable later
    this.publishableKey = 'pk_test_51NvnEZIeSorUA2wFzBWTeShkIWHsjqH2DCdIfap6d0YNtG6DNdTZOZHaoDpuV8KtNjD5JWnZvGZIJRTWnAaHI2Nh00MYxPsY4Z'
    return {
      eventInfo: '',
      ticketInfo: '',
      venueInfo: '',
      loading: false,
      priceId: 'price_1NvnpJIeSorUA2wF8Yi0b7GW',
      lineItems: [
      ],
      successURL: 'http://localhost:8080/Success',
      cancelURL: 'http://localhost:8080/Failure'
    }
  },
  methods: {
    submit() {
      this.$refs.checkoutRef.redirectToCheckout()
    },
    async getEvent() {
      Api.get('/v1/events/' + this.id)
        .then(response => {
          const eventInfo = response.data
          this.eventInfo = eventInfo
          this.getVenue()
          this.getTicketData()
          return this.eventInfo
        }).catch(error => {
          console.log(error)
        })
    },
    async getVenue() {
      Api.get('/v1/venues/' + this.eventInfo.venue)
        .then(response => {
          const venue = response.data
          this.venueInfo = venue
          return this.venueName
        }).catch(err => {
          console.log(err)
        })
    },
    async getTicketData() {
      Api.get('/v1/events/' + this.id + '/tickets')
        .then(response => {
          const tickets = response.data
          this.ticketInfo = tickets[0]
          this.lineItems.push({ price: tickets[0].priceId, quantity: 1 })
          this.successURL = 'http://localhost:8080/Success/' + tickets[0].id
          console.log(this.lineItems)
          return this.ticketInfo
        }).catch(err => {
          console.log(err)
        })
    }
  },
  created() {
    this.getEvent()
  },
  components: {
    StripeCheckout,
    HeaderBar
  },
  props: {
    id: String
  }
}
</script>

<template>
<div>
    <img class="home-background" src="./..\assets\LightViolet.png">
    <HeaderBar></HeaderBar>
    <img src="https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?cs=srgb&dl=pexels-wolfgang-2747449.jpg&fm=jpg" alt="Event cover image" id="event-photo">
    <div id="details-wrapper">
      <div id="title-wrapper">
        <span id="event-name">{{ eventInfo.name }}</span>
        <p id="description">{{ eventInfo.description }}</p>
        <div>
          <stripe-checkout
            ref="checkoutRef"
            mode="payment"
            :pk="publishableKey"
            :line-items="lineItems"
            :success-url="successURL"
            :cancel-url="cancelURL"
            @loading="v => loading = v"
          />
        </div>
<<<<<<< HEAD
      </div>
      <div id="fact-box">
        <h2 style="text-align: center; margin: 10px 0;">{{ venueInfo.name }}, {{venueInfo.location}}</h2>
        <div class="fact-line">
          <h3>Date:</h3>
          <h3>{{ eventInfo.date.substring(0, 10) }}</h3>
=======
        <div id="fact-box">
            <h2 style="text-align: center; margin: 10px 0;">{{ venueInfo.name }}, {{venueInfo.location}}</h2>
            <div class="fact-line">
                <h3>Date</h3>
                <h3 v-if="eventInfo !== ''">{{ eventInfo.date.substring(0, 10) }}</h3>
                <h3 v-else> N/A </h3>
            </div>
            <div class="fact-line">
                <h3>Time</h3>
                <h3 v-if="eventInfo !== ''">{{ new Date(eventInfo.date).toTimeString().split(' ')[0].substring(0, 5) }}</h3>
                <h3 v-else> N/A </h3>
            </div>
            <div class="fact-line">
                <h3>Ages</h3>
                <h3 v-if="eventInfo.ageLimit !== undefined">{{ eventInfo.ageLimit }}+</h3>
                <h3 v-else> Anyone </h3>
            </div>
            <div class="fact-line">
                <h3>Price</h3>
                <h3 v-if="ticketInfo.price === undefined"> Sold out! </h3>
                <h3 v-else-if="ticketInfo.quantity !== 0">{{ ticketInfo.price }}kr</h3>
                <h3 v-else> Sold out! </h3>
            </div>
            <b-button disabled variant="primary" id="tickets-button" v-if="ticketInfo.price === undefined">Sold out!</b-button>
            <b-button variant="primary" id="tickets-button" v-on:click="submit" v-else>Tickets</b-button>
>>>>>>> master
        </div>
        <div class="fact-line">
          <h3>Time:</h3>
          <h3>{{ eventInfo.date.substring(11, 16) }}</h3>
        </div>
        <div class="fact-line">
          <h3>Ages:</h3>
          <h3 v-if="eventInfo.ageLimit !== undefined">{{ eventInfo.ageLimit }}+</h3>
          <h3 v-else> Anyone </h3>
        </div>
        <div class="fact-line">
          <h3>Price:</h3>
          <h3 v-if="ticketInfo.price === undefined"> Sold out! </h3>
          <h3 v-else-if="ticketInfo.quantity !== 0">{{ ticketInfo.price }}kr</h3>
          <h3 v-else> Sold out! </h3>
        </div>
        <b-button variant="primary" id="tickets-button" v-on:click="submit">Tickets</b-button>
      </div>
    </div>
    <div id="mobile-wrapper">
      <div style="display: flex">
        <b-card
          v-bind:header=eventInfo.name
          :header-tag="'h1'"
          style="width: 20rem;"
          id="card"
          class="text-left"
        >
          <div class="card-content">
            <b-card-text>
              <div id="mobile-description">
                <h4>{{ eventInfo.description }}</h4>
              </div>
              <div id="mobile-fact-box">
                <div class="fact-line">
                  <h4>Venue:</h4>
                  <h4>{{ venueInfo.name }}</h4>
                </div>
                <div class="fact-line">
                  <h4>Location:</h4>
                  <h4>{{ venueInfo.location }}</h4>
                </div>
                <div class="fact-line">
                  <h4>Date:</h4>
                  <h4>{{ eventInfo.date.substring(0, 10) }}</h4>
                </div>
                <div class="fact-line">
                  <h4>Time:</h4>
                  <h4>{{ eventInfo.date.substring(11, 16) }}</h4>
                </div>
                <div class="fact-line">
                  <h4>Ages:</h4>
                  <h4 v-if="eventInfo.ageLimit !== undefined">{{ eventInfo.ageLimit }}+</h4>
                  <h4 v-else> Anyone </h4>
                </div>
                <div class="fact-line">
                  <h4>Price:</h4>
                  <h4 v-if="ticketInfo.price === undefined"> Sold out! </h4>
                  <h4 v-else-if="ticketInfo.quantity !== 0">{{ ticketInfo.price }}kr</h4>
                  <h4 v-else> Sold out! </h4>
                </div>
              </div>
            </b-card-text>
          </div>
          <template #footer>
            <div class="button-container">
              <b-button variant="primary" id="tickets-button" v-on:click="submit">Tickets</b-button>
            </div>
          </template>
        </b-card>
      </div>
    </div>
</div>
</template>

<style>

@media only screen and (max-width: 640px) {
  #details-wrapper {
    display: none;
  }
  #event-photo {
    display: none;
  }
  #title-wrapper {
    display: none;
  }
  #fact-box {
    display: none;
  }
  #event-name {
    display:none;
  }
  #description {
    display: none;
  }
}
@media only screen and (min-width: 768px) {
  #mobile-wrapper #card{
    display: none;
  }
}

[class="home-background"] {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  object-fit: cover;
  z-index: -1;
}

/* .home-background {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  object-fit: cover;
  z-index: -1;
} */

#event-photo{
    width: 100%;
    height: 400px;
    object-fit: cover;
    box-shadow: 0px 0px 8px 2px #000000;
}

#title-wrapper{
    width: 600px;
    display: flex;
    flex-direction: column;
    align-items: left;
    flex-wrap: wrap;
}

#event-name{
  font-size: 40px;
  margin-bottom: 0;
}
#description{
  font-size: 25px;
}
#mobile-description{
  margin-bottom: 1.5rem;
}
#mobile-wrapper{
  display: flex;
  justify-content: center;
}
#card h1 {
  font-size: 25px;
  text-align: left;
}
#details-wrapper{
    padding: 30px 20px;
    width: 100dvw;
    display: flex;
    justify-content: space-between;
}

#fact-box{
    text-align: center;
    width: 300px;
    background-color: whitesmoke;
    border: 1px solid black;
    padding: 20px;
}

.fact-line{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
</style>
