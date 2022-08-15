import { useContext, useEffect, useState } from "react";
import { NotificationContext } from "../../contexts/NotificationContext";
import { LoadingNotification } from "../loading/LoadingSkeleton";
import Notification from "./Notification";
import "./_notification.scss";

const NotificationList = () => {
    const { notifications } = useContext(NotificationContext);

    return (
        (notifications && (
            <ul className="notification user__menu">
                {notifications.length !== 0 &&
                    notifications.map((notification) => (
                        <div key={notification.id}>
                            <Notification
                                theNotification={notification}
                            />
                        </div>
                    ))}
                {notifications.length === 0 &&
                    Array(8)
                        .fill(0)
                        .map((item, index) => <LoadingNotification />)}
            </ul>
        )) || (
            <ul className="notification user__menu">
                <p className="notification__null">Không có thông báo</p>
            </ul>
        )
    );
};

export default NotificationList;
