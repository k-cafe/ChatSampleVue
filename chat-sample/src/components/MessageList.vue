<template>
  <div class="margin-15px">
    <h1>Message</h1>
    <div v-if="hasComments">
      <div v-for="comment in this.getComments" :key="comment.id">
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
  created() {
    this.$store.dispatch('comments/INIT_COMMENT');
  },
  components: {
    'chat-message': Message,
  },
  computed: {
    ...mapGetters('comments', ['getComments']),
    hasComments() { return this.comments.length > 0; }
  },
  actions: {
    ...mapActions('comments', ['INIT_COMMENT', 'DESTROY_COMMENT']),
  },
  destroyed() {
    this.DESTROY_COMMENT;
  },
}
</script>
