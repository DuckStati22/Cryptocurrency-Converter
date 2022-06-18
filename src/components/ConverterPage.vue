<template>
  <div class="converter-page__wrapper">
    <converter-page-form
      @updateCurrenciesName="updateChartData"
      :currenciesList="currenciesList"
      class="converter-page__form"
    />
    <section class="converter-page__chart">
      <h2 class="converter-page__heading">Two-week currencies chart</h2>
      <apexchart
        type="area"
        height="80%"
        :options="chartData.chartOptions"
        :series="chartData.series"
      ></apexchart>
    </section>
  </div>
</template>

<script>
import { loadChartData } from "../api";
import VueApexCharts from "vue3-apexcharts";
import ConverterPageForm from "./ConverterPageForm.vue";

export default {
  name: "ConverterPage",

  components: {
    apexchart: VueApexCharts,
    ConverterPageForm,
  },

  props: {
    currenciesList: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      chartData: {
        series: [
          {
            name: "Price",
            data: [],
          },
        ],
        chartOptions: {
          chart: {
            type: "area",
            foreColor: "#ebedfc",
            fontFamily: "IBM Plex Sans, sans-serif",
            fontSize: "20px",
            toolbar: {
              show: false,
            },
            zoom: {
              enabled: false,
            },
          },
          colors: ["#DE6A4C"],
          dataLabels: {
            enabled: false,
          },
          fill: {
            colors: ["#DE6A4C"],
            type: "gradient",
            gradient: {
              shade: "dark",
              type: "vertical",
              shadeIntensity: 0.5,
              inverseColors: false,
              opacityFrom: 0.8,
              opacityTo: 0,
            },
          },
          grid: {
            show: false,
          },
          responsive: [
            {
              breakpoint: 675,
              options: {
                chart: {
                  height: "80%",
                },
              },
            },
          ],
          stroke: {
            curve: "straight",
            width: 3,
          },
          title: {
            text: undefined,
          },
          subtitle: {
            text: undefined,
          },
          tooltip: {
            style: {
              foreColor: "#fff",
            },
            theme: "dark",
          },
          xaxis: {
            type: "datetime",
            labels: {
              style: {
                fontSize: "0.7em",
              },
            },
          },
          yaxis: {
            opposite: true,
            labels: {
              show: true,
              formatter: (val) => {
                return val;
              },
              style: {
                fontSize: "0.7em",
              },
            },
          },
          legend: {
            show: true,
            horizontalAlign: "left",
          },
        },
      },
    };
  },

  methods: {
    async updateChartData(mainCurrencyName, vsCurrencyId) {
      if (!mainCurrencyName || !vsCurrencyId) {
        return;
      }

      this.chartData.series[0].data = await loadChartData(
        mainCurrencyName,
        vsCurrencyId
      );
    },
  },
};
</script>

<style scoped>
.converter-page__wrapper {
  display: flex;
  flex-direction: column;
  gap: 1.5vh;
}
.converter-page__form {
  flex: 1 1 auto;
}
.converter-page__chart {
  flex: 1 1 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

@media screen and (max-width: 675px) {
  .converter-page__wrapper {
    gap: 0;
  }
}

@media screen and (max-width: 675px) and (max-height: 714px),
  screen and (max-height: 599px) {
  section {
    height: 100%;
    scroll-snap-align: start;
  }
  .converter-page__wrapper {
    display: block;
    overflow-y: scroll;
    scroll-snap-type: y mandatory;
    scroll-behavior: smooth;
  }
}
</style>
