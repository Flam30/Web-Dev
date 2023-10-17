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
        })
    },

    async deleteCustomers() {
      try {
        const response = await Api.delete('/v1/customers/')
        console.log(response)
      } catch (error) {
        console.error(error)
      }
    },

    async patchName(newValue) {
      Api.patch('/v1/customers/' + this.customers[0].username, {
        name: newValue
      })
        .then(response => console.log(response.data))
        .catch(error => console.error(error))
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
        <br>

        <!-- Does not work -->

        <h1> Press button to change name: <b-button @click="this.patchName('MEGAPOWER')"> PATCH </b-button> </h1>

        <h1> Result: </h1>
        <p> {{ customers }} </p>

        <!-- Username modal -->
      <b-modal id="modal-username" busy='true'>
        <b-form-group id="input-username" label="Username:" label-for="input-username">
          <b-form-input
            id="input-username"
            v-model="this.form.username"
            placeholder="Enter username"
            required
          ></b-form-input>
        </b-form-group>
        <!-- Customize modal buttons -->
        <template #modal-footer="{ cancel , ok }">
            <b-button variant="outline-secondary" @click="cancel()"> Cancel </b-button>
            <b-button variant="primary" @click="onSubmit();patchUsername(this.form.username);ok()"> Submit </b-button>
        </template>
      </b-modal>
      <!-- Name modal -->
      <b-modal id="modal-name">
        <b-form-group id="input-name" label="Name:" label-for="input-name">
          <b-form-input
            id="input-name"
            v-model="this.form.name"
            placeholder="Enter name"
            required
          ></b-form-input>
        </b-form-group>
        <!-- Customize modal buttons -->
        <template #modal-footer="{ cancel , ok }">
            <b-button variant="outline-secondary" @click="cancel()"> Cancel </b-button>
            <b-button variant="primary" @click="JSON.stringify(this.form);patchName(this.form.name);ok()"> Submit </b-button>
        </template>
      </b-modal>
      <!-- Email modal -->
      <b-modal id="modal-email">
        <b-form-group id="input-email" label="Email:" label-for="input-email">
          <b-form-input
            id="input-email"
            v-model="this.form.email"
            placeholder="Enter email"
            required
          ></b-form-input>
        </b-form-group>
        <!-- Customize modal buttons -->
        <template #modal-footer="{ cancel , ok }">
            <b-button variant="outline-secondary" @click="cancel()"> Cancel </b-button>
            <b-button variant="primary" @click="JSON.stringify(this.form);patchEmail(this.form.email);ok()"> Submit </b-button>
        </template>
      </b-modal>
      <!-- Address modal -->
      <b-modal id="modal-address">
        <b-form-group id="input-address" label="Address:" label-for="input-address">
          <b-form-input
            id="input-address"
            v-model="this.form.address"
            placeholder="Enter address"
            required
          ></b-form-input>
        </b-form-group>
        <!-- Customize modal buttons -->
        <template #modal-footer="{ cancel , ok }">
            <b-button variant="outline-secondary" @click="cancel()"> Cancel </b-button>
            <b-button variant="primary" @click="JSON.stringify(this.form);patchAddress(this.form.address);ok()"> Submit </b-button>
        </template>
      </b-modal>
        <!-- Phone number modal -->
        <b-modal id="modal-phone-number">
        <b-form-group id="input-phone-number" label="Phone Number:" label-for="input-phone-number">
          <b-form-input
            id="input-phone-number"
            v-model="this.form.phoneNumber"
            placeholder="Enter phone number"
            required
          ></b-form-input>
        </b-form-group>
        <!-- Customize modal buttons -->
        <template #modal-footer="{ cancel , ok }">
            <b-button variant="outline-secondary" @click="cancel()"> Cancel </b-button>
            <b-button variant="primary" @click="JSON.stringify(this.form);patchPhoneNumber(this.form.phoneNumber);ok()"> Submit </b-button>
        </template>
      </b-modal>
    </div>
</template>
