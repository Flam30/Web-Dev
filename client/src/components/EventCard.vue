<template>
<div style="display: flex">
  <b-card
    bg-variant="warning"
    text-variant="white"
    v-bind:title=name
    v-bind:img-src=link
    img-alt="Event thumbnail"
    img-top
    img-height=200
    style="max-width: 16rem; min-width: 16rem;"
    id="card"
  >
    <div class="card-content">
      <b-card-text v-if="this.description">
        {{ this.description.substring(0, 100) + (this.description.length > 100 ? '...' : '') }}
      </b-card-text>
      <b-card-text v-else>Loading...</b-card-text>
    </div>
    <template #footer>
      <b-button v-bind:href=URL variant="info">Details</b-button>
    </template>
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
.card-content {
  display: flex; /* Apply flex layout to the content */
  flex-direction: column; /* Stack children vertically */
}
</style>
