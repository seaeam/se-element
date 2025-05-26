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
    class="se-collapse-item"
    :class="{
      'is-disabled': disabled,
    }"
  >
    <div
      class="se-collapse-item__header"
      :id="`item-headse-${name}`"
      :class="{
        'is-disabled': disabled,
        'is-active': isActive,
      }"
      @click="handleClick"
    >
      <span class="se-collapse-item__title">
        <slot name="title">
          {{ title }}
        </slot>
      </span>
      <se-icon icon="angle-right" class="headse-angle" />
    </div>
    <transition name="slide" v-on="transitionEvents">
      <div class="se-collapse-item__wrapper" v-show="isActive">
        <div class="se-collapse-item__content" :id="`item-content-${name}`">
          <slot></slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
@import './style.css';
</style>
