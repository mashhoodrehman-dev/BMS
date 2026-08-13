<template>
  <div>
    <h1>Blog Management System</h1>
    <h2>All Posts</h2>
    <p>Posts Found: {{ postCount }}</p>
    <input v-model="searchQuery" type="text" placeholder="Search posts..." />
    <LoadMessage v-if="isLoading" />
    <ErrorMessage v-else-if="isError" :message="isError" @retry="retryPosts" />
    <BlogList v-else-if="filteredData.length" :posts="filteredData" />
    <div v-else>No posts found</div>
  </div>
  <RouterView />
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterView } from 'vue-router'
import { useAppStore } from '@/useAppStore.ts'
import LoadMessage from '@/components/LoadMessage.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'
import BlogList from '@/components/BlogList.vue'

const filteredData = computed(() => {
  return posts.value.filter((p) => p.title.toLowerCase().includes(searchQuery.value.toLowerCase()))
})
const postCount = computed(() => filteredData.value.length)
const { posts, loadPosts, isLoading, isError, retryPosts, searchQuery } = useAppStore()
onMounted(() => {
  loadPosts()
})
</script>
