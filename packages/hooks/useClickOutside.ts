import { type Ref } from 'vue'
import useEventListener from './useEventListener'

/**
 * 用于检测点击事件是否发生在指定元素之外。
 *
 * @param elementRef - 一个引用目标 HTML 元素的 Ref 对象。
 * @param callback - 当点击事件发生在目标元素之外时调用的回调函数。
 *
 * 使用示例：
 * ```typescript
 * const elementRef = ref<HTMLElement>();
 * useClickOutside(elementRef, (e) => {
 *   console.log('点击发生在目标元素之外', e);
 * });
 * ```
 */
export default function useClickOutside(
  elementRef: Ref<HTMLElement | void>,
  callback: (e: MouseEvent) => void
) {
  useEventListener(document, 'click', (e: Event) => {
    if (elementRef.value && e.target) {
      if (!elementRef.value.contains(e.target as HTMLElement)) {
        callback(e as MouseEvent)
      }
    }
  })
}
