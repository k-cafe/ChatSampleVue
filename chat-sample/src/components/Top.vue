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
  import { User } from '../models'
//   import {
//     required,
//     email,
//     minLength,
//     maxLength
//   } from 'vuelidate/lib/validators'
export default {
  name: 'Top',
  mixins: [validationMixin],
  data() {
    return {
      user: new User(),
      sending: false,
    };
  },
  validations: {

  },
}
</script>

<style scoped>

</style>
