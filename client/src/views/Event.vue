<script>
import HeaderBar from '@/components/HeaderBar'

export default {
  name: 'Event',
  data() {
    return {
      message: 'none'
    }
  },
  components: {
    HeaderBar
  },
  props: {
    id: String
  },
  methods: {
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
        </div>
        <div id="fact-box">
            <h2 style="text-align: center; margin: 10px 0;">Scandinavium, Gothenburg</h2>
            <div class="fact-line">
                <h3>Date</h3>
                <h3>28-09-2023</h3>
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
            <b-button variant="primary" id="tickets-button">Tickets</b-button>
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
