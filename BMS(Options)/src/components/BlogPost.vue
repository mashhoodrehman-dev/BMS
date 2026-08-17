<script lang="ts">
import { defineComponent } from 'vue'
import { RouterLink } from 'vue-router'
import type { BlogPost } from '@/types/blog'

export default defineComponent({
  components: {
    RouterLink,
  },

  props: {
    post: {
      type: Object as () => BlogPost,
      required: true,
    },
  },
})
</script>

<template>
  <div>
    <h2>{{ post.title }}</h2>
    <p>{{ post.body }}</p>
  </div>

  <div>
    <span v-for="tag in post.tags" :key="tag">
      #{{ tag }}
    </span>
  </div>

  <p>Likes: {{ post.reactions.likes }}</p>

  <RouterLink :to="`/posts/${post.id}`">
    Read More
  </RouterLink>
</template>

