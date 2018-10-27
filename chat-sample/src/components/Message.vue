<template>
  <div class="margin-15px">
    <div v-if="!this.isYourComment">
      <div class="display-inline-block">
        <md-avatar class="md-avatar-icon md-large">{{ initial }}</md-avatar>
      </div>
      <div class="display-inline-block">
        <md-card class="md-large other-comment"><md-card-content>{{ comment.message }}</md-card-content></md-card>
      </div>
    </div>
    <div v-else class="text-right">
      <div class="display-inline-block">
        <md-card class="md-large your-comment"><md-card-content>{{ comment.message }}</md-card-content></md-card>
      </div>
      <div class="display-inline-block">
        <md-avatar class="md-avatar-icon md-large">{{ initial }}</md-avatar>
      </div>
    </div>
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
  .text-right {
    text-align: right;
  }
  .other-comment {
    margin-left: 20px;
  }
  .other-comment:before {
    content: "";
    position: absolute;
    top: 50%;
    left: -30px;
    margin-top: -15px;
    border: 15px solid transparent;
    border-right: 15px solid white;
  }
  .your-comment {
    margin-right: 20px;
  }
  .your-comment:before {
    content: "";
    position: absolute;
    top: 50%;
    left: 100%;
    margin-top: -15px;
    border: 15px solid transparent;
    border-left: 15px solid white;
  }
</style>

<script>
import { mapGetters } from 'vuex';
import { Comment } from '../models';

export default {
  name: 'Message',
  props: {
    comment: {
      comment: Comment,
      required: true,
    },
  },
  computed: {
      ...mapGetters('user', ['user']),
      isYourComment() {
        return this.comment.user.id === this.user.id;
      },
      initial() {
        return this.comment.user.name.substring(0, 1);
      },
  },
}
</script>
