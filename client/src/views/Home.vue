<script>
// @ is an alias to /src
import { Api } from '@/Api'
import HeaderBar from '@/components/HeaderBar'
import EventCard from '@/components/EventCard'

export default {
  name: 'home',
  data() {
    return {
      events: [],
      venues: []
    }
  },
  components: {
    HeaderBar,
    EventCard
  },
  created() {
    this.getEvents()
    this.getVenues()
  },
  methods: {
    async getEvents() {
      Api.get('/v1/events/')
        .then(response => {
          const eventArray = []
          for (let i = 0; i < response.data.length; i++) {
            eventArray.push(response.data[i])
          }
          this.events = eventArray
        }).catch(error => {
          console.log(error)
        })
    },
    async filterEvents(query) {
      Api.get('/v1/events?' + query)
        .then(response => {
          const eventArray = []
          for (let i = 0; i < response.data.length; i++) {
            eventArray.push(response.data[i])
          }
          this.events = eventArray
        }).catch(error => console.log(error))
    },
    async sortEvents(query) {
      Api.get('/v1/events?sort=' + query)
        .then(response => {
          const eventArray = []
          for (let i = 0; i < response.data.length; i++) {
            eventArray.push(response.data[i])
          }
          this.events = eventArray
        }).catch(error => console.log(error))
    },
    async getVenues() {
      Api.get('/v1/venues/')
        .then(response => {
          const venueArray = response.data
          this.venues = venueArray
        }).catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<template>
  <div>
    <img class="home-background" src="./..\assets\LightViolet.png">
    <div class="header-container">
      <HeaderBar></HeaderBar>
      <div id="filter-sort-buttons">
        <b-dropdown id="filtering" text="Filter" class="m-md-2 buttons" variant="info">
          <b-dropdown-item v-on:click="getEvents"> Show all </b-dropdown-item>
          <b-dropdown-item
          v-for="venue in venues" :key="venue.id"
          v-on:click="filterEvents('venue='+venue.id)"> {{ venue.name }} </b-dropdown-item>
        </b-dropdown>

        <b-dropdown id="sorting" text="Sort" class="m-md-2 buttons" variant="info">
          <!-- We are sorting by name_lowercase because Mongoose and MongoDB sort words that start with
            uppercase letters and lowercase letters separately, and it was causing our sorting on the home page to not work. -->
          <b-dropdown-item v-on:click="sortEvents('normalized')"> A - Z </b-dropdown-item>
          <b-dropdown-item v-on:click="sortEvents('-normalized')"> Z - A </b-dropdown-item>
          <b-dropdown-item v-on:click="sortEvents('date')"> Date (closest first) </b-dropdown-item>
          <b-dropdown-item v-on:click="sortEvents('-date')"> Date (furthest first) </b-dropdown-item>
        </b-dropdown>
      </div>
    </div>

    <div class="event-wrapper">
      <EventCard
        v-for="event in events" :key="event.id"
        :name="event.name"
        :description="event.description"
        :link="event.imageURL"
        :URL="'/Event/' + event.id">
      </EventCard>
    </div>
  </div>
</template>

<style>
.home-background {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  object-fit: cover;
  z-index: -1;
}

#filter-sort-buttons{
  position: relative;
  top: -4.25rem;
  left: 0;
  z-index: +2;
}

.buttons {
  padding: 5px;
}

h1{
  text-align: left;
}

.event-wrapper{
  display: flex;
  flex-wrap: wrap;
  justify-content:space-evenly;
  width: 100%;
  height: 100%;
}
</style>
