<template>
  <div class="app__wrapper">
    <navigation-bar @changePage="changePage" class="app__nav" />
    <transition name="fade" appear>
      <converter-page
        v-if="currentPage === 'converter'"
        :currenciesList="currenciesList"
        class="app__converter-page"
      />
    </transition>
    <transition name="fade" appear>
      <portfolio-page
        v-if="currentPage === 'portfolio'"
        :cryptoCurrenciesList="cryptoCurrenciesList"
        class="app__portfolio-page"
      />
    </transition>
  </div>
</template>

<script>
import { loadPrices } from "./api";
import NavigationBar from "./components/NavigationBar.vue";
import ConverterPage from "./components/ConverterPage.vue";
import PortfolioPage from "./components/PortfolioPage.vue";

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
html {
  background-color: #1a1d27;
}
body {
  max-width: 1040px;
  margin: 0 auto;
}
body,
html {
  height: 100vh;
}
.app__wrapper {
  padding: 20px 0;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 8fr;
  grid-row-gap: 20px;
}
.app__nav {
  grid-area: 1 / 1 / 2 / 2;
}
.app__converter-page,
.app__portfolio-page {
  grid-area: 2 / 1 / 3 / 2;
}
section,
nav {
  padding: 0 15px;
  background-color: #222633;
  border-radius: 20px;
}

.fade-enter-active {
  transition: all 0.3s ease-out;
}
.fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.fade-enter-from,
.fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

@media screen and (max-width: 675px) {
  .app__wrapper {
    grid-row-gap: 0px;
  }
  section,
  nav {
    padding: 0 5px;
    border-radius: 0;
  }
  body {
    max-width: 675px;
  }
}
</style>
