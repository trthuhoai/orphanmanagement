import moment from "moment";
import { useContext } from "react";
import { NotificationContext } from "../../contexts/NotificationContext";
import { LoadingNotification } from "../loading/LoadingSkeleton";
import Notification from "./Notification";
import "./_notification.scss";

const viewDate = (dateSend) => {
    let result = "";

    const currentDate = moment(new Date(), "DD/MM/YYYY hh:mm");
    const date = moment(dateSend, "DD/MM/YYYY hh:mm");

    const different = currentDate.diff(date, "days");

    switch (true) {
        case different === 0:
            result = date.format("HH:mm");
            break;
        case different === 1:
            result = "Hôm qua";
            break;
        case different <= 7:
            switch (date.format("ddd")) {
                case "Mon":
                    result = "Thứ hai";
                    break;
                case "Tues":
                    result = "Thứ ba";
                    break;
                case "Wed":
                    result = "Thứ tư";
                    break;
                case "Thur":
                    result = "Thứ năm";
                    break;
                case "Fri":
                    result = "Thứ sáu";
                    break;
                case "Sat":
                    result = "Thứ bảy";
                    break;
                default:
                    result = "Chủ nhật";
                    break;
            }
            break;
        default:
            result = date.format("DD/MM/YYYY");
            break;
    }

    return result;
};

const NotificationList = () => {
    const { accounts } = useContext(NotificationContext);
    const { notifications } = useContext(NotificationContext);

    return (
        <ul className="notification user__menu">
            {accounts.length !== 0 &&
                notifications.map((notification) => (
                    <div key={notification.id}>
                        <Notification theNotification={notification} />
                    </div>
                ))}
            {accounts.length === 0 &&
                Array(8)
                    .fill(0)
                    .map((item, index) => (
                        <LoadingNotification></LoadingNotification>
                    ))}
        </ul>
    );
};

export default NotificationList;
