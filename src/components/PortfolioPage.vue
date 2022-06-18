<template>
  <div class="porfolio-page__wrapper">
    <portfolio-page-tickers
      @updateTickers="updateTickers"
      :cryptoCurrenciesList="cryptoCurrenciesList"
      class="porfolio-page__tickers"
    />
    <section class="portfolio-page__no-tickers" v-if="haveNoTickers">
      <h2>Specify amount of cryptocurrency to get portfolio statistics</h2>
    </section>
    <template v-else>
      <portfolio-page-evaluation
        :tickersList="tickersList"
        class="porfolio-page__evaluation"
      />
      <section class="porfolio-page__chart">
        <h2 class="chart__heading">Portfolio chart</h2>
        <apexchart
          type="pie"
          width="70%"
          :options="pieChartData.chartOptions"
          :series="pieChartData.series"
        ></apexchart>
      </section>
    </template>
  </div>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";
import PortfolioPageTickers from "./PortfolioPageTickers.vue";
import PortfolioPageEvaluation from "./PortfolioPageEvaluation.vue";

export default {
  name: "PortfolioPage",
  components: {
    apexchart: VueApexCharts,
    PortfolioPageTickers,
    PortfolioPageEvaluation,
  },

  props: {
    cryptoCurrenciesList: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      pieChartData: {
        series: [],
        chartOptions: {
          chart: {
            animations: {
              enabled: true,
            },
            type: "pie",
          },
          theme: {
            monochrome: {
              enabled: true,
              color: "#003F5C",
              shadeTo: "light",
              shadeIntensity: 1,
            },
          },
          labels: [],
          tooltip: {
            y: {
              formatter: (seriesname) => seriesname + " $",
            },
          },
          legend: {
            show: false,
          },
          responsive: [
            {
              breakpoint: 675,
              options: {
                chart: {
                  width: "100%",
                },
              },
            },
          ],
        },
      },

      tickersList: [],
    };
  },
  computed: {
    haveNoTickers() {
      return this.tickersList.every((item) => item.amount == 0);
    },
  },

  methods: {
    updateTickers(tickers) {
      this.tickersList = tickers;
      tickers.map((item, index) => {
        this.pieChartData.series[index] =
          Math.round(item.priceInUsd * item.amount * 1000000) / 1000000;
        this.pieChartData.chartOptions.labels[index] = item.id.toUpperCase();
      });
      if (this.pieChartData.series.every((item) => item === 0)) {
        this.pieChartData.series.length = 0;
        this.pieChartData.chartOptions.labels.length = 0;
      }
    },
  },
};
</script>

<style scoped>
.porfolio-page__wrapper {
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: 1fr 1.75fr;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
}
.porfolio-page__tickers {
  grid-area: 1 / 1 / 2 / 3;
}
.portfolio-page__no-tickers {
  grid-area: 2 / 1 / 2 / 3;
  display: flex;
  justify-content: center;
  align-items: center;
}
.porfolio-page__evaluation {
  grid-area: 2 / 1 / 3 / 2;
}
.porfolio-page__chart {
  grid-area: 2 / 2 / 3 / 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 30px;
}
.chart__heading {
  text-align: center;
}
.vue-apexcharts {
  display: flex;
  justify-content: center;
}

@media screen and (max-width: 675px) {
  .porfolio-page__wrapper {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 0.5fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
  }
  .porfolio-page__tickers {
    grid-area: 1 / 1 / 2 / 2;
  }
  .portfolio-page__no-tickers {
    grid-area: 2 / 1 / 3 / 2;
    text-align: center;
  }
  .porfolio-page__chart {
    grid-area: 2 / 1 / 3 / 2;
    gap: 30px;
    justify-content: center;
    padding-top: 30px;
  }
  .porfolio-page__evaluation {
    grid-area: 3 / 1 / 4 / 2;
  }
}
</style>
