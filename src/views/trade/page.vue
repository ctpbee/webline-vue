<route lang="yaml">
  meta:
    title: 交易终端
  </route>

<script setup>
import { onBeforeUnmount, onMounted } from 'vue'
import { io } from 'socket.io-client'

const socket = io(localStorage.host)

onMounted(() => {
  socket.on('tick', (_socket) => {
  })
  socket.on('order', (_socket) => {
  })
  socket.on('trade', (_socket) => {
  })
  socket.on('position', (_socket) => {
  })
})

onBeforeUnmount(() => {
  socket.off()
})
</script>

<template>
  <div>
    <h2>
      <el-row>
        <el-col :span="18">
          <div class="grid-content ep-bg-purple" />
          <PageMain>
            行情图表
          </PageMain>
        </el-col>
        <el-col :span="6">
          <div class="grid-content ep-bg-purple-light" />
          <PageMain>行情表</PageMain>
        </el-col>
      </el-row>
    </h2>
    <h2>
      <el-row>
        <el-col :span="15">
          <div class="grid-content ep-bg-purple" />
          <PageMain>
            交易数据表格
          </PageMain>
        </el-col>
        <el-col :span="9">
          <div class="grid-content ep-bg-purple-light" />
          <PageMain>
            下单板
          </PageMain>
        </el-col>
      </el-row>
    </h2>
  </div>
</template>
