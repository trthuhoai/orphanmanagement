import React, { useContext, useState } from "react";
import { StatisticContext } from "../../contexts/StatisticContext";
import "./_widget.scss";

const Widget = ({ getChartData }) => {
    const { amountAccount } = useContext(StatisticContext);
    const { amountChildren } = useContext(StatisticContext);

    const widgetData = [
        {
            amount: amountAccount || 0,
            description: "Cán bộ và nhân viên",
            data: [1, 2, 3],
        },
        {
            amount: amountChildren || 0,
            description: "Trẻ em",
            data: [4, 5, 6],
        },
        {
            amount: 0,
            description: "No data",
            data: [7, 8, 9],
        },
    ];
    const handleData = (widgetData) => {
        getChartData(widgetData);
    };
    return (
        <div className="widget">
            {widgetData.map((widgetItem, key) => (
                <div
                    className="widget__item"
                    key={key}
                    onClick={() => handleData(widgetItem.data)}
                >
                    <h1 className="widget__heading">{widgetItem.amount}</h1>
                    <p className="widget__description">
                        {widgetItem.description}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default Widget;
