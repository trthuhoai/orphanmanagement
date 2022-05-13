import { useEffect, useState } from "react";
import { Card, ListGroup } from "react-bootstrap";

const FurnitureDetail = ({ theFurniture }) => {
    const id = theFurniture.furnitureId;
    const [detailFurniture, setDetailFurniture] = useState({ roles: [] });
    useEffect(() => {
        getDetailFurniture();
    }, []);

    async function getDetailFurniture() {
        const token = JSON.parse(localStorage.getItem("token"));
        let requestOptions = {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            redirect: "follow",
        };

        await fetch(
            `https://orphanmanagement.herokuapp.com/api/v1/manager/furniture/${id}`,
            requestOptions
        )
            .then((response) => response.text())
            .then((result) => {
                result = JSON.parse(result).data;
                setDetailFurniture(result);
                console.log(result);
            })
            .catch((error) => console.log("error", error));
    }

    return (
        <Card className="card">
            <Card.Header className="card__header">
                <Card.Img
                    className="card__image"
                    variant="top"
                    src={
                        detailFurniture.image ||
                        "https://shahpourpouyan.com/wp-content/uploads/2018/10/orionthemes-placeholder-image-1.png"
                    }
                />
                <div>
                    <Card.Title className="card__title">
                        {detailFurniture.nameFurniture}
                    </Card.Title>
                </div>
            </Card.Header>
            <Card.Body className="card__body">
                <ListGroup variant="flush" className="list-group">
                    <ListGroup.Item className="list-group__item">
                        <span className="list-group__item-heading">
                            Số lượng sử dụng tốt
                        </span>
                        <p className="list-group__item-content">
                                {detailFurniture.goodQuantity}
                        </p>
                    </ListGroup.Item>
                    <ListGroup.Item className="list-group__item">
                        <span className="list-group__item-heading">
                            Số lượng hư hỏng
                        </span>
                        <p className="list-group__item-content">
                            {detailFurniture.brokenQuantity} 
                        </p>
                    </ListGroup.Item>
                    <ListGroup.Item className="list-group__item">
                        <span className="list-group__item-heading">
                            Ghi chú
                        </span>
                        <p className="list-group__item-content">
                            {detailFurniture.status} 
                        </p>
                    </ListGroup.Item>
                </ListGroup>
            </Card.Body>
        </Card>
    );
};

export default FurnitureDetail;
