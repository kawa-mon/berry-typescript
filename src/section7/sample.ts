import type { tama } from './animal'

// import type, export type で型としてインポート・エクスポートするのを明確にできる。
// コンパイル時に消しても良いことが明確になる利点がある。
const otherCat: typeof tama = {
  species: 'Felis silvestris catus',
  age: 20,
}
