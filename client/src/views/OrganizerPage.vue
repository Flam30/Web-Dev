<script>
import { Api } from '@/Api'
import HeaderBar from '@/components/HeaderBar'
import EventCard from '@/components/EventCard'
import ManageEventCard from '@/components/ManageEventCard'

export default {
  name: 'organizer-page',
  data() {
    return {
      organizerInfo: '',
      events: [],
      form: {
        id: '',
        name: '',
        description: '',
        ageLimit: '',
        date: '',
        time: '',
        venue: '',
        organizer: this.id,
        imageURL: ''
      },
      tickets: {
        id: '',
        seat: '',
        price: 0,
        quantity: 0
      },
      venues: []
    }
  },
  components: {
    HeaderBar,
    EventCard,
    ManageEventCard
  },
  props: {
    id: String
  },
  created() {
    this.getVenues()
    this.getOrganizer()
    this.filterEvents()
  },
  methods: {
    async getOrganizer() {
      Api.get('/v1/organizers/' + this.id)
        .then(response => {
          const organizerInfo = response.data
          this.organizerInfo = organizerInfo
          console.log(organizerInfo)
          return this.organizerInfo
        }).catch(error => {
          console.log(error)
        })
    },
    async getVenues() {
      Api.get('/v1/venues/')
        .then(response => {
          const venuesInfo = response.data
          venuesInfo.forEach((venue) => this.venues.push({ value: venue.id, text: venue.name }))
          console.log(this.venues)
          return this.venues
        }).catch(err => {
          console.log(err)
        })
    },
    async filterEvents() {
      Api.get('/v1/events?organizer=' + this.id)
        .then(response => {
          const events = []
          for (let i = 0; i < response.data.length; i++) {
            events.push(response.data[i])
          }
          this.events = events
        }).catch(error => console.log(error))
    },
    async createEvent() {
      Api.post('/v1/events', {
        id: this.form.id,
        name: this.form.name,
        description: this.form.description,
        ageLimit: this.form.ageLimit,
        date: this.form.date.substring(0, 10) + ' ' + this.form.time,
        venue: this.form.venue,
        organizer: this.form.organizer,
        imageURL: this.form.imageURL
      }).then((res) => {
        console.log(res)
        if (res.status === 201) {
          alert('Event created!')
          this.addTicket()
          this.$router.go()
        } else {
          alert('Something went wrong! Please try again.')
        }
      }).catch((_err) => {
        if (_err.response.status === 400) {
          alert('Something went wrong. Please try again.')
        } else {
          console.log(_err.response)
        }
      })
    },
    async addTicket() {
      Api.post('/v1/events/' + this.form.id + '/tickets', {
        id: this.tickets.id,
        seat: this.tickets.seat,
        price: this.tickets.price,
        quantity: this.tickets.quantity,
        event: this.form.id
      }).then((res) => {
        console.log(res)
        if (res.status === 201) {
          alert('Tickets created!')
        } else {
          alert('Something went wrong! Please try again.')
        }
      }).catch((_err) => {
        if (_err.response.status === 400) {
          alert('Something went wrong. Please try again.')
        } else {
          console.log(_err.response)
        }
      })
    }
  }
}
</script>

<template>
<div>
    <HeaderBar></HeaderBar>
    <img class="home-background" src="./..\assets\LightViolet.png">
    <div class="title-container">
      <span id="organizer" v-if="organizerInfo">
        <h1 style="margin: 0;"> Hello, {{ organizerInfo.username }}!</h1></span>
    </div>
    <b-tabs pills card>
      <b-tab title="Your Events" active>
        <div class="event-wrapper">
          <EventCard
            v-for="event in events" :key="event.id"
            :name="event.name"
            :description="event.description"
            :link="event.imageURL"
            :URL="'/Event/' + event.id">
          </EventCard>
        </div>
      </b-tab>
      <b-tab title="Create Event">
        <div class="form-container">
          <!-- @submit="onSubmit" -->
            <b-form id="form">
              <b-form-group
                id="input-group-1"
                label="Event ID:"
                label-for="id-input">
                <b-form-input
                    id="id-input"
                    v-model="form.id"
                    placeholder="Enter a unique ID"
                    required>
                  </b-form-input>
              </b-form-group>

              <b-form-group
                id="input-group-2"
                label="Name:"
                label-for="name-input">
                <b-form-input
                    id="name-input"
                    v-model="form.name"
                    placeholder="Enter name"
                    required>
                  </b-form-input>
              </b-form-group>

              <b-form-group
                id="input-group-3"
                label="Description:"
                label-for="description-input">
                <b-form-textarea
                  id="description-input"
                  v-model="form.description"
                  placeholder="Enter description"
                  required
                  rows="2"
                ></b-form-textarea>
              </b-form-group>

              <b-form-group
                id="input-group-4"
                label="Age Limit:"
                label-for="ageLimit-input">
                <b-form-input
                    id="ageLimit-input"
                    v-model="form.ageLimit"
                    type="number"
                    placeholder="Enter age limit"
                    required>
                </b-form-input>
              </b-form-group>

              <b-form-group
                id="input-group-5"
                label="Date:"
                label-for="date-input">
                <b-form-input
                    id="date-input"
                    v-model="form.date"
                    type="date"
                    placeholder="YYYY-MM-DD"
                    required>
                </b-form-input>
              </b-form-group>

              <b-form-group
                  id="input-group-time"
                  label="Start time:"
                  label-for="event-time-input">
                    <b-form-timepicker v-model="form.time" locale="de" id="event-time-input"></b-form-timepicker>
              </b-form-group>

              <b-form-group
                id="input-group-6"
                label="Venue:"
                label-for="venue-input">
                  <b-form-select
                    id="venue-input"
                    v-model="form.venue"
                    :options="venues"
                    required>
                </b-form-select>
              </b-form-group>

              <b-form-group
                id="input-group-7"
                label="Image URL:"
                label-for="img-input">
                <b-form-input
                    id="img-input"
                    v-model="form.imageURL"
                    placeholder="Enter image URL"
                    required>
                  </b-form-input>
              </b-form-group>

              <hr>

              <b-form-group
                id="input-group-8"
                label="Ticket ID:"
                label-for="ticketID-input">
                <b-form-input
                    id="ticketID-input"
                    v-model="tickets.id"
                    placeholder="Enter ticket ID"
                    required>
                </b-form-input>
              </b-form-group>

              <b-form-group
                id="input-group-9"
                label="Price:"
                label-for="price-input">
                <b-form-input
                    id="price-input"
                    v-model="tickets.price"
                    placeholder="Enter price"
                    required>
                </b-form-input>
              </b-form-group>

              <b-form-group
                id="input-group-10"
                label="Quantity:"
                label-for="quantity-input">
                <b-form-input
                    id="quantity-input"
                    v-model="tickets.quantity"
                    placeholder="Enter ticket quantity"
                    required>
                  </b-form-input>
              </b-form-group>

              <b-button v-on:click="createEvent" variant="success">Register</b-button>
            </b-form>
          </div>
      </b-tab>
      <b-tab title="Manage Events" active>
        <div class="event-wrapper">
          <ManageEventCard
            v-for="event in events" :key="event.id"
            :id="event.id"
            :name="event.name"
            :description="event.description"
            :link="event.imageURL"
            :URL="'/Event/' + event.id">
          ></ManageEventCard>
        </div>
      </b-tab>
    </b-tabs>
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
  .title-container {
    display: flex;
    width: 100%;
    background-color: #DF77D4;
  }
  #organizer {
    margin: 1rem 1rem;
    color: whitesmoke;
  }
</style>
