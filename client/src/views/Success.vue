<script>
export default {
  name: 'Success',
  data() {
    return {
      message: '5',
      timerCount: 5
    }
  },
  watch: {
    timerCount: {
      handler(value) {
        if (value > 0) {
          setTimeout(() => {
            this.timerCount--
            if (this.timerCount === 0) {
              this.$router.push('/')
            } else {
              this.message = this.timerCount
            }
          }, 1000)
        }
      },
      immediate: true
    }
  }
}
</script>

<template >
  <div id="page-wrapper">
    <HeaderBar></HeaderBar>
    <div id="confirmation-wrapper">
    <p id="confirmation-title">Order confirmed!</p>
    <p id="confirmation-description">Redirecting to the home page <br /> in {{ message }} seconds...</p>
  </div>
  </div>
</template>

<style>
#confirmation-title {
  font-size: 69px;
}

#confirmation-description {
  font-size: 24px;
}

#confirmation-wrapper{
  height: 400px;
  width: 400px;
  background-color: #B0FFAD;
  border: 7px #77DD77 solid;
  border-radius: 10px;
  margin: 100px auto;
  text-align: center;
}
</style>
