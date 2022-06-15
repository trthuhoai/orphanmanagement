import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { useContext } from "react";
import { Pie } from "react-chartjs-2";
import { StatisticContext } from "../../contexts/StatisticContext";

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "top",
        },
        title: {
            display: true,
            text: "",
        },
    },
    maintainAspectRatio: false,
};

const PieChart = ({ chartId }) => {
    const { accountStatusActive } = useContext(StatisticContext);
    const { accountStatusDeleted } = useContext(StatisticContext);
    const accountStatus = [
        {
            keyword: "Hoạt động",
            value: accountStatusActive,
        },
        {
            keyword: "Lưu trữ",
            value: accountStatusDeleted,
        },
    ];
    const { childrenGender } = useContext(StatisticContext);

    const { financeFurniture } = useContext(StatisticContext);
    const { financePicnic } = useContext(StatisticContext);
    const { financeCharity } = useContext(StatisticContext);

    let totalFurniture = 0,
        totalPicnic = 0,
        totalCharity = 0;
    financePicnic.forEach((item) => (totalPicnic += item.amount));
    financeFurniture.forEach((item) => (totalFurniture += item.amount));
    financeCharity.forEach((item) => (totalCharity += item.amount));

    let chartData = [];
    if (chartId === 1) {
        options.plugins.title.text =
            "Biểu đồ tỉ lệ trạng thái hoạt động các tài khoản";
        chartData = accountStatus;
    } else if (chartId === 2) {
        options.plugins.title.text = "Biểu đồ tỉ lệ giới tính trẻ em ";
        chartData = childrenGender.map((item) => ({
            keyword: item.keyword === "true" ? "Nam" : "Nữ",
            value: item.value,
        }));
    } else if (chartId === 3) {
        options.plugins.title.text =
            "Biểu đồ tỉ lệ số tiền chi tiêu trong năm 2022";
        chartData = [
            {
                keyword: "Dã ngoại",
                value: financePicnic.reduce(
                    (previousValue, currentValue) =>
                        previousValue + currentValue.amount,
                    0
                ),
            },
            {
                keyword: "Trang thiết bị",
                value: financeFurniture.reduce(
                    (previousValue, currentValue) =>
                        previousValue + currentValue.amount,
                    0
                ),
            },
        ];
    }

    const labels = chartData.map((item) => item.keyword);
    const data = chartData.map((item) => item.value);

    return (
        <div className="pie-chart">
            <Pie
                data={{
                    labels: labels,
                    datasets: [
                        {
                            data: data,
                            backgroundColor: ["#A0FF9B", "#F7F5BB"],
                        },
                    ],
                }}
                options={options}
            ></Pie>
        </div>
    );
};

export default PieChart;
