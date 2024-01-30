<route lang="yaml">
name: home
meta:
  title: 主页
  icon: ant-design:home-twotone
</route>

<script setup lang="ts">
function open(url: string) {
  window.open(url, '_blank')
}
</script>

<template>
  <div>
    <PageHeader>
      <template #title>
        <div class="flex items-center gap-4">
          欢迎使用 ctpbee 控制台
        </div>
      </template>
      <template #content>
        <div class="text-sm/6">
          <div>
            <b class="text-emphasis">一键启动的超快乐交易实盘框架</b>
          </div>
        </div>
      </template>
      <HButton outline @click="() => open('http://docs.ctpbee.com/')">
        <SvgIcon name="ri:file-text-line" />
        开发文档
      </HButton>
      <HDropdownMenu
        :items="[
          [
            { label: 'ctpbee', handle: () => open('https://github.com/ctpbee/ctpbee') },
            { label: 'webline', handle: () => open('https://github.com/ctpbee/webline') },
          ],
        ]"
      >
        <HButton class="ml-2">
          <SvgIcon name="ri:code-s-slash-line" />
          代码仓库
          <SvgIcon name="ep:arrow-down" />
        </HButton>
      </HDropdownMenu>
    </PageHeader>
  </div>
</template>

<style lang="scss" scoped>
.text-emphasis {
  text-emphasis-style: "❤";
}

.ecology {
  --at-apply: flex-1 m-0;

  :deep(.title-container) {
    --at-apply: flex items-center justify-between flex-wrap gap-4;

    .title-info {
      --at-apply: flex items-center gap-4;

      img {
        --at-apply: block w-12 h-12;
      }

      h1 {
        --at-apply: m-0 text-2xl;
      }

      h2 {
        --at-apply: m-0 text-base text-stone-5 font-normal;
      }
    }
  }
}
</style>
