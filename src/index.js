const vFixed = {
  install(Vue) {
    Vue.directive('fixed', {
      bind (ele) {
        const element = ele
        element.innerHTML = 'hello v-fixed'
      }
    })
  }
}
window.vFixed = vFixed
export default vFixed