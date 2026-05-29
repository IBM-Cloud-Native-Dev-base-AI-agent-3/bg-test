import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import styles from "./ComplexCompetitionChart.module.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
);

function getCssVariable(name, fallback) {
  if (typeof window === "undefined") return fallback;

  return (
    getComputedStyle(document.documentElement).getPropertyValue(name).trim() ||
    fallback
  );
}

function ComplexCompetitionChart({ competitionRates = [], complexName }) {
  const primaryColor = getCssVariable("--color-primary", "#0057ff");

  const chartData = {
    labels: competitionRates.map((item) => item.date),
    datasets: [
      {
        label: "평균 경쟁률",
        data: competitionRates.map((item) => item.average),
        borderColor: primaryColor,
        backgroundColor: primaryColor,
        borderWidth: 3,
        pointRadius: 5,
        tension: 0.2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        min: 0,
        suggestedMax: 3,
        ticks: {
          stepSize: 1,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => `평균 경쟁률 ${context.raw}:1`,
        },
      },
    },
  };

  return (
    <div className={styles.chartWrap}>
      <div className={styles.chartBox}>
        <Line data={chartData} options={chartOptions} />
      </div>

      <h3>{complexName}</h3>

      <div className={styles.noticeList}>
        <p>ⓘ 위 경쟁률은 공고 평균경쟁률입니다.</p>
        <p>ⓘ 경쟁률이 0이면 모집을 안 했거나 경쟁률이 미발표된 경우입니다.</p>
      </div>
    </div>
  );
}

export default ComplexCompetitionChart;
