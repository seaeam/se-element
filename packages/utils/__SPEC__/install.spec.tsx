import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, createApp } from 'vue'
import { makeInstaller, withInstall } from '../install'

const AppComp = defineComponent({
  setup() {
    return () => <div>App</div>
  },
})
const compA = withInstall(
  defineComponent({
    setup() {
      return () => <div>CompA</div>
    },
  })
)

const compB = withInstall(
  defineComponent({
    setup() {
      return () => <div>CompB</div>
    },
  })
)

describe('utils/install', () => {
  it('withInstall should work', () => {
    const wrapper = mount(() => <div id="app"></div>)
    const app = createApp(AppComp)

    app.use(compA).use(compB).mount(wrapper.element)

    expect(compA.install).toBeDefined()
    expect(compB.install).toBeDefined()
    expect(wrapper.findComponent(compA)).toBeTruthy()
    expect(wrapper.findAllComponents(compB)).toBeTruthy()
  })

  it('makeInstall should work', () => {
    const wrapper = mount(() => <div id="app"></div>)
    const app = createApp(AppComp)
    const installer = makeInstaller([compA, compB])

    app.use(installer).mount(wrapper.element)

    expect(installer).toBeDefined()
    expect(wrapper.findComponent(compA)).toBeTruthy()
    expect(wrapper.findAllComponents(compB)).toBeTruthy()
  })
})
