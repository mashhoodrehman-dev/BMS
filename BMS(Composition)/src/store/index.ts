import { fetchPosts, createPost as createPostApi } from '@/api/blogApi'
import type { BlogPost } from '@/types/blog'
import { createStore } from 'vuex'

export default createStore({
  state: {
    posts: [] as BlogPost[],
    isLoading: false,
    searchQuery: '',
    error: null as string | null,
  },
  mutations: {
    setPosts(state: any, posts: BlogPost[]) {
      state.posts = posts
    },
    addPost(state: any, post: BlogPost) {
      state.posts.unshift(post)
    },
    setSearchQuery(state: any, query: string) {
      state.searchQuery = query
    },
  },
  actions: {
    async loadPosts({ commit, state }) {
      try {
        state.isLoading = true
        state.error = null
        const data = await fetchPosts()
        commit('setPosts', data.posts)
      } catch (err) {
        state.error = `Failed to load posts`
        console.log('error in load post', err)
      } finally {
        state.isLoading = false
      }
    },
    async createPost({ commit }, post: BlogPost) {
      const data = createPostApi(post)
      commit('addPost', data)
    },
  },
})
