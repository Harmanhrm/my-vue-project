<template>
  <v-app-bar app style="padding-left: 10px; position:fixed" :elevation="4">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">Login</el-breadcrumb-item>
          </el-breadcrumb>
        </v-app-bar>
  <div class="d-flex align-center justify-center" style="height: 100vh">
    <v-card class="login-card" elevation="8" rounded="lg">
      <div class="text-subtitle-1 text-medium-emphasis">Account</div>

      <v-text-field
        density="compact"
        placeholder="Email address"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
        v-model="email"
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
        v-model="password"
        @click:append-inner="visible = !visible"
      ></v-text-field>

      <v-btn block class="mb-8" color="blue" size="large" variant="tonal" @click="login">
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
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      email: '',
      password: '',
      visible: false,
    };
  },
  methods: {
    ...mapActions(['loginUser']), // Map Vuex action

    async login() {
  if (!this.email || !this.password) {
    alert("Please fill in all the fields!");
    return;
  }
  
  try {
    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.email,
        password: this.password,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error);
    }
    
    const result = await response.json();
    if (!result.token) {
      throw new Error('Token is missing from the response');
    }
    
    console.log('Login response:', result); // Add this line to inspect the result
    console.log('Login token:', result.token); // Add this line to inspect the result
    
    // Store token in localStorage
    localStorage.setItem('token', result.token);

    // Dispatch Vuex action to update the store
    this.loginUser({
      token: result.token,
      user: result.user,
    });
    
    alert(`Login successful! Welcome, ${result.username}`);

    // Redirect to home page or dashboard
    this.$router.push('/');
  } catch (error) {
    console.error('Error during login:', error);
    alert('Login failed! Please check your credentials and try again.');
  }
},


    goToLoginSignup() {
      this.$router.push("/signup");
    },
  }
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
