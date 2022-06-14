<template>
  <nav class="nav">
    <a class="nav__button" @click="changePage"
      ><svg
        class="nav__svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill-rule="evenodd"
        clip-rule="evenodd"
        transform="rotate(180)"
      >
        <path
          d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z"
        />
      </svg>
      CONVERTER
    </a>
    <a class="nav__button" @click="changePage"
      >PORTFOLIO
      <svg
        class="nav__svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill-rule="evenodd"
        clip-rule="evenodd"
      >
        <path
          d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z"
        /></svg
    ></a>
  </nav>
</template>

<script>
export default {
  name: "NavigationBar",
  emits: ["changePage"],

  data() {
    return {};
  },

  methods: {
    changePage(event) {
      const linkName = event.currentTarget.innerText.trim().toLowerCase();
      this.$emit("changePage", linkName);
    },
  },
};
</script>

<style scoped>
.nav {
  min-height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.nav__button {
  font-weight: bold;
  letter-spacing: 0.075em;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: box-shadow 0.3s;
}
.nav__button:hover {
  box-shadow: 0 0.1em 0;
}
.nav__svg {
  width: 1.5em;
  height: 1.5em;
  fill: #ebedfc;
}

@media screen and (max-width: 675px) {
  .nav__button:hover {
    box-shadow: none;
  }
}
</style>
