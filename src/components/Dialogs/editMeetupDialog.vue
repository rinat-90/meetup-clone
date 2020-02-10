<template>
  <v-dialog
    v-model="dialog"
    width="500"
    persistent>
    <template v-slot:activator="{ on }">
      <v-btn
        @click="dialog = true"
        color="red"
        dark
        fab
        icon>
        <v-icon>edit</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title
        class="primary--text"
        primary-title
      >
        <h3>Edit Meetup</h3>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-form v-model="valid" ref="form">
          <v-text-field
            v-model="title"
            :rules="rules.title"
            prepend-icon="title"
            type="text"
            label="Title"
            required>
          </v-text-field>
          <v-text-field
            v-model="location"
            :rules="rules.location"
            prepend-icon="location_on"
            type="text"
            label="Location"
            required>
          </v-text-field>
          <v-textarea
            v-model="description"
            :rules="rules.description"
            prepend-icon="list"
            type="text"
            label="Description"
            required>
          </v-textarea>
        </v-form>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          @click="dialog = false"
          color="default"
          text>
          Close
        </v-btn>
        <v-btn
          @click="onEditMeetup"
          :disabled="!valid"
          :loading="loading"
          color="primary"
          text>
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'edit-meetup-dialog',
    props: ['meetup'],
    data () {
      return {
        valid: false,
        dialog: false,
        title: this.meetup.title,
        location: this.meetup.location,
        description: this.meetup.description,
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
        },
      }
    },
    computed:{
      ...mapGetters(['user', 'loading', 'error']),
    },
    methods: {
      onEditMeetup() {
        if(this.$refs.form.validate()){
          this.$store.dispatch('updateMeetup', {
            id: this.meetup.id,
            title: this.title,
            location: this.location,
            description: this.description
          });

          this.dialog = false
        }
      }
    }
  }
</script>
