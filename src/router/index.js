import { createRouter, createWebHistory } from 'vue-router';
import Home from '../App.vue';
import WorkoutDetails from '../components/WorkoutDetails.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/workout/:workoutTitle', name: 'WorkoutDetails', component: WorkoutDetails, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
