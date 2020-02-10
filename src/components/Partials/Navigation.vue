<template>
  <div>
    <v-navigation-drawer
      v-model="sideNav"
      temporary
      absolute>
      <v-list>
        <v-list-tile
          v-for="item in links"
          :key="item.title"
          :to="item.link"
          router>
          <v-list-tile-action>
            <v-icon light>{{item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            {{item.title}}
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile
          v-if="userIsAuthenticated"
          @click="onSignOut"
          style="cursor: pointer">
          <v-list-tile-action>
            <v-icon light>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            Sign out
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dark color="primary">
      <v-toolbar-side-icon
        @click.native.stop="sideNav = !sideNav"
        class="hidden-sm-and-up">
      </v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link
          to="/"
          tag="span"
          style="cursor: pointer">
          MeetUp
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          v-for="item in links"
          :key="item.link"
          :to="item.link"
          router
          flat>
          <v-icon left>{{item.icon}}</v-icon>
          {{item.title}}
        </v-btn>
        <v-btn
          v-if="userIsAuthenticated"
          @click="onSignOut"
          flat>
          <v-icon left>exit_to_app</v-icon>
          Sign out
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
  export default {
    name: "Navigation",
    data () {
      return {
        sideNav: false,
      }
    },
    computed:{
      links(){
        let links = [
          { icon:'face', title: 'Sign up', link:'/signup' },
          { icon:'lock_open', title: 'Sign in', link:'/signin' }
        ];

        if(this.userIsAuthenticated){
          links = [
            { icon:'supervisor_account', title: 'View Meetups', link:'/meetups' },
            { icon:'room', title: 'Organize Meetus', link:'/meetup/new' },
            { icon:'person', title: 'Profile', link:'/profile' },
          ]
        }
        return links
      },
      userIsAuthenticated(){
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      }
    },
    methods: {
      onSignOut() {
        this.$store.dispatch('signUserOut');
        if(this.$route.path !== '/'){
          this.$router.push('/')
        }
      }
    }
  }
</script>

<style scoped>

</style>
