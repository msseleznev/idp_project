<template>
    <div>
        <h1>Страница с постами</h1>
        <my-input
            v-focus
            :model-value="searchQuery"
            @update:model-value="setSearchQuery"
            placeholder="Поиск..."
        />
        <div class="postBtn">
            <my-button
                @click="showModal"
            >
                Создать пост
            </my-button>
            <my-select
                :model-value="selectedSort"
                @update:model-value="setSelectedSort"
                :options="sortOptions"
            />
        </div>

        <my-modal v-model:show="isModalActive">
            <post-form @create="createPost" />
        </my-modal>
        <post-list
            :posts="sortedAndSearchedPost"
            @remove="removePost"
            v-if="!isPostLoading"
        />
        <div v-else>
            <h2>
                Загрузка...
            </h2>
        </div>
        <div
            v-intersection="loadMorePost"
            class="observer"
        />
    </div>
</template>

<script>
import PostList from '@/components/PostList';
import PostForm from '@/components/PostForm';
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  components: {
    PostList,
    PostForm
  },
  data() {
    return {
      isModalActive: false
    };
  },
  computed: {
    ...mapState({
      posts: state => state.post.posts,
      isPostLoading: state => state.post.isPostLoading,
      selectedSort: state => state.post.selectedSort,
      searchQuery: state => state.post.searchQuery,
      currentPage: state => state.post.currentPage,
      limitForPage: state => state.post.limitForPage,
      totalPages: state => state.post.totalPages,
      sortOptions: state => state.post.sortOptions
    }),
    ...mapGetters({
      sortedPost: 'post/sortedPost',
      sortedAndSearchedPost: 'post/sortedAndSearchedPost'
    })

  },
  // watch: {},
  mounted() {
    this.fetchPosts();
  },
  methods: {
    ...mapMutations({
      setCurrentPage: 'post/setCurrentPage',
      setSearchQuery: 'post/setSearchQuery',
      setSelectedSort: 'post/setSelectedSort'
    }),
    ...mapActions({
      loadMorePost: 'post/loadMorePost',
      fetchPosts: 'post/fetchPosts'
    }),
    createPost(post) {
      this.posts.unshift(post);
      this.isModalActive = false;
    },
    removePost(post) {
      this.posts = this.posts.filter(p => p.id !== post.id);
    },
    showModal() {
      this.isModalActive = true;
    },
    changePage(page) {
      this.currentPage = page;
    }
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
