<template>
  <section id="chat">
    <form action="">
      <div class="box">
        <article class="media">
          <div class="media-left">
            <figure class="image is-64x64">
              <img src="http://placekitten.com/g/128/128" alt="Image">
            </figure>
          </div>
          <div class="media-content">
            <div class="content">
              <div class="field">
                <label class="label">Name</label>
                <div class="control">
                  <input type="text" class="input" v-model="name" placeholder="name">
                </div>
              </div>

              <div class="field">
                <label class="label">Message</label>
                <div class="control">
                  <textarea class="textarea" placeholder="Textarea" v-model="message"></textarea>
                </div>
              </div>

              <div class="field is-grouped">
                <div class="control">
                  <button class="button is-link" @click="submit">Submit</button>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </form>

    <div>
      <div v-for="(chat, i) in this.chatRecordsByTimeline" v-bind:key="i">
        <div class="box">
          <article class="media">
            <div class="media-left">
              <figure class="image is-64x64">
                <img src="http://placekitten.com/g/128/128" alt="Image">
              </figure>
            </div>
            <div class="media-content">
              <div class="content">
                <p>
                  <strong>{{ chat.name }}</strong> <small>{{ getCreatedAt(chat.createdAt) }}</small>
                  <br>
                   {{ chat.message }}
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Amplify, { API, graphqlOperation } from "aws-amplify";
import * as queries from '@/graphql/queries';
import * as mutations from '@/graphql/mutations';
import * as subscriptions from '@/graphql/subscriptions';

export default {
  name: 'chat',
  data: function() {
    return {
      name: '',
      message: '',
      chatRecords: [],
      subscription: null
    }
  },
  created: async function() {
    const listChats = await API.graphql(graphqlOperation(queries.listChats));
    if (listChats) {
      this.chatRecords = listChats.data.listChats.items;
    }

    this.subscription = API.graphql(
      graphqlOperation(subscriptions.onCreateChat)
    ).subscribe({
        next: function(chatData) {
          this.chatRecords.push(chatData.value.data.onCreateChat);
        }.bind(this)
    });
  },
  computed: {
    chatRecordsByTimeline: function() {
      return this.chatRecords.reverse();
    }
  },
  methods: {
    submit: async function() {
      const chatParams = {
        name: this.name || 'anonymous',
        message: this.message
      };

      const chat = await API.graphql(graphqlOperation(mutations.createChat, {input: chatParams}));
      this.message = '';
    },
    getCreatedAt: function(createdAt) {
      const date = new Date(createdAt);
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    }
  }
}
</script>

<style>
.box {
  margin: 20px 0;
}
</style>