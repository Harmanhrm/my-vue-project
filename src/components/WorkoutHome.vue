<template>
  <v-app>
    <v-card>
      <v-layout>
        <!-- Navigation Drawer -->
        <v-navigation-drawer permanent style="position:fixed" :elevation="2" location="left">
          <template v-slot:prepend>
            <v-list-item
              lines="two"
              prepend-avatar="https://randomuser.me/api/portraits/women/81.jpg"
              title="Jane Smith"
              subtitle="Logged in"
            ></v-list-item>
          </template>

          <v-list density="compact" nav>
            <v-list-item prepend-icon="mdi-home-city" title="Dashboard" @click="$router.push('/')"></v-list-item>
            <v-list-item prepend-icon="mdi-account" title="Stats" @click="$router.push('/stats')"></v-list-item>
            <v-list-item prepend-icon="mdi-account-group-outline" title="Log" @click="$router.push('/log')"></v-list-item>
            <v-list-item prepend-icon="mdi-logout" title="Logout" @click="logout"></v-list-item> <!-- Logout Button -->
          </v-list>
        </v-navigation-drawer>

        <v-app-bar style="padding-left: 10px; position:fixed" :elevation="4" :floating="true">
          <!-- Static Breadcrumbs -->
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">Workouts</el-breadcrumb-item>
          </el-breadcrumb>
        </v-app-bar>
        <v-main style="min-height: 300px; margin:25px">
          <div style="display:flex; flex-wrap: wrap">
            <!-- Dynamic Cards Based on User Input -->
            <div v-for="(card, index) in cards" :key="index" style="width: 23%; margin-right: 15px; margin-bottom: 15px">
              <v-card :color="card.color" :elevation="4">
                <v-card-title class="text-h5">{{ card.title }}</v-card-title>
                <v-card-subtitle>{{ card.workoutType }}</v-card-subtitle>
                <v-card-actions>
                  <!-- Use router-link for navigation -->
                  <router-link :to="{ name: 'WorkoutDetails', params: { workoutTitle: card.title } }">
                    <v-btn variant="text">Add Workout</v-btn>
                  </router-link>
                </v-card-actions>
              </v-card>
            </div>
          </div>
        </v-main>

        <!-- Router View for details -->
        <router-view @workoutAdded="handleWorkoutAdded" />

        <!-- Floating Action Button to Add New Card -->
        <v-btn
          fab
          dark
          bottom
          right
          color="blue"
          @click="showForm = true"
          style="position: fixed; bottom: 25px; right: 25px"
        >
          <v-icon color="error" icon="mdi-plus" size="large"></v-icon>
        </v-btn>

        <!-- Dialog for Adding New Card -->
        <v-dialog v-model="showForm" persistent max-width="400px">
          <v-card>
            <v-card-text>
              <v-form @submit.prevent="addCard">
                <v-text-field label="Title" v-model="newCard.title"></v-text-field>
                <v-select
                  :items="['Calisthenics', 'Weights', 'Cardio']"
                  label="Workout Type"
                  v-model="newCard.workoutType"
                ></v-select>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="showForm = false">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="addCard">Add</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
    </v-card>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import store from '../store'
const showForm = ref(false);
const newCard = ref({
  title: '',
  workoutType: '',
});
const cards = ref([]);
const userId = 1; // Example user ID; change as needed

// Fetch workouts from the server
const fetchWorkouts = async () => {
  try {
    const response = await axios.get('http://localhost:5000/workouts');
    cards.value = response.data.map(card => ({
      ...card,
      color: getRandomColor(),
    }));
  } catch (error) {
    console.error('Error fetching workouts:', error);
  }
};

// Function to get a random color for the card
const getRandomColor = () => {
  const colors = ['#ff3300', '#ff6666', 'orange', 'green', 'red'];
  return colors[Math.floor(Math.random() * colors.length)];
};

// Function to add a new card
const addCard = async () => {
  if (newCard.value.title && newCard.value.workoutType) {
    try {
      const response = await axios.post('http://localhost:5000/workouts', {
        userid: userId,
        title: newCard.value.title,
        workoutType: newCard.value.workoutType,
      });
      cards.value.push({
        ...response.data,
        color: getRandomColor(),
      });
      newCard.value.title = '';
      newCard.value.workoutType = '';
      showForm.value = false;
    } catch (error) {
      console.error('Error adding workout:', error);
    }
  }
};

// Method to handle the custom event and log the workout title
const handleWorkoutAdded = (title) => {
  console.log('Workout added:', title);
  // You can now use this title as needed within this component.
};

// Function to handle logout
const logout = () => {
  // Remove token from local storage or session storage
  localStorage.removeItem('token');
  
  // Dispatch Vuex action to update store
  store.dispatch('logoutUser');
  
  // Redirect to login page or home
  window.location.href = '/home';
};

// Fetch workouts when the component is mounted
onMounted(fetchWorkouts);
</script>
