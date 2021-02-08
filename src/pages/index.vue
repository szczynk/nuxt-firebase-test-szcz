<template>
  <div class="container">
    <div>
      <NuxtLogo />
    </div>
    <h1 class="title">nuxt-firebase-test-szcz</h1>
    <div>
      <ColorModePicker />
      <p>
        Go to
        <NuxtLink to="/light"> light page </NuxtLink>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  head: {
    title: 'Demo of @nuxtjs/color-mode',
  },
}
</script>

<style>
.container {
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 80px;
  color: #35495e;
  letter-spacing: 1px;
}
</style>
