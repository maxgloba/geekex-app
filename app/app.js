import Vue from 'nativescript-vue'
import RadListView from 'nativescript-ui-listview/vue';

Vue.use(RadListView);

import Home from './components/Home'
import store from './store/'

Vue.config.silent = false
Vue.registerElement("DropDown", () => require("nativescript-drop-down/drop-down").DropDown)

new Vue({
  render: (h) => h('frame', [h(Home)]),
  store,
}).$start()



/*

Update app logo
tns resources generate icons  ./app/images/favicon.png --background "#151515"
tns resources generate splashes ./app/images/splashes.png --background "#151515"

Run ns tns with auto restart app
tns run ios --no-hmr

*/