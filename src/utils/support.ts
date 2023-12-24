import { uuid } from '@/utils'

function runCode(code: string) {
  return new Function(code)()
}

export function isSupportSymbol() {
  try {
    runCode("'use strict'; var unk = Symbol();")
    return true
  } catch (_e) {
    return false
  }
}

/**
 * 创建一个独一无二的数据
 * @param name
 */
export function createSymbol(name: string) {
  return isSupportSymbol() ? Symbol(name) : ((name + uuid()) as unknown as symbol)
}
