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
        phoneNumber: ''
      }
    }
  },
  methods: {
    onSubmit(event) {
      this.register()
      event.preventDefault()
    },
    register() {
      Api.post('/auth/register', {
        username: this.form.username,
        password: this.form.password,
        name: this.form.name,
        email: this.form.email,
        address: this.form.address + ' ' + this.form.postalCode + ' ' + this.form.city,
        phoneNumber: this.form.phoneNumber
      }).then((res) => {
        console.log(res)
        if (res.status === 200) {
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
            header="Organizer account"
            class="mb-2"
            style="width: 22rem;">
            <div class="form-container">

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

    #form-card {
        position: absolute;
        top: 50%; /* Center vertically */
        left: 50%; /* Center horizontally */
        transform: translate(-50%, -50%); /* Center both horizontally and vertically */
        z-index: 1; /* Place the form above the background */
    }
</style>
