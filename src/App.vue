<template>
  <v-app>
    <v-card>
      <v-layout>
        <v-row>
          <!-- Conditional Navigation Drawer -->
          <v-navigation-drawer v-if="loggedIn" app permanent style="position:fixed" :elevation="2" location="left">
            <template v-slot:prepend>
              <v-list-item
                lines="two"
                prepend-avatar="https://randomuser.me/api/portraits/women/81.jpg"
                :title="username"
                subtitle="Logged in"
              ></v-list-item>
            </template>

            <v-list density="compact" nav>
              <v-list-item prepend-icon="mdi-home-city" title="Dashboard" @click="$router.push('/')"></v-list-item>
              <v-list-item prepend-icon="mdi-account" title="Stats" @click="$router.push('/stats')"></v-list-item>
              <v-list-item prepend-icon="mdi-account-group-outline" title="Log" @click="$router.push('/log')"></v-list-item>
              <v-list-item prepend-icon="mdi-logout" title="Logout" @click="logout"></v-list-item>
            </v-list>
          </v-navigation-drawer>
          
          <v-navigation-drawer v-else app permanent style="position: fixed;" :elevation="2" location="left">
            <template v-slot:prepend>
              <v-list-item lines="two">
                <v-list-item-content>
                  <v-btn text color="primary" @click="goToLoginSignup">
                    Sign In / Sign Up
                  </v-btn>
                </v-list-item-content>
              </v-list-item>
            </template>

            <!-- Navigation Links -->
            <v-list density="compact" nav>
              <v-list-item prepend-icon="mdi-home-city" title="Home" @click="$router.push('/')"></v-list-item>
              <v-list-item prepend-icon="mdi-help-circle" title="FAQ" @click="$router.push('/faq')"></v-list-item>
              <v-list-item prepend-icon="mdi-email" title="Contact" @click="$router.push('/contact')"></v-list-item>
            </v-list>
          </v-navigation-drawer>

          <!-- Application Bar with Dynamic Title -->
          <v-app-bar app style="padding-left: 10px; position:fixed" :elevation="4">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/' }">Workouts</el-breadcrumb-item>
            </el-breadcrumb>
          </v-app-bar>

          <!-- Main Content Area -->
          <v-main style="margin-left: 0px; padding-top: 64px;">
            <router-view />
          </v-main>
        </v-row>
      </v-layout>
    </v-card>
  </v-app>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { isLoggedIn, getUsername } from './utils/auth';

const loggedIn = ref(false);
const username = ref('');
const router = useRouter();
const route = useRoute();

const goToLoginSignup = () => {
  // Redirect to login/signup page
  router.push('/login');
};

const logout = () => {
  localStorage.removeItem('token');
  checkLoginStatus();
  router.push('/home');
};

const checkLoginStatus = () => {
  loggedIn.value = isLoggedIn();
  if (loggedIn.value) {
    username.value = getUsername();
  } else {
    username.value = '';
  }
};

onMounted(() => {
  checkLoginStatus();
});

watch(route, () => {
  checkLoginStatus();
});
</script>

<style>
/* Add any global styles here */
</style>