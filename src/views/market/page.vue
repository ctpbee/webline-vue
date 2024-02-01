<route lang="yaml">
  meta:
    title: websocket测试
  </route>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { io } from 'socket.io-client'

let socket
const tickIndex = {}
const tableData = ref([])

function render_table(socket) {
  const data = JSON.parse(socket)
  const index = tickIndex[data.symbol]
  if (index >= 0) {
    for (const key in data) {
      if (typeof data[key] === 'number') {
        data[key] = Math.round(data[key] * 100) / 100
      }
    }

    tableData.value[index] = data
  }
  else {
    tickIndex[data.symbol] = tableData.value.push(data) - 1
  }
}

onMounted(() => {
  socket = io(localStorage.host)
  socket.on('tick', (socket) => {
    render_table(socket)
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
