import { useContext, useEffect, useState } from "react";
import { Card, ListGroup } from "react-bootstrap";
import { CharityContext } from "../../contexts/CharityContext";
import "../../scss/abstracts/_card.scss";
import { LoadingDetail } from "../loading/LoadingSkeleton";
import { viewDate } from "./Charity";

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
                        {detailCharity.charityName}
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted card__subtitle">
                        {detailCharity.title}
                    </Card.Subtitle>
                    <Card.Text className="card-text">
                        {viewDate(detailCharity.dateStart)} - {viewDate(detailCharity.dateEnd)}
                    </Card.Text>
                </div>
            </Card.Header>
            <Card.Body className="card__body">
                <ListGroup variant="flush" className="list-group">
                    <ListGroup.Item className="list-group__item">
                        <p className="list-group__item-content">
                            {detailCharity.content}
                        </p>
                    </ListGroup.Item>
                </ListGroup>
            </Card.Body>
        </Card>
    ) : (
        <LoadingDetail tableName={"charity"} />
    );
};

export default CharityDetail;
