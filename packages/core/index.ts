import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import '@seam-element/theme'
import { makeInstaller } from '@seam-element/utils'
import components from './components'

library.add(fas)
const installer = makeInstaller(components)

export * from '@seam-element/components'
export default installer
