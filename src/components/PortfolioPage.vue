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
          height="80%"
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
              shadeIntensity: 0.5,
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
              breakpoint: 960,
              options: {
                chart: {
                  // height: "70%",
                },
              },
            },
            {
              breakpoint: 675,
              options: {
                chart: {
                  // height: "90%",
                },
                legend: {
                  show: false,
                  position: "bottom",
                  fontSize: "16px",
                  fontFamily: "IBM Plex Sans",
                  labels: {
                    colors: ["#ebedfc"],
                  },
                  markers: {
                    width: 14,
                    height: 14,
                    strokeWidth: "2px",
                    strokeColor: "#ebedfc",
                    radius: 12,
                    offsetX: 0,
                    offsetY: 0,
                  },
                  itemMargin: {
                    horizontal: 10,
                    vertical: 10,
                  },
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
  grid-template-rows: 1.5fr 2fr;
  gap: 1.5vh;
}
.porfolio-page__tickers {
  grid-area: 1 / 1 / 2 / 3;
}
.portfolio-page__no-tickers {
  grid-area: 2 / 1 / 3 / 3;
  display: flex;
  align-items: center;
}
.porfolio-page__evaluation {
  grid-area: 2 / 1 / 3 / 2;
}
.porfolio-page__chart {
  grid-area: 2 / 2 / 3 / 3;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

@media screen and (max-width: 675px) {
  .porfolio-page__wrapper {
    gap: 0;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(2, 1fr) 1.5fr;
  }
  .porfolio-page__tickers {
    grid-area: 1 / 1 / 2 / 2;
  }
  .portfolio-page__no-tickers {
    grid-area: 2 / 1 / 4 / 2;
  }
  .porfolio-page__evaluation {
    grid-area: 2 / 1 / 3 / 2;
  }
  .porfolio-page__chart {
    grid-area: 3 / 1 / 4 / 2;
    padding-top: 0;
  }
  .chart__heading {
    display: none;
  }
}
@media screen and (max-width: 450px), screen and (max-height: 599px) {
  .porfolio-page__wrapper {
    display: block;
    overflow-y: scroll;
    scroll-snap-type: y mandatory;
    scroll-behavior: smooth;
  }
  .porfolio-page__tickers {
    height: 100%;
    scroll-snap-align: start;
  }
  .portfolio-page__no-tickers {
    scroll-snap-align: start;
    height: 100%;
  }
  .porfolio-page__evaluation {
    height: 50%;
    scroll-snap-align: start;
  }
  .porfolio-page__chart {
    height: 50%;
  }
}

@media screen and (max-height: 535px) {
  .porfolio-page__evaluation {
    height: 100%;
  }
  .porfolio-page__chart {
    height: 100%;
    scroll-snap-align: start;
  }
  .chart__heading {
    display: block;
  }
}
</style>
