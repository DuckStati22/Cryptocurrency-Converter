<template>
  <section class="evaluation">
    <h2 class="evaluation__heading">Portfolio Evaluation</h2>
    <div class="evaluation__group">
      <p
        class="evaluation__group-item"
        v-for="currency in tickersList"
        :key="currency.id"
      >
        {{ currency.id.toUpperCase() }}: {{ getCurrencyInUsd(currency) }}$
      </p>
      <p class="evaluation__group-item">Total: {{ totalSum }}$</p>
    </div>
  </section>
</template>

<script>
export default {
  name: "PortfolioPageEvaluation",
  props: {
    tickersList: {
      type: Array,
      required: true,
    },
  },

  computed: {
    totalSum() {
      if (this.tickersList.length === 0) {
        return 0;
      }
      let sum = this.tickersList
        .map((item) => item.priceInUsd * item.amount)
        .reduce((prevValue, currentValue) => prevValue + currentValue);
      return sum;
    },
  },

  methods: {
    getCurrencyInUsd(currency) {
      return (
        Math.round(currency.priceInUsd * currency.amount * 1000000) / 1000000 ||
        "0"
      );
    },
  },
};
</script>

<style scoped>
.evaluation {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5em;
}
.evaluation__heading {
  width: 100%;
  text-align: center;
}
.evaluation__group {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;
}
.evaluation__group-item {
  font-size: 1.5em;
}
.evaluation__group-item:last-child {
  font-weight: bold;
}

@media screen and (max-width: 675px) {
  .evaluation {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 25px;
    padding: 30px 5px;
  }
}
</style>
