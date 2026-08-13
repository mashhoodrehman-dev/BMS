<script setup lang="ts">
import type { BlogPost as Blog } from '@/types/blog.ts'
import BlogPost from './BlogPost.vue'

defineProps<{
  posts: Blog[]
}>()
</script>

<template>
  <div>
    <BlogPost v-for="post in posts" :key="post.id" :post="post" />
  </div>
</template>

<style lang="scss" scoped></style>
