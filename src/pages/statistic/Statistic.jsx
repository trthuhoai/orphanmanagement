import { useState } from "react";
import { MetaTags } from "react-meta-tags";
// import StatisticList from "../../components/Statistic/StatisticList";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
// import StatisticContextProvider from "../../contexts/StatisticContext";
import "./_statistic.scss";

const Statistic = () => {
    const strDate = "13/05/2022";
    const [myDate, setMyDate] = useState(new Date(2022, 5 - 1, 13));
    console.log(strDate.substring(0,2));
    console.log(strDate.substring(3,5));
    console.log(strDate.substring(6,11));
    console.log(myDate);

    return (
        <div className="list">
            <MetaTags>
                <title>CYF Center | Thống kê</title>
            </MetaTags>
            <Sidebar />
            <div className="listContainer">
                <Header />
                <div className="main">
                    {/* <StatisticContextProvider>
                        <StatisticList />
                    </StatisticContextProvider> */}
                    <section className="left">{`${myDate}`}</section>
                    <section className="right">
                        <section className="widget"></section>
                        <section className="search-list"></section>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Statistic;
