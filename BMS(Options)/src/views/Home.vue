<template>
    <div>
        <h1>Blog Management System</h1>
        <h2>All Posts</h2>
        <p>Posts Found: {{ postCount }}</p>
        <input v-model="searchQuery" type="text" placeholder="Search Posts.." />
        <LoadMessage v-if="isLoading" />
        <ErrorMessage v-else-if="isError" :message="isError" @retry=""retryPosts />
        <BlogList v-else-if="filteredData.length"
        :posts="filteredData" />
         <div v-else>No posts found</div>
    </div>
    <<router-view></router-view>>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'

import LoadMessage from '@/components/LoadMessage.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'
import BlogList from '@/components/BlogList.vue'

import useAppStoreMixin from '@/mixins/useAppStoreMixin'

export default defineComponent({
  components: {
    RouterView,
    LoadMessage,
    ErrorMessage,
    BlogList,
  },

  mixins: [useAppStoreMixin],

  computed: {
    filteredData() {
      return this.posts.filter((post) =>
        post.title
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase())
      )
    },

    postCount() {
      return this.filteredData.length
    },
  },

  mounted() {
    // this.loadPosts()
  },
})
</script>