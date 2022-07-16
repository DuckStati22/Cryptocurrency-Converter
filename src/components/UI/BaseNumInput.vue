<template>
  <input
    :value="modelValue"
    @input="updateInput"
    @beforeinput="inputValidation"
    class="input"
    maxlength="16"
    inputmode="decimal"
  />
</template>

<script>
export default {
  name: "BaseNumInput",
  props: {
    modelValue: [String, Number],
  },

  methods: {
    inputValidation(event) {
      const enteredValue = event.data;
      if (enteredValue === null) {
        return;
      }
      const isDecimal = event.target.value.includes(".");
      const isEmpty = event.target.value === "";
      const regex = isDecimal || isEmpty ? /\d/ : /\d|\./;

      if (enteredValue === "," && !isDecimal && !isEmpty) {
        event.preventDefault();
        event.target.value = event.target.value + ".";
      } else if (!enteredValue.match(regex)) {
        event.preventDefault();
      }
    },

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
