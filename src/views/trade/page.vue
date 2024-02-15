<route lang="yaml">
meta:
title: 交易终端
</route>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { io } from 'socket.io-client'
import useUserStore from '@/store/modules/user'

const titleActiveTabs = ref(1)
const ArrayList = ref([
  {
    id: 1,
    name: '交易订单',
    children: [],
  },
  {
    id: 2,
    name: '成交订单',
    children: [],
  },
  {
    id: 3,
    name: '活跃订单',
    children: [],
  },
  {
    id: 4,
    name: '持仓数据',
    children: [],
  },
])
const userStore = useUserStore()
const column = ref([])
const table = ref([])

function switchTabs(item) {
  const array = item.children
  if (array.length > 0) {
    column.value.splice(0, column.value.length)
    let i = 0
    for (const key in array[0]) {
      column.value[i] = { label: key, prop: key }
      i++
    }
    for (let i = 0; i < array.length; i++) {
      table.value[i] = array[i]
    }
  }
}

const socket = io(localStorage.host)

function update_table() {
  function update_to_dict(index, array) {
    for (const data in array) {
      ArrayList.value[index].children.push(array[data])
    }
  }

  userStore.account_update().then((res) => {
    if (res.data !== undefined) {
      const accepted = JSON.parse(res.data)
      const actives = accepted.active
      const orders = accepted.orders
      const trades = accepted.trades
      const position = accepted.positions
      update_to_dict(0, orders)
      update_to_dict(1, trades)
      update_to_dict(2, actives)
      update_to_dict(3, position)
    }
  })
}

onMounted(() => {
  // 请求一次性数据
  update_table()
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
            <el-row>
              <el-col>
                <el-button
                  v-for="item in ArrayList"
                  :key="item.id"
                  class="bg-primary"
                  :class="titleActiveTabs === item.id ? 'activeTabsbg' : ''"
                  @click="switchTabs(item)"
                >
                  {{ item.name }}
                </el-button>
              </el-col>
            </el-row>
            <el-divider />
            <el-table :data="table" style="width: 100%; font-size: 12px;">
              <el-table-column v-for="(item, index) in column" :key="index" :prop="item.prop" :label="item.label" />
            </el-table>
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
