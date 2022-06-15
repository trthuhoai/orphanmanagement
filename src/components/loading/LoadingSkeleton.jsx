import { Card, ListGroup } from "react-bootstrap";
import "./_skeleton.scss";

const LoadingSkeleton = ({ className = "" }) => {
    return (
        <div
            className={`skeleton ${className}`}
            style={{ width: 16, height: 16 }}
        ></div>
    );
};

export const LoadingList = ({ columns }) => {
    return (
        <tbody>
            {Array(5)
                .fill(0)
                .map((item, index) => (
                    <tr key={index}>
                        <td className="d-flex align-items-center gap-3 h-75">
                            <LoadingSkeleton className="rounded-circle w-25 py-4 px-3 d-inline-block"></LoadingSkeleton>
                            <LoadingSkeleton className="my-3 mx-3 d-inline-block w-75"></LoadingSkeleton>
                        </td>
                        {Array(columns - 2)
                            .fill(0)
                            .map((item, index) => (
                                <td>
                                    <LoadingSkeleton className="my-3 w-100"></LoadingSkeleton>
                                </td>
                            ))}
                        <td>
                            <div
                                className="d-flex align-items-center justify-content-end w-50"
                                style={{ marginLeft: "auto" }}
                            >
                                <LoadingSkeleton className="rounded-circle d-inline-block w-25 px-3 py-3"></LoadingSkeleton>
                                <LoadingSkeleton className="rounded-circle d-inline-block w-25 px-3 py-3"></LoadingSkeleton>
                                <LoadingSkeleton className="rounded-circle d-inline-block w-25 px-3 py-3"></LoadingSkeleton>
                            </div>
                        </td>
                    </tr>
                ))}
        </tbody>
    );
};

export const LoadingDetail = ({ tableName }) => {
    const details = {
        account: [
            "Giới tính",
            "Ngày sinh",
            "CMND/CCCD",
            "Số điện thoại",
            "Địa chỉ",
        ],
        storage: [
            "Giới tính",
            "Ngày sinh",
            "CMND/CCCD",
            "Số điện thoại",
            "Địa chỉ",
            "Ngày xoá",
        ],
        children: [
            "Ngày sinh",
            "Ngày vào trung tâm",
            "Người giới thiệu",
            "Ngày được nhận nuôi",
            "Người nhận nuôi",
        ],
        introducer: ["Giới tính", "Ngày sinh", "CMND/CCCD", "Số điện thoại"],
        nurturer: ["Giới tính", "Ngày sinh", "CMND/CCCD", "Số điện thoại"],
        charity: [],
        picnic: [],
    };
    return (
        <Card className="card">
            <Card.Header className="card__header">
                <LoadingSkeleton className="img-thumbnail w-50 h-auto "></LoadingSkeleton>
                <div className="w-100 mb-5 mx-4">
                    <LoadingSkeleton className="card__title w-100 mb-2"></LoadingSkeleton>
                    <LoadingSkeleton className="mb-3 text-muted w-100 card__subtitle"></LoadingSkeleton>
                    <LoadingSkeleton className="card-text w-100"></LoadingSkeleton>
                </div>
            </Card.Header>
            <Card.Body className="card__body">
                <ListGroup variant="flush" className="list-group">
                    {details[tableName].map((item, index) => (
                        <ListGroup.Item
                            className="list-group__item"
                            key={index}
                        >
                            <span className="list-group__item-heading">
                                {item}
                            </span>
                            <LoadingSkeleton className="list-group__item-content"></LoadingSkeleton>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Card.Body>
        </Card>
    );
};

export const LoadingNotification = () => {
    return (
        <li className="notification__item ">
            <LoadingSkeleton className="rounded-circle py-4 px-4 d-inline-block"></LoadingSkeleton>
            <div className="notification__content">
                <div className="gap-5 mb-3">
                    <LoadingSkeleton className=" w-75"></LoadingSkeleton>
                    <LoadingSkeleton className=" w-25"></LoadingSkeleton>
                </div>
                <LoadingSkeleton className="my-1 w-100"></LoadingSkeleton>
            </div>
        </li>
    );
};

export const LoadingNotificationDetail = () => {
    return (
        <div className="notification-detail">
            <h2 className="notification-detail__subject">
                <LoadingSkeleton className="w-50 py-3" />
            </h2>
            <div className="notification-detail__body">
                <LoadingSkeleton className="rounded-circle py-4 px-4 d-inline-block" />
                <div className="flex-grow-1 mx-3 ">
                    <LoadingSkeleton className="w-25 h-50" />
                </div>
                <div>
                    <LoadingSkeleton className="px-5 h-50" />
                </div>
            </div>
            <div className="notification-detail__content">
                <LoadingSkeleton className="w-100 py-4 mb-3" />
                <LoadingSkeleton className="w-100 py-3 mb-5" />
                <LoadingSkeleton className="w-100 mb-2" />
                <LoadingSkeleton className="w-100 mb-2" />
                <LoadingSkeleton className="w-100 mb-5" />
                <LoadingSkeleton className="w-100 mb-2" />
                <LoadingSkeleton className="w-100 mb-2" />
                <LoadingSkeleton className="w-100 mb-5" />
                <LoadingSkeleton className="w-100 mb-2" />
            </div>
        </div>
    );
};
export default LoadingSkeleton;
