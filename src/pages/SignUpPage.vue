<template>
  <div class="col-6 offset-3">
    <form class="card mt-5">
      <div class="card-header">
        <h1 class="text-center">Sign Up</h1>
      </div>
      <div class="card-body">
        <div class="mb-3">
          <label class="form-label" for="username">Username</label>
          <input
            class="form-control"
            id="username"
            placeholder="username"
            v-model="username"
          />
        </div>
        <div class="mb-3">
          <label class="form-label" for="email">Email</label>
          <input
            class="form-control"
            id="email"
            placeholder="email"
            v-model="email"
          />
        </div>
        <div class="mb-3">
          <label class="form-label" for="password">Password</label>
          <input
            class="form-control"
            type="password"
            id="password"
            v-model="password"
          />
        </div>
        <div class="mb-3">
          <label class="form-label" for="password2">Repeat Password</label>
          <input
            class="form-control"
            type="password"
            id="password2"
            v-model="password2"
          />
        </div>

        <div class="text-center mb-3">
          <button
            class="btn btn-primary"
            :disabled="isDisabledComputed || disabled"
            @click.prevent="submit"
          >
          <span v-if="apiProgress" class="spinner-border spinner-sprder-sm" role="status" aria-hidden="true"></span>
            Sign Up
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "SignUpPage",
  data() {
    return {
      disabled: false,
      password: "",
      password2: "",
      username: "",
      email: "",
      apiProgress: false,
    };
  },
  methods: {
    submit() {
      this.disabled = true
      this.apiProgress = true
      axios.post("/api/1.0/users", {
        username: this.username,
        email: this.email,
        password: this.password,
      });

    },
  },
  computed: {
    //cached based on their reactive properties
    isDisabledComputed() {
      return this.password && this.password2
        ? this.password != this.password2
        : true;
    },
  },
};
</script>

<style>
@import "../App.css";
</style>
