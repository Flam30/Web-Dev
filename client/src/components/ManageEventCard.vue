<template>
<div style="display: flex">
  <b-card
    bg-variant="warning"
    text-variant="white"
    v-bind:title=name
    style="width: 20rem;"
    id="card"
  >
    <div class="card-content">
      <b-card-text v-if="this.description">
        {{ this.description.substring(0, 100) + (this.description.length > 100 ? '...' : '') }}
      </b-card-text>
      <b-card-text v-else>
        Loading...
      </b-card-text>
    </div>
    <template #footer>
        <div class="button-container">
            <b-button v-bind:href="'/edit-event/' + id" variant="info">Edit</b-button>
            <b-button @click="deleteEvent" variant="danger" id="delete-button">Delete</b-button>
        </div>
    </template>
  </b-card>
</div>
</template>

<script>
import { Api } from '@/Api'

export default {
  props: {
    id: String,
    name: String,
    description: String,
    link: String,
    URL: String
  },
  methods: {
    async deleteEvent() {
      const id = this.id
      Api.delete('/v1/events/' + id + 'tickets')
        .catch(err => {
          console.log(err)
        })
      Api.delete('/v1/events/' + id)
        .then(res => {
          this.$router.go()
        })
    }
  }
}
</script>

<style>
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
#delete-button {
    margin-left: 10px;
}
</style>
