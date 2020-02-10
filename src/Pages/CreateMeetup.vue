<template>
  <v-container>
    <v-layout row justify-center>
      <v-flex xs12 md8 >
        <h2 class="text-sm-center">Create a new Meetup</h2>
        <v-form v-model="valid" ref="form">
          <v-text-field
            v-model="meetup.title"
            :rules="rules.title"
            prepend-icon="title"
            label="Title"
            type="text"
            required>
          </v-text-field>
          <v-text-field
            v-model="meetup.location"
            :rules="rules.location"
            prepend-icon="location_on"
            label="Location">
          </v-text-field>
          <div class="text-xs-center">
            <v-btn
              @click="onPickFile"
              color="primary lighten-2"
              dark>
              <v-icon dark>backup</v-icon>
            </v-btn>
            <input
              @change="onFilePicked"
              ref="fileInput"
              accept="image/*"
              type="file"
              style="display: none" />
            <p class="my-2 text--grey">Upload cover image</p>
            <v-img
              v-if="meetup.url"
              class="mx-auto"
              :src="meetup.url"
              alt=""
              height="250"
              width="400">
            </v-img>
          </div>

          <v-textarea
            v-model="meetup.description"
            :rules="rules.description"
            prepend-icon="list"
            type="text"
            label="Description">
          </v-textarea>
          <v-text-field
            v-model="meetup.date"
            :rules="rules.date"
            type="date"
            label="Pick a date"
            prepend-icon="event">
          </v-text-field>
          <v-text-field
            v-model="meetup.time"
            :rules="rules.time"
            type="time"
            label="Picker a time"
            prepend-icon="access_time"
          ></v-text-field>

          <div class="text-xs-center">
            <v-btn
              @click="onCreateMeetup"
              :loading="loading"
              :disabled="!valid"
              color="primary">
              Create Meetup
            </v-btn>
          </div>

        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    name: 'create-meetup',
    data(){
      return{
        valid: false,
        meetup:{
          title: '',
          location: '',
          url: '',
          description: '',
          date: new Date().toISOString().substr(0, 10),
          time: null,
          image: null
        },
        rules:{
          title: [
            v => !!v || 'Title is required',
          ],
          location: [
            v => !!v || 'Location is required',
          ],
          description: [
            v => !!v || 'Description is required',
          ],
          date: [
            v => !!v || 'Password is required',
          ],
          time: [
            v => !!v || 'Password is required',
          ],

        }
      }
    },
    computed: {
      ...mapGetters(['user', 'loading', 'error'])
    },

    methods:{
      onCreateMeetup(){
        if(!this.meetup.image){
          return
        }
        if(this.$refs.form.validate()){
          this.$store.dispatch('createMeetup', this.meetup);
          this.$router.push('/meetups')
        }

      },
      onPickFile() {
        this.$refs.fileInput.click()
      },
      onFilePicked(e){
        const files = e.target.files;
        const fileName = files[0].name;
        //console.log(files[0]);
        if(fileName.lastIndexOf('.') <= 0){
          return alert('Please add proper file')
        }
        const fileReader = new FileReader();
        fileReader.addEventListener('load', () => {
          this.meetup.url = fileReader.result
        });
        fileReader.readAsDataURL(files[0])
        this.meetup.image = files[0]
      }
    }
  }
</script>

