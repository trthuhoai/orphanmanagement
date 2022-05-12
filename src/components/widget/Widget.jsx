import React, { useContext } from "react";
import { StatisticContext } from "../../contexts/StatisticContext";
import "./_widget.scss";

const Widget = () => {
    const { amountAccount } = useContext(StatisticContext);
    const { amountChildren } = useContext(StatisticContext);

    const widgetData = [
        {
            amount: amountAccount,
            description: "Cán bộ và nhân viên",
        },
        {
            amount: amountChildren,
            description: "Trẻ em",
        },
        {
            amount: amountChildren,
            description: "Hoạt động từ thiện",
        },
    ];
    return (
        <div className="widget">
            {widgetData.map((widgetItem, key) => (
                <div className="widget__item" key={key} >
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
