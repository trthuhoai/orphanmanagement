import React from "react";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import PieChart from "./PieChart";
import "./_chart.scss";

const Chart = ({ chartId }) => {
    return (
        <div className="chart">
            <div className="chart__top">
                <BarChart chartId={chartId} />
                <PieChart chartId={chartId} />
            </div>
            <div className="chart__bottom">
                <LineChart chartId={chartId} />
            </div>
        </div>
    );
};
export default Chart;
