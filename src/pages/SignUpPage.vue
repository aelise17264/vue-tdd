<template>
  <h1>Sign Up</h1>
  <label for="username">Username</label>
  <input id="username" 
   placeholder="username" v-model="username"/>

  <label for="email">Email</label>
  <input id="email" placeholder="email" v-model="email"/>

  <label for="password">Password</label>
  <input type="password" id="password" 
  v-model="password"
  />

  <label for="password2">Repeat Password</label>
  <input type="password" id="password2" 
  v-model="password2" />

  <button :disabled="isDisabledComputed" @click="submit">Sign Up</button>
</template>

<script>
import axios from 'axios';
export default {
  name: "SignUpPage",
  data() {
    return {
      password: "",
      password2: "",
      username: '',
      email: ''
    };
  },
  methods: {
    submit(){
      axios.post("/api/1.0/users", {
        username: this.username,
        email: this.email,
        password: this.password
      })
    }
  }
, 
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
