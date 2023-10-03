<script>
export default {
  name: 'Success',
  data() {
    return {
      message: 'none'
    }
  }
}
</script>

<template >
  <div id="taylor-bg">
    <p id="wooo">CONGRATS, YOU GOT THE TICKETS!!!!!!!!!!!!!!!!!!!!!!!</p>
  </div>
</template>

<style>
#taylor-bg{
    text-align: center;
    width: 100%;
    height: 100vh;
    background-size: cover;
    background-image: url(https://media-cldnry.s-nbcnews.com/image/upload/t_fit-760w,f_auto,q_auto:best/rockcms/2023-07/230711-taylor-swift-se-1258p-62ffe5.jpg);
}
#wooo{
    font-family: 'Comic Sans MS', 'Comic Sans', cursive;
    font-size: 80px;
    color: red;
    position: absolute;
    top: 30%;
}
</style>
