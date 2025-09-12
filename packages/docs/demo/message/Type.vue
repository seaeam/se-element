<script lang="ts" setup>
import { SeMessage } from 'seam-element'

const open1 = () => {
  SeMessage('This is a message.')
}
const open2 = () => {
  SeMessage({
    message: 'Congrats, this is a success message.',
    type: 'success',
  })
}
const open3 = () => {
  SeMessage({
    message: 'Warning, this is a warning message.',
    type: 'warning',
  })
}
const open4 = () => {
  SeMessage.error('Oops, this is a error message.')
}
</script>

<template>
  <se-button :plain="true" @click="open2">Success</se-button>
  <se-button :plain="true" @click="open3">Warning</se-button>
  <se-button :plain="true" @click="open1">Message</se-button>
  <se-button :plain="true" @click="open4">Error</se-button>
</template>
