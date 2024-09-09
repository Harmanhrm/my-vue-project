<template>
    <v-app>
      <!-- Sidebar -->
      <v-navigation-drawer permanent style="position: fixed;" :elevation="2" location="left">
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
  
      <!-- Main Content -->
      <v-main>
        <v-container fluid>
          <!-- Hero Section -->
          <v-row>
            <v-col cols="12">
              <v-parallax dark src="@/assets/img/image.png" height="350">
                <v-row align="center" justify="space-between" class="pa-0">
                  <v-col cols="12" md="6" xl="6">
                    <div>
                      <h1 class="display-2 font-weight-bold mb-4">Workout Log</h1>
                      <h1 class="font-weight-light">
                        The best minimalist workout tracker available.<br />
                        Quick, Clean & Easy-to-Use.
                      </h1>
                      <v-btn
                        rounded
                        outlined
                        large
                        dark
                        @click="$vuetify.goTo('#features')"
                        class="mt-5"
                      >
                        Learn More
                      </v-btn>
                    </div>
                  </v-col>
                  <v-col cols="12" md="6" xl="6" class="text-right">
                    <img src="@/assets/img/phone2.png" alt="Hero Image" class="hero-image" />
                  </v-col>
                </v-row>
              </v-parallax>
            </v-col>
          </v-row>
  
          <!-- Features Section -->
          <v-container fluid id="features" class="mt-2 pa-0">
            <v-row justify="center">
              <v-col cols="10">
                <v-row justify="start">
                  <v-col
                    cols="12"
                    sm="4"
                    class="text-left"
                    v-for="(feature, i) in features"
                    :key="i"
                  >
                    <v-hover v-slot:default="{ hover }">
                      <v-card
                        class="card"
                        shaped
                        :elevation="hover ? 10 : 4"
                        :class="{ up: hover }"
                      >
                        <v-img
                          :src="feature.img"
                          max-width="100px"
                          class="d-block ml-auto mr-auto"
                          :class="{ 'zoom-efect': hover }"
                        ></v-img>
                        <h1 class="font-weight-regular">{{ feature.title }}</h1>
                        <h4 class="font-weight-regular subtitle-1">
                          {{ feature.text }}
                        </h4>
                      </v-card>
                    </v-hover>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
  
          <!-- Call to Action -->
          <section class="cta-section">
            <h2>Give Simple Workout Log a Try Today!</h2>
            <v-row>
              <v-col cols="12" md="4">
                <v-btn large block color="primary" href="https://play.google.com" target="_blank">Get it on Google Play</v-btn>
              </v-col>
              <v-col cols="12" md="4">
                <v-btn large block color="secondary" disabled>Coming Soon on iOS</v-btn>
              </v-col>
            </v-row>
          </section>
  
          <div class="svg-border-waves">
            <img src="~@/assets/img/wave2.svg" />
          </div>
        </v-container>
      </v-main>
    </v-app>
  </template>
  
  <script>
  export default {
    data() {
      return {
        dialog: false,
        videoId: "i8IvvHJssWE",
        features: [
          {
            img: require("@/assets/img/icon2.png"),
            title: "Clean Design",
            text: "Minimalistic design with essential features.",
          },
          {
            img: require("@/assets/img/icon1.png"),
            title: "Secure Data",
            text: "Your data is secure and private.",
          },
          {
            img: require("@/assets/img/icon3.png"),
            title: "Open Source",
            text: "Contribute and customize as needed.",
          },
        ],
      };
    },
    methods: {
      goToLoginSignup() {
        this.$router.push("/login");
      },
    },
  };
  </script>
  <style scoped>
  /* Styling for Parallax Section */
  #hero {
    position: relative;
  }

  .card {
    min-height: 300px;
    padding: 10px;
    transition: 0.5s ease-out;
  }

  .card .v-img {
    margin-bottom: 15px;
    transition: 0.75s;
  }

  .card h1 {
    margin-bottom: 10px;
  }

  .zoom-efect {
    transform: scale(1.1);
  }

  .up {
    transform: translateY(-20px);
    transition: 0.5s ease-out;
  }

  /* Sidebar Styling */
  .v-navigation-drawer {
    max-width: 350px;
  }

  .v-list-item {
    text-align: left;
  }

  /* Aligning Hero Section Text and Button to the Left */
  .v-parallax h1, .v-parallax h2, .v-parallax h4 {
    text-align: left;
  }

  .v-parallax .v-btn {
    text-align: left;
  }

  /* Features Section Text Alignment */
  .text-left {
    text-align: left;
  }

  .v-row.pa-0 {
    padding: 0 !important;
  }

  /* Hero Image Styling */
  .hero-image {
    max-width: 100%;
    height: auto;
    display: block;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); /* Add shadow effect */
    border-radius: 8px; /* Optional: add rounded corners */
    transition: transform 0.3s ease-in-out; /* Optional: smooth transition for hover effect */
  }

  .hero-image:hover {
    transform: scale(1.05); /* Optional: slight zoom on hover */
  }

  .full-width-image {
    width: 100%;
    overflow: hidden;
    margin-top: 2rem; /* Adjust as needed */
  }

  .full-width-image img {
    width: 100%;
    height: auto;
    display: block;
  }

  /* Adjust the margin-top for button to reduce space between button and features section */
  .mt-5 {
    margin-top: 3rem !important; /* Adjust as needed */
  }

  .cta-section {
    padding-top: 50px;
  }
  .svg-border-waves {
    margin-bottom: -30px;
  }
</style>
