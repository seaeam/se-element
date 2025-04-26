<script setup lang="ts">
import { ref } from 'vue'

const virtualDiv = ref<HTMLElement | null>(null)
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
</template>

<style scoped></style>
