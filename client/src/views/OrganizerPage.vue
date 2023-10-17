<script>
import HeaderBar from '@/components/HeaderBar'
import { Api } from '@/Api'

export default {
  name: 'organizer-page',
  data() {
    return {
      organizerInfo: ''
    }
  },
  created() {
    this.getOrganizer()
  },
  methods: {
    submit() {

    },
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
    }
  },
  components: {
    HeaderBar
  },
  props: {
    id: String
  }
}
</script>

<template>
<div>
    <HeaderBar></HeaderBar>
    <img class="banner" src="./..\assets\Banner.png">
    <div class="title-container">
      <span v-if="organizerInfo">{{ organizerInfo.username }}</span>
    </div>
</div>
</template>

<style>
  .banner {
    height: 80px;
    max-width: 100%;
    object-fit: cover;
    margin: auto;
    padding: 0%;
  }

  .title-container {
    display: flex;
    width: 100%;
    height: 20px;
  }
</style>
