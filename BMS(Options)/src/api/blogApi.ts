import type { BlogPost } from '@/types/blog'

const API_URL = 'https://dummyjson.com/posts'

export async function fetchPosts() {
  const response = await fetch(API_URL)
  return response.json()
}
export async function createPost(post: BlogPost) {
  const response = await fetch(`${API_URL}/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  })

  return response.json()
}
