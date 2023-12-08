<template>
<div style="display: flex">
  <b-card
    v-bind:title= "this.eventInfo.name"
    v-bind:img-src="this.eventInfo.imageURL"
    img-alt="Event thumbnail"
    img-top
    img-height=200
    style="max-width: 16rem; min-width: 16rem;"
    id="card"
  >
    <div class="card-content">
      <b-card-text v-if="this.eventInfo.description">
        {{ this.eventInfo.description.substring(0, 100) + (this.eventInfo.description.length > 100 ? '...' : '') }}      </b-card-text>
      <b-card-text v-else>Loading...</b-card-text>
    </div>
    <template #footer>
      <b-button v-b-modal="modalID" variant="info">View Ticket</b-button>
    </template>
    <b-modal :id="modalID" title="Your ticket QR code">
      <qrcode-vue :value="ticketQR" size="300"></qrcode-vue>
      <b-button class="mt-3" block v-if="eventLinkAvailable" @click="goToEvent">Go to Event</b-button>
    </b-modal>
  </b-card>
</div>
</template>

<style>
.modal-body {
    position: relative;
    flex: 1 1 auto;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
}

#card{
    margin: 20px 10px;
}

#thumbnail{
    width: 100%;
}
.card-content {
  display: flex; /* Apply flex layout to the content */
  flex-direction: column; /* Stack children vertically */
}
</style>

<script>
import QrcodeVue from 'qrcode.vue'
import { Api } from '@/Api'

export default {
  name: 'home',
  data() {
    return {
      ticketQR: '',
      modalID: '',
      ticketInfo: '',
      eventInfo: ''
    }
  },
  props: {
    id: String,
    title: String,
    description: String,
    imageUrl: String,
    eventId: String
  },
  created() {
    const userId = this.$session.get('user-id')
    this.ticketQR = 'kirbysTickets://' + userId + this.id
    this.modalID = 'modal' + this.id + Math.floor(Math.random() * 100)
    this.getTicket()
  },
  components: {
    QrcodeVue
  },
  computed: {
    eventLinkAvailable() {
      return this.ticketInfo ? this.ticketInfo._links.eventPage.href : null
    }
  },
  methods: {
    async getTicket() {
      Api.get('/v1/tickets/' + this.id)
        .then(response => {
          const ticketInfo = response.data
          this.ticketInfo = ticketInfo
          this.getEvent(ticketInfo.event)
        }).catch(error => {
          console.log(error)
        })
    },
    async getEvent(id) {
      Api.get('/v1/events/' + id)
        .then(response => {
          const eventInfo = response.data
          this.eventInfo = eventInfo
        }).catch(error => {
          console.log(error)
        })
    },
    async goToEvent() {
      if (this.eventLinkAvailable) {
        // Redirect to the event page using the href
        window.location.href = this.ticketInfo._links.eventPage.href
      }
    }
  }
}
</script>
