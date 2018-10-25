<template>
  <div class="margin-15px">
    <h1>Message</h1>
    <div v-if="hasComments">
      <div v-for="comment in this.comments" :key="comment.id">
        <chat-message :comment="comment"></chat-message>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .margin-15px {
    margin-top: 15px;
    margin-bottom: 15px;
    margin-left: 15px;
    margin-right: 15px;
  }
</style>

<script>
import { mapGetters } from 'vuex';
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
  computed: {
    ...mapGetters('comments', ['comments']),
    hasComments() { return this.comments.length > 0; }
  },
}
</script>
