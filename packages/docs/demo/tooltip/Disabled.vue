<script lang="ts" setup>
import { ref } from 'vue'

const disabled = ref(false)
</script>

<template>
  <se-tooltip
    :disabled="disabled"
    content="click to close tooltip function"
    placement="bottom"
  >
    <se-button @click="disabled = !disabled"
      >click to {{ disabled ? 'active' : 'close' }} tooltip function</se-button
    >
  </se-tooltip>
</template>
