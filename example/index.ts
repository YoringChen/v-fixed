import vFixed from '../src'

window.Vue.use(vFixed)

/* eslint no-new: 'off' */
new window.Vue({
  el: '#app',
  data: {
    message: 'hello!',
    show_trigger: true
  }
})
