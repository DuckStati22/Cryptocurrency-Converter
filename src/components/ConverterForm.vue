<template>
  <section class="form">
    <h2 class="form__heading">Cryptocurrency Converter</h2>
    <div class="form__group">
      <div class="form__item">
        <base-num-input
          @input="updateVsPrice"
          @focusout="checkEmptyInput"
          v-model="mainPrice"
          min="0"
        />
        <select
          @change="
            updateVsPrice();
            updateMainCurrency();
          "
          v-model="mainCurrency"
          class="form__select"
        >
          <option
            :disabled="currency === vsCurrency"
            v-for="currency in currenciesList"
            :key="currency.id"
            :value="currency"
          >
            {{ currency.id.toUpperCase() }}
          </option>
        </select>
      </div>
      <a @click="reverseCurrencies" class="form__button">
        <svg
          class="form__svg"
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 16 22"
        >
          <path
            d="M0 6.875v-3.75h10.82V0L16 5l-5.18 5V6.875H0zM16 18.875v-3.75H5.18V12L0 17l5.18 5v-3.125H16z"
          ></path>
        </svg>
      </a>
      <div class="form__item">
        <base-num-input
          @input="updateMainPrice"
          @focusout="checkEmptyInput"
          v-model="vsPrice"
          min="0"
        />
        <select
          @change="
            updateMainPrice();
            updateVsCurrency();
          "
          v-model="vsCurrency"
          class="form__select"
        >
          <option
            :disabled="currency === mainCurrency"
            v-for="currency in currenciesList"
            :key="currency.id"
            :value="currency"
          >
            {{ currency.id.toUpperCase() }}
          </option>
        </select>
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
  name: "ConverterForm",

  props: {
    currenciesList: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      mainCurrency: "",
      vsCurrency: "",

      mainPrice: 0,
      vsPrice: 0,
    };
  },

  created() {
    this.updateMainCurrency();
    this.updateVsCurrency();
  },

  computed: {
    exchangePrice() {
      return this.mainCurrency.prices[this.vsCurrency.id];
    },
  },

  methods: {
    checkEmptyInput(event) {
      if (event.target.value === "") {
        event.target.value = 0;
      }
    },

    updateMainCurrency() {
      if (!this.mainCurrency) {
        this.mainCurrency = this.currenciesList[0];
      }

      this.$emit(
        "updateCurrenciesName",
        this.mainCurrency.name,
        this.vsCurrency.id
      );
    },
    updateVsCurrency() {
      if (!this.vsCurrency) {
        this.vsCurrency = this.currenciesList[this.currenciesList.length - 1];
      }

      this.$emit(
        "updateCurrenciesName",
        this.mainCurrency.name,
        this.vsCurrency.id
      );
    },

    updateMainPrice() {
      this.mainPrice =
        Math.round((this.vsPrice / this.exchangePrice) * 1000000) / 1000000;
    },
    updateVsPrice() {
      this.vsPrice =
        Math.round(this.mainPrice * this.exchangePrice * 1000000) / 1000000;
    },

    reverseCurrencies() {
      const temp = this.mainCurrency;
      this.mainCurrency = this.vsCurrency;
      this.vsCurrency = temp;
      [this.mainPrice, this.vsPrice] = [this.vsPrice, this.mainPrice];
      this.$emit(
        "updateCurrenciesName",
        this.mainCurrency.name,
        this.vsCurrency.id
      );
    },
  },
};
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  position: relative;
}
.form__group {
  width: 100%;
  display: flex;
  justify-content: space-around;
}
.form__item {
  display: flex;
  gap: 5px;
}
.form__select {
  background-color: #ebedfc;
  display: flex;
  align-items: center;
  border-radius: 10px;
  padding: 0.5em 1em;
  appearance: auto;
}
.form__button {
  display: flex;
  align-items: center;
  transition: all 0.3s;
}
.form__button:hover {
  filter: opacity(50%);
}
.form__svg {
  fill: #ebedfc;
}

@media screen and (max-width: 960px) {
  .form__group {
    flex-direction: column;
    align-items: center;
    gap: 2.5vh;
  }
}

@media screen and (max-width: 675px) and (max-height: 714px),
  screen and (max-height: 599px) {
  .form {
    justify-content: start;
    gap: 15%;
    align-items: center;
  }
  .clue {
    display: flex;
  }
}
</style>
