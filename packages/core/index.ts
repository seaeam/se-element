import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import '@seam-element/theme'
import { makeInstaller } from '@seam-element/utils'
import components from './components'
import printLogo from './printLogo'

printLogo()

library.add(fas)
const installer = makeInstaller(components)

// 这里之前用的是 ../components，现在改成下面这引入方式,还要在 tsconfig.build 中去改一下才能在打包后正常使用
export * from '@seam-element/components'
export default installer
