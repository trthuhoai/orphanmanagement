import { useContext, useEffect, useState } from "react";
import { Card, ListGroup } from "react-bootstrap";
import { PicnicContext } from "../../contexts/PicnicContext";
import "../../scss/abstracts/_card.scss";
import { LoadingDetail } from "../loading/LoadingSkeleton";
import { viewDate } from "./Picnic";

const PicnicDetail = ({ thePicnic }) => {
    const id = thePicnic.id;

    const [detailPicnic, setDetailPicnic] = useState({});

    const { viewPicnic } = useContext(PicnicContext);
    useEffect(() => {
        viewPicnic(id).then((result) => {
            setDetailPicnic(result);
        });
    }, []);

    return Object.keys(detailPicnic).length !== 0 ? (
        <Card className="card">
            <Card.Header className="card__header">
                <Card.Img
                    className="card__image"
                    variant="top"
                    src={
                        detailPicnic.image ||
                        "https://firebasestorage.googleapis.com/v0/b/cyfcenter-323a8.appspot.com/o/placeholder-img.webp?alt=media&token=6f658374-20b2-4171-9ef2-32ad3f87fa57"
                    }
                />
                <div>
                    <Card.Title className="card__title">
                        {detailPicnic.namePicnic}
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted card__subtitle">
                        {detailPicnic.title}
                    </Card.Subtitle>
                    <Card.Text className="card-text">
                        {viewDate(detailPicnic.dateStart)} - {viewDate(detailPicnic.dateEnd)}
                    </Card.Text>
                </div>
            </Card.Header>
            <Card.Body className="card__body">
                <ListGroup variant="flush" className="list-group">
                    <ListGroup.Item className="list-group__item">
                        <p className="list-group__item-content">
                            {detailPicnic.content}
                        </p>
                    </ListGroup.Item>
                </ListGroup>
            </Card.Body>
        </Card>
    ) : (
        <LoadingDetail tableName={"picnic"} />
    );
};

export default PicnicDetail;
