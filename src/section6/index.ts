export {}

// 力試し2
type hasValue<T> = { tag: 'some'; value: T }
type notHaveValue = { tag: 'none' }
type Option<T> = hasValue<T> | notHaveValue

function isSome<T>(obj: Option<T>): obj is hasValue<T> {
  return obj.tag === 'some'
}

function showNumberIfExist(obj: Option<number>): void {
  if (isSome(obj)) {
    console.log(obj.value)
  }
}

const four: Option<number> = {
  tag: 'some',
  value: 4,
}

const nothing: Option<number> = {
  tag: 'none',
}

showNumberIfExist(four)
showNumberIfExist(nothing)
