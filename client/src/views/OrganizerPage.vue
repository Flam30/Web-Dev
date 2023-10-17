<script>
import { Api } from '@/Api'
import HeaderBar from '@/components/HeaderBar'
import EventCard from '@/components/EventCard'

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
        venue: '',
        organizer: '',
        imageURL: ''
      }
    }
  },
  components: {
    HeaderBar,
    EventCard
  },
  props: {
    id: String
  },
  created() {
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
    async filterEvents() {
      Api.get('/v1/events?organizer=' + this.id)
        .then(response => {
          const events = []
          for (let i = 0; i < response.data.length; i++) {
            events.push(response.data[i])
          }
          this.events = events
        }).catch(error => console.log(error))
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
            link="https://previews.123rf.com/images/sanneberg/sanneberg1708/sanneberg170800669/85057705-guy-smiling-and-giving-thumbs-up-portrait.jpg"
            :URL="'/Event/' + event._id">
          </EventCard>
        </div>
      </b-tab>
      <b-tab title="Create Event">
        <div class="form-container">
          <!-- @submit="onSubmit" -->
            <b-form id="form">
              <b-form-group
                id="input-group-1"
                label="ID:"
                label-for="id-input">
                <b-form-input
                    id="id-input"
                    v-model="form.id"
                    placeholder="Enter id"
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
                id="input-group-6"
                label="Venue:"
                label-for="venue-input">
                <b-form-input
                    id="venue-input"
                    v-model="form.venue"
                    placeholder="fake"
                    required>
                </b-form-input>
              </b-form-group>

              <b-form-group
                id="input-group-7"
                label="Organizer:"
                label-for="organizer-input">
                <b-form-input
                    id="organizer-input"
                    v-model="form.organizer"
                    placeholder="Enter organizer"
                    required>
                </b-form-input>
              </b-form-group>

              <b-button variant="success">Register</b-button>
            </b-form>
          </div>
      </b-tab>
      <b-tab title="Manage Events" active>
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
