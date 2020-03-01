const fs = require('fs')
const data = require('./data')

const parsedData = data.split('\n').reduce((acc, cur) => [...acc, ...cur.split(';').map(item => item.trim())], []).filter(item => item)

const total = parsedData.length

// 25 is the approximate amount of anime that don't match regex
// 5 is the approximate amount of anime that weren't properly added to google docs
const anime = parsedData.filter(item => /аниме|АНИМА/.test(item)).length + 25 + 5

const write = (filename, data) => {
  fs.writeFile(filename, data, err => {
    if (err) throw err

    console.log(`${filename} has been saved!`)
  })
}

write('list.txt', parsedData.join('\n'))
write('result.txt', anime / total)
