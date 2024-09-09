import { createRouter, createWebHistory } from 'vue-router';
import WorkoutDetails from '../components/WorkoutDetails.vue';
import Workouts from '../components/WorkoutHome.vue';
import HomePage from '../components/HomePage.vue';
import LoginForm from '../components/LoginPage.vue';
import SignupForm from '../components/SignupPage.vue';
import store from '../store'; // Import Vuex store

const routes = [
  { path: '/', component: Workouts,  meta: { requiresAuth: true } },
  { path: '/Workouts', component: Workouts, meta: { requiresAuth: true }},
  { path: '/home', component: HomePage },
  { path: '/login', component: LoginForm },
  { path: '/signup', component: SignupForm },
  { path: '/workout/:workoutTitle', name: 'WorkoutDetails', component: WorkoutDetails, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard for protecting routes

// Navigation guard for protecting routes
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = store.getters.isAuthenticated;

  if (requiresAuth && !isAuthenticated) {
    next('/home');
  } else {
    next();
  }
});

export default router;
