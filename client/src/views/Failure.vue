<script>
export default {
  name: 'Failure',
  data() {
    return {
      message: '3',
      timerCount: 3
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
    <div id="failure-wrapper">
    <p id="failure-title">Payment failed!</p>
    <p id="failure-description">Redirecting to the home page <br /> in {{ message }} seconds...</p>
  </div>
  </div>
</template>

<style>
#failure-title {
  font-size: 60px;
}

#failure-description {
  font-size: 24px;
}

#failure-wrapper{
  height: 40%;
  width: 80%;
  background-color: #FF6961;
  border: 7px #CC0A00 solid;
  border-radius: 10px;
  margin: 100px auto;
  text-align: center;
}
</style>
