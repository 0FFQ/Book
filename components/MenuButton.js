function MenuButton(state, sync) {
  const btn = document.createElement('button')
  btn.id = 'menu-button'

  btn.style.display = 'flex'
  btn.style.alignItems = 'center'
  btn.style.justifyContent = 'center'

  btn.onclick = () => {
    state.sidebarOpen = !state.sidebarOpen
    sync()
  }

  return btn
}

module.exports = MenuButton