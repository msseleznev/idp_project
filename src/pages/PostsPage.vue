<template>
    <div>
        <h1>Страница с постами</h1>
        <my-input
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
            ref="observer"
            class="observer"
        />
    </div>
</template>

<script>
import PostList from '@/components/PostList';
import PostForm from '@/components/PostForm';
import axios from 'axios';

export default {
  components: {
    PostList,
    PostForm
  },
  data() {
    return {
      posts: [],
      isModalActive: false,
      isPostLoading: false,
      selectedSort: '',
      searchQuery: '',
      currentPage: 1,
      limitForPage: 10,
      totalPages: 0,
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
  },
  computed: {
    sortedPost() {
      return [...this.posts].sort((post1, post2) => post1[this.selectedSort]
        ?.localeCompare(post2[this.selectedSort]));
    },
    sortedAndSearchedPost() {
      return this.sortedPost.filter(post => post.title.toLowerCase()
        .includes(this.searchQuery.toLowerCase()));
    }
  },
  watch: {},
  mounted() {
    this.fetchPosts();
    const options = {
      rootMargin: '0px',
      threshold: 1.0
    };
    const callback = entries => {
      if (entries[0].isIntersecting && this.currentPage < this.totalPages) {
        this.loadMorePost();
      }
    };
    const observer = new IntersectionObserver(callback, options);
    observer.observe(this.$refs.observer);
  },
  methods: {
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
    },
    async fetchPosts() {
      try {
        this.isPostLoading = true;
        const response = await axios
          .get('https://jsonplaceholder.typicode.com/posts', {
            params: {
              _page: this.currentPage,
              _limit: this.limitForPage
            }
          });
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limitForPage);
        this.posts = response.data;
      } catch (e) {
        console.log(e);
      } finally {
        this.isPostLoading = false;
      }
    },
    async loadMorePost() {
      try {
        this.currentPage += 1;
        const response = await axios
          .get('https://jsonplaceholder.typicode.com/posts', {
            params: {
              _page: this.currentPage,
              _limit: this.limitForPage
            }
          });
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limitForPage);
        this.posts = [...this.posts, ...response.data];
      } catch (e) {
        console.log(e);
      }
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
