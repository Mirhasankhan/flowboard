import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const MonthlyEarnings = ({
  chartData,
  currentEarnings = 0,
}: any) => {
  const data = {
    labels: chartData?.map((item: any) => item.month),
    datasets: [
      {
        data: chartData?.map((item: any) => item.earnings),
        borderColor: "#7869ff",
        backgroundColor: "rgba(255, 127, 80, 0.2)",
        tension: 0.4,
        pointRadius: 5,
        pointBackgroundColor: (context: any) => {
          const value = context.dataset.data[context.dataIndex];
          if (value === currentEarnings) {
            return "#FFFFFF";
          }
          return "transparent";
        },
        pointBorderColor: (context: any) => {
          const value = context.dataset.data[context.dataIndex];
          if (value === currentEarnings) {
            return "#FF7F50";
          }
          return "transparent";
        },
        pointBorderWidth: 2,
        fill: true,
      },
    ],
  };

  const options: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: false },
      tooltip: {
        enabled: true,
        backgroundColor: "#FFFFFF",
        titleColor: "#333",
        bodyColor: "#555",
        borderColor: "#DDD",
        borderWidth: 1,
        cornerRadius: 6,
        caretSize: 0,
        xAlign: "center",
        yAlign: "bottom",
        displayColors: false,
        callbacks: {
          title: (context: any) => `$${context[0].raw}`,
          month: (context: any) => context.month,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          display: true,
          color: "#555",
          font: {
            size: 10,
          },
        },
        border: { display: false },
      },
      y: {
        grid: { color: "#eee", borderDash: [5, 5] },
        ticks: {
          color: "#888",
          callback: (value: any) => `$${value}`,
        },
        border: { display: false },
      },
    },
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        backgroundColor: "#fff",
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        maxWidth: "1100px",
      }}
    >
      
      <div style={{ height: "350px" }}>
        <Line data={data} options={options} />
      </div>
      <div
        style={{
          marginTop: "20px",
          borderTop: "1px solid #eee",
          paddingTop: "15px",
          display: "flex",
          justifyContent: "space-around",
          textAlign: "center",
          color: "#555",
        }}
      >        
      </div>
    </div>
  );
};

export default MonthlyEarnings;
