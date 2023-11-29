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
      // You will be redirected to Stripe's secure checkout page
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
    <HeaderBar></HeaderBar>
    <img src="https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?cs=srgb&dl=pexels-wolfgang-2747449.jpg&fm=jpg" alt="Event cover image" id="event-photo">
    <div id="details-wrapper">
        <div id="title-wrapper">
            <h1>{{ eventInfo.name }}</h1>
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
        </div>
        <div id="fact-box">
            <h2 style="text-align: center; margin: 10px 0;">{{ venueInfo.name }}, {{venueInfo.location}}</h2>
            <div class="fact-line">
                <h3>Date</h3>
                <h3>{{ eventInfo.date.substring(0, 10) }}</h3>
            </div>
            <div class="fact-line">
                <h3>Time</h3>
                <h3>{{ new Date(eventInfo.date).toTimeString().split(' ')[0].substring(0, 5) }}</h3>
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
            <b-button variant="primary" id="tickets-button" v-on:click="submit">Tickets</b-button>
        </div>
    </div>
</div>
</template>

<style>

#event-photo{
    width: 100%;
    height: 400px;
    object-fit: cover;
    box-shadow: 0px 0px 8px 2px #000000;
}
#title-wrapper{
    width: 600px;
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
    justify-content: space-between;
}
</style>
