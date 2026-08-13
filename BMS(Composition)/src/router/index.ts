import CreatePost from '@/views/CreatePost.vue'
import Home from '../views/Home.vue'
import PostDetails from '@/views/PostDetails.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/posts/:id',
      component: PostDetails,
    },
    {
      path: '/posts/create',
      component: CreatePost,
    },
  ],
})

export default router
