<script lang="ts">
import { defineComponent } from 'vue'
import type { BlogPost } from '@/types/blog'
import useAppStoreMixin from '@/mixins/useAppStoreMixin';

export default defineComponent({
    mixins: [useAppStoreMixin],
  computed: {
    post(): BlogPost | undefined {
      const postId = Number(this.$route.params.id)

      return this.posts.find((post: BlogPost) => post.id === postId)
    },
  }
})
</script>

<template>
  <RouterLink to="/">Back to Posts</RouterLink>

  <h1>Post Details</h1>

  <div v-if="post">
    <h1>{{ post.title }}</h1>
    <p>{{ post.body }}</p>

    <span v-for="tag in post.tags" :key="tag">
      #{{ tag }}
    </span>

    <p>Likes: {{ post.reactions.likes }}</p>
  </div>

  <p v-else>Post not found.</p>
</template>