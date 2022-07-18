<template>
  <section class="tickers">
    <h2 class="tickers__heading">My portfolio</h2>
    <div class="tickers__group">
      <div v-for="ticker in tickersList" :key="ticker.id" class="ticker">
        <h3 class="ticker__heading">{{ ticker.id.toUpperCase() }}</h3>
        <p class="ticker__amount">{{ ticker.amount }}</p>
        <base-num-input
          class="ticker__input"
          v-model="ticker.insertedAmount"
          min="0"
        />
        <div class="ticker__buttons">
          <base-button @click="addAmount(ticker)">ADD</base-button>
          <base-button
            @click="subtractAmount(ticker)"
            :disabled="comparedAmounts(ticker)"
          >
            SUBTRACT
          </base-button>
        </div>
      </div>
    </div>
    <p class="clue">
      <svg
        class="clue__svg"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 330 330"
      >
        <path
          id="XMLID_224_"
          d="M325.606,229.393l-150.004-150C172.79,76.58,168.974,75,164.996,75c-3.979,0-7.794,1.581-10.607,4.394
	l-149.996,150c-5.858,5.858-5.858,15.355,0,21.213c5.857,5.857,15.355,5.858,21.213,0l139.39-139.393l139.397,139.393
	C307.322,253.536,311.161,255,315,255c3.839,0,7.678-1.464,10.607-4.394C331.464,244.748,331.464,235.251,325.606,229.393z"
        />
      </svg>
      swipe up
    </p>
  </section>
</template>

<script>
export default {
  name: "PortfolioTickers",

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
    this.updateTickersPriceInUsd();
  },

  computed: {
    tickersPriceInUsd() {
      return this.cryptoCurrenciesList.map((item) => [item.prices.usd]);
    },
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
    updateTickersPriceInUsd() {
      this.tickersList.map(
        (item, index) => (item.priceInUsd = this.tickersPriceInUsd[index])
      );
    },

    addAmount(ticker) {
      ticker.amount =
        Math.round((ticker.amount + ticker.insertedAmount) * 1000000) / 1000000;
      ticker.insertedAmount = "";
      localStorage.setItem("tickersList", JSON.stringify(this.tickersList));
      this.$emit("updateTickers", this.tickersList);
    },

    subtractAmount(ticker) {
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

  watch: {
    tickersPriceInUsd() {
      this.updateTickersPriceInUsd();
    },
  },
};
</script>

<style scoped>
.tickers {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.tickers__group {
  display: flex;
  justify-content: space-around;
}
.ticker {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1vh;
}
.ticker__input {
  width: 80%;
}
.ticker__buttons {
  display: flex;
  gap: 1em;
}

@media screen and (max-width: 450px), screen and (max-height: 599px) {
  .tickers {
    justify-content: space-around;
  }
  .tickers__group {
    justify-content: center;
    gap: 10%;
    flex: 1 1 auto;
  }
  .ticker {
    justify-content: center;
  }
  .clue {
    display: flex;
    align-self: center;
  }
}

@media screen and (max-width: 450px) and (min-height: 454px) {
  .tickers__group {
    flex-direction: column;
  }
}
</style>
