import { useContext, useEffect, useState } from "react";
import { Card, ListGroup } from "react-bootstrap";
import { StorageContext } from "../../contexts/StorageContext";
import "../../scss/abstracts/_card.scss";
import { LoadingDetail } from "../loading/LoadingSkeleton";

const StorageDetail = ({ theStorage }) => {
    const id = theStorage.id;

    const [detailStorage, setDetailStorage] = useState({
        roles: [{ description: "" }],
    });

    const { viewStorage } = useContext(StorageContext);
    useEffect(() => {
        viewStorage(id).then((result) => {
            setDetailStorage(result);
        });
    }, []);

    return Object.keys(detailStorage).length !== 1 ? (
        <Card className="card">
            <Card.Header className="card__header">
                <Card.Img
                    className="card__image"
                    variant="top"
                    src={
                        detailStorage.image ||
                        "https://firebasestorage.googleapis.com/v0/b/cyfcenter-323a8.appspot.com/o/placeholder-img.webp?alt=media&token=6f658374-20b2-4171-9ef2-32ad3f87fa57"
                    }
                />
                <div>
                    <Card.Title className="card__title">
                        {detailStorage.fullName}
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted card__subtitle">
                        {detailStorage.roles[0].description}
                    </Card.Subtitle>
                    <Card.Text className="card-text">
                        {detailStorage.email}
                    </Card.Text>
                </div>
            </Card.Header>
            <Card.Body className="card__body">
                <ListGroup variant="flush" className="list-group">
                    <ListGroup.Item className="list-group__item">
                        <span className="list-group__item-heading">
                            Giới tính
                        </span>
                        <p className="list-group__item-content">
                            {detailStorage.gender === true
                                ? "Nam"
                                : detailStorage.gender === false
                                ? "Nữ"
                                : ""}
                        </p>
                    </ListGroup.Item>
                    <ListGroup.Item className="list-group__item">
                        <span className="list-group__item-heading">
                            Ngày sinh
                        </span>
                        <p className="list-group__item-content">
                            {detailStorage.date_of_birth}
                        </p>
                    </ListGroup.Item>
                    <ListGroup.Item className="list-group__item">
                        <span className="list-group__item-heading">
                            CMND/CCCD
                        </span>
                        <p className="list-group__item-content">
                            {detailStorage.identification}
                        </p>
                    </ListGroup.Item>
                    <ListGroup.Item className="list-group__item">
                        <span className="list-group__item-heading">
                            Số điện thoại
                        </span>
                        <p className="list-group__item-content">
                            {detailStorage.phone}
                        </p>
                    </ListGroup.Item>
                    <ListGroup.Item className="list-group__item">
                        <span className="list-group__item-heading">
                            Địa chỉ
                        </span>
                        <p className="list-group__item-content">
                            {detailStorage.address}
                        </p>
                    </ListGroup.Item>
                    <ListGroup.Item className="list-group__item">
                        <span className="list-group__item-heading">
                            Ngày xoá
                        </span>
                        <p className="list-group__item-content">
                            {detailStorage.recoveryExpirationDate}
                        </p>
                    </ListGroup.Item>
                </ListGroup>
            </Card.Body>
        </Card>
    ) : (
        <LoadingDetail tableName={"storage"}/>
    );
};

export default StorageDetail;
