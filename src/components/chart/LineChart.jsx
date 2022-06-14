import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from "chart.js";
import { useContext } from "react";
import { Line } from "react-chartjs-2";
import { StatisticContext } from "../../contexts/StatisticContext";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "top",
        },
        title: {
            display: true,
            text: "Số trẻ ở trung tâm từ 2010 - 2022",
        },
    },
    maintainAspectRatio: false,
};

const LineChart = ({ chartId }) => {
    const { accountActiveYear } = useContext(StatisticContext);
    const { accountDeletedYear } = useContext(StatisticContext);
    const { childrenIntroduction } = useContext(StatisticContext);
    const { childrenAdoption } = useContext(StatisticContext);
    const { financeFurniture } = useContext(StatisticContext);
    const { financePicnic } = useContext(StatisticContext);
    const { financeCharity } = useContext(StatisticContext);
    console.log(
        "🚀 ~ file: LineChart.jsx ~ line 47 ~ LineChart ~ financeCharity",
        financeCharity
    );

    let firstChartData = [],
        secondChartData = [],
        thirdChartData = [];
    let label = [];
    let labels = [];
    if (chartId === 1) {
        options.plugins.title.text =
            "Biểu đồ thể hiện sự thay đổi số lượng tài khoản trong năm 2022";
        label = ["Tài khoản mới", ""];
        firstChartData = accountActiveYear.map((item) => item.amount);
        labels = accountActiveYear.map((item) => item.year);
    } else if (chartId === 2) {
        options.plugins.title.text =
            "Biểu đồ thể hiện sự thay đổi số lượng trẻ em qua từng năm từ 2010 - 2022 ";
        label = ["Trẻ em vào trung tâm", "Trẻ em được nhận nuôi"];
        firstChartData = childrenIntroduction.map((item) => item.amount);
        labels = childrenIntroduction.map((item) => item.year);
        secondChartData = labels.map((label) => {
            let index = childrenAdoption.find(
                (element) => element.year === label
            );
            return (index && index.amount) || 0;
        });
    } else if (chartId === 3) {
        options.plugins.title.text =
            "Biểu đồ thể hiện sự thay đổi các khoản chi tiêu trong năm 2022";
        label = ["Từ thiện", "Dã ngoại", "Trang thiết bị"];
        firstChartData = financeCharity.map((item) => item.amount);
        secondChartData = financePicnic.map((item) => item.amount);
        // thirdChartData = financeCharity.map((item) => item.amount);
        labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    }

    const data = {
        labels: labels,
        datasets: [
            {
                label: label[0],
                data: firstChartData,
                borderColor: "rgb(246, 147, 51)",
                backgroundColor: "rgba(246, 147, 51, 0.5)",
            },
            {
                label: label[1],
                data: secondChartData,
                borderColor: chartId !== 1 ? "rgb(94, 200, 235)" : "#fff",
                backgroundColor:
                    chartId !== 1 ? "rgba(94, 200, 235, 0.5)" : "#fff",
            },
        ],
    };
    return (
        <div className="line-chart">
            <Line options={options} data={data} height={96} />
        </div>
    );
};

export default LineChart;
