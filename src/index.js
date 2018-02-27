import Element from './element.js'

const vFixed = {
  install(Vue) {
    Vue.directive('fixed', {
      inserted(el) {
        el._fixed_element = new Element(el)
      },
      unbind(el) {
        el._fixed_element.destroy()
      },
    })
  }
}

export default vFixed