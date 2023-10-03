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

        <b-button v-b-modal.modal-login variant="primary" class="mx-3">Log In</b-button>

      </b-navbar-nav>
    </b-collapse>
  </b-navbar>

  <b-modal id="modal-login" ok-title="Close" ok-only="true" title="Log In">
    <b-form>

      <b-form-group
        id="input-group-1"
        label="Username:"
        label-for="username-input">
        <b-form-input
          id="username-input"
          v-model="form.username"
          type="username"
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
      <b-button type="submit" variant="success">Log in</b-button>
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
      login();
    },
    login(){
      Api.post(`/api/login`, {
        username: form.username,
        password: form.password
      }).then(function (res) {
        if(res.status === 200 && `token` in res.body){
          this.$session.start();
          this.$session.set('jwt', res.body.token);
          Vue.http.headers.common['Authorization'] = 'Bearer ' + response.body.token;
          console.log('Logged in!');
        }
      }, function (err){
        console.log(err);
      })
    }
  }
}
</script>
