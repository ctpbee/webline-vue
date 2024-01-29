<route lang="yaml">
  meta:
    title: websocket测试
  </route>

<script setup>
import { ref } from 'vue'
import { io } from 'socket.io-client'

const msg = ref([])

const socket = io('http://localhost:7960')

socket.on('connection', (socket) => {
  console.log(socket.id)
})
socket.on('tick', (socket) => {
  console.log(socket.id)
})
</script>

<template>
  <div>
    <PageMain>
      <h2> websocket测试:</h2>
      <div>
        <p v-for="(m, i) in msg" :key="i">
          {{ m }}
        </p>
      </div>
    </PageMain>
  </div>
</template>

<style  scoped>

</style>
