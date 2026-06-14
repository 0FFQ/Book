function BookItem(book, actions) {
  const item = document.createElement('div')
  item.className = 'book-item'

  const title = document.createElement('div')
  title.textContent = book.title
  title.style.flex = '1'
  title.style.overflow = 'hidden'
  title.style.whiteSpace = 'nowrap'
  title.style.textOverflow = 'ellipsis'

  // удаление

  const delBtn = document.createElement('button')

  delBtn.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M3 6h18"></path>
      <path d="M8 6V4h8v2"></path>
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path>
      <path d="M10 11v6"></path>
      <path d="M14 11v6"></path>
    </svg>
  `

  delBtn.style.width = '32px'
  delBtn.style.height = '32px'
  delBtn.style.display = 'flex'
  delBtn.style.alignItems = 'center'
  delBtn.style.justifyContent = 'center'

  delBtn.style.background = '#262626'
  delBtn.style.border = '1px solid #333'
  delBtn.style.borderRadius = '8px'
  delBtn.style.cursor = 'pointer'

  delBtn.style.opacity = '0'
  delBtn.style.transition = '0.2s'



  item.onmouseenter = () => {
    delBtn.style.opacity = '0.7'
  }

  item.onmouseleave = () => {
    delBtn.style.opacity = '0'
  }

  item.onclick = () => {
    actions.openBook(book)
  }

  delBtn.onclick = (e) => {
    e.stopPropagation()
    actions.removeBook(book)
  }

  item.style.display = 'flex'
  item.style.alignItems = 'center'
  item.style.justifyContent = 'space-between'
  item.style.padding = '8px'
  item.style.borderRadius = '8px'
  item.style.cursor = 'pointer'

  item.appendChild(title)
  item.appendChild(delBtn)

  return item
}

module.exports = BookItem