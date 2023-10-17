<template>
    <div>
        <img class="home-background" src="./..\assets\LightViolet.png">
        <HeaderBar></HeaderBar>

        <div id="jumbotron" class="container">
            <h1> Hello, {{form.name}}!</h1>
            <h3> Here you can find all of your account information. </h3>
        </div>

        <div id="user-info" class="container">
                <b-tabs>
                    <b-tab title="Your Tickets" active class="main-body">
                        <p> IM GONNA FUCKING KILL MYSELF </p>
                    </b-tab>

                    <b-tab title="Settings" class="main-body">
                        <b-container>
                            <b-row>
                                <b-col id="text-field" cols="2">
                                    <p> Username: </p>
                                    <p> Name: </p>
                                    <p> Email: </p>
                                    <p> Address: </p>
                                    <p> Phone number: </p>
                                </b-col>

                                <b-col id="information" cols="2">
                                    <p> {{form.username}} </p>
                                    <p> {{form.name}} </p>
                                    <p> {{form.email}} </p>
                                    <p> {{form.address}} </p>
                                    <p> {{form.phoneNumber}} </p>
                                </b-col>

                                <b-col>
                                    <b-button pill variant="primary" v-b-modal.modal-username>Edit</b-button> <br> <!-- Username editor -->
                                    <b-button pill variant="primary" v-b-modal.modal-name>Edit</b-button> <br> <!-- Name editor -->
                                    <b-button pill variant="primary" v-b-modal.modal-email>Edit</b-button> <br> <!-- Email editor -->
                                    <b-button pill variant="primary" v-b-modal.modal-address>Edit</b-button> <br> <!-- Address editor -->
                                    <b-button pill variant="primary" v-b-modal.modal-phone-number>Edit</b-button> <!-- Phone number editor -->
                                </b-col>
                            </b-row>
                        </b-container>

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
                            <b-button variant="primary" @click="JSON.stringify(form);patchUsername(form.username);ok()"> Submit </b-button>
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
                    </b-tab>
                </b-tabs>
        </div>
    </div>
</template>

<style scoped>
.home-background {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  object-fit: cover;
  z-index: -1;
}

h1{
    font-size: 300%;
    font-family: monospace;
    color: whitesmoke;
    padding: 0.5rem;
    text-align: center;
    margin-bottom: 0%;
}

h3{
    font-size: 100%;
    font-family: 'Comic Sans MS';
    color: whitesmoke;
    margin: 0px;
    padding: 0.5rem;
    padding-top: 0;
    text-align: center;
}

.container{
    min-width: 100%;
    padding: 0%;
}

.main-body{
    margin-left: 4%;
    margin-top: 2%;
}

#jumbotron {
    background-color: #DF77D4;
}

#user-info{
    margin: 3%;
    margin-top: 1%;
}
</style>

<script>
import { Api } from '@/Api'
import HeaderBar from '@/components/HeaderBar'

export default {
  name: 'account-page',
  data() {
    return {
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
  },
  methods: {
    async getCustomer() {
      Api.get('/v1/customers/' + this.username)
        .then(response => {
          const userInfo = response.data
          this.form = userInfo
          console.log(userInfo)
        }).catch(error => {
          console.log(error)
        })
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
}
</script>
