import { document } from './global'
import { placeholderAttrs } from './options'
import Element from './element'

class PlaceHolder {
  public el!: HTMLElement | null
  public style!: CSSStyleDeclaration | null

  public constructor (element: Element) {
    this.el = document.createElement(element.el.nodeName || 'div')
    this.style = element.style

    // init style
    placeholderAttrs.forEach((attr: string): void => {
      this.setStyle({ [attr]: (this.style as any)[attr] })
    })

    // fixed to show placeholder or hidden it
    element.rect.top <= 0 ? this.show() : this.hidden()

    // insert placeholder to parentNode
    if (element.parent) element.parent.insertBefore(this.el, element.el)

    element.setPlaceHolder(this)
  }

  public setStyle (style: object): PlaceHolder {
    const { el } = this

    if (!el) return this

    for (const key in style) {
      (el.style as any)[key] = (style as any)[key]
    }

    return this
  }

  public hidden (): PlaceHolder {
    const { el } = this

    if (el) {
      el.style.width = '0'
      el.style.height = '0'
      el.style.margin = '0'
      el.style.padding = '0'
    }

    return this
  }

  public show (): PlaceHolder {
    const { style, el } = this

    if (style && el) {
      el.style.width = style.width
      el.style.height = style.height
      el.style.margin = style.margin
      el.style.padding = style.padding
    }

    return this
  }

  public destroy (): PlaceHolder {
    const { el } = this

    if (el) {
      if (el.parentNode) {
        el.parentNode.removeChild(el)
      }

      this.el = null
    }

    return this
  }
}

export default PlaceHolder
