const Header = require('./Header')
const Search = require('./Search')
const BookList = require('./BookList')

function Sidebar(state, actions) {
  const sidebar = document.createElement('div')
  sidebar.className = 'sidebar'

  sidebar.appendChild(Header(state))
  sidebar.appendChild(Search(actions))

  const btn = document.createElement('button')
  btn.textContent = 'Добавить книгу'
  btn.onclick = actions.openAddModal
  sidebar.appendChild(btn)

  sidebar.appendChild(BookList(state.filtered, actions))

  return sidebar
}

module.exports = Sidebar