<template>
  <div class="margin-15px">
    <div class="display-inline-block">
        <md-avatar class="md-avatar-icon md-large">{{ initial }}</md-avatar>
    </div>
    <div class="display-inline-block">
      <md-card class="md-large margin-left-20"><md-card-content>{{ comment.message }}</md-card-content></md-card>
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
import { Comment } from '../models';

export default {
  name: 'Message',
  props: {
    comment: {
      type: Comment,
      required: true,
    },
  },
  computed: {
      initial() {
        return this.comment.user.name.substring(0, 1);
      },
  },
}
</script>
