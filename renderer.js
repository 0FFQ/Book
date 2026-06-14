const Sidebar = require('./components/Sidebar')
const AddBookModal = require('./components/AddBookModal')
const Storage = require('./components/Storage')
const BookList = require('./components/BookList')

let state = {
  books: Storage.getBooks(),
  filtered: Storage.getBooks(),
  currentBook: null,
  sidebarOpen: false
}

function updateBookList() {
  const oldList = document.getElementById('list')
  if (!oldList) return

  const newList = BookList(state.filtered, actions)
  oldList.replaceWith(newList)
}

function updateHeader() {
  const count = document.getElementById('book-count')
  if (!count) return

  count.textContent = `Книг: ${state.books.length}`
}

const actions = {

  search: (text) => {
    state.filtered = state.books.filter(book =>
      (book.title || '').toLowerCase().includes(text.toLowerCase())
    )

    updateBookList()
  },

  openBook: (book) => {
    state.currentBook = book

    document.getElementById('book-title').textContent = book.title
    document.getElementById('book-text').textContent = book.content

    state.sidebarOpen = false
    syncSidebar()
    syncMenuButton()
  },

  openAddModal: () => {
    const modal = AddBookModal(() => {
      state.books = Storage.getBooks()
      state.filtered = state.books

      updateBookList()
      updateHeader()
    })

    document.body.appendChild(modal)
  },

  removeBook: (book) => {
    let books = Storage.getBooks()

    books = books.filter(b => b.title !== book.title)

    Storage.saveBooks(books)

    state.books = books
    state.filtered = books

    updateBookList()
    updateHeader()
  }
}

function syncSidebar() {
  const sidebar = document.querySelector('.sidebar')
  if (!sidebar) return

  if (state.sidebarOpen) {
    sidebar.classList.add('open')
  } else {
    sidebar.classList.remove('open')
  }
}

function syncMenuButton() {
  const btn = document.getElementById('menu-button')
  if (!btn) return

  const menuIcon = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="white" stroke-width="2">
      <line x1="3" y1="6" x2="21" y2="6"></line>
      <line x1="3" y1="12" x2="21" y2="12"></line>
      <line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>
  `

  const closeIcon = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="white" stroke-width="2">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  `

  btn.innerHTML = state.sidebarOpen ? closeIcon : menuIcon
  btn.style.left = state.sidebarOpen ? '280px' : '15px'
}

function createMenuButton() {
  const btn = document.createElement('button')
  btn.id = 'menu-button'

  btn.style.display = 'flex'
  btn.style.alignItems = 'center'
  btn.style.justifyContent = 'center'

  btn.onclick = () => {
    state.sidebarOpen = !state.sidebarOpen
    syncSidebar()
    syncMenuButton()
  }

  document.body.appendChild(btn)

  syncMenuButton()
}

// render

function render() {
  document.querySelector('.sidebar')?.remove()

  const sidebar = Sidebar(state, actions)
  document.body.appendChild(sidebar)

  syncSidebar()
  syncMenuButton()

  if (state.currentBook) {
    document.getElementById('book-title').textContent = state.currentBook.title
    document.getElementById('book-text').textContent = state.currentBook.content
  }
}

createMenuButton()
render()