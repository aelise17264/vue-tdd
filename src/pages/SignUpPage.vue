<template>
  <h1>Sign Up</h1>
  <label for="username">Username</label>
  <input id="username" placeholder="username" @input="onChangeUserName"/>

  <label for="email">Email</label>
  <input id="email" placeholder="email" />

  <label for="password">Password</label>
  <input type="password" id="password" @input="onChangePassword" />

  <label for="password2">Repeat Password</label>
  <input type="password" id="password2" @input="onChangePassword2" />

  <button :disabled="isDisabledComputed">Sign Up</button>
</template>

<script>
export default {
  name: "SignUpPage",
  data() {
    return {
      disabled: true,
      username: '',
      password: "",
      password2: "",
    };
  },
  methods: {
    onChangePassword(event) {
      this.password = event.target.value;
    },
    onChangePassword2(event) {
      this.password2 = event.target.value;
    },
    onChangeUserName(event) {
      this.username = event.target.value;
    },
    isDisabled() {
      return this.password && this.password2
        ? this.password != this.password2
        : true;
    },
  },
  computed: {
    //cached based on their reactive properties
    isDisabledComputed(){
        return this.password && this.password2
        ? this.password != this.password2
        : true;
    }
  }
};
</script>
