import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import React, { useContext } from "react";
import { Pie } from "react-chartjs-2";
import { StatisticContext } from "../../contexts/StatisticContext";

ChartJS.register(ArcElement, Tooltip, Legend);
export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "top",
        },
        title: {
            display: true,
            text: "Tỉ lệ nam nữ số trẻ em trong trung tâm",
        },
    },
    maintainAspectRatio: false,
};

const PieChart = () => {
    const { childrenGender } = useContext(StatisticContext);
    const labels = childrenGender.map((item) =>
        item.keyword === "true" ? "Nam" : "Nữ"
    );
    const data = childrenGender.map((item) => item.value);

    return (
        <div className="pie-chart">
            <Pie
                data={{
                    labels: labels,
                    datasets: [
                        {
                            data: data,
                            backgroundColor: [
                                "rgb(255, 99, 132)",
                                "rgb(54, 162, 235)",
                            ],
                        },
                    ],
                }}
                options={options}
            ></Pie>
        </div>
    );
};

export default PieChart;
