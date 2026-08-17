<script lang="ts">
import { createPost } from '@/api/blogApi';
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      title: "",
      body: "",
    };
  },
  methods: {
    async handleSubmit() {
      await createPost({
        id: Date.now(),
        title: this.title,
        body: this.body,
        tags: [],
        reactions: {
          likes: 0,
          dislikes: 0,
        },
      });

      this.$router.push("/");
    },
  },
});
</script>

<template>
  <h1>Create Blog</h1>

  <input v-model="title" type="text" placeholder="Add Title" />

  <textarea
    v-model="body"
    type="text"
    placeholder="Add Description"
  />

  <button @click="handleSubmit">Create Post</button>
</template>