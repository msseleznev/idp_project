import { computed, ref } from 'vue';

export function useSortedAndSearchedPost(sortedPosts) {
  const searchQuery = ref('');
  const sortedAndSearchedPost = computed(() => sortedPosts.value.filter(post => post.title.toLowerCase()
    .includes(searchQuery.value.toLowerCase())));
  return {
    searchQuery, sortedAndSearchedPost
  };
}
