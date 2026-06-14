const Sidebar = require('./components/Sidebar')
const BookReader = require('./components/BookReader')
const MenuButton = require('./components/MenuButton')
const AddBookModal = require('./components/AddBookModal')
const Storage = require('./components/Storage')

let state = {
  books: Storage.getBooks(),
  filtered: Storage.getBooks(),
  currentBook: null
}

const actions = {
  search: (text) => {
    state.filtered = state.books.filter(b =>
      b.title.toLowerCase().includes(text.toLowerCase())
    )
    render()
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

    render()
  },

  openAddModal: () => {
    const modal = new AddBookModal(() => {
      state.books = Storage.getBooks()
      state.filtered = state.books
      updateBookList()
      updateHeader()
    })

    modal.open()
  }
}

function render() {
  document.body.innerHTML = ''

  document.body.appendChild(new Sidebar(state, actions).mount())
  document.body.appendChild(new BookReader(state, actions).mount())
  document.body.appendChild(new MenuButton().mount())
}

render()