<template>
  <v-dialog
    v-model="dialog"
    width="500"
    persistent>
    <template v-slot:activator="{ on }">
      <v-btn
        @click="dialog = true"
        color="primary"
        dark>
        {{ userIsRegistered ? 'Unregister' : 'Register' }}
      </v-btn>
    </template>

    <v-card>
      <v-card-title
        class="primary--text"
        primary-title
      >
        <h3 v-if="userIsRegistered">Unregister from meetup?</h3>
        <h3 v-else>Register for meetup?</h3>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <p>You can always change your decision later on</p>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="default"
          text
          @click="dialog = false">
          Cancel
        </v-btn>
        <v-btn
          @click="onConfirm"
          color="success"
          text>
          Confirm
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'register-dialog',
    props: ['id'],
    data () {
      return {
        dialog: false,
      }
    },
    computed:{
      ...mapGetters(['user', 'loading', 'error']),
      userIsRegistered(){
        return this.user.registeredMeetups.findIndex(meetupId => {
          return meetupId === this.id
        }) >= 0
      }
    },
    methods: {
      onConfirm() {
        if(this.userIsRegistered){
          this.$store.dispatch('unregisterUserFromMeetup', this.id)
        }else {
          this.$store.dispatch('registerUserForMeetup', this.id)
        }
      }
    }
  }
</script>

<style scoped>

</style>
