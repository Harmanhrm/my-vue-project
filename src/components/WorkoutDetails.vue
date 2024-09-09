<template>
  <v-app>
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
        <v-list-item prepend-icon="mdi-home-city" title="Home" @click="$router.push('/')"></v-list-item>
        <v-list-item prepend-icon="mdi-account" title="My Account" @click="$router.push('/account')"></v-list-item>
        <v-list-item prepend-icon="mdi-account-group-outline" title="Users" @click="$router.push('/users')"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar style="padding-left: 10px; position:fixed" :elevation="4" :floating="true">
      <!-- Static Breadcrumbs -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">Workouts</el-breadcrumb-item>
        <el-breadcrumb-item>
          <a href="/">{{ workoutTitle }}</a>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </v-app-bar>

    <!-- Main Content Area -->
    <v-main style="margin-left: 0px; padding-top: 30px;">
      <v-card>
        <v-card-title class="text-h5">
          {{ workoutTitle }}
        </v-card-title>

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
          <v-btn style="margin-left: 18px; margin-bottom:5px;" @click="addExercise">Add Set</v-btn>
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
        color="red" class="fixed-button" fab>Complete Workout</v-btn>
      </v-card>
    </v-main>
  </v-app>
</template>



<script setup>
import { ref, defineEmits, defineProps } from 'vue';

// Declare emit with defineEmits
const emit = defineEmits(['workoutAdded']);

// Define props
const props = defineProps({
  workoutTitle: String,
});

// Local state
const sets = ref(0);
const reps = ref(0);
const weight = ref(0);
const exercises = ref([]);

// Function to add an exercise
const addExercise = () => {
  exercises.value.push({
    sets: sets.value,
    reps: reps.value,
    weight: weight.value,
  });

  // Emit the workout title when an exercise is added
  emit('workoutAdded', props.workoutTitle);

  // Reset input fields
  sets.value = 0;
  reps.value = 0;
  weight.value = 0;
};
</script>

<style>
.fixed-button {
  position: fixed;
  bottom: 40px;
  right: 40px;
}
</style>