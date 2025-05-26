<script setup lang="ts">
import { debugWarn } from '@seam-element/utils'
import { provide, ref, watch, watchEffect } from 'vue'
import { COLLAPSE_CTX_KEY } from './constants'
import type { CollapseEmits, CollapseItemName, CollapseProps } from './types'

const COMP_NAME = 'SeCollapse'

defineOptions({
  name: COMP_NAME,
})

const props = defineProps<CollapseProps>()
const emits = defineEmits<CollapseEmits>()
const activeNames = ref<CollapseItemName[]>(props.modelValue)

function handleItemClick(item: CollapseItemName) {
  let _activeNames = [...activeNames.value]

  if (props.accordion) {
    _activeNames = [_activeNames[0] === item ? '' : item]
    updateActiveNames(_activeNames)
    return
  }

  const index = _activeNames.indexOf(item)
  if (index > -1) {
    _activeNames.splice(index, 1)
  } else {
    _activeNames.push(item)
  }
  updateActiveNames(_activeNames)
}

function updateActiveNames(newNames: CollapseItemName[]) {
  activeNames.value = newNames
  emits('update:modelValue', newNames)
  emits('change', newNames)
}

watch(
  () => props.modelValue,
  (newNames) => updateActiveNames(newNames)
)

watchEffect(() => {
  if (props.accordion && activeNames.value.length > 1) {
    debugWarn(COMP_NAME, 'accordion mode should only have one active item')
  }
})

provide(COLLAPSE_CTX_KEY, {
  activeNames,
  handleItemClick,
})
</script>

<template>
  <div class="se-collapse">
    <slot></slot>
  </div>
</template>

<style scoped>
@import './style.css';
</style>
