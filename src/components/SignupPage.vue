<template>
    <div class="d-flex align-center justify-center" style="height: 100vh">
      <v-card class="signup-card" elevation="8" rounded="lg">
        <div class="text-subtitle-1 text-medium-emphasis">Sign Up</div>
  
        <v-text-field
          density="compact"
          placeholder="Username"
          prepend-inner-icon="mdi-account-outline"
          variant="outlined"
          v-model="username"
        ></v-text-field>
  
        <v-text-field
          density="compact"
          placeholder="Email address"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
          v-model="email"
        ></v-text-field>
  
        <v-text-field
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          placeholder="Enter your password"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          v-model="password"
          @click:append-inner="visible = !visible"
        ></v-text-field>
  
        <v-text-field
          :append-inner-icon="visibleConfirm ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visibleConfirm ? 'text' : 'password'"
          density="compact"
          placeholder="Confirm your password"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          v-model="confirmPassword"
          @click:append-inner="visibleConfirm = !visibleConfirm"
        ></v-text-field>
  
        <v-btn block class="mb-8" color="blue" size="large" variant="tonal" @click="signup">
          Sign Up
        </v-btn>
  
        <v-card-text class="text-center">
          <p class="text-body-2">Already have an account? 
            <a href="#" @click.prevent="goToLoginPage" class="text-blue text-decoration-none">Log In</a>
          </p>
        </v-card-text>
      </v-card>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        visible: false,
        visibleConfirm: false,
      };
    },
    methods: {
      signup() {
        if (this.password !== this.confirmPassword) {
          alert("Passwords do not match!");
          return;
        }
        // Proceed with the signup process
        // e.g., make an API call to register the user
      },
      goToLoginPage() {
        this.$router.push("/login");
      },
    },
  }
  </script>
  
  <style scoped>
  .signup-card {
    width: 428px; /* Set the desired width */
    max-width: none; /* Remove the max-width constraint */
    border: 1px solid #ddd; /* Light gray border */
    border-radius: 8px; /* Rounded corners */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Shadow for depth */
    padding: 16px; /* Padding inside the card */
  }
  </style>
  