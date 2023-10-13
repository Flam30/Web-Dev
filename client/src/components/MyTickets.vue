<template>
    <div id="tickets">
        <b-card v-for="ticket in tickets" :key="ticket._id" :title="ticket.event" img-src="https://placekitten.com/1000/300" img-alt="Card image" img-top>
            <b-card-text>
                Some quick example text to build on the card and make up the bulk of the card's content.
            </b-card-text>
        </b-card>
    </div>
</template>

<style>
#tickets{
    width: 85%;
    background-color: lightcoral;
    color: greenyellow;
    padding: 2%;
}
</style>

<script>
// @ is an alias to /src
import { Api } from '@/Api'

export default {
  name: 'home',
  data() {
    return {
      tickets: []
    }
  },
  props: {
    id: String
  },
  created() {
    this.getTickets()
  },
  methods: {
    async getTickets() {
      Api.get('/v1/customers/' + this.id)
        .then(response => {
          const ticketArray = []
          for (let i = 0; i < response.data.length; i++) {
            ticketArray.push(response.data[i])
            ticketArray[i].event = this.getEventInfo(ticketArray[i].event)
          }
          this.tickets = ticketArray
        }).catch(error => {
          console.log(error)
        })
    },
    async getEventInfo(eventId) {
      Api.get('/v1/events/' + eventId)
        .then(response => {
          const eventInfo = response.data
          return eventInfo
        }).catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
