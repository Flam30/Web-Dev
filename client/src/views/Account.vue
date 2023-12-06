<script>
import { Api } from '@/Api'
import HeaderBar from '@/components/HeaderBar'
import MyTickets from '@/components/MyTickets'

export default {
  name: 'account-page',
  data() {
    return {
      form: {
        username: '',
        name: '',
        email: '',
        address: '',
        phoneNumber: '',
        tickets: []
      },
      formO: {
        username: '',
        name: '',
        email: '',
        address: '',
        phoneNumber: '',
        events: []
      },
      accountType: ''
    }
  },
  props: {
    username: String
  },
  components: {
    HeaderBar,
    MyTickets
  },
  created() {
    this.accountType = this.$session.get('account-type')
    if (this.accountType === 'customer') {
      this.getCustomer()
    } else {
      this.getOrganizer()
    }
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
    },
    async getOrganizer() {
      Api.get('/v1/organizers/' + this.username)
        .then(response => {
          const userInfo = response.data
          this.formO = userInfo
          console.log(userInfo)
        }).catch(error => {
          console.log(error)
        })
    },
    async patchUsernameO(newValue) {
      Api.patch('/v1/organizers/' + this.username, {
        username: newValue
      })
        .then(response => console.log(response.data))
        .catch(error => console.error(error))
    },
    async patchNameO(newValue) {
      Api.patch('/v1/organizers/' + this.username, {
        name: newValue
      })
        .then(response => console.log(response.data))
        .catch(error => console.error(error))
    },
    async patchEmailO(newValue) {
      Api.patch('/v1/organizers/' + this.username, {
        email: newValue
      })
        .then(response => console.log(response.data))
        .catch(error => console.error(error))
    },
    async patchAddressO(newValue) {
      Api.patch('/v1/organizers/' + this.username, {
        address: newValue
      })
        .then(response => console.log(response.data))
        .catch(error => console.error(error))
    },
    async patchPhoneNumberO(newValue) {
      Api.patch('/v1/organizers/' + this.username, {
        phoneNumber: newValue
      })
        .then(response => console.log(response.data))
        .catch(error => console.error(error))
    },
    async getEventName(id) {
      Api.get('/v1/events/' + id)
        .then(res => {
          return res.data.name
        })
    },
    async getEventDescription(id) {
      Api.get('/v1/events/' + id)
        .then(res => {
          return res.data.description
        })
    },
    async deleteAccount(username) {
      console.log(username)
      if (username === undefined) {
        return
      }
      if (this.accountType === 'customer') {
        Api.delete('/v1/customers/' + username)
          .then(res => {
            this.$session.destroy()
            this.$router.push('/')
          })
      } else {
        Api.delete('/v1/organizers/' + username)
          .then(res => {
            this.$session.destroy()
            this.$router.push('/')
          })
      }
    }
  }
}
</script>

<template>
  <div>
    <img class="home-background" src="./..\assets\LightViolet.png">
    <HeaderBar></HeaderBar>
    <div id="jumbotron" class="container">
      <h1 v-if="accountType === 'customer'"> Hello, {{form.name}}!</h1>
      <h1 v-if="accountType === 'organizer'"> Hello, {{formO.name}}!</h1>
      <h3> Here you can find all of your account information. </h3>
    </div>

    <div class="container">
      <b-tabs pills card>
        <b-tab v-if="accountType === 'customer'" title="Your Tickets" active class="main-body">
          <MyTickets
            v-for="ticket in form.tickets" :key="ticket._id"
            :id="ticket"
            imageUrl="https://images.unsplash.com/photo-1481349518771-20055b2a7b24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmFuZG9tfGVufDB8fDB8fHww&w=1000&q=80"
          ></MyTickets>
        </b-tab>

        <b-tab title="Settings" class="main-body">
          <b-container class="list-container" v-if="accountType==='organizer'">
            <div class="list-item">
              <b-list-group horizontal="sm">
                <b-list-group-item>Username:</b-list-group-item>
                <b-list-group-item>{{ formO.username }}</b-list-group-item>
                <b-list-group-item><b-button size="sm" variant="primary" v-b-modal.o-username>Edit</b-button></b-list-group-item>
                </b-list-group>
              </div>
              <div class="list-item">
                <b-list-group horizontal="sm">
                  <b-list-group-item>Name:</b-list-group-item>
                  <b-list-group-item>{{ formO.name }}</b-list-group-item>
                  <b-list-group-item><b-button size="sm" variant="primary" v-b-modal.o-name>Edit</b-button></b-list-group-item>
                </b-list-group>
              </div>
              <div class="list-item">
                <b-list-group horizontal="sm">
                  <b-list-group-item>Email:</b-list-group-item>
                  <b-list-group-item>{{ formO.email }}</b-list-group-item>
                  <b-list-group-item><b-button size="sm" variant="primary" v-b-modal.o-email>Edit</b-button></b-list-group-item>
                </b-list-group>
              </div>
              <div class="list-item">
                <b-list-group horizontal="sm">
                  <b-list-group-item>Address:</b-list-group-item>
                  <b-list-group-item>{{ formO.address }}</b-list-group-item>
                  <b-list-group-item><b-button size="sm" variant="primary" v-b-modal.o-address>Edit</b-button></b-list-group-item>
                </b-list-group>
              </div>
              <div class="list-item">
                <b-list-group horizontal="sm">
                  <b-list-group-item>Phone number:</b-list-group-item>
                  <b-list-group-item>{{ formO.phoneNumber }}</b-list-group-item>
                  <b-list-group-item><b-button size="sm" variant="primary" v-b-modal.o-phone-number>Edit</b-button></b-list-group-item>
                </b-list-group>
              </div>

            <b-button variant="danger" @click="deleteAccount(formO.username)"> Delete account </b-button>
          </b-container>

          <!-- Username modal -->
          <b-modal id="o-username">
            <b-form-group id="input-username" label="Username:" label-for="input-username">
                <b-form-input
                id="input-username"
                v-model="formO.username"
                placeholder="Enter username"
                required
                ></b-form-input>
            </b-form-group>
            <!-- Customize modal buttons -->
            <template #modal-footer="{ cancel , ok }">
                <b-button variant="outline-secondary" @click="cancel()"> Cancel </b-button>
                <b-button variant="primary" @click="JSON.stringify(formO);patchUsernameO(formO.username);ok()"> Submit </b-button>
            </template>
          </b-modal>

          <!-- Name modal -->
          <b-modal id="o-name">
            <b-form-group id="input-name" label="Name:" label-for="input-name">
                <b-form-input
                id="input-name"
                v-model="formO.name"
                placeholder="Enter name"
                required
                ></b-form-input>
            </b-form-group>
            <!-- Customize modal buttons -->
            <template #modal-footer="{ cancel , ok }">
                <b-button variant="outline-secondary" @click="cancel()"> Cancel </b-button>
                <b-button variant="primary" @click="JSON.stringify(formO);patchNameO(formO.name);ok()"> Submit </b-button>
            </template>
          </b-modal>

          <!-- Email modal -->
          <b-modal id="o-email">
            <b-form-group id="input-email" label="Email:" label-for="input-email">
                <b-form-input
                id="input-email"
                v-model="formO.email"
                placeholder="Enter email"
                required
                ></b-form-input>
            </b-form-group>
            <!-- Customize modal buttons -->
            <template #modal-footer="{ cancel , ok }">
                <b-button variant="outline-secondary" @click="cancel()"> Cancel </b-button>
                <b-button variant="primary" @click="JSON.stringify(formO);patchEmailO(formO.email);ok()"> Submit </b-button>
            </template>
          </b-modal>

          <!-- Address modal -->
          <b-modal id="o-address">
            <b-form-group id="input-address" label="Address:" label-for="input-address">
                <b-form-input
                id="input-address"
                v-model="formO.address"
                placeholder="Enter address"
                required
                ></b-form-input>
            </b-form-group>
            <!-- Customize modal buttons -->
            <template #modal-footer="{ cancel , ok }">
                <b-button variant="outline-secondary" @click="cancel()"> Cancel </b-button>
                <b-button variant="primary" @click="JSON.stringify(formO);patchAddressO(formO.address);ok()"> Submit </b-button>
            </template>
          </b-modal>

          <!-- Phone number modal -->
          <b-modal id="o-phone-number">
            <b-form-group id="input-phone-number" label="Phone Number:" label-for="input-phone-number">
                <b-form-input
                id="input-phone-number"
                v-model="formO.phoneNumber"
                placeholder="Enter phone number"
                required
                ></b-form-input>
            </b-form-group>
            <!-- Customize modal buttons -->
            <template #modal-footer="{ cancel , ok }">
                <b-button variant="outline-secondary" @click="cancel()"> Cancel </b-button>
                <b-button variant="primary" @click="JSON.stringify(formO);patchPhoneNumberO(formO.phoneNumber);ok()"> Submit </b-button>
            </template>
          </b-modal>

          <b-container class="list-container" v-if="accountType==='customer'">
            <div class="list-item">
              <b-list-group horizontal="sm">
                <b-list-group-item>Username:</b-list-group-item>
                <b-list-group-item>{{ form.username }}</b-list-group-item>
                <b-list-group-item><b-button size="sm" variant="primary" v-b-modal.modal-username>Edit</b-button></b-list-group-item>
                </b-list-group>
              </div>
              <div class="list-item">
                <b-list-group horizontal="sm">
                  <b-list-group-item>Name:</b-list-group-item>
                  <b-list-group-item>{{ form.name }}</b-list-group-item>
                  <b-list-group-item><b-button size="sm" variant="primary" v-b-modal.modal-name>Edit</b-button></b-list-group-item>
                </b-list-group>
              </div>
              <div class="list-item">
                <b-list-group horizontal="sm">
                  <b-list-group-item>Email:</b-list-group-item>
                  <b-list-group-item>{{ form.email }}</b-list-group-item>
                  <b-list-group-item><b-button size="sm" variant="primary" v-b-modal.modal-email>Edit</b-button></b-list-group-item>
                </b-list-group>
              </div>
              <div class="list-item">
                <b-list-group horizontal="sm">
                  <b-list-group-item>Address:</b-list-group-item>
                  <b-list-group-item>{{ form.address }}</b-list-group-item>
                  <b-list-group-item><b-button size="sm" variant="primary" v-b-modal.modal-address>Edit</b-button></b-list-group-item>
                </b-list-group>
              </div>
              <div class="list-item">
                <b-list-group horizontal="sm">
                  <b-list-group-item>Phone number:</b-list-group-item>
                  <b-list-group-item>{{ form.phoneNumber }}</b-list-group-item>
                  <b-list-group-item><b-button size="sm" variant="primary" v-b-modal.modal-phone-number>Edit</b-button></b-list-group-item>
                </b-list-group>
              </div>

            <b-button variant="danger" @click="deleteAccount(form.username)"> Delete account </b-button>
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
#jumbotron {
  background-color: #DF77D4;
}

.home-background {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  object-fit: cover;
  z-index: -1;
}

h1 {
  font-size: 300%;
  font-family: monospace;
  color: whitesmoke;
  padding: 0.5rem;
  text-align: center;
  margin-bottom: 0%;
}

h3 {
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

.list-item {
  margin-bottom: 10px;
}
</style>
