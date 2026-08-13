import { computed } from 'vue'
import { useStore } from 'vuex'
import type { BlogPost } from './types/blog'

export function useAppStore() {
  const store = useStore()
  const posts = computed(() => store.state.posts)
  const isLoading = computed(() => store.state.isLoading)
  const isError = computed(() => store.state.error)
  const searchQuery = computed({
    get: () => store.state.searchQuery,
    set: (value) => store.commit('setSearchQuery', value),
  })
  async function loadPosts() {
    await store.dispatch('loadPosts')
  }
  function retryPosts() {
    loadPosts()
  }
  async function createPost(post: BlogPost) {
    await store.dispatch('createPost', post)
  }

  return { posts, loadPosts, isLoading, isError, retryPosts, searchQuery }
}
