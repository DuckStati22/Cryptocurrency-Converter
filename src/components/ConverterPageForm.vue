<template>
  <section class="form">
    <h2 class="form__heading">Cryptocurrency Converter</h2>
    <div class="form__item">
      <base-input
        @input="updateVsPrice"
        v-model="mainPrice"
        type="number"
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
      <base-input
        @input="updateMainPrice"
        v-model="vsPrice"
        type="number"
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
  </section>
</template>

<script>
export default {
  name: "ConverterPageForm",

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
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
}
.form__item {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.form__heading {
  width: 100%;
  text-align: center;
}
.form__select {
  background-color: #ebedfc;
  border-radius: 10px;
  padding: 0.8em;
  appearance: auto;
}
.form__svg {
  fill: #ebedfc;
}

@media screen and (max-width: 675px) {
  .form {
    flex-direction: column;
    gap: 15px;
    padding: 45px 5px 15px;
  }
  .form__svg {
    width: 30px;
    height: 30px;
  }
}
</style>
