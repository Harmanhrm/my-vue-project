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
          {{ workoutTitle }}
        </v-card-title>
        <v-btn @click="viewHistory" class="ml-3" text small>
  View History
</v-btn>


        <!-- Form for adding reps, weight, and RPE -->
        <v-form>
          <v-row style="margin-left:6px;">
            <v-col cols="2">
              <v-text-field label="Reps" v-model="reps" type="number"></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field label="Weight" v-model="weight" type="number"></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field label="RPE" v-model="rpe" type="number"></v-text-field>
            </v-col>
          </v-row>
          <v-btn style="margin-left: 18px; margin-bottom:5px;" @click="addSet">Add Set</v-btn>
        </v-form>

        <!-- Completed Sets and Notes Side by Side -->
        <v-row>
          <v-col cols="6">
            <v-card-title class="text-h6">Completed Sets</v-card-title>
            <v-list>
              <v-list-item v-for="(exercise, index) in exercises" :key="index">
                <v-list-item-content>
                  SET {{ index + 1 }}: {{ exercise.reps }} REPS @ {{ exercise.weight }} lb/kg, RPE: {{ exercise.rpe }}
                  <div>COMPLETED</div>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>

          <v-col cols="5">
            <v-card-title class="text-h6">Overall Note</v-card-title>
            <v-textarea v-model="note" label="Add a note about your workout" rows="5"></v-textarea>
          </v-col>
        </v-row>

        <!-- Button to complete workout -->
        <v-btn
          color="red"
          class="fixed-button"
          @click="completeWorkout"
          fab
        >
          Complete Workout
        </v-btn>
      </v-card>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, defineProps } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const viewHistory = () => {
  router.push({ path: '/history', query: { title: props.workoutTitle } });
};
const props = defineProps({
  workoutTitle: String,
});

// Local state
const reps = ref(0);
const weight = ref(0);
const rpe = ref(0);
const exercises = ref([]);
const note = ref('');
const userid = ref(null);

// Function to add a set
const addSet = () => {
  exercises.value.push({
    reps: reps.value,
    weight: weight.value,
    rpe: rpe.value
  });

  // Reset input fields
  reps.value = 0;
  weight.value = 0;
  rpe.value = 0;
};

// Function to get user ID based on workout title
const getUserIdByWorkoutTitle = async (title) => {
  try {
    const response = await fetch('http://localhost:5000/get-userid', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title })
    });

    if (response.ok) {
      const data = await response.json();
      userid.value = data.userid;
    } else {
      console.error('Error fetching user ID:', response.statusText);
    }
  } catch (error) {
    console.error('Error fetching user ID:', error);
  }
};

// Function to complete workout and save to backend
// Function to complete workout and save to backend
const completeWorkout = async () => {
  try {
    // Retrieve and decode the token (assumed to be set somewhere)
    const token = localStorage.getItem('token'); // Retrieve token from localStorage

    // Ensure userid is available before sending request
    if (!userid.value) {
      await getUserIdByWorkoutTitle(props.workoutTitle);
    }

    if (!userid.value) {
      throw new Error('User ID could not be retrieved');
    }

    // Prepare workout data
    const workoutData = {
      userid: userid.value, // Ensure userid is correctly set
      title: props.workoutTitle,
      exercises: [
        {
          sets: exercises.value // Single exercise with multiple sets
        }
      ],
      note: note.value // Note about the workout
    };

    // Send request to save workout
    const response = await fetch('http://localhost:5000/save-workout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Include the token in the headers
      },
      body: JSON.stringify(workoutData),
    });

    if (!response.ok) {
      throw new Error('Failed to save workout');
    }

    // Clear the form and show success message
    exercises.value = [];
    note.value = '';
    alert('Workout saved successfully!');
  } catch (error) {
    console.error('Error saving workout:', error);
    alert('Error saving workout. Please try again.');
  }
};



// Breadcrumb items
const breadcrumbItems = [
  { text: 'Workouts', to: '/' },
  { text: props.workoutTitle }
];
</script>

<style>
.fixed-button {
  position: fixed;
  bottom: 40px;
  right: 40px;
}
</style>
