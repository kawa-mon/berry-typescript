export {}

// アロー関数の省略形において返り値がオブジェクトの場合
type Human = {
  height: number
  weight: number
}

type ReturnObj = {
  bmi: number
}

const calcBMIObject = ({ height, weight }: Human): ReturnObj => ({
  bmi: weight / height ** 2,
})

const me: Human = { height: 1.79, weight: 65 }
console.log(calcBMIObject(me))

// 関数型の引数名は何でも良い。エディタにおける可読性のためにある。
type F = (repeatNum: number) => string
const xRepeat: F = (num: number): string => 'x'.repeat(num)

// xRepeat()

// 関数型の部分型関係
// 「SがTの部分型」 = S <: T。SをTの代わりに使える。
// 以下は HasNameAndAge が HasName の部分型なので HasNameAndAge <: HasName の関係
type HasName = {
  name: string
}

type HasNameAndAge = {
  name: string
  age: number
}

// 1: 返り値の型（共変性 HasNameAndAge <: HasName）
const fromAge = (age: number): HasNameAndAge => ({
  name: 'John Smith',
  age,
})

const f: (age: number) => HasName = fromAge
const obj: HasName = f(100)

// 2: 引数の型（反変性 HasName :> HasNameAndName）
const showName = (obj: HasName) => {
  console.log(obj.name)
}
const g: (obj: HasNameAndAge) => void = showName
g({ name: 'uhyo', age: 26 })

// 3: 引数の数（引数の少ない関数型はより引数が多い関数型の部分型）
type UnaryFunc = (arg: number) => number
type BinaryFunc = (left: number, right: number) => number
const double: UnaryFunc = (arg) => arg * 2
const add: BinaryFunc = (left, right) => left + right
const bin: BinaryFunc = double
console.log(bin(10, 100))

// ジェネリクスでは関数の型引数を省略できる
function repeat<T>(element: T, length: number): T[] {
  const result: T[] = []
  for (let i = 0; i < length; i++) {
    result.push(element)
  }
  return result
}

// const result = repeat<string>('a', 5)
const result = repeat('a', 5)
