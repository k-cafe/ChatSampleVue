<template>
  <div class="margin-15px">
    <div v-if="hasComments">
      <div v-for="comment in comments" :key="comment.id">
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
  methods: {
    ...mapActions('comments', ['initialized', 'subscribe', 'unsubscribe']),
  },
  computed: {
    ...mapGetters('comments', ['comments']),
    hasComments() { return this.comments.length > 0; }
  },
  created() {
    this.initialized();
    this.subscribe();
  },
  destroyed() {
    this.unsubscribe();
  },
}
</script>
