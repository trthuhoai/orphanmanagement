import { useContext, useEffect, useState } from "react";
import { Card, ListGroup } from "react-bootstrap";
import { CharityContext } from "../../contexts/CharityContext";
import "../../scss/abstracts/_card.scss";
import { LoadingDetail } from "../loading/LoadingSkeleton";

const CharityDetail = ({ theCharity }) => {
    const id = theCharity.id;

    const [detailCharity, setDetailCharity] = useState({});

    const { viewCharity } = useContext(CharityContext);
    useEffect(() => {
        viewCharity(id).then((result) => {
            setDetailCharity(result);
        });
    }, []);

    return Object.keys(detailCharity).length !== 0 ? (
        <Card className="card">
            <Card.Header className="card__header">
                <Card.Img
                    className="card__image"
                    variant="top"
                    src={
                        detailCharity.image ||
                        "https://firebasestorage.googleapis.com/v0/b/cyfcenter-323a8.appspot.com/o/placeholder-img.webp?alt=media&token=6f658374-20b2-4171-9ef2-32ad3f87fa57"
                    }
                />
                <div>
                    <Card.Title className="card__title">
                        {detailCharity.fullName}
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted card__subtitle">
                        {detailCharity.address}
                    </Card.Subtitle>
                    <Card.Text className="card-text">
                        {detailCharity.email}
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
                            {detailCharity.gender === true
                                ? "Nam"
                                : detailCharity.gender === false
                                ? "Nữ"
                                : ""}
                        </p>
                    </ListGroup.Item>
                    <ListGroup.Item className="list-group__item">
                        <span className="list-group__item-heading">
                            Ngày sinh
                        </span>
                        <p className="list-group__item-content">
                            {detailCharity.dateOfBirth}
                        </p>
                    </ListGroup.Item>
                    <ListGroup.Item className="list-group__item">
                        <span className="list-group__item-heading">
                            CMND/CCCD
                        </span>
                        <p className="list-group__item-content">
                            {detailCharity.identification}
                        </p>
                    </ListGroup.Item>
                    <ListGroup.Item className="list-group__item">
                        <span className="list-group__item-heading">
                            Số điện thoại
                        </span>
                        <p className="list-group__item-content">
                            {detailCharity.phone}
                        </p>
                    </ListGroup.Item>
                </ListGroup>
            </Card.Body>
        </Card>
    ) : (
            <LoadingDetail tableName={"charity"}/>
    );
};

export default CharityDetail;
