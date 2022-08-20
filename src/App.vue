<template>
    <div class="app">
        <h1>Страница с постами</h1>
        <my-input
            v-model="searchQuery"
            placeholder="Поиск..."
        />
        <div class="appBtns">
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
        <my-paginate
            :total-page="totalPage"
            :current-page="currentPage"
            @change="changePage"
        />
    </div>
</template>

<script>
import PostList from '@/components/PostList';
import PostForm from '@/components/PostForm';
import MyModal from '@/components/UI/MyModal';
import MyButton from '@/components/UI/MyButton';
import axios from 'axios';
import MySelect from '@/components/UI/MySelect';
import MyInput from '@/components/UI/MyInput';
import MyPaginate from '@/components/UI/MyPaginate';

export default {
  components: {
    MyPaginate,
    MyInput,
    MySelect,
    MyButton,
    MyModal,
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
      totalPage: 0,
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
  watch: {
    currentPage() {
      this.fetchPosts();
    }
  },
  mounted() {
    this.fetchPosts();
  },
  methods: {
    createPost(post) {
      this.posts.push(post);
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
        this.totalPage = Math.ceil(response.headers['x-total-count'] / this.limitForPage);
        this.posts = response.data;
      } catch (e) {
        console.log(e);
      } finally {
        this.isPostLoading = false;
      }
    }
  }

};
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  padding: 20px;
}

.appBtns {
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
}

</style>
