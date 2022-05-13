import { useContext, useEffect, useState } from "react";
import { Card, ListGroup } from "react-bootstrap";
import { NurturerContext } from "../../contexts/NurturerContext";
import "../../scss/abstracts/_card.scss";

const NurturerDetail = ({ theNurturer }) => {
    const id = theNurturer.id;

    const [detailNurturer, setDetailNurturer] = useState({});

    const { viewNurturer } = useContext(NurturerContext);
    useEffect(() => {
        viewNurturer(id).then((result) => {
            setDetailNurturer(result);
        });
    }, []);

    return (
        <Card className="card">
            <Card.Header className="card__header">
                <Card.Img
                    className="card__image"
                    variant="top"
                    src={
                        detailNurturer.image ||
                        "https://firebasestorage.googleapis.com/v0/b/cyfcenter-323a8.appspot.com/o/placeholder-img.webp?alt=media&token=6f658374-20b2-4171-9ef2-32ad3f87fa57"
                    }
                />
                <div>
                    <Card.Title className="card__title">
                        {detailNurturer.fullName}
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted card__subtitle">
                        {detailNurturer.address}
                    </Card.Subtitle>
                    <Card.Text className="card-text">
                        {detailNurturer.email}
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
                            {detailNurturer.gender === true
                                ? "Nam"
                                : detailNurturer.gender === false
                                ? "Nữ"
                                : ""}
                        </p>
                    </ListGroup.Item>
                    <ListGroup.Item className="list-group__item">
                        <span className="list-group__item-heading">
                            Ngày sinh
                        </span>
                        <p className="list-group__item-content">
                            {detailNurturer.dateOfBirth}
                        </p>
                    </ListGroup.Item>
                    <ListGroup.Item className="list-group__item">
                        <span className="list-group__item-heading">
                            CMND/CCCD
                        </span>
                        <p className="list-group__item-content">
                            {detailNurturer.identification}
                        </p>
                    </ListGroup.Item>
                    <ListGroup.Item className="list-group__item">
                        <span className="list-group__item-heading">
                            Số điện thoại
                        </span>
                        <p className="list-group__item-content">
                            {detailNurturer.phone}
                        </p>
                    </ListGroup.Item>
                </ListGroup>
            </Card.Body>
        </Card>
    );
};

export default NurturerDetail;
