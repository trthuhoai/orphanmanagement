import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NotificationContext } from "../../contexts/NotificationContext";
import { LoadingNotificationDetail } from "../loading/LoadingSkeleton";
import { viewDate } from "./Notification";
import "./_notification.scss";

const NotificationDetail = () => {
    const params = useParams();
    const id = params.idNotification;

    const { viewSender } = useContext(NotificationContext);
    const { viewNotification } = useContext(NotificationContext);

    const [detailNotification, setDetailNotification] = useState({});
    const [sender, setSender] = useState({
        roles: [{ description: "" }],
    });

    useEffect(() => {
        viewNotification(id).then((result) => {
            setDetailNotification(result);
            viewSender(detailNotification.senderId).then((result) => {
                setSender(result);
            });
        });
    }, [id, sender, viewNotification]);

    function createMarkup(markup) {
        return { __html: markup };
    }

    return sender && Object.keys(sender).length > 1 ? (
        <div className="notification-detail">
            <h2 className="notification-detail__subject">
                {detailNotification.subject}
            </h2>
            <div className="notification-detail__body">
                <img
                    src={sender.image}
                    alt=""
                    className="notification-detail__img"
                />
                <p className="notification-detail__sender">
                    {sender.roles[0].description}
                </p>
                <span className="notification-detail__timer">
                    {viewDate(detailNotification.dateSend)}
                </span>
            </div>
            <div
                className="notification-detail__content"
                dangerouslySetInnerHTML={createMarkup(
                    detailNotification.content
                )}
            ></div>
        </div>
    ) : (
        <LoadingNotificationDetail />
    );
};

export default NotificationDetail;
