<script>
import HeaderBar from '@/components/HeaderBar'
import { StripeCheckout } from '@vue-stripe/vue-stripe'
export default {
  name: 'Event',
  data() {
    // We'll replace it with an env variable later
    this.publishableKey = 'pk_test_51NvnEZIeSorUA2wFzBWTeShkIWHsjqH2DCdIfap6d0YNtG6DNdTZOZHaoDpuV8KtNjD5JWnZvGZIJRTWnAaHI2Nh00MYxPsY4Z'
    return {
      loading: false,
      lineItems: [
        {
          price: 'price_1NvnpJIeSorUA2wF8Yi0b7GW', // The id of the one-time price you created in your Stripe dashboard
          quantity: 1
        }
      ],
      successURL: 'http://localhost:8080/Success',
      cancelURL: 'https://www.google.com'
    }
  },
  methods: {
    submit() {
      // You will be redirected to Stripe's secure checkout page
      this.$refs.checkoutRef.redirectToCheckout()
    }
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
            <h1>{{ id }}</h1>
            <p id="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
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
            <h2 style="text-align: center; margin: 10px 0;">Scandinavium, Gothenburg</h2>
            <div class="fact-line">
                <h3>Date</h3>
                <h3>30-09-2023</h3>
            </div>
            <div class="fact-line">
                <h3>Time</h3>
                <h3>20:00-23:00</h3>
            </div>
            <div class="fact-line">
                <h3>Ages</h3>
                <h3>16+</h3>
            </div>
            <div class="fact-line">
                <h3>Price</h3>
                <h3>2137kr</h3>
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
    width: 70%;
}
#details-wrapper{
    padding: 30px 20px;
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
