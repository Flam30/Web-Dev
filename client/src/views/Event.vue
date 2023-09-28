<script>
import HeaderBar from '@/components/HeaderBar'

export default {
  name: 'Event',
  data() {
    return {
      message: 'none'
    }
  },
  components: {
    HeaderBar
  },
  props: {
    id: String
  },
  methods: {
  }
}
</script>

<template>
<div>
    <HeaderBar></HeaderBar>
    <h1>{{ id }}</h1>
</div>
</template>

<style>

</style>
