<template>
  <v-app>
    <v-card>
      <v-layout>
        <!-- Conditional Navigation Drawer -->
        <v-navigation-drawer permanent style="position: fixed;" :elevation="2" location="left">
          <template v-slot:prepend>
            <v-list-item lines="two">
              <v-list-item-content>
                <v-btn text color="primary" @click="goToLoginSignup" v-if="!loggedIn">
                  Sign In / Sign Up
                </v-btn>
                <div v-else>
                  <v-list-item
                    lines="two"
                    prepend-avatar="https://randomuser.me/api/portraits/women/81.jpg"
                    :title="username"
                    subtitle="Logged in"
                  ></v-list-item>
                </div>
              </v-list-item-content>
            </v-list-item>
          </template>

          <!-- Navigation Links -->
          <v-list density="compact" nav>
            <v-list-item prepend-icon="mdi-home-city" title="Home" @click="$router.push('/')"></v-list-item>
            <v-list-item prepend-icon="mdi-help-circle" title="FAQ" @click="$router.push('/faq')"></v-list-item>
            <v-list-item prepend-icon="mdi-email" title="Contact" @click="$router.push('/contact')"></v-list-item>
            <v-list-item v-if="loggedIn" prepend-icon="mdi-account" title="Stats" @click="$router.push('/stats')"></v-list-item>
            <v-list-item v-if="loggedIn" prepend-icon="mdi-account-group-outline" title="Log" @click="$router.push('/log')"></v-list-item>
            <v-list-item v-if="loggedIn" prepend-icon="mdi-logout" title="Logout" @click="logout"></v-list-item>
          </v-list>
        </v-navigation-drawer>

        <!-- Application Bar with Dynamic Title -->
        <v-app-bar app style="padding-left: 10px; position:fixed" :elevation="4">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">Workouts</el-breadcrumb-item>
          </el-breadcrumb>
        </v-app-bar>

        <!-- Main Content Area -->
        
      </v-layout>
    </v-card>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { isLoggedIn, getUsername } from './utils/auth';


const loggedIn = ref(false);
const username = ref('');

const goToLoginSignup = () => {
  // Redirect to login/signup page
  window.location.href = '/login-signup';
};

const logout = () => {
  localStorage.removeItem('token');
  window.location.href = '/home';
};

onMounted(() => {
  loggedIn.value = isLoggedIn();
  if (loggedIn.value) {
    username.value = getUsername();
  }
});
</script>

<style>
/* Add any global styles here */
</style>