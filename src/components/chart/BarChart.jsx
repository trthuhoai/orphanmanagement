import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip,
} from "chart.js";
import React, { useContext } from "react";
import { Bar } from "react-chartjs-2";
import { StatisticContext } from "../../contexts/StatisticContext";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "top",
        },
        title: {
            display: true,
            text: "Cán bộ và nhân viên",
        },
    },
    maintainAspectRatio: false,
};

const BarChart = () => {
    const { accountRole } = useContext(StatisticContext);

    const labels = accountRole.map((item) =>
        item.keyword === "ROLE_ADMIN"
            ? "Quản trị viên"
            : item.keyword === "ROLE_EMPLOYEE"
            ? "Nhân viên"
            : item.keyword === "ROLE_MANAGER_CHILDREN"
            ? "Quản lý trẻ em"
            : item.keyword === "ROLE_MANAGER_HR"
            ? "Quản lý nhân sự"
            : item.keyword === "ROLE_MANAGER_LOGISTIC"
            ? "Quản lý trung tâm"
            : ""
    );
    const data = accountRole.map((item) => item.value);
    return (
        <div className="bar-chart">
            <Bar
                data={{
                    labels: labels,
                    datasets: [
                        {
                            label: "Phân quyền",
                            data: data,
                            backgroundColor: [
                                "rgba(255, 99, 132, 0.8)",
                                "rgba(54, 162, 235, 0.8)",
                                "rgba(255, 206, 86, 0.8)",
                                "rgba(75, 192, 192, 0.8)",
                                "rgba(153, 102, 255, 0.8)",
                                "rgba(255, 159, 64, 0.8)",
                            ],
                            borderColor: [
                                "rgba(255, 99, 132, 1)",
                                "rgba(54, 162, 235, 1)",
                                "rgba(255, 206, 86, 1)",
                                "rgba(75, 192, 192, 1)",
                                "rgba(153, 102, 255, 1)",
                                "rgba(255, 159, 64, 1)",
                            ],
                            borderWidth: 1,
                        },
                    ],
                }}
                options={options}
            ></Bar>
        </div>
    );
};

export default BarChart;
