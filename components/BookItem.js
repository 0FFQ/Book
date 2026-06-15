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

  const deleteIcon = `<img src="assets/delete.png" class="menu-icon">`
  
  delBtn.innerHTML = deleteIcon

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