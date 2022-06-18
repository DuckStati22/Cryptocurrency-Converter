<template>
  <button class="button">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "BaseButton",
};
</script>

<style scoped>
.button {
  background-color: #ebedfc;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.25em 0.5em;
  transition: all 0.3s;
}
.button:hover {
  filter: opacity(50%);
}
.button:disabled {
  filter: brightness(0.3);
  cursor: default;
}

@media screen and (max-width: 960px) {
  .button:hover {
    filter: opacity(100%);
  }
}
</style>
