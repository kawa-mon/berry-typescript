export {}

// コンストラクタ引数でプロパティ宣言
// 下記2つは一緒。NOTE: ただし publicの場合も明示する必要がある。
// TypeScript独自の記法なので好みが分かれる。
class User1 {
  name: string
  private age: number

  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }
}

class User2 {
  constructor(public name: string, private age: number) {}
}

// JavaScript由来のプライベートプロパティ #
class User3 {
  name: string
  #age: number

  constructor(name: string, age: number) {
    this.name = name
    this.#age = age
  }

  public isAdult(): boolean {
    return this.#age >= 20
  }
}

const uhyo = new User3('uhyo', 26)
console.log(uhyo)
console.log(uhyo.name)
// console.log(uhyo.#age)

// newシグネチャによるインスタンス化可能性の表現
class User4 {
  name: string = 'shingo'
  age: number = 32
}

type MyUserConstructor = new () => User4
const MyUser: MyUserConstructor = User4
const u = new MyUser()
console.log(u.name, u.age)

// override修飾子
// TypeScript独自の記法。会ってもなくても構わない。明示するだけ。
// noImplicitOverrideコンパイラオプションをつけることでオーバーライドする箇所への明示が必須となる。

class premiumUser extends User3 {
  rank: number = 1

  public override isAdult(): boolean {
    return true
  }
}

// implements キーワード
// クラスのインスタンスは与えられた型の部分型になるよう制約を設けられる
type HasName = { name: string }
class User5 implements HasName {
  name: string
  #age: number

  constructor(name: string, age: number) {
    this.name = name
    this.#age = age
  }

  public isAdult(): boolean {
    return this.#age >= 20
  }
}

// apply, call
const uhyo2 = new User5('uhyo', 25)
const john = new User5('John Smith', 15)
console.log(uhyo2.isAdult())
console.log(uhyo2.isAdult.apply(john, []))
console.log(uhyo2.isAdult.call(john))
console.log(Reflect.apply(uhyo2.isAdult, john, []))
