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

// 力試し3
function doubleOption(obj: Option<number>) {
  return mapOption(obj, (x) => x * 2)
}

function mapOption<T, U>(obj: Option<T>, callback: (value: T) => U): Option<U> {
  switch (obj.tag) {
    case 'some':
      return { tag: 'some', value: callback(obj.value) }
    case 'none':
      return { tag: 'none' }
  }
}

console.log(doubleOption(four))
console.log(doubleOption(nothing))
