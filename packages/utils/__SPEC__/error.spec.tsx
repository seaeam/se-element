import { describe, it, expect, vi } from 'vitest'

import { throwError, debugWarn } from '../error'

describe('utils/error', () => {
  it('throwError should work', () => {
    expect(() => {
      throwError('scope', 'msg')
    }).toThrowError('[scope]:msg')
  })

  it('debugWarn should work', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    debugWarn('scope', 'msg')
    debugWarn(new SyntaxError('custom error'))

    expect(warn.mock.calls).toMatchInlineSnapshot(`
      [
        [
          [SeUIError: [scope]:msg],
        ],
        [
          [SyntaxError: custom error],
        ],
      ]
    `)
  })
})
