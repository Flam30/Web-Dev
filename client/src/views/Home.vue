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
    <HeaderBar></HeaderBar>
    <img class="banner" src="./..\assets\Banner.png">

    <div id="filter-sort-buttons">
      <b-dropdown id="filtering" text="Filter" class="m-md-2" variant="info">
        <b-dropdown-item v-on:click="getEvents"> Show all </b-dropdown-item>
        <b-dropdown-item
        v-for="venue in venues" :key="venue.id"
        v-on:click="filterEvents('venue='+venue.id)"> {{ venue.name }} </b-dropdown-item>
      </b-dropdown>

      <b-dropdown id="sorting" text="Sort" class="m-md-2" variant="info">
        <b-dropdown-item v-on:click="sortEvents('name')"> A - Z </b-dropdown-item>
        <b-dropdown-item v-on:click="sortEvents('-name')"> Z - A </b-dropdown-item>
        <b-dropdown-item v-on:click="sortEvents('date')"> Date (closest first) </b-dropdown-item>
        <b-dropdown-item v-on:click="sortEvents('-date')"> Date (furthest first) </b-dropdown-item>
      </b-dropdown>
    </div>

    <div class="event-wrapper">
      <EventCard
        v-for="event in events" :key="event.id"
        :name="event.name"
        :description="event.description"
        link="https://previews.123rf.com/images/sanneberg/sanneberg1708/sanneberg170800669/85057705-guy-smiling-and-giving-thumbs-up-portrait.jpg"
        :URL="'/Event/' + event._id">
      </EventCard>

      <EventCard
        name="Eurovision 2024"
        description="Lorem ipsum dolor sit"
        link="https://gaybladet.se/wp-content/uploads/2023/05/eurovision-song-contest-2023.webp"
        URL="\Event\TestEvent">
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

.banner {
  position: absolute;
  height: 80px;
  max-width: 100%;
  object-fit: cover;
  margin: auto;
  padding: 0%;
}

#filter-sort-buttons{
  padding-top: 1%;
  padding-left: 0.5%;
  padding-bottom: 3%;
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
