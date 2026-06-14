function BookReader() {
  const container = document.getElementById('reader')

  function show(content) {
    container.textContent = content || 'Пусто'
  }

  return { show }
}

module.exports = BookReader