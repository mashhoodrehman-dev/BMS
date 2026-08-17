import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import PostDetails from '@/views/PostDetails.vue'
import CreatePost from '@/views/CreatePost.vue'

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
      path: '/create',
      component: CreatePost,
    },
  ],
})

export default router