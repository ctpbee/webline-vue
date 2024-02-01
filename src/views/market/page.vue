<route lang="yaml">
  meta:
    title: websocket测试
  </route>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { io } from 'socket.io-client'

import useUserStore from '@/store/modules/user'

let socket
const userStore = useUserStore()
const tickIndex = {}
const tableData = ref([])

function process_data(data) {
  for (const key in data) {
    if (typeof data[key] === 'number') {
      data[key] = Math.round(data[key] * 100) / 100
    }
  }
  return data
}

function render_table(data) {
  const index = tickIndex[data.symbol]
  if (index >= 0) {
    tableData.value[index] = process_data(data)
  }
  else {
    tickIndex[data.symbol] = tableData.value.push(process_data(data)) - 1
  }
}

onMounted(() => {
  userStore.get_ticks().then((res) => {
    const table = JSON.parse(res.data)
    for (const key in table) {
      render_table(table[key])
    }
    socket = io(localStorage.host)
    socket.on('tick', (socket) => {
      const res = JSON.parse(socket)
      render_table(res)
    })
  })
})

onBeforeUnmount(() => {
  socket.off()
})

const columns = [{ label: '合约', prop: 'local_symbol' }, { label: '最新价', prop: 'last_price' }, { label: '成交量', prop: 'volume' }, { label: '卖一价', prop: 'ask_price_1' }, { label: '卖一量', prop: 'ask_volume_1' }, { label: '买一价', prop: 'bid_price_1' }, { label: '买一量', prop: 'bid_volume_1' }, { label: '最高价', prop: 'high_price' }, { label: '开盘价', prop: 'open_price' }, { label: '最低价', prop: 'low_price' }, { label: '成交金额', prop: 'turnover' }, { label: '涨停', prop: 'limit_down' }, { label: '跌停', prop: 'limit_up' }, { label: '持仓量', prop: 'open_interest' }]
</script>

<template>
  <div>
    <PageMain>
      <h2>
        <el-table :data="tableData" style="width: 100%; font-size: 12px;">
          <el-table-column v-for="(item, index) in columns" :key="index" :prop="item.prop" :label="item.label" />
        </el-table>
      </h2>
    </PageMain>
  </div>
</template>
