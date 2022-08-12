export {}

// 力試し1
const getFizzBuzzString = (
  i: number
): number | ' FizzBuzz' | ' Buzz' | ' Fizz' => {
  if (i % 15 === 0) {
    return ' FizzBuzz'
  } else if (i % 5 === 0) {
    return ' Buzz'
  } else if (i % 3 === 0) {
    return ' Fizz'
  } else {
    return i
  }
}

const sequence = (start: number, end: number): number[] => {
  const result: number[] = []
  for (let i = start; i <= end; i++) {
    result.push(i)
  }
  return result
}

for (const i of sequence(1, 100)) {
  const message = getFizzBuzzString(i)
  console.log(message)
}

// 力試し2
function map<T, U>(array: T[], callback: (value: T) => U): U[] {
  const result: U[] = []
  for (const elm of array) {
    result.push(callback(elm))
  }
  return result
}

const data = [1, 1, 2, 3, 5, 8, 13]
const result = map(data, (x) => x * 10)
console.log(result)

const data2 = [1, -3, -2, 8, 0, -1]
const result2 = map(data2, (x) => x >= 0)
console.log(result2)
