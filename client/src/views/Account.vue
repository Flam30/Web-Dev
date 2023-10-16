<template>
    <div>
        <HeaderBar></HeaderBar>

        <div id="jumbotron">
            <b-jumbotron v-bind:header="'Hello, ' + this.userInfo.name + '!'">
            </b-jumbotron>
        </div>

        <div id="info-container">
          <div class = "row">
            <div class="column" id="text-field">
              <p> Username: </p>
              <p> Name: </p>
              <p> Email: </p>
              <p> Address: </p>
              <p> Phone number: </p>
            </div>

            <div class="column" id="information">
              <p> {{this.userInfo.username}} </p>
              <p> {{this.userInfo.name}} </p>
              <p> {{this.userInfo.email}} </p>
              <p> {{this.userInfo.address}} </p>
              <p> {{this.userInfo.phoneNumber}} </p>
            </div>

            <div class="column" id="edit-button">
              <b-button pill variant="primary" v-b-modal.modal-username>Edit</b-button> <br> <!-- Username editor -->
              <b-button pill variant="primary" v-b-modal.modal-name>Edit</b-button> <br> <!-- Name editor -->
              <b-button pill variant="primary" v-b-modal.modal-email>Edit</b-button> <br> <!-- Email editor -->
              <b-button pill variant="primary" v-b-modal.modal-address>Edit</b-button> <br> <!-- Address editor -->
              <b-button pill variant="primary" v-b-modal.modal-phone-number>Edit</b-button> <!-- Phone number editor -->
            </div>
          </div>
        </div>

      <!-- Username modal -->
      <b-modal id="modal-username">
        <b-form-group id="input-username" label="Username:" label-for="input-username">
          <b-form-input
            id="input-username"
            v-model="form.username"
            placeholder="Enter username"
            required
          ></b-form-input>
        </b-form-group>
        <!-- Customize modal buttons -->
        <template #modal-footer="{ cancel , ok }">
            <b-button variant="outline-secondary" @click="cancel()"> Cancel </b-button>
            <b-button variant="primary" @click="onSubmit();patchUsername(form.username);ok()"> Submit </b-button>
        </template>
      </b-modal>
      <!-- Name modal -->
      <b-modal id="modal-name">
        <b-form-group id="input-name" label="Name:" label-for="input-name">
          <b-form-input
            id="input-name"
            v-model="form.name"
            placeholder="Enter name"
            required
          ></b-form-input>
        </b-form-group>
        <!-- Customize modal buttons -->
        <template #modal-footer="{ cancel , ok }">
            <b-button variant="outline-secondary" @click="cancel()"> Cancel </b-button>
            <b-button variant="primary" @click="JSON.stringify(form);patchName(form.name);ok()"> Submit </b-button>
        </template>
      </b-modal>
      <!-- Email modal -->
      <b-modal id="modal-email">
        <b-form-group id="input-email" label="Email:" label-for="input-email">
          <b-form-input
            id="input-email"
            v-model="form.email"
            placeholder="Enter email"
            required
          ></b-form-input>
        </b-form-group>
        <!-- Customize modal buttons -->
        <template #modal-footer="{ cancel , ok }">
            <b-button variant="outline-secondary" @click="cancel()"> Cancel </b-button>
            <b-button variant="primary" @click="JSON.stringify(form);patchEmail(form.email);ok()"> Submit </b-button>
        </template>
      </b-modal>
      <!-- Address modal -->
      <b-modal id="modal-address">
        <b-form-group id="input-address" label="Address:" label-for="input-address">
          <b-form-input
            id="input-address"
            v-model="form.address"
            placeholder="Enter address"
            required
          ></b-form-input>
        </b-form-group>
        <!-- Customize modal buttons -->
        <template #modal-footer="{ cancel , ok }">
            <b-button variant="outline-secondary" @click="cancel()"> Cancel </b-button>
            <b-button variant="primary" @click="JSON.stringify(form);patchAddress(form.address);ok()"> Submit </b-button>
        </template>
      </b-modal>
        <!-- Phone number modal -->
        <b-modal id="modal-phone-number">
        <b-form-group id="input-phone-number" label="Phone Number:" label-for="input-phone-number">
          <b-form-input
            id="input-phone-number"
            v-model="form.phoneNumber"
            placeholder="Enter phone number"
            required
          ></b-form-input>
        </b-form-group>
        <!-- Customize modal buttons -->
        <template #modal-footer="{ cancel , ok }">
            <b-button variant="outline-secondary" @click="cancel()"> Cancel </b-button>
            <b-button variant="primary" @click="JSON.stringify(form);patchPhoneNumber(form.phoneNumber);ok()"> Submit </b-button>
        </template>
      </b-modal>
    </div>
</template>

<style>
#jumbotron{
    font-family: monospace;
}

#info-container{
    padding-left: 5%;
}

#text-field{
  margin-right: 3%;
}

#information{
  margin-right: 3%;
}

</style>

<script>
import { Api } from '@/Api'
import HeaderBar from '@/components/HeaderBar'

export default ({
  name: 'account-page',
  data() {
    return {
      userInfo: '',
      form: {
        username: '',
        name: '',
        email: '',
        address: '',
        phoneNumber: ''
      }
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
    // this.fillForm()
  },
  beforeUpdate() {
    this.getCustomer()
  },
  methods: {
    onSubmit(event) {
      event.preventDefault()
      JSON.stringify(this.form)
    },
    async getCustomer() {
      Api.get('/v1/customers/' + this.username)
        .then(response => {
          const userInfo = response.data
          this.userInfo = userInfo
          return this.userInfo
        }).catch(error => {
          console.log(error)
        })
    },
    fillForm() {
      this.form.username = this.userInfo.username
      this.form.name = this.userInfo.name
      this.form.email = this.userInfo.email
      this.form.address = this.userInfo.address
      this.form.phoneNumber = this.userInfo.phoneNumber
    },
    async patchUsername(newValue) {
      Api.patch('/v1/customers/' + this.username, {
        username: newValue
      })
        .then(response => console.log(response.data))
        .catch(error => console.error(error))
    },
    async patchName(newValue) {
      Api.patch('/v1/customers/' + this.username, {
        name: newValue
      })
        .then(response => console.log(response.data))
        .catch(error => console.error(error))
    },
    async patchEmail(newValue) {
      Api.patch('/v1/customers/' + this.username, {
        email: newValue
      })
        .then(response => console.log(response.data))
        .catch(error => console.error(error))
    },
    async patchAddress(newValue) {
      Api.patch('/v1/customers/' + this.username, {
        address: newValue
      })
        .then(response => console.log(response.data))
        .catch(error => console.error(error))
    },
    async patchPhoneNumber(newValue) {
      Api.patch('/v1/customers/' + this.username, {
        phoneNumber: newValue
      })
        .then(response => console.log(response.data))
        .catch(error => console.error(error))
    }
  }
})
</script>
