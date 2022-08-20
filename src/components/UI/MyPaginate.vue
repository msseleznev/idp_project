<template>
    <div class="pageWrapper">
        <div
            class="page"
            :class="{
                'currentPage' : page === currentPage
            }"
            v-for="page in totalPage"
            :key="page"
            @click="changePage(page)"
            @keydown="changePage(page)"
        >
            {{ page }}
        </div>
    </div>
</template>

<script>
export default {
  name: 'MyPaginate',
  props: {
    totalPage: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    }
  },
  methods: {
    changePage(page) {
      this.$emit('change', page);
    }
  }
};
</script>

<style scoped lang="scss">
.pageWrapper {
  display: flex;
  margin-top: 15px;
}

.page {
  border: 1px solid black;
  padding: 10px;
  margin: 2px;
  cursor: pointer;
}

.currentPage {
  background: $litePrimary;
}
</style>
