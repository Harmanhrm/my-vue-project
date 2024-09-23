<template>
    <v-app>
      <!-- Navigation Drawer -->
      <v-main style="margin-left: 0px; padding-top: 0px;">
         Workout History
        </v-main>
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
                <div class="date-time-container">
                  <div>{{ formattedDate(exercise.date) }}:</div>
                  <div class="time">{{ formattedTime(exercise.date) }}</div>
                </div>
                <hr />
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
  import { format } from 'date-fns';
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { jwtDecode} from 'jwt-decode';
  const route = useRoute();
  const workoutTitle = ref(route.query.title || ''); // Get workout title from query parameters
  const workoutHistory = ref([]);
  const formattedTime = (dateString) => {
  const date = new Date(dateString);
  return format(date, 'h:mm a');
};
  const formattedDate = (dateString) => {
  const date = new Date(dateString);
  return format(date, 'EEEE, MMMM d yyyy');
};
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

const username = ref('');

const fetchUsernameFromToken = () => { // Retrieve username from token
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      username.value = decodedToken.username; 
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }
};
  // Fetch history on component mount
  onMounted(() => {
    fetchUsernameFromToken();
    fetchWorkoutHistory();
  });
  </script>
  
  <style>
  .date-time-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.time {
  margin-left: auto;
}
  .fixed-button {
    position: fixed;
    bottom: 40px;
    right: 40px;
  }
  </style>
  