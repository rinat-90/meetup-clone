<template v-if="meetup">
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 >
        <app-spinner v-if="loading"></app-spinner>
        <v-card v-else>
          <v-card-title>
            <h3 class="primary--text">{{ meetup.title }}</h3>
            <v-spacer></v-spacer>
            <editMeetupDialog v-if="userIsCreator" :meetup="meetup"></editMeetupDialog>
            </v-card-title>
            <v-img :src="meetup.url" height="300px">
            </v-img>
            <v-card-text>
              <div class="info--text"> <b>{{ meetup.date | date }}</b> -- {{ meetup.location }}</div>
              <div>
                {{ meetup.description }}
              </div>
            </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <RegisterDialog :id="meetup.id"></RegisterDialog>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import { mapGetters } from 'vuex'
  import editMeetupDialog from "../components/Dialogs/editMeetupDialog";
  import RegisterDialog from "../components/Dialogs/RegisterDialog";

  export default {
    props:['id'],
    components:{ editMeetupDialog, RegisterDialog },
    computed:{
      ...mapGetters(['user', 'loading', 'error']),
      meetup(){
        return this.$store.getters.loadedMeetup(this.id)
      },
      userIsAuthenticated(){
        return this.user !== null && this.user !== undefined
      },
      userIsCreator(){
        if(this.userIsAuthenticated){
          return this.user.id === this.meetup.creatorId
        }
      }
    }
  }
</script>
