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
    <img class="home-background" src="./..\assets\LightViolet.png">
    <div class="title-container">
      <span id="organizer" v-if="organizerInfo">{{ organizerInfo.username }}</span>
    </div>
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
    height: 20px;
    font-size: 24px;
  }
</style>
