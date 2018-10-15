// 占位节点
// 父节点
// 样式
// 位置信息
import { window } from './global.js'
import { fixedAttrs } from './options.js'
import PlaceHolder from './placeholder.js'

class Element {
  constructor(el) {
    if (!el) return

    this.el = el
    this.parent = el.parentNode
    this.style = { ...window.getComputedStyle(el) }
    this.rect = el.getBoundingClientRect()
    this.placeholder = el.placeholderNode || new PlaceHolder(this)
    this.bindScrollHandler()
  }

  destroy() {
    this.unbindScrollHandler()
    this.placeholder.destroy()
    this.el.placeholderNode = null
    this.el.fixedHandler = null
  }

  setPlaceHolder(placeholder) {
    this.el.placeholderNode = placeholder
  }

  setStyle(style) {
    for (const key in style) this.el.style[key] = style[key]

    return this
  }

  isFixed() {
    const { placeholder, style } = this

    return placeholder.el.getBoundingClientRect().top + (parseFloat(style.marginTop) || 0) <= 0
  }

  bindScrollHandler() {
    const { el, rect, style, placeholder } = this

    el.fixedHandler = () => {
      const fixed = this.isFixed()
      const fixed_base_style = { position: 'fixed', zIndex: '99', top: '0', left: '0', margin: '0' }

      // element hidden
      if (!rect.width && !rect.height) return

      // set element style
      fixedAttrs.forEach(attr => {
        // fixed
        if (fixed) {
          this.setStyle({
            [attr]: fixed_base_style[attr],
            left: `${rect.left}px`,
            width: `${rect.width}px`
          })
        } else {
          this.setStyle({
            [attr]: style[attr]
          })
        }
      })

      // fixed to show placeholder or hidden it
      fixed ? placeholder.show() : placeholder.hidden()
    }

    window.addEventListener('scroll', this.el.fixedHandler)

    return this
  }

  unbindScrollHandler() {
    window.removeEventListener('scroll', this.el.fixedHandler)

    return this
  }
}

export default Element