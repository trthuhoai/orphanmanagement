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
import React, { useContext } from "react";
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
    // responsive: true,
    plugins: {
        legend: {
            position: "top",
        },
        title: {
            display: true,
            text: "Số trẻ ở trung tâm từ 2010 - 2022",
        },
        maintainAspectRatio: false,
    },
};

const LineChart = () => {
    const { childrenIntroduction } = useContext(StatisticContext);
    const { childrenAdoption } = useContext(StatisticContext);

    const labels = childrenIntroduction.map((item) => item.year);

    const data = {
        labels,
        datasets: [
            {
                label: "Trẻ em vào trung tâm",
                data: childrenIntroduction.map((item, index) => item.amount),
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
            {
                label: "Trẻ em được nhận nuôi",
                data: labels.map((label) => {
                    let index = childrenAdoption.find(
                        (element) => element.year === label
                    );
                    return (index && index.amount) || 0;
                }),
                borderColor: "rgb(53, 162, 235)",
                backgroundColor: "rgba(53, 162, 235, 0.5)",
            },
        ],
    };
    return (
        <div className="line-chart">
            <Line options={options} data={data} height={96}/>
        </div>
    );
};

export default LineChart;
