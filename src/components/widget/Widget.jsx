import React, { useContext } from "react";
import { StatisticContext } from "../../contexts/StatisticContext";
import "./_widget.scss";

const Widget = ({ getChartId }) => {
    const { accountStatusActive } = useContext(StatisticContext);
    const { accountStatusDeleted } = useContext(StatisticContext);
    const { childrenTotal } = useContext(StatisticContext);

    const widgets = [
        {
            id: 1,
            total: accountStatusActive + accountStatusDeleted || 0,
            description: "Tài khoản",
        },
        {
            id: 2,
            total: childrenTotal || 0,
            description: "Trẻ em",
        },
        {
            id: 3,
            total: "",
            description: "Tài chính",
        },
    ];
    const handleClickWidget = (widgetId) => {
        getChartId(widgetId);
    };
    return (
        <div className="widget">
            {widgets.map((widget, key) => (
                <div
                    className="widget__item"
                    key={widget.id}
                    onClick={() => handleClickWidget(widget.id)}
                >
                    <h1 className="widget__heading">{widget.total}</h1>
                    <p className="widget__description">{widget.description}</p>
                </div>
            ))}
        </div>
    );
};

export default Widget;
