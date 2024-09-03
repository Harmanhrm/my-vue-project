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
            <v-list-item prepend-icon="mdi-home-city" title="Home" value="home"></v-list-item>
            <v-list-item prepend-icon="mdi-account" title="My Account" value="account"></v-list-item>
            <v-list-item prepend-icon="mdi-account-group-outline" title="Users" value="users"></v-list-item>
          </v-list>
        </v-navigation-drawer>

        <!-- Application Bar -->
        <v-app-bar :elevation="4" floating="true" style="position:fixed" title="Workouts"></v-app-bar>

        <!-- Main Content -->
        <v-main style="min-height: 300px; margin:25px">
          <div style="display:flex; flex-wrap: wrap">
            <!-- Dynamic Cards Based on User Input -->
            <div v-for="(card, index) in cards" :key="index" style="width: 23%; margin-right: 15px; margin-bottom: 15px">
              <v-card :color="card.color" :elevation="4">
                <v-card-title class="text-h5">
                  {{ card.title }}
                </v-card-title>
                <v-card-subtitle>{{ card.workoutType }}</v-card-subtitle>
                <v-card-actions>
                  <v-btn variant="text">Add Workout</v-btn>
                </v-card-actions>
              </v-card>
            </div>
          </div>
        </v-main>

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
          <v-icon>mdi-plus</v-icon>
        </v-btn>

        <!-- Dialog for Adding New Card -->
        <v-dialog v-model="showForm" persistent max-width="400px">
          <v-card>
            <v-card-title>
              <span class="text-h5">Add New Workout</span>
            </v-card-title>
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

        <!-- Footer -->
        <v-footer style="position:fixed"></v-footer>
      </v-layout>
    </v-card>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'

// State for showing/hiding the form
const showForm = ref(false)

// State for new card data
const newCard = ref({
  title: '',
  workoutType: '',
})

// State for the list of cards
const cards = ref([])

// Function to add a new card
const addCard = () => {
  if (newCard.value.title && newCard.value.workoutType) {
    // Add a new card to the cards array
    cards.value.push({
      title: newCard.value.title,
      workoutType: newCard.value.workoutType,
      color: getRandomColor(),
    })

    // Reset form data
    newCard.value.title = ''
    newCard.value.workoutType = ''
    showForm.value = false
  }
}

// Helper function to get a random color for the card
const getRandomColor = () => {
  const colors = ['#ff3300', '#ff6666', 'orange', 'green', 'red']
  return colors[Math.floor(Math.random() * colors.length)]
}
</script>

<style scoped>
.el-menu--horizontal > .el-menu-item:nth-child(1) {
  margin-right: auto;
  display: flex;
  align-items: center;
}
</style>
