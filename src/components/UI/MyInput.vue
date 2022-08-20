<template>
    <input
        class="input"
        type="text"
        :placeholder="placeholder"
        aria-label="placeholder"
        :value="modelValue"
        @input="updateInput"
    >
</template>

<script>
export default {
  name: 'MyInput',
  props: {
    modelValue: {
      type: [String, Number],
      required: true
    },
    placeholder: {
      type: String,
      required: true
    }
  },
  methods: {
    updateInput(event) {
      this.$emit('update:modelValue', event.target.value);
    }
  }
};
</script>

<style scoped lang="scss">
.input {
  width: 100%;
  border: 2px solid $primary;
  padding: 10px 15px;
  margin-top: 15px;
}
</style>
