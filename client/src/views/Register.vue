<script>

export default {
  name: 'Event',
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
  components: {
  },
  props: {
  },
  methods: {
    onSubmit(event) {
      // TODO
    }
  }
}
</script>

<template>
<div style="display: flex;">
    <img style="object-fit: cover;" class="half" src="https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1">
    <div class="half">
        <b-form id="form">

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

        <b-form-group
            id="input-group-3"
            label="Email address:"
            label-for="email-input">
            <b-form-input
                id="email-input"
                v-model="form.email"
                type="email"
                placeholder="Enter email"
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
                type="address"
                placeholder="Enter mailing address"
                required>
            </b-form-input>
        </b-form-group>

        <b-form-group
            id="input-group-5"
            label="Phone number:"
            label-for="phone-input">
            <b-form-input
                id="phone-input"
                v-model="form.phoneNumber"
                type="phoneNumber"
                placeholder="Enter phone number"
                required>
            </b-form-input>
        </b-form-group>

        <b-button type="submit" variant="success">Register</b-button>
        </b-form>
    </div>
</div>
</template>

<style>
.half{
    margin: 0;
    height: 100vh;
    width: 50%;
    position: relative;
}

#form{
    width: 35%;
    margin: auto;
}
</style>
