<template>
  <div class="margin-15px">
    <h1>Message</h1>
    <chat-message :comment="comment"></chat-message>
  </div>
</template>

<style scoped>
  .display-inline-block {
    display: inline-block;
  }
  .margin-15px {
    margin-top: 15px;
    margin-bottom: 15px;
    margin-left: 15px;
    margin-right: 15px;
  }
  .text-center {
    text-align: center;
  }
  .margin-left-20 {
    margin-left: 20px;
  }
  .margin-left-20:before {
    content: "";
    position: absolute;
    top: 50%;
    left: -30px;
    margin-top: -15px;
    border: 15px solid transparent;
    border-right: 15px solid white;
  }
</style>

<script>
import { Comment, User } from '../models';
import Message from './Message.vue';

export default {
  name: 'Message',
  data() {
    return {
      comment: new Comment('comment1', 'Start Chat', new User('user01', 'kohei')),
    };
  },
  components: {
    'chat-message': Message,
  },
}
</script>
