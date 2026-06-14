const BookItem = require('./BookItem')

function BookList(books, actions) {
  const list = document.createElement('div')
  list.id = 'list'

  if (!books.length) {
    const empty = document.createElement('div')
    empty.textContent = 'Нет книг'
    empty.style.opacity = '0.5'
    list.appendChild(empty)
    return list
  }

  books.forEach(book => {
    list.appendChild(BookItem(book, actions))
  })

  return list
}

module.exports = BookList