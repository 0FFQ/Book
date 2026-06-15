const Sidebar = require('./components/Sidebar')
const BookReader = require('./components/BookReader')
const MenuButton = require('./components/MenuButton')
const AddBookModal = require('./components/AddBookModal')
const BookItem = require('./components/BookItem')
const Storage = require('./components/Storage')

let state = {
  books: Storage.getBooks(),
  filtered: Storage.getBooks(),
  currentBook: null
}

let uiState = {
  sidebarOpen: true
}

let addBookModalInstance = null
let isModalOpen = false

const actions = {
  search: (text) => {
    state.filtered = state.books.filter(b =>
      b.title.toLowerCase().includes(text.toLowerCase())
    )

    updateBookList()
  },

  openBook: (book) => {
    state.currentBook = book
    render()
  },

  removeBook: (book) => {
    let books = Storage.getBooks()

    books = books.filter(b => b.title !== book.title)

    Storage.saveBooks(books)

    state.books = books
    state.filtered = books

    updateBookList()
  },

  openAddModal: () => {
    if (isModalOpen) return

    isModalOpen = true

    addBookModalInstance = new AddBookModal(() => {
      state.books = Storage.getBooks()
      state.filtered = state.books

      render()

      isModalOpen = false
    })

    const oldClose = addBookModalInstance.close.bind(addBookModalInstance)

    addBookModalInstance.close = () => {
      oldClose()
      isModalOpen = false
    }

    addBookModalInstance.open()
  }
}

function updateBookList() {
  const list = document.getElementById('list')

  if (!list) return

  list.innerHTML = ''

  state.filtered.forEach(book => {
    const item = BookItem(book, {
      openBook: actions.openBook,
      removeBook: actions.removeBook
    })

    list.appendChild(item)
  })
}

function render() {
  const app = document.getElementById('app')

  app.innerHTML = ''

  const sidebar = new Sidebar(state, actions)

  sidebar.setOpen?.(uiState.sidebarOpen)

  app.appendChild(sidebar.mount())
  app.appendChild(new BookReader(state, actions).mount())
  app.appendChild(new MenuButton().mount())
}

render()