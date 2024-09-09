<template>
    <div class="d-flex align-center justify-center" style="height: 100vh">
      <v-card class="login-card" elevation="8" rounded="lg">
        <div class="text-subtitle-1 text-medium-emphasis">Account</div>
  
        <v-text-field
          density="compact"
          placeholder="Email address"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
        ></v-text-field>
  
        <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
          Password
          <a class="text-caption text-decoration-none text-blue" href="#" rel="noopener noreferrer" target="_blank">
            Forgot login password?
          </a>
        </div>
  
        <v-text-field
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          placeholder="Enter your password"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="visible = !visible"
        ></v-text-field>
  
        <v-btn block class="mb-8" color="blue" size="large" variant="tonal">
          Log In
        </v-btn>
  
        <v-card-text class="text-center">
            <p class="text-body-2">
            <a href="#" @click.prevent="goToLoginSignup" class="text-blue text-decoration-none">Sign Up</a>
          </p>
        </v-card-text>
      </v-card>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        visible: false,
      };
    },
    methods: {
      goToLoginSignup() {
        this.$router.push("/signup");
      },
    },
  }
  </script>
  
  <style scoped>
  .login-card {
    width: 428px; /* Set the desired width */
    max-width: none; /* Remove the max-width constraint */
    border: 1px solid #ddd; /* Light gray border */
    border-radius: 8px; /* Rounded corners */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Shadow for depth */
    padding: 16px; /* Padding inside the card */
  }
  
  </style>
  