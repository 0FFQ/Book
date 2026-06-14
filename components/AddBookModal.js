const { ipcRenderer } = require('electron')
const Storage = require('./Storage')

function AddBookModal(onUpdate) {

  const modal = document.createElement('div')

  modal.style.position = 'fixed'
  modal.style.top = '0'
  modal.style.left = '0'
  modal.style.width = '100%'
  modal.style.height = '100%'
  modal.style.background = 'rgba(0,0,0,0.5)'
  modal.style.display = 'flex'
  modal.style.alignItems = 'center'
  modal.style.justifyContent = 'center'
  
  const box = document.createElement('div')

  box.style.width = '420px'
  box.style.background = '#202020'
  box.style.padding = '20px'
  box.style.borderRadius = '12px'
  box.style.border = '1px solid #000000'
  box.style.position = 'relative'
  box.style.display = 'flex'
  box.style.flexDirection = 'column'
  box.style.gap = '10px'

  const close = document.createElement('button')
  close.innerHTML = `
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" stroke-width="2">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
  `
  close.style.display = 'flex'
  close.style.alignItems = 'center'
  close.style.justifyContent = 'center'

  close.style.position = 'absolute'
  close.style.top = '0'
  close.style.right = '-55px'

  close.style.width = '40px'
  close.style.height = '40px'
  close.style.background = '#262626'
  close.style.border = '1px solid #000000'
  close.style.color = 'white'
  close.style.borderRadius = '10px'
  close.style.cursor = 'pointer'

  close.onclick = () => {
    document.body.removeChild(modal)
  }

  const titleInput = document.createElement('input')
  titleInput.placeholder = 'Название книги'

  titleInput.style.padding = '10px'
  titleInput.style.borderRadius = '8px'
  titleInput.style.border = '1px solid #333'
  titleInput.style.background = '#2a2a2a'
  titleInput.style.color = 'white'

  const textWrap = document.createElement('div')

  textWrap.style.position = 'relative'
  textWrap.style.width = '100%'

  const textInput = document.createElement('textarea')

  textInput.placeholder = 'Текст книги'

  textInput.style.width = '100%'
  textInput.style.minHeight = '160px'
  textInput.style.padding = '10px'
  textInput.style.borderRadius = '8px'
  textInput.style.border = '1px solid #333'
  textInput.style.background = '#2a2a2a'
  textInput.style.color = 'white'
  textInput.style.resize = 'none'
  textInput.style.boxSizing = 'border-box'

  const fileBtn = document.createElement('button')

  fileBtn.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" stroke-width="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
    </svg>
  `

  fileBtn.style.position = 'absolute'
  fileBtn.style.right = '10px'
  fileBtn.style.bottom = '21px'

  fileBtn.style.width = '34px'
  fileBtn.style.height = '34px'

  fileBtn.style.display = 'flex'
  fileBtn.style.alignItems = 'center'
  fileBtn.style.justifyContent = 'center'

  fileBtn.style.borderRadius = '8px'
  fileBtn.style.border = '1px solid #333'
  fileBtn.style.background = '#262626'
  fileBtn.style.color = 'white'
  fileBtn.style.cursor = 'pointer'
  fileBtn.style.opacity = '0.6'

  fileBtn.style.zIndex = '10'

  fileBtn.style.pointerEvents = 'auto'

  fileBtn.onclick = async () => {

    const file = await ipcRenderer.invoke('open-file')

    if (!file) return

    textInput.value = file.content

    fileBtn.style.opacity = '1'
  }

  const addBtn = document.createElement('button')
  addBtn.textContent = 'Добавить книгу'

  addBtn.style.padding = '10px'
  addBtn.style.borderRadius = '8px'
  addBtn.style.border = '1px solid #333'
  addBtn.style.background = '#3a3a3a'
  addBtn.style.color = 'white'
  addBtn.style.cursor = 'pointer'

  addBtn.onclick = () => {

    const title = titleInput.value.trim()
    const content = textInput.value.trim()

    if (!title || !content) return

    const books = Storage.getBooks()

    books.push({ title, content })

    Storage.saveBooks(books)

    document.body.removeChild(modal)

    onUpdate()
  }

  textWrap.appendChild(textInput)
  textWrap.appendChild(fileBtn)

  box.appendChild(close)
  box.appendChild(titleInput)
  box.appendChild(textWrap)
  box.appendChild(addBtn)

  modal.appendChild(box)

  return modal
}

module.exports = AddBookModal