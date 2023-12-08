<template>
    <div>
    <b-form id="form" @submit="onSubmit">
        <b-form-group
            id="input-group-1"
            label="Email:"
            label-for="email-input">
            <b-form-input
                id="email-input"
                v-model="form.email"
                placeholder="Enter email"
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
        </b-form>
    </div>
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'Organizer Login',
  data() {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    onSubmit(event) {
      this.login()
      event.preventDefault()
    },
    login() {
      Api.post('/auth/orgLogin', {
        email: this.form.email,
        password: this.form.password
      }).then((res) => {
        if (res.status === 200) {
          alert('Logged in!')
        } else {
          alert('Something went wrong! Please try again.')
        }
      }).catch((_err) => {
        if (_err.response.status === 400) {
          alert('Email is already in use. Please try again.')
        } else {
          console.log(_err.response)
        }
      })
    }
  }
}
</script>
