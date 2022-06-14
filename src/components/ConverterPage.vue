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
        width="80%"
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
                  width: "100%",
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
                fontSize: "0.8em",
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
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 2fr;
  grid-column-gap: 0px;
  grid-row-gap: 20px;
}
.converter-page__form {
  grid-area: 1 / 1 / 2 / 2;
}
.converter-page__chart {
  grid-area: 2 / 1 / 3 / 2;
  justify-content: center;
  padding-top: 15px;
}
.converter-page__heading {
  width: 100%;
  text-align: center;
}
.vue-apexcharts {
  display: flex;
  justify-content: center;
  align-items: center;
}

@media screen and (max-width: 675px) {
  .converter-page__wrapper {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
  }
}
</style>
