<template>
  <div>
    <md-toolbar class="md-primary">
      <div class="md-toolbar-row">
        <div class="md-toolbar-section-start">
          <md-button class="md-icon-button" @click="menuIsVisible = true">
            <md-icon>menu</md-icon>
          </md-button>
          <h3 class="md-title">Chat Sample</h3>
        </div>
      </div>
    </md-toolbar>
    <md-drawer :md-active.sync="menuIsVisible">
      <md-toolbar class="md-transparent" md-elevation="0">
        <span class="md-title">Menu</span>
      </md-toolbar>

      <md-list>
        <md-list-item>
          <md-icon>home</md-icon>
          <span class="md-list-item-text" @click="moveTo('/')">Home</span>
        </md-list-item>
        <md-list-item>
          <md-icon>chat</md-icon>
          <span class="md-list-item-text" @click="moveTo('/chat')">Chat</span>
        </md-list-item>
      </md-list>
    </md-drawer>
    <router-view></router-view>
  </div>
</template>

<style>
.md-list-item-text:hover {
  cursor: pointer;
  color: #528bf7;
}
</style>

<script>
export default {
  name: 'app',
  data() {
    return {
      menuIsVisible: false,
    };
  },
  methods: {
    moveTo(path) {
      this.$router.push(path);
      this.menuIsVisible = false;
    },
  },
};
</script>
