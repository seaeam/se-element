import { each, isFunction } from 'lodash-es'
import shell from 'shelljs'

/**
 * 一个用于处理构建前后钩子的插件。
 *
 * @param {Object} options - 插件的配置选项。
 * @param {string[]} [options.rmFiles=[]] - 构建开始时需要删除的文件或目录列表。
 * @param {Function} [options.beforeBuild] - 构建开始前执行的回调函数。
 * @param {Function} [options.afterBuild] - 构建结束后执行的回调函数。
 * @returns - 返回一个包含 `name`、`buildStart` 和 `buildEnd` 钩子的插件对象。
 *
 * @property {string} name - 插件的名称，固定为 'hooks-plugin'。
 * @property {Function} buildStart - 构建开始时调用的钩子函数。
 *   - 删除 `rmFiles` 中指定的文件或目录。
 *   - 如果提供了 `beforeBuild` 回调，则调用该回调。
 * @property {Function} buildEnd - 构建结束时调用的钩子函数。
 *   - 如果构建没有错误且提供了 `afterBuild` 回调，则调用该回调。
 */
export default function hooksPlugin({
  rmFiles = [],
  beforeBuild,
  afterBuild,
}: {
  rmFiles?: string[]
  beforeBuild?: Function
  afterBuild?: Function
}) {
  return {
    name: 'hooks-plugin',
    buildStart() {
      each(rmFiles, (fName) => shell.rm('-rf', fName))
      isFunction(beforeBuild) && beforeBuild()
    },
    buildEnd(err?: Error) {
      !err && isFunction(afterBuild) && afterBuild()
    },
  }
}
