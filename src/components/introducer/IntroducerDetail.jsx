import { useContext, useEffect, useState } from "react";
import { Card, ListGroup } from "react-bootstrap";
import { IntroducerContext } from "../../contexts/IntroducerContext";
import "../../scss/abstracts/_card.scss";

const IntroducerDetail = ({ theIntroducer }) => {
    const id = theIntroducer.id;

    const [detailIntroducer, setDetailIntroducer] = useState({});

    const { viewIntroducer } = useContext(IntroducerContext);
    useEffect(() => {
        viewIntroducer(id).then((result) => {
            setDetailIntroducer(result);
        });
    }, []);

    return (
        <Card className="card">
            <Card.Header className="card__header">
                <Card.Img
                    className="card__image"
                    variant="top"
                    src={
                        detailIntroducer.image ||
                        "https://firebasestorage.googleapis.com/v0/b/cyfcenter-323a8.appspot.com/o/placeholder-img.webp?alt=media&token=6f658374-20b2-4171-9ef2-32ad3f87fa57"
                    }
                />
                <div>
                    <Card.Title className="card__title">
                        {detailIntroducer.fullName}
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted card__subtitle">
                        {detailIntroducer.address}
                    </Card.Subtitle>
                    <Card.Text className="card-text">
                        {detailIntroducer.email}
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
                            {detailIntroducer.gender === true
                                ? "Nam"
                                : detailIntroducer.gender === false
                                ? "Nữ"
                                : ""}
                        </p>
                    </ListGroup.Item>
                    <ListGroup.Item className="list-group__item">
                        <span className="list-group__item-heading">
                            Ngày sinh
                        </span>
                        <p className="list-group__item-content">
                            {detailIntroducer.dateOfBirth}
                        </p>
                    </ListGroup.Item>
                    <ListGroup.Item className="list-group__item">
                        <span className="list-group__item-heading">
                            CMND/CCCD
                        </span>
                        <p className="list-group__item-content">
                            {detailIntroducer.identification}
                        </p>
                    </ListGroup.Item>
                    <ListGroup.Item className="list-group__item">
                        <span className="list-group__item-heading">
                            Số điện thoại
                        </span>
                        <p className="list-group__item-content">
                            {detailIntroducer.phone}
                        </p>
                    </ListGroup.Item>
                </ListGroup>
            </Card.Body>
        </Card>
    );
};

export default IntroducerDetail;
