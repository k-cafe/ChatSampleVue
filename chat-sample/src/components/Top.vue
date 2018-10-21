<template>
  <form novalidate class="md-layout" @submit.prevent>
    <md-card>
      <md-card-header>
        <div class="md-title">User</div>
      </md-card-header>
      <md-card-content>
        <!-- <md-field :class="getValidationClass('id')"> -->
          <input name="id" v-model="user.id" :disabled="sending">
        <!-- </md-field> -->
      </md-card-content>
    </md-card>
  </form>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { mapGetters } from 'vuex'

export default {
  name: 'Top',
  mixins: [validationMixin],
  data() {
    return {
      sending: false,
    };
  },
  created() {
  },
  computed: {
    // '...' means sharing 'computed' and 'state'
    ...mapGetters('user', ['user'])
  },
  validations: {

  },
}
</script>

<style scoped>

</style>
