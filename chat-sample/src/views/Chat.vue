<template>
  <div>
    <div id="container">
      <h1 class="text-align-center">Message</h1>
      <div id="body">
        <message-list></message-list>
      </div>
    </div>
    <div id="footer">
      <md-card class="margin-bottom-5">
          <div class="inline-block width-90 text-field">
            <md-field>
              <md-textarea placeholder="メッセージを入力してください" md-autogrow v-model="message"></md-textarea>
            </md-field>
          </div>
          <div class="inline-block width-10 text-align-center">
            <md-button
              class="md-icon-button text-align-center"
              v-bind:class="isAbleToSend ? 'md-primary' : ''"
              v-bind:disabled="!isAbleToSend"
              @click="sendProcess()">
              <md-icon>send</md-icon>
            </md-button>
          </div>
      </md-card>
    </div>
  </div>
</template>

<style scope>
  #container {
    width: 100%;
    position: relative;
    height: auto !important;
    height: 100%;
    min-height: 50%;
  }
  #body {
      position: relative;
      overflow: auto;
      width: 100%;
      height: 75vh;
  }
  #footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    padding-left: 5px;
    padding-right: 5px;
  }
  .margin-bottom-5 {
    margin-bottom: 5px;
  }
  .inline-block {
    display: inline-block;
  }
  .width-90 {
    width: 90%;
  }
  .width-10 {
    width: 10%;
  }
  .text-field {
    padding-left: 8px;
    padding-right: 8px;
  }
  .text-align-center {
    text-align: center;
  }
</style>

<script>
import { mapGetters, mapActions } from 'vuex';
import { Comment } from '../models';
import MessageList from '@/components/MessageList.vue';

export default {
  name: 'Chat',
  components: {
    'message-list': MessageList,
  },
  data() {
    return {
      message: '',
      isAbleToSend: false,
    };
  },
  computed: {
    ...mapGetters('user', ['user']),
  },
  methods: {
    ...mapActions('comments', ['addComments']),
    sendProcess() {
      if (this.message.length === 0) return;
      const comment = new Comment('', this.message, Object.assign({}, this.user));
      this.addComments(comment);
      this.message = '';
    }
  },
  watch: {
    message(newMessage) {
      this.isAbleToSend = newMessage.length > 0 ? true : false;
    }
  }
};
</script>
