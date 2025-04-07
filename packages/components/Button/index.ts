import { withInstall } from '@seam-element/utils'
import Button from './Button.vue'
import ButtonGroup from './ButtonGroup.vue'

export const SeButton = withInstall(Button)
export const SeButtonGroup = withInstall(ButtonGroup)

export * from './types'
