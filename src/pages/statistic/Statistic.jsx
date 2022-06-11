import { useState } from "react";
import { MetaTags } from "react-meta-tags";
import { Navigate } from "react-router-dom";
import Chart from "../../components/chart/Chart";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import Widget from "../../components/widget/Widget";
import NotificationContextProvider from "../../contexts/NotificationContext";
import StatisticContextProvider from "../../contexts/StatisticContext";
import "./_statistic.scss";

const Statistic = () => {
    const [chartId, setChartId] = useState(0);

    const token = localStorage.getItem("token");
    if (token === null) {
        return <Navigate to="/" />;
    }

    const getChartId = (chartId) => {
        console.log(chartId);
        setChartId(chartId);
    };

    return (
        <div className="list">
            <MetaTags>
                <title>CYF Center | Thống kê</title>
            </MetaTags>
            <Sidebar />
            <div className="listContainer">
                <NotificationContextProvider>
                    <Header />
                </NotificationContextProvider>
                <div className="main statistic">
                    <StatisticContextProvider>
                        <Widget getChartId={getChartId} />
                        <Chart chartId={chartId || 1} />
                    </StatisticContextProvider>
                </div>
            </div>
        </div>
    );
};

export default Statistic;
