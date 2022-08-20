<template>
    <div>
        <h1>Страница с постами</h1>
        <my-input
            v-focus
            v-model="searchQuery"
            placeholder="Поиск..."
        />
        <div class="postBtn">
            <my-button
                @click="showModal"
            >
                Создать пост
            </my-button>
            <my-select
                v-model="selectedSort"
                :options="sortOptions"
            />
        </div>

        <my-modal v-model:show="isModalActive">
            <post-form />
        </my-modal>
        <post-list
            :posts="sortedAndSearchedPost"
            v-if="!isPostLoading"
        />
        <div v-else>
            <h2>
                Загрузка...
            </h2>
        </div>
    </div>
</template>

<script>
import PostList from '@/components/PostList';
import PostForm from '@/components/PostForm';
import { usePosts } from '@/hooks/usePosts';
import { useSortedPosts } from '@/hooks/useSortedPosts';
import { useSortedAndSearchedPost } from '@/hooks/useSortedAndSerchedPosts';

export default {
  components: {
    PostList,
    PostForm
  },
  setup() {
    const { posts, isPostLoading, totalPages } = usePosts(10);
    const { sortedPosts, selectedSort } = useSortedPosts(posts);
    const { sortedAndSearchedPost, searchQuery } = useSortedAndSearchedPost(sortedPosts);
    return {
      posts,
      totalPages,
      isPostLoading,
      sortedPosts,
      selectedSort,
      sortedAndSearchedPost,
      searchQuery
    };
  },
  data() {
    return {
      isModalActive: false,
      sortOptions: [
        {
          value: 'title',
          name: 'По названию'
        },
        {
          value: 'body',
          name: 'По содержимому'
        }
      ]
    };
  }
};
</script>
<style lang="scss">
.postBtn {
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
}
.observer {
  height: 30px;
}

</style>0
