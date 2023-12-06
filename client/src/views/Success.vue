<script>
import { Api } from '@/Api'

export default {
  name: 'Success',
  data() {
    return {
      message: '5',
      timerCount: 5,
      userId: ''
    }
  },
  props: {
    ticketId: String
  },
  watch: {
    timerCount: {
      handler(value) {
        if (value > 0) {
          setTimeout(() => {
            this.timerCount--
            if (this.timerCount === 0) {
              this.$router.push('/')
            } else {
              this.message = this.timerCount
            }
          }, 1000)
        }
      },
      immediate: true
    }
  },
  methods: {
    getUserInfo() {
      this.userId = this.$session.get('user-id')
    },
    async postTickets() {
      this.getUserInfo()
      Api.patch('/v1/customers/' + this.userId + '/tickets/' + this.ticketId).then((res) => {
        if (res.status === 201) {
          console.log('Ticket added to customer!')
        } else {
          alert('Something went wrong! Please try again.')
          this.$router.push('/')
        }
      }).catch((_err) => {
        alert('Something went wrong! Please try again.')
        console.log('Error: ' + _err)
      })
    }
  },
  created() {
    this.postTickets()
  }
}
</script>

<template >
  <div id="page-wrapper">
    <HeaderBar></HeaderBar>
    <div id="confirmation-wrapper">
    <p id="confirmation-title">Order confirmed!</p>
    <p id="confirmation-description">Redirecting to the home page <br /> in {{ message }} seconds...</p>
  </div>
  </div>
</template>

<style>
#confirmation-title {
  font-size: 69px;
}

#confirmation-description {
  font-size: 24px;
}

#confirmation-wrapper{
  height: 400px;
  width: 400px;
  background-color: #B0FFAD;
  border: 7px #77DD77 solid;
  border-radius: 10px;
  margin: 100px auto;
  text-align: center;
}
</style>
