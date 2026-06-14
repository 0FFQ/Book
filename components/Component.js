class Component {
  constructor(state, actions) {
    this.state = state
    this.actions = actions
    this.el = null
  }

  mount() {
    this.el = this.render()
    return this.el
  }

  render() {
    return document.createElement('div')
  }

  update() {
    const newEl = this.render()
    if (this.el && newEl) this.el.replaceWith(newEl)
    this.el = newEl
  }
}

module.exports = Component