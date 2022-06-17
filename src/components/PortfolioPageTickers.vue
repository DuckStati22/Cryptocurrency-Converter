<template>
  <section class="tickers">
    <h2 class="tickers__heading">My portfolio</h2>
    <div v-for="(ticker, index) in tickersList" :key="ticker.id" class="ticker">
      <h3 class="ticker__heading">{{ ticker.id.toUpperCase() }}</h3>
      <p class="ticker__amount">{{ ticker.amount }}</p>
      <base-input
        class="ticker__input"
        v-model="ticker.insertedAmount"
        type="number"
        min="0"
      />
      <div class="ticker__buttons">
        <base-button @click="addAmount(ticker, index)">ADD</base-button>
        <base-button
          @click="subtractAmount(ticker, index)"
          :disabled="comparedAmounts(ticker)"
        >
          SUBTRACT
        </base-button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "PortfolioPageTickers",

  props: {
    cryptoCurrenciesList: {
      type: Array,
      required: true,
    },
  },
  emits: ["updateTickers"],

  data() {
    return {
      tickersList: {},
    };
  },
  created() {
    this.createTickersList();
  },
  methods: {
    createTickersList() {
      if (localStorage.getItem("tickersList") === null) {
        this.tickersList = this.cryptoCurrenciesList.map((item) => {
          return {
            ...item,
            amount: 0,
            insertedAmount: "",
            priceInUsd: 0,
          };
        });
      } else {
        this.tickersList = JSON.parse(localStorage.getItem("tickersList"));
        this.$emit("updateTickers", this.tickersList);
      }
    },
    addAmount(ticker, index) {
      ticker.priceInUsd = this.cryptoCurrenciesList[index].prices.usd;
      ticker.amount =
        Math.round((ticker.amount + ticker.insertedAmount) * 1000000) / 1000000;
      ticker.insertedAmount = "";
      localStorage.setItem("tickersList", JSON.stringify(this.tickersList));
      this.$emit("updateTickers", this.tickersList);
    },

    subtractAmount(ticker, index) {
      ticker.priceInUsd = this.cryptoCurrenciesList[index].prices.usd;
      ticker.amount =
        Math.round((ticker.amount - ticker.insertedAmount) * 1000000) / 1000000;
      ticker.insertedAmount = "";
      localStorage.setItem("tickersList", JSON.stringify(this.tickersList));
      this.$emit("updateTickers", this.tickersList);
    },

    comparedAmounts(ticker) {
      return ticker.amount - ticker.insertedAmount < 0;
    },
  },
};
</script>

<style scoped>
.tickers {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  padding: 15px 15px;
}
.tickers__heading {
  width: 100%;
  text-align: center;
}

.ticker {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
}
.ticker__input {
  width: 75%;
}
.ticker__buttons {
  display: flex;
  gap: 20px;
}

@media screen and (max-width: 675px) {
  .tickers {
    gap: 40px;
    padding-top: 50px;
  }
  .ticker {
    gap: 10px;
    border: 2px solid white;
    border-radius: 20px;
    padding: 15px;
  }
  .ticker__input {
    width: 100%;
  }
}
</style>
