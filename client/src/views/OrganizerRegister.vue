<script>

import { Api } from '@/Api'

export default {
  name: 'Register',
  data() {
    return {
      form: {
        username: '',
        password: '',
        name: '',
        email: '',
        address: '',
        phoneNumber: '',
        events: []
      }
    }
  },
  methods: {
    onSubmit(event) {
      this.register()
      event.preventDefault()
    },
    register() {
      Api.post('/v1/organizers/register', {
        username: this.form.username,
        password: this.form.password,
        name: this.form.name,
        email: this.form.email,
        address: this.form.address,
        phoneNumber: this.form.phoneNumber,
        events: []
      }).then((res) => {
        if (res.status === 201) {
          alert('Account registered!')
          console.log('Registered!')
          this.$router.push('/')
        } else {
          alert('Something went wrong! Please try again.')
        }
      }).catch((_err) => {
        if (_err.response.status === 400) {
          alert('Username already registered. Please try again.')
        } else {
          console.log(_err.response)
        }
      })
    }
  }
}

</script>

<template>
    <div>
        <div id="bg-img"></div>
        <b-card id="form-card"
          bg-variant="light"
          class="mb-2"
          style="width: 22rem;">
          <div class="form-container">
            <b-form id="form" @submit="onSubmit">
              <b-form-group
                id="input-group-1"
                label="Name:"
                label-for="name-input">
                <b-form-input
                    id="name-input"
                    v-model="form.name"
                    placeholder="Enter name"
                    required>
                  </b-form-input>
              </b-form-group>

              <b-form-group
                id="input-group-2"
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
                id="input-group-3"
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

              <b-form-group
                id="input-group-4"
                label="Email address:"
                label-for="email-input">
                <b-form-input
                    id="email-input"
                    v-model="form.email"
                    type="email"
                    placeholder="name@example.com"
                    required>
                </b-form-input>
              </b-form-group>

              <b-form-group
                id="input-group-5"
                label="Address:"
                label-for="address-input">
                <b-form-input
                    id="address-input"
                    v-model="form.address"
                    placeholder="Street, City, Country"
                    required>
                </b-form-input>
              </b-form-group>

              <b-form-group
                id="input-group-6"
                label="Phone number:"
                label-for="phone-input">
                <b-form-input
                    id="phone-input"
                    v-model="form.phoneNumber"
                    placeholder="Enter phone number"
                    required>
                </b-form-input>
              </b-form-group>

              <b-button type="submit" variant="success">Register</b-button>
            </b-form>
          </div>
        </b-card>
    </div>
</template>

<style>
    #bg-img{
        background-image: ('https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');
        background-size: cover; /* Crop and cover the entire container */
        background-repeat: no-repeat;
        background-position: center center;
        width: 100%;
        height: 100vh; /* Set the background container to full viewport height */
        position: relative;
        overflow: hidden; /* Hide any image overflow */
    }

    .card-container{
        position: absolute;
        top: 50%; /* Center vertically */
        left: 50%; /* Center horizontally */
        transform: translate(-50%, -50%); /* Center both horizontally and vertically */
        z-index: 1; /* Place the form above the background */
    }

    #form-card {
        position: absolute;
        top: 50%; /* Center vertically */
        left: 50%; /* Center horizontally */
        transform: translate(-50%, -50%); /* Center both horizontally and vertically */
        z-index: 1; /* Place the form above the background */
    }
</style>
