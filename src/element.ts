import { window } from './global'
import { fixedAttrs } from './options'
import PlaceHolder from './placeholder'
import { HTMLFixedElement } from '../types'

class Element {
  public el!: HTMLFixedElement
  public style!: CSSStyleDeclaration | null
  public placeholder!: PlaceHolder
  public parent!: (Node & ParentNode) | null
  public rect!: ClientRect | DOMRect

  public constructor (el: HTMLFixedElement) {
    if (!el) return

    this.el = el
    this.parent = el.parentNode
    this.style = { ...window.getComputedStyle(el) }
    this.rect = el.getBoundingClientRect()
    this.placeholder = el.placeholderNode || new PlaceHolder(this)
    this.bindScrollHandler()
  }

  public destroy (): void {
    this.unbindScrollHandler()
    this.placeholder.destroy()
    this.el.placeholderNode = null
    this.el.fixedHandler = null
  }

  public setPlaceHolder (placeholder: PlaceHolder): Element {
    this.el.placeholderNode = placeholder

    return this
  }

  public setStyle (style: object): Element {
    for (const key in style) {
      (this.el.style as any)[key] = (style as any)[key]
    }

    return this
  }

  public isFixed (): boolean {
    const { placeholder, style } = this

    if (!placeholder.el || !style) return false

    return placeholder.el.getBoundingClientRect().top + (parseFloat(style.marginTop + '') || 0) <= 0
  }

  public bindScrollHandler (): Element {
    const { el, rect, style, placeholder } = this

    el.fixedHandler = (): void => {
      const fixed = this.isFixed()
      const fixedBaseStyle = { position: 'fixed', zIndex: '99', top: '0', left: '0', margin: '0' }

      // element hidden
      if (!rect.width && !rect.height) return

      // set element style
      fixedAttrs.forEach((attr: string): void => {
        // fixed
        if (fixed) {
          this.setStyle({
            [attr]: (fixedBaseStyle as any)[attr],
            left: `${rect.left}px`,
            width: `${rect.width}px`
          })
        } else {
          if (style) {
            this.setStyle({
              [attr]: (style as any)[attr]
            })
          }
        }
      })

      // fixed to show placeholder or hidden it
      fixed ? placeholder.show() : placeholder.hidden()
    }

    if (typeof this.el.fixedHandler === 'function') window.addEventListener('scroll', this.el.fixedHandler as EventListenerOrEventListenerObject)

    return this
  }

  public unbindScrollHandler (): Element {
    window.removeEventListener('scroll', this.el.fixedHandler as EventListenerOrEventListenerObject)

    return this
  }
}

export default Element
