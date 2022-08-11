export {}

// typeof
const obj = { foo: 123, bar: 'hi' }

type T = typeof obj

const obj2: T = {
  foo: -50,
  bar: '',
}

const commandList = ['attack', 'defend', 'run'] as const
type Command = typeof commandList[number]

// 構造的部分型
type FooBar = {
  foo: string
  bar: number
}

type FooBarBaz = {
  foo: string
  bar: number
  baz: boolean
}

const obj3: FooBarBaz = {
  foo: 'hi',
  bar: 1,
  baz: false,
}

const obj4: FooBar = obj3

// 型引数
// 基本形
type Family<Parent, Child> = {
  mother: Parent
  father: Parent
  child: Child
}

const obj5: Family<number, string> = {
  mother: 0,
  father: 100,
  child: '1000',
}

// extends を用いて部分型の制約を加えられる
type HasName = {
  name: string
}

type Family2<Parent extends HasName, Child extends Parent> = {
  mother: Parent
  father: Parent
  child: Child
}

type Animal = {
  name: string
}

type Human = {
  name: string
  age: number
}

type S2 = Family2<Animal, Human>
// type T2 = Family2<Human, Animal>

// オプショナル型引数
type Family3<Parent = Animal, Child = Animal> = {
  mother: Parent
  father: Parent
  child: Child
}

type S3 = Family3<string, string>
type T3 = Family3
type U3 = Family3<string>

// ネストされた分割代入
const nested = {
  num: 123,
  obj: {
    foo: 'hello',
    bar: 'world',
  },
}
const {
  num,
  obj: { foo },
} = nested
console.log({ num })
console.log({ foo })
