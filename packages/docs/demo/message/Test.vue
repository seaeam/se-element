<script lang="ts" setup>
import { SeMessage } from 'seam-element'

const open1 = () => {
  SeMessage({
    message: 'Congrats, this is a success message.',
    type: 'success',
  })
}
const open2 = () => {
  SeMessage.success('Congrats, this is a success message.')
}
</script>
<template>
  <div>
    <se-button @click="open1">插件式调用</se-button>
    <se-button @click="open2">函数式调用</se-button>
    <se-button @click="$message.success('Congrats, this is a success message.')"
      >全局方法调用</se-button
    >
  </div>
</template>
