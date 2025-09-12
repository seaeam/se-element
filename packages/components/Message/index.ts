import Message from './methods'
import { withInstallFunction } from '@seam-element/utils'

export const SeMessage = withInstallFunction(Message, '$message')

export * from './types'
