<script lang="ts" setup>
import { SeMessage } from 'seam-element'

const openCenter = () => {
  SeMessage({
    showClose: true,
    message: 'Centered text',
    center: true,
  })
}
</script>

<template>
  <se-button plain @click="openCenter">Centered text</se-button>
</template>
