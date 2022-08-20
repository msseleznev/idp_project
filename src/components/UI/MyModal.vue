<template>
    <div
        class="modal"
        v-if="show"
        @click.stop="hideModal"
        @keydown.stop="hideModal"
    >
        <div
            @click.stop
            @keydown.stop
            class="modalContent"
        >
            <slot />
        </div>
    </div>
</template>

<script>
export default {
  name: 'MyModal',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    hideModal() {
      this.$emit('update:show', false);
    }
  }
};
</script>

<style scoped lang="scss">
.modal{
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
}
.modalContent{
  margin: auto;
  background-color: white;
  min-width: 300px;
  min-height: 50px;
  padding: 20px;
  border-radius: 8px;
  box-shadow:0 0 15px rgba(0,0,0,0.3)
}
</style>
