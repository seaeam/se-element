import { each, isElement } from 'lodash-es'
import type { ComputedRef, Ref, WatchStopHandle } from 'vue'
import { onMounted, onUnmounted, watch } from 'vue'
import type { TooltipProps } from './types'

/**
 * 用于在虚拟触发节点（virtualTriggering）上绑定和解绑事件的 Hook。
 *
 * @param props - Tooltip 组件的属性，包含是否启用虚拟触发（virtualTriggering）。
 * @param triggerNode - 当前触发节点的响应式引用。
 * @param events - 需要绑定到触发节点的事件及其处理函数的响应式对象。
 * @param closeMethod - 关闭 Tooltip 的回调方法。
 *
 * @remarks
 * - 当 `virtualTriggering` 为 true 时，会自动为 triggerNode 绑定/解绑事件。
 * - 监听 triggerNode 和 events 的变化，动态更新事件绑定。
 * - 组件卸载时自动清理事件和监听器。
 */
export function useEventsToTriggerNode(
  props: TooltipProps & { virtualTriggering?: boolean },
  triggerNode: ComputedRef<HTMLElement | undefined>,
  events: Ref<Record<string, EventListener>>,
  closeMethod: () => void
) {
  let watchEventsStopHandle: WatchStopHandle | void
  let watchTriggerNodeStopHandle: WatchStopHandle | void

  const _eventHandleMap = new Map()

  const _bindEventToVirtualTriggerNode = () => {
    const el = triggerNode.value
    isElement(el) &&
      each(events.value, (fn, event) => {
        _eventHandleMap.set(event, fn)
        el?.addEventListener(event as keyof HTMLElementEventMap, fn)
      })
  }
  const _unbindEventToVirtualTriggerNode = () => {
    const el = triggerNode.value
    isElement(el) &&
      each(
        ['mouseenter', 'click', 'contextmenu'],
        (key) =>
          _eventHandleMap.has(key) &&
          el?.removeEventListener(key, _eventHandleMap.get(key))
      )
  }

  onMounted(() => {
    watchTriggerNodeStopHandle = watch(
      triggerNode,
      () => props.virtualTriggering && _bindEventToVirtualTriggerNode(),
      { immediate: true }
    )

    watchEventsStopHandle = watch(
      events,
      () => {
        if (!props.virtualTriggering) return
        _unbindEventToVirtualTriggerNode()
        _bindEventToVirtualTriggerNode()
        closeMethod()
      },
      { deep: true }
    )
  })

  onUnmounted(() => {
    watchTriggerNodeStopHandle?.()
    watchEventsStopHandle?.()
  })
}

export default useEventsToTriggerNode
