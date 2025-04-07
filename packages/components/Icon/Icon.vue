<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { omit } from 'lodash-es'
import { computed } from 'vue'
import type { IconProps } from './types'

defineOptions({
  name: 'SeIcon',
  inheritAttrs: false,
})

const props = defineProps<IconProps>()
const filterProps = computed(() => omit(props, ['type', 'color']))
const customStyle = computed(() => ({ color: props.color ?? void 0 }))
</script>

<template>
  <i
    class="er-icon"
    :class="[`er-icon-${props.type}`]"
    :style="customStyle"
    v-bind="$attrs"
  >
    <font-awesome-icon v-bind="filterProps" />
  </i>
</template>

<style>
@import './style.css';
</style>
