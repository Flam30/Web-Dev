<template>
  <div id="navbar">
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="#">(not) Ticketmaster</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item href="/">Home</b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form>

        <b-button v-if="!this.$session.exists()" v-b-modal.modal-login variant="primary" class="mx-3">Log In</b-button>
        <b-button v-else v-on:click="logout" variant="primary" class="mx-3">Log Out</b-button>

      </b-navbar-nav>
    </b-collapse>
  </b-navbar>

  <b-modal id="modal-login" ok-title="Close" :ok-only=true title="Log In">
    <b-form>

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
      <b-button v-on:click="login" variant="success">Log in</b-button>
      <p>Don't have an account yet? <a href="/register">Register here.</a></p>
    </b-form>
  </b-modal>
</div>
</template>

<style>
#navbar {
  filter: drop-shadow(0px 10px 12px #000000);
}
</style>

<script>
import { Api } from '@/Api'

export default {
  data() {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    onSubmit(event) {
      this.login()
    },
    login() {
      Api.post('/auth/login', {
        username: this.form.username,
        password: this.form.password
      }).then((res) => {
        if (res.status === 200) {
          this.$session.start()
          this.$session.set('jwt', res.data.token)
          console.log('Logged in!')
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    logout() {
      this.$session.destroy()
    }
  }
}
</script>
