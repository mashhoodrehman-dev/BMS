import { describe, expect, it, vi } from 'vitest'
import { computed, ref } from 'vue'
import { mount } from '@vue/test-utils'
import ProductSearch from '@/views/Home.vue'
import { createRouter, createMemoryHistory } from 'vue-router'
import store from '@/store'

const router = createRouter({
  history: createMemoryHistory(),
  routes: [{ path: '/', component: { template: '<div />' } }],
})
const mockSearchQuery = ref('')

vi.mock('@/useAppStore.ts', () => ({
  useAppStore: vi.fn(() => ({
    posts: ref([
      {
        id: 1,
        title: 'Hello World',
        body: 'some body text',
        tags: ['intro'],
        reactions: { likes: 5, dislikes: 0 },
      },
      {
        id: 2,
        title: 'Vue Tips',
        body: 'some body text',
        tags: ['vue'],
        reactions: { likes: 10, dislikes: 1 },
      },
    ]),
    loadPosts: vi.fn(),
    isLoading: ref(false),
    isError: ref(null),
    searchQuery: computed({
      get: () => mockSearchQuery.value,
      set: (val) => {
        mockSearchQuery.value = val
      },
    }),

    retryPosts: vi.fn(),
  })),
}))
describe('search filtering', () => {
  ;(it('shows only the matching posts when searching', async () => {
    const wrapper = mount(ProductSearch, {
      global: {
        plugins: [router],
      },
    })
    const input = wrapper.find('input')
    await input.setValue('Vue')

    expect(wrapper.text()).toContain('Vue Tips')
    expect(wrapper.text()).not.toContain('Hello World')
  }),
    it("Shows 'No products found' when nothing matches", async () => {
      const wrapper = mount(ProductSearch, {
        global: {
          plugins: [router],
        },
      })
      const input = wrapper.find('input')
      await input.setValue('zzz')

      expect(wrapper.text()).toContain('No posts found')
    }),
    it('Shows All Products, when field is empty', async () => {
      const wrapper = mount(ProductSearch, {
        global: {
          plugins: [router],
        },
      })
      const input = wrapper.find('input')
      await input.setValue('Vue')

      expect(wrapper.text()).not.toContain('Hello World')

      await input.setValue('')
      expect(wrapper.text()).toContain('Hello World')
      expect(wrapper.text()).toContain('Vue Tips')
    }),
    it('shows loading message, when isLoading is true', async () => {
      const { useAppStore } = await import('@/useAppStore')

      vi.mocked(useAppStore).mockReturnValueOnce({
        posts: computed(() => []),
        loadPosts: vi.fn(),
        searchQuery: computed({
          get: () => '',
          set: () => {},
        }),
        isLoading: computed(() => true), // <-- key change for this test
        isError: computed(() => null),
        retryPosts: vi.fn(),
      })
      const wrapper = mount(ProductSearch, {
        global: {
          plugins: [router],
        },
      })

      expect(wrapper.text()).toContain('Loading Posts...')
      expect(wrapper.text()).not.toContain('Hello World')
    }),
    it('updates the search qeury in store', () => {
      store.commit('setSearchQuery', 'Vue')

      expect(store.state.searchQuery).toBe('Vue')
    }))
})
