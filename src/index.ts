import Element from './element'
import { HTMLFixedElement } from '../types'

const vFixed = {
  install (Vue: any): void {
    Vue.directive('fixed', {
      inserted (el: HTMLFixedElement): void {
        el._fixedElement = new Element(el)
      },
      unbind (el: HTMLFixedElement): void {
        el._fixedElement.destroy()
      }
    })
  }
}

export default vFixed
