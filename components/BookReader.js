const Component = require('./Component')

class BookReader extends Component {
  constructor(state, actions) {
    super(state, actions)
  }

  render() {
    const container = document.createElement('div')
    container.className = 'content'

    const title = document.createElement('h2')
    title.id = 'book-title'

    const text = document.createElement('pre')
    text.id = 'book-text'

    if (this.state.currentBook) {
      title.textContent = this.state.currentBook.title
      text.textContent = this.state.currentBook.content
    } else {
      title.textContent = ''
      text.textContent = ''
    }

    container.appendChild(title)
    container.appendChild(text)

    return container
  }
}

module.exports = BookReader