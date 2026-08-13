<script setup lang="ts">
import { useAppStore } from '@/useAppStore'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const postId = Number(route.params.id)
const { posts } = useAppStore()
const post = computed(() => {
  return posts.value.find((p) => p.id == postId)
})
</script>
<template>
  <RouterLink to="/"> Back to Posts </RouterLink>
  <h1>Post Details</h1>
  <div v-if="post">
    <h1>{{ post.title }}</h1>
    <p>{{ post.body }}</p>
    <span v-for="tag in post.tags" :key="tag"> #{{ tag }} </span>
    <p>Likes: {{ post.reactions.likes }}</p>
  </div>
  <p v-else>Post not found.</p>
</template>
