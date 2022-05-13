import React from "react";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import PieChart from "./PieChart";
import "./_chart.scss";

const Chart = () => {
    return (
        <div className="chart">
            <div className="chart__top">
                <LineChart />
                <PieChart />
            </div>
            <div className="chart__bottom">
                <BarChart />
            </div>
        </div>
    );
};
export default Chart;
