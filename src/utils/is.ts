const toString = Object.prototype.toString

const getType = (obj: unknown) => toString.call(obj)

export const isType =
  <T>(type: string | string[]) =>
  (obj: unknown): obj is T =>
    getType(obj) === `[object ${type}]`

export function isInstanceOf(wat: unknown, base: any): boolean {
  try {
    return wat instanceof base
  } catch (_e) {
    return false
  }
}

export function isBlob(unk: unknown): unk is Blob {
  return isInstanceOf(unk, Blob)
}

export const isArr = Array.isArray
