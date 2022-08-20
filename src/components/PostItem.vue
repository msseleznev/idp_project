<template>
    <div class="post">
        <div>
            <div>{{ post.id }}</div>
            <div>Название:<strong>{{ post.title }}</strong></div>
            <div>Описание:<strong>{{ post.body }}</strong></div>
        </div>

        <div class="post__btns">
            <my-button @click="$emit('remove', post)">
                Удалить
            </my-button>
        </div>
    </div>
</template>

<script>
import MyButton from '@/components/UI/MyButton';

export default {
  components: {
    MyButton
  },
  props: {
    post: {
      type: Object,
      required: true
    }
  }

};
</script>

<style scoped lang="scss">
.post {
  padding: 15px;
  border: 2px solid $primary;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
