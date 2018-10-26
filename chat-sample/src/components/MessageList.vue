<template>
  <div class="margin-15px">
    <h1>Message</h1>
    <div v-if="this.comments">
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
import { mapGetters, mapActions } from 'vuex';
import Message from './Message.vue';

export default {
  name: 'Message',
  components: {
    'chat-message': Message,
  },
  computed: {
    ...mapGetters('comments', ['comments']),
    // hasComments() { return this.comments.length > 0; }
  },
  actions: {
    ...mapActions('comments', ['clear', 'INIT_COMMENT', 'DESTROY_COMMENT']),
  },
  created() {
    this.INIT_COMMENT;
  },
  destroyed() {
    this.DESTROY_COMMENT;
  },
}
</script>
