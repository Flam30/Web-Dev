<template>
<div style="display: flex">
  <b-card
    bg-variant="warning"
    text-variant="white"
    border-variant="light"
    v-bind:title=name
    v-bind:img-src=link
    img-alt="Event thumbnail"
    img-top
    img-height=200
    tag="event"
    style="max-width: 20rem;"
    id="card"
  >
    <div class="card-content">
      <b-card-text>
        {{ description }}
      </b-card-text>
    </div>
    <template #footer>
      <b-button v-bind:href=URL variant="primary">Details</b-button>
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
