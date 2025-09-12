<script setup lang="ts">
import type { MessageProps } from './types'
import { computed, onMounted, ref, watch } from 'vue'
import { getLastBottomOffset } from './methods'
import { delay, bind } from 'lodash-es'
import { useEventListener, useOffset } from '@seam-element/hooks'
import { RenderVnode, typeIconMap } from '@seam-element/utils'
import SeIcon from '../Icon/Icon.vue'

defineOptions({
  name: 'SeMessage',
})

const props = withDefaults(defineProps<MessageProps>(), {
  type: 'info',
  duration: 3000,
  offset: 10,
  transitionName: 'fade-up',
})

const visible = ref(false)
const messageRef = ref<HTMLDivElement>()

const iconName = computed(() => typeIconMap.get(props.type) ?? 'circle-info')

// div 的高度
const boxHeight = ref(0)

const { topOffset, bottomOffset } = useOffset({
  getLastBottomOffset: bind(getLastBottomOffset, props),
  offset: props.offset,
  boxHeight,
})

const cssStyle = computed(() => ({
  top: topOffset.value + 'px',
  zIndex: props.zIndex,
}))

let timer: number
function startTimmer() {
  if (props.duration === 0) return
  timer = delay(close, props.duration)
}

function clearTimer() {
  clearTimeout(timer)
}

function close() {
  visible.value = false
}

onMounted(() => {
  visible.value = true
  startTimmer()
})

useEventListener(document, 'keydown', (e: Event) => {
  const { code } = e as KeyboardEvent
  if (code === 'Escape') {
    close()
  }
})

watch(visible, (val) => {
  if (!val) boxHeight.value = -props.offset // 退出动画更流畅
})

defineExpose({
  bottomOffset,
  close,
})
</script>

<template>
  <Transition
    :name="transitionName"
    @enter="boxHeight = messageRef!.getBoundingClientRect().height"
    @after-leave="!visible && onDestroy()"
  >
    <div
      ref="messageRef"
      class="se-message"
      :class="{
        [`se-message--${type}`]: type,
        'is-close': showClose,
        'text-center': center,
      }"
      :style="cssStyle"
      v-show="visible"
      role="alert"
      @mouseenter="clearTimer"
      @mouseleave="startTimmer"
    >
      <se-icon class="se-message__icon" :icon="iconName" />
      <div class="se-message__content">
        <slot>
          <render-vnode v-if="message" :vNode="message" />
        </slot>
      </div>
      <div class="se-message__close" v-if="showClose">
        <se-icon icon="xmark" @click.stop="close" />
      </div>
    </div>
  </Transition>
</template>

<style scoped>
@import './style.css';
</style>
