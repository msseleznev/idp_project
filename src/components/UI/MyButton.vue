<template>
    <button class="btn">
        <slot />
    </button>
</template>

<script>
export default {
  name: 'MyButton'
};
</script>

<style scoped lang="scss">
.btn{
  padding: 10px 15px;
  background: none;
  color: $primary;
  border: 1px solid $primary;
}
</style>
