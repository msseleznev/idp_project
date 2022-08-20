<template>
    <select
        :value="modelValue"
        @change="changeOption"
        aria-label="modelValue"
    >
        <option
            disabled
            value=""
        >
            Выберите из списка
        </option>
        <option
            v-for="option in options"
            :key="option.value"
            :value="option.value"
        >
            {{ option.name }}
        </option>
    </select>
</template>

<script>
export default {
  name: 'MySelect',
  props: {
    modelValue: {
      type: String,
      required: true
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    changeOption(event) {
      this.$emit('update:modelValue', event.target.value);
    }
  }
};
</script>

<style scoped lang="scss">

</style>
