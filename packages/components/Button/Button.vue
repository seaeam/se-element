<script setup lang="ts">
import { throttle } from 'lodash-es'
import { computed, inject, ref } from 'vue'
import SeIcon from '../Icon/Icon.vue'
import { BUTTON_GROUP_CTX_KEY } from './constants'
import type { ButtonEmits, ButtonInstance, ButtonProps } from './types'

defineOptions({
  name: 'SeButton',
})

const props = withDefaults(defineProps<ButtonProps>(), {
  tag: 'button',
  nativeType: 'button',
  useThrottle: true,
  throttleDuration: 500,
})

const emits = defineEmits<ButtonEmits>()

const slots = defineSlots()

const ctx = inject(BUTTON_GROUP_CTX_KEY, void 0)
const size = computed(() => ctx?.size ?? props?.size ?? '')
const type = computed(() => ctx?.type ?? props?.type ?? '')
const disabled = computed(() => ctx?.disabled || props?.disabled || false)

const iconStyle = computed(() => ({
  marginRight: slots.default ? '6px' : '0px',
}))

const _ref = ref<HTMLButtonElement>()

const handleBtnClick = (e: MouseEvent) => emits('click', e)
const handleBtnClickWithThrottle = throttle(handleBtnClick, props.throttleDuration, {
  trailing: false,
})

defineExpose<ButtonInstance>({
  ref: _ref,
})
</script>

<template>
  <component
    :is="tag"
    :autofocus="autofocus"
    :ref="_ref"
    class="er-button"
    :type="tag === 'button' ? nativeType : void 0"
    :disabled="disabled || loading ? true : void 0"
    :class="{
      [`er-button--${type}`]: type,
      [`er-button--${size}`]: size,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
      'is-disabled': disabled,
      'is-loading': loading,
    }"
    @click="(e:MouseEvent) => useThrottle ? handleBtnClickWithThrottle(e) : handleBtnClick(e)"
  >
    <template v-if="loading">
      <slot name="loading">
        <se-icon
          class="loading-icon"
          :icon="loadingIcon ?? 'spinner'"
          :style="iconStyle"
          size="1x"
          spin
        />
      </slot>
    </template>
    <se-icon v-if="icon && !loading" :icon="icon" :style="iconStyle" size="1x" />

    <slot></slot>
  </component>
</template>

<style scoped>
@import './style.css';
</style>
