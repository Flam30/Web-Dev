<script>
import { Api } from '@/Api'
import HeaderBar from '@/components/HeaderBar'

export default ({
  name: 'account-page',
  data() {
    return {
      userInfo: ''
    }
  },
  props: {
    username: String
  },
  components: {
    HeaderBar
  },
  created() {
    this.getCustomer()
  },
  methods: {
    async getCustomer() {
      Api.get('/v1/customers/' + this.username)
        .then(response => {
          const userInfo = response.data
          this.userInfo = userInfo
          return this.userInfo
        }).catch(error => {
          console.log(error)
        })
    }
  }
})
</script>

<template>
    <div>
        <HeaderBar></HeaderBar>

        <!-- <div id="jumbotron">
            <b-jumbotron v-bind:header="'Hello, ' + this.userInfo.name + '!'" lead="See your tickets here:">
            <b-button variant="primary" href="#">More Info</b-button>
            </b-jumbotron>
        </div> -->

        <div id="top-container">
            <h1 id="hello-message"> Hello, {{this.userInfo.name}}!</h1>
            <p id="ticket-info"> See your tickets here: <button id="ticket-button"> Your Tickets</button></p>
        </div>

        <div id="info-container">
            <p>
                Username: {{this.userInfo.username}} <br>
                Name: {{this.userInfo.name}} <br>
                Email: {{this.userInfo.email}} <br>
                Address: {{this.userInfo.address}} <br>
                Phone Number: {{this.userInfo.phoneNumber}}
            </p>
        </div>
    </div>
</template>

<style>
#top-container{
    padding-top: 50px;
    padding-left: 30px;
}

#info-container{
    padding: 50px;
    padding-left: 30px;
}

#hello-message{
    font-family: "Lucida Handwriting";
}

</style>
