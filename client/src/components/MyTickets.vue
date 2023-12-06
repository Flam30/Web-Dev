<template>
  <div class="tickets">
    <b-row class="ticket-wrapper">
      <b-col class="ticket-image" v-bind:style="{ backgroundImage: 'url(' + this.eventInfo.imageURL + ')' }">
      </b-col>
      <b-col class="ticket-info">
        <p class="ticket-title">{{ this.eventInfo.name }}</p>
        <p class="ticket-description">{{ this.eventInfo.description.substring(0, 100) + (this.eventInfo.description.length > 100 ? '...' : '') }}</p>
      </b-col>
      <b-col style="text-align: center; margin: auto;">
        <b-button v-b-modal="modalID" variant="info">View Ticket</b-button>
      </b-col>
    </b-row>
    <b-modal :id="modalID" title="Your ticket QR code">
      <qrcode-vue :value="ticketQR" size="300"></qrcode-vue>
  </b-modal>
  </div>
</template>

<style>
.tickets{
    height: 150px;
    width: 80%;
    margin: 15px auto;
    padding: 10px;
}

.ticket-wrapper{
  height: 250px;
  margin: 0;
  background-color: white;
}

.ticket-image{
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}

.ticket-info{
  padding: 10px 0;
}

.ticket-title{
  font-size: 28px;
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
    }
  }
}
</script>
