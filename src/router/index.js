import { createRouter, createWebHistory } from 'vue-router';
import WorkoutDetails from '../components/WorkoutDetails.vue';
import Workouts from '../components/WorkoutHome.vue';
import HomePage from '../components/HomePage.vue';
import LoginForm from '../components/SignupLogin.vue'
import SignupForm from '../components/SignupPage.vue'
const routes = [
  { path: '/', component: Workouts },
  { path: '/Workouts', component: Workouts },
  { path: '/home', component: HomePage },
  {path: '/login', component: LoginForm},
  {path: '/signup', component: SignupForm},
  { path: '/workout/:workoutTitle', name: 'WorkoutDetails', component: WorkoutDetails, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
