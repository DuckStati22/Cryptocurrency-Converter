<template>
  <input :value="modelValue" @input="updateInput" class="input" />
</template>

<script>
export default {
  name: "BaseInput",
  props: {
    modelValue: [String, Number],
  },

  methods: {
    updateInput(event) {
      this.$emit("update:modelValue", +event.target.value);
    },
  },
};
</script>

<style scoped>
.input {
  background-color: #ebedfc;
  border-radius: 10px;
  padding: 0.5em 1em;
}
.input:focus {
  filter: drop-shadow(0 0 5px #ebedfc);
}
</style>
