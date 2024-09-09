<template>
    <v-app>
      <!-- Navigation Drawer -->
      <v-navigation-drawer app permanent style="position:fixed" :elevation="2">
        <template v-slot:prepend>
          <v-list-item
            lines="two"
            prepend-avatar="https://randomuser.me/api/portraits/women/81.jpg"
            title="Jane Smith"
            subtitle="Logged in"
          ></v-list-item>
        </template>
  
        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-home-city" title="Home" @click="$router.push('/')"></v-list-item>
          <v-list-item prepend-icon="mdi-account" title="My Account" @click="$router.push('/account')"></v-list-item>
          <v-list-item prepend-icon="mdi-account-group-outline" title="Users" @click="$router.push('/users')"></v-list-item>
        </v-list>
      </v-navigation-drawer>
  
      <!-- App Bar -->
      <v-app-bar style="padding-left: 10px; position:fixed" :elevation="4" :floating="true">
        <v-breadcrumbs :items="breadcrumbItems" separator="/">
          <template v-slot:divider>
            <v-icon>mdi-chevron-right</v-icon>
          </template>
        </v-breadcrumbs>
      </v-app-bar>
  
      <!-- Main Content Area -->
      <v-main style="margin-left: 0px; padding-top: 30px;">
        <v-card>
          <v-card-title class="text-h5">
            History for {{ workoutTitle }}
          </v-card-title>
  
          <!-- History Section -->
          <v-list>
            <v-list-item v-for="(exercise, index) in workoutHistory" :key="index">
              <v-list-item-content>
                <div>Exercise {{ index + 1 }}:</div>
                <v-list dense>
                  <v-list-item v-for="(set, setIndex) in exercise.sets" :key="setIndex">
                    <v-list-item-content>
                      SET {{ setIndex + 1 }}: {{ set.reps }} REPS @ {{ set.weight }} lb/kg, RPE: {{ set.rpe }}
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-main>
    </v-app>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  
  const route = useRoute();
  const workoutTitle = ref(route.query.title || ''); // Get workout title from query parameters
  const workoutHistory = ref([]);
  
  // Fetch workout history from backend
  const fetchWorkoutHistory = async () => {
  try {
    const response = await fetch(`http://localhost:5000/get-workout-history?title=${encodeURIComponent(workoutTitle.value)}`);
    if (response.ok) {
      const data = await response.json();
      workoutHistory.value = data.exercises; // Update to use data.exercises
    } else {
      console.error('Error fetching workout history:', response.statusText);
    }
  } catch (error) {
    console.error('Error fetching workout history:', error);
  }
};

  
  // Fetch history on component mount
  onMounted(() => {
    fetchWorkoutHistory();
  });
  </script>
  
  <style>
  .fixed-button {
    position: fixed;
    bottom: 40px;
    right: 40px;
  }
  </style>
  