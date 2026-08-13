import { fetchPosts } from '@/api/blogApi'
import { describe, expect, it, vi, type Mock } from 'vitest'
import store from './index'
const mockedFetchPosts = fetchPosts as Mock

vi.mock('@/api/blogApi', () => ({
  fetchPosts: vi.fn(),
}))

describe('loadPosts action', () => {
  it('sets post on success', async () => {
    mockedFetchPosts.mockResolvedValue({
      posts: [{ id: 1, title: 'Hello World' }],
    })
    await store.dispatch('loadPosts')
    expect(store.state.posts).toEqual([{ id: 1, title: 'Hello World' }])
  })
})
