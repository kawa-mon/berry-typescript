export {}

// ユニオン型とインターセクション型の関係
type Human = { name: string }
type Animal = { species: string }
function getName(human: Human) {
  return human.name
}
function getSpecies(animal: Animal) {
  return animal.species
}

// mysteryFuncはユニオン型になる
// ((human: Human) => string) | ((animal: Animal) => string)
const mysteryFunc = Math.random() < 0.5 ? getName : getSpecies

const uhyo: Human & Animal = { name: 'uhyo', species: 'Homo sapiens sapiens' }
// ユニオン型の関数を呼び出すためにはインターセクション型の引数を渡す
const value = mysteryFunc(uhyo)
console.log(value)

// オプショナルプロパティとexactOptionalPropertyTypesオプション
type Human2 = {
  name: string
  age: number | undefined
}

const uhyo2: Human2 = {
  name: 'uhyo',
  age: 25,
}

const john2: Human2 = {
  name: 'John Smith',
  age: undefined,
}

// age を明記しないためエラーとなる
// age を省略したいのか書き忘れたのか区別するためにコンパイルエラーに落とせる
// const taro2: Human2 = {
//   name: 'Taro Yamada',
// }

type Human3 = {
  name: string
  age?: number
}

const uhyo3: Human3 = {
  name: 'uhyo',
  age: 25,
}

// exactOptionalPropertyTypes が有効だと age? の記法に対して undefined を指定できなくなる
// 1つの記法が1つの意味だけ持つ方がプログラムが明確になるので良い
// const john3: Human3 = {
//   name: 'John Smith',
//   age: undefined,
// }

// keyof型, lookup型とジェネリクスを併用するケース
function get<T, K extends keyof T & string>(obj: T, key: K): T[K] {
  // keyの型はKであり string | number | symbol となる。そのため下記型付けだとエラー
  // function get<T, K extends keyof T>(obj: T, key: K): T[K] {
  const keyName: string = key
  return obj[key]
}

type Human4 = {
  name: string
  age: number
}

const uhyo4: Human4 = {
  name: 'uhyo',
  age: 26,
}

const uhyoName = get(uhyo4, 'name')
const uhyoAge = get(uhyo4, 'age')
console.log(uhyoName, uhyoAge)

// ユーザー定義型ガードによる型の絞り込み
// 1.引数名 is 型 を関数の返り値に記述する
// 関数はbooleanを返り値として返し、trueを返すならば引数名が型であることを表す
function isStringOrNumber(value: unknown): value is string | number {
  return typeof value === 'string' || typeof value === 'number'
}
const something: unknown = 123
if (isStringOrNumber(something)) {
  console.log(something.toString())
}

// 2. asserts 引数名 is 型 を関数の返り値に記述する
// 関数はvoidを返り値として返し、無事に終了するならば引数名が型であることを表す
// 途中で例外が発生する関数で利用する
type Human5 = {
  type: 'Human'
  name: string
  age: number
}

function assertHuman(value: any): asserts value is Human5 {
  if (value === null) {
    throw new Error('Given value is null or undefined')
  }
  if (
    value.type !== ' Human' ||
    typeof value.name !== 'string' ||
    typeof value.age !== 'number'
  ) {
    throw new Error('Given value is not a Human')
  }
}

function checkAndUseHuman(value: unknown) {
  assertHuman(value)
  // ここから下ではvalueがHUman5型になる
  const name = value.name
}

// mapped types { [P in K]: T }
type Fruit = 'apple' | 'orange' | 'strawberry'
type FruitNumbers = {
  [P in Fruit]: number
}
const numbers: FruitNumbers = {
  apple: 3,
  orange: 10,
  strawberry: 20,
}

// conditional types X extends Y ? S : T
type RestArgs<M> = M extends 'string'
  ? [string, string]
  : [number, number, number]

function func<M extends 'string' | 'number'>(mode: M, ...args: RestArgs<M>) {
  console.log(mode, ...args)
}

func('string', 'uhyo', 'hyo')
func('number', 1, 2, 3)

/**
 * 参考：distribute conditional types
 * @see https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types
 * @see https://stackoverflow.com/questions/49401866/all-possible-keys-of-an-union-type
 */
