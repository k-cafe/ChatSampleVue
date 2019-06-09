<template>
  <div>
    <form novalidate @submit.prevent="submit" class="margin-auto text-center width-80 margin-top-15px">
      <md-card>
        <md-progress-bar md-mode="indeterminate" v-show="sending" />
        <md-card-header>
          <div class="md-title">Sign In</div>
        </md-card-header>
        <md-card-content>
          <div v-if="occuredError" class="error">認証エラーです！</div>
          <md-field>
            <label>Your Email</label>
            <md-input name="email" v-model="email" :disabled="sending"></md-input>
            <span class="error" v-show="!$v.email.required">Invalid Email</span>
          </md-field>
          <md-field :md-toggle-password="false">
            <label>Your Password</label>
            <md-input name="password" v-model="password" :disabled="sending" type="password"></md-input>
            <span class="error" v-show="!$v.password.required">Invalid Password</span>
          </md-field>
        </md-card-content>

        <md-card-actions>
          <md-button type="submit" class="md-primary" :disabled="hasError">Move To Chat</md-button>
        </md-card-actions>
      </md-card>
    </form>
  </div>
</template>

<style scoped>
  .text-center {
    text-align: center;
  }
  .margin-auto {
    margin: auto;
  }
  .width-80 {
    width: 80%;
  }
  .margin-top-15px {
    margin-top: 15px;
  }
  .error {
    color: red;
  }
</style>

<script>
import { validationMixin } from 'vuelidate'
import { mapGetters, mapActions } from 'vuex'
import { required, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'SignIn',
  mixins: [validationMixin],
  data() {
    return {
      sending: false,
      email: null,
      password: null,
      occuredError: false
    };
  },
  computed: {
    hasError() {
      return this.$v.$invalid || this.sending;
    }
  },
  methods: {
    ...mapActions('user', ['signInWithEmailAndPasswords']),
    async submit() {
      if (!this.$v.$invalid) {
        this.sending = true;
        const isSucceeded = await this.signInWithEmailAndPasswords({ email: this.email, password: this.password });
        if (isSucceeded) this.$router.push('/chat');
        this.sending = false;
        this.occuredError = true;
      }
    },
  },
  validations: {
    email: {
      required,
      minLength: minLength(3),
    },
    password: {
      required,
      minLength: minLength(1),
    },
  },
}
</script>
