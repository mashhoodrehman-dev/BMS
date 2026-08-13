<script setup lang="ts">
import { createPost } from '@/api/blogApi'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const title = ref('')
const body = ref('')
const router = useRouter()
async function handleSubmit() {
  await createPost({
    id: Date.now(),
    title: title.value,
    body: body.value,
    tags: [],
    reactions: {
      likes: 0,
      dislikes: 0,
    },
  })
  router.push('/')
}
</script>

<template>
  <h1>Create Blog</h1>

  <input v-model="title" type="text" placeholder="Add Title" />
  <textarea v-model="body" type="text" placeholder="Add Description" />
  <button @click="handleSubmit">Create Post</button>
</template>
