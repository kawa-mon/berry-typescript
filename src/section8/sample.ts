import { readFile } from 'fs/promises'

/**
 * catch コールバック関数の引数は unknown 型にする
 * 失敗時にどのようなエラーが発生するか型システムから分からない。そのため any 型になってしまう。
 * 歴史的経緯によって any 型で推論されてしまうが、今や unknown 型のほうが適切である。
 */
const p = readFile('uhyo.txt', 'utf-8')
p.then((result) => {
  console.log('成功', result)
  // }).catch((error) => {
}).catch((error: unknown) => {
  console.log('失敗', error)
})
