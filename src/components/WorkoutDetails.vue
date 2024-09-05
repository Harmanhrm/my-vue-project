<template>
    <div>
      <v-card>
        <v-card-title class="text-h5">
          {{ workoutTitle }}
        </v-card-title>
    
        <!-- Form for adding sets, reps, etc. -->
        <v-form>
          <v-text-field label="Sets" v-model="sets"></v-text-field>
          <v-text-field label="Reps" v-model="reps"></v-text-field>
          <v-text-field label="Weight" v-model="weight"></v-text-field>
          <v-btn @click="addExercise">Add Exercise</v-btn>
        </v-form>
    
        <!-- List of added exercises -->
        <v-list>
          <v-list-item v-for="(exercise, index) in exercises" :key="index">
            <v-list-item-content>
              {{ exercise.sets }} sets of {{ exercise.reps }} reps at {{ exercise.weight }} kg
            </v-list-item-content>
          </v-list-item>
        </v-list>
    
        <v-btn @click="$router.back()">Back</v-btn>
      </v-card>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  
  
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
  
    // Reset input fields
    sets.value = 0;
    reps.value = 0;
    weight.value = 0;
  }
  </script>
  