<template>
<div style="display: flex">
  <b-card
    v-bind:title=name
    v-bind:img-src=link
    img-alt="Event thumbnail"
    img-top
    img-height=200
    tag="event"
    style="max-width: 20rem;"
    id="card"
  >
    <b-card-text>
      {{ description }}
    </b-card-text>

    <b-button v-bind:href=URL variant="primary">Details</b-button>
  </b-card>
</div>
</template>

<script>
export default {
  props: {
    name: String,
    description: String,
    link: String,
    URL: String
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
</style>
