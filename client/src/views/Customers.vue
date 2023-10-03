<script>
import { Api } from '@/Api'
import HeaderBar from '@/components/HeaderBar'

export default ({
  name: 'customer-page',
  data() {
    return {
      customers: []
    }
  },
  components: {
    HeaderBar
  },
  methods: {
    async postCustomers() {
      Api.post('/v1/customers/', { username: 'RatKing', name: 'Rat King', email: 'ratKing@gmail.com', address: 'Gothenburg', phoneNumber: '1234567890' })
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
    },

    async getCustomers() {
      Api.get('/v1/customers/')
        .then(response => {
          const customersArray = []
          for (let i = 0; i < response.data.length; i++) {
            customersArray.push(response.data[i])
          }
          this.customers = customersArray
        }).catch(error => {
          console.log(error)
          return 'Bro.'
        })
    },

    async deleteCustomers() {
      try {
        const response = await Api.delete('/v1/customers/')
        console.log(response)
      } catch (error) {
        console.error(error)
      }
    }
  }
})
</script>

<template>
    <div>
        <HeaderBar></HeaderBar>
        <br>
        <br>

        <h1> Press button to post customers: <b-button @click="postCustomers()"> POST </b-button> </h1>

        <br>
        <br>

        <h1> Press button to get information: <b-button @click="text=getCustomers()"> GET </b-button> </h1>

        <br>
        <br>

        <h1> Press button to delete customers: <b-button @click="deleteCustomers()"> DELETE </b-button> </h1>

        <br>

        <h1> Result: </h1>
        <p> {{ customers }} </p>
    </div>
</template>
