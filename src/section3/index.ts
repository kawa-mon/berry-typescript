type User = {
  name: string
  age: number
  premiumUser: Boolean
}

const data: string = `
uhyo,26,1
John Smith,17,0
Mary Sue,14,1
`

const users: User[] = data
  .trim()
  .split('\n')
  .map((line) => {
    const [name, ageString, premiumUserString] = line.split(',')
    const age = Number(ageString)
    const premiumUser = premiumUserString === '1'
    return { name, age, premiumUser }
  })

for (const user of users) {
  if (user.premiumUser) {
    console.log(`${user.name} (${user.age})はプレミアムユーザーです。`)
  } else {
    console.log(
      `${user.name} (${user.age})はプレミアムユーザーではありません。`
    )
  }
}
