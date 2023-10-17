<script>

import { Api } from '@/Api'

export default {
  name: 'Register',
  data() {
    return {
      form: {
        username: '',
        password: '',
        name: 'test name',
        email: '',
        address: '',
        phoneNumber: '',
        DOB: '1.1.2000',
        tickets: []
      }
    }
  },
  methods: {
    onSubmit(event) {
      this.register()
      event.preventDefault()
    },
    register() {
      Api.post('/v1/customers/register', {
        username: this.form.username,
        password: this.form.password,
        name: this.form.name,
        email: this.form.email,
        address: this.form.address + ' ' + this.form.postalCode + ' ' + this.form.city,
        phoneNumber: this.form.phoneNumber,
        tickets: [],
        DOB: '01.01.2000'
      }).then((res) => {
        console.log(res)
        if (res.status === 201) {
          alert('Account registered!')
          console.log('Registered!')
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
            header="Kirby's Ticket Emporium"
            class="mb-2"
            style="width: 22rem;">
            <div class="form-container">
                <b-form id="form" @submit="onSubmit">
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

                    <b-form-group
                        id="input-group-3"
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
                        id="input-group-4"
                        label="Address:"
                        label-for="address-input">
                        <b-form-input
                            id="address-input"
                            v-model="form.address"
                            placeholder="1234 Main St"
                            required>
                        </b-form-input>
                    </b-form-group>

                    <b-form-group
                        id="input-group-5"
                        label="Postal code:"
                        label-for="postalCode-input">
                        <b-form-input
                            id="postalCode-input"
                            v-model="form.postalCode"
                            placeholder="Enter Zip code"
                            required>
                        </b-form-input>
                    </b-form-group>

                    <b-form-group
                        id="input-group-6"
                        label="City:"
                        label-for="city-input">
                        <b-form-input
                            id="city-input"
                            v-model="form.city"
                            placeholder="Enter city"
                            required>
                        </b-form-input>
                    </b-form-group>

                    <b-form-group
                        id="input-group-7"
                        label="Phone number:"
                        label-for="phone-input">
                        <b-form-input
                            id="phone-input"
                            v-model="form.phoneNumber"
                            placeholder="Enter phone number"
                            required>
                        </b-form-input>
                    </b-form-group>
                    <b-button v-on:click="login" type="submit" variant="success">Register</b-button>
                </b-form>
            </div>
        </b-card>
    </div>
</template>

<style>
    #bg-img{
        background-image: url('https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');
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

    #form {
      width: auto;
    }

    #form-card {
        position: absolute;
        top: 50%; /* Center vertically */
        left: 50%; /* Center horizontally */
        transform: translate(-50%, -50%); /* Center both horizontally and vertically */
        z-index: 1; /* Place the form above the background */
    }
</style>
