<template>
  <v-app>
    <v-card>
      <v-layout>
  
        <!-- Application Bar with Dynamic Title -->
        
        <!-- Main Content Area -->
        <v-main style="margin-left: 0px; padding-top: 64px;">
          <router-view @update-title="pageTitle = $event" />
        </v-main>
      </v-layout>
    </v-card>
  </v-app>
</template>

<script setup>
import { ref } from 'vue';

// Page title will be updated by child components
const pageTitle = ref("Workouts");
</script>
