<script setup lang="ts">
import { computed, inject } from 'vue'
import SeIcon from '../Icon/Icon.vue'
import { COLLAPSE_CTX_KEY } from './constants'
import transitionEvents from './transitionEvents'
import type { CollapseItemProps } from './types'

defineOptions({
  name: 'SeCollapseItem',
})
const props = defineProps<CollapseItemProps>()

const ctx = inject(COLLAPSE_CTX_KEY)
const isActive = computed(() => ctx?.activeNames.value?.includes(props.name))

function handleClick() {
  if (props.disabled) return

  ctx?.handleItemClick(props.name)
}
</script>

<template>
  <div
    class="er-collapse-item"
    :class="{
      'is-disabled': disabled,
    }"
  >
    <div
      class="er-collapse-item__header"
      :id="`item-header-${name}`"
      :class="{
        'is-disabled': disabled,
        'is-active': isActive,
      }"
      @click="handleClick"
    >
      <span class="er-collapse-item__title">
        <slot name="title">
          {{ title }}
        </slot>
      </span>
      <se-icon icon="angle-right" class="header-angle" />
    </div>
    <transition name="slide" v-on="transitionEvents">
      <div class="er-collapse-item__wrapper" v-show="isActive">
        <div class="er-collapse-item__content" :id="`item-content-${name}`">
          <slot></slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
@import './style.css';
</style>
