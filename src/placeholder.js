import { document } from './global.js'
import { placeholderAttrs } from './options.js'

class PlaceHolder {
  constructor(element) {
    this.el = document.createElement(element.el.nodeName || 'div')
    this.style = { ...element.style }

    // init style
    placeholderAttrs.forEach(attr => {
      this.setStyle({ [attr]: this.style[attr] })
    })

    // fixed to show placeholder or hidden it
    element.rect.top <= 0 ? this.show() : this.hidden()

    // insert placeholder to parentNode
    element.parent.insertBefore(this.el, element.el)

    element.setPlaceHolder(this)
  }

  setStyle(style) {
    for (const key in style) this.el.style[key] = style[key]

    return this
  }

  hidden() {
    this.el.style.width = 0
    this.el.style.height = 0
    this.el.style.margin = 0
    this.el.style.padding = 0

    return this
  }

  show() {
    this.el.style.width = this.style.width
    this.el.style.height = this.style.height
    this.el.style.margin = this.style.margin
    this.el.style.padding = this.style.padding

    return this
  }

  destroy() {
    if (this.el) {
      this.el.parentNode.removeChild(this.el)
      this.el = null
    }

    return this
  }
}

export default PlaceHolder