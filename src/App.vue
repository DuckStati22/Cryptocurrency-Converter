<template>
  <div class="app__wrapper">
    <navigation-bar @changePage="changePage" class="app__nav" />
    <converter-page
      v-if="currentPage === 'converter'"
      :currenciesList="currenciesList"
      class="app__converter-page"
    />
    <portfolio-page
      v-if="currentPage === 'portfolio'"
      :cryptoCurrenciesList="cryptoCurrenciesList"
      class="app__portfolio-page"
    />
  </div>
</template>

<script>
import { loadPrices } from "./api";
import NavigationBar from "./components/NavigationBar.vue";
import ConverterPage from "./components/ConverterPage.vue";
import PortfolioPage from "./components/PortfolioPage.vue";
import "large-small-dynamic-viewport-units-polyfill";

export default {
  name: "App",

  components: {
    NavigationBar,
    ConverterPage,
    PortfolioPage,
  },

  data() {
    return {
      currenciesList: [
        {
          name: "bitcoin",
          id: "btc",
          isCrypto: true,
          prices: {},
        },
        {
          name: "ethereum",
          id: "eth",
          isCrypto: true,
          prices: {},
        },
        {
          name: "usd",
          id: "usd",
          isCrypto: false,
          prices: {},
        },
      ],

      currentPage: "converter",
    };
  },

  created() {
    if (localStorage.getItem("currentPage")) {
      this.currentPage = localStorage.getItem("currentPage");
    } else {
      this.currentPage === "converter";
    }
    this.updatePrices();
  },

  computed: {
    cryptoCurrenciesList() {
      return this.currenciesList.filter((currency) => currency.isCrypto);
    },
  },

  methods: {
    async updatePrices() {
      const pricesArr = await loadPrices(
        this.currenciesList.map((item) => [item.name]),
        this.currenciesList.map((item) => [item.id])
      );
      this.currenciesList.forEach((item, index) => {
        item.prices = pricesArr[index];
      });
    },

    changePage(page) {
      this.currentPage = page;
      localStorage.setItem("currentPage", this.currentPage);
    },
  },
};
</script>

<style>
.app__wrapper {
  width: 100%;
  height: 100vh;
  height: calc(var(--1dvh, 1vh) * 100);
  height: 100dvh;
  display: flex;
  flex-direction: column;
  gap: 1.5vh;
  padding: 1.5vh 0;
}
.app__nav {
  flex: 0 0 60px;
}
.app__converter-page,
.app__portfolio-page {
  flex: 1 1 auto;
}

@media screen and (max-width: 675px), screen and (max-height: 599px) {
  .app__wrapper {
    gap: 0;
    padding: 0;
  }
}
</style>
