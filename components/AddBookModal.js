const { ipcRenderer } = require('electron')
const Storage = require('./Storage')

class AddBookModal {
  constructor(onUpdate) {
    this.onUpdate = onUpdate

    this.modal = null
    this.box = null

    this.titleInput = null
    this.textInput = null

    this.init()
  }

  open() {
    document.body.appendChild(this.modal)
  }

  close() {
    this.modal?.remove()
  }

  init() {
    this.createModal()
    this.createBox()
    this.createCloseBtn()
    this.createTitleInput()
    this.createTextAreaWithFile()
    this.createAddButton()

    this.modal.appendChild(this.box)
  }

  createModal() {
    this.modal = document.createElement('div')

    this.modal.style.position = 'fixed'
    this.modal.style.top = '0'
    this.modal.style.left = '0'
    this.modal.style.width = '100%'
    this.modal.style.height = '100%'
    this.modal.style.background = 'rgba(0,0,0,0.5)'
    this.modal.style.display = 'flex'
    this.modal.style.alignItems = 'center'
    this.modal.style.justifyContent = 'center'
  }

  createBox() {
    this.box = document.createElement('div')

    this.box.style.width = '420px'
    this.box.style.background = '#202020'
    this.box.style.padding = '20px'
    this.box.style.borderRadius = '12px'
    this.box.style.border = '1px solid #000'
    this.box.style.position = 'relative'
    this.box.style.display = 'flex'
    this.box.style.flexDirection = 'column'
    this.box.style.gap = '10px'
  }

  createCloseBtn() {
    const close = document.createElement('button')

    close.innerHTML = `<img src="assets/close.png" class="menu-icon">`

    close.style = `
      position: absolute;
      top: 0;
      right: -55px;
      width: 40px;
      height: 40px;
      background: #262626;
      border: 1px solid #000;
      border-radius: 10px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    `

    close.onclick = () => this.close()

    this.box.appendChild(close)
  }

  createTitleInput() {
    this.titleInput = document.createElement('input')
    this.titleInput.placeholder = 'Название книги'

    this.titleInput.style = `
      padding: 10px;
      border-radius: 8px;
      border: 1px solid #333;
      background: #2a2a2a;
      color: white;
    `

    this.box.appendChild(this.titleInput)
  }


  createTextAreaWithFile() {
    const wrap = document.createElement('div')

    wrap.style.position = 'relative'
    wrap.style.width = '100%'

    this.textInput = document.createElement('textarea')
    this.textInput.placeholder = 'Текст книги'

    this.textInput.style = `
      width: 100%;
      min-height: 160px;
      padding: 10px;
      border-radius: 8px;
      border: 1px solid #333;
      background: #2a2a2a;
      color: white;
      resize: none;
      box-sizing: border-box;
    `

    const fileBtn = document.createElement('button')

    fileBtn.innerHTML = `<img src="assets/file.png" class="menu-icon">`

    fileBtn.style = `
      position: absolute;
      right: 10px;
      bottom: 21px;
      width: 34px;
      height: 34px;
      background: #262626;
      border: 1px solid #333;
      border-radius: 8px;
      cursor: pointer;
      opacity: 0.6;
      display: flex;
      align-items: center;
      justify-content: center;
    `

    fileBtn.onclick = async () => {
      const file = await ipcRenderer.invoke('open-file')
      if (!file) return

      this.textInput.value = file.content
      fileBtn.style.opacity = '1'
    }

    wrap.appendChild(this.textInput)
    wrap.appendChild(fileBtn)

    this.box.appendChild(wrap)
  }

  createAddButton() {
    const btn = document.createElement('button')
    btn.textContent = 'Добавить книгу'

    btn.style = `
      padding: 10px;
      border-radius: 8px;
      border: 1px solid #333;
      background: #3a3a3a;
      color: white;
      cursor: pointer;
    `

    btn.onclick = () => this.save()

    this.box.appendChild(btn)
  }

  save() {
    const title = this.titleInput.value.trim()
    const content = this.textInput.value.trim()

    if (!title || !content) return

    const books = Storage.getBooks() || []

    books.push({ title, content })

    Storage.saveBooks(books)

    this.close()
    this.onUpdate?.()
  }
}

module.exports = AddBookModal