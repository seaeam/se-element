import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { defineComponent, ref } from 'vue'
import useClickOutside from '../useClickOutside'

describe('hooks/useClickOutside', () => {
  it('should add "click-outside" listener', async () => {
    const target = ref<HTMLElement>()
    const btnRef = ref<HTMLElement>()

    const handler = vi.fn()

    mount(
      defineComponent({
        setup() {
          useClickOutside(target, handler)

          return () => (
            <div ref={target}>
              <button ref={btnRef}>click me</button>
            </div>
          )
        },
      })
    )

    await btnRef.value?.click()
    expect(handler).not.toHaveBeenCalled()

    await document.body.click()
    expect(handler).toHaveBeenCalledOnce()
  })
})
