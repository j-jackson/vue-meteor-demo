<template>
  <div class="notes">
    <input v-model="newNote" placeholder="Add a note" @keyup.enter="addNote" />
    <div class="note" v-for="note in notes">
      <div class="text">{{ note.text }}</div>
      <div class="actions">
        <button @click="removeNote(note)">Delete note</button>
        <span class="date">{{ note.created | date }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { Meteor } from 'meteor/meteor'
import { Notes } from '../api/collections'

export default {
  data () {
    return {
      newNote: '',
      notes: [],
    }
  },

  meteor: {
    subscribe: {
      'notes': [],
    },
    notes () {
      return Notes.find({}, {
        sort: { created: -1 },
      })
    },
  },

  methods: {
    async addNote () {
      if (this.newNote) {
        try {
          await Meteor.callPromise('notes.add', {
            text: this.newNote,
          })
          this.newNote = ''
        } catch (e) {
          console.error(e)
        }
      }
    },

    async removeNote (note) {
      try {
        await Meteor.callPromise('notes.remove', {
          _id: note._id,
        })
      } catch (e) {
        console.error(e)
      }
    },
  },
}
</script>

<style lang="less" scoped>
.note {
  padding: 32px 0;

  &:not(:last-child) {
    border-bottom: solid 1px fade(black, 10%);
  }

  .text {
    margin-bottom: 12px;
  }

  .date {
    margin-left: 16px;
    color: lighten(black, 70%);
  }
}

input {
  display: block;
  width: 100%;
}
</style>
