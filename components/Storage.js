const fs = require('fs')
const path = require('path')

const filePath = path.join(__dirname, '../data.json')

function getBooks() {
  if (!fs.existsSync(filePath)) return []
  return JSON.parse(fs.readFileSync(filePath))
}

function saveBooks(books) {
  fs.writeFileSync(filePath, JSON.stringify(books, null, 2))
}

module.exports = {
  getBooks,
  saveBooks
}