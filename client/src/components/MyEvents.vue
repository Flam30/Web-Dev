<template>
  <div class="events">
    <b-row class="event-wrapper">
      <b-col class="event-image" v-bind:style="{ backgroundImage: 'url(' + this.imageUrl + ')' }">
      </b-col>
      <b-col class="event-info">
        <p class="event-title">{{ this.eventInfo.name }}</p>
        <p class="event-description">{{ this.eventInfo.description }}</p>
      </b-col>
      <b-col style="text-align: center; margin: auto;">
        <b-button v-b-modal="modalID" variant="info" :href="'/Event/' + this.eventInfo.id">View Event</b-button>
      </b-col>
    </b-row>
  </div>
</template>

<style>
.events{
    height: 150px;
    width: 80%;
    margin: 15px auto;
    padding: 10px;
}

.event-wrapper{
  height: 150px;
  margin: 0;
  background-color: white;
}

.event-image{
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}

.event-info{
  padding: 10px 0;
}

.event-title{
  font-size: 28px;
}
</style>

<script>
import { Api } from '@/Api'

export default {
  name: 'home',
  data() {
    return {
      eventInfo: ''
    }
  },
  props: {
    title: String,
    description: String,
    imageUrl: String,
    eventId: String
  },
  created() {
    this.getEvent()
  },
  methods: {
    async getEvent() {
      Api.get('/v1/events/' + this.eventId)
        .then(response => {
          const eventInfo = response.data
          this.eventInfo = eventInfo
        }).catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
