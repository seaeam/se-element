import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import '@toy-element/theme'
import { makeInstaller } from '@toy-element/utils'
import components from './components'

library.add(fas)
const installer = makeInstaller(components)

export * from '@toy-element/components'
export default installer
