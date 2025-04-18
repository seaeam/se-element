import { get, map } from 'lodash-es'
import { describe, expect, it } from 'vitest'
import type { Plugin } from 'vue'
import {
  SeAlert,
  SeButton,
  SeButtonGroup,
  SeCollapse,
  SeCollapseItem,
  SeIcon,
} from '../index'

const comps = [
  SeAlert,
  SeButton,
  SeButtonGroup,
  SeCollapse,
  SeCollapseItem,
  SeIcon,
] as Plugin[]

describe('components/index', () => {
  it.each(map(comps, (c) => [get(c, 'name') ?? '', c]))(
    '%s should be exported',
    (_, component) => {
      expect(component).toBeDefined()
      expect(component.install).toBeDefined()
    }
  )
})
