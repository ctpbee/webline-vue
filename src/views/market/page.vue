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

onMounted(() => {
  socket = io('http://localhost:7960')
  socket.on('tick', (socket) => {
    const data = JSON.parse(socket)
    const index = tickIndex[data.symbol]
    if (index >= 0) {
      tableData.value[index] = data
    }
    else {
      tickIndex[data.symbol] = tableData.value.push(data) - 1
    }
  })
})

onBeforeUnmount(() => {
  socket.off()
})

const columns = [{ label: '中文名', prop: 'name' }, { label: '卖一价', prop: 'ask_price_1' }, { label: '卖二价', prop: 'ask_price_2' }, { label: '卖三价', prop: 'ask_price_3' }, { label: '卖四价', prop: 'ask_price_4' }, { label: '卖五价', prop: 'ask_price_5' }, { label: '卖一量', prop: 'ask_volume_1' }, { label: '卖二量', prop: 'ask_volume_2' }, { label: '卖三量', prop: 'ask_volume_3' }, { label: '卖四量', prop: 'ask_volume_4' }, { label: '卖五量', prop: 'ask_volume_5' }, { label:
'均价', prop: 'average_price' }, { label: '买一价', prop: 'bid_price_1' }, { label: '买二价', prop: 'bid_price_2' }, { label: '买三价', prop: 'bid_price_3' }, { label: '买四价', prop: 'bid_price_4' }, { label: '买五价', prop: 'bid_price_5' }, { label: '买一量', prop: 'bid_volume_1' }, { label: '买二量', prop: 'bid_volume_2' }, { label: '买三量', prop: 'bid_volume_3' }, { label: '买四量', prop: 'bid_volume_4' }, { label: '买五量', prop: 'bid_volume_5' }, { label: '最高价', prop: 'high_price' }, { label: '最新价', prop: 'last_price' }, { label: '成交金额', prop: 'turnover' }, { label: '涨停', prop: 'limit_down' }, { label: '跌停', prop: 'limit_up' }, { label: '最低价', prop: 'low_price' }, { label: '持仓量', prop: 'open_interest' }, { label: '开盘价', prop: 'open_price' }, { label: '昨日收盘价', prop: 'pre_close' }, { label:
'昨日结算价', prop: 'pre_settlement_price' }, { label: '成交量', prop: 'volume' }, { label: '昨日持仓量', prop: 'pre_open_interest' }]
</script>

<template>
  <div>
    <PageMain>
      <h2>
        <el-table :data="tableData" style="width: 100%;">
          <el-table-column v-for="(item, index) in columns" :key="index" :prop="item.prop" :label="item.label" />
        </el-table>
      </h2>
    </PageMain>
  </div>
</template>
