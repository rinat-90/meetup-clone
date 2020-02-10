import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import firebase from 'firebase/app'
import 'firebase/auth'
import router from './router'
import { store } from './store'
import DateFilter from './filters/date'
import 'vuetify/dist/vuetify.min.css'
import colors from 'vuetify/es5/util/colors'
import Alert from "./components/Partials/Alert";
import Spinner from './components/Partials/Spinner'

Vue.use(Vuetify, {
  theme: {
    primary: colors.red.darken2, // #D32F2F
    secondary: colors.red.lighten4, // #FFCDD2
    accent: colors.indigo.base // #3F51B5
  }
});
Vue.config.productionTip = false;
Vue.filter('date', DateFilter);
Vue.component('app-alert', Alert);
Vue.component('app-spinner', Spinner);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created(){
    firebase.initializeApp({
      apiKey: 'AIzaSyBviu2I1qM_Ld67v5PGz4-pW8rclxPZtB8',
      authDomain: 'meetup-3ae34.firebaseapp.com',
      databaseURL: 'https://meetup-3ae34.firebaseio.com',
      projectId: 'meetup-3ae34',
      storageBucket: 'meetup-3ae34.appspot.com',
      messagingSenderId: '774475716159',
      appId: '1:774475716159:web:15763679e3ea0335'
    });
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        this.$store.dispatch('autoSignIn', user);
      }
    });
    this.$store.dispatch('loadMeetups')
  }
});
