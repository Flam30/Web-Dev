<template>
  <div id="navbar">
  <b-navbar class="custom-navbar-class" toggleable="md" type="dark">
    <b-navbar-brand href="/">Kirby's Ticket Emporium</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item class="header-item" href="/">Events</b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav>
        <b-nav-item class="header-item" href="/venues">Venues</b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav>
        <b-nav-item v-if="!isLoggedIn" class="header-item" href="/account/RatKing">Account</b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav>
        <b-nav-item v-if="!isLoggedIn" class="header-item" href="#">Tickets</b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto">
        <b-button v-if="!isLoggedIn" v-b-modal.modal-login variant="primary" class="mx-3">Log In</b-button>
        <b-button v-else v-on:click="logout" variant="primary" class="mx-3">Log Out</b-button>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>

  <b-modal id="modal-login" ok-title="Close" :ok-only=true title="Log In">
    <b-form @submit="onSubmit">

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
      <b-button v-on:click="login" type="submit" variant="success">Log in</b-button>
      <p>Don't have an account yet? <a href="/register">Register here.</a></p>
      <p>Are you an organizer? <a href="/oganizer-login">Log in or register here.</a></p>
    </b-form>
  </b-modal>
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
      isLoggedIn: false
    }
  },
  methods: {
    onSubmit(event) {
      this.login()
      event.preventDefault()
    },
    login() {
      Api.post('/v1/customers/login', {
        username: this.form.username,
        password: this.form.password
      }).then((res) => {
        console.log(res)
        if (res.status === 200) {
          this.$session.start()
          this.$session.set('jwt', res.data.token)
          this.$session.set('user-id', res.data.customerId)
          this.$session.set('account-type', 'customer')
          this.isLoggedIn = true
          console.log('Logged in!')
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
      this.$router.go()
    }
  }
}
</script>
