<template>
    <form
        @submit.prevent
        class="form"
    >
        <h4>Создание поста</h4>
        <my-input
            v-model="post.title"
            type="text"
            placeholder="Название"
        />
        <my-input
            v-model="post.body"
            type="text"
            placeholder="Описание"
        />
        <my-button
            @click="createPost"
            class="btn"
        >
            Создать
        </my-button>
    </form>
</template>

<script>
import MyInput from '@/components/UI/MyInput';

export default {
  components: { MyInput },
  data() {
    return {
      post: {
        title: '',
        body: ''
      }
    };
  },
  methods: {
    createPost() {
      this.post.id = Date.now();
      this.$emit('create', this.post);
      this.post = {
        title: '',
        body: ''
      };
    }
  }
};
</script>

<style scoped lang="scss">
.form {
  display: flex;
  flex-direction: column;
}
.btn  {
  align-self: flex-end;
  margin-top: 15px;
}

</style>
