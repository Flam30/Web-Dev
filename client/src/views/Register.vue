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
    <img style="object-fit: cover;" class="half-image" src="https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1">
    <div class="half-form">
        <div class="form-container">
            <div class="left-section">
                <h1>Kirby's Ticket Emporium</h1>
            </div>
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
                    label="Postal code:"
                    label-for="postalCode-input">
                    <b-form-input
                        id="postalCode-input"
                        v-model="form.postalCode"
                        type="postalCode"
                        placeholder="Enter postal code"
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
                        type="city"
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
                        type="phoneNumber"
                        placeholder="Enter phone number"
                        required>
                    </b-form-input>
                </b-form-group>
            </b-form>
            <div class="button-container">
                <b-button type="submit" variant="success">Sign Up</b-button>
            </div>
        </div>
    </div>
</div>
</template>

<style>
.container {
  display: flex;
  width: 100%; /* Set the width of the container */
}

.half-image{
    margin: 0;
    height: 100vh;
    width: 50%;
    position: relative;
}

.half-form {
    width: 70%; /* Take up half of the container's width */
    display: flex;
    justify-content: center;
    align-items: center;
}

.left-section {
    text-align: left; /* Align text to the left */
    align-self: flex-start;
}

/* Style for the heading */
.left-section h1 {
    font-size: 24px;
    margin-bottom: 10px; /* Add margin for spacing */
}

.form-container {
    width: 60%; /* Adjust the width as needed */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
}

.form-container:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

#form{
    width: 100%;
    margin: 0 auto;
    padding: 0%;
}

.button-container{
    align-self: flex-end;
}
</style>
