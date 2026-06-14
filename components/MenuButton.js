class MenuButton {
  constructor() {
    this.open = false
    this.el = this.create()
  }

  create() {

    const btn = document.createElement('button')
    btn.id = 'menu-button'

    const menuIcon = `<img src="assets/menu.png" class="menu-icon">`

    const closeIcon = `<img src="assets/close.png" class="menu-icon">`

    btn.innerHTML = this.open ? closeIcon : menuIcon

    btn.onclick = () => {
      const sidebar = document.querySelector('.sidebar')
      if (!sidebar) return

      this.open = !this.open
      sidebar.classList.toggle('open')

      btn.style.left = this.open ? '280px' : '15px'
      btn.innerHTML = this.open ? closeIcon : menuIcon
    }

    return btn
  }

  mount() {
    return this.el
  }
}

module.exports = MenuButton