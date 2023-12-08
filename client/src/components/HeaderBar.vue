<template>
<div>
  <div id="navbar">
    <b-navbar class="custom-navbar-class" toggleable="md" type="dark">
      <b-navbar-brand href="/">Kirby's Ticket Emporium</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item class="header-item" href="/">Events</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav>
          <b-nav-item v-if="this.$session.get('account-type') === 'customer'" class="header-item" :href="accountCustomerPageLink">Account</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav>
          <b-nav-item v-if="this.$session.get('account-type') === 'organizer'" class="header-item" :href="organizerPageLink">Organizer Panel</b-nav-item>
          <b-nav-item v-if="this.$session.get('account-type') === 'organizer'" class="header-item" :href="accountOrganizerPageLink">Account</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-button v-if="!isLoggedIn" v-b-modal.modal-login variant="success" class="mx-3">Log In</b-button>
          <b-button v-else v-on:click="logout" variant="danger" class="mx-3">Log Out</b-button>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <b-modal id="modal-login" ok-title="Close" :ok-only=true title="Log In">
      <b-tabs content-class="mt-3" id="login-tabs">
        <b-tab title="Customer" active><p></p>
          <b-form @submit="onSubmitUser">
            <b-form-group
              id="input-group-1"
              label="Username:"
              label-for="username-input">
              <b-form-input
                id="username-input"
                v-model="form.username"
                placeholder="Enter username"
                required>
              </b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-2"
              label="Password:"
              label-for="password-input">
              <b-form-input
                id="password-input"
                v-model="form.password"
                type="password"
                placeholder="Enter password"
                required>
              </b-form-input>
            </b-form-group>
            <b-button v-on:click="userLogin" type="submit" variant="success">Log in</b-button>
            <p style="margin-top: 1rem; margin-bottom: 0;">Don't have an account yet? <a href="/register">Register here.</a></p>
          </b-form>
        </b-tab>
        <b-tab title="Organizer"><p></p>
          <b-form @submit="onSubmitOrganizer">
            <b-form-group
              id="org-input-group-1"
              label="Username:"
              label-for="username-input">
              <b-form-input
                id="org-username-input"
                v-model="form.username"
                placeholder="Enter username"
                required>
              </b-form-input>
            </b-form-group>

            <b-form-group
              id="org-input-group-2"
              label="Password:"
              label-for="password-input">
              <b-form-input
                id="org-password-input"
                v-model="form.password"
                type="password"
                placeholder="Enter password"
                required>
              </b-form-input>
            </b-form-group>
            <b-button v-on:click="organizerLogin" type="submit" variant="success">Log in</b-button>
            <p style="margin-top: 1rem; margin-bottom: 0;">Don't have an account yet? <a href="/organizer-register">Register here.</a></p>
          </b-form>
        </b-tab>
      </b-tabs>
    </b-modal>
  </div>
  <img class="banner" src="./..\assets\Banner.png">
</div>
</template>

<style>
.header-item {
    display: block;
    font-size: 20px;
}
.custom-navbar-class {    /* Changing navbar color */
  background-color: #ee82ee;
}
#navbar {
  filter: drop-shadow(0px 0px 7px #000000);
}
.banner {
    height: 80px;
    max-width: 100%;
    object-fit: cover;
    margin: auto;
    padding: 0%;
}
#login-tabs {
  width: 100%;
}
</style>

<script>
import { Api } from '@/Api'

export default {
  data() {
    return {
      userId: '',
      form: {
        username: '',
        password: ''
      },
      isLoggedIn: false,
      organizerPageLink: '',
      accountCustomerPageLink: '',
      accountOrganizerPageLink: ''
    }
  },
  created() {
    this.checkSession()
    this.getOrganizerPageLink()
    this.getAccountOrganizerPageLink()
    this.getAccountCustomerPageLink()
  },
  methods: {
    onSubmitUser(event) {
      this.userLogin()
      event.preventDefault()
    },
    onSubmitOrganizer(event) {
      this.organizerLogin()
      event.preventDefault()
    },
    checkSession() {
      if (this.$session.exists()) {
        this.isLoggedIn = true
      } else {
        this.isLoggedIn = false
      }
    },
    userLogin() {
      Api.post('/v1/customers/login', {
        username: this.form.username,
        password: this.form.password
      }).then((res) => {
        if (res.status === 200) {
          this.$session.start()
          this.$session.set('jwt', res.data.token)
          this.$session.set('user-id', res.data.customerId)
          this.$session.set('account-type', 'customer')
          this.isLoggedIn = true
          this.$router.go()
        } else {
          alert('Something went wrong! Please try again.')
        }
      }).catch((_err) => {
        console.log(_err.response.data.message)
      })
    },
    organizerLogin() {
      Api.post('/v1/organizers/login', {
        username: this.form.username,
        password: this.form.password
      }).then((res) => {
        if (res.status === 200) {
          this.$session.start()
          this.$session.set('jwt', res.data.token)
          this.$session.set('user-id', res.data.organizerId)
          this.$session.set('account-type', 'organizer')
          this.isLoggedIn = true
          this.$router.go()
        } else {
          alert('Something went wrong! Please try again.')
        }
      }).catch((_err) => {
        console.log(_err.response.data.message)
      })
    },
    logout() {
      this.$session.destroy()
      this.isLoggedIn = false
      if (this.$route.path === '/') {
        this.$router.go()
      } else {
        this.$router.push('/')
      }
    },
    getOrganizerPageLink() {
      const accountType = this.$session.get('account-type')
      const userId = this.$session.get('user-id')
      if (accountType === 'organizer' && userId) {
        this.organizerPageLink = `/organizer/${userId}`
      } else {
        this.organizerPageLink = '/'
      }
    },
    getAccountOrganizerPageLink() {
      const accountType = this.$session.get('account-type')
      const userId = this.$session.get('user-id')
      if (accountType === 'organizer' && userId) {
        this.accountOrganizerPageLink = `/account/${userId}`
      } else {
        this.accountOrganizerPageLink = '/'
      }
    },
    getAccountCustomerPageLink() {
      const accountType = this.$session.get('account-type')
      const userId = this.$session.get('user-id')
      if (accountType === 'customer' && userId) {
        this.accountCustomerPageLink = `/account/${userId}`
      } else {
        this.accountCustomerPageLink = '/'
      }
    }
  }
}
</script>
