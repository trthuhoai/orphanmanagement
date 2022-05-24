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

const BarChart = ({ chartId }) => {
    const { accountRole } = useContext(StatisticContext);
    const { childrenAge } = useContext(StatisticContext);

    let chartData = [];
     if (chartId === 1) {
         options.plugins.title.text =
             "Biểu đồ số lượng tài khoản được phân quyền";
         chartData = accountRole.map((item) => {
             switch (item.keyword) {
                 case "ROLE_ADMIN":
                     return { keyword: "Quản trị viên", value: item.value };
                 case "ROLE_EMPLOYEE":
                     return { keyword: "Nhân viên", value: item.value };
                 case "ROLE_MANAGER_CHILDREN":
                     return { keyword: "Quản lý trẻ em", value: item.value };
                 case "ROLE_MANAGER_HR":
                     return { keyword: "Quản lý nhân sự", value: item.value };
                 case "ROLE_MANAGER_LOGISTIC":
                     return { keyword: "Quản lý trung tâm", value: item.value };
                 default:
                     return {};
             }
         });
     } else if (chartId === 2) {
         options.plugins.title.text = "Biểu đồ tỉ lệ giới tính trẻ em ";
         chartData = childrenAge.map((item) => {
             switch (item.keyword) {
                 case "kindergarten":
                     return { keyword: "Mẫu giáo", value: item.value };
                 case "primary":
                     return { keyword: "Tiểu học", value: item.value };
                 case "secondary":
                     return { keyword: "Trung học cơ sở", value: item.value };
                 case "high":
                     return {
                         keyword: "Trung học phổ thông",
                         value: item.value,
                     };
                 case "adult":
                     return { keyword: "Trưởng thành", value: item.value };
                 default:
                     return {};
             }
         });
     } else if (chartId === 3) {
         options.plugins.title.text = "Chua co du lieu";
    }
    
    const labels = chartData.map((item) => item.keyword);
    const data = chartData.map((item) => item.value);

    return (
        <div className="bar-chart">
            <Bar
                data={{
                    labels: labels,
                    datasets: [
                        {
                            label: "Số lượng",
                            data: data,
                            backgroundColor: [
                                "#EB7560",
                                "#FFB458",
                                "#F9F871",
                                "#34DFB3",
                                "#0092B3",
                            ],
                        },
                    ],
                }}
                options={options}
            ></Bar>
        </div>
    );
};

export default BarChart;
