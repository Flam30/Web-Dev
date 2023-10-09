<script>
// @ is an alias to /src
import { Api } from '@/Api'
import HeaderBar from '@/components/HeaderBar'
import EventCard from '@/components/EventCard'

export default {
  name: 'home',
  data() {
    return {
      events: []
    }
  },
  components: {
    HeaderBar,
    EventCard
  },
  created() {
    this.getEvents()
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
    }
  }
}
</script>

<template>
  <div>
    <HeaderBar></HeaderBar>
    <h1 style="padding: 50px 0 0 10px;">Upcoming events</h1>
    <div id="event-wrapper">
      <EventCard
        v-for="event in events" :key="event.id"
        :name="event.name"
        description="Placeholder description"
        link="https://previews.123rf.com/images/sanneberg/sanneberg1708/sanneberg170800669/85057705-guy-smiling-and-giving-thumbs-up-portrait.jpg"
        :URL="'/Event/' + event._id">
      </EventCard>

      <EventCard
        name="Eurovision 2024"
        description="Lorem ipsum dolor sit"
        link="https://gaybladet.se/wp-content/uploads/2023/05/eurovision-song-contest-2023.webp"
        URL="\Event\TestEvent">
      </EventCard>

      <b-button href="/account/RatKing"> Account </b-button>
    </div>
  </div>
</template>

<style>
h1{
  text-align: left;
}
.event-wrapper{
  display: flex;
  width: 100%;
}
</style>
