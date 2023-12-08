<script>
import { Api } from '@/Api'
import HeaderBar from '@/components/HeaderBar'

export default {
  name: 'edit-event',
  data() {
    return {
      form: {
        id: '',
        name: 'Example Event',
        description: 'Write something about your event here!',
        ageLimit: 0,
        date: '',
        time: '',
        venue: '',
        imageURL: 'https://thumbs.dreamstime.com/b/crowd-concert-summer-music-festival-crowd-concert-summer-music-festival-89546129.jpg'
      },
      venues: []
    }
  },
  components: {
    HeaderBar
  },
  created: function () {
    this.getEvent()
    this.getVenues()
  },
  props: {
    id: String
  },
  methods: {
    async getEvent() {
      Api.get('/v1/events/' + this.id)
        .then(response => {
          const eventInfo = response.data
          this.form = eventInfo
          const date = new Date(eventInfo.date)
          this.form.time = date.toLocaleTimeString()
          Api.get('/v1/venues/' + eventInfo.venue)
            .then(response => {
              const venueInfo = response.data
              this.form.venue = venueInfo.name
            }).catch(err => {
              console.log(err)
              alert('Something went wrong. Please try again.')
            })
          return this.eventInfo
        }).catch(error => {
          console.log(error)
          alert('Something went wrong. Please try again.')
        })
    },
    async getVenues() {
      Api.get('/v1/venues/')
        .then(response => {
          const venuesInfo = response.data
          venuesInfo.forEach((venue) => this.venues.push({ name: venue.name, id: venue.id }))
          console.log(this.venues)
          return this.venues
        }).catch(err => {
          console.log(err)
        })
    },
    async editEvent() {
      const venueID = this.venues.filter(venue => venue.name === this.form.venue)[0].id
      Api.put('/v1/events/' + this.id, {
        id: this.form.id,
        name: this.form.name,
        description: this.form.description,
        ageLimit: this.form.ageLimit,
        date: this.form.date.substring(0, 10) + ' ' + this.form.time,
        venue: venueID,
        imageURL: this.form.imageURL,
        organizer: this.$session.get('user-id')
      }).then((res) => {
        console.log(res)
        if (res.status === 200) {
          alert('Event successfully edited!')
        } else {
          alert('Something went wrong! Please try again.')
        }
      }).catch((_err) => {
        console.log(_err.response)
        alert('Something went wrong. Please try again.')
      })
    },
    submitForm() {
      this.editEvent()
    }
  }
}
</script>

<template>
  <div>
    <HeaderBar></HeaderBar>
    <div class="form-wrapper">
      <b-form id="event-form">
        <b-form-group
            label-cols-lg="4"
            content-cols-lg="8"
            id="input-group-0"
            label="Event ID:"
            label-for="event-id-input">
            <b-form-input
                id="event-id-input"
                v-model="form.id"
                placeholder="Enter a unique event ID..."
                required>
            </b-form-input>
        </b-form-group>

        <b-form-group
            label-cols-lg="4"
            content-cols-lg="8"
            id="input-group-1"
            label="Event name:"
            label-for="event-name-input">
            <b-form-input
                id="event-name-input"
                v-model="form.name"
                placeholder="Enter event name..."
                required>
            </b-form-input>
        </b-form-group>

        <b-form-group
        label-cols-lg="4"
            content-cols-lg="8"
            id="input-group-2"
            label="Event description:"
            label-for="event-description-input">
            <b-form-textarea
              id="event-description-input"
              v-model="form.description"
              placeholder="Enter event description..."
              rows="3"
            ></b-form-textarea>
        </b-form-group>

        <b-form-group
            id="input-group-3"
            label-cols-lg="4"
            content-cols-lg="8"
            label="Event age limit:"
            label-for="event-age-input">
            <b-form-input
              id="event-age-input"
              v-model="form.ageLimit"
              type="number"
              rows="3"
            ></b-form-input>
        </b-form-group>

        <b-form-group
            id="input-group-4"
            label-cols-lg="4"
            content-cols-lg="8"
            label="Event date:"
            label-for="event-date-input">
              <b-form-datepicker id="event-date-input" v-model="form.date"></b-form-datepicker>
        </b-form-group>

        <b-form-group
            id="input-group-5"
            label-cols-lg="4"
            content-cols-lg="8"
            label="Event start time:"
            label-for="event-time-input">
              <b-form-timepicker v-model="form.time" locale="de" id="event-time-input"></b-form-timepicker>
        </b-form-group>

        <b-form-group
            id="input-group-6"
            label-cols-lg="4"
            content-cols-lg="8"
            label="Event venue:"
            label-for="event-venue-input">
              <b-form-select required v-model="form.venue" :options="this.venues.map(venue => venue.name)" ></b-form-select>
        </b-form-group>

        <b-form-group
            id="input-group-7"
            label-cols-lg="4"
            content-cols-lg="8"
            label="Event image URL:"
            label-for="event-image-input">
              <b-form-input
                id="event-image-input"
                v-model="form.imageURL"
                placeholder="Enter image URL..."
                rows="3"
              ></b-form-input>
        </b-form-group>

        <b-button v-on:click="editEvent" variant="primary">Submit</b-button>
    </b-form>

  </div>
  </div>
</template>

<style>
h1{
  text-align: center;
}
.form-wrapper{
  width: 100%;
  justify-content: space-around;
  margin: 5% auto;
  display: flex;
}
#event-form{
  width: 60%;
}
</style>
