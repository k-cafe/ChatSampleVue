<template>
  <form novalidate class="md-layout" @submit.prevent>
    <md-card>
      <md-card-header>
        <div class="md-title">User</div>
      </md-card-header>
      <md-card-content>
        
      </md-card-content>
    </md-card>
  </form>
</template>

<script>
  import { validationMixin } from 'vuelidate'
//   import {
//     required,
//     email,
//     minLength,
//     maxLength
//   } from 'vuelidate/lib/validators'
export default {
    name: 'Top',
    mixins: [validationMixin],
  
}
</script>

<style scoped>

</style>
