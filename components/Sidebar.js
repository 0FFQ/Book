const Component = require('./Component')

class Sidebar extends Component {
  constructor(state, actions) {
    super(state, actions)
  }

  render() {
    const sidebar = document.createElement('div')
    sidebar.className = 'sidebar'

    const input = document.createElement('input')
    input.placeholder = 'Поиск...'

    input.oninput = (e) => {
      this.actions.search(e.target.value)
    }

    const list = document.createElement('div')
    list.id = 'list'

    this.state.filtered.forEach(book => {
      const item = document.createElement('div')
      item.className = 'book-item'

      const title = document.createElement('span')
      title.className = 'book-title'
      title.textContent = book.title

      const delBtn = document.createElement('button')
      delBtn.className = 'delete-btn'

      const deleteIcon = document.createElement('img')
      deleteIcon.src = 'assets/delete.png'
      deleteIcon.width = 14
      deleteIcon.height = 14

      delBtn.appendChild(deleteIcon)

      delBtn.onclick = (e) => {
        e.stopPropagation()
        this.actions.removeBook(book)
      }

      item.onclick = () => this.actions.openBook(book)

      item.appendChild(title)
      item.appendChild(delBtn)

      list.appendChild(item)
    })

    const addBtn = document.createElement('button')
    addBtn.textContent = 'Добавить книгу'
    addBtn.onclick = this.actions.openAddModal

    sidebar.appendChild(input)
    sidebar.appendChild(list)
    sidebar.appendChild(addBtn)

    return sidebar
  }
}

module.exports = Sidebar