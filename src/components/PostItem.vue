<template>
    <div class="post">
        <div>
            <div>{{ post.id }}</div>
            <div>Название:<strong>{{ post.title }}</strong></div>
            <div>Описание:<strong>{{ post.body }}</strong></div>
        </div>

        <div class="btnsBlock">
            <my-button
                class="btn"
                @click="$router.push(`/posts/${post.id}`)"
            >
                Открыть
            </my-button>
            <my-button @click="$emit('remove', post)">
                Удалить
            </my-button>
        </div>
    </div>
</template>

<script>

export default {
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
.btnsBlock{
  display: flex;
  margin-left: 10px;
}
.btn {
  margin-left: 10px;
}
</style>
