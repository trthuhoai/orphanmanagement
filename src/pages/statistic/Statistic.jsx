import { MetaTags } from "react-meta-tags";
import Chart from "../../components/chart/Chart";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import Widget from "../../components/widget/Widget";
import StatisticContextProvider from "../../contexts/StatisticContext";
import "./_statistic.scss";

const Statistic = () => {
    return (
        <div className="list">
            <MetaTags>
                <title>CYF Center | Thống kê</title>
            </MetaTags>
            <Sidebar />
            <div className="listContainer">
                <Header />
                <div className="main statistic">
                    <StatisticContextProvider>
                        <Widget/>
                        <Chart />
                    </StatisticContextProvider>
                </div>
            </div>
        </div>
    );
};

export default Statistic;
