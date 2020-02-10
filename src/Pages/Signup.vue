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
                v-model="newUser.email"
                :rules="rules.email"
                type="email"
                name="email"
                label="Email"
                required>
              </v-text-field>
              <v-text-field
                v-model="newUser.password"
                :rules="rules.password"
                type="password"
                name="password"
                label="Password"
                required>
              </v-text-field>
              <v-text-field
                v-model="newUser.confirmPassword"
                :rules="rules.confirmPassword"
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password">
              </v-text-field>
              <v-btn
                :disabled="!valid"
                :loading="loading"
                color="primary"
                @click.prevent="onSignUp">
                Sign up
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
    name: 'signup',
    data(){
      return{
        valid: false,
        newUser:{
          email: '',
          password: '',
          confirmPassword: '',
        },
        rules:{
          email: [
            v => !!v || 'E-mail is required',
            v => /.+@.+/.test(v) || 'E-mail must be valid'
          ],
          password: [
            v => !!v || 'Password is required',
            v => (v && v.length >= 6) || 'Password must be at least 6 characters'
          ],
          confirmPassword: [
            v => !!v || 'Password confirm is required',
            v => (v && v === this.newUser.password) || 'Password does not match',
            v => (v && v.length >= 6) || 'Password must be at least 6 characters'
          ]
        },
      }
    },
    computed:{
      ...mapGetters(['user', 'loading', 'error']),
    },
    methods:{
      onSignUp(){
        if (this.$refs.form.validate()) {
          const { email, password } = this.newUser;
          this.$store.dispatch('signUserUp', { email, password });
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

