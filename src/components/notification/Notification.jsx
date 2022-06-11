import moment from "moment";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { NotificationContext } from "../../contexts/NotificationContext";
import "./_notification.scss";

export const viewDate = (dateSend) => {
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

const Notification = ({ theNotification }) => {
    const { accounts } = useContext(NotificationContext);

    return (
        <NavLink
            to={`/notification/${theNotification.id}`}
            style={{ padding: 0 }}
        >
            <li className="notification__item">
                <img
                    src={
                        "https://firebasestorage.googleapis.com/v0/b/cyfcenter-323a8.appspot.com/o/placeholder-img.webp?alt=media&token=6f658374-20b2-4171-9ef2-32ad3f87fa57" &&
                        accounts.find(
                            (account) => account.id === theNotification.senderId
                        ).image
                    }
                    alt=""
                    className="notification__img"
                />
                <div className="notification__content">
                    <div className="">
                        <h4 className="notification__sender">
                            {
                                accounts.find(
                                    (account) =>
                                        account.id === theNotification.senderId
                                ).roles[0].description
                            }
                        </h4>
                        <span className="notification__timer">
                            {viewDate(theNotification.dateSend)}
                        </span>
                    </div>
                    <p className="notification__message">
                        {theNotification.subject}
                    </p>
                </div>
            </li>
        </NavLink>
    );
};

export default Notification;
