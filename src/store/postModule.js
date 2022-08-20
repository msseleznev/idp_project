import axios from 'axios';

export const postModule = {
  state: () => ({
    posts: [],
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
  }),
  getters: {
    sortedPost(state) {
      return [...state.posts].sort((post1, post2) => post1[state.selectedSort]
        ?.localeCompare(post2[state.selectedSort]));
    },
    sortedAndSearchedPost(state, getters) {
      return getters.sortedPost.filter(post => post.title.toLowerCase()
        .includes(state.searchQuery.toLowerCase()));
    }
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
    },
    setLoading(state, bool) {
      state.isPostLoading = bool;
    },
    setCurrentPage(state, page) {
      state.currentPage = page;
    },
    setTotalPages(state, totalPages) {
      state.totalPages = totalPages;
    },
    setSelectedSort(state, selectedSort) {
      state.selectedSort = selectedSort;
    },
    setSearchQuery(state, searchQuery) {
      state.searchQuery = searchQuery;
    }
  },
  actions: {
    async fetchPosts({
      state,
      commit
    }) {
      try {
        commit('setLoading', true);
        const response = await axios
          .get('https://jsonplaceholder.typicode.com/posts', {
            params: {
              _page: state.currentPage,
              _limit: state.limitForPage
            }
          });
        commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limitForPage));
        commit('setPosts', response.data);
      } catch (e) {
        console.log(e);
      } finally {
        commit('setLoading', false);
      }
    },
    async loadMorePost({
      state,
      commit
    }) {
      try {
        commit('setCurrentPage', state.currentPage + 1);
        const response = await axios
          .get('https://jsonplaceholder.typicode.com/posts', {
            params: {
              _page: state.currentPage,
              _limit: state.limitForPage
            }
          });
        commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limitForPage));
        commit('setPosts', [...state.posts, ...response.data]);
      } catch (e) {
        console.log(e);
      }
    }
  },
  namespaced: true

};
