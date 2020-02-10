<template>
  <v-container>
    <v-layout justify-center>
      <v-flex xs12 md6>
        <v-card class="pa-3">
          <v-card-text>
            <div class="mb-2" v-if="error">
              <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
            </div>
            <v-form v-model="valid" ref="form">
              <v-text-field
                v-model="email"
                :rules="rules.email"
                type="email"
                name="email"
                label="Email"
                required>
              </v-text-field>
              <v-text-field
                v-model="password"
                :rules="rules.password"
                type="password"
                name="password"
                label="Password"
                required>
              </v-text-field>
              <v-btn
                @click.prevent="onSignIn"
                :loading="loading"
                :disabled="!valid"
                color="primary">
                Sign in
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  import { mapGetters } from 'vuex';
  export default {
    name: 'signin',
    data(){
      return{
        valid: false,
        email: '',
        password: '',
        rules:{
          email: [
            v => !!v || 'E-mail is required',
            v => /.+@.+/.test(v) || 'E-mail must be valid'
          ],
          password: [
            v => !!v || 'Password is required',
            v => (v && v.length >= 6) || 'Password must be at least 6 characters'
          ]
        },
      }
    },
    computed:{
      ...mapGetters(['user', 'loading', 'error']),
    },
    methods:{
      onSignIn(){
        if (this.$refs.form.validate()) {
          this.$store.dispatch('signUserIn', { email: this.email, password: this.password });
        }
      },
      onDismissed() {
        this.$store.dispatch('clearError');
      }
    },
    watch:{
      user(val){
        if(val !== null && val !== undefined){
          this.$router.push('/')
        }
      }
    }
  }
</script>

