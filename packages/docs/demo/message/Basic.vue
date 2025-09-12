<script lang="ts" setup>
import { h } from 'vue'
import { SeMessage } from 'seam-element'

const open = () => {
  SeMessage('This is a message.')
}

const openVn = () => {
  SeMessage({
    message: h('p', { style: 'line-height: 1; font-size: 14px' }, [
      h('span', null, 'Message can be '),
      h('i', { style: 'color: teal' }, 'VNode'),
    ]),
  })
}
</script>

<template>
  <se-button :plain="true" @click="open">Show message</se-button>
  <se-button :plain="true" @click="openVn">VNode</se-button>
</template>
