import { isString } from 'lodash-es'

class SeUIError extends Error {
  constructor(msg: string) {
    super(msg)
    this.name = 'SeUIError'
  }
}

export function throwError(scope: string, msg: string) {
  throw new SeUIError(`[${scope}]:${msg}`)
}

export function debugWarn(error: Error): void
export function debugWarn(scope: string, msg: string): void
export function debugWarn(scope: string | Error, msg?: string) {
  if (process.env.NODE_ENV !== 'production') {
    const error = isString(scope) ? new SeUIError(`[${scope}]:${msg}`) : scope
    console.warn(error)
  }
}
