import Vue from 'vue'
import VueX from 'vuex'
import firebase from 'firebase/app'
import 'firebase/firestore'

Vue.use(VueX)
export const store = new VueX.Store({
  state: {
    user: null,
    loading: false,
    error: null,
    loadedMeetups: [],
  },
  mutations: {
    REGISTER_USER_FOR_MEETUP(state, { id, fbKey } ){
      if(state.user.registeredMeetups.findIndex(meetup => meetup.id === id) >= 0){
        return
      }
      state.user.registeredMeetups.push(id);
      state.user.fbKeys[id] = fbKey;
    },
    UNREGISTER_USER_FROM_MEETUP(state, payload){
      const registeredMeetups = state.user.registeredMeetups;
      registeredMeetups.splice(registeredMeetups.findIndex(meetup => meetup.id === payload), 1 );
      Reflect.deleteProperty(state.user.fbKeys, payload);
    },
    SET_USER(state, payload){
      state.user = payload
    },
    SET_LOADING(state, payload){
      state.loading = payload
    },
    SET_ERROR(state, payload){
      state.error = payload
    },
    CREATE_MEETUP(state, payload){
      state.loadedMeetups.push(payload)
    },
    UPDATE_MEETUP(state, payload){
      const meetup = state.loadedMeetups.find(meetup => {
        if(meetup.id === payload.id){
          meetup.title = payload.title;
          meetup.location = payload.location;
          meetup.description = payload.description
        }
      })
    },
    SET_LOADED_MEETUPS(state, payload){
      state.loadedMeetups = payload
    },
    CLEAR_ERROR(state){
      state.error = null
    },
  },
  actions: {
    registerUserForMeetup({ commit, getters }, payload){
      commit('SET_LOADING', true);
      firebase.firestore().collection('users').doc(getters.user.id)
        .collection('registrations').add({ id: payload})
        .then((res) => {
          console.log(res);
          commit('SET_LOADING', false);
          commit('REGISTER_USER_FOR_MEETUP', {
            id: payload,
            fbKey: res.id
          })
        })
        .catch(error => {
          commit('SET_LOADING', false);
          commit('SET_ERROR', error);
          console.log(error);
        })
    },
    unregisterUserFromMeetup({ commit, getters }, payload){
      commit('SET_LOADING', true);
      if(!getters.user.fbKeys){
        return false
      }
      const fbKey = getters.user.fbKeys[payload];

      firebase.firestore().collection('users').doc(getters.user.id)
        .collection('registrations').doc(fbKey).remove()
        .then(() => {
          commit('SET_LOADING', false);
          commit('UNREGISTER_USER_FROM_MEETUP', payload)
        })
        .catch( error => {
          commit('SET_LOADING', false);
          commit('SET_ERROR', error);
        })
    },
    signUserUp({ commit }, { email, password }){
      commit('SET_LOADING', true);
      commit('CLEAR_ERROR');
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(res => {
          commit('SET_LOADING', false);

          const newUser = {
            id: res.user.uid,
            registeredMeetups: [],
            fbKeys:{}
          };

          commit('SET_USER', newUser);
        }).catch(error => {
        commit('SET_LOADING', false);
        commit('SET_ERROR', error);
        console.log(error);
      })
    },
    signUserIn({ commit }, { email, password }){
      commit('SET_LOADING', true);
      commit('CLEAR_ERROR');
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(res => {
          commit('SET_LOADING', false);

          const newUser = {
            id: res.user.uid,
            registeredMeetups: [],
            fbKeys:{}
          };
          commit('SET_USER', newUser);
        })
        .catch(error => {
          commit('SET_LOADING', false);
          commit('SET_ERROR', error);
          console.log(error)
        })
    },
    signUserOut({ commit }){
      firebase.auth().signOut()
        .then(() => {
          commit('SET_USER', null)
        })
    },
    autoSignIn({ commit }, user){
      commit('SET_USER', {
        id: user.uid,
        registeredMeetups: [],
        fbKeys:{}
      })
    },
    clearError({ commit }){
      commit('CLEAR_ERROR')
    },
    createMeetup ({ commit, getters }, payload) {
      let imgUrl;
      let id;
      const meetup = {
        title: payload.title,
        location: payload.location,
        description: payload.description,
        date: new Date(payload.date).toISOString(),
        creatorId: getters.user.id
      };
      commit('SET_LOADING', true);
      firebase.firestore().collection('meetups').add(meetup)
        .then(res => {
          id = res.id;
          return id
        })
        .then(id => {
          const filename = payload.image.name;
          const ext = filename.slice(filename.lastIndexOf('.'));
          return firebase.storage().ref(`meetups/${id}${ext}`).put(payload.image)
        })
        .then(file => {
          return file.ref.getDownloadURL()
        })
        .then(url => {
          imgUrl = url;
          return firebase.firestore().collection('meetups').doc(id).update({url: url})
        })
        .then(() => {
          commit('CREATE_MEETUP', {
            ...meetup,
            id,
            url: imgUrl
          });
          commit('SET_LOADING', false);
        })
        .catch(error => {
          commit('SET_LOADING', false);
          commit('SET_ERROR', error);
          console.log(error);
      })
    },
    updateMeetup({ commit }, payload){
      commit('SET_LOADING', true);
      firebase.firestore().collection('meetups').doc(payload.id).update(payload)
        .then(() => {
          commit('SET_LOADING', false);
          commit('UPDATE_MEETUP', payload);
        })
        .catch(error => {
          commit('SET_LOADING', false);
          commit('SET_ERROR', error);
        })
    },
    loadMeetups({ commit }){
      commit('SET_LOADING', true);
      firebase.firestore().collection('meetups').get()
        .then(snapshot =>{
          const arr = [];
          snapshot.forEach(doc => {
            arr.push({
              id: doc.id,
              ...doc.data()
            });
          });
          commit('SET_LOADED_MEETUPS', arr)
          commit('SET_LOADING', false);
        }).catch(error => {
        commit('SET_LOADING', true);
        commit('SET_ERRORS', error);
        console.log(error);
      })
    }
  },
  getters: {
    user(state){
      return state.user
    },
    loading(state){
      return state.loading
    },
    error(state){
      return state.error
    },
    loadedMeetups (state) {
      return state.loadedMeetups.sort((a, b) => {
        return a.date > b.date
      })
    },
    featuredMeetups (state, getters) {
      return getters.loadedMeetups.slice(0, 5)
    },
    loadedMeetup (state) {
      return (id) => {
        return state.loadedMeetups.find((meetup) => {
          return meetup.id === id
        })
      }
    }
  }
});
