<template>
  <div>
    <form novalidate @submit.prevent="submit" class="margin-auto text-center width-80 margin-top-15px">
      <md-card>
        <md-progress-bar md-mode="indeterminate" v-show="sending" />
        <md-card-header>
          <div class="md-title">Your Data is ...</div>
        </md-card-header>
        <md-card-content>
          <md-field>
            <label>Your Id</label>
            <md-input name="id" v-model="user.id" :disabled="sending"></md-input>
            <span class="error" v-show="!$v.user.id.required">Invalid Id</span>
          </md-field>
          <md-field>
            <label>Your Name</label>
            <md-input name="name" v-model="user.name" :disabled="sending"></md-input>
            <span class="error" v-show="!$v.user.name.required">Invalid Name</span>
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
import { mapGetters } from 'vuex'
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
    ...mapGetters('user', ['user'])
  },
  methods: {
    submit() {
      if (!this.$v.$invalid) {
        this.sending = true;
        this.$router.push('/chat');
      }
    },
    isValid(prop) {
      const field = this.$v.user[prop]
      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
    },
  },
  validations: {
    user: {
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
