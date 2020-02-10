<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm6 class="text-sm-right text-xs-center">
        <v-btn large router to="/meetups">Explore Mettup</v-btn>
      </v-flex>
      <v-flex xs12 sm6 class="text-sm-left text-xs-center">
        <v-btn large router to="/meetup/new">Organize Mettup</v-btn>
      </v-flex>
    </v-layout>

    <v-layout row wrap class="mt-2">
      <v-flex xs12>
        <app-spinner v-if="loading"></app-spinner>
        <v-carousel v-else>
          <v-carousel-item
            v-for="meetup in featuredMeetups"
            :src="meetup.url"
            :key="meetup.id"
            @click.native.stop="onLoadMeetup(meetup.id)">
            <div class="title">
              {{ meetup.title }}
            </div>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>

    <v-layout row wrap class="mt-2">
      <v-flex xs12  class="text-xs-center">
        <p>Join our awesome meetup</p>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default{
    computed:{
      ...mapGetters(['loading', 'featuredMeetups']),
    },
    methods:{
      onLoadMeetup(id){
        this.$router.push('/meetups/'+id)
      }
    },

  }
</script>


<style scope>
  .title{
    position: absolute;
    bottom: 50px;
    width:100%;
    background-color: rgba(0,0,0, 0.5);
    color: #fff;
    font-size:2em;
    text-align: center;
    padding-top:10px;
  }
</style>

