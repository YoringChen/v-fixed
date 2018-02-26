import { window, scroll_top } from './global.js'
import { getScrollTop, throttle } from './utils.js'

// fixed base style
const _base_style = {
  position: 'fixed',
  zIndex: '99',
  top: '0',
  left: '0',
  margin: '0'
}

const getResetStyle = function (el) {
  const reset_style = {}
  const style = window.getComputedStyle(el)
  for (const key in _base_style) {
    reset_style[key] = style[key]
  }
  return reset_style
}

class Fixed {
  constructor(el) {
    this._el = el
    this._el_reset_style = getResetStyle(el)
    this._el_init_top = el.getBoundingClientRect().top + scroll_top
  }

  init() {
    this.fixedHandler = () => {
      const el = this._el
      const rect = el.getBoundingClientRect()
      const is_fixed = this.isFixed()
      const fixed_style = { ..._base_style, left: `${rect.left}px`, width: `${rect.width}px` }
      const reset_style = this._el_reset_style
      const apply_style = (is_fixed ? fixed_style : reset_style)

      // set el style with scrolling
      for (const property in apply_style) {
        el.style[property] = apply_style[property]
      }

      // set placeholder style with scrolling
      is_fixed ? el._fd_placeholder.show() : el._fd_placeholder.hidden()
    }

    // throttle scroll handler 30ms
    window.addEventListener('scroll', throttle(this.fixedHandler, 10))

    return this
  }

  destroy() {
    window.removeEventListener('scroll', this.fixedHandler)
    this.fixedHandler = null
  }

  isFixed() {
    if (!this._el) return false
    return getScrollTop() > this._el_init_top
  }
}

export default Fixed