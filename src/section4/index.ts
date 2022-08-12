export {}

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
