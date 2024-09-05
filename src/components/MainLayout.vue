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
      </v-layout>
    </v-card>
  </v-app>
</template>

<script setup>
</script>