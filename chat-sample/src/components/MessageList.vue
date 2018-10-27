<template>
  <div class="margin-15px">
    <h1>Message</h1>
    <div v-if="hasComments">
      <div v-for="comment in data" :key="comment.id">
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
    ...mapActions('comments', ['clear', 'startListener', 'stopListener']),
  },
  computed: {
    ...mapGetters('comments', ['data']),
    hasComments() { return this.data.length > 0; }
  },
  created() {
    this.clear();
    this.startListener();
  },
  destroyed() {
    this.stopListener();
  },
}
</script>
