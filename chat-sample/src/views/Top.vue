<template>
  <div>
    <form novalidate @submit.prevent="submit" class="margin-auto text-center width-80 margin-top-15px">
      <md-card>
        <md-progress-bar md-mode="indeterminate" v-show="sending" />
        <md-card-header>
          <div class="md-title">Sign In</div>
        </md-card-header>
        <md-card-content>
          <md-field>
            <label>Your Email</label>
            <md-input name="id" v-model="signUpUser.id" :disabled="sending"></md-input>
            <span class="error" v-show="!$v.signUpUser.id.required">Invalid Id</span>
          </md-field>
          <md-field>
            <label>Your Name</label>
            <md-input name="name" v-model="signUpUser.name" :disabled="sending"></md-input>
            <span class="error" v-show="!$v.signUpUser.name.required">Invalid Name</span>
          </md-field>
        </md-card-content>

        <md-card-actions>
          <md-button type="submit" class="md-primary" :disabled="sending">Move To Chat</md-button>
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
  name: 'Top',
  mixins: [validationMixin],
  data() {
    return {
      sending: false,
    };
  },
  computed: {
    ...mapGetters('user', ['user']),
    signUpUser() {
      return Object.assign({}, this.user)
    }
  },
  methods: {
    ...mapActions('user', ['register']),
    submit() {
      if (!this.$v.$invalid) {
        this.sending = true;
        this.register(this.signUpUser);
        this.$router.push('/chat');
      }
    },
  },
  validations: {
    signUpUser: {
      id: {
        required,
        minLength: minLength(3),
      },
      name: {
        required,
        minLength: minLength(1),
      },
    },
  },
}
</script>
