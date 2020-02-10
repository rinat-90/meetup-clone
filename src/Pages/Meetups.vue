<template>
  <v-container>
    <app-spinner v-if="loading"></app-spinner>
    <v-layout row wrap v-else>
      <v-flex
        v-for="(meetup, index) in loadedMeetups"
        :key="index"
        xs12 sm4>
        <v-card :key="meetup.id" >
          <v-img :src="meetup.url" height="200px"></v-img>
          <v-card-title primary-title>
            <div>
              <div class="subheading mb-2">{{ meetup.title }}</div>
              <span class="grey--text">{{ meetup.date | date }}</span>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn
              :to="'meetups/'+ meetup.id"
              color="primary"
              flat>
              <v-icon left>arrow_forward</v-icon>
              View meetup
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'meetups',
    computed:{
      ...mapGetters(['loading', 'loadedMeetups']),
    }
  }
</script>

