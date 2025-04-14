<script setup lang="ts">
import { typeIconMap } from '@seam-element/utils'
import { computed, ref } from 'vue'
import SeIcon from '../Icon/Icon.vue'
import type { AlertEmits, AlertInstance, AlertProps } from './types'

defineOptions({
  name: 'SeAlert',
})

const props = withDefaults(defineProps<AlertProps>(), {
  effect: 'light',
  type: 'info',
  closable: true,
})

const emits = defineEmits<AlertEmits>()
const slots = defineSlots()

const visible = ref(true)

const iconName = computed(() => typeIconMap.get(props.type) ?? 'circle-info')
const withDescription = computed(() => props.description || slots.default)

function close() {
  visible.value = false
  emits('close')
}

function open() {
  visible.value = true
}

defineExpose<AlertInstance>({
  close,
  open,
})
</script>

<template>
  <transition name="er-alert-fade">
    <div
      v-show="visible"
      class="er-alert"
      role="alert"
      :class="{
        [`er-alert__${type}`]: type,
        [`er-alert__${effect}`]: effect,
        'text-center': center,
      }"
    >
      <se-icon
        v-if="showIcon"
        class="er-alert__icon"
        :class="{ 'big-icon': withDescription }"
        :icon="iconName"
      />
      <div class="er-alert__content">
        <span
          class="er-alert__title"
          :class="{ 'with-desc': withDescription }"
          :style="{ display: center && !showIcon ? 'flow' : 'inline' }"
        >
          <slot name="title">{{ title }}</slot>
        </span>
        <p class="er-alert__description">
          <slot>{{ description }}</slot>
        </p>
        <div class="er-alert__close" v-if="closable">
          <se-icon @click.stop="close" icon="xmark" />
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
@import './style.css';
</style>
