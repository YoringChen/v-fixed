import vFixed from '../src/fixed.js'

const { Vue } = window

Vue.use(vFixed)

new Vue({
  el: '#app',
  data: {
    message: 'hello!',
    show_trigger: true
  }
})
