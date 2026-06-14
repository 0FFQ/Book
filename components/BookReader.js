const Component = require('./Component')

class BookReader extends Component {
  constructor(state, actions) {
    super(state, actions)

    this.el = null
    this.titleEl = null
    this.textEl = null
  }

  mount() {
    if (!this.el) {
      this.el = document.createElement('div')
      this.el.className = 'content'

      this.titleEl = document.createElement('h2')
      this.titleEl.id = 'book-title'

      this.textEl = document.createElement('pre')
      this.textEl.id = 'book-text'

      this.el.appendChild(this.titleEl)
      this.el.appendChild(this.textEl)
    }

    this.update()

    return this.el
  }

  update() {
    const book = this.state.currentBook

    if (!book) {
      this.titleEl.textContent = ''
      this.textEl.textContent = ''
      return
    }

    this.titleEl.textContent = book.title
    this.textEl.textContent = book.content
  }
}

module.exports = BookReader