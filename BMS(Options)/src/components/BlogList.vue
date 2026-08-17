<script lang="ts">
import { defineComponent } from "vue";
import type { BlogPost as Blog } from "@/types/blog";
import BlogPost from "./BlogPost.vue";

export default defineComponent({
  components: {
    BlogPost,
  },

  props: {
    posts: {
      type: Array as () => Blog[],
      required: true,
    },
  },
});
</script>

<template>
  <div>
    <BlogPost v-for="post in posts" :key="post.id" :post="post" />
  </div>
</template>

<style lang="scss" scoped></style>
