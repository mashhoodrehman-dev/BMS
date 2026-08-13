<script setup lang="ts">
import type { BlogPost } from '@/types/blog'
import { RouterLink } from 'vue-router'

defineProps<{
  post: BlogPost
}>()
</script>
<template>
  <div>
    <h2>{{ post.title }}</h2>
    <p>{{ post.body }}</p>
  </div>
  <div>
    <span v-for="tag in post.tags" :key="tag"> #{{ tag }} </span>
  </div>
  <p>Likes: {{ post.reactions.likes }}</p>
  <RouterLink :to="`/posts/${post.id}`">Read More</RouterLink>
</template>

<style scoped>
article {
  border: 1px solid #ccc;
  padding: 15px;
  margin-bottom: 15px;
}
</style>
