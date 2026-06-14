function Header(state) {
  const wrap = document.createElement('div')
  wrap.id = 'header'

  const title = document.createElement('h2')
  title.textContent = 'Книги'

  const count = document.createElement('div')
  count.id = 'book-count'
  count.textContent = `Книг: ${state.books.length}`
  count.style.opacity = '0.6'
  count.style.fontSize = '14px'

  wrap.appendChild(title)
  wrap.appendChild(count)

  return wrap
}

module.exports = Header