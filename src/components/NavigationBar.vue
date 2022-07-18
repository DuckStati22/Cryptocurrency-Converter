<template>
  <nav class="nav">
    <router-link to="/" class="nav__button"
      ><svg
        class="nav__svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill-rule="evenodd"
        clip-rule="evenodd"
        style="transform: rotate(180deg)"
      >
        <path
          d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z"
        />
      </svg>
      CONVERTER
    </router-link>
    <router-link to="/portfolio" class="nav__button"
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
    ></router-link>
  </nav>
</template>

<script>
export default {
  name: "NavigationBar",

  data() {
    return {};
  },
};
</script>

<style scoped>
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.nav__button {
  font-weight: bold;
  letter-spacing: 0.075em;
  display: flex;
  gap: 0.5em;
  transition: box-shadow 0.3s;
}
.nav__button:hover {
  box-shadow: 0 0.1em 0;
}
.nav__svg {
  fill: #ebedfc;
  width: 1.3em;
  height: 1.3em;
}

@media screen and (max-width: 960px) {
  .nav__button:hover {
    box-shadow: none;
  }
}
</style>
