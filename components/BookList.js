const Component = require('./Component')

class BookList extends Component {
  constructor(state, actions) {
    super(state, actions)
  }

  render() {
    const list = document.createElement('div')
    list.id = 'list'

    this.state.filtered.forEach(book => {
      const item = document.createElement('div')
      item.className = 'book-item'
      item.textContent = book.title

      item.onclick = () => this.actions.openBook(book)

      list.appendChild(item)
    })

    return list
  }
}

module.exports = BookList