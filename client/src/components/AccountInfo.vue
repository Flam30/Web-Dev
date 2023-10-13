<template>
    <div id="account-info">
        <div>
            <h4 id="info-title"> Your information </h4>
        </div>
        <div class="info-wrapper">
            <div class="column" id="text-field">
                <p> Username: </p>
                <p> Name: </p>
                <p> Email: </p>
                <p> Address: </p>
                <p> Phone number: </p>
            </div>

            <div class="column" id="information">
                <p> {{this.userInfo.username}} </p>
                <p> {{this.userInfo.name}} </p>
                <p> {{this.userInfo.email}} </p>
                <p> {{this.userInfo.address}} </p>
                <p> {{this.userInfo.phoneNumber}} </p>
            </div>

            <div>
                <b-form @submit="onSubmit()">
                    <b-form-input v-model="form"></b-form-input>
                    <b-button type="submit" variant="success"> Save </b-button>
                </b-form>
            </div>
        </div>
    </div>
</template>

<style>
#account-info{
    width: 85%;
    background-color: lightcoral;
    color: greenyellow;
    padding: 2%;
}
</style>

<script>
export default {
  data() {
    return {
      form: {
        username: this.props.userInfo.username,
        name: this.props.userInfo.name,
        email: this.props.userInfo.email,
        address: this.props.userInfo.address,
        phoneNumber: this.props.userInfo.phoneNumber
      }
    }
  },
  props: {
    userInfo: Object
  },
  methods: {
    onSubmit() {
      console.log(this.form)
      alert(JSON.stringify(this.form))
    },
    get(property) {
      if (property === 'username') {
        return JSON.stringify(this.form.username)
      }
    }
  }
}
</script>
