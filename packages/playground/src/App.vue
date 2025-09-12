<script setup lang="ts">
import { ref } from 'vue'
import { SeMessage } from 'seam-element'

const virtualDiv = ref<HTMLElement | null>(null)

const open1 = () => {
  SeMessage({
    message: '这是一条消息提示',
    type: 'success',
  })
}
</script>

<template>
  <se-button-group>
    <se-button type="primary">click me</se-button>
    <se-button type="primary">click me</se-button>
    <se-button type="primary">click me</se-button>
  </se-button-group>

  <br />
  <br />
  <br />

  <se-collapse
    v-bind="{
      accordion: true,
      modelValue: ['a'],
    }"
  >
    <se-collapse-item ame="a" title="Title a"> 111 </se-collapse-item>
  </se-collapse>

  <br />
  <br />
  <br />

  <div>
    <se-tooltip content="这是虚拟触发节点的 Tooltip" placement="bottom">
      <se-button>hover me</se-button>
    </se-tooltip>
  </div>

  <br />
  <br />
  <br />

  <div>
    <se-button @click="open1">插件式调用</se-button>
  </div>
</template>

<style scoped></style>
