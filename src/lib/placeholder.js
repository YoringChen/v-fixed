import { document } from './global.js'

const _base_style = ['width', 'height', 'display', 'margin', 'position']

class PlaceHolder {
  constructor(el) {
    this.ele = document.createElement(el.nodeName || 'div')
    this._customer_style = {}

    // insert placeholder to parentNode
    el.parentNode.insertBefore(this.ele, el);
  }

  getEle() {
    return this.ele
  }

  setStyle(style) {
    _base_style.forEach(property => {
      this.ele.style[property] = style[property] || this.ele.style[property]
      this._customer_style[property] = this.ele.style[property]
    })

    return this
  }

  hidden() {
    this.ele.style.display = 'none'

    return this
  }

  show() {
    this.ele.style.display = this._customer_style.display

    return this
  }

  destroy() {
    if (this.ele) {
      this.ele.parentNode.removeChild(this.ele)
      this.ele = null
    }

    return this
  }
}

export default PlaceHolder