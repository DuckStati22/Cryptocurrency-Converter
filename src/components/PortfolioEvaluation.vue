<template>
  <section class="evaluation">
    <h2 class="evaluation__heading">Portfolio Evaluation</h2>
    <div class="evaluation__group">
      <p
        class="evaluation__group-item"
        v-for="currency in notEmptyTickers"
        :key="currency.id"
      >
        {{ currency.id.toUpperCase() }}:<br />
        {{ getCurrencyInUsd(currency) }}$
      </p>
      <p class="evaluation__group-item">Total:<br />{{ totalSum }}$</p>
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
  name: "PortfolioEvaluation",
  props: {
    tickersList: {
      type: Array,
      required: true,
    },
  },

  computed: {
    notEmptyTickers() {
      return this.tickersList.filter((item) => item.amount > 0);
    },
    totalSum() {
      if (this.tickersList.length === 0) {
        return 0;
      }
      let sum = this.tickersList
        .map(
          (item) =>
            Math.round(item.priceInUsd * item.amount * 1000000) / 1000000
        )
        .reduce(
          (prevValue, currentValue) =>
            Math.round((prevValue + currentValue) * 1000000) / 1000000
        );
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
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
}
.evaluation__group {
  text-align: center;
}
.evaluation__group-item {
  font-size: 1.5em;
}
.evaluation__group-item:last-child {
  margin-top: 2vh;
  font-weight: bold;
}

@media screen and (max-width: 675px), screen and (max-height: 599px) {
  .evaluation__group {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    column-gap: 10vw;
  }
  .evaluation__group-item:last-child {
    width: 100%;
  }
}

@media screen and (max-height: 535px) {
  .clue {
    display: flex;
  }
  .evaluation {
    justify-content: flex-start;
    gap: 15%;
  }
}
</style>
