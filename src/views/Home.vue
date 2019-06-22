<template>
  <div id="home" class="container is-widescreen">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <ChatView></ChatView>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import ChatView from '@/components/ChatView.vue'

export default {
  name: 'home',
  components: {
    ChatView
  }
}
</script>
