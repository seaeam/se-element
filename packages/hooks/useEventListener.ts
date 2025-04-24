import { isRef, onBeforeUnmount, onMounted, unref, watch, type MaybeRef } from 'vue'

/**
 * 用于为目标元素添加和移除事件监听器。
 *
 * @template T - 事件类型，必须是 `HTMLElementEventMap` 中的键。
 *
 * @param target - 一个可能是响应式引用的目标元素，可以是 `EventTarget` 或 `HTMLElement`，也可以是 `void`。
 * @param event - 事件名称，必须是 `HTMLElementEventMap` 中的键。
 * @param handler - 事件处理函数，接收事件对象作为参数。
 *
 * @remarks
 * - 如果 `target` 是一个响应式引用（`isRef(target)`），会在目标值变化时自动移除旧的事件监听器并添加新的事件监听器。
 * - 如果 `target` 不是响应式引用，则会在组件挂载时添加事件监听器。
 * - 在组件卸载时，会自动移除事件监听器。
 *
 * @example
 * ```typescript
 * import { ref } from 'vue';
 * import useEventListener from './useEventListener';
 *
 * const buttonRef = ref<HTMLButtonElement | null>(null);
 *
 * useEventListener(buttonRef, 'click', (event) => {
 *   console.log('Button clicked!', event);
 * });
 * ```
 */
export default function useEventListener<T extends keyof HTMLElementEventMap>(
  target: MaybeRef<EventTarget | HTMLElement | void>,
  event: T,
  handler: (e: HTMLElementEventMap[T]) => any
) {
  if (isRef(target)) {
    watch(target, (val, oldVal) => {
      oldVal?.removeEventListener(event, handler as EventListener)
      val?.addEventListener(event, handler as EventListener)
    })
  } else {
    onMounted(() => target?.addEventListener(event, handler as EventListener))
  }

  onBeforeUnmount(() =>
    unref(target)?.removeEventListener(event, handler as EventListener)
  )
}
