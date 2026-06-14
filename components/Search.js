function Search(actions) {
  const input = document.createElement('input')
  input.placeholder = 'Поиск книги'

  input.oninput = (e) => {
    actions.search(e.target.value)
  }

  return input
}

module.exports = Search